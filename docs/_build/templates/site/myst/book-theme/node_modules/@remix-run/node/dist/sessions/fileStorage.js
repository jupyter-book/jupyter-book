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

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var implementations = require('../implementations.js');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var crypto__namespace = /*#__PURE__*/_interopNamespace(crypto);
var path__namespace = /*#__PURE__*/_interopNamespace(path);

/**
 * Creates a SessionStorage that stores session data on a filesystem.
 *
 * The advantage of using this instead of cookie session storage is that
 * files may contain much more data than cookies.
 *
 * @see https://remix.run/utils/sessions#createfilesessionstorage-node
 */
function createFileSessionStorage({
  cookie,
  dir
}) {
  return implementations.createSessionStorage({
    cookie,
    async createData(data, expires) {
      let content = JSON.stringify({
        data,
        expires
      });
      while (true) {
        // TODO: Once node v16 is available on AWS we should use the webcrypto
        // API's crypto.getRandomValues() function here instead.
        let randomBytes = crypto__namespace.randomBytes(8);
        // This storage manages an id space of 2^64 ids, which is far greater
        // than the maximum number of files allowed on an NTFS or ext4 volume
        // (2^32). However, the larger id space should help to avoid collisions
        // with existing ids when creating new sessions, which speeds things up.
        let id = Buffer.from(randomBytes).toString("hex");
        try {
          let file = getFile(dir, id);
          await fs.promises.mkdir(path__namespace.dirname(file), {
            recursive: true
          });
          await fs.promises.writeFile(file, content, {
            encoding: "utf-8",
            flag: "wx"
          });
          return id;
        } catch (error) {
          if (error.code !== "EEXIST") throw error;
        }
      }
    },
    async readData(id) {
      try {
        let file = getFile(dir, id);
        let content = JSON.parse(await fs.promises.readFile(file, "utf-8"));
        let data = content.data;
        let expires = typeof content.expires === "string" ? new Date(content.expires) : null;
        if (!expires || expires > new Date()) {
          return data;
        }

        // Remove expired session data.
        if (expires) await fs.promises.unlink(file);
        return null;
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
        return null;
      }
    },
    async updateData(id, data, expires) {
      let content = JSON.stringify({
        data,
        expires
      });
      let file = getFile(dir, id);
      await fs.promises.mkdir(path__namespace.dirname(file), {
        recursive: true
      });
      await fs.promises.writeFile(file, content, "utf-8");
    },
    async deleteData(id) {
      // Return early if the id is empty, otherwise we'll end up trying to
      // unlink the dir, which will cause the EPERM error.
      if (!id) {
        return;
      }
      try {
        await fs.promises.unlink(getFile(dir, id));
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
    }
  });
}
function getFile(dir, id) {
  // Divide the session id up into a directory (first 2 bytes) and filename
  // (remaining 6 bytes) to reduce the chance of having very large directories,
  // which should speed up file access. This is a maximum of 2^16 directories,
  // each with 2^48 files.
  return path__namespace.join(dir, id.slice(0, 4), id.slice(4));
}

exports.createFileSessionStorage = createFileSessionStorage;
