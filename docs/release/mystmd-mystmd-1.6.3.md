---
title: mystmd@1.6.3
date: 2025-10-10
url: /release/mystmd-1.6.3
repository: mystmd
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/mystmd/releases/tag/mystmd%401.6.3>`


([full changelog](https://github.com/jupyter-book/mystmd/compare/mystmd@1.6.2...4990d8c5cd5bf3c1528c5e3a063008b45e727925))

## Enhancements made

- 🔎 Set `HOST` environment variable to `127.0.0.1` on ReadTheDocs CI [#2313](https://github.com/jupyter-book/mystmd/pull/2313) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🧮 Allow `math` in numbering as an alias for `equation` [#2311](https://github.com/jupyter-book/mystmd/pull/2311) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))

## Bugs fixed

- 🐛 Include index page in `--strict` mode error checking [#2331](https://github.com/jupyter-book/mystmd/pull/2331) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot), [`@bsipocz`](https://github.com/bsipocz))
- ✍️ Improvements for typst exports [#2330](https://github.com/jupyter-book/mystmd/pull/2330) ([`@fwkoch`](https://github.com/fwkoch), [`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🤐 Show an error when the `myst.xref.json` fails to load [#2329](https://github.com/jupyter-book/mystmd/pull/2329) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🔑 Add `--keep-host` to `build` command [#2305](https://github.com/jupyter-book/mystmd/pull/2305) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))

## Maintenance and upkeep improvements

- 📦 tex-to-typst v0.0.18 [#2339](https://github.com/jupyter-book/mystmd/pull/2339) ([`@fwkoch`](https://github.com/fwkoch), [`@changeset`-bot](https://github.com/changeset-bot))
- 🏷️ Add autolabeler rules [#2326](https://github.com/jupyter-book/mystmd/pull/2326) ([`@agoose77`](https://github.com/agoose77), [`@changeset`-bot](https://github.com/changeset-bot), [`@bsipocz`](https://github.com/bsipocz))
- 📦 Updates to build packages (typescript, esbuild, vite, nanoid) [#2314](https://github.com/jupyter-book/mystmd/pull/2314) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 📦 Update `@jupyterlab/services` lockfile pin [#2297](https://github.com/jupyter-book/mystmd/pull/2297) ([`@agoose77`](https://github.com/agoose77), [`@rowanc1`](https://github.com/rowanc1), [`@bsipocz`](https://github.com/bsipocz), [`@changeset`-bot](https://github.com/changeset-bot))
- :wrench: Refactorings to clean up table-of-contents transform [#2181](https://github.com/jupyter-book/mystmd/pull/2181) ([`@brianhawthorne`](https://github.com/brianhawthorne), [`@fwkoch`](https://github.com/fwkoch), [`@changeset`-bot](https://github.com/changeset-bot))

## Documentation improvements

- 📖 xref directives syntax on directives list page [#2337](https://github.com/jupyter-book/mystmd/pull/2337) ([`@bsipocz`](https://github.com/bsipocz), [`@fwkoch`](https://github.com/fwkoch), [`@changeset`-bot](https://github.com/changeset-bot))
- 📖 Adding xref error rules in cli docs [#2335](https://github.com/jupyter-book/mystmd/pull/2335) ([`@bsipocz`](https://github.com/bsipocz), [`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🔗 Ignore patterns for links [#2334](https://github.com/jupyter-book/mystmd/pull/2334) ([`@rowanc1`](https://github.com/rowanc1), [`@fwkoch`](https://github.com/fwkoch), [`@changeset`-bot](https://github.com/changeset-bot))
- 📖 Add default severity for `RuleIds` to the docs [#2333](https://github.com/jupyter-book/mystmd/pull/2333) ([`@rowanc1`](https://github.com/rowanc1), [`@fwkoch`](https://github.com/fwkoch), [`@bsipocz`](https://github.com/bsipocz), [`@changeset`-bot](https://github.com/changeset-bot))
- 📖 Document error rules [#2332](https://github.com/jupyter-book/mystmd/pull/2332) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🗓️ Add quotes for dates [#2324](https://github.com/jupyter-book/mystmd/pull/2324) ([`@bsipocz`](https://github.com/bsipocz), [`@agoose77`](https://github.com/agoose77), [`@changeset`-bot](https://github.com/changeset-bot))

## Other merged PRs

- 🚀 Release [#2306](https://github.com/jupyter-book/mystmd/pull/2306) ([`@fwkoch`](https://github.com/fwkoch))
- 🚀 Release [#2280](https://github.com/jupyter-book/mystmd/pull/2280) ([`@fwkoch`](https://github.com/fwkoch))

## Contributors to this release

The following people contributed discussions, new ideas, code and documentation contributions, and review.
See [our definition of contributors](https://github-activity.readthedocs.io/en/latest/#how-does-this-tool-define-contributions-in-the-reports).

([GitHub contributors page for this release](https://github.com/jupyter-book/mystmd/graphs/contributors?from=2025-09-28&to=2025-10-10&type=c))

`@agoose77` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aagoose77+updated%3A2025-09-28..2025-10-10&type=Issues)) | `@brianhawthorne` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Abrianhawthorne+updated%3A2025-09-28..2025-10-10&type=Issues)) | `@bsipocz` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Absipocz+updated%3A2025-09-28..2025-10-10&type=Issues)) | `@changeset`-bot ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Achangeset-bot+updated%3A2025-09-28..2025-10-10&type=Issues)) | `@fwkoch` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Afwkoch+updated%3A2025-09-28..2025-10-10&type=Issues)) | `@JimMadge` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3AJimMadge+updated%3A2025-09-28..2025-10-10&type=Issues)) | `@rowanc1` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Arowanc1+updated%3A2025-09-28..2025-10-10&type=Issues)) | `@stefanv` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astefanv+updated%3A2025-09-28..2025-10-10&type=Issues)) | `@stevejpurves` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astevejpurves+updated%3A2025-09-28..2025-10-10&type=Issues))


