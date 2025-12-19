export type SignFunction = (value: string, secret: string) => Promise<string>;
export type UnsignFunction = (cookie: string, secret: string) => Promise<string | false>;
