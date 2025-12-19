---
title: mystmd v1.4.0
date: 2025-06-13
url: /release/mystmd-1.4.0
repository: mystmd
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/mystmd/releases/tag/mystmd%401.4.0>`

([full changelog](https://github.com/jupyter-book/mystmd/compare/mystmd@1.3.26...mystmd@1.4.0))

## Enhancements made
- 💬 Add social media project frontmatter [#2021](https://github.com/jupyter-book/mystmd/pull/2021) ([`@kne42`](https://github.com/kne42), [`@agoose77`](https://github.com/agoose77), [`@fwkoch`](https://github.com/fwkoch), [`@rowanc1`](https://github.com/rowanc1), [`@choldgraf`](https://github.com/choldgraf), [`@artoftheblue`](https://github.com/artoftheblue))
- Complete ipynb export support [#1915](https://github.com/jupyter-book/mystmd/pull/1915) ([`@kp992`](https://github.com/kp992), [`@agoose77`](https://github.com/agoose77))
- 🧮 Improve `emphasize-lines` to allow for ranges [#2048](https://github.com/jupyter-book/mystmd/pull/2048) ([`@rowanc1`](https://github.com/rowanc1))
- 🔄 Change default LaTeX template to `plain_latex` [#2037](https://github.com/jupyter-book/mystmd/pull/2037) ([`@agoose77`](https://github.com/agoose77))
- ⚠️ Improve error messages for `myst templates download` command [#2034](https://github.com/jupyter-book/mystmd/pull/2034) ([`@agoose77`](https://github.com/agoose77), [`@roaldarbol`](https://github.com/roaldarbol))
- Remove extra error block [#2011](https://github.com/jupyter-book/mystmd/pull/2011) ([`@stefanv`](https://github.com/stefanv), [`@choldgraf`](https://github.com/choldgraf))
- 🕵️‍♀️ Expose hidden attribute in TOC nodes [#1993](https://github.com/jupyter-book/mystmd/pull/1993) ([`@parmentelat`](https://github.com/parmentelat), [`@fwkoch`](https://github.com/fwkoch))


## Bugs fixed

- 🔌 Load plugins earlier, before parsing frontmatter parts [#2093](https://github.com/jupyter-book/mystmd/pull/2093) ([`@fwkoch`](https://github.com/fwkoch), [`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv), [`@agoose77`](https://github.com/agoose77))
- 🔍 Do not treat wiki permalinks as wiki-links for now [#1959](https://github.com/jupyter-book/mystmd/pull/1959) ([`@agoose77`](https://github.com/agoose77), [`@rowanc1`](https://github.com/rowanc1))
- 🐌 Fix slug handling for MyST projects using a ToC [#2045](https://github.com/jupyter-book/mystmd/pull/2045) ([`@agoose77`](https://github.com/agoose77), [`@rowanc1`](https://github.com/rowanc1))

## Documentation improvements

- ⌨️ Documentation spelling and example improvements [#2083](https://github.com/jupyter-book/mystmd/pull/2083) ([`@artoftheblue`](https://github.com/artoftheblue), [`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf))
- 📄 Document footer usage [#2081](https://github.com/jupyter-book/mystmd/pull/2081) ([`@stefanv`](https://github.com/stefanv), [`@choldgraf`](https://github.com/choldgraf))
- Add inline expressions links [#2076](https://github.com/jupyter-book/mystmd/pull/2076) ([`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1))
- Add a dedicated authorship and affiliations section [#2050](https://github.com/jupyter-book/mystmd/pull/2050) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@rowanc1`](https://github.com/rowanc1))
- ⚠️ Remove docs warning on legacy link syntax [#2047](https://github.com/jupyter-book/mystmd/pull/2047) ([`@rowanc1`](https://github.com/rowanc1), [`@choldgraf`](https://github.com/choldgraf))
- Document the launch button functionality [#2046](https://github.com/jupyter-book/mystmd/pull/2046) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77))
- 🧹 Move CONTRIBUTING.md contents to docs [#2040](https://github.com/jupyter-book/mystmd/pull/2040) ([`@agoose77`](https://github.com/agoose77))
- Quick guide to making documentation edits in-browser for our contributor guide [#2030](https://github.com/jupyter-book/mystmd/pull/2030) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77))
- Document CORS tip [#2026](https://github.com/jupyter-book/mystmd/pull/2026) ([`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1))
- Document site.folders option [#2025](https://github.com/jupyter-book/mystmd/pull/2025) ([`@FernandoBasso`](https://github.com/FernandoBasso), [`@choldgraf`](https://github.com/choldgraf))
-  Update links to example of landing pages [#2016](https://github.com/jupyter-book/mystmd/pull/2016) ([`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1))
- Explain more MyST concepts, developer docs, and export docs [#2012](https://github.com/jupyter-book/mystmd/pull/2012) ([`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv), [`@rowanc1`](https://github.com/rowanc1))
- Fix typo in md-vs-ipynb.md [#2010](https://github.com/jupyter-book/mystmd/pull/2010) ([`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1))
- Document how to put content in the right sidebar area [#2004](https://github.com/jupyter-book/mystmd/pull/2004) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77))
- 📖 Update documentation on docs contributions [#1999](https://github.com/jupyter-book/mystmd/pull/1999) ([`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1))
- 📖 Document light dark elements with CSS classes [#1998](https://github.com/jupyter-book/mystmd/pull/1998) ([`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1))
- 📖 Add guidelines for publishing a release to GitHub [#1997](https://github.com/jupyter-book/mystmd/pull/1997) ([`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1))
- Update documentation about our documentation infrastructure at mystmd.org [#1958](https://github.com/jupyter-book/mystmd/pull/1958) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@rowanc1`](https://github.com/rowanc1), [`@stefanv`](https://github.com/stefanv), [`@fperez`](https://github.com/fperez))


## Maintenance and upkeep improvements

- 📦 Bump turbo repo [#2091](https://github.com/jupyter-book/mystmd/pull/2091) ([`@fwkoch`](https://github.com/fwkoch), [`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77))
- 🤖 Add required label workflow [#2053](https://github.com/jupyter-book/mystmd/pull/2053) ([`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf))
- 🤖 Deploy Docs in CI [#2087](https://github.com/jupyter-book/mystmd/pull/2087) ([`@rowanc1`](https://github.com/rowanc1), [`@choldgraf`](https://github.com/choldgraf))
- ❄️ Update dev flake inputs [#2039](https://github.com/jupyter-book/mystmd/pull/2039) ([`@agoose77`](https://github.com/agoose77))
- ✅ Add husky and lint-staged to help devs fix code before pushing [#1919](https://github.com/jupyter-book/mystmd/pull/1919) ([`@stefanv`](https://github.com/stefanv), [`@choldgraf`](https://github.com/choldgraf), [`@fwkoch`](https://github.com/fwkoch), [`@agoose77`](https://github.com/agoose77))

## Other merged PRs

- 📦 Bump tex-to-typst@0.0.16 [#2023](https://github.com/jupyter-book/mystmd/pull/2023) ([`@fwkoch`](https://github.com/fwkoch), [`@rowanc1`](https://github.com/rowanc1), [`@choldgraf`](https://github.com/choldgraf))

## Contributors to this release

The following people contributed discussions, new ideas, code and documentation contributions, and review.
See [our definition of contributors](https://github-activity.readthedocs.io/en/latest/#how-does-this-tool-define-contributions-in-the-reports).

([GitHub contributors page for this release](https://github.com/jupyter-book/mystmd/graphs/contributors?from=2025-04-29&to=2025-06-11&type=c))

`@agoose77` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aagoose77+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@artoftheblue` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aartoftheblue+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@choldgraf` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Acholdgraf+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@da5nsy` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Ada5nsy+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@FernandoBasso` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3AFernandoBasso+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@fperez` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Afperez+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@FreekPols` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3AFreekPols+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@fwkoch` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Afwkoch+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@kne42` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Akne42+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@kp992` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Akp992+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@michaelaye` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Amichaelaye+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@parmentelat` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aparmentelat+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@roaldarbol` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aroaldarbol+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@rowanc1` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Arowanc1+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@stefanv` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astefanv+updated%3A2025-04-29..2025-06-11&type=Issues)) | `@stevejpurves` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astevejpurves+updated%3A2025-04-29..2025-06-11&type=Issues))

