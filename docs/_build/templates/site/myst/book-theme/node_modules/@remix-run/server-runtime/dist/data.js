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

var responses = require('./responses.js');

/**
 * An object of unknown type for route loaders and actions provided by the
 * server's `getLoadContext()` function.
 */

/**
 * Data for a route that was returned from a `loader()`.
 *
 * Note: This moves to unknown in ReactRouter and eventually likely in Remix
 */

async function callRouteActionRR({
  loadContext,
  action,
  params,
  request,
  routeId
}) {
  let result = await action({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === undefined) {
    throw new Error(`You defined an action for route "${routeId}" but didn't return ` + `anything from your \`action\` function. Please return a value or \`null\`.`);
  }
  return responses.isResponse(result) ? result : responses.json(result);
}
async function callRouteLoaderRR({
  loadContext,
  loader,
  params,
  request,
  routeId
}) {
  let result = await loader({
    request: stripDataParam(stripIndexParam(request)),
    context: loadContext,
    params
  });
  if (result === undefined) {
    throw new Error(`You defined a loader for route "${routeId}" but didn't return ` + `anything from your \`loader\` function. Please return a value or \`null\`.`);
  }
  if (responses.isDeferredData(result)) {
    if (result.init && responses.isRedirectStatusCode(result.init.status || 200)) {
      return responses.redirect(new Headers(result.init.headers).get("Location"), result.init);
    }
    return result;
  }
  return responses.isResponse(result) ? result : responses.json(result);
}

// TODO: Document these search params better
// and stop stripping these in V2. These break
// support for running in a SW and also expose
// valuable info to data funcs that is being asked
// for such as "is this a data request?".
function stripIndexParam(request) {
  let url = new URL(request.url);
  let indexValues = url.searchParams.getAll("index");
  url.searchParams.delete("index");
  let indexValuesToKeep = [];
  for (let indexValue of indexValues) {
    if (indexValue) {
      indexValuesToKeep.push(indexValue);
    }
  }
  for (let toKeep of indexValuesToKeep) {
    url.searchParams.append("index", toKeep);
  }
  return new Request(url.href, request);
}
function stripDataParam(request) {
  let url = new URL(request.url);
  url.searchParams.delete("_data");
  return new Request(url.href, request);
}

exports.callRouteActionRR = callRouteActionRR;
exports.callRouteLoaderRR = callRouteLoaderRR;
