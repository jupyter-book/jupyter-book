---
title: jupyter-book v0.15.1
date: 2023-03-14
url: /release/v0.15.1
repository: jupyter-book
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/jupyter-book/releases/tag/v0.15.1>`

## v0.15.1 - 2023-03-13

([full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.15.0...aa0eedbc40691b5f0ea0dd5e80fdfb572e0ee91d))

### Bug

This release is a minor update to alert users of `jupyter-book` to [sphinxcontrib-bibtex #322](https://github.com/mcmtroffaes/sphinxcontrib-bibtex/issues/322) when building bibliographies with `docutils>=0.18,<0.20` installed.

- [#1965](https://github.com/executablebooks/jupyter-book/pull/1965)

**Bug:** Using `docutils>=0.18` results in breaking the page `html` layout when using `sphinx-book-theme` on pages
that include a `bibliography` directive.
