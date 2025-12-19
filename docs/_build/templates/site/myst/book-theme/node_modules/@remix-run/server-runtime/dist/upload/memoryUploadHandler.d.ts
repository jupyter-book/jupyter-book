import type { UploadHandler } from "@remix-run/server-runtime";
export type MemoryUploadHandlerFilterArgs = {
    filename?: string;
    contentType: string;
    name: string;
};
export type MemoryUploadHandlerOptions = {
    /**
     * The maximum upload size allowed. If the size is exceeded an error will be thrown.
     * Defaults to 3000000B (3MB).
     */
    maxPartSize?: number;
    /**
     *
     * @param filename
     * @param mimetype
     * @param encoding
     */
    filter?(args: MemoryUploadHandlerFilterArgs): boolean | Promise<boolean>;
};
export declare function createMemoryUploadHandler({ filter, maxPartSize, }?: MemoryUploadHandlerOptions): UploadHandler;
