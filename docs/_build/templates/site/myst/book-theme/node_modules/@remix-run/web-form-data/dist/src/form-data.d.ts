/**
 * @implements {globalThis.FormData}
 */
export class FormData implements globalThis.FormData {
    /**
     * @param {HTMLFormElement} [form]
     */
    constructor(form?: HTMLFormElement | undefined);
    /**
     * @private
     * @readonly
     * @type {Array<[string, FormDataEntryValue]>}
     */
    private readonly _entries;
    /**
     * Appends a new value onto an existing key inside a FormData object, or adds
     * the key if it does not already exist.
     *
     * The difference between `set` and `append` is that if the specified key
     * already exists, `set` will overwrite all existing values with the new one,
     * whereas `append` will append the new value onto the end of the existing
     * set of values.
     *
     * @param {string} name
     * @param {string|Blob|File} value - The name of the field whose data is
     * contained in value.
     * @param {string} [filename] - The filename reported to the server, when a
     * value is a `Blob` or a `File`. The default filename for a `Blob` objects is
     * `"blob"`. The default filename for a `File` is the it's name.
     */
    append(name: string, value?: string | Blob | File, filename?: string | undefined): void;
    /**
     * Deletes a key and all its values from a FormData object.
     *
     * @param {string} name
     */
    delete(name?: string): void;
    /**
     * Returns the first value associated with a given key from within a
     * FormData object.
     *
     * @param {string} name
     * @returns {FormDataEntryValue|null}
     */
    get(name?: string): FormDataEntryValue | null;
    /**
     * Returns an array of all the values associated with a given key from within
     * a FormData.
     *
     * @param {string} name
     * @returns {FormDataEntryValue[]}
     */
    getAll(name?: string): FormDataEntryValue[];
    /**
     * Returns a boolean stating whether a FormData object contains a certain key.
     *
     * @param {string} name
     */
    has(name?: string): boolean;
    /**
     * Sets a new value for an existing key inside a FormData object, or adds the
     * key/value if it does not already exist.
     *
     * @param {string} name
     * @param {string|Blob|File} value
     * @param {string} [filename]
     */
    set(name: string, value?: string | Blob | File, filename?: string | undefined): void;
    /**
     * Method returns an iterator allowing to go through all key/value pairs
     * contained in this object.
     */
    entries(): IterableIterator<[string, FormDataEntryValue]>;
    /**
     * Returns an iterator allowing to go through all keys of the key/value pairs
     * contained in this object.
     *
     * @returns {IterableIterator<string>}
     */
    keys(): IterableIterator<string>;
    /**
     * Returns an iterator allowing to go through all values contained in this
     * object.
     *
     * @returns {IterableIterator<FormDataEntryValue>}
     */
    values(): IterableIterator<FormDataEntryValue>;
    /**
     * @param {(value: FormDataEntryValue, key: string, parent: globalThis.FormData) => void} fn
     * @param {any} [thisArg]
     * @returns {void}
     */
    forEach(fn: (value: FormDataEntryValue, key: string, parent: globalThis.FormData) => void, thisArg?: any): void;
    get [Symbol.toStringTag](): string;
    [Symbol.iterator](): IterableIterator<[string, FormDataEntryValue]>;
}
//# sourceMappingURL=form-data.d.ts.map