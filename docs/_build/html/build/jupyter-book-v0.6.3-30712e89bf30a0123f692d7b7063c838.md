---
title: jupyter-book v0.6.3
date: 2019-10-07
url: /release/v0.6.3
repository: jupyter-book
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/jupyter-book/releases/tag/v0.6.3>`

# v0.6.3
([full changelog](https://github.com/jupyter/jupyter-book/compare/v0.6.0...v0.6.3))

This is a minor release with several stability and convenience improvements since the
large refactoring that happened in v0.6.0. It adds a few new layout elements, the ability
to pre-initialize cells when starting thebelab, and adds configuration and
documentation for deploying your book on Netlify.

## Enhancements made
* adding anchors above headers [#366](https://github.com/jupyter/jupyter-book/pull/366) ([`@choldgraf`](https://github.com/choldgraf))
* adding CSS rules for epigraphs [#365](https://github.com/jupyter/jupyter-book/pull/365) ([`@choldgraf`](https://github.com/choldgraf))
* netlify config [#359](https://github.com/jupyter/jupyter-book/pull/359) ([`@choldgraf`](https://github.com/choldgraf))
* Thebelab init [#352](https://github.com/jupyter/jupyter-book/pull/352) ([`@choldgraf`](https://github.com/choldgraf))
* [WIP] Add option to clear outputs in build command [#349](https://github.com/jupyter/jupyter-book/pull/349) ([`@akhilputhiry`](https://github.com/akhilputhiry))
* [ENH] Netlify Continuous Deployment [#342](https://github.com/jupyter/jupyter-book/pull/342) ([`@emdupre`](https://github.com/emdupre))

## Bugs fixed
* css for thebelab z-order [#386](https://github.com/jupyter/jupyter-book/pull/386) ([`@choldgraf`](https://github.com/choldgraf))
* fixing TOC auto gen bug [#375](https://github.com/jupyter/jupyter-book/pull/375) ([`@choldgraf`](https://github.com/choldgraf))
* fixing page path link [#368](https://github.com/jupyter/jupyter-book/pull/368) ([`@choldgraf`](https://github.com/choldgraf))
* fixing interact link bug [#367](https://github.com/jupyter/jupyter-book/pull/367) ([`@choldgraf`](https://github.com/choldgraf))
* Update required python version [#363](https://github.com/jupyter/jupyter-book/pull/363) ([`@emdupre`](https://github.com/emdupre))
* fix: fuzzy matching of jupyter book versions [#346](https://github.com/jupyter/jupyter-book/pull/346) ([`@emdupre`](https://github.com/emdupre))
* fixing scrolling [#336](https://github.com/jupyter/jupyter-book/pull/336) ([`@choldgraf`](https://github.com/choldgraf))

## Maintenance and upkeep improvements
* fixing load ntbk function [#385](https://github.com/jupyter/jupyter-book/pull/385) ([`@choldgraf`](https://github.com/choldgraf))
* load ntbk function [#384](https://github.com/jupyter/jupyter-book/pull/384) ([`@choldgraf`](https://github.com/choldgraf))
* moving CSS and JS generation to their own function [#381](https://github.com/jupyter/jupyter-book/pull/381) ([`@choldgraf`](https://github.com/choldgraf))
* making sure gemfile.lock is removed [#379](https://github.com/jupyter/jupyter-book/pull/379) ([`@choldgraf`](https://github.com/choldgraf))
* removing unnecessary requirements [#378](https://github.com/jupyter/jupyter-book/pull/378) ([`@choldgraf`](https://github.com/choldgraf))
* making toc gen sorted [#377](https://github.com/jupyter/jupyter-book/pull/377) ([`@choldgraf`](https://github.com/choldgraf))
* fixing up download functionality [#373](https://github.com/jupyter/jupyter-book/pull/373) ([`@choldgraf`](https://github.com/choldgraf))
* small refactoring of names and layout [#372](https://github.com/jupyter/jupyter-book/pull/372) ([`@choldgraf`](https://github.com/choldgraf))
* Bump rubyzip from 1.2.4 to 2.0.0 in /jupyter_book/book_template [#371](https://github.com/jupyter/jupyter-book/pull/371) ([`@dependabot`](https://github.com/dependabot))
* moving to jupyterbook.org [#370](https://github.com/jupyter/jupyter-book/pull/370) ([`@choldgraf`](https://github.com/choldgraf))
* inlining svgs and small tweaks [#369](https://github.com/jupyter/jupyter-book/pull/369) ([`@choldgraf`](https://github.com/choldgraf))
* [fix] update docker image and documentation [#364](https://github.com/jupyter/jupyter-book/pull/364) ([`@emdupre`](https://github.com/emdupre))
* moving js outside of _includes if not needed [#347](https://github.com/jupyter/jupyter-book/pull/347) ([`@choldgraf`](https://github.com/choldgraf))
* removing unnecessary clean_lines function [#345](https://github.com/jupyter/jupyter-book/pull/345) ([`@choldgraf`](https://github.com/choldgraf))
* modularizing the bage building and beefing up single page building [#344](https://github.com/jupyter/jupyter-book/pull/344) ([`@choldgraf`](https://github.com/choldgraf))

## Documentation improvements
* DOC: intro.md: Jupyter Books -> Jupyter Book [#383](https://github.com/jupyter/jupyter-book/pull/383) ([`@westurner`](https://github.com/westurner))

## Other merged PRs
* Update executing.ipynb [#350](https://github.com/jupyter/jupyter-book/pull/350) ([`@psychemedia`](https://github.com/psychemedia))
* adding better circle instructions [#341](https://github.com/jupyter/jupyter-book/pull/341) ([`@choldgraf`](https://github.com/choldgraf))
* cleaning up circle [#340](https://github.com/jupyter/jupyter-book/pull/340) ([`@choldgraf`](https://github.com/choldgraf))
* ghp-import in circle [#339](https://github.com/jupyter/jupyter-book/pull/339) ([`@choldgraf`](https://github.com/choldgraf))
* removing _build artifacts [#338](https://github.com/jupyter/jupyter-book/pull/338) ([`@choldgraf`](https://github.com/choldgraf))
* making some files optional in upgrade [#337](https://github.com/jupyter/jupyter-book/pull/337) ([`@choldgraf`](https://github.com/choldgraf))
* adding google analytics info [#335](https://github.com/jupyter/jupyter-book/pull/335) ([`@choldgraf`](https://github.com/choldgraf))
* updating changelog [#334](https://github.com/jupyter/jupyter-book/pull/334) ([`@choldgraf`](https://github.com/choldgraf))
* fixing releases info [#333](https://github.com/jupyter/jupyter-book/pull/333) ([`@choldgraf`](https://github.com/choldgraf))

## Contributors for this release (commentors + issue/PR authors)
[GitHub contributors page for this release](https://github.com/jupyter/jupyter-book/graphs/contributors?from=2019-09-17&to=2019-10-07&type=c)

[`@akhilputhiry`](https://github.com/akhilputhiry) | [`@catafest`](https://github.com/catafest) | [`@choldgraf`](https://github.com/choldgraf) | [`@chrispyles`](https://github.com/chrispyles) | [`@dependabot`](https://github.com/dependabot) | [`@emdupre`](https://github.com/emdupre) | [`@emile`-igarape](https://github.com/emile-igarape) | [`@fmaussion`](https://github.com/fmaussion) | [`@jasmainak`](https://github.com/jasmainak) | [`@jobindj`](https://github.com/jobindj) | [`@krinsman`](https://github.com/krinsman) | [`@LY1806620741`](https://github.com/LY1806620741) | [`@mwcraig`](https://github.com/mwcraig) | [`@ocefpaf`](https://github.com/ocefpaf) | [`@oscarys`](https://github.com/oscarys) | [`@psychemedia`](https://github.com/psychemedia) | [`@SamLau95`](https://github.com/SamLau95) | [`@sidneymbell`](https://github.com/sidneymbell) | [`@sodre`](https://github.com/sodre) | [`@taylorgibson`](https://github.com/taylorgibson) | [`@westurner`](https://github.com/westurner)

