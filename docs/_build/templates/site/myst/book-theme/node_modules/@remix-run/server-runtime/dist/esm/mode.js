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
/**
 * The mode to use when running the server.
 */
let ServerMode = /*#__PURE__*/function (ServerMode) {
  ServerMode["Development"] = "development";
  ServerMode["Production"] = "production";
  ServerMode["Test"] = "test";
  return ServerMode;
}({});
function isServerMode(value) {
  return value === ServerMode.Development || value === ServerMode.Production || value === ServerMode.Test;
}

export { ServerMode, isServerMode };
