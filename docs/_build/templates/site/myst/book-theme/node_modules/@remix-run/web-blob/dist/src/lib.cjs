'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var webEncoding = require('web-encoding');
var webStream = require('@remix-run/web-stream');

// On the web we just export native Blob implementation
const { Blob } = globalThis;

Object.defineProperty(exports, 'TextDecoder', {
	enumerable: true,
	get: function () {
		return webEncoding.TextDecoder;
	}
});
Object.defineProperty(exports, 'TextEncoder', {
	enumerable: true,
	get: function () {
		return webEncoding.TextEncoder;
	}
});
Object.defineProperty(exports, 'ReadableStream', {
	enumerable: true,
	get: function () {
		return webStream.ReadableStream;
	}
});
exports.Blob = Blob;
//# sourceMappingURL=lib.cjs.map
