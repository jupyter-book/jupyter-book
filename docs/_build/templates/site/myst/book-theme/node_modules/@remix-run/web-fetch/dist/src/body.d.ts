/// <reference types="node" />
/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 * @implements {globalThis.Body}
 */
export default class Body implements globalThis.Body {
    /**
     * @param {BodyInit|Stream|null} body
     * @param {{size?:number}} options
     */
    constructor(body: BodyInit | Stream | null, { size }?: {
        size?: number;
    });
    size: number;
    /** @type {Headers} */
    get headers(): Headers;
    get body(): ReadableStream<Uint8Array> | null;
    get bodyUsed(): boolean;
    /**
     * Decode response as ArrayBuffer
     *
     * @return {Promise<ArrayBuffer>}
     */
    arrayBuffer(): Promise<ArrayBuffer>;
    /**
     * Return raw response as Blob
     *
     * @return Promise
     */
    blob(): Promise<Blob>;
    /**
     * Decode response as json
     *
     * @return  Promise
     */
    json(): Promise<any>;
    /**
     * Decode response as text
     *
     * @return  Promise
     */
    text(): Promise<string>;
    /**
     * @returns {Promise<FormData>}
     */
    formData(): Promise<FormData>;
    /** @private */
    private [INTERNALS];
}
export function clone(instance: Body): ReadableStream<Uint8Array> | null;
export function extractContentType(source: Body): string | null;
export function getTotalBytes(source: Body): number | null;
export function writeToStream(dest: Stream.Writable, { body }: Body): void;
export function streamIterator<T>(stream: ReadableStream<T>): StreamIterableIterator<T>;
export function fromAsyncIterable(content: AsyncIterable<Uint8Array>): ReadableStream<Uint8Array>;
export function fromStream(source: Stream & {
    readableHighWaterMark?: number | undefined;
}): ReadableStream<Uint8Array>;
declare const INTERNALS: unique symbol;
import Stream from "stream";
import { ReadableStream as ReadableStream_1 } from "./package.js";
/**
 * @template T
 * @implements {AsyncGenerator<T, void, void>}
 */
declare class StreamIterableIterator<T> implements AsyncGenerator<T, void, void> {
    /**
     * @param {ReadableStream<T>} stream
     */
    constructor(stream: ReadableStream<T>);
    stream: ReadableStream<T>;
    reader: ReadableStreamDefaultReader<T> | null;
    getReader(): ReadableStreamDefaultReader<T>;
    /**
     * @returns {Promise<IteratorResult<T, void>>}
     */
    next(): Promise<IteratorResult<T, void>>;
    /**
     * @returns {Promise<IteratorResult<T, void>>}
     */
    return(): Promise<IteratorResult<T, void>>;
    /**
     *
     * @param {any} error
     * @returns {Promise<IteratorResult<T, void>>}
     */
    throw(error: any): Promise<IteratorResult<T, void>>;
    /**
     * @returns {AsyncGenerator<T, void, void>}
     */
    [Symbol.asyncIterator](): AsyncGenerator<T, void, void>;
}
export {};
//# sourceMappingURL=body.d.ts.map