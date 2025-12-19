---
title: mystmd v0.1.18
date: 2023-03-14
url: /release/myst-cli-0.1.18
repository: mystmd
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/mystmd/releases/tag/myst-cli%400.1.18>`

## New Packages

We have introduced a new package to export and write MyST Markdown, which is an important part of import and export workflows (e.g. working with latex, or modifying an AST in MyST).

* ✨ New package: myst-to-md by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/303

## New Features

* ♻️ Prevent rebuild loop by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/286
* ⌨️ Add code-cell directive by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/289
* 🌠 Support TIFF images by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/285

## LaTeX Improvements

* 🐛 Resolution & rendering of citations by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/264
* 🐛 Project frontmatter is now respected with tex files by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/263
* #️⃣ unstar sections when numbering=true by `@stevejpurves` in https://github.com/executablebooks/mystjs/pull/195
* Small tex-to-myst updates by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/273
* 🦶Improve footnote whitespace and warnings in myst-to-tex by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/277

## Bug Fixes

* 🐛 Load an undefined YAML frontmatter by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/279

## Documentation Improvements

* 📖 Add updating note in quickstart installation guide by `@kolibril13` in https://github.com/executablebooks/mystjs/pull/288
* 📖 Fix typo in "marcos" by `@agoose77` in https://github.com/executablebooks/mystjs/pull/292
* 📖 Remove code-numbering warnings by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/262
* 📖 Remove dollarmath labels and add warning about spec by `@agoose77` in https://github.com/executablebooks/mystjs/pull/291

## New Contributors
* `@stevejpurves` made their first contribution in https://github.com/executablebooks/mystjs/pull/195
* `@agoose77` made their first contribution in https://github.com/executablebooks/mystjs/pull/291

**Full Changelog**: https://github.com/executablebooks/mystjs/compare/myst-cli@0.1.17...myst-cli@0.1.18
