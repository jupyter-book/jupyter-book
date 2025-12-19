/// <reference types="node" />
/**
 * Check if `obj` is a spec-compliant `FormData` object
 *
 * @param {*} object
 * @return {object is FormData}
 */
export function isFormData(object: any): object is FormData;
export function isURLSearchParameters(object: any): obj is URLSearchParams;
export function isBlob(object: any): object is Blob;
export function isMultipartFormDataStream(value: any): value is Stream & {
    getBoundary(): string;
    hasKnownLength(): boolean;
    getLengthSync(): number | null;
};
export function isAbortSignal(object: any): obj is AbortSignal;
export function isReadableStream(value: any): value is ReadableStream<any>;
export function isIterable(value: any): value is Iterable<unknown>;
import Stream from "stream";
//# sourceMappingURL=is.d.ts.map