export declare class MaxPartSizeExceededError extends Error {
    field: string;
    maxBytes: number;
    constructor(field: string, maxBytes: number);
}
