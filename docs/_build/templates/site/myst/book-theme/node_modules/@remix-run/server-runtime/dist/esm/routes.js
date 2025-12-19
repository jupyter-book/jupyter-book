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
import { callRouteLoaderRR, callRouteActionRR } from './data.js';

// NOTE: make sure to change the Route in remix-react if you change this

// NOTE: make sure to change the EntryRoute in remix-react if you change this

function groupRoutesByParentId(manifest) {
  let routes = {};
  Object.values(manifest).forEach(route => {
    let parentId = route.parentId || "";
    if (!routes[parentId]) {
      routes[parentId] = [];
    }
    routes[parentId].push(route);
  });
  return routes;
}

// Create a map of routes by parentId to use recursively instead of
// repeatedly filtering the manifest.
function createRoutes(manifest, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map(route => ({
    ...route,
    children: createRoutes(manifest, route.id, routesByParentId)
  }));
}

// Convert the Remix ServerManifest into DataRouteObject's for use with
// createStaticHandler
function createStaticHandlerDataRoutes(manifest, future, parentId = "", routesByParentId = groupRoutesByParentId(manifest)) {
  return (routesByParentId[parentId] || []).map(route => {
    let hasErrorBoundary = future.v2_errorBoundary === true ? route.id === "root" || route.module.ErrorBoundary != null : route.id === "root" || route.module.CatchBoundary != null || route.module.ErrorBoundary != null;
    let commonRoute = {
      // Always include root due to default boundaries
      hasErrorBoundary,
      id: route.id,
      path: route.path,
      loader: route.module.loader ? args => callRouteLoaderRR({
        request: args.request,
        params: args.params,
        loadContext: args.context,
        loader: route.module.loader,
        routeId: route.id
      }) : undefined,
      action: route.module.action ? args => callRouteActionRR({
        request: args.request,
        params: args.params,
        loadContext: args.context,
        action: route.module.action,
        routeId: route.id
      }) : undefined,
      handle: route.module.handle
    };
    return route.index ? {
      index: true,
      ...commonRoute
    } : {
      caseSensitive: route.caseSensitive,
      children: createStaticHandlerDataRoutes(manifest, future, route.id, routesByParentId),
      ...commonRoute
    };
  });
}

export { createRoutes, createStaticHandlerDataRoutes };
