---
title: jupyter-book v0.13
date: 2022-06-03
url: /release/v0.13
repository: jupyter-book
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/jupyter-book/releases/tag/v0.13>`

This release contains some major UI and visual style upgrades for HTML output, and introduces some breaking changes in a few directives and in the structure of the HTML. See below for major changes.

### New and Breaking ‼

1. [#1442 Use Sphinx Design instead of Sphinx Panels](https://github.com/executablebooks/jupyter-book/pull/1442). We have migrated from [sphinx-panels](https://github.com/executablebooks/sphinx-panels) to [sphinx-design](https://github.com/executablebooks/sphinx-design), as `sphinx-panels` is no longer actively maintained. This also brings in several improvements to the same component functionality that was in sphinx-panels. See [the components documentation](https://jupyterbook.org/en/latest/content/components.html) for more information on upgrades and usage.
2. [#1679 Update Sphinx Book Theme to v0.3](https://github.com/executablebooks/jupyter-book/pull/1679). This brings in several major upgrades to the theme's behavior and structure. It significantly changes the structure of the output HTML (in particular, the sidebars and article header), so if you defined custom CSS rules, double-check that they still apply correctly.

   See [the Book Theme release notes](https://github.com/executablebooks/sphinx-book-theme/releases/tag/v0.3.0) as well as [the Book Theme changelog](https://github.com/executablebooks/sphinx-book-theme/blob/master/CHANGELOG.md#v030---2022-03-25) for more information.
3. [#1693 Removes support for `sphinx<=4`](https://github.com/executablebooks/jupyter-book/pull/1693). This will likely only be applicable to you if you were explicitly pinning Sphinx to a version less than 4.

