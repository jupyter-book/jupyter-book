const path = require('path');
const express = require('express');
const getPort = require('get-port');
const compression = require('compression');
const morgan = require('morgan');
const { createRequestHandler } = require('@remix-run/express');
const { installGlobals } = require('@remix-run/node');

installGlobals();

const BUILD_DIR = path.join(process.cwd(), 'build');

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

// Remix fingerprints its assets so we can cache forever.
app.use('/myst_assets_folder', express.static('public/build', { immutable: true, maxAge: '1y' }));

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('public', { maxAge: '1h' }));

app.use(morgan('tiny'));

app.all(
  '*',
  createRequestHandler({
    build: require(BUILD_DIR),
    mode: process.env.NODE_ENV,
  }),
);

async function start() {
  // Find an open port if the env is not specified
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || (await getPort({ port: getPort.makeRange(3000, 3100) }));
  app.listen(port, host, () => {
    console.log(`Server started at http://${host}:${port}`);
  });
}

start();
