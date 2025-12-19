# @remix-run/web-fetch

[![ci][ci.icon]][ci.url]
[![package][version.icon] ![downloads][downloads.icon]][package.url]

Web API compatible [fetch API][] for nodejs.

## Comparison to Alternatives

#### [node-fetch][]

The reason this fork exists is because [node-fetch][] chooses to compromise
Web API compatibility and by using nodejs native [Readable][] stream. They way
they put it is:

>
> - Make conscious trade-off when following [WHATWG fetch spec][whatwg-fetch] and [stream spec](https://streams.spec.whatwg.org/) implementation details, document known differences.
> - Use native Node streams for body, on both request and response.
>

We found these incompatibility to be really problematic when sharing code
across nodejs and browser rutimes. This library uses [@remix-run/web-stream][] instead.



[ci.icon]: https://github.com/web-std/io/workflows/fetch/badge.svg
[ci.url]: https://github.com/web-std/io/actions/workflows/fetch.yml
[version.icon]: https://img.shields.io/npm/v/@remix-run/web-fetch.svg
[downloads.icon]: https://img.shields.io/npm/dm/@remix-run/web-fetch.svg
[package.url]: https://npmjs.org/package/@remix-run/web-fetch
[downloads.image]: https://img.shields.io/npm/dm/@remix-run/web-fetch.svg
[downloads.url]: https://npmjs.org/package/@remix-run/web-fetch
[prettier.icon]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier.url]: https://github.com/prettier/prettier
[blob]: https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
[fetch-blob]: https://github.com/node-fetch/fetch-blob
[readablestream]: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
[readable]: https://nodejs.org/api/stream.html#stream_readable_streams
[w3c blob.stream]: https://w3c.github.io/FileAPI/#dom-blob-stream
[@remix-run/web-stream]:https://github.com/web-std/io/tree/main/stream
[Uint8Array]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
[node-fetch]:https://github.com/node-fetch/
[fetch api]:https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[readable]: https://nodejs.org/api/stream.html#stream_readable_streams
