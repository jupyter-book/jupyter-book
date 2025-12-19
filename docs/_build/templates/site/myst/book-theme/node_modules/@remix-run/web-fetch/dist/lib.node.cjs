'use strict';

const http = require('http');
const https = require('https');
const zlib = require('zlib');
const fs = require('fs');
const mime = require('mrmime');
const dataUriToBuffer = require('data-uri-to-buffer');
const buffer = require('buffer');
const Stream = require('stream');
const util = require('util');
const webBlob = require('@remix-run/web-blob');
const webFile = require('@remix-run/web-file');
const webFormData = require('@remix-run/web-form-data');
const crypto = require('crypto');
const multipartParser = require('@web3-storage/multipart-parser');
const url = require('url');
const abortController = require('abort-controller');

class FetchBaseError extends Error {
	/**
	 * @param {string} message 
	 * @param {string} type 
	 */
	constructor(message, type) {
		super(message);
		// Hide custom error implementation details from end-users
		Error.captureStackTrace(this, this.constructor);

		this.type = type;
	}

	get name() {
		return this.constructor.name;
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}
}

/**
 * @typedef {{
 * address?: string
 * code: string
 * dest?: string
 * errno: number
 * info?: object
 * message: string
 * path?: string
 * port?: number
 * syscall: string
 * }} SystemError
*/

/**
 * FetchError interface for operational errors
 */
class FetchError extends FetchBaseError {
	/**
	 * @param  {string} message -      Error message for human
	 * @param  {string} type -        Error type for machine
	 * @param  {SystemError} [systemError] - For Node.js system error
	 */
	constructor(message, type, systemError) {
		super(message, type);
		// When err.type is `system`, err.erroredSysCall contains system error and err.code contains system error code
		if (systemError) {
			// eslint-disable-next-line no-multi-assign
			this.code = this.errno = systemError.code;
			this.erroredSysCall = systemError.syscall;
		}
	}
}

/**
 * Is.js
 *
 * Object type checks.
 */

const NAME = Symbol.toStringTag;

/**
 * Check if `obj` is a URLSearchParams object
 * ref: https://github.com/node-fetch/node-fetch/issues/296#issuecomment-307598143
 *
 * @param  {any} object
 * @return {obj is URLSearchParams}
 */
const isURLSearchParameters = (object) => {
	return (
		typeof object === "object" &&
		typeof object.append === "function" &&
		typeof object.delete === "function" &&
		typeof object.get === "function" &&
		typeof object.getAll === "function" &&
		typeof object.has === "function" &&
		typeof object.set === "function" &&
		typeof object.sort === "function" &&
		object[NAME] === "URLSearchParams"
	);
};

/**
 * Check if `object` is a W3C `Blob` object (which `File` inherits from)
 *
 * @param  {*} object
 * @return {object is Blob}
 */
const isBlob = (object) => {
	return (
		typeof object === "object" &&
		typeof object.arrayBuffer === "function" &&
		typeof object.type === "string" &&
		typeof object.stream === "function" &&
		typeof object.constructor === "function" &&
		/^(Blob|File)$/.test(object[NAME])
	);
};

/**
 * Check if `obj` is a spec-compliant `FormData` object
 *
 * @param {*} object
 * @return {object is FormData}
 */
function isFormData(object) {
	return (
		typeof object === "object" &&
		typeof object.append === "function" &&
		typeof object.set === "function" &&
		typeof object.get === "function" &&
		typeof object.getAll === "function" &&
		typeof object.delete === "function" &&
		typeof object.keys === "function" &&
		typeof object.values === "function" &&
		typeof object.entries === "function" &&
		typeof object.constructor === "function" &&
		object[NAME] === "FormData"
	);
}

/**
 * Detect form data input from form-data module
 *
 * @param {any} value
 * @returns {value is Stream & {getBoundary():string, hasKnownLength():boolean, getLengthSync():number|null}}
 */
const isMultipartFormDataStream = (value) => {
	return (
		value instanceof Stream === true &&
		typeof value.getBoundary === "function" &&
		typeof value.hasKnownLength === "function" &&
		typeof value.getLengthSync === "function"
	);
};

/**
 * Check if `obj` is an instance of AbortSignal.
 *
 * @param  {any} object
 * @return {obj is AbortSignal}
 */
const isAbortSignal = (object) => {
	return (
		typeof object === "object" &&
		(object[NAME] === "AbortSignal" || object[NAME] === "EventTarget")
	);
};

/**
 * Check if `value` is a ReadableStream.
 *
 * @param {*} value
 * @returns {value is ReadableStream}
 */
const isReadableStream = (value) => {
	return (
		typeof value === "object" &&
		typeof value.getReader === "function" &&
		typeof value.cancel === "function" &&
		typeof value.tee === "function"
	);
};

/**
 *
 * @param {any} value
 * @returns {value is Iterable<unknown>}
 */
const isIterable = (value) => value && Symbol.iterator in value;

const carriage = '\r\n';
const dashes = '-'.repeat(2);
const carriageLength = Buffer.byteLength(carriage);

/**
 * @param {string} boundary
 */
const getFooter = boundary => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;

/**
 * @param {string} boundary
 * @param {string} name
 * @param {*} field
 *
 * @return {string}
 */
function getHeader(boundary, name, field) {
	let header = '';

	header += `${dashes}${boundary}${carriage}`;
	header += `Content-Disposition: form-data; name="${name}"`;

	if (isBlob(field)) {
		const { name = 'blob', type } = /** @type {Blob & {name?:string}} */ (field);
		header += `; filename="${name}"${carriage}`;
		header += `Content-Type: ${type || 'application/octet-stream'}`;
	}

	return `${header}${carriage.repeat(2)}`;
}

/**
 * @return {string}
 */
const getBoundary = () => crypto.randomBytes(8).toString('hex');

/**
 * @param {FormData} form
 * @param {string} boundary
 */
async function * formDataIterator(form, boundary) {
	const encoder = new TextEncoder();
	for (const [name, value] of form) {
		yield encoder.encode(getHeader(boundary, name, value));

		if (isBlob(value)) {
			// @ts-ignore - we know our streams implement aysnc iteration
			yield * value.stream();
		} else {
			yield encoder.encode(value);
		}

		yield encoder.encode(carriage);
	}

	yield encoder.encode(getFooter(boundary));
}

/**
 * @param {FormData} form
 * @param {string} boundary
 */
function getFormDataLength(form, boundary) {
	let length = 0;

	for (const [name, value] of form) {
		length += Buffer.byteLength(getHeader(boundary, name, value));

		if (isBlob(value)) {
			length += value.size;
		} else {
			length += Buffer.byteLength(String(value));
		}

		length += carriageLength;
	}

	length += Buffer.byteLength(getFooter(boundary));

	return length;
}

/**
 * @param {Body & {headers?:Headers}} source
 */
const toFormData = async (source) => {
  let { body, headers } = source;
  const contentType = headers?.get('Content-Type') || '';

  if (contentType.startsWith('application/x-www-form-urlencoded') && body != null) {
		const form = new webFormData.FormData();
		let bodyText = await source.text();
		new URLSearchParams(bodyText).forEach((v, k) => form.append(k, v));
		return form;
  }

  const [type, boundary] = contentType.split(/\s*;\s*boundary=/);
  if (type === 'multipart/form-data' && boundary != null && body != null) {
    const form = new webFormData.FormData();
    const parts = multipartParser.iterateMultipart(body, boundary);
    for await (const { name, data, filename, contentType } of parts) {
      if (typeof filename === 'string') {
        form.append(name, new webFile.File([data], filename, { type: contentType }));
      } else if (typeof filename !== 'undefined') {
        form.append(name, new webFile.File([], '', { type: contentType }));
      } else {
        form.append(name, new TextDecoder().decode(data), filename);
      }
    }
    return form
  } else {
    throw new TypeError('Could not parse content as FormData.')
  }
};

const encoder = new util.TextEncoder();
const decoder = new util.TextDecoder();

/**
 * @param {string} text
 */
const encode = text => encoder.encode(text);

/**
 * @param {Uint8Array} bytes
 */
const decode = bytes => decoder.decode(bytes);

// @ts-check
const {readableHighWaterMark} = new Stream.Readable();

const INTERNALS$2 = Symbol('Body internals');

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 * @implements {globalThis.Body}
 */

class Body {
	/**
	 * @param {BodyInit|Stream|null} body
	 * @param {{size?:number}} options
	 */
	constructor(body, {
		size = 0
	} = {}) {
		const state = {
			/** @type {null|ReadableStream<Uint8Array>} */
			body: null,
			/** @type {string|null} */
			type: null,
			/** @type {number|null} */
			size: null,
			/** @type {null|string} */
			boundary: null,
			disturbed: false,
			/** @type {null|Error} */
			error: null
		};
		/** @private */
		this[INTERNALS$2] = state;

		if (body === null) {
			// Body is undefined or null
			state.body = null;
			state.size = 0;
		} else if (isURLSearchParameters(body)) {
		// Body is a URLSearchParams
			const bytes = encode(body.toString());
			state.body = fromBytes(bytes);
			state.size = bytes.byteLength;
			state.type = 'application/x-www-form-urlencoded;charset=UTF-8';
		} else if (isBlob(body)) {
			// Body is blob
			state.size = body.size;
			state.type = body.type || null;
			state.body = body.stream();
		} else if (body instanceof Uint8Array) {
			// Body is Buffer
			state.body = fromBytes(body);
			state.size = body.byteLength;
		} else if (util.types.isAnyArrayBuffer(body)) {
			// Body is ArrayBuffer
			const bytes = new Uint8Array(body);
			state.body = fromBytes(bytes);
			state.size = bytes.byteLength;
		} else if (ArrayBuffer.isView(body)) {
			// Body is ArrayBufferView
			const bytes = new Uint8Array(body.buffer, body.byteOffset, body.byteLength);
			state.body = fromBytes(bytes);
			state.size = bytes.byteLength;
		} else if (isReadableStream(body)) {
			// Body is stream
			state.body = body;
		} else if (isFormData(body)) {
			// Body is an instance of formdata-node
			const boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
			state.type = `multipart/form-data; boundary=${boundary}`;
			state.size = getFormDataLength(body, boundary);
			state.body = fromAsyncIterable(formDataIterator(body, boundary));
		} else if (isMultipartFormDataStream(body)) {
			state.type = `multipart/form-data; boundary=${body.getBoundary()}`;
			state.size = body.hasKnownLength() ? body.getLengthSync() : null;
			state.body = fromStream(body);
		} else if (body instanceof Stream) {
			state.body = fromStream(body);
		} else {
			// None of the above
			// coerce to string then buffer
			const bytes = encode(String(body));
			state.type = 'text/plain;charset=UTF-8';
			state.size = bytes.byteLength;
			state.body = fromBytes(bytes);
		}

		this.size = size;

		// if (body instanceof Stream) {
		// 	body.on('error', err => {
		// 		const error = err instanceof FetchBaseError ?
		// 			err :
		// 			new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, 'system', err);
		// 		this[INTERNALS].error = error;
		// 	});
		// }
	}

	/** @type {Headers} */
	/* c8 ignore next 3 */
	get headers() {
		throw new TypeError(`'get headers' called on an object that does not implements interface.`)
	}

	get body() {
		return this[INTERNALS$2].body;
	}

	get bodyUsed() {
		return this[INTERNALS$2].disturbed;
	}

	/**
	 * Decode response as ArrayBuffer
	 *
	 * @return {Promise<ArrayBuffer>}
	 */
	async arrayBuffer() {
		const {buffer, byteOffset, byteLength} = await consumeBody(this);
		return buffer.slice(byteOffset, byteOffset + byteLength);
	}

	/**
	 * Return raw response as Blob
	 *
	 * @return Promise
	 */
	async blob() {
		const ct = (this.headers && this.headers.get('content-type')) || (this[INTERNALS$2].body && this[INTERNALS$2].type) || '';
		const buf = await consumeBody(this);

		return new webBlob.Blob([buf], {
			type: ct
		});
	}

	/**
	 * Decode response as json
	 *
	 * @return  Promise
	 */
	async json() {
		return JSON.parse(await this.text());
	}

	/**
	 * Decode response as text
	 *
	 * @return  Promise
	 */
	async text() {
		const buffer = await consumeBody(this);
		return decode(buffer);
	}

	/**
	 * @returns {Promise<FormData>}
	 */
	async formData() {
		return toFormData(this)
	}
}

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: {enumerable: true},
	bodyUsed: {enumerable: true},
	arrayBuffer: {enumerable: true},
	blob: {enumerable: true},
	json: {enumerable: true},
	text: {enumerable: true},
	formData: {enumerable: true}
});

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @param {Body & {url?:string}} data
 * @return {Promise<Uint8Array>}
 */
async function consumeBody(data) {
	const state = data[INTERNALS$2];
	if (state.disturbed) {
		throw new TypeError(`body used already for: ${data.url}`);
	}

	state.disturbed = true;

	if (state.error) {
		throw state.error;
	}

	const {body} = state;

	// Body is null
	if (body === null) {
		return new Uint8Array(0);
	}

	// Body is stream
	// get ready to actually consume the body
	/** @type {[Uint8Array|null, Uint8Array[], number]} */
	const [buffer, chunks, limit] = data.size > 0 ?
		[new Uint8Array(data.size), [], data.size] :
		[null, [], Infinity];
	let offset = 0;

	const source = streamIterator(body);
	try {
		for await (const chunk of source) {
			const bytes = chunk instanceof Uint8Array ?
				chunk :
				Buffer.from(chunk);

			if (offset + bytes.byteLength > limit) {
				const error = new FetchError(`content size at ${data.url} over limit: ${limit}`, 'max-size');
				source.throw(error);
				throw error;
			} else if (buffer) {
				buffer.set(bytes, offset);
			} else {
				chunks.push(bytes);
			}

			offset += bytes.byteLength;
		}

		if (buffer) {
			if (offset < buffer.byteLength) {
				throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`, 'premature-close');
			} else {
				return buffer;
			}
		} else {
			return writeBytes(new Uint8Array(offset), chunks);
		}
	} catch (error) {
		if (error instanceof FetchBaseError) {
			throw error;
		// @ts-expect-error - we know it will have a name
		} else if (error && error.name === 'AbortError') {
			throw error;
		} else {
			const e = /** @type {import('./errors/fetch-error').SystemError} */(error);
			// Other errors, such as incorrect content-encoding
			throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${e.message}`, 'system', e);
		}
	}
}

/**
 * Clone body given Res/Req instance
 *
 * @param {Body} instance       Response or Request instance
 * @return {ReadableStream<Uint8Array> | null}
 */
const clone = instance => {
	const {body} = instance;

	// Don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	if (!body) {
		return null;
	}

	const [left, right] = body.tee();
	instance[INTERNALS$2].body = left;
	return right;
};

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param {Body} source Any options.body input
 * @returns {string | null}
 */
const extractContentType = source => source[INTERNALS$2].type;

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param {Body} source - Body object from the Body instance.
 * @returns {number | null}
 */
const getTotalBytes = source => source[INTERNALS$2].size;

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param {Stream.Writable} dest - The stream to write to.
 * @param {Body} source - Body object from the Body instance.
 * @returns {void}
 */
const writeToStream = (dest, {body}) => {
	if (body === null) {
		// Body is null
		dest.end();
	} else {
		Stream.Readable.from(streamIterator(body)).pipe(dest);
	}
};

/**
 * @template T
 * @implements {AsyncGenerator<T, void, void>}
 */
class StreamIterableIterator {
	/**
	 * @param {ReadableStream<T>} stream
	 */
	constructor(stream) {
		this.stream = stream;
		this.reader = null;
	}

	/**
	 * @returns {AsyncGenerator<T, void, void>}
	 */
	[Symbol.asyncIterator]() {
		return this;
	}

	getReader() {
		if (this.reader) {
			return this.reader;
		}

		const reader = this.stream.getReader();
		this.reader = reader;
		return reader;
	}

	/**
	 * @returns {Promise<IteratorResult<T, void>>}
	 */
	next() {
		return /** @type {Promise<IteratorResult<T, void>>} */ (this.getReader().read());
	}

	/**
	 * @returns {Promise<IteratorResult<T, void>>}
	 */
	async return() {
		if (this.reader) {
			await this.reader.cancel();
		}

		return {done: true, value: undefined};
	}

	/**
	 * 
	 * @param {any} error 
	 * @returns {Promise<IteratorResult<T, void>>}
	 */
	async throw(error) {
		await this.getReader().cancel(error);
		return {done: true, value: undefined};
	}
}

/**
 * @template T
 * @param {ReadableStream<T>} stream
 */
const streamIterator = stream => new StreamIterableIterator(stream);

/**
 * @param {Uint8Array} buffer
 * @param {Uint8Array[]} chunks
 */
const writeBytes = (buffer, chunks) => {
	let offset = 0;
	for (const chunk of chunks) {
		buffer.set(chunk, offset);
		offset += chunk.byteLength;
	}

	return buffer;
};

/**
 * @param {Uint8Array} bytes
 * @returns {ReadableStream<Uint8Array>}
 */
// @ts-ignore
const fromBytes = bytes => new webBlob.ReadableStream({
	start(controller) {
		controller.enqueue(bytes);
		controller.close();
	}
});

/**
 * @param {AsyncIterable<Uint8Array>} content
 * @returns {ReadableStream<Uint8Array>}
 */
const fromAsyncIterable = content =>
	new webBlob.ReadableStream(new AsyncIterablePump(content));

/**
 * @implements {UnderlyingSource<Uint8Array>}
 */
class AsyncIterablePump {
	/**
	 * @param {AsyncIterable<Uint8Array>} source
	 */
	constructor(source) {
		this.source = source[Symbol.asyncIterator]();
	}

	/**
	 * @param {ReadableStreamController<Uint8Array>} controller
	 */
	async pull(controller) {
		try {
			while (controller.desiredSize || 0 > 0) {
				// eslint-disable-next-line no-await-in-loop
				const next = await this.source.next();
				if (next.done) {
					controller.close();
					break;
				} else {
					controller.enqueue(next.value);
				}
			}
		} catch (error) {
			controller.error(error);
		}
	}

	/**
	 * @param {any} [reason]
	 */
	cancel(reason) {
		if (reason) {
			if (typeof this.source.throw === 'function') {
				this.source.throw(reason);
			} else if (typeof this.source.return === 'function') {
				this.source.return();
			}
		} else if (typeof this.source.return === 'function') {
			this.source.return();
		}
	}
}

/**
 * @param {Stream & {readableHighWaterMark?:number}} source
 * @returns {ReadableStream<Uint8Array>}
 */
const fromStream = source => {
	const pump = new StreamPump(source);
	const stream = new webBlob.ReadableStream(pump, pump);
	return stream;
};

/**
 * @implements {UnderlyingSource<Uint8Array>}
 * @implements {QueuingStrategy<Uint8Array>}
 */
class StreamPump {
	/**
	 * @param {Stream & {
	 * 	readableHighWaterMark?: number
	 * 	readable?:boolean,
	 * 	resume?: () => void,
	 * 	pause?: () => void
	 * 	destroy?: (error?:Error) => void
	 * }} stream
	 */
	constructor(stream) {
		this.highWaterMark = stream.readableHighWaterMark || readableHighWaterMark;
		this.accumalatedSize = 0;
		this.stream = stream;
		this.enqueue = this.enqueue.bind(this);
		this.error = this.error.bind(this);
		this.close = this.close.bind(this);
	}

	/**
	 * @param {Uint8Array} [chunk]
	 */
	size(chunk) {
		return chunk?.byteLength || 0;
	}

	/**
	 * @param {ReadableStreamController<Uint8Array>} controller
	 */
	start(controller) {
		this.controller = controller;
		this.stream.on('data', this.enqueue);
		this.stream.once('error', this.error);
		this.stream.once('end', this.close);
		this.stream.once('close', this.close);
	}

	pull() {
		this.resume();
	}

	/**
	 * @param {any} [reason]
	 */
	cancel(reason) {
		if (this.stream.destroy) {
			this.stream.destroy(reason);
		}

		this.stream.off('data', this.enqueue);
		this.stream.off('error', this.error);
		this.stream.off('end', this.close);
		this.stream.off('close', this.close);
	}

	/**
	 * @param {Uint8Array|string} chunk
	 */
	enqueue(chunk) {
		if (this.controller) {
			try {
				const bytes = chunk instanceof Uint8Array ?
					chunk :
					Buffer.from(chunk);

				const available = (this.controller.desiredSize || 0) - bytes.byteLength;
				this.controller.enqueue(bytes);
				if (available <= 0) {
					this.pause();
				}
			} catch {
				this.controller.error(new Error('Could not create Buffer, chunk must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object'));
				this.cancel();
			}
		}
	}

	pause() {
		if (this.stream.pause) {
			this.stream.pause();
		}
	}

	resume() {
		if (this.stream.readable && this.stream.resume) {
			this.stream.resume();
		}
	}

	close() {
		if (this.controller) {
			this.controller.close();
			delete this.controller;
		}
	}

	/**
	 * @param {Error} error 
	 */
	error(error) {
		if (this.controller) {
			this.controller.error(error);
			delete this.controller;
		}
	}
}

/**
 * Headers.js
 *
 * Headers class offers convenient helpers
 */

/** @type {{validateHeaderValue?:(name:string, value:string) => any}} */
const validators = (http);

/**
 * @param {string} name
 */
const validateHeaderName = name => {
	if (!/^[\^`\-\w!#$%&'*+.|~:]+$/.test(name)) {
		const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
		Object.defineProperty(err, 'code', {value: 'ERR_INVALID_HTTP_TOKEN'});
		throw err;
	}
};

const validateHeaderValue = typeof validators.validateHeaderValue === 'function' ?
	validators.validateHeaderValue :
	/**
	 * @param {string} name
	 * @param {string} value
	 */
	(name, value) => {
		if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
			const err = new TypeError(`Invalid character in header content ["${name}"]`);
			Object.defineProperty(err, 'code', {value: 'ERR_INVALID_CHAR'});
			throw err;
		}
	};

/**
 * @typedef {Headers | Record<string, string> | Iterable<readonly [string, string]> | Iterable<Iterable<string>>} HeadersInit
 */

/**
 * This Fetch API interface allows you to perform various actions on HTTP request and response headers.
 * These actions include retrieving, setting, adding to, and removing.
 * A Headers object has an associated header list, which is initially empty and consists of zero or more name and value pairs.
 * You can add to this using methods like append() (see Examples.)
 * In all methods of this interface, header names are matched by case-insensitive byte sequence.
 *
 * @implements {globalThis.Headers}
 */
class Headers extends URLSearchParams {
	/**
	 * Headers class
	 *
	 * @constructor
	 * @param {HeadersInit} [init] - Response headers
	 */
	constructor(init) {
		// Validate and normalize init object in [name, value(s)][]
		/** @type {string[][]} */
		let result = [];
		if (init instanceof Headers) {
			const raw = init.raw();
			for (const [name, values] of Object.entries(raw)) {
				result.push(...values.map(value => [name, value]));
			}
		} else if (init == null) ; else if (isIterable(init)) {
			// Sequence<sequence<ByteString>>
			// Note: per spec we have to first exhaust the lists then process them
			result = [...init]
				.map(pair => {
					if (
						typeof pair !== 'object' || util.types.isBoxedPrimitive(pair)
					) {
						throw new TypeError('Each header pair must be an iterable object');
					}

					return [...pair];
				}).map(pair => {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}

					return [...pair];
				});
		} else if (typeof init === "object" && init !== null) {
			// Record<ByteString, ByteString>
			result.push(...Object.entries(init));
		} else {
			throw new TypeError('Failed to construct \'Headers\': The provided value is not of type \'(sequence<sequence<ByteString>> or record<ByteString, ByteString>)');
		}

		// Validate and lowercase
		result =
			result.length > 0 ?
				result.map(([name, value]) => {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return [String(name).toLowerCase(), String(value)];
				}) :
				[];

		super(result);

		// Returning a Proxy that will lowercase key names, validate parameters and sort keys
		// eslint-disable-next-line no-constructor-return
		return new Proxy(this, {
			get(target, p, receiver) {
				switch (p) {
					case 'append':
					case 'set':
						/**
						 * @param {string} name
						 * @param {string} value
						 */
						return (name, value) => {
							validateHeaderName(name);
							validateHeaderValue(name, String(value));
							return URLSearchParams.prototype[p].call(
								target,
								String(name).toLowerCase(),
								String(value)
							);
						};

					case 'delete':
					case 'has':
					case 'getAll':
						/**
						 * @param {string} name
						 */
						return name => {
							validateHeaderName(name);
							// @ts-ignore
							return URLSearchParams.prototype[p].call(
								target,
								String(name).toLowerCase()
							);
						};

					case 'keys':
						return () => {
							target.sort();
							return new Set(URLSearchParams.prototype.keys.call(target)).keys();
						};

					default:
						return Reflect.get(target, p, receiver);
				}
			}
			/* c8 ignore next */
		});
	}

	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	toString() {
		return Object.prototype.toString.call(this);
	}

	/**
	 *
	 * @param {string} name
	 */
	get(name) {
		const values = this.getAll(name);
		if (values.length === 0) {
			return null;
		}

		let value = values.join(', ');
		if (/^content-encoding$/i.test(name)) {
			value = value.toLowerCase();
		}

		return value;
	}

	/**
	 * @param {(value: string, key: string, parent: this) => void} callback
	 * @param {any} thisArg
	 * @returns {void}
	 */
	forEach(callback, thisArg = undefined) {
		for (const name of this.keys()) {
			if (name.toLowerCase() === 'set-cookie') {
				let cookies = this.getAll(name);
				while (cookies.length > 0) {
					Reflect.apply(callback, thisArg, [cookies.shift(), name, this]);
				}
			} else {
				Reflect.apply(callback, thisArg, [this.get(name), name, this]);
			}
		}
	}

	/**
	 * @returns {IterableIterator<string>}
	 */
	* values() {
		for (const name of this.keys()) {
			if (name.toLowerCase() === 'set-cookie') {
				let cookies = this.getAll(name);
				while (cookies.length > 0) {
					yield /** @type {string} */(cookies.shift());
				}
			} else {
				yield /** @type {string} */(this.get(name));
			}
		}
	}

	/**
	 * @returns {IterableIterator<[string, string]>}
	 */
	* entries() {
		for (const name of this.keys()) {
			if (name.toLowerCase() === 'set-cookie') {
				let cookies = this.getAll(name);
				while (cookies.length > 0) {
					yield [name, /** @type {string} */(cookies.shift())];
				}
			} else {
				yield [name, /** @type {string} */(this.get(name))];
			}
		}
	}

	[Symbol.iterator]() {
		return this.entries();
	}

	/**
	 * Node-fetch non-spec method
	 * returning all headers and their values as array
	 * @returns {Record<string, string[]>}
	 */
	raw() {
		return [...this.keys()].reduce((result, key) => {
			result[key] = this.getAll(key);
			return result;
		}, /** @type {Record<string, string[]>} */({}));
	}

	/**
	 * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
	 */
	[Symbol.for('nodejs.util.inspect.custom')]() {
		return [...this.keys()].reduce((result, key) => {
			const values = this.getAll(key);
			// Http.request() only supports string as Host header.
			// This hack makes specifying custom Host header possible.
			if (key === 'host') {
				result[key] = values[0];
			} else {
				result[key] = values.length > 1 ? values : values[0];
			}

			return result;
		}, /** @type {Record<string, string|string[]>} */({}));
	}
}

/**
 * Re-shaping object for Web IDL tests
 * Only need to do it for overridden methods
 */
Object.defineProperties(
	Headers.prototype,
	['get', 'entries', 'forEach', 'values'].reduce((result, property) => {
		result[property] = {enumerable: true};
		return result;
	}, /** @type {Record<string, {enumerable:true}>} */ ({}))
);

/**
 * Create a Headers object from an http.IncomingMessage.rawHeaders, ignoring those that do
 * not conform to HTTP grammar productions.
 * @param {import('http').IncomingMessage['rawHeaders']} headers
 */
function fromRawHeaders(headers = []) {
	return new Headers(
		headers
			// Split into pairs
			.reduce((result, value, index, array) => {
				if (index % 2 === 0) {
					result.push(array.slice(index, index + 2));
				}

				return result;
			}, /** @type {string[][]} */([]))
			.filter(([name, value]) => {
				try {
					validateHeaderName(name);
					validateHeaderValue(name, String(value));
					return true;
				} catch {
					return false;
				}
			})

	);
}

const redirectStatus = new Set([301, 302, 303, 307, 308]);

/**
 * Redirect code matching
 *
 * @param {number} code - Status code
 * @return {boolean}
 */
const isRedirect = code => {
	return redirectStatus.has(code);
};

/**
 * Response.js
 *
 * Response class provides content decoding
 */

const INTERNALS$1 = Symbol('Response internals');

/**
 * Response class
 * 
 * @typedef {Object} Ext
 * @property {number} [size]
 * @property {string} [url]
 * @property {number} [counter]
 * @property {number} [highWaterMark]
 * 
 * @implements {globalThis.Response}
 */
class Response extends Body {
	/**
	 * @param {BodyInit|import('stream').Stream|null} [body] - Readable stream
	 * @param {ResponseInit & Ext} [options] - Response options
	 */
	constructor(body = null, options = {}) {
		super(body, options);

		const status = options.status || 200;
		const headers = new Headers(options.headers);

		if (body !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(this);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		/**
		 * @private
		*/
		this[INTERNALS$1] = {
			url: options.url,
			status,
			statusText: options.statusText || '',
			headers,
			counter: options.counter || 0,
			highWaterMark: options.highWaterMark
		};
	}

	/**
	 * @type {ResponseType}
	 */
	get type() {
		return "default"
	}

	get url() {
		return this[INTERNALS$1].url || '';
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
	 * Convenience property representing if the request ended normally
	 */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get redirected() {
		return this[INTERNALS$1].counter > 0;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	/**
	 * @type {Headers}
	 */
	get headers() {
		return this[INTERNALS$1].headers;
	}

	get highWaterMark() {
		return this[INTERNALS$1].highWaterMark;
	}

	/**
	 * Clone this response
	 *
	 * @returns {Response}
	 */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			size: this.size
		});
	}

	/**
	 * @param {string} url    The URL that the new response is to originate from.
	 * @param {number} status An optional status code for the response (e.g., 302.)
	 * @returns {Response}    A Response object.
	 */
	static redirect(url, status = 302) {
		if (!isRedirect(status)) {
			throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
		}

		return new Response(null, {
			headers: {
				location: new URL(url).toString()
			},
			status
		});
	}

	get [Symbol.toStringTag]() {
		return 'Response';
	}
}

Object.defineProperties(Response.prototype, {
	url: {enumerable: true},
	status: {enumerable: true},
	ok: {enumerable: true},
	redirected: {enumerable: true},
	statusText: {enumerable: true},
	headers: {enumerable: true},
	clone: {enumerable: true}
});

/**
 * @param {URL} parsedURL 
 * @returns {string}
 */
const getSearch = parsedURL => {
	if (parsedURL.search) {
		return parsedURL.search;
	}

	const lastOffset = parsedURL.href.length - 1;
	const hash = parsedURL.hash || (parsedURL.href[lastOffset] === '#' ? '#' : '');
	return parsedURL.href[lastOffset - hash.length] === '?' ? '?' : '';
};

const INTERNALS = Symbol('Request internals');

const forbiddenMethods = new Set(["CONNECT", "TRACE", "TRACK"]);
const normalizedMethods = new Set(["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"]);

/**
 * Check if `obj` is an instance of Request.
 *
 * @param  {any} object
 * @return {object is Request}
 */
const isRequest = object => {
	return (
		typeof object === 'object' &&
		typeof object[INTERNALS] === 'object'
	);
};


/**
 * Request class
 * @implements {globalThis.Request}
 *
 * @typedef {Object} RequestState
 * @property {string} method
 * @property {RequestRedirect} redirect
 * @property {globalThis.Headers} headers
 * @property {RequestCredentials} credentials
 * @property {URL} parsedURL
 * @property {AbortSignal|null} signal
 *
 * @typedef {Object} RequestExtraOptions
 * @property {number} [follow]
 * @property {boolean} [compress]
 * @property {number} [size]
 * @property {number} [counter]
 * @property {Agent} [agent]
 * @property {number} [highWaterMark]
 * @property {boolean} [insecureHTTPParser]
 *
 * @typedef {((url:URL) => import('http').Agent | import('https').Agent) | import('http').Agent | import('https').Agent} Agent
 *
 * @typedef {Object} RequestOptions
 * @property {string} [method]
 * @property {ReadableStream<Uint8Array>|null} [body]
 * @property {globalThis.Headers} [headers]
 * @property {RequestRedirect} [redirect]
 *
 */
class Request extends Body {
	/**
	 * @param {string|Request|URL} info  Url or Request instance
	 * @param {RequestInit & RequestExtraOptions} init   Custom options
	 */
	constructor(info, init = {}) {
		let parsedURL;
		/** @type {RequestOptions & RequestExtraOptions} */
		let settings;

		// Normalize input and force URL to be encoded as UTF-8 (https://github.com/node-fetch/node-fetch/issues/245)
		if (isRequest(info)) {
			parsedURL = new URL(info.url);
			settings = (info);
		} else {
			parsedURL = new URL(info);
			settings = {};
		}



		// Normalize method: https://fetch.spec.whatwg.org/#methods
		let method = init.method || settings.method || 'GET';
		if (forbiddenMethods.has(method.toUpperCase())) {
			throw new TypeError(`Failed to construct 'Request': '${method}' HTTP method is unsupported.`)
		} else if (normalizedMethods.has(method.toUpperCase())) {
			method = method.toUpperCase();
		}

		const inputBody = init.body != null
			? init.body
			: (isRequest(info) && info.body !== null)
			? clone(info)
			: null;

		// eslint-disable-next-line no-eq-null, eqeqeq
		if (inputBody != null && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		super(inputBody, {
			size: init.size || settings.size || 0
		});
		const input = settings;


		const headers = /** @type {globalThis.Headers} */
			(new Headers(init.headers || input.headers || {}));

		if (inputBody !== null && !headers.has('Content-Type')) {
			const contentType = extractContentType(this);
			if (contentType) {
				headers.append('Content-Type', contentType);
			}
		}

		let signal = 'signal' in init
			? init.signal
			: isRequest(input)
			? input.signal
			: null;

		// eslint-disable-next-line no-eq-null, eqeqeq
		if (signal != null && !isAbortSignal(signal)) {
			throw new TypeError('Expected signal to be an instanceof AbortSignal or EventTarget');
		}

		if (!signal) {
			let AbortControllerConstructor = typeof AbortController != "undefined"
			? AbortController
			: abortController.AbortController;
			/** @type {any} */
			let newSignal = new AbortControllerConstructor().signal;
			signal = newSignal;
		}

		/** @type {RequestState} */
		this[INTERNALS] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			credentials: init.credentials || 'same-origin',
			parsedURL,
			signal: signal || null
		};

		/** @type {boolean} */
		this.keepalive;

		// Node-fetch-only options
		/** @type {number} */
		this.follow = init.follow === undefined ? (input.follow === undefined ? 20 : input.follow) : init.follow;
		/** @type {boolean} */
		this.compress = init.compress === undefined ? (input.compress === undefined ? true : input.compress) : init.compress;
		/** @type {number} */
		this.counter = init.counter || input.counter || 0;
		/** @type {Agent|undefined} */
		this.agent = init.agent || input.agent;
		/** @type {number} */
		this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
		/** @type {boolean} */
		this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
	}

	/**
	 * @type {RequestCache}
	 */
	get cache() {
		return "default"
	}

	/**
	 * @type {RequestCredentials}
	 */

	get credentials() {
		return this[INTERNALS].credentials
	}

	/**
	 * @type {RequestDestination}
	 */
	get destination() {
		return ""
	}

	get integrity() {
		return ""
	}

	/** @type {RequestMode} */
	get mode() {
		return "cors"
	}

	/** @type {string} */
	get referrer() {
		return  ""
	}

	/** @type {ReferrerPolicy} */
	get referrerPolicy() {
		return ""
	}
	get method() {
		return this[INTERNALS].method;
	}

	/**
	 * @type {string}
	 */
	get url() {
		return url.format(this[INTERNALS].parsedURL);
	}

	/**
	 * @type {globalThis.Headers}
	 */
	get headers() {
		return this[INTERNALS].headers;
	}

	get redirect() {
		return this[INTERNALS].redirect;
	}

	/**
	 * @returns {AbortSignal}
	 */
	get signal() {
		// @ts-ignore
		return this[INTERNALS].signal;
	}

	/**
	 * Clone this request
	 *
	 * @return  {globalThis.Request}
	 */
	clone() {
		return new Request(this);
	}

	get [Symbol.toStringTag]() {
		return 'Request';
	}
}

Object.defineProperties(Request.prototype, {
	method: {enumerable: true},
	url: {enumerable: true},
	headers: {enumerable: true},
	redirect: {enumerable: true},
	clone: {enumerable: true},
	signal: {enumerable: true}
});

/**
 * Convert a Request to Node.js http request options.
 * The options object to be passed to http.request
 *
 * @param {Request & Record<INTERNALS, RequestState>} request -  A Request instance
 */
const getNodeRequestOptions = request => {
	const {parsedURL} = request[INTERNALS];
	const headers = new Headers(request[INTERNALS].headers);

	// Fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body === null && /^(post|put)$/i.test(request.method)) {
		contentLengthValue = '0';
	}

	if (request.body !== null) {
		const totalBytes = getTotalBytes(request);
		// Set Content-Length if totalBytes is a number (that is not NaN)
		if (typeof totalBytes === 'number' && !Number.isNaN(totalBytes)) {
			contentLengthValue = String(totalBytes);
		}
	}

	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress && !headers.has('Accept-Encoding')) {
		headers.set('Accept-Encoding', 'gzip,deflate,br');
	}

	let {agent} = request;
	if (typeof agent === 'function') {
		agent = agent(parsedURL);
	}

	if (!headers.has('Connection') && !agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	const search = getSearch(parsedURL);

	// Manually spread the URL object instead of spread syntax
	const requestOptions = {
		path: parsedURL.pathname + search,
		pathname: parsedURL.pathname,
		hostname: parsedURL.hostname,
		protocol: parsedURL.protocol,
		port: parsedURL.port,
		hash: parsedURL.hash,
		search: parsedURL.search,
		// @ts-ignore - it does not has a query
		query: parsedURL.query,
		href: parsedURL.href,
		method: request.method,
		// @ts-ignore - not sure what this supposed to do
		headers: headers[Symbol.for('nodejs.util.inspect.custom')](),
		insecureHTTPParser: request.insecureHTTPParser,
		agent
	};

	return requestOptions;
};

/**
 * AbortError interface for cancelled requests
 */
class AbortError extends FetchBaseError {
	/**
	 * @param {string} message 
	 * @param {string} [type]
	 */
	constructor(message, type = 'aborted') {
		super(message, type);
	}
}

/**
 * Index.js
 *
 * a request API compatible with window.fetch
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */

const supportedSchemas = new Set(['data:', 'http:', 'https:', 'file:']);

/**
 * Fetch function
 *
 * @param   {string | URL | import('./request.js').default} url - Absolute url or Request instance
 * @param   {RequestInit & import('./request.js').RequestExtraOptions} [options_] - Fetch options
 * @return  {Promise<import('./response.js').default>}
 */
async function fetch(url, options_ = {}) {
	return new Promise((resolve, reject) => {
		// Build request object
		const request = new Request(url, options_);
		const options = getNodeRequestOptions(request);
		if (!supportedSchemas.has(options.protocol)) {
			throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options.protocol.replace(/:$/, '')}" is not supported.`);
		}

		if (options.protocol === 'data:') {
			const data = dataUriToBuffer(request.url.toString());
			const response = new Response(data, {headers: {'Content-Type': data.typeFull}});
			resolve(response);
			return;
		}

		if (options.protocol === 'file:') {
			const stream = fs.createReadStream(new URL(request.url));
			const type = mime.lookup(request.url) || 'application/octet-stream';
			const response = new Response(stream, {headers: {'Content-Type': type }});
			resolve(response);
			return;
		}

		// Wrap http.request into fetch
		const send = (options.protocol === 'https:' ? https : http).request;
		const {signal} = request;
		/** @type {Response|null} */
		let response = null;
		/** @type {import('http').IncomingMessage|null} */
		let response_ = null;

		const abort = () => {
			const error = new AbortError('The operation was aborted.');
			reject(error);
			if (request.body) {
				request.body.cancel(error);
			}

			if (!response_) {
				return;
			}

			response_.emit('error', error);
		};

		if (signal && signal.aborted) {
			abort();
			return;
		}

		const abortAndFinalize = () => {
			abort();
			finalize();
		};

		// Send request
		const request_ = send(options);

		if (signal) {
			signal.addEventListener('abort', abortAndFinalize);
		}

		const finalize = () => {
			request_.abort();
			if (signal) {
				signal.removeEventListener('abort', abortAndFinalize);
			}
		};

		request_.on('error', err => {
			// @ts-expect-error - err may not be SystemError
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		fixResponseChunkedTransferBadEnding(request_, err => {
			if (signal && signal.aborted) {
				return
			}

			response_?.emit("error", err);
		});

		/* c8 ignore next 18 */
		if (parseInt(process.version.substring(1)) < 14) {
			// Before Node.js 14, pipeline() does not fully support async iterators and does not always
			// properly handle when the socket close/end events are out of order.
			request_.on('socket', s => {
				s.prependListener('close', hadError => {
					// if a data listener is still present we didn't end cleanly
					const hasDataListener = s.listenerCount('data') > 0;

					// if end happened before close but the socket didn't emit an error, do it now
					if (response && hasDataListener && !hadError && !(signal && signal.aborted)) {
						const err = Object.assign(new Error('Premature close'), {
							code: 'ERR_STREAM_PREMATURE_CLOSE'
						});
						response_?.emit('error', err);
					}
				});
			});
		}

		request_.on('response', incoming => {
			response_ = incoming;
			request_.setTimeout(0);
			const headers = fromRawHeaders(response_.rawHeaders);

			// HTTP fetch step 5
			if (isRedirect(Number(response_.statusCode))) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : new URL(location, request.url);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// Node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							headers.set('Location', locationURL.toString());
						}

						break;
					case 'follow': {
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOptions = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							// Note: We can not use `request.body` because send would have
							// consumed it already.
							body: options_.body,
							signal: signal,
							size: request.size
						};

						// HTTP-redirect fetch step 9
						const isStreamBody =
							requestOptions.body instanceof webBlob.ReadableStream ||
							requestOptions.body instanceof Stream.Readable;
						if (response_.statusCode !== 303 && isStreamBody) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (response_.statusCode === 303 || ((response_.statusCode === 301 || response_.statusCode === 302) && request.method === 'POST')) {
							requestOptions.method = 'GET';
							requestOptions.body = undefined;
							requestOptions.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						fetch(new Request(locationURL.href, requestOptions)).then(resolve, reject);
						finalize();
						return;
					}

					default:
						return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
				}
			}

			// Prepare response
			if (signal) {
				response_.once('end', () => {
					signal.removeEventListener('abort', abortAndFinalize);
				});
			}

			let body = Stream.pipeline(response_, new Stream.PassThrough(), reject);
			// see https://github.com/nodejs/node/pull/29376
			/* c8 ignore next 3 */
			if (process.version < 'v12.10') {
				response_.on('aborted', abortAndFinalize);
			}

			const responseOptions = {
				url: request.url,
				status: response_.statusCode,
				statusText: response_.statusMessage,
				headers,
				size: request.size,
				counter: request.counter,
				highWaterMark: request.highWaterMark
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
				response = new Response(body, responseOptions);
				resolve(response);
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// For gzip
			if (codings === 'gzip' || codings === 'x-gzip') {
				body = Stream.pipeline(body, zlib.createGunzip(zlibOptions), reject);
				response = new Response(fromAsyncIterable(body), responseOptions);
				resolve(response);
				return;
			}

			// For deflate
			if (codings === 'deflate' || codings === 'x-deflate') {
				// Handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = Stream.pipeline(response_, new Stream.PassThrough(), reject);
				raw.once('data', chunk => {
					// See http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = Stream.pipeline(body, zlib.createInflate(), reject);
					} else {
						body = Stream.pipeline(body, zlib.createInflateRaw(), reject);
					}

					response = new Response(fromAsyncIterable(body), responseOptions);
					resolve(response);
				});
				return;
			}

			// For br
			if (codings === 'br') {
				body = Stream.pipeline(body, zlib.createBrotliDecompress(), reject);
				response = new Response(fromAsyncIterable(body), responseOptions);
				resolve(response);
				return;
			}

			// Otherwise, use response as-is
			response = new Response(fromAsyncIterable(body), responseOptions);
			resolve(response);
		});

		writeToStream(request_, request);
	});
}

/**
 *
 * @param {import('http').ClientRequest} request
 * @param {(error:Error) => void} errorCallback
 */
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
	const LAST_CHUNK = buffer.Buffer.from('0\r\n\r\n');

	let isChunkedTransfer = false;
	let properLastChunkReceived = false;
	/** @type {Buffer | undefined} */
	let previousChunk;

	request.on('response', response => {
		const {headers} = response;
		isChunkedTransfer = headers['transfer-encoding'] === 'chunked' && !headers['content-length'];
	});

	request.on('socket', socket => {
		const onSocketClose = () => {
			if (isChunkedTransfer && !properLastChunkReceived) {
				const error = Object.assign(new Error('Premature close'), {
					code: 'ERR_STREAM_PREMATURE_CLOSE'
				});
				errorCallback(error);
			}
		};

		/** @param {Buffer} buf */
		const onData = buf => {
			properLastChunkReceived = buffer.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;

			// Sometimes final 0-length chunk and end of message code are in separate packets
			if (!properLastChunkReceived && previousChunk) {
				properLastChunkReceived = (
					buffer.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 &&
					buffer.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0
				);
			}

			previousChunk = buf;
		};

		socket.prependListener('close', onSocketClose);
		socket.on('data', onData);

		const removeSocketListeners = () => {
			socket.removeListener('close', onSocketClose);
			socket.removeListener('data', onData);
		};

		request.on('close', removeSocketListeners);
		request.on('abort', removeSocketListeners);
	});
}

Object.defineProperty(exports, 'Blob', {
	enumerable: true,
	get: function () {
		return webBlob.Blob;
	}
});
Object.defineProperty(exports, 'ReadableStream', {
	enumerable: true,
	get: function () {
		return webBlob.ReadableStream;
	}
});
Object.defineProperty(exports, 'File', {
	enumerable: true,
	get: function () {
		return webFile.File;
	}
});
Object.defineProperty(exports, 'FormData', {
	enumerable: true,
	get: function () {
		return webFormData.FormData;
	}
});
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.default = fetch;
exports.fetch = fetch;

exports = module.exports = Object.assign(fetch, exports);
//# sourceMappingURL=lib.node.cjs.map
