# Contributing Code to Jupyter Book

This guide covers the technical setup and architecture for code contributors.

## Application Design

The Jupyter Book application is a Python package containing a [Node.js](https://nodejs.org/en) application.
It's functionally equivalent to the [MyST-MD engine](https://github.com/jupyter-book/mystmd).

### Python Shim

The Python package ensures users have Node.js to run the underlying application. For users without Node.js, it uses [`nodeenv`](https://github.com/ekalinin/nodeenv) to download a local copy.

### JavaScript Application

The core application is written in JavaScript, currently extending the [`mystmd` CLI](https://mystmd.org/guide). In future, `mystmd` may become smaller with some markup extensions moving to Jupyter Book.

Jupyter Book 2's CLI adds some extra functionality (like a way to upgrade from Jupyter Book 1), but is intentionally as lightweight as possible.

## Building the Python Package

Jupyter Book uses [`hatch`](https://hatch.pypa.io/) to build the Python package. Configuration is in `pyproject.toml`, using plugins:
- `hatch-jupyter-builder` - builds the Node.js application
- `hatch-deps-selector` - manages dependencies for conda-forge vs PyPI
- `hatch-nodejs-version` - provides metadata from the JS package

Build the application:

```shell
hatch build
```
