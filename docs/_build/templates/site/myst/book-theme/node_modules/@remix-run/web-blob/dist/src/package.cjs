'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var webEncoding = require('web-encoding');
var webStream = require('@remix-run/web-stream');



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
//# sourceMappingURL=package.cjs.map
