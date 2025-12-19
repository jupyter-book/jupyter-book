---
title: mystmd@1.6.0
date: 2025-07-22
url: /release/mystmd-1.6.0
repository: mystmd
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/mystmd/releases/tag/mystmd%401.6.0>`

This release updates the way that static HTML files are generated, to follow `pagename/index.html` structure rather than `pagename.html` structure. **Any hard-coded links to your MyST site that end in `.html` will break**, instead you should simply remove the `.html` (e.g. `folder/page.html` -> `folder/page`). This makes Jupyter Book and MyST more reliable when hosting with Static Site services like ReadTheDocs.

([full changelog](https://github.com/jupyter-book/mystmd/compare/mystmd@1.5.1...d3a0d1a94d3dc81e7f7f554003a5f0ab0f7a0777))

## Enhancements made

- 🎯 Render static HTML pages to expected server path [#2178](https://github.com/jupyter-book/mystmd/pull/2178) ([`@stefanv`](https://github.com/stefanv), [`@rowanc1`](https://github.com/rowanc1), [`@choldgraf`](https://github.com/choldgraf), [`@bsipocz`](https://github.com/bsipocz), [`@agoose77`](https://github.com/agoose77), [`@changeset`-bot](https://github.com/changeset-bot))
- 🔗 Fix URLs in table of contents directive [#2140](https://github.com/jupyter-book/mystmd/pull/2140) ([`@brianhawthorne`](https://github.com/brianhawthorne), [`@rowanc1`](https://github.com/rowanc1), [`@stefanv`](https://github.com/stefanv), [`@changeset`-bot](https://github.com/changeset-bot))

## Bugs fixed

- 🏷️ Add NPM binary name to whitelabelling [#2175](https://github.com/jupyter-book/mystmd/pull/2175) ([`@agoose77`](https://github.com/agoose77), [`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot), [`@stefanv`](https://github.com/stefanv))
- Add `ipynb` format option in validators [#2159](https://github.com/jupyter-book/mystmd/pull/2159) ([`@kp992`](https://github.com/kp992), [`@agoose77`](https://github.com/agoose77), [`@changeset`-bot](https://github.com/changeset-bot))

## Maintenance and upkeep improvements

- Clean up title and fix tag name in CI/CD [#2193](https://github.com/jupyter-book/mystmd/pull/2193) ([`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- Attach release to pre-existing tag [#2191](https://github.com/jupyter-book/mystmd/pull/2191) ([`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- Add access token to github-activity action [#2190](https://github.com/jupyter-book/mystmd/pull/2190) ([`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv), [`@changeset`-bot](https://github.com/changeset-bot))
- Fix github-activity invocation in CI/CD [#2189](https://github.com/jupyter-book/mystmd/pull/2189) ([`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- Automate GitHub releases and notes in our ci/cd [#2188](https://github.com/jupyter-book/mystmd/pull/2188) ([`@choldgraf`](https://github.com/choldgraf), [`@stefanv`](https://github.com/stefanv), [`@changeset`-bot](https://github.com/changeset-bot))

## Documentation improvements

- 📖 Remove out of date readme note [#2155](https://github.com/jupyter-book/mystmd/pull/2155) ([`@rowanc1`](https://github.com/rowanc1), [`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- 📖 A few miscellaneous documentation updates [#2154](https://github.com/jupyter-book/mystmd/pull/2154) ([`@rowanc1`](https://github.com/rowanc1), [`@changeset`-bot](https://github.com/changeset-bot))

## Other merged PRs

- Remove explicit target for tag [#2192](https://github.com/jupyter-book/mystmd/pull/2192) ([`@choldgraf`](https://github.com/choldgraf), [`@changeset`-bot](https://github.com/changeset-bot))
- 🚀 Release [#2180](https://github.com/jupyter-book/mystmd/pull/2180) ([`@rowanc1`](https://github.com/rowanc1))
- 🚀 Release [#2130](https://github.com/jupyter-book/mystmd/pull/2130) ([`@rowanc1`](https://github.com/rowanc1))

## Contributors to this release

The following people contributed discussions, new ideas, code and documentation contributions, and review.
See [our definition of contributors](https://github-activity.readthedocs.io/en/latest/#how-does-this-tool-define-contributions-in-the-reports).

([GitHub contributors page for this release](https://github.com/jupyter-book/mystmd/graphs/contributors?from=2025-07-05&to=2025-07-22&type=c))

`@agoose77` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aagoose77+updated%3A2025-07-05..2025-07-22&type=Issues)) | `@brian`-rose ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Abrian-rose+updated%3A2025-07-05..2025-07-22&type=Issues)) | `@brianhawthorne` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Abrianhawthorne+updated%3A2025-07-05..2025-07-22&type=Issues)) | `@bsipocz` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Absipocz+updated%3A2025-07-05..2025-07-22&type=Issues)) | `@changeset`-bot ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Achangeset-bot+updated%3A2025-07-05..2025-07-22&type=Issues)) | `@choldgraf` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Acholdgraf+updated%3A2025-07-05..2025-07-22&type=Issues)) | `@ebolyen` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Aebolyen+updated%3A2025-07-05..2025-07-22&type=Issues)) | `@kp992` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Akp992+updated%3A2025-07-05..2025-07-22&type=Issues)) | `@mfisher87` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Amfisher87+updated%3A2025-07-05..2025-07-22&type=Issues)) | `@rowanc1` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Arowanc1+updated%3A2025-07-05..2025-07-22&type=Issues)) | `@stefanv` ([activity](https://github.com/search?q=repo%3Ajupyter-book%2Fmystmd+involves%3Astefanv+updated%3A2025-07-05..2025-07-22&type=Issues))


