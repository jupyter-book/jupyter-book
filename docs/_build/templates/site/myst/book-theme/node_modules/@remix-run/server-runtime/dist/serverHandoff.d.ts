import type { HydrationState } from "@remix-run/router";
import type { FutureConfig } from "./entry";
type ValidateShape<T, Shape> = T extends Shape ? Exclude<keyof T, keyof Shape> extends never ? T : never : never;
export declare function createServerHandoffString<T>(serverHandoff: {
    state: ValidateShape<T, HydrationState>;
    url: string;
    future: FutureConfig;
}): string;
export {};
