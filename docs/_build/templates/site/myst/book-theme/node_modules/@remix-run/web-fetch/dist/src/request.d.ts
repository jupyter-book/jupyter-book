/// <reference types="node" />
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
export default class Request extends Body implements globalThis.Request {
    /**
     * @param {string|Request|URL} info  Url or Request instance
     * @param {RequestInit & RequestExtraOptions} init   Custom options
     */
    constructor(info: string | Request | URL, init?: RequestInit & RequestExtraOptions);
    /** @type {boolean} */
    keepalive: boolean;
    /** @type {number} */
    follow: number;
    /** @type {boolean} */
    compress: boolean;
    /** @type {number} */
    counter: number;
    /** @type {Agent|undefined} */
    agent: Agent | undefined;
    /** @type {number} */
    highWaterMark: number;
    /** @type {boolean} */
    insecureHTTPParser: boolean;
    /**
     * @type {RequestCache}
     */
    get cache(): RequestCache;
    /**
     * @type {RequestCredentials}
     */
    get credentials(): RequestCredentials;
    /**
     * @type {RequestDestination}
     */
    get destination(): RequestDestination;
    get integrity(): string;
    /** @type {RequestMode} */
    get mode(): RequestMode;
    /** @type {string} */
    get referrer(): string;
    /** @type {ReferrerPolicy} */
    get referrerPolicy(): ReferrerPolicy;
    get method(): string;
    /**
     * @type {string}
     */
    get url(): string;
    get redirect(): RequestRedirect;
    /**
     * @returns {AbortSignal}
     */
    get signal(): AbortSignal;
    /**
     * Clone this request
     *
     * @return  {globalThis.Request}
     */
    clone(): globalThis.Request;
    get [Symbol.toStringTag](): string;
    /** @type {RequestState} */
    [INTERNALS]: RequestState;
}
export function getNodeRequestOptions(request: Request & Record<typeof INTERNALS, RequestState>): {
    path: string;
    pathname: string;
    hostname: string;
    protocol: string;
    port: string;
    hash: string;
    search: string;
    query: any;
    href: string;
    method: string;
    headers: any;
    insecureHTTPParser: boolean;
    agent: import("http").Agent | import("https").Agent | undefined;
};
/**
 * Request class
 */
export type RequestState = {
    method: string;
    redirect: RequestRedirect;
    headers: globalThis.Headers;
    credentials: RequestCredentials;
    parsedURL: URL;
    signal: AbortSignal | null;
};
/**
 * Request class
 */
export type RequestExtraOptions = {
    follow?: number | undefined;
    compress?: boolean | undefined;
    size?: number | undefined;
    counter?: number | undefined;
    agent?: Agent | undefined;
    highWaterMark?: number | undefined;
    insecureHTTPParser?: boolean | undefined;
};
/**
 * Request class
 */
export type Agent = ((url: URL) => import('http').Agent | import('https').Agent) | import("http").Agent | import("https").Agent;
/**
 * Request class
 */
export type RequestOptions = {
    method?: string | undefined;
    body?: ReadableStream<Uint8Array> | null | undefined;
    headers?: globalThis.Headers | undefined;
    redirect?: RequestRedirect | undefined;
};
import Body from "./body.js";
declare const INTERNALS: unique symbol;
import Headers from "./headers.js";
export {};
//# sourceMappingURL=request.d.ts.map