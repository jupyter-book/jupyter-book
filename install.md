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

Jupyter Book is available on the PyPI and conda-forge package repositories as `jupyter-book>=2`. How you install Jupyter Book depends upon your choice of environment manager. 

::::{tip} Should I use `pip` or ...?
:class: dropdown

Installing software can be confusing. Here's a simple guide to making a sensible choice.
   
1. Are you using an {term}`Environment Manager`?  
   If you are already using an environment manager, you should use that tool to install `jupyter-book`. 

2. Are you willing to use an {term}`Environment Manager`?  
   There are lots of environment managers to choose from. If you aren't sure which to choose, it is recommended to start with [a Python virtual environment][venv].

3. Otherwise ...  
   `pip` can install packages into your home directory with
   ```shell
   pip install -U jupyter-book>=2
   ```
   :::{warning} Ignoring environment management
   :name: warning:env-management

   Ignoring environment management can lead to confusion later when things break. It is recommended to [use a virtual environment][venv] if you do not use an existing tool.
   :::
::::


::::{grid} 1 2 2 2

:::{card} 
:header: Install with `pip` 🐍

In a [virtual environment][venv]:
```shell
pip install jupyter-book>=2
```
:::

:::{card} 
:header: Install with [`mamba`][mamba] / `conda` 🔥

```shell
mamba install -c conda-forge \
  jupyter-book>=2
```
:::

:::{card} 
:header: Install with [`pipx`][pipx] ⚙️

Never heard of `pipx`? See [the documentation][pipx] for more.

```shell
pipx install jupyter-book>=2
```
:::

:::{card} 
:header: Install with [`pixi`][pixi] 🔥

Never heard of `pixi`? See [the documentation][pixi] for more.

```shell:
pixi add jupyter-book>=2
```
:::


::::

[mamba]: https://mamba.readthedocs.io/en/latest/
[pixi]: https://pixi.sh/
[pipx]: https://pipx.pypa.io/stable/
[venv]: https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/
