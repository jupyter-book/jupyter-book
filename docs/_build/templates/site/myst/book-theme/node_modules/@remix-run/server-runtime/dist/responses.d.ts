import { type UNSAFE_DeferredData as DeferredData } from "@remix-run/router";
import type { ServerMode } from "./mode";
declare const typedDeferredDataBrand: unique symbol;
export type TypedDeferredData<Data extends Record<string, unknown>> = Pick<DeferredData, "init"> & {
    data: Data;
    readonly [typedDeferredDataBrand]: "TypedDeferredData";
};
export type DeferFunction = <Data extends Record<string, unknown>>(data: Data, init?: number | ResponseInit) => TypedDeferredData<Data>;
export type JsonFunction = <Data>(data: Data, init?: number | ResponseInit) => TypedResponse<Data>;
export type TypedResponse<T = unknown> = Omit<Response, "json"> & {
    json(): Promise<T>;
};
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 *
 * @see https://remix.run/utils/json
 */
export declare const json: JsonFunction;
/**
 * This is a shortcut for creating Remix deferred responses
 *
 * @see https://remix.run/utils/defer
 */
export declare const defer: DeferFunction;
export type RedirectFunction = (url: string, init?: number | ResponseInit) => TypedResponse<never>;
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 *
 * @see https://remix.run/utils/redirect
 */
export declare const redirect: RedirectFunction;
export declare function isDeferredData(value: any): value is DeferredData;
export declare function isResponse(value: any): value is Response;
export declare function isRedirectStatusCode(statusCode: number): boolean;
export declare function isRedirectResponse(response: Response): boolean;
export declare function createDeferredReadableStream(deferredData: DeferredData, signal: AbortSignal, serverMode: ServerMode): any;
export {};
