---
title: mystmd@1.6.5
date: 2025-11-18
url: /release/mystmd-1.6.5
repository: mystmd
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/mystmd/releases/tag/mystmd%401.6.5>`

([full changelog](https://github.com/jupyter-book/mystmd/compare/mystmd@1.6.4...10f8fe5451aaceed9a76055620ed4b3165329365))

## Enhancements made

- 🖼️ Add support for iframe title. [#2437](https://github.com/jupyter-book/mystmd/pull/2437) ([`@ryanlovett`](https://github.com/ryanlovett), [`@agoose77`](https://github.com/agoose77), [`@stefanv`](https://github.com/stefanv), [`@stevejpurves`](https://github.com/stevejpurves), [`@choldgraf`](https://github.com/choldgraf))
- 🧪 Add `mhchem` extension [#2418](https://github.com/jupyter-book/mystmd/pull/2418) ([`@rowanc1`](https://github.com/rowanc1), [`@agoose77`](https://github.com/agoose77))
- 🚢 Enable `port` option for the builder [#2409](https://github.com/jupyter-book/mystmd/pull/2409) ([`@agahkarakuzu`](https://github.com/agahkarakuzu), [`@fwkoch`](https://github.com/fwkoch))
- 🪧  Add message for using Jupyter Book < 1 to upgrade [#2390](https://github.com/jupyter-book/mystmd/pull/2390) ([`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1))
- ✊ Add environment dependence for cache keys (etc.) to `myst build --execute` [#2387](https://github.com/jupyter-book/mystmd/pull/2387) ([`@agoose77`](https://github.com/agoose77), [`@bsipocz`](https://github.com/bsipocz), [`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1))

## Bugs fixed

- 🔠 Always set term label from `{term}` [#2346](https://github.com/jupyter-book/mystmd/pull/2346) ([`@agoose77`](https://github.com/agoose77), [`@fwkoch`](https://github.com/fwkoch), [`@rowanc1`](https://github.com/rowanc1))

## Maintenance and upkeep improvements

- 🤖 Stop over-eager documentation labeling [#2417](https://github.com/jupyter-book/mystmd/pull/2417) ([`@fwkoch`](https://github.com/fwkoch), [`@stefanv`](https://github.com/stefanv))
- 🧪 Add node 24 to ci testing [#2410](https://github.com/jupyter-book/mystmd/pull/2410) ([`@fwkoch`](https://github.com/fwkoch), [`@agoose77`](https://github.com/agoose77))

## Documentation improvements

- 📚 Adjust external xref docs [#2412](https://github.com/jupyter-book/mystmd/pull/2412) ([`@fwkoch`](https://github.com/fwkoch), [`@agoose77`](https://github.com/agoose77))
- Update the plugins admonition to be a little more nuanced [#2403](https://github.com/jupyter-book/mystmd/pull/2403) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77))
- 📖 Add a link to the numbered citations [#2402](https://github.com/jupyter-book/mystmd/pull/2402) ([`@rowanc1`](https://github.com/rowanc1), [`@matthewfeickert`](https://github.com/matthewfeickert))
- Doc exec build improved [#2396](https://github.com/jupyter-book/mystmd/pull/2396) ([`@parmentelat`](https://github.com/parmentelat), [`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv))
- :blue_book: Document static theme development [#2309](https://github.com/jupyter-book/mystmd/pull/2309) ([`@brianhawthorne`](https://github.com/brianhawthorne), [`@stefanv`](https://github.com/stefanv), [`@choldgraf`](https://github.com/choldgraf))
- Make settings configuration more discoverable [#2237](https://github.com/jupyter-book/mystmd/pull/2237) ([`@choldgraf`](https://github.com/choldgraf), [`@bsipocz`](https://github.com/bsipocz), [`@agoose77`](https://github.com/agoose77))

## Contributors to this release

The following people contributed discussions, new ideas, code and documentation contributions, and review.
See [our definition of contributors](https://github-activity.readthedocs.io/en/latest/#how-does-this-tool-define-contributions-in-the-reports).

([GitHub contributors page for this release](https://github.com/jupyter-book/mystmd/graphs/contributors?from=2025-11-03&to=2025-11-18&type=c))

`@agahkarakuzu` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aagahkarakuzu+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@agoose77` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aagoose77+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@akhmerov` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aakhmerov+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@brianhawthorne` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Abrianhawthorne+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@bsipocz` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Absipocz+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@choldgraf` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Acholdgraf+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@fwkoch` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Afwkoch+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@matthewfeickert` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Amatthewfeickert+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@Montanajim` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3AMontanajim+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@parmentelat` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aparmentelat+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@rowanc1` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Arowanc1+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@ryanlovett` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aryanlovett+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@stefanv` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astefanv+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@stevejpurves` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astevejpurves+updated%3A2025-11-03..2025-11-18&type=Issues)) | `@yshavit` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Ayshavit+updated%3A2025-11-03..2025-11-18&type=Issues))

