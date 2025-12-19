
/**
 * Request.js
 *
 * Request class contains server only options
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */

import {format as formatUrl} from 'url';
import {AbortController as AbortControllerPolyfill} from 'abort-controller';
import Headers from './headers.js';
import Body, {clone, extractContentType, getTotalBytes} from './body.js';
import {isAbortSignal} from './utils/is.js';
import {getSearch} from './utils/get-search.js';

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
export default class Request extends Body {
	/**
	 * @param {string|Request|URL} info  Url or Request instance
	 * @param {RequestInit & RequestExtraOptions} init   Custom options
	 */
	constructor(info, init = {}) {
		let parsedURL;
		/** @type {RequestOptions & RequestExtraOptions} */
		let settings

		// Normalize input and force URL to be encoded as UTF-8 (https://github.com/node-fetch/node-fetch/issues/245)
		if (isRequest(info)) {
			parsedURL = new URL(info.url);
			settings = (info)
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
		const input = settings


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
			: AbortControllerPolyfill;
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
		this.keepalive

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
		return formatUrl(this[INTERNALS].parsedURL);
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
export const getNodeRequestOptions = request => {
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
