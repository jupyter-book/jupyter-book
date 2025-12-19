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
import { createStaticHandler, UNSAFE_DEFERRED_SYMBOL, isRouteErrorResponse, json, getStaticContextFromError } from '@remix-run/router';
import { createEntryRouteModules } from './entry.js';
import { serializeError, sanitizeErrors, serializeErrors } from './errors.js';
import { getDocumentHeadersRR } from './headers.js';
import invariant from './invariant.js';
import { isServerMode, ServerMode } from './mode.js';
import { matchServerRoutes } from './routeMatching.js';
import { createRoutes, createStaticHandlerDataRoutes } from './routes.js';
import { isRedirectResponse, createDeferredReadableStream, isResponse } from './responses.js';
import { createServerHandoffString } from './serverHandoff.js';

const createRequestHandler = (build, mode) => {
  let routes = createRoutes(build.routes);
  let dataRoutes = createStaticHandlerDataRoutes(build.routes, build.future);
  let serverMode = isServerMode(mode) ? mode : ServerMode.Production;
  let staticHandler = createStaticHandler(dataRoutes);
  let errorHandler = build.entry.module.handleError || ((error, {
    request
  }) => {
    if (serverMode !== ServerMode.Test && !request.signal.aborted) {
      console.error(error);
    }
  });
  return async function requestHandler(request, loadContext = {}) {
    let url = new URL(request.url);
    let matches = matchServerRoutes(routes, url.pathname);
    let handleError = error => errorHandler(error, {
      context: loadContext,
      params: matches && matches.length > 0 ? matches[0].params : {},
      request
    });
    let response;
    if (url.searchParams.has("_data")) {
      let routeId = url.searchParams.get("_data");
      response = await handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError);
      if (build.entry.module.handleDataRequest) {
        var _matches$find;
        response = await build.entry.module.handleDataRequest(response, {
          context: loadContext,
          params: (matches === null || matches === void 0 ? void 0 : (_matches$find = matches.find(m => m.route.id == routeId)) === null || _matches$find === void 0 ? void 0 : _matches$find.params) || {},
          request
        });
      }
    } else if (matches && matches[matches.length - 1].route.module.default == null) {
      response = await handleResourceRequestRR(serverMode, staticHandler, matches.slice(-1)[0].route.id, request, loadContext, handleError);
    } else {
      response = await handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext, handleError);
    }
    if (request.method === "HEAD") {
      return new Response(null, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText
      });
    }
    return response;
  };
};
async function handleDataRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError) {
  try {
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext
    });
    if (isRedirectResponse(response)) {
      // We don't have any way to prevent a fetch request from following
      // redirects. So we use the `X-Remix-Redirect` header to indicate the
      // next URL, and then "follow" the redirect manually on the client.
      let headers = new Headers(response.headers);
      headers.set("X-Remix-Redirect", headers.get("Location"));
      headers.set("X-Remix-Status", response.status);
      headers.delete("Location");
      if (response.headers.get("Set-Cookie") !== null) {
        headers.set("X-Remix-Revalidate", "yes");
      }
      return new Response(null, {
        status: 204,
        headers
      });
    }
    if (UNSAFE_DEFERRED_SYMBOL in response) {
      let deferredData = response[UNSAFE_DEFERRED_SYMBOL];
      let body = createDeferredReadableStream(deferredData, request.signal, serverMode);
      let init = deferredData.init || {};
      let headers = new Headers(init.headers);
      headers.set("Content-Type", "text/remix-deferred");
      // Mark successful responses with a header so we can identify in-flight
      // network errors that are missing this header
      headers.set("X-Remix-Response", "yes");
      init.headers = headers;
      return new Response(body, init);
    }

    // Mark all successful responses with a header so we can identify in-flight
    // network errors that are missing this header
    response.headers.set("X-Remix-Response", "yes");
    return response;
  } catch (error) {
    if (isResponse(error)) {
      error.headers.set("X-Remix-Catch", "yes");
      return error;
    }
    if (isRouteErrorResponse(error)) {
      if (error.error) {
        handleError(error.error);
      }
      return errorResponseToJson(error, serverMode);
    }
    let errorInstance = error instanceof Error ? error : new Error("Unexpected Server Error");
    handleError(errorInstance);
    return json(serializeError(errorInstance, serverMode), {
      status: 500,
      headers: {
        "X-Remix-Error": "yes"
      }
    });
  }
}
function findParentBoundary(routes, routeId, error) {
  // Fall back to the root route if we don't match any routes, since Remix
  // has default error/catch boundary handling.  This handles the case where
  // react-router doesn't have a matching "root" route to assign the error to
  // so it returns context.errors = { __shim-error-route__: ErrorResponse }
  let route = routes[routeId] || routes["root"];
  // Router-thrown ErrorResponses will have the error instance.  User-thrown
  // Responses will not have an error. The one exception here is internal 404s
  // which we handle the same as user-thrown 404s
  let isCatch = isRouteErrorResponse(error) && (!error.error || error.status === 404);
  if (isCatch && route.module.CatchBoundary || !isCatch && route.module.ErrorBoundary || !route.parentId) {
    return route.id;
  }
  return findParentBoundary(routes, route.parentId, error);
}

// Re-generate a remix-friendly context.errors structure.  The Router only
// handles generic errors and does not distinguish error versus catch.  We
// may have a thrown response tagged to a route that only exports an
// ErrorBoundary or vice versa.  So we adjust here and ensure that
// data-loading errors are properly associated with routes that have the right
// type of boundaries.
function differentiateCatchVersusErrorBoundaries(build, context) {
  if (!context.errors) {
    return;
  }
  let errors = {};
  for (let routeId of Object.keys(context.errors)) {
    let error = context.errors[routeId];
    let handlingRouteId = findParentBoundary(build.routes, routeId, error);
    errors[handlingRouteId] = error;
  }
  context.errors = errors;
}
async function handleDocumentRequestRR(serverMode, build, staticHandler, request, loadContext, handleError) {
  let context;
  try {
    context = await staticHandler.query(request, {
      requestContext: loadContext
    });
  } catch (error) {
    handleError(error);
    return new Response(null, {
      status: 500
    });
  }
  if (isResponse(context)) {
    return context;
  }

  // Sanitize errors outside of development environments
  if (context.errors) {
    Object.values(context.errors).forEach(err => {
      if (!isRouteErrorResponse(err) || err.error) {
        handleError(err);
      }
    });
    context.errors = sanitizeErrors(context.errors, serverMode);
  }

  // Restructure context.errors to the right Catch/Error Boundary
  if (build.future.v2_errorBoundary !== true) {
    differentiateCatchVersusErrorBoundaries(build, context);
  }
  let headers = getDocumentHeadersRR(build, context);
  let entryContext = {
    manifest: build.assets,
    routeModules: createEntryRouteModules(build.routes),
    staticHandlerContext: context,
    serverHandoffString: createServerHandoffString({
      url: context.location.pathname,
      state: {
        loaderData: context.loaderData,
        actionData: context.actionData,
        errors: serializeErrors(context.errors, serverMode)
      },
      future: build.future
    }),
    future: build.future,
    serializeError: err => serializeError(err, serverMode)
  };
  let handleDocumentRequestFunction = build.entry.module.default;
  try {
    return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext, loadContext);
  } catch (error) {
    handleError(error);

    // Get a new StaticHandlerContext that contains the error at the right boundary
    context = getStaticContextFromError(staticHandler.dataRoutes, context, error);

    // Sanitize errors outside of development environments
    if (context.errors) {
      context.errors = sanitizeErrors(context.errors, serverMode);
    }

    // Restructure context.errors to the right Catch/Error Boundary
    if (build.future.v2_errorBoundary !== true) {
      differentiateCatchVersusErrorBoundaries(build, context);
    }

    // Update entryContext for the second render pass
    entryContext = {
      ...entryContext,
      staticHandlerContext: context,
      serverHandoffString: createServerHandoffString({
        url: context.location.pathname,
        state: {
          loaderData: context.loaderData,
          actionData: context.actionData,
          errors: serializeErrors(context.errors, serverMode)
        },
        future: build.future
      })
    };
    try {
      return await handleDocumentRequestFunction(request, context.statusCode, headers, entryContext, loadContext);
    } catch (error) {
      handleError(error);
      return returnLastResortErrorResponse(error, serverMode);
    }
  }
}
async function handleResourceRequestRR(serverMode, staticHandler, routeId, request, loadContext, handleError) {
  try {
    // Note we keep the routeId here to align with the Remix handling of
    // resource routes which doesn't take ?index into account and just takes
    // the leaf match
    let response = await staticHandler.queryRoute(request, {
      routeId,
      requestContext: loadContext
    });
    // callRouteLoader/callRouteAction always return responses
    invariant(isResponse(response), "Expected a Response to be returned from queryRoute");
    return response;
  } catch (error) {
    if (isResponse(error)) {
      // Note: Not functionally required but ensures that our response headers
      // match identically to what Remix returns
      error.headers.set("X-Remix-Catch", "yes");
      return error;
    }
    if (isRouteErrorResponse(error)) {
      if (error.error) {
        handleError(error.error);
      }
      return errorResponseToJson(error, serverMode);
    }
    handleError(error);
    return returnLastResortErrorResponse(error, serverMode);
  }
}
function errorResponseToJson(errorResponse, serverMode) {
  return json(serializeError(errorResponse.error || new Error("Unexpected Server Error"), serverMode), {
    status: errorResponse.status,
    statusText: errorResponse.statusText,
    headers: {
      "X-Remix-Error": "yes"
    }
  });
}
function returnLastResortErrorResponse(error, serverMode) {
  let message = "Unexpected Server Error";
  if (serverMode !== ServerMode.Production) {
    message += `\n\n${String(error)}`;
  }

  // Good grief folks, get your act together 😂!
  return new Response(message, {
    status: 500,
    headers: {
      "Content-Type": "text/plain"
    }
  });
}

export { createRequestHandler, differentiateCatchVersusErrorBoundaries };
