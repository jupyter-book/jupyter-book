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

var serverRuntime = require('@remix-run/server-runtime');
var crypto = require('./crypto.js');

const createCookie = serverRuntime.createCookieFactory({
  sign: crypto.sign,
  unsign: crypto.unsign
});
const createCookieSessionStorage = serverRuntime.createCookieSessionStorageFactory(createCookie);
const createSessionStorage = serverRuntime.createSessionStorageFactory(createCookie);
const createMemorySessionStorage = serverRuntime.createMemorySessionStorageFactory(createSessionStorage);

exports.createCookie = createCookie;
exports.createCookieSessionStorage = createCookieSessionStorage;
exports.createMemorySessionStorage = createMemorySessionStorage;
exports.createSessionStorage = createSessionStorage;
