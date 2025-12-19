export class FetchBaseError extends Error {
    /**
     * @param {string} message
     * @param {string} type
     */
    constructor(message: string, type: string);
    type: string;
    get [Symbol.toStringTag](): string;
}
//# sourceMappingURL=base.d.ts.map