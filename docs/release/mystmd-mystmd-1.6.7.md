---
title: mystmd@1.6.7
date: 2025-12-01
url: /release/mystmd-1.6.7
repository: mystmd
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/mystmd/releases/tag/mystmd%401.6.7>`


([full changelog](https://github.com/jupyter-book/mystmd/compare/mystmd@1.6.6...f87ab6b53636097c05db456adfe96e07f3da245c))

## Enhancements made

- 🔑 Support `keys` for DOI links [#2492](https://github.com/jupyter-book/mystmd/pull/2492) ([`@rowanc1`](https://github.com/rowanc1), [`@mfisher87`](https://github.com/mfisher87), [`@stefanv`](https://github.com/stefanv), [`@changeset`-bot](https://github.com/changeset-bot))
- Add support for notebook cell output scroll metadata [#2433](https://github.com/jupyter-book/mystmd/pull/2433) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@changeset`-bot](https://github.com/changeset-bot), [`@bsipocz`](https://github.com/bsipocz))

## Bugs fixed

- 🐛 Footnote and role parsing bug [#2525](https://github.com/jupyter-book/mystmd/pull/2525) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🐛 Don't crash if links don't have URLs [#2518](https://github.com/jupyter-book/mystmd/pull/2518) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- 🗺️ Fetch sitemap when building static site [#2450](https://github.com/jupyter-book/mystmd/pull/2450) ([`@agoose77`](https://github.com/agoose77), [`@changeset`-bot](https://github.com/changeset-bot))
- 🧹 Remove `hide_authors` handling [#2420](https://github.com/jupyter-book/mystmd/pull/2420) ([`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv), [`@changeset`-bot](https://github.com/changeset-bot))

## Maintenance and upkeep improvements

- 📖 Trigger docs build with release workflow [#2519](https://github.com/jupyter-book/mystmd/pull/2519) ([`@choldgraf`](https://github.com/choldgraf), [`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))

## Documentation improvements

- slight improvements in docs on configuration / frontmatter [#2521](https://github.com/jupyter-book/mystmd/pull/2521) ([`@parmentelat`](https://github.com/parmentelat), [`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- 📖 Make the myst-transform doc smoother and more legible [#2520](https://github.com/jupyter-book/mystmd/pull/2520) ([`@parmentelat`](https://github.com/parmentelat), [`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))
- Add plugin use case and debugging docs [#2515](https://github.com/jupyter-book/mystmd/pull/2515) ([`@mfisher87`](https://github.com/mfisher87), [`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- Add documentation to `{myst}` directive [#2508](https://github.com/jupyter-book/mystmd/pull/2508) ([`@mfisher87`](https://github.com/mfisher87), [`@agoose77`](https://github.com/agoose77), [`@changeset`-bot](https://github.com/changeset-bot))
- Provide explicit debug command in error rules documentation [#2494](https://github.com/jupyter-book/mystmd/pull/2494) ([`@mfisher87`](https://github.com/mfisher87), [`@stefanv`](https://github.com/stefanv), [`@changeset`-bot](https://github.com/changeset-bot))
- 📖 Add subsection about document titles in TOC [#2484](https://github.com/jupyter-book/mystmd/pull/2484) ([`@rossbar`](https://github.com/rossbar), [`@rowanc1`](https://github.com/rowanc1), [`@stefanv`](https://github.com/stefanv), [`@changeset`-bot](https://github.com/changeset-bot))
- ⚙️ Update webserver deploy documentation [#2479](https://github.com/jupyter-book/mystmd/pull/2479) ([`@akhmerov`](https://github.com/akhmerov), [`@agoose77`](https://github.com/agoose77), [`@changeset`-bot](https://github.com/changeset-bot))
- Update site options docs for clarity [#2468](https://github.com/jupyter-book/mystmd/pull/2468) ([`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv), [`@changeset`-bot](https://github.com/changeset-bot))
- Update OpenAlex API link in frontmatter documentation [#2467](https://github.com/jupyter-book/mystmd/pull/2467) ([`@akhmerov`](https://github.com/akhmerov), [`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- Fix typo [#2465](https://github.com/jupyter-book/mystmd/pull/2465) ([`@ofek`](https://github.com/ofek), [`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- Document how to use options with dashes in their names [#2463](https://github.com/jupyter-book/mystmd/pull/2463) ([`@stefanv`](https://github.com/stefanv), [`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- Update documentation for MyST HTML option [#2462](https://github.com/jupyter-book/mystmd/pull/2462) ([`@akhmerov`](https://github.com/akhmerov), [`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv), [`@changeset`-bot](https://github.com/changeset-bot))

## Other merged PRs

- chore: add changeset [#2513](https://github.com/jupyter-book/mystmd/pull/2513) ([`@agoose77`](https://github.com/agoose77), [`@changeset`-bot](https://github.com/changeset-bot), [`@stefanv`](https://github.com/stefanv), [`@rowanc1`](https://github.com/rowanc1))
- 🚀 Release [#2460](https://github.com/jupyter-book/mystmd/pull/2460) ([`@rowanc1`](https://github.com/rowanc1))
- 🚀 Release [#2457](https://github.com/jupyter-book/mystmd/pull/2457) ([`@stefanv`](https://github.com/stefanv))

## Contributors to this release

The following people contributed discussions, new ideas, code and documentation contributions, and review.
See [our definition of contributors](https://github-activity.readthedocs.io/en/latest/#how-does-this-tool-define-contributions-in-the-reports).

([GitHub contributors page for this release](https://github.com/jupyter-book/mystmd/graphs/contributors?from=2025-11-19&to=2025-12-01&type=c))

`@agoose77` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aagoose77+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@akhmerov` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aakhmerov+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@brianhawthorne` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Abrianhawthorne+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@bsipocz` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Absipocz+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@changeset`-bot ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Achangeset-bot+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@choldgraf` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Acholdgraf+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@mfisher87` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Amfisher87+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@ofek` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aofek+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@parmentelat` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aparmentelat+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@rossbar` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Arossbar+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@rowanc1` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Arowanc1+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@stefanv` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astefanv+updated%3A2025-11-19..2025-12-01&type=Issues)) | `@stevejpurves` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astevejpurves+updated%3A2025-11-19..2025-12-01&type=Issues))


