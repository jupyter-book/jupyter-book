---
title: jupyter-book v0.14.0
date: 2023-03-01
url: /release/v0.14.0
repository: jupyter-book
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/jupyter-book/releases/tag/v0.14.0>`

## v0.14.0 - 2023-02-28

([full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.13.2...e52689156deeace6a34c8e27f77dfa7ec65720ab))

This release updates many of the underlying software packages used by `jupyter-book` including major updates to [myst-nb](https://github.com/executablebooks/myst-nb) and [myst-parser](https://github.com/executablebooks/myst-parser) which power `jupyter-book`. This release also brings compatibility with `sphinx v5`.

A big **thank you** to all contributors and maintainers of these underlying packages. There have been many major updates that will flow through to `jupyter-book` with this release.

A [migration assistance page](https://jupyterbook.org/en/stable/explain/migration.html) has been setup to assist users with updates to your `configuration` and highlights a few of the common `breaking changes` which are discussed with examples.

### Package Updates

- [#1842](https://github.com/executablebooks/jupyter-book/pull/1842) updates [myst-nb](https://github.com/executablebooks/MyST-NB) moving from `myst-nb~=0.13.1` to `myst-nb~=0.17.1`. This incorporates three major updates to [myst-nb](https://github.com/executablebooks/MyST-NB/releases) which in turn incorporates changes to the underlying [myst-parser](https://github.com/executablebooks/MyST-Parser/releases) moving from `myst-parser~=0.15` to `myst-parser~=0.18`.
- [#1842](https://github.com/executablebooks/jupyter-book/pull/1842) enables compatibility with `docutils>=0.15,<0.19`
- [#1842](https://github.com/executablebooks/jupyter-book/pull/1842) supports `sphinx5`
- [#1842](https://github.com/executablebooks/jupyter-book/pull/1842) incorporates updates for `sphinx-design`, `sphinx-thebe` and `sphinx-book-theme`.

### Docs

- DOCS: Fix gallery URL [1933](https://github.com/executablebooks/jupyter-book/pull/1933) and [1937](https://github.com/executablebooks/jupyter-book/pull/1937)

### Contributors to this release

([GitHub contributors page for this release](https://github.com/executablebooks/jupyter-book/graphs/contributors?from=2023-02-07&to=2023-02-28&type=c))

However this excludes the many major contributions in underlying projects which are documented in the table below.

| Package | Contributions |
|---------|---------------|
| [myst-nb](https://github.com/executablebooks/MyST-NB) | [contributors](https://github.com/executablebooks/MyST-NB/graphs/contributors?from=2022-02-11&to=2023-02-28&type=c) |
| [myst-parser](https://github.com/executablebooks/myst-parser) | [contributors](https://github.com/executablebooks/myst-parser/graphs/contributors?from=2021-06-13&to=2023-02-28&type=c) |
| [sphinx-design](https://github.com/executablebooks/sphinx-design) | [contributors](https://github.com/executablebooks/sphinx-design/graphs/contributors?from=2022-04-21&to=2023-02-28&type=c) |
| [sphinx-thebe](https://github.com/executablebooks/sphinx-thebe) | [contributors](https://github.com/executablebooks/sphinx-thebe/graphs/contributors?from=2022-04-30&to=2023-02-28&type=c) |
| [sphinx-book-theme](https://github.com/executablebooks/sphinx-book-theme) | [contributors](https://github.com/executablebooks/sphinx-book-theme/graphs/contributors?from=2022-03-28&to=2023-01-05&type=c) |

