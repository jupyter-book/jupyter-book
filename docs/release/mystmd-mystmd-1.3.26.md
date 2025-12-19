---
title: mystmd v1.3.26
date: 2025-04-30
url: /release/mystmd-1.3.26
repository: mystmd
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/mystmd/releases/tag/mystmd%401.3.26>`

This release brings in major new functionality for extensibility with roles and directives, allowing you to pass classes and arguments to them. It also includes a number of enhancements, bugfixes, and documentation improvements as we prepare the MyST engine for use with [Jupyter Book 2](https://next.jupyterbook.org). See the features section for more details!

### Features

* 🧮 Add inline options to roles and directives by `@rowanc1` in https://github.com/jupyter-book/mystmd/pull/1822.
	- Adds support for inline attributes for both roles and directives, allowing concise specification of CSS classes, IDs, and attributes. This complements other methods for defining options, making markup more expressive and flexible. [👉 Read more here](https://mystmd.org/guide/inline-options)
* 🦋 Add bluesky social links by `@rowanc1` in https://github.com/jupyter-book/mystmd/pull/1987
  * Adds support for several more types of social links for content authors. [👉 Read more here](https://mystmd.org/guide/frontmatter#social-links)
* 🚀 Update the `SPEC_VERSION` for `block.class` by `@rowanc1` in https://github.com/jupyter-book/mystmd/pull/1895
* ⌨️ Add command line argument to `myst start` for selecting template by `@stefanv` in https://github.com/jupyter-book/mystmd/pull/1914
* 📦 Bump `nbtx` 0.4.0 by `@fwkoch` in https://github.com/jupyter-book/mystmd/pull/1897

### Fixes

* 🐝 Fix missing class in landing-pages by `@agoose77` in https://github.com/jupyter-book/mystmd/pull/1894
* 🐛 Ensure CSS has baseURL directly by `@rowanc1` in https://github.com/jupyter-book/mystmd/pull/1901
* ✍️ Escape backticks in `init --gh-pages` template by `@agoose77` in https://github.com/jupyter-book/mystmd/pull/1936
* 🏷️ Remove default label from `inlineExpression` node by `@agoose77` in https://github.com/jupyter-book/mystmd/pull/1943
* 🐛 Fix missing references in `docx` export by `@alanrice` in https://github.com/jupyter-book/mystmd/pull/1944
* 👨🏻‍🔧 fix check link transform for cards by `@stevejpurves` in https://github.com/jupyter-book/mystmd/pull/1945
* ; Semicolon escape in typst by `@rowanc1` in https://github.com/jupyter-book/mystmd/pull/1980
* 🐛 `--pdf` --> `--tex` by `@rowanc1` in https://github.com/jupyter-book/mystmd/pull/1995
* 🪄 Improve error handling during cross reference resolution by `@agoose77` in https://github.com/jupyter-book/mystmd/pull/1942
* 🔙 Move execution transform earlier in mdast pipeline by `@agoose77` in https://github.com/jupyter-book/mystmd/pull/1949
### Documentation

* 📚 Add a high-level overview of MyST components by `@choldgraf` in https://github.com/jupyter-book/mystmd/pull/1950
  * [Overview Documentation](https://mystmd.org/guide/overview)
* Add a brief guide to choosing between `.md` and `.ipynb` by `@choldgraf` in https://github.com/jupyter-book/mystmd/pull/1969
  * [MD vs IPYNB Documentation](https://mystmd.org/guide/md-vs-ipynb)
* Restructure developer guide and add architecture overview by `@stefanv` in https://github.com/jupyter-book/mystmd/pull/1906
  * [Developer Documentation](https://mystmd.org/guide/developer)
* DOCS: Clarify and cross-link code cell output suppression by `@choldgraf` in https://github.com/jupyter-book/mystmd/pull/1992
* 📦 Improve docs on PDF exports for downloads by `@agoose77` in https://github.com/jupyter-book/mystmd/pull/1966
  * [Website Downloads Documentation](https://mystmd.org/guide/website-downloads)
* 📚 Clarify BASE_URL instructions in GH action for custom domains. by `@fperez` in https://github.com/jupyter-book/mystmd/pull/1930
* Add footnote about links to md files not in ToC by `@JimMadge` in https://github.com/jupyter-book/mystmd/pull/1939
* Update the documentation on installing with Typst by `@choldgraf` in https://github.com/jupyter-book/mystmd/pull/1941
* 📖 Document how to export MyST Markdown by `@choldgraf` in https://github.com/jupyter-book/mystmd/pull/1955

### Maintenance

* 📝 Add missing changeset by `@agoose77` in https://github.com/jupyter-book/mystmd/pull/1938
* ✋ netlify: only rebuild docs when they were modified by `@stefanv` in https://github.com/jupyter-book/mystmd/pull/1951
* 🚀 Release by `@github`-actions in https://github.com/jupyter-book/mystmd/pull/1896



## New Contributors
* `@fperez` made their first contribution in https://github.com/jupyter-book/mystmd/pull/1930
* `@alanrice` made their first contribution in https://github.com/jupyter-book/mystmd/pull/1944

**Full Changelog**: https://github.com/jupyter-book/mystmd/compare/mystmd@1.3.25...mystmd@1.3.26
