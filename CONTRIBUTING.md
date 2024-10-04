# Contributing to Jupyter Book

This document is for people wanting to contribute to the Jupyter Book (JB) project. Making changes to the project involves contributing [GitHub Pull Requests](https://docs.github.com/en/pull-requests), and creating [GitHub Issues](https://docs.github.com/en/issues). As such, a GitHub account is required. The rest of this document assumes that you are already familiar with Git, and GitHub.

## Application Design

The JB application is a Python package _containing_ a [Node.js](https://nodejs.org/en) (JavaScript) application. At the time of writing, the JB application is functionally equivalent to the [MyST-MD engine](https://github.com/jupyter-book/mystmd), so for people who wish to use JB in a JavaScript-only context it is recommended to use `mystmd` itself.

### Python Shim

The JB Python package is responsible for ensuring that the Python user has an up-to-date version of Node.js in order to run the underlying Node.js application. For users who do not have Node.js installed, it uses [`nodeenv`](https://github.com/ekalinin/nodeenv) to download a local copy of the Node.js runtime, before launching Jupyter Book.

### JavaScript Application

The core Jupyter Book application is written in JavaScript. Presently this duplicates the `mystmd` CLI. In future, `mystmd` may become smaller in size, with some of the markup extensions moving to Jupyter Book.

## Setting up a Development Environment

To develop Jupyter Book, you will need the following tools:

1. Node.js
2. Python 3.9+
3. Hatch

You can install these tools using whichever package manager you prefer. If you are using [Nix](https://nixos.org/), then this repository ships with a `flake.nix`, meaning you can run `nix develop .` to enter into a devshell.

## Building the Python Package

Jupyter Book uses [`hatch`](https://hatch.pypa.io/) to build the Python package. The configuration responsible for building the package is declaratively specified in `pyproject.toml`. A number of Hatch build plugins are used to facilitate this, including `hatch-jupyter-builder` (which builds the NodeJS application), `hatch-deps-selector` (which changes the package dependencies for conda-forge vs PyPI), and `hatch-nodejs-version` which provides metadata for the Python package from the JS package.

To build the application, simply install Hatch (see [](#setting-up-a-development-environment)) and run `hatch build`:

```shell
hatch build
```

## Building the JS Package

To build the JS package, you must first install the NPM dependencies:

```shell
npm install
```

Then, you can run the `build` task:

```shell
npm run build
```

## Running the JS Package

After building the JS package, you can simply run:

```shell
npx jupyter-book
```
