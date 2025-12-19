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

var webStream = require('@remix-run/web-stream');
var abortController = require('abort-controller');
var base64 = require('./base64.js');
var fetch = require('./fetch.js');
var webFile = require('@remix-run/web-file');
var webFetch = require('@remix-run/web-fetch');

function installGlobals() {
  global.atob = base64.atob;
  global.btoa = base64.btoa;
  global.Blob = webFile.Blob;
  global.File = webFile.File;
  global.Headers = webFetch.Headers;
  global.Request = fetch.Request;
  global.Response = fetch.Response;
  global.fetch = fetch.fetch;
  global.FormData = webFetch.FormData;
  global.ReadableStream = webStream.ReadableStream;
  global.WritableStream = webStream.WritableStream;
  global.AbortController = global.AbortController || abortController.AbortController;
}

exports.installGlobals = installGlobals;
