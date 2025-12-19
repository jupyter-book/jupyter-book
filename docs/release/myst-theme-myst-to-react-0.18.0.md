---
title: MyST Theme v0.18.0
date: 2025-11-24
url: /release/myst-to-react-0.18.0
repository: myst-theme
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/myst-theme/releases/tag/myst-to-react%400.18.0>`

This brings a number of improvements to UI components and flexibility for the book theme, and also adds human-level classes so that users can style things more easily with their own stylesheets!

## Enhancements made

- 🥢 Add human-readable CSS classes to theme elements for easier styling [#667](https://github.com/jupyter-book/myst-theme/pull/667) ([`@ayghri`](https://github.com/ayghri), [`@artoftheblue`](https://github.com/artoftheblue), [`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify), [`@stefanv`](https://github.com/stefanv), [`@stevejpurves`](https://github.com/stevejpurves))
- Add customizable banner component [#675](https://github.com/jupyter-book/myst-theme/pull/675) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@netlify`](https://github.com/netlify), [`@stefanv`](https://github.com/stefanv))
- add `hide_authors` option [#674](https://github.com/jupyter-book/myst-theme/pull/674) ([`@agoose77`](https://github.com/agoose77), [`@netlify`](https://github.com/netlify), [`@stevejpurves`](https://github.com/stevejpurves))
- 🪐 Remove Jupyter Logo from frontmatter [#670](https://github.com/jupyter-book/myst-theme/pull/670) ([`@rowanc1`](https://github.com/rowanc1), [`@bsipocz`](https://github.com/bsipocz), [`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify))
- 👣 Allow custom primary sidebar footer [#613](https://github.com/jupyter-book/myst-theme/pull/613) ([`@artoftheblue`](https://github.com/artoftheblue), [`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify), [`@stefanv`](https://github.com/stefanv))
- 🖼️ Consume `title` in IFrame renderer [#694](https://github.com/jupyter-book/myst-theme/pull/694) ([`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify), [`@stefanv`](https://github.com/stefanv), [`@stevejpurves`](https://github.com/stevejpurves))
- 🧩 Pull `parts` from `site` as well as `project` for banner and footer [#685](https://github.com/jupyter-book/myst-theme/pull/685) ([`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify))
- 🫳 Adjust PrimarySideBar downwards when banner is visible [#683](https://github.com/jupyter-book/myst-theme/pull/683) ([`@stefanv`](https://github.com/stefanv), [`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify))
- 🔐 Improve security for localhost [#646](https://github.com/jupyter-book/myst-theme/pull/646) ([`@rowanc1`](https://github.com/rowanc1), [`@netlify`](https://github.com/netlify))
- Add aria-label for DocumentOutline.tsx dropdown button [#641](https://github.com/jupyter-book/myst-theme/pull/641) ([`@kevinlin1`](https://github.com/kevinlin1), [`@agoose77`](https://github.com/agoose77), [`@netlify`](https://github.com/netlify), [`@stevejpurves`](https://github.com/stevejpurves))

## Bugs fixed

- FIX: Whitespace for checkboxes [#686](https://github.com/jupyter-book/myst-theme/pull/686) ([`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify), [`@stefanv`](https://github.com/stefanv), [`@stevejpurves`](https://github.com/stevejpurves))
- Re-fix bug for hidden play button [#673](https://github.com/jupyter-book/myst-theme/pull/673) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@netlify`](https://github.com/netlify))
- Add baseurl to the sidebar links [#671](https://github.com/jupyter-book/myst-theme/pull/671) ([`@choldgraf`](https://github.com/choldgraf), [`@agoose77`](https://github.com/agoose77), [`@netlify`](https://github.com/netlify), [`@rowanc1`](https://github.com/rowanc1))
- Fix document outline overflowing off the screen [#665](https://github.com/jupyter-book/myst-theme/pull/665) ([`@mfisher87`](https://github.com/mfisher87), [`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify))
- Fix accessibility bugs in search form dialog [#656](https://github.com/jupyter-book/myst-theme/pull/656) ([`@kevinlin1`](https://github.com/kevinlin1), [`@agoose77`](https://github.com/agoose77), [`@netlify`](https://github.com/netlify))
- Increase search bar text contrast [#655](https://github.com/jupyter-book/myst-theme/pull/655) ([`@kevinlin1`](https://github.com/kevinlin1), [`@agoose77`](https://github.com/agoose77), [`@netlify`](https://github.com/netlify))
- Add missing base URLs in top navigation [#644](https://github.com/jupyter-book/myst-theme/pull/644) ([`@kevinlin1`](https://github.com/kevinlin1), [`@agoose77`](https://github.com/agoose77), [`@netlify`](https://github.com/netlify))
- :beetle: :boom: Fix static html sidebar nav menu collapse bug [#647](https://github.com/jupyter-book/myst-theme/pull/647) ([`@brianhawthorne`](https://github.com/brianhawthorne), [`@agoose77`](https://github.com/agoose77), [`@netlify`](https://github.com/netlify), [`@rowanc1`](https://github.com/rowanc1), [`@stefanv`](https://github.com/stefanv))
- ⌨️ Cell block overflow color and copy icon location [#627](https://github.com/jupyter-book/myst-theme/pull/627) ([`@rowanc1`](https://github.com/rowanc1), [`@matthewfeickert`](https://github.com/matthewfeickert), [`@netlify`](https://github.com/netlify))
- 🐬 Flip `main` and `article` elements [#586](https://github.com/jupyter-book/myst-theme/pull/586) ([`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify), [`@rowanc1`](https://github.com/rowanc1), [`@stevejpurves`](https://github.com/stevejpurves))


## Maintenance and upkeep improvements

- Add manual netlify command [#701](https://github.com/jupyter-book/myst-theme/pull/701) ([`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify), [`@stefanv`](https://github.com/stefanv))
- Fix banner link [#696](https://github.com/jupyter-book/myst-theme/pull/696) ([`@stefanv`](https://github.com/stefanv), [`@agoose77`](https://github.com/agoose77), [`@bsipocz`](https://github.com/bsipocz), [`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify), [`@stevejpurves`](https://github.com/stevejpurves))
- ⚠️ Show warning when CSS fails to apply [#693](https://github.com/jupyter-book/myst-theme/pull/693) ([`@agoose77`](https://github.com/agoose77), [`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify))
- 🧜‍♀️ Upgrade mermaid to ^11 [#658](https://github.com/jupyter-book/myst-theme/pull/658) ([`@agoose77`](https://github.com/agoose77), [`@netlify`](https://github.com/netlify), [`@stefanv`](https://github.com/stefanv))
- 🐛 Remove the misleading "Slack notification" in the release action [#630](https://github.com/jupyter-book/myst-theme/pull/630) ([`@rowanc1`](https://github.com/rowanc1), [`@netlify`](https://github.com/netlify))
- 🐛 `seealse` --> `seealso` [#629](https://github.com/jupyter-book/myst-theme/pull/629) ([`@rowanc1`](https://github.com/rowanc1), [`@netlify`](https://github.com/netlify))


## Documentation improvements

- Delete visual reference [#691](https://github.com/jupyter-book/myst-theme/pull/691) ([`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify))
- Add kitchen sink reference [#690](https://github.com/jupyter-book/myst-theme/pull/690) ([`@choldgraf`](https://github.com/choldgraf), [`@bsipocz`](https://github.com/bsipocz), [`@netlify`](https://github.com/netlify), [`@stefanv`](https://github.com/stefanv))
- Reformat main [#688](https://github.com/jupyter-book/myst-theme/pull/688) ([`@stefanv`](https://github.com/stefanv), [`@netlify`](https://github.com/netlify))
- Add a logo and title to the myst-theme docs [#681](https://github.com/jupyter-book/myst-theme/pull/681) ([`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify))
- Update developer guide [#678](https://github.com/jupyter-book/myst-theme/pull/678) ([`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify), [`@stefanv`](https://github.com/stefanv))
- Add bokeh example [#619](https://github.com/jupyter-book/myst-theme/pull/619) ([`@choldgraf`](https://github.com/choldgraf), [`@netlify`](https://github.com/netlify), [`@rowanc1`](https://github.com/rowanc1))
- Document a few more theme features [#700](https://github.com/jupyter-book/myst-theme/pull/700) ([`@choldgraf`](https://github.com/choldgraf), [`@bsipocz`](https://github.com/bsipocz), [`@netlify`](https://github.com/netlify))

## Contributors to this release

The following people contributed discussions, new ideas, code and documentation contributions, and review.
See [our definition of contributors](https://github-activity.readthedocs.io/en/latest/#how-does-this-tool-define-contributions-in-the-reports).

([GitHub contributors page for this release](https://github.com/jupyter-book/myst-theme/graphs/contributors?from=2025-07-04&to=2025-11-24&type=c))

`@acocac` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Aacocac+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@agoose77` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Aagoose77+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@artoftheblue` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Aartoftheblue+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@ayghri` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Aayghri+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@brianhawthorne` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Abrianhawthorne+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@bsipocz` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Absipocz+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@choldgraf` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Acholdgraf+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@fperez` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Afperez+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@kevinlin1` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Akevinlin1+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@matthewfeickert` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Amatthewfeickert+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@mfisher87` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Amfisher87+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@netlify` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Anetlify+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@parmentelat` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Aparmentelat+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@rowanc1` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Arowanc1+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@stefanv` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Astefanv+updated%3A2025-07-04..2025-11-24&type=Issues)) | `@stevejpurves` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmyst-theme+involves%3Astevejpurves+updated%3A2025-07-04..2025-11-24&type=Issues))

