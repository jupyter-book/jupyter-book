---
title: myst-theme myst-to-react@1.1.0
date: 2026-01-21
url: /release/myst-to-react-1.1.0
repository: myst-theme
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/myst-theme/releases/tag/myst-to-react%401.1.0>`

This introduces several UI/UX improvements and adds extra functionality for GitHub issue hover previews.

## Enhancements made

- Link styles are now standardized so that internal/external/hover behavior is consistent. [#757](https://github.com/jupyter-book/myst-theme/pull/757) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@bsipocz`](https://github.com/bsipocz), [`@stefanv`](https://github.com/stefanv))
- We now have preview icons for github issues that include all github issue and PR states [#747](https://github.com/jupyter-book/myst-theme/pull/747) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@bsipocz`](https://github.com/bsipocz))
- Table of contents "collapse" buttons now fill the full area so they are easily clickable [#758](https://github.com/jupyter-book/myst-theme/pull/758) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77))
- Allow inline images to display in-line with the text instead of being big and blocky [#740](https://github.com/jupyter-book/myst-theme/pull/740) ([`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1))

## Bugs fixed

- Update inline image rules [#762](https://github.com/jupyter-book/myst-theme/pull/762) ([`@choldgraf`](https://github.com/choldgraf))
- Make table cells match table headers [#759](https://github.com/jupyter-book/myst-theme/pull/759) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@bsipocz`](https://github.com/bsipocz), [`@stefanv`](https://github.com/stefanv))
- Fix internal site footer links and standardize logic for internal vs. external URLs [#753](https://github.com/jupyter-book/myst-theme/pull/753) ([`@brianhawthorne`](https://github.com/brianhawthorne), [`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv))
- Set correct ID in Jupyter components [#750](https://github.com/jupyter-book/myst-theme/pull/750) ([`@agoose77`](https://github.com/agoose77))

## Maintenance and upkeep improvements

- Remove docs changeset to fix error [#764](https://github.com/jupyter-book/myst-theme/pull/764) ([`@choldgraf`](https://github.com/choldgraf))
- Fix passing git tag to release action [#739](https://github.com/jupyter-book/myst-theme/pull/739) ([`@choldgraf`](https://github.com/choldgraf))
- :mag: Add MyST search types to `providers` package deps [#732](https://github.com/jupyter-book/myst-theme/pull/732) ([`@agoose77`](https://github.com/agoose77), [`@rowanc1`](https://github.com/rowanc1))
- Use `npm ci` instead of `npm install` for themes [#719](https://github.com/jupyter-book/myst-theme/pull/719) ([`@stefanv`](https://github.com/stefanv), [`@agoose77`](https://github.com/agoose77), [`@rowanc1`](https://github.com/rowanc1), [`@stevejpurves`](https://github.com/stevejpurves))

## Documentation improvements

- Use UV for pip install in dev docs [#754](https://github.com/jupyter-book/myst-theme/pull/754) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77))
- Document location of tailwind CSS classes [#723](https://github.com/jupyter-book/myst-theme/pull/723) ([`@choldgraf`](https://github.com/choldgraf))

## Contributors to this release

The following people contributed discussions, new ideas, code and documentation contributions, and review.
See [our definition of contributors](https://github-activity.readthedocs.io/en/latest/use/#how-does-this-tool-define-contributions-in-the-reports).

([GitHub contributors page for this release](https://github.com/jupyter-book/myst-theme/graphs/contributors?from=2025-12-12&to=2026-01-21&type=c))

`@agoose77` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Aagoose77+updated%3A2025-12-12..2026-01-21&type=Issues)) | `@brianhawthorne` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Abrianhawthorne+updated%3A2025-12-12..2026-01-21&type=Issues)) | `@bsipocz` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Absipocz+updated%3A2025-12-12..2026-01-21&type=Issues)) | `@choldgraf` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Acholdgraf+updated%3A2025-12-12..2026-01-21&type=Issues)) | `@FreekPols` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3AFreekPols+updated%3A2025-12-12..2026-01-21&type=Issues)) | `@rowanc1` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Arowanc1+updated%3A2025-12-12..2026-01-21&type=Issues)) | `@stefanv` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Astefanv+updated%3A2025-12-12..2026-01-21&type=Issues)) | `@stevejpurves` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Astevejpurves+updated%3A2025-12-12..2026-01-21&type=Issues))

