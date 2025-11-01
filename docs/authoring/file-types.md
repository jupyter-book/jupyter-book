---
title: Supported file types
description: File formats you can use in your Jupyter Book
---

# Supported file types

Jupyter Book supports several file types for your book content. This page covers the major types and how they're used.

:::{seealso}
For more information, see the [MyST quickstart guide](https://mystmd.org/guide/quickstart).
:::

## Allowed content types

Jupyter Book supports the following file types:

**Markdown files (`.md`)**
: Text files written in MyST Markdown. These are ideal for static content like text, images, and links. See [](mystmd.md) for details about MyST syntax.

**Markdown notebooks**
: Markdown files that can be executed as notebooks. MyST supports text-based notebook formats that are easier to version control than `.ipynb` files.

**Jupyter notebooks (`.ipynb`)**
: Standard Jupyter notebook files containing code cells, markdown cells, and outputs. These can use any Jupyter kernel (Python, R, Julia, etc.). Notebook markdown cells can include MyST Markdown syntax.

## Rules for all content types

There are a few rules that apply to all content types:

* **Files must have a title**. This means they should begin with a level-1 heading (a line starting with `#`) or have a `title` in their frontmatter.

* **Use only one top-level header**. Each page must have only one title. Hence, don't use multiple `#` headings.

* **Headers should increase linearly**. If you're inside a section with one `#`, the next nested section should start with `##`.

## Supported kernels

Jupyter Book can execute notebooks with any Jupyter kernel:

- **Python** (most common)
- **R** - via IRkernel
- **Julia** - via IJulia
- And many more [kernels supported by Jupyter](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels)

## Next steps

- [](mystmd.md) - Learn MyST Markdown syntax
- [](../get-started/create-content.md) - Start creating content
- [](../execution/execution.md) - Configure notebook execution
