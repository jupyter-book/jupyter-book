import type { AppData } from "./data";
import type { TypedDeferredData, TypedResponse } from "./responses";
type JsonPrimitive = string | number | boolean | String | Number | Boolean | null;
type NonJsonPrimitive = undefined | Function | symbol;
type IsAny<T> = 0 extends 1 & T ? true : false;
type Serialize<T> = IsAny<T> extends true ? any : T extends TypedDeferredData<infer U> ? SerializeDeferred<U> : T extends JsonPrimitive ? T : T extends NonJsonPrimitive ? never : T extends {
    toJSON(): infer U;
} ? U : T extends [] ? [] : T extends [unknown, ...unknown[]] ? SerializeTuple<T> : T extends ReadonlyArray<infer U> ? (U extends NonJsonPrimitive ? null : Serialize<U>)[] : T extends object ? SerializeObject<UndefinedToOptional<T>> : never;
/** JSON serialize [tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types) */
type SerializeTuple<T extends unknown[]> = T extends [infer F, ...infer R] ? [Serialize<F>, ...SerializeTuple<R>] : [];
/** JSON serialize objects (not including arrays) and classes */
type SerializeObject<T extends object> = {
    [k in keyof T as T[k] extends NonJsonPrimitive ? never : k]: Serialize<T[k]>;
};
type SerializeDeferred<T extends Record<string, unknown>> = {
    [k in keyof T as T[k] extends Promise<unknown> ? k : T[k] extends NonJsonPrimitive ? never : k]: T[k] extends Promise<infer U> ? Promise<Serialize<U>> extends never ? "wtf" : Promise<Serialize<U>> : Serialize<T[k]> extends never ? k : Serialize<T[k]>;
};
type UndefinedToOptional<T extends object> = {
    [k in keyof T as undefined extends T[k] ? never : k]: T[k];
} & {
    [k in keyof T as undefined extends T[k] ? k : never]?: Exclude<T[k], undefined>;
};
type ArbitraryFunction = (...args: any[]) => unknown;
/**
 * Infer JSON serialized data type returned by a loader or action.
 *
 * For example:
 * `type LoaderData = SerializeFrom<typeof loader>`
 */
export type SerializeFrom<T extends AppData | ArbitraryFunction> = Serialize<T extends (...args: any[]) => infer Output ? Awaited<Output> extends TypedResponse<infer U> ? U : Awaited<Output> : Awaited<T>>;
export {};
