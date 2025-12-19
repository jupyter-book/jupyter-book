/// <reference types="node" />
import type { Readable } from "stream";
import { fetch as webFetch, Headers as WebHeaders, Request as WebRequest, Response as WebResponse } from "@remix-run/web-fetch";
export { FormData } from "@remix-run/web-fetch";
export { File, Blob } from "@remix-run/web-file";
type NodeHeadersInit = ConstructorParameters<typeof WebHeaders>[0];
type NodeResponseInit = NonNullable<ConstructorParameters<typeof WebResponse>[1]>;
type NodeRequestInfo = ConstructorParameters<typeof WebRequest>[0] | NodeRequest;
type NodeRequestInit = Omit<NonNullable<ConstructorParameters<typeof WebRequest>[1]>, "body"> & {
    body?: NonNullable<ConstructorParameters<typeof WebRequest>[1]>["body"] | Readable;
};
export type { NodeHeadersInit as HeadersInit, NodeRequestInfo as RequestInfo, NodeRequestInit as RequestInit, NodeResponseInit as ResponseInit, };
declare class NodeRequest extends WebRequest {
    constructor(info: NodeRequestInfo, init?: NodeRequestInit);
    get headers(): WebHeaders;
    clone(): NodeRequest;
}
declare class NodeResponse extends WebResponse {
    get headers(): WebHeaders;
    clone(): NodeResponse;
}
export { WebHeaders as Headers, NodeRequest as Request, NodeResponse as Response, };
export declare const fetch: typeof webFetch;
