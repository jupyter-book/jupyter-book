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
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    console.error("The following error is a bug in Remix; please open an issue! https://github.com/remix-run/remix/issues/new");
    throw new Error(message);
  }
}

export { invariant as default };
