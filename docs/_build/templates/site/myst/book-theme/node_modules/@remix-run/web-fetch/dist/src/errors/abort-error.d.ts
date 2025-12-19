/**
 * AbortError interface for cancelled requests
 */
export class AbortError extends FetchBaseError {
    /**
     * @param {string} message
     * @param {string} [type]
     */
    constructor(message: string, type?: string | undefined);
}
import { FetchBaseError } from "./base.js";
//# sourceMappingURL=abort-error.d.ts.map