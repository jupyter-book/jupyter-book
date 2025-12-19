import type { Params } from "@remix-run/router";
import type { ServerRoute } from "./routes";
export interface RouteMatch<Route> {
    params: Params;
    pathname: string;
    route: Route;
}
export declare function matchServerRoutes(routes: ServerRoute[], pathname: string): RouteMatch<ServerRoute>[] | null;
