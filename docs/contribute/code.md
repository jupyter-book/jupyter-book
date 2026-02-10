# Contributing Code to Jupyter Book

This guide covers the technical setup and architecture for contributors to the `jupyter-book` repository.

## Where code changes usually happen

Most technical changes in the Jupyter Book ecosystem happen in one of these repositories:

- [jupyter-book/mystmd](https://github.com/jupyter-book/mystmd): The document engine that powers Jupyter Book.
- [jupyter-book/myst-theme](https://github.com/jupyter-book/myst-theme): The theme and React infrastructure used by Jupyter Book.
- Other extension and plugin repositories in the [jupyter-book organization](https://github.com/jupyter-book).

This repository (`jupyter-book/jupyter-book`) mainly provides a packaging and CLI distribution that is intentionally lightweight.

## Application design

The Jupyter Book application is a Python package that wraps a Node.js application. It is functionally equivalent to a configured version of the [MyST engine](https://github.com/jupyter-book/mystmd).

### Python shim

The Python package ensures users have Node.js to run the underlying application. For users without Node.js, it uses [`nodeenv`](https://github.com/ekalinin/nodeenv) to download a local copy.

### CLI behavior

Jupyter Book's CLI keeps compatibility-oriented behavior (for example, upgrade paths from Jupyter Book 1) while staying as close to upstream `mystmd` behavior as possible.

## Build the Python package

Jupyter Book uses [`hatch`](https://hatch.pypa.io/) to build the Python package. Configuration is in `pyproject.toml`, using plugins:

- `hatch-jupyter-builder`: Builds the Node.js application.
- `hatch-deps-selector`: Manages dependencies for conda-forge vs PyPI.
- `hatch-nodejs-version`: Provides metadata from the JS package.

Build the package:

```shell
hatch build
```
