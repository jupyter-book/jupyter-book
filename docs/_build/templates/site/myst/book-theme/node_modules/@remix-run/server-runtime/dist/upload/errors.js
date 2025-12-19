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

class MaxPartSizeExceededError extends Error {
  constructor(field, maxBytes) {
    super(`Field "${field}" exceeded upload size of ${maxBytes} bytes.`);
    this.field = field;
    this.maxBytes = maxBytes;
  }
}

exports.MaxPartSizeExceededError = MaxPartSizeExceededError;
