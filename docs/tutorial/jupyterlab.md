---
title: Author with Jupyter Interfaces
subtitle: MyST has support in Jupyter frontends
subject: Jupyter Book Tutorial
description: MyST Markdown can be used in JupyterLab with support for all MyST syntax as well as inline execution.
thumbnail: ./thumbnails/jupyterlab-myst.png
---

::::{important} Objective

The goal of this quickstart is to get you up and running in [JupyterLab](https://jupyter.org), explore inline execution 📈, and working together with other MyST tools.

For this tutorial we are assuming some familiarity with [JupyterLab](https://jupyter.org), and MyST syntax (see the [MyST quickstart guide](./quickstart-myst-markdown.md)). We will be executing a few Python code cells in the notebook, familiarity with `numpy` and `matplotlib` is helpful but not necessary.
::::

![](#lookout-for-tutorial-actions)

````{note} See the video tutorial 📺
:class: dropdown
```{iframe} https://www.youtube.com/embed/F3st8X0L1Ys
:width: 100%
```
````

:::{tip} 🛠 Install JupyterLab Locally
:class: dropdown
For this tutorial you must have installed JupyterLab locally (use a version greater than 3.0).

🛠 Install JupyterLab, following the guide at <https://jupyter.org/install>

To follow along on _without_ installing anything, you can try to [![Launch on Binder][binder-badge]][binder-link], however the install process may take up to ten minutes.
:::

## Install JupyterLab MyST

🛠 Install the JupyterLab MyST extension version: [![PyPI](https://img.shields.io/pypi/v/jupyterlab-myst.svg)](https://pypi.org/project/jupyterlab-myst)

```bash
pip install jupyterlab_myst
```

See the GitHub repository, [jupyterlab-myst](https://github.com/jupyter-book/jupyterlab-myst) for full installation instructions.

:::{tip} 🛠 Verify the installation
:class: dropdown
To verify that the extension is registered with Jupyter, use:

```bash
jupyter labextension list
```

You should see the following text in the output:

```text
jupyterlab-myst v1.x.x enabled OK
```

:::

## Download quickstart content

We are going to download an example project that includes notebooks for use in JupyterLab with the MyST extension installed.
Our goal will be to try out some of the main features of `jupyterlab-myst`, including frontmatter, MyST syntax, and inline execution.

🛠 Download the example content, and navigate into the folder:

```bash
git clone https://github.com/jupyter-book/jupyterlab-myst-quickstart.git
cd jupyterlab-myst-quickstart
```

### Explore the Notebooks

🛠 Launch JupyterLab with `jupyterlab-myst` activated [![Launch on Binder][binder-badge]][binder-link]

```bash
jupyter lab
```

:::{figure} ./images/jupyterlab-myst.png
:width: 100%
:label: jupyterlab-myst

MyST in JupyterLab, showing frontmatter and admonitions that are natively rendered! 🎉
:::

---

More Coming Soon™

- showing frontmatter
- advanced user interface elements like tabs, grids, and cards
- citations

---

(inline-expressions)=
## Inline Expressions

JupyterLab MyST allows you to create and evaluate inline expressions using the {myst:role}`eval` role.
These turn your markdown cells into places that you can quickly evaluate a simple expression, such as:

- The value of the variable `x`: `` {eval}`x` ``
- Expand a sympy equation `polynomial`: `` {eval}`expand(polynomial)` ``

:::{figure} ./videos/eval-array.mp4
:class: framed
:label: fig:eval-array

Use the `` {eval}`x` `` role to evaluate an expression, which can be text, an image, an equation, or even an `ipywidgets` slider.
:::

:::{tip} Formatting Numbers
You can use Python `f-strings` to format numbers, `` {eval}`f'{x:.1%}'` ``, will create something like: "64.6%" if `x` is a random number.
:::

## Working with `ipywidgets`

Most widgets will work directly inline, allowing you to place widgets or controls inside of callouts, these can be linked together as normal.

:::{figure} ./videos/eval-slider.mp4
:class: framed

Embed interactive `ipywidgets` in your markdown cells.
:::

## Task Lists

The MyST extension also makes it very easy to edit task lists directly in the rendered view. Then you click a task item, the markdown is automatically updated.

:::{figure} ./videos/tasks.mp4
:class: framed

Edit task lists with the `jupyterlab-myst` plugin directly in the rendered view.
:::

## Conclusion 🥳

For now, that's it for this quickstart tutorial, please see the content in the notebooks or help contribute to the docs to help document these features!

![](#quickstart-cards)

[binder-badge]: https://mybinder.org/badge_logo.svg
[binder-link]: https://mybinder.org/v2/gh/executablebooks/jupyterlab-myst-quickstart/main?urlpath=lab
