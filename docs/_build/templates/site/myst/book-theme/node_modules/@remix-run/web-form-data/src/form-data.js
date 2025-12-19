/**
 * @implements {globalThis.FormData}
 */
export class FormData {
  /**
   * @param {HTMLFormElement} [form]
   */
  constructor(form) {
    /**
     * @private
     * @readonly
     * @type {Array<[string, FormDataEntryValue]>}
     */
    this._entries = [];

    Object.defineProperty(this, "_entries", { enumerable: false });

    if (isHTMLFormElement(form)) {
      for (const element of form.elements) {
        if (isSelectElement(element)) {
          for (const option of element.options) {
            if (option.selected) {
              this.append(element.name, option.value);
            }
          }
        } else if (
          isInputElement(element) &&
          (element.checked || !["radio", "checkbox"].includes(element.type)) &&
          element.name
        ) {
          this.append(element.name, element.value);
        }
      }
    }
  }
  get [Symbol.toStringTag]() {
    return "FormData";
  }

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
  append(
    name,
    value = panic(
      new TypeError("FormData.append: requires at least 2 arguments")
    ),
    filename
  ) {
    this._entries.push([name, toEntryValue(value, filename)]);
  }

  /**
   * Deletes a key and all its values from a FormData object.
   *
   * @param {string} name
   */
  delete(
    name = panic(new TypeError("FormData.delete: requires string argument"))
  ) {
    const entries = this._entries;
    let index = 0;
    while (index < entries.length) {
      const [entryName] = /** @type {[string, FormDataEntryValue]}*/ (
        entries[index]
      );
      if (entryName === name) {
        entries.splice(index, 1);
      } else {
        index++;
      }
    }
  }

  /**
   * Returns the first value associated with a given key from within a
   * FormData object.
   *
   * @param {string} name
   * @returns {FormDataEntryValue|null}
   */

  get(name = panic(new TypeError("FormData.get: requires string argument"))) {
    for (const [entryName, value] of this._entries) {
      if (entryName === name) {
        return value;
      }
    }
    return null;
  }

  /**
   * Returns an array of all the values associated with a given key from within
   * a FormData.
   *
   * @param {string} name
   * @returns {FormDataEntryValue[]}
   */
  getAll(
    name = panic(new TypeError("FormData.getAll: requires string argument"))
  ) {
    const values = [];
    for (const [entryName, value] of this._entries) {
      if (entryName === name) {
        values.push(value);
      }
    }
    return values;
  }

  /**
   * Returns a boolean stating whether a FormData object contains a certain key.
   *
   * @param {string} name
   */

  has(name = panic(new TypeError("FormData.has: requires string argument"))) {
    for (const [entryName] of this._entries) {
      if (entryName === name) {
        return true;
      }
    }
    return false;
  }

  /**
   * Sets a new value for an existing key inside a FormData object, or adds the
   * key/value if it does not already exist.
   *
   * @param {string} name
   * @param {string|Blob|File} value
   * @param {string} [filename]
   */

  set(
    name,
    value = panic(new TypeError("FormData.set: requires at least 2 arguments")),
    filename
  ) {
    let index = 0;
    const { _entries: entries } = this;
    const entryValue = toEntryValue(value, filename);
    let wasSet = false;
    while (index < entries.length) {
      const entry = /** @type {[string, FormDataEntryValue]}*/ (entries[index]);
      if (entry[0] === name) {
        if (wasSet) {
          entries.splice(index, 1);
        } else {
          wasSet = true;
          entry[1] = entryValue;
          index++;
        }
      } else {
        index++;
      }
    }

    if (!wasSet) {
      entries.push([name, entryValue]);
    }
  }

  /**
   * Method returns an iterator allowing to go through all key/value pairs
   * contained in this object.
   */
  entries() {
    return this._entries.values();
  }

  /**
   * Returns an iterator allowing to go through all keys of the key/value pairs
   * contained in this object.
   *
   * @returns {IterableIterator<string>}
   */
  *keys() {
    for (const [name] of this._entries) {
      yield name;
    }
  }

  /**
   * Returns an iterator allowing to go through all values contained in this
   * object.
   *
   * @returns {IterableIterator<FormDataEntryValue>}
   */
  *values() {
    for (const [_, value] of this._entries) {
      yield value;
    }
  }

  [Symbol.iterator]() {
    return this._entries.values();
  }

  /**
   * @param {(value: FormDataEntryValue, key: string, parent: globalThis.FormData) => void} fn
   * @param {any} [thisArg]
   * @returns {void}
   */
  forEach(fn, thisArg) {
    for (const [key, value] of this._entries) {
      fn.call(thisArg, value, key, this);
    }
  }
}

/**
 * @param {any} value
 * @returns {value is HTMLFormElement}
 */
const isHTMLFormElement = (value) =>
  Object.prototype.toString.call(value) === "[object HTMLFormElement]";

/**
 * @param {string|Blob|File} value
 * @param {string} [filename]
 * @returns {FormDataEntryValue}
 */
const toEntryValue = (value, filename) => {
  if (isFile(value)) {
    return filename != null ? new BlobFile([value], filename, value) : value;
  } else if (isBlob(value)) {
    return new BlobFile([value], filename != null ? filename : "blob");
  } else {
    if (filename != null && filename != "") {
      throw new TypeError(
        "filename is only supported when value is Blob or File"
      );
    }
    return `${value}`;
  }
};

/**
 * @param {any} value
 * @returns {value is File}
 */
const isFile = (value) =>
  Object.prototype.toString.call(value) === "[object File]" &&
  typeof value.name === "string";

/**
 * @param {any} value
 * @returns {value is Blob}
 */
const isBlob = (value) =>
  Object.prototype.toString.call(value) === "[object Blob]";

/**
 * Simple `File` implementation that just wraps a given blob.
 * @implements {globalThis.File}
 */
const BlobFile = class File {
  /**
   * @param {[Blob]} parts
   * @param {string} name
   * @param {FilePropertyBag} [options]
   */
  constructor([blob], name, { lastModified = Date.now() } = {}) {
    this.blob = blob;
    this.name = name;
    this.lastModified = lastModified;
  }
  get webkitRelativePath() {
    return "";
  }
  get size() {
    return this.blob.size;
  }
  get type() {
    return this.blob.type;
  }
  /**
   *
   * @param {number} [start]
   * @param {number} [end]
   * @param {string} [contentType]
   */
  slice(start, end, contentType) {
    return this.blob.slice(start, end, contentType);
  }
  stream() {
    return this.blob.stream();
  }
  text() {
    return this.blob.text();
  }
  arrayBuffer() {
    return this.blob.arrayBuffer();
  }
  get [Symbol.toStringTag]() {
    return "File";
  }
};

/**
 * @param {*} error
 * @returns {never}
 */
const panic = (error) => {
  throw error;
};

/**
 *
 * @param {Element} element
 * @returns {element is HTMLSelectElement}
 */
function isSelectElement(element) {
  return element.tagName === "SELECT";
}

/**
 *
 * @param {Element} element
 * @returns {element is HTMLInputElement}
 */
function isInputElement(element) {
  return element.tagName === "INPUT" || element.tagName === "TEXTAREA";
}
