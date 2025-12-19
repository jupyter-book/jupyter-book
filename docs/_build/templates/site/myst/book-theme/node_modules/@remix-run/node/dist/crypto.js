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

var cookieSignature = require('cookie-signature');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var cookieSignature__default = /*#__PURE__*/_interopDefaultLegacy(cookieSignature);

const sign = async (value, secret) => {
  return cookieSignature__default["default"].sign(value, secret);
};
const unsign = async (signed, secret) => {
  return cookieSignature__default["default"].unsign(signed, secret);
};

exports.sign = sign;
exports.unsign = unsign;
