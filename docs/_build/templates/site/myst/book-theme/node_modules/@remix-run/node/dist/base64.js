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

function atob(a) {
  return Buffer.from(a, "base64").toString("binary");
}
function btoa(b) {
  return Buffer.from(b, "binary").toString("base64");
}

exports.atob = atob;
exports.btoa = btoa;
