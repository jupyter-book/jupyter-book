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

var webFetch = require('@remix-run/web-fetch');
var webFile = require('@remix-run/web-file');

class NodeRequest extends webFetch.Request {
  constructor(info, init) {
    super(info, init);
  }
  get headers() {
    return super.headers;
  }
  clone() {
    return new NodeRequest(this);
  }
}
class NodeResponse extends webFetch.Response {
  get headers() {
    return super.headers;
  }
  clone() {
    return super.clone();
  }
}
const fetch = (info, init) => {
  init = {
    // Disable compression handling so people can return the result of a fetch
    // directly in the loader without messing with the Content-Encoding header.
    compress: false,
    ...init
  };
  return webFetch.fetch(info, init);
};

Object.defineProperty(exports, 'FormData', {
  enumerable: true,
  get: function () { return webFetch.FormData; }
});
Object.defineProperty(exports, 'Headers', {
  enumerable: true,
  get: function () { return webFetch.Headers; }
});
Object.defineProperty(exports, 'Blob', {
  enumerable: true,
  get: function () { return webFile.Blob; }
});
Object.defineProperty(exports, 'File', {
  enumerable: true,
  get: function () { return webFile.File; }
});
exports.Request = NodeRequest;
exports.Response = NodeResponse;
exports.fetch = fetch;
