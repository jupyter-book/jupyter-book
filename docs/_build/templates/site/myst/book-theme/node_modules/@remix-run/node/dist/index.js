/**
 * @remix-run/node v1.19.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sourceMapSupport = require('source-map-support');
var abortController = require('abort-controller');
var fetch = require('./fetch.js');
var globals = require('./globals.js');
var fileStorage = require('./sessions/fileStorage.js');
var fileUploadHandler = require('./upload/fileUploadHandler.js');
var implementations = require('./implementations.js');
var stream = require('./stream.js');
var serverRuntime = require('@remix-run/server-runtime');
var webFetch = require('@remix-run/web-fetch');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var sourceMapSupport__default = /*#__PURE__*/_interopDefaultLegacy(sourceMapSupport);

sourceMapSupport__default["default"].install();

Object.defineProperty(exports, 'AbortController', {
  enumerable: true,
  get: function () { return abortController.AbortController; }
});
exports.Request = fetch.Request;
exports.Response = fetch.Response;
exports.fetch = fetch.fetch;
exports.installGlobals = globals.installGlobals;
exports.createFileSessionStorage = fileStorage.createFileSessionStorage;
exports.NodeOnDiskFile = fileUploadHandler.NodeOnDiskFile;
exports.unstable_createFileUploadHandler = fileUploadHandler.createFileUploadHandler;
exports.createCookie = implementations.createCookie;
exports.createCookieSessionStorage = implementations.createCookieSessionStorage;
exports.createMemorySessionStorage = implementations.createMemorySessionStorage;
exports.createSessionStorage = implementations.createSessionStorage;
exports.createReadableStreamFromReadable = stream.createReadableStreamFromReadable;
exports.readableStreamToString = stream.readableStreamToString;
exports.writeAsyncIterableToWritable = stream.writeAsyncIterableToWritable;
exports.writeReadableStreamToWritable = stream.writeReadableStreamToWritable;
Object.defineProperty(exports, 'MaxPartSizeExceededError', {
  enumerable: true,
  get: function () { return serverRuntime.MaxPartSizeExceededError; }
});
Object.defineProperty(exports, 'broadcastDevReady', {
  enumerable: true,
  get: function () { return serverRuntime.broadcastDevReady; }
});
Object.defineProperty(exports, 'createRequestHandler', {
  enumerable: true,
  get: function () { return serverRuntime.createRequestHandler; }
});
Object.defineProperty(exports, 'createSession', {
  enumerable: true,
  get: function () { return serverRuntime.createSession; }
});
Object.defineProperty(exports, 'defer', {
  enumerable: true,
  get: function () { return serverRuntime.defer; }
});
Object.defineProperty(exports, 'isCookie', {
  enumerable: true,
  get: function () { return serverRuntime.isCookie; }
});
Object.defineProperty(exports, 'isSession', {
  enumerable: true,
  get: function () { return serverRuntime.isSession; }
});
Object.defineProperty(exports, 'json', {
  enumerable: true,
  get: function () { return serverRuntime.json; }
});
Object.defineProperty(exports, 'logDevReady', {
  enumerable: true,
  get: function () { return serverRuntime.logDevReady; }
});
Object.defineProperty(exports, 'redirect', {
  enumerable: true,
  get: function () { return serverRuntime.redirect; }
});
Object.defineProperty(exports, 'unstable_composeUploadHandlers', {
  enumerable: true,
  get: function () { return serverRuntime.unstable_composeUploadHandlers; }
});
Object.defineProperty(exports, 'unstable_createMemoryUploadHandler', {
  enumerable: true,
  get: function () { return serverRuntime.unstable_createMemoryUploadHandler; }
});
Object.defineProperty(exports, 'unstable_parseMultipartFormData', {
  enumerable: true,
  get: function () { return serverRuntime.unstable_parseMultipartFormData; }
});
Object.defineProperty(exports, 'FormData', {
  enumerable: true,
  get: function () { return webFetch.FormData; }
});
Object.defineProperty(exports, 'Headers', {
  enumerable: true,
  get: function () { return webFetch.Headers; }
});
