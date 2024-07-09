---
title: Install Jupyter Book 2
subtitle: Install the Jupyter Book tools from PyPI, NPMJS, or conda-forge.
# subject: MyST Quickstart Tutorial
short_title: Install Jupyter Book
--- 

:::{seealso} Never used Jupyter Book before?
:class: dropdown

Jupyter Book 2 is a very thin wrapper around the MyST-MD engine: it shares the same CLI and configuration file (see [](about/toolchain.md) for more details). It serves primarily to as an introduction of the existing Jupyter Book community to the MyST-MD engine.

If you're new to the Jupyter Book project, consider [directly using MyST-MD](https://mystmd.org/guide/quickstart).
:::

Jupyter Book can be installed in two simple steps:

1. Install NodeJS.

    Jupyter Book 2 needs the Node.js runtime to be available in order to run.

    :::{important} Do I have Node.js installed already?
    :class: dropdown

    You can check for Node.js by opening a console / terminal window and running the following commands
    ```shell
    $ node --version
    v20.12.2
    $ npm --version
    10.5.0
    ```

    You should have these programs installed:

    - [Node.js](https://nodejs.org) version **>=18.0.0**
    - [Node Package Manager (npm)](https://docs.npmjs.com/about-npm) version **>=7.0.0**

    By default, Node.js ships with npm already installed.
    :::

    ::::{grid} 1 1 2 2

    :::{card} 
    :header: Install with [`mamba`][mamba] / `conda` 🔥
    :footer: Cross-platform installation

    ```shell
    mamba install -c conda-forge \
    nodejs>=18
    ```
    :::

    :::{card} 
    :header: Other package managers 📦
    :footer: Comprehensive guide

    See the [Node.js documentation](https://nodejs.org/en/download/package-manager/all) for instructions on installing Node.js using a package manager.
    :::


    ::::

2. Install Jupyter Book 2.

    Jupyter Book is available on the PyPI and conda-forge package repositories as `jupyter-book>=2`. How you install Jupyter Book depends upon your choice of environment manager. 

    ::::{hint} Should I use `pip` or ...?
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
