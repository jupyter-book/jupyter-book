'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var webBlob = require('@remix-run/web-blob');
var file = require('./file.cjs');

// Electron-renderer should get the browser implementation instead of node
// Browser configuration is not enough

// Marking export as a DOM File object instead of custom class.
/** @type {typeof globalThis.File} */
const File = file.File;

Object.defineProperty(exports, 'Blob', {
	enumerable: true,
	get: function () {
		return webBlob.Blob;
	}
});
exports.File = File;
//# sourceMappingURL=lib.node.cjs.map
