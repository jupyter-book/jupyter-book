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

var setCookieParser = require('set-cookie-parser');

function getDocumentHeadersRR(build, context) {
  let boundaryIdx = context.errors ? context.matches.findIndex(m => context.errors[m.route.id]) : -1;
  let matches = boundaryIdx >= 0 ? context.matches.slice(0, boundaryIdx + 1) : context.matches;
  let errorHeaders;
  if (boundaryIdx >= 0) {
    // Look for any errorHeaders from the boundary route down, which can be
    // identified by the presence of headers but no data
    let {
      actionHeaders,
      actionData,
      loaderHeaders,
      loaderData
    } = context;
    context.matches.slice(boundaryIdx).some(match => {
      let id = match.route.id;
      if (actionHeaders[id] && (!actionData || actionData[id] === undefined)) {
        errorHeaders = actionHeaders[id];
      } else if (loaderHeaders[id] && loaderData[id] === undefined) {
        errorHeaders = loaderHeaders[id];
      }
      return errorHeaders != null;
    });
  }
  return matches.reduce((parentHeaders, match, idx) => {
    let {
      id
    } = match.route;
    let routeModule = build.routes[id].module;
    let loaderHeaders = context.loaderHeaders[id] || new Headers();
    let actionHeaders = context.actionHeaders[id] || new Headers();

    // Only expose errorHeaders to the leaf headers() function to
    // avoid duplication via parentHeaders
    let includeErrorHeaders = errorHeaders != undefined && idx === matches.length - 1;
    // Only prepend cookies from errorHeaders at the leaf renderable route
    // when it's not the same as loaderHeaders/actionHeaders to avoid
    // duplicate cookies
    let includeErrorCookies = includeErrorHeaders && errorHeaders !== loaderHeaders && errorHeaders !== actionHeaders;

    // When the future flag is enabled, use the parent headers for any route
    // that doesn't have a `headers` export
    if (routeModule.headers == null && build.future.v2_headers) {
      let headers = new Headers(parentHeaders);
      if (includeErrorCookies) {
        prependCookies(errorHeaders, headers);
      }
      prependCookies(actionHeaders, headers);
      prependCookies(loaderHeaders, headers);
      return headers;
    }
    let headers = new Headers(routeModule.headers ? typeof routeModule.headers === "function" ? routeModule.headers({
      loaderHeaders,
      parentHeaders,
      actionHeaders,
      errorHeaders: includeErrorHeaders ? errorHeaders : undefined
    }) : routeModule.headers : undefined);

    // Automatically preserve Set-Cookie headers from bubbled responses,
    // loaders, errors, and parent routes
    if (includeErrorCookies) {
      prependCookies(errorHeaders, headers);
    }
    prependCookies(actionHeaders, headers);
    prependCookies(loaderHeaders, headers);
    prependCookies(parentHeaders, headers);
    return headers;
  }, new Headers());
}
function prependCookies(parentHeaders, childHeaders) {
  let parentSetCookieString = parentHeaders.get("Set-Cookie");
  if (parentSetCookieString) {
    let cookies = setCookieParser.splitCookiesString(parentSetCookieString);
    cookies.forEach(cookie => {
      childHeaders.append("Set-Cookie", cookie);
    });
  }
}

exports.getDocumentHeadersRR = getDocumentHeadersRR;
