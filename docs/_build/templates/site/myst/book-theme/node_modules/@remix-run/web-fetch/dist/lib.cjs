'use strict';

const webBlob = require('@remix-run/web-blob');
const webFile = require('@remix-run/web-file');
const webFormData = require('@remix-run/web-form-data');

// On the web we just export native fetch implementation
const { Headers, Request, Response } = globalThis;
const lib = globalThis.fetch.bind(globalThis);

Object.defineProperty(exports, 'Blob', {
	enumerable: true,
	get: function () {
		return webBlob.Blob;
	}
});
Object.defineProperty(exports, 'ReadableStream', {
	enumerable: true,
	get: function () {
		return webBlob.ReadableStream;
	}
});
Object.defineProperty(exports, 'File', {
	enumerable: true,
	get: function () {
		return webFile.File;
	}
});
Object.defineProperty(exports, 'FormData', {
	enumerable: true,
	get: function () {
		return webFormData.FormData;
	}
});
exports.Headers = Headers;
exports.Request = Request;
exports.Response = Response;
exports.default = lib;

exports = module.exports = Object.assign(fetch, exports);
//# sourceMappingURL=lib.cjs.map
