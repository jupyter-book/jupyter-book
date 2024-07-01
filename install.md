---
title: Install Jupyter Book 2
subtitle: Install the Jupyter Book tools from PyPI, NPMJS, or conda-forge.
# subject: MyST Quickstart Tutorial
short_title: Install Jupyter Book
--- 

:::{tip} Before you start ...
:class: dropdown

Jupyter Book 2 needs the Node.js runtime to be available in order to run. Node.js can be installed
through your system package manager, from conda-forge, or even PyPI (using [nodeenv](http://ekalinin.github.io/nodeenv/)).

You should have these programs installed:

- [Node.js](https://nodejs.org) version **>=18.0.0**
- [Node Package Manager (npm)](https://docs.npmjs.com/about-npm) version **>=7.0.0**

By default, Node.js ships with npm already installed.
:::

::::{grid} 1 2 2 2

:::{card} 
:header: Install with `pip` 🐍
```shell
pip install -U jupyter-book>=2
```
:::

:::{card} 
:header: Install with `mamba` / `conda` 🔥
```shell
mamba install -c conda-forge \
  jupyter-book>=2
```
:::


::::
