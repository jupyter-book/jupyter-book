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

::::::{grid} 1 2 2 2
:::::{grid-item}
{large}`Create documents and knowledge bases that are **reusable**, **reproducible**, and **interactive**.`
:::::
:::::{grid-item}
::::{tab-set}
:::{tab-item} Install

```{code-block} bash
pip install --pre "jupyter-book>=2.0"
jupyter book start
```

Then check out the [Jupyter Book documentation](./start.md)!
:::
:::{tab-item} Upgrade from Jupyter Book 1.0
```{code-block} bash
:emphasize-lines: 2
:linenos:
pip install --pre "jupyter-book>=2.0"
jupyter book
```

You can find more information in the [upgrading tutorial](./upgrade.md)!
:::


:::::
::::::

+++ {"class": "col-body-outset"}

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
