---
title: Jupyter Book
site:
  hide_outline: true
  hide_toc: true
  hide_title_block: true
---

+++ {"class": "col-page-inset"}

:::{hero}
Jupyter {orange}`Book`
:::

:::::{grid} 1 2 2 2
::::{grid-item}
{large}`Jupyter Book allows you to create documents and knowledge bases that are **reusable**, **reproducible**, and **interactive**.`
::::
::::{grid-item}

```{code-block} bash
:filename: Jupyter Book quickstart
:class: hi
pip install jupyter-book
jupyter book start
```

::::
:::::

+++ {"class": "col-body-outset"}

:::{warning} This is alpha software!
Jupyter Book 2.0 is currently in **alpha**.
This means that functionality may be missing or not working, and will evolve quickly.
[Open an issue in our repository](https://github.com/jupyter-book/jupyter-book) with feedback.
:::

::::{tab-set}
:::{tab-item} Reusable

```{figure} media/videos/reusable.mp4

```

:::
:::{tab-item} Reproducible

```{figure} media/videos/reproducible.mp4

```

:::
:::{tab-item} Interactive

```{figure} media/videos/interactive.mp4

```

:::
::::

+++ {"class": "col-page-inset"}

::::{grid} 1 2 2 2

:::{card}
:header: Powerful Authoring ✏️

Jupyter Book uses [MyST Markdown](https://mystmd.org/spec), an extension of [CommonMark](https://commonmark.org/), making it easy to author structured documents.
:::

:::{card}
:header: Executable Documents ⚙

Interweave computational results with high-quality narrative using Jupyter Notebooks or executable MyST Markdown documents.
:::

:::{card}
:header: Interactive Content 🚀

Publish to a website that allows users to interact with widgets and computation using [JupyterHub](https://jupyterhub.readthedocs.io/), [Binder](https://jupyter.org/binder), and even Python _in the browser_!
:::

:::{card}
:header: Reusable Knowledge 🔎

Create cross-references to content from other documents and sites to give users a deeper, richer reading experience.
:::

::::

## Acknowledgements

Jupyter Book is supported by an [open community of contributors](https://github.com/jupyter-book/jupyter-book/graphs/contributors), many of whom come from the [the MySTMD Community](https://mystmd.org) and [the Jupyter community](https://jupyter.org/community).
