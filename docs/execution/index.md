---
title: Execute & Compute
short_title: Execute & Compute
---

Run code in your Jupyter Book at build time, cache outputs for fast rebuilds, and include computational results (figures, tables, values, etc) directly in your pages.

```{toc}
:context: children
```

## Notebook execution configuration

Control which notebooks execute, choose kernels, set timeouts, and configure caching behaviour. See [](xref:guide/notebook-configuration).

## Notebooks written in Markdown

Author Jupyter notebooks as plain `.md` files using MyST cell markers, with the same execution behaviour as `.ipynb`. See [](xref:guide/notebooks-with-markdown).

## Markdown vs. `.ipynb`

Guidance on when to choose Markdown notebooks vs. traditional `.ipynb` files for your project. See [](xref:guide/md-vs-ipynb).

## Reuse Jupyter outputs

Embed computed outputs (figures, tables, values) from one notebook across other pages in your book. See [](xref:guide/reuse-jupyter-outputs).

## Interactive notebooks and widgets

Make notebook outputs interactive in the rendered website using widgets and structured outputs. See [](xref:guide/interactive-notebooks).

## In-page execution with Thebe

Let readers run code directly on a page in their browser, backed by a remote kernel. See [](xref:guide/in-page-execution).

## Launch buttons

Add buttons that open notebooks in Binder or JupyterHub. See [](xref:guide/website-launch-buttons).
