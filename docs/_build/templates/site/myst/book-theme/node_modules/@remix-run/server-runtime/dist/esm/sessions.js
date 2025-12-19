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
import { isCookie } from './cookies.js';
import { warnOnce } from './warnings.js';

/**
 * An object of name/value pairs to be used in the session.
 */

/**
 * Session persists data across HTTP requests.
 *
 * @see https://remix.run/utils/sessions#session-api
 */

function flash(name) {
  return `__flash_${name}__`;
}
/**
 * Creates a new Session object.
 *
 * Note: This function is typically not invoked directly by application code.
 * Instead, use a `SessionStorage` object's `getSession` method.
 *
 * @see https://remix.run/utils/sessions#createsession
 */
const createSession = (initialData = {}, id = "") => {
  let map = new Map(Object.entries(initialData));
  return {
    get id() {
      return id;
    },
    get data() {
      return Object.fromEntries(map);
    },
    has(name) {
      return map.has(name) || map.has(flash(name));
    },
    get(name) {
      if (map.has(name)) return map.get(name);
      let flashName = flash(name);
      if (map.has(flashName)) {
        let value = map.get(flashName);
        map.delete(flashName);
        return value;
      }
      return undefined;
    },
    set(name, value) {
      map.set(name, value);
    },
    flash(name, value) {
      map.set(flash(name), value);
    },
    unset(name) {
      map.delete(name);
    }
  };
};
/**
 * Returns true if an object is a Remix session.
 *
 * @see https://remix.run/utils/sessions#issession
 */
const isSession = object => {
  return object != null && typeof object.id === "string" && typeof object.data !== "undefined" && typeof object.has === "function" && typeof object.get === "function" && typeof object.set === "function" && typeof object.flash === "function" && typeof object.unset === "function";
};

/**
 * SessionStorage stores session data between HTTP requests and knows how to
 * parse and create cookies.
 *
 * A SessionStorage creates Session objects using a `Cookie` header as input.
 * Then, later it generates the `Set-Cookie` header to be used in the response.
 */

/**
 * SessionIdStorageStrategy is designed to allow anyone to easily build their
 * own SessionStorage using `createSessionStorage(strategy)`.
 *
 * This strategy describes a common scenario where the session id is stored in
 * a cookie but the actual session data is stored elsewhere, usually in a
 * database or on disk. A set of create, read, update, and delete operations
 * are provided for managing the session data.
 */

/**
 * Creates a SessionStorage object using a SessionIdStorageStrategy.
 *
 * Note: This is a low-level API that should only be used if none of the
 * existing session storage options meet your requirements.
 *
 * @see https://remix.run/utils/sessions#createsessionstorage
 */
const createSessionStorageFactory = createCookie => ({
  cookie: cookieArg,
  createData,
  readData,
  updateData,
  deleteData
}) => {
  let cookie = isCookie(cookieArg) ? cookieArg : createCookie((cookieArg === null || cookieArg === void 0 ? void 0 : cookieArg.name) || "__session", cookieArg);
  warnOnceAboutSigningSessionCookie(cookie);
  return {
    async getSession(cookieHeader, options) {
      let id = cookieHeader && (await cookie.parse(cookieHeader, options));
      let data = id && (await readData(id));
      return createSession(data || {}, id || "");
    },
    async commitSession(session, options) {
      let {
        id,
        data
      } = session;
      if (id) {
        await updateData(id, data, cookie.expires);
      } else {
        id = await createData(data, cookie.expires);
      }
      return cookie.serialize(id, options);
    },
    async destroySession(session, options) {
      await deleteData(session.id);
      return cookie.serialize("", {
        ...options,
        expires: new Date(0)
      });
    }
  };
};
function warnOnceAboutSigningSessionCookie(cookie) {
  warnOnce(cookie.isSigned, `The "${cookie.name}" cookie is not signed, but session cookies should be ` + `signed to prevent tampering on the client before they are sent back to the ` + `server. See https://remix.run/utils/cookies#signing-cookies ` + `for more information.`);
}

export { createSession, createSessionStorageFactory, isSession, warnOnceAboutSigningSessionCookie };
