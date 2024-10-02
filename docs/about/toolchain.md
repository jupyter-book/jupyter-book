---
title: The Jupyter Book Toolchain
subtitle: An overview of the tools that power Jupyter Book 2.
---

:::{note} Looking for Sphinx?

The _legacy_ Jupyter Book toolchain was based upon Sphinx.

% TODO: link to Sphinx deployment.
:::

Jupyter Book 2 is build upon the [MyST-MD](https://mystmd.org) document engine. This serves a very similar purpose to the Sphinx documentation engine that was used by Jupyter Book 1. However, MyST-MD is designed from the ground-up for technical and scientific writing, and provides [some exciting features](xref:guide/quickstart-myst-markdown#links-cross-references) such as rabbit-hole links.

To minimize the complexity of integrating two separate software product, the `jupyter book` binary is a thin "shim" around the MyST-MD CLI, i.e. Jupyter Book 2 _is_ MyST-MD (bundled with a default Jupyter Book configuration)! We firmly believe that the right choices for the MyST-MD CLI are the right choices for Jupyter Book. To help make MyST-MD _feel_ more like Jupyter Book, we set a few environment variables that superficially change its appearance. Consequently, power users can use the MyST-MD CLI directly!

:::{pull-quote}
Jupyter Book 2 _is_ MyST-MD [...]; power users can use the MyST-MD CLI directly!
:::

We made this choice to recognise the different starting points of the existing Jupyter Book and growing MyST-MD communities. By keeping the distinction between Jupyter Book and MyST-MD as small as possible, we can ensure the mutual growth of both projects.
