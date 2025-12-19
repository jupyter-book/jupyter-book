import { atob, btoa } from "./base64";
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test";
        }
        interface Global {
            atob: typeof atob;
            btoa: typeof btoa;
            Blob: typeof Blob;
            File: typeof File;
            Headers: typeof Headers;
            Request: typeof Request;
            Response: typeof Response;
            fetch: typeof fetch;
            FormData: typeof FormData;
            ReadableStream: typeof ReadableStream;
            WritableStream: typeof WritableStream;
            AbortController: typeof AbortController;
        }
    }
}
export declare function installGlobals(): void;
