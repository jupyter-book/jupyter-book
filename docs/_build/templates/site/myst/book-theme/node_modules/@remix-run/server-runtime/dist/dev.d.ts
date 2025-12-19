import type { ServerBuild } from "./build";
export declare function broadcastDevReady(build: ServerBuild, origin?: string): Promise<void>;
export declare function logDevReady(build: ServerBuild): void;
