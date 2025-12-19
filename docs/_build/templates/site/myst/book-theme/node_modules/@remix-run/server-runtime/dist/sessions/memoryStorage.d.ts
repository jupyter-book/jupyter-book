import type { SessionData, SessionStorage, SessionIdStorageStrategy, CreateSessionStorageFunction } from "../sessions";
interface MemorySessionStorageOptions {
    /**
     * The Cookie used to store the session id on the client, or options used
     * to automatically create one.
     */
    cookie?: SessionIdStorageStrategy["cookie"];
}
export type CreateMemorySessionStorageFunction = <Data = SessionData, FlashData = Data>(options?: MemorySessionStorageOptions) => SessionStorage<Data, FlashData>;
/**
 * Creates and returns a simple in-memory SessionStorage object, mostly useful
 * for testing and as a reference implementation.
 *
 * Note: This storage does not scale beyond a single process, so it is not
 * suitable for most production scenarios.
 *
 * @see https://remix.run/utils/sessions#creatememorysessionstorage
 */
export declare const createMemorySessionStorageFactory: (createSessionStorage: CreateSessionStorageFunction) => CreateMemorySessionStorageFunction;
export {};
