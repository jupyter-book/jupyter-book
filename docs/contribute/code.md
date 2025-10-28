# Contributing Code to Jupyter Book

This guide covers the technical setup and architecture for code contributors.

## Application Design

The Jupyter Book application is a Python package containing a [Node.js](https://nodejs.org/en) application. It's functionally equivalent to the [MyST-MD engine](https://github.com/jupyter-book/mystmd).

### Python Shim

The Python package ensures users have Node.js to run the underlying application. For users without Node.js, it uses [`nodeenv`](https://github.com/ekalinin/nodeenv) to download a local copy.

### JavaScript Application

The core application is written in JavaScript, currently duplicating the `mystmd` CLI. In future, `mystmd` may become smaller with some markup extensions moving to Jupyter Book.

## Setting up a Development Environment

To develop Jupyter Book, you need:

1. Node.js
2. Python 3.9+
3. Hatch

Install these using your preferred package manager. If using [Nix](https://nixos.org/), run `nix develop .` to enter a devshell.

## Building the Python Package

Jupyter Book uses [`hatch`](https://hatch.pypa.io/) to build the Python package. Configuration is in `pyproject.toml`, using plugins:
- `hatch-jupyter-builder` - builds the Node.js application
- `hatch-deps-selector` - manages dependencies for conda-forge vs PyPI
- `hatch-nodejs-version` - provides metadata from the JS package

Build the application:

```shell
hatch build
```

## Building the JS Package

Install NPM dependencies:

```shell
npm install
```

Run the build task:

```shell
npm run build
```

## Running the JS Package

After building:

```shell
npx jupyter-book
```

## Repository Structure

- `py/jupyter_book/` - Python package code
- `ts/` - TypeScript/JavaScript application code
- `docs/` - Documentation source files
- `pyproject.toml` - Python package configuration
- `package.json` - JavaScript package configuration

## Contributing Guidelines

- Make changes via [GitHub Pull Requests](https://docs.github.com/en/pull-requests)
- Report issues via [GitHub Issues](https://docs.github.com/en/issues)
- Follow the project's [Code of Conduct](https://github.com/jupyter-book/.github/blob/main/CODE_OF_CONDUCT.md)
- Check [good first issue](https://github.com/jupyter-book/jupyter-book/labels/good%20first%20issue) for beginner-friendly tasks
