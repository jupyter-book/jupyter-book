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
import { json as json$1, defer as defer$1, redirect as redirect$1 } from '@remix-run/router';
import { serializeError } from './errors.js';

// must be a type since this is a subtype of response
// interfaces must conform to the types they extend
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 *
 * @see https://remix.run/utils/json
 */
const json = (data, init = {}) => {
  return json$1(data, init);
};

/**
 * This is a shortcut for creating Remix deferred responses
 *
 * @see https://remix.run/utils/defer
 */
const defer = (data, init = {}) => {
  return defer$1(data, init);
};
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 *
 * @see https://remix.run/utils/redirect
 */
const redirect = (url, init = 302) => {
  return redirect$1(url, init);
};
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
const redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
function isRedirectStatusCode(statusCode) {
  return redirectStatusCodes.has(statusCode);
}
function isRedirectResponse(response) {
  return isRedirectStatusCode(response.status);
}
function isTrackedPromise(value) {
  return value != null && typeof value.then === "function" && value._tracked === true;
}

// TODO: Figure out why ReadableStream types are borked sooooooo badly
// in this file. Probably related to our TS configurations and configs
// bleeding into each other.
const DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
function createDeferredReadableStream(deferredData, signal, serverMode) {
  let encoder = new TextEncoder();
  let stream = new ReadableStream({
    async start(controller) {
      let criticalData = {};
      let preresolvedKeys = [];
      for (let [key, value] of Object.entries(deferredData.data)) {
        if (isTrackedPromise(value)) {
          criticalData[key] = `${DEFERRED_VALUE_PLACEHOLDER_PREFIX}${key}`;
          if (typeof value._data !== "undefined" || typeof value._error !== "undefined") {
            preresolvedKeys.push(key);
          }
        } else {
          criticalData[key] = value;
        }
      }

      // Send the critical data
      controller.enqueue(encoder.encode(JSON.stringify(criticalData) + "\n\n"));
      for (let preresolvedKey of preresolvedKeys) {
        enqueueTrackedPromise(controller, encoder, preresolvedKey, deferredData.data[preresolvedKey], serverMode);
      }
      let unsubscribe = deferredData.subscribe((aborted, settledKey) => {
        if (settledKey) {
          enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey], serverMode);
        }
      });
      await deferredData.resolveData(signal);
      unsubscribe();
      controller.close();
    }
  });
  return stream;
}
function enqueueTrackedPromise(controller, encoder, settledKey, promise, serverMode) {
  if ("_error" in promise) {
    controller.enqueue(encoder.encode("error:" + JSON.stringify({
      [settledKey]: promise._error instanceof Error ? serializeError(promise._error, serverMode) : promise._error
    }) + "\n\n"));
  } else {
    controller.enqueue(encoder.encode("data:" + JSON.stringify({
      [settledKey]: promise._data ?? null
    }) + "\n\n"));
  }
}

export { createDeferredReadableStream, defer, isDeferredData, isRedirectResponse, isRedirectStatusCode, isResponse, json, redirect };
