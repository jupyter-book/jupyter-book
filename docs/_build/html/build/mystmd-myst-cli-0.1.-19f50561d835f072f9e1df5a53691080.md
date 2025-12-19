---
title: mystmd v0.1.15
date: 2023-02-18
url: /release/myst-cli-0.1.15
repository: mystmd
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/mystmd/releases/tag/myst-cli%400.1.15>`

## Overview

Help us [spread the word 🐦](https://twitter.com/myst_tools/status/1627070081300860936).

There were improvements to role/directive parsing in https://github.com/executablebooks/mystjs/issues/181, this resulted in many new packages that can be used independently in other contexts such as the theme or [jupyterlab-myst](https://github.com/executablebooks/jupyterlab-myst).
The API and links were migrated to `myst-tools.org` domain for API requests, our new domain!
There were improvements for compatibility for admonitions that now parse callouts in Quarto, GitHub, and MyST.
You can now embed notebook cells directly into your document, see the [documentation](https://myst-tools.org/docs/mystjs/cross-references#targeting-cells).

There were improvements to the docs -- thank you to `@kolibril13` and `@Carreau` who made their first commits.

MyST can now read LaTeX, and parsing was improved wit features to support other types of images (PDF, EPS).

## New Features

* 📤 Support embedded cross references and output images/text in file exports by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/154
* 🛏 Embed notebook cells in a page by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/143
* ❤️ Improve admonitions to support GitHub and Quarto by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/229

## New Packages

We have introduced new extensions for cards, grids and tabs.

- `myst-ext-card`: Card directives
- `myst-ext-grid`: Grid directives
- `myst-ext-tabs`: Tab directives

Commits:
* 📦 Pull tab/grid/card directives into external packages by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/179


We have pulled out the roles and directives into their own packages. See https://github.com/executablebooks/mystjs/issues/181.

- `markdown-it-myst` markdown-it plugin to handle tokenizing roles and directives.
- `myst-directives` core directives for MyST
- `myst-roles` core roles for MyST
- `myst-parser` converts markdown-it token stream to mdast
- `myst-to-html` convert MyST to HTML

Commits:
* 💥 Role / Directive Refactor by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/184

## Documentation Improvements

* 📖 Document JATS exports by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/109
* 📖 Improve the quickstart tutorials by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/152
* 📖 Fix readme example, mystjs undefined use MyST directly. by `@Carreau` in https://github.com/executablebooks/mystjs/pull/159
* 📖 Improve logging of LaTeX error messages by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/165
* 📖 Issue templates for `.github` by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/171
* 📖 Improve onboarding documentation by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/214
* 📖 Improve quickstart with warnings by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/218
* 📖 🗂 Document tab behavior by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/132
* 📖 Overhaul Docs and many details by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/146
* 📖 📚 Document notebook cell labels and separate site/project configs by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/177
* 📖 🔗 Update domain to myst-tools for all links. by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/182
* 📖 Small tweaks in the quickstart guide by `@kolibril13` in https://github.com/executablebooks/mystjs/pull/215

## New LaTeX Parsing and Features

See the [blog post by Curvenote](https://curvenote.com/blog/how-to-use-latex-with-myst-markdown).

> The entire LaTeX rendering process can run in a few hundred milliseconds from start to finish rather than around 3-10 
> seconds for small documents using common LaTeX renderers. The paper I was testing on during this blog post is
> ⚡️ 16 times faster ⚡️ - which is significant, and there is lots of room for improvement in MyST as well!

* ⚡️ Introduce a latex parser/converter by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/110
* ⚡️ Improve latex parsing by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/117
* 🎆 Use unix path for images in latex by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/125
* 📄 Render include node children during tex/docx export by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/163
* 🎇 Support for PDF images by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/173
* 🎆 Update image conversion transform to handle EPS images by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/228

## Usability improvements

* 🌎 Publish source file and exports by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/112
* 📑 Define exports as a single string by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/148
* 📤 Implicitly initialize project to resolve single file export cross references by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/167
* 💥 Reload project on toc change, new bib files by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/175
* 🔄 Reload project on all created/deleted files during watch by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/186
* 📤 Get text output working in exports by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/176
* 💬 Add comment to default html-to-mdast handlers by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/205
* 🆕 Add mystToHtml as a simple wrapper function by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/234
* 🤺 Do not parse nested colon fence as directive option by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/227
* ◻️ Allow whitespace around role name inside brackets by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/233

## Refactoring

* 🔀 Move References/Footnotes/Citations types to myst-common by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/108
* 🔄 Move template enums from myst-templates to myst-common by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/111
* 🔄 Improve myst-frontmatter by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/119
* 📗 Update notebook handling to use new nbtx by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/133

## Bug Fixes

* 🐛 Path replacement on windows for logging by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/116
* 🐛 LaTeX: Capture framed environment by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/123
* 🐛 Shell output capture for windows by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/124
* 🐛 Target propagations after lifting `mystDirective`s by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/136
* 🐛 Catch and mute spurious warnings by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/145
* 🐛 Change reloadConfigs --> reload by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/147
* 🐛 Show yaml errors for jtex and allow `myst: v1` by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/151
* 🐛 Validate subtitle & short_title on project/site by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/174
* 🐛 Fix packaging for downstream theme components by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/178
* 🐛 Delete children rather than set to undefined by `@rowanc1` in https://github.com/executablebooks/mystjs/pull/232
* 🐛 Fix/whitespace option by `@fwkoch` in https://github.com/executablebooks/mystjs/pull/226

## New Contributors
* `@Carreau` made their first contribution in https://github.com/executablebooks/mystjs/pull/159
* `@kolibril13` made their first contribution in https://github.com/executablebooks/mystjs/pull/215

**Full Changelog**: https://github.com/executablebooks/mystjs/commits/myst-cli@0.1.15
