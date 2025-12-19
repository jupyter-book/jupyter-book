/**
 * Headers.js
 *
 * Headers class offers convenient helpers
 */

import {types} from 'util';
import http from 'http';
import { isIterable } from './utils/is.js'

/** @type {{validateHeaderValue?:(name:string, value:string) => any}} */
const validators = (http)

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
export default class Headers extends URLSearchParams {
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
		} else if (init == null) { // eslint-disable-line no-eq-null, eqeqeq
			// No op
		} else if (isIterable(init)) {
			// Sequence<sequence<ByteString>>
			// Note: per spec we have to first exhaust the lists then process them
			result = [...init]
				.map(pair => {
					if (
						typeof pair !== 'object' || types.isBoxedPrimitive(pair)
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
					Reflect.apply(callback, thisArg, [cookies.shift(), name, this])
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
export function fromRawHeaders(headers = []) {
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
