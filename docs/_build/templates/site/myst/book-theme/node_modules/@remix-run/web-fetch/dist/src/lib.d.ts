export const Headers: {
    new (init?: HeadersInit | undefined): Headers;
    prototype: Headers;
};
export const Request: {
    new (input: RequestInfo, init?: RequestInit | undefined): Request;
    prototype: Request;
};
export const Response: {
    new (body?: BodyInit | null | undefined, init?: ResponseInit | undefined): Response;
    prototype: Response;
    error(): Response;
    redirect(url: string | URL, status?: number | undefined): Response;
};
declare var _default: typeof fetch;
export default _default;
export { ReadableStream, Blob, FormData, File } from "./package.js";
//# sourceMappingURL=lib.d.ts.map