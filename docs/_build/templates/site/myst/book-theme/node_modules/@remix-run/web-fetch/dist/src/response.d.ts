/// <reference types="node" />
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
export default class Response extends Body implements globalThis.Response {
    /**
     * @param {string} url    The URL that the new response is to originate from.
     * @param {number} status An optional status code for the response (e.g., 302.)
     * @returns {Response}    A Response object.
     */
    static redirect(url: string, status?: number): Response;
    /**
     * @param {BodyInit|import('stream').Stream|null} [body] - Readable stream
     * @param {ResponseInit & Ext} [options] - Response options
     */
    constructor(body?: import("stream").Stream | BodyInit | null | undefined, options?: (ResponseInit & Ext) | undefined);
    /**
     * @type {ResponseType}
     */
    get type(): ResponseType;
    get url(): string;
    get status(): number;
    /**
     * Convenience property representing if the request ended normally
     */
    get ok(): boolean;
    get redirected(): boolean;
    get statusText(): string;
    get highWaterMark(): number | undefined;
    /**
     * Clone this response
     *
     * @returns {Response}
     */
    clone(): Response;
    get [Symbol.toStringTag](): string;
    /**
     * @private
    */
    private [INTERNALS];
}
/**
 * Response class
 */
export type Ext = {
    size?: number | undefined;
    url?: string | undefined;
    counter?: number | undefined;
    highWaterMark?: number | undefined;
};
import Body from "./body.js";
declare const INTERNALS: unique symbol;
export {};
//# sourceMappingURL=response.d.ts.map