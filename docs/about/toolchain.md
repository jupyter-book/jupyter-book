---
title: The Jupyter Book toolchain
subtitle: An overview of the tools that power Jupyter Book 2.
---

Jupyter Book 2 is built upon the [MyST-MD](https://mystmd.org) document engine, which serves a similar purpose to the Sphinx documentation engine used by Jupyter Book 1. However, MyST-MD is designed from the ground-up for technical and scientific writing, and provides [some exciting features](xref:guide/quickstart-myst-markdown#links-cross-references) such as rabbit-hole links. Fundamentally, Jupyter Book 2 does not try to hide the fact that it is built on top of a document engine; MyST-MD is designed from the ground up to be good at technical writing, and the Jupyter Book team believe that its native configuration format and CLI are both powerful and easy-to-use. As such, Jupyter Book 2 builds on top of MyST-MD by using the same CLI and `myst.yml` configuration format.

:::{pull-quote}
Jupyter Book 2 _is_ MyST-MD [...]; power users can use the MyST-MD CLI directly!
:::
To minimize the complexity of integrating two separate software packages, the `jupyter book` binary shares the MyST-MD CLI, i.e. Jupyter Book 2 _is_ MyST-MD (bundled with a default Jupyter Book configuration)! Whilst in future we _may_ look to add new commands and options to the Jupyter Book CLI, the Jupyter Book team will always lean towards adding new features directly to MyST-MD; we firmly believe that the right choices for the MyST-MD CLI are the right choices for Jupyter Book. Consequently, power users can use the MyST-MD CLI directly! By keeping the distinction between Jupyter Book and MyST-MD as small as possible, we hope to ensure the mutual growth of both projects.
