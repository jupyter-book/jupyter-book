export default fetch;
import Headers from "./headers.js";
import Request from "./request.js";
import Response from "./response.js";
import { ReadableStream } from "./package.js";
import { Blob } from "./package.js";
import { FormData } from "./package.js";
/**
 * Fetch function
 *
 * @param   {string | URL | import('./request.js').default} url - Absolute url or Request instance
 * @param   {RequestInit & import('./request.js').RequestExtraOptions} [options_] - Fetch options
 * @return  {Promise<import('./response.js').default>}
 */
export function fetch(url: string | URL | import('./request.js').default, options_?: (RequestInit & import("./request.js").RequestExtraOptions) | undefined): Promise<import('./response.js').default>;
export { Headers, Request, Response, ReadableStream, Blob, FormData };
//# sourceMappingURL=fetch.d.ts.map