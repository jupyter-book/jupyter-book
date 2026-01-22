---
title: mystmd@1.8.0
date: 2026-01-21
url: /release/mystmd-1.8.0
repository: mystmd
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/mystmd/releases/tag/mystmd%401.8.0>`


This brings in new functionality for execution concurrency, allowing you to control how many notebooks are executed in parallel during build in case you have notebooks that depend on one another or spin up their own parallel kernele. Also added a number of stability improvements and quality of life features.

## Enhancements made

- Allow users to define the number of simultaneous executions [#2428](https://github.com/jupyter-book/mystmd/pull/2428) ([`@agahkarakuzu`](https://github.com/agahkarakuzu), [`@agoose77`](https://github.com/agoose77), [`@bsipocz`](https://github.com/bsipocz), [`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv))
- Add CLI to generate ReadTheDocs configuration via `myst init --readthedocs` [#2555](https://github.com/jupyter-book/mystmd/pull/2555) ([`@jtpio`](https://github.com/jtpio), [`@choldgraf`](https://github.com/choldgraf), [`@mfisher87`](https://github.com/mfisher87))
- Allow the API URL to be configured with an environment variable [#2554](https://github.com/jupyter-book/mystmd/pull/2554) ([`@parmentelat`](https://github.com/parmentelat), [`@agoose77`](https://github.com/agoose77))
- 🔐 Use `npm ci` instead of `npm install` for theme dependencies [#2487](https://github.com/jupyter-book/mystmd/pull/2487) ([`@stefanv`](https://github.com/stefanv), [`@agoose77`](https://github.com/agoose77), [`@mfisher87`](https://github.com/mfisher87), [`@stevejpurves`](https://github.com/stevejpurves))
- Update `@preview/subpar` for subfigures in typst export [#2624](https://github.com/jupyter-book/mystmd/pull/2624) ([`@jan`-david-fischbach](https://github.com/jan-david-fischbach), [`@rowanc1`](https://github.com/rowanc1))

## Bugs fixed

- Define `edit_url` as page and project frontmatter [#2650](https://github.com/jupyter-book/mystmd/pull/2650) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@rowanc1`](https://github.com/rowanc1), [`@stefanv`](https://github.com/stefanv))
- Improve edit URL branch logic [#2642](https://github.com/jupyter-book/mystmd/pull/2642) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@rowanc1`](https://github.com/rowanc1), [`@stefanv`](https://github.com/stefanv))
- β Remove 'ß' mapping from utils [#2639](https://github.com/jupyter-book/mystmd/pull/2639) ([`@rowanc1`](https://github.com/rowanc1), [`@choldgraf`](https://github.com/choldgraf))
- Allow TOC to set short_title [#2636](https://github.com/jupyter-book/mystmd/pull/2636) ([`@choldgraf`](https://github.com/choldgraf), [`@bsipocz`](https://github.com/bsipocz), [`@stefanv`](https://github.com/stefanv))
- FIX: formatting in developer.md for mermaid diagram [#2619](https://github.com/jupyter-book/mystmd/pull/2619) ([`@jan`-david-fischbach](https://github.com/jan-david-fischbach), [`@rowanc1`](https://github.com/rowanc1))
- Add support for parsing decimal numbers in si role [#2600](https://github.com/jupyter-book/mystmd/pull/2600) ([`@jan`-david-fischbach](https://github.com/jan-david-fischbach), [`@rowanc1`](https://github.com/rowanc1))
- Fix empty button role [#2557](https://github.com/jupyter-book/mystmd/pull/2557) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@stefanv`](https://github.com/stefanv))

## Maintenance and upkeep improvements

- Add repository information for myst-transforms [#2664](https://github.com/jupyter-book/mystmd/pull/2664) ([`@choldgraf`](https://github.com/choldgraf))
- Revert "🚀 Release" [#2663](https://github.com/jupyter-book/mystmd/pull/2663) ([`@choldgraf`](https://github.com/choldgraf))
- ⛘ Bring `myst-spec` into monorepo for further development [#2584](https://github.com/jupyter-book/mystmd/pull/2584) ([`@rowanc1`](https://github.com/rowanc1), [`@Carreau`](https://github.com/Carreau), [`@aktech`](https://github.com/aktech), [`@boisgera`](https://github.com/boisgera), [`@choldgraf`](https://github.com/choldgraf), [`@chrisjsewell`](https://github.com/chrisjsewell), [`@fwkoch`](https://github.com/fwkoch), [`@sglyon`](https://github.com/sglyon))

## Documentation improvements

- Add pointer to MEP repo. [#2588](https://github.com/jupyter-book/mystmd/pull/2588) ([`@ryanlovett`](https://github.com/ryanlovett), [`@agoose77`](https://github.com/agoose77))
- Add citation markdown formatting info to simple referencing with DOI Link [#2651](https://github.com/jupyter-book/mystmd/pull/2651) ([`@TimMonko`](https://github.com/TimMonko), [`@choldgraf`](https://github.com/choldgraf))
- Minor spelling fix [#2645](https://github.com/jupyter-book/mystmd/pull/2645) ([`@tylere`](https://github.com/tylere), [`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv))
- 📖 Clarify that subtitle is also available in project configuration [#2633](https://github.com/jupyter-book/mystmd/pull/2633) ([`@lucafrance`](https://github.com/lucafrance), [`@rowanc1`](https://github.com/rowanc1))
- Fix link [#2632](https://github.com/jupyter-book/mystmd/pull/2632) ([`@lucafrance`](https://github.com/lucafrance), [`@agoose77`](https://github.com/agoose77))
- an extra 'The file' forgotten at the end of line [#2611](https://github.com/jupyter-book/mystmd/pull/2611) ([`@parmentelat`](https://github.com/parmentelat), [`@agoose77`](https://github.com/agoose77))
- docs: update primary sidebar footer [#2604](https://github.com/jupyter-book/mystmd/pull/2604) ([`@jnywong`](https://github.com/jnywong), [`@choldgraf`](https://github.com/choldgraf))
- Clarify download documentation [#2597](https://github.com/jupyter-book/mystmd/pull/2597) ([`@choldgraf`](https://github.com/choldgraf))
- DOC: removing deprecated frontmatter from docs [#2596](https://github.com/jupyter-book/mystmd/pull/2596) ([`@bsipocz`](https://github.com/bsipocz), [`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf))
- fix typo in documentation of `options` [#2587](https://github.com/jupyter-book/mystmd/pull/2587) ([`@brownsarahm`](https://github.com/brownsarahm), [`@rowanc1`](https://github.com/rowanc1))
- Add a description of the theme server contract [#2566](https://github.com/jupyter-book/mystmd/pull/2566) ([`@akhmerov`](https://github.com/akhmerov), [`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1))
- revisited doc on table of contents [#2522](https://github.com/jupyter-book/mystmd/pull/2522) ([`@parmentelat`](https://github.com/parmentelat), [`@bsipocz`](https://github.com/bsipocz), [`@choldgraf`](https://github.com/choldgraf))
- Update documentation on extends [#2362](https://github.com/jupyter-book/mystmd/pull/2362) ([`@FreekPols`](https://github.com/FreekPols), [`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv))

## Other merged PRs

- 🚀 Release [#2665](https://github.com/jupyter-book/mystmd/pull/2665) ([`@choldgraf`](https://github.com/choldgraf))
- 🚀 Release [#2590](https://github.com/jupyter-book/mystmd/pull/2590) ([`@choldgraf`](https://github.com/choldgraf))

## Contributors to this release

The following people contributed discussions, new ideas, code and documentation contributions, and review.
See [our definition of contributors](https://github-activity.readthedocs.io/en/latest/use/#how-does-this-tool-define-contributions-in-the-reports).

([GitHub contributors page for this release](https://github.com/jupyter-book/mystmd/graphs/contributors?from=2025-12-10&to=2026-01-21&type=c))

`@agahkarakuzu` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aagahkarakuzu+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@agoose77` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aagoose77+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@akhmerov` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aakhmerov+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@aktech` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aaktech+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@boisgera` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aboisgera+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@brownsarahm` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Abrownsarahm+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@bsipocz` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Absipocz+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@Carreau` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3ACarreau+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@choldgraf` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Acholdgraf+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@chrisjsewell` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Achrisjsewell+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@FreekPols` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3AFreekPols+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@fwkoch` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Afwkoch+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@jan`-david-fischbach ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Ajan-david-fischbach+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@JimMadge` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3AJimMadge+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@jnywong` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Ajnywong+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@jtpio` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Ajtpio+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@lucafrance` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Alucafrance+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@mfisher87` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Amfisher87+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@parmentelat` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aparmentelat+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@rowanc1` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Arowanc1+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@ryanlovett` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aryanlovett+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@sglyon` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Asglyon+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@stefanv` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astefanv+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@stevejpurves` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astevejpurves+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@TimMonko` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3ATimMonko+updated%3A2025-12-10..2026-01-21&type=Issues)) | `@tylere` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Atylere+updated%3A2025-12-10..2026-01-21&type=Issues))


