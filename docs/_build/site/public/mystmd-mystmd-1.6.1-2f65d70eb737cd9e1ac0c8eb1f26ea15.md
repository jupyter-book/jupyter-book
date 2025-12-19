---
title: mystmd@1.6.1
date: 2025-09-08
url: /release/mystmd-1.6.1
repository: mystmd
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/mystmd/releases/tag/mystmd%401.6.1>`

([full changelog](https://github.com/jupyter-book/mystmd/compare/mystmd@1.6.0...c2e76f07f0b5629f1cb58f6dbeb4c20296afb100))

## Enhancements made

- 🐦 Change social link from Twitter to BlueSky [#2216](https://github.com/jupyter-book/mystmd/pull/2216) ([`@agoose77`](https://github.com/agoose77), [`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🚸 Take users directly to the GitHub editing interface when clicking "Edit this page" [#2138](https://github.com/jupyter-book/mystmd/pull/2138) ([`@mfisher87`](https://github.com/mfisher87), [`@fwkoch`](https://github.com/fwkoch), [`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot), [`@agoose77`](https://github.com/agoose77))

## Bugs fixed

- 🐛 Add Typst PDF to the MECA bundle [#2274](https://github.com/jupyter-book/mystmd/pull/2274) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🐛 List elements with `citeGroup`s as children [#2261](https://github.com/jupyter-book/mystmd/pull/2261) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🐛 List elements with `footnoteReference`s as children [#2256](https://github.com/jupyter-book/mystmd/pull/2256) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🐛 Typst option on inlineMath node [#2242](https://github.com/jupyter-book/mystmd/pull/2242) ([`@rowanc1`](https://github.com/rowanc1))
- 🐛 mdast lists need to be in paragraphs [#2241](https://github.com/jupyter-book/mystmd/pull/2241) ([`@rowanc1`](https://github.com/rowanc1), [`@fwkoch`](https://github.com/fwkoch), [`@changeset`-bot](https://github.com/changeset-bot), [`@agoose77`](https://github.com/agoose77))
- ↖️ Ensure `project` config loads before `site` [#2184](https://github.com/jupyter-book/mystmd/pull/2184) ([`@agoose77`](https://github.com/agoose77), [`@fwkoch`](https://github.com/fwkoch), [`@changeset`-bot](https://github.com/changeset-bot))

## Maintenance and upkeep improvements

- 🔄 Refactor admonition parsing to expose header function [#2244](https://github.com/jupyter-book/mystmd/pull/2244) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🔄 Refactor myst-parse to expose parsing options [#2243](https://github.com/jupyter-book/mystmd/pull/2243) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- Clean up title and fix tag name in CI/CD [#2193](https://github.com/jupyter-book/mystmd/pull/2193) ([`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- Attach release to pre-existing tag [#2191](https://github.com/jupyter-book/mystmd/pull/2191) ([`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- Add access token to github-activity action [#2190](https://github.com/jupyter-book/mystmd/pull/2190) ([`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv), [`@changeset`-bot](https://github.com/changeset-bot))
- Fix github-activity invocation in CI/CD [#2189](https://github.com/jupyter-book/mystmd/pull/2189) ([`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- Automate GitHub releases and notes in our ci/cd [#2188](https://github.com/jupyter-book/mystmd/pull/2188) ([`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv), [`@changeset`-bot](https://github.com/changeset-bot))

## Documentation improvements

- Add note about using KaTeX in default themes. [#2262](https://github.com/jupyter-book/mystmd/pull/2262) ([`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- 📖 Fix typo in frontmatter.md for CC-BY-NC-SA license [#2246](https://github.com/jupyter-book/mystmd/pull/2246) ([`@kevinlin1`](https://github.com/kevinlin1), [`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 📖 Typo in docs formatting [#2240](https://github.com/jupyter-book/mystmd/pull/2240) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 📖 Add pronunciation of MyST [#2238](https://github.com/jupyter-book/mystmd/pull/2238) ([`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1), [`@bsipocz`](https://github.com/bsipocz), [`@changeset`-bot](https://github.com/changeset-bot), [`@agoose77`](https://github.com/agoose77))
- 📖 Add documentation for running test suite [#2226](https://github.com/jupyter-book/mystmd/pull/2226) ([`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 📖 Swapping out python references to an up-to-date version [#2210](https://github.com/jupyter-book/mystmd/pull/2210) ([`@bsipocz`](https://github.com/bsipocz), [`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- DOC: Adding upgrade guide link [#2206](https://github.com/jupyter-book/mystmd/pull/2206) ([`@bsipocz`](https://github.com/bsipocz), [`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot), [`@rowanc1`](https://github.com/rowanc1))

## Other merged PRs

- Remove explicit target for tag [#2192](https://github.com/jupyter-book/mystmd/pull/2192) ([`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))

## Contributors to this release

The following people contributed discussions, new ideas, code and documentation contributions, and review.
See [our definition of contributors](https://github-activity.readthedocs.io/en/latest/#how-does-this-tool-define-contributions-in-the-reports).

([GitHub contributors page for this release](https://github.com/jupyter-book/mystmd/graphs/contributors?from=2025-07-21&to=2025-09-08&type=c))

`@agoose77` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aagoose77+updated%3A2025-07-21..2025-09-08&type=Issues)) | `@bsipocz` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Absipocz+updated%3A2025-07-21..2025-09-08&type=Issues)) | `@changeset`-bot ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Achangeset-bot+updated%3A2025-07-21..2025-09-08&type=Issues)) | `@choldgraf` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Acholdgraf+updated%3A2025-07-21..2025-09-08&type=Issues)) | `@ebolyen` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aebolyen+updated%3A2025-07-21..2025-09-08&type=Issues)) | `@fwkoch` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Afwkoch+updated%3A2025-07-21..2025-09-08&type=Issues)) | `@JimMadge` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3AJimMadge+updated%3A2025-07-21..2025-09-08&type=Issues)) | `@kevinlin1` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Akevinlin1+updated%3A2025-07-21..2025-09-08&type=Issues)) | `@mfisher87` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Amfisher87+updated%3A2025-07-21..2025-09-08&type=Issues)) | `@parmentelat` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aparmentelat+updated%3A2025-07-21..2025-09-08&type=Issues)) | `@rowanc1` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Arowanc1+updated%3A2025-07-21..2025-09-08&type=Issues)) | `@stefanv` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astefanv+updated%3A2025-07-21..2025-09-08&type=Issues))


