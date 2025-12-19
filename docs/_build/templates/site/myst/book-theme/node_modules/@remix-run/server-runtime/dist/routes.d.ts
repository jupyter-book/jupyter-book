import type { AgnosticDataRouteObject } from "@remix-run/router";
import type { FutureConfig } from "./entry";
import type { ServerRouteModule } from "./routeModules";
export interface RouteManifest<Route> {
    [routeId: string]: Route;
}
export type ServerRouteManifest = RouteManifest<Omit<ServerRoute, "children">>;
export interface Route {
    index?: boolean;
    caseSensitive?: boolean;
    id: string;
    parentId?: string;
    path?: string;
}
export interface EntryRoute extends Route {
    hasAction: boolean;
    hasLoader: boolean;
    hasCatchBoundary: boolean;
    hasErrorBoundary: boolean;
    imports?: string[];
    module: string;
    parentId?: string;
}
export interface ServerRoute extends Route {
    children: ServerRoute[];
    module: ServerRouteModule;
}
export declare function createRoutes(manifest: ServerRouteManifest, parentId?: string, routesByParentId?: Record<string, Omit<ServerRoute, "children">[]>): ServerRoute[];
export declare function createStaticHandlerDataRoutes(manifest: ServerRouteManifest, future: FutureConfig, parentId?: string, routesByParentId?: Record<string, Omit<ServerRoute, "children">[]>): AgnosticDataRouteObject[];
