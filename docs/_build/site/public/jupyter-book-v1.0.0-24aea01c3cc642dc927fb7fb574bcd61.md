---
title: jupyter-book v1.0.0
date: 2024-01-26
url: /release/v1.0.0
repository: jupyter-book
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/jupyter-book/releases/tag/v1.0.0>`

# v1.0.0 - 2024-01-26

([full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.15.1...a8b7cf6517188ca837d948ca1f86858e2bb86097))

This release represents a stabilisation of the jupyter-book ecosystem. It features updates to many of the underlying software packages used by `jupyter-book`, including "major" updates to [myst-nb](https://github.com/executablebooks/myst-nb) and [myst-parser](https://github.com/executablebooks/myst-parser) which power `jupyter-book`. This release also brings compatibility with `sphinx v7`.

A big **thank you** to all contributors and maintainers of these underlying packages!


> [!IMPORTANT]  
> This release brings in updates to `myst-parser`. A notable change is that of the markdown link syntax, which [was extended](https://myst-parser.readthedocs.io/en/latest/develop/_changelog.html#extended-markdown-links) to support more constructs. The syntax behind this change is outlined in https://mep.mystmd.org/en/latest/meps/mep-0002/.


### Bugs fixed

- FIX: update `output_scroll` tag [#2050](https://github.com/executablebooks/jupyter-book/pull/2050) ([`@agoose77`](https://github.com/agoose77))
- RELEASE: v0.15.1 + BUG: Issue warning for sphinxcontrib-bibtex + docutils>=0.18,<0.20 [#1965](https://github.com/executablebooks/jupyter-book/pull/1965) ([`@mmcky`](https://github.com/mmcky))

### Maintenance and upkeep improvements

- MAINT: prepare for 1.0 release [#2089](https://github.com/executablebooks/jupyter-book/pull/2089) ([`@agoose77`](https://github.com/agoose77))
- MAINT: adding python 3.10 to the testing matrix and tox [#1987](https://github.com/executablebooks/jupyter-book/pull/1987) ([`@bsipocz`](https://github.com/bsipocz))

### Documentation improvements

- DOCS: describe new GHA workflow [#2080](https://github.com/executablebooks/jupyter-book/pull/2080) ([`@agoose77`](https://github.com/agoose77))
- DOCS: fix broken URL [#2072](https://github.com/executablebooks/jupyter-book/pull/2072) ([`@PhilippKaniuth`](https://github.com/PhilippKaniuth))
- DOCS: _config.yml: clarify CSS-breakage announcement [#2070](https://github.com/executablebooks/jupyter-book/pull/2070) ([`@SamB`](https://github.com/SamB))
- DOCS: trigger deploy-book action on both master and main [#2057](https://github.com/executablebooks/jupyter-book/pull/2057) ([`@kolibril13`](https://github.com/kolibril13))
- DOCS: update new-file.md [#2056](https://github.com/executablebooks/jupyter-book/pull/2056) ([`@RichardLitt`](https://github.com/RichardLitt))
- DOCS: update MyST `eval_rst` directive guide link [#2040](https://github.com/executablebooks/jupyter-book/pull/2040) ([`@nikosavola`](https://github.com/nikosavola))
- DOCS: update copyright year to 2023 [#2029](https://github.com/executablebooks/jupyter-book/pull/2029) ([`@GlobalMin`](https://github.com/GlobalMin))
- DOCS: fix minor format error in TOC documentation [#2028](https://github.com/executablebooks/jupyter-book/pull/2028) ([`@mwcraig`](https://github.com/mwcraig))
- DOCS: typo fixes and formatting for migration.md [#2018](https://github.com/executablebooks/jupyter-book/pull/2018) ([`@delfanbaum`](https://github.com/delfanbaum))
- DOCS: update markdown.md [#2014](https://github.com/executablebooks/jupyter-book/pull/2014) ([`@chbrandt`](https://github.com/chbrandt))
- DOCS: comments.md: add link to https://dokie.li/ [#2001](https://github.com/executablebooks/jupyter-book/pull/2001) ([`@westurner`](https://github.com/westurner))
- DOCS: persist execution cache on github actions [#1998](https://github.com/executablebooks/jupyter-book/pull/1998) ([`@minrk`](https://github.com/minrk))
- DOCS: Add documentation about suppressing warnings for showing plotly figures [#1957](https://github.com/executablebooks/jupyter-book/pull/1957) ([`@finsberg`](https://github.com/finsberg))

### Other merged PRs

- build(deps): bump actions/cache from 3 to 4 [#2104](https://github.com/executablebooks/jupyter-book/pull/2104) ([`@dependabot`](https://github.com/dependabot))
- build(deps): bump actions/setup-python from 4 to 5 [#2084](https://github.com/executablebooks/jupyter-book/pull/2084) ([`@dependabot`](https://github.com/dependabot))
- build(deps): bump actions/checkout from 3 to 4 [#2083](https://github.com/executablebooks/jupyter-book/pull/2083) ([`@dependabot`](https://github.com/dependabot))
- build(deps): bump codecov/codecov-action from 3.1.3 to 3.1.4 [#2019](https://github.com/executablebooks/jupyter-book/pull/2019) ([`@dependabot`](https://github.com/dependabot))
- build(deps): bump codecov/codecov-action from 3.1.2 to 3.1.3 [#2005](https://github.com/executablebooks/jupyter-book/pull/2005) ([`@dependabot`](https://github.com/dependabot))
- build(deps-dev): update sphinx-design requirement from ~=0.3.0 to ~=0.4.1 [#2000](https://github.com/executablebooks/jupyter-book/pull/2000) ([`@dependabot`](https://github.com/dependabot))
- build(deps): bump codecov/codecov-action from 3.1.1 to 3.1.2 [#1999](https://github.com/executablebooks/jupyter-book/pull/1999) ([`@dependabot`](https://github.com/dependabot))
- [pre-commit.ci] pre-commit autoupdate [#1989](https://github.com/executablebooks/jupyter-book/pull/1989) ([`@pre`-commit-ci](https://github.com/pre-commit-ci))
- Update config.py for sphinx_multitoc_numbering [#1799](https://github.com/executablebooks/jupyter-book/pull/1799) ([`@whyjz`](https://github.com/whyjz))

### Contributors to this release

([GitHub contributors page for this release](https://github.com/executablebooks/jupyter-book/graphs/contributors?from=2023-03-14&to=2024-01-26&type=c))

[`@AakashGfude`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AAakashGfude+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@agoose77`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aagoose77+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@ashejim`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aashejim+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@blakeNaccarato`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AblakeNaccarato+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@bsipocz`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Absipocz+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@chbrandt`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Achbrandt+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@choldgraf`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acholdgraf+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@chrisjsewell`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Achrisjsewell+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@codecov`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acodecov+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@delfanbaum`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Adelfanbaum+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@dependabot`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Adependabot+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@finsberg`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Afinsberg+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@firasm`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Afirasm+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@GlobalMin`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AGlobalMin+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@jorgensd`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajorgensd+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@kolibril13`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Akolibril13+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@marcdexet`-cnrs](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Amarcdexet-cnrs+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@mathieuboudreau`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Amathieuboudreau+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@minrk`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aminrk+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@mmcky`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ammcky+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@mwcraig`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Amwcraig+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@nikosavola`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Anikosavola+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@nocomplexity`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Anocomplexity+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@PhilippKaniuth`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3APhilippKaniuth+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@phockett`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aphockett+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@pre`-commit-ci](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Apre-commit-ci+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@RichardLitt`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3ARichardLitt+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@SamB`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3ASamB+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@welcome`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Awelcome+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@westurner`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Awesturner+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@whyjz`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Awhyjz+updated%3A2023-03-14..2024-01-26&type=Issues) | [`@zingale`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Azingale+updated%3A2023-03-14..2024-01-26&type=Issues)


