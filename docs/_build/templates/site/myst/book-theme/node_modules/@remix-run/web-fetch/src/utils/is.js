import Stream from "stream";

/**
 * Is.js
 *
 * Object type checks.
 */

const NAME = Symbol.toStringTag;

/**
 * Check if `obj` is a URLSearchParams object
 * ref: https://github.com/node-fetch/node-fetch/issues/296#issuecomment-307598143
 *
 * @param  {any} object
 * @return {obj is URLSearchParams}
 */
export const isURLSearchParameters = (object) => {
	return (
		typeof object === "object" &&
		typeof object.append === "function" &&
		typeof object.delete === "function" &&
		typeof object.get === "function" &&
		typeof object.getAll === "function" &&
		typeof object.has === "function" &&
		typeof object.set === "function" &&
		typeof object.sort === "function" &&
		object[NAME] === "URLSearchParams"
	);
};

/**
 * Check if `object` is a W3C `Blob` object (which `File` inherits from)
 *
 * @param  {*} object
 * @return {object is Blob}
 */
export const isBlob = (object) => {
	return (
		typeof object === "object" &&
		typeof object.arrayBuffer === "function" &&
		typeof object.type === "string" &&
		typeof object.stream === "function" &&
		typeof object.constructor === "function" &&
		/^(Blob|File)$/.test(object[NAME])
	);
};

/**
 * Check if `obj` is a spec-compliant `FormData` object
 *
 * @param {*} object
 * @return {object is FormData}
 */
export function isFormData(object) {
	return (
		typeof object === "object" &&
		typeof object.append === "function" &&
		typeof object.set === "function" &&
		typeof object.get === "function" &&
		typeof object.getAll === "function" &&
		typeof object.delete === "function" &&
		typeof object.keys === "function" &&
		typeof object.values === "function" &&
		typeof object.entries === "function" &&
		typeof object.constructor === "function" &&
		object[NAME] === "FormData"
	);
}

/**
 * Detect form data input from form-data module
 *
 * @param {any} value
 * @returns {value is Stream & {getBoundary():string, hasKnownLength():boolean, getLengthSync():number|null}}
 */
export const isMultipartFormDataStream = (value) => {
	return (
		value instanceof Stream === true &&
		typeof value.getBoundary === "function" &&
		typeof value.hasKnownLength === "function" &&
		typeof value.getLengthSync === "function"
	);
};

/**
 * Check if `obj` is an instance of AbortSignal.
 *
 * @param  {any} object
 * @return {obj is AbortSignal}
 */
export const isAbortSignal = (object) => {
	return (
		typeof object === "object" &&
		(object[NAME] === "AbortSignal" || object[NAME] === "EventTarget")
	);
};

/**
 * Check if `value` is a ReadableStream.
 *
 * @param {*} value
 * @returns {value is ReadableStream}
 */
export const isReadableStream = (value) => {
	return (
		typeof value === "object" &&
		typeof value.getReader === "function" &&
		typeof value.cancel === "function" &&
		typeof value.tee === "function"
	);
};

/**
 *
 * @param {any} value
 * @returns {value is Iterable<unknown>}
 */
export const isIterable = (value) => value && Symbol.iterator in value;
