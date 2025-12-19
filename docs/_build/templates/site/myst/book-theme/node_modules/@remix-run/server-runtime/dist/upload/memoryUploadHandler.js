/**
 * @remix-run/server-runtime v1.19.3
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

var errors = require('./errors.js');

function createMemoryUploadHandler({
  filter,
  maxPartSize = 3000000
} = {}) {
  return async ({
    filename,
    contentType,
    name,
    data
  }) => {
    if (filter && !(await filter({
      filename,
      contentType,
      name
    }))) {
      return undefined;
    }
    let size = 0;
    let chunks = [];
    for await (let chunk of data) {
      size += chunk.byteLength;
      if (size > maxPartSize) {
        throw new errors.MaxPartSizeExceededError(name, maxPartSize);
      }
      chunks.push(chunk);
    }
    if (typeof filename === "string") {
      return new File(chunks, filename, {
        type: contentType
      });
    }
    return await new Blob(chunks, {
      type: contentType
    }).text();
  };
}

exports.createMemoryUploadHandler = createMemoryUploadHandler;
