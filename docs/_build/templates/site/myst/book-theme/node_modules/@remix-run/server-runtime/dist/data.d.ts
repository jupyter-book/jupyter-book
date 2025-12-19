import type { ActionFunction, DataFunctionArgs, LoaderFunction } from "./routeModules";
/**
 * An object of unknown type for route loaders and actions provided by the
 * server's `getLoadContext()` function.
 */
export interface AppLoadContext {
    [key: string]: unknown;
}
/**
 * Data for a route that was returned from a `loader()`.
 *
 * Note: This moves to unknown in ReactRouter and eventually likely in Remix
 */
export type AppData = any;
export declare function callRouteActionRR({ loadContext, action, params, request, routeId, }: {
    request: Request;
    action: ActionFunction;
    params: DataFunctionArgs["params"];
    loadContext: AppLoadContext;
    routeId: string;
}): Promise<Response>;
export declare function callRouteLoaderRR({ loadContext, loader, params, request, routeId, }: {
    request: Request;
    loader: LoaderFunction;
    params: DataFunctionArgs["params"];
    loadContext: AppLoadContext;
    routeId: string;
}): Promise<import("@remix-run/router").UNSAFE_DeferredData | Response>;
