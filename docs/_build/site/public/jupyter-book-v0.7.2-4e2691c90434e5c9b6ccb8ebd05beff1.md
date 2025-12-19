---
title: jupyter-book v0.7.2
date: 2020-07-29
url: /release/v0.7.2
repository: jupyter-book
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/jupyter-book/releases/tag/v0.7.2>`

# v0.7.1...v0.7.2
([full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.7.1...v0.7.2))


## Enhancements made
* ✨ NEW: Adding - chapter entries to _toc.yml [#817](https://github.com/executablebooks/jupyter-book/pull/817) ([`@choldgraf`](https://github.com/choldgraf))
* checking for toc modification time [#772](https://github.com/executablebooks/jupyter-book/pull/772) ([`@choldgraf`](https://github.com/choldgraf))
* first pass toc directive [#757](https://github.com/executablebooks/jupyter-book/pull/757) ([`@choldgraf`](https://github.com/choldgraf))

## Bugs fixed
* Fix typo in content-blocks.md documentation [#811](https://github.com/executablebooks/jupyter-book/pull/811) ([`@MaxGhenis`](https://github.com/MaxGhenis))
* [BUG] Using relative instead of absolute links [#747](https://github.com/executablebooks/jupyter-book/pull/747) ([`@AakashGfude`](https://github.com/AakashGfude))
* � FIX: fixing jupytext install/UI links [#737](https://github.com/executablebooks/jupyter-book/pull/737) ([`@chrisjsewell`](https://github.com/chrisjsewell))

## Documentation improvements
* � DOC: note about licenses [#806](https://github.com/executablebooks/jupyter-book/pull/806) ([`@choldgraf`](https://github.com/choldgraf))
* � DOCS: Fix google analytics instructions [#799](https://github.com/executablebooks/jupyter-book/pull/799) ([`@tobydriscoll`](https://github.com/tobydriscoll))
* Change book_path to path_to_book [#773](https://github.com/executablebooks/jupyter-book/pull/773) ([`@MaxGhenis`](https://github.com/MaxGhenis))
* GitHub actions example: note about selective build [#771](https://github.com/executablebooks/jupyter-book/pull/771) ([`@consideRatio`](https://github.com/consideRatio))
* getting sphinx thebelab to work [#749](https://github.com/executablebooks/jupyter-book/pull/749) ([`@choldgraf`](https://github.com/choldgraf))
* Link documentation for adding cell tags in Jupyter from "Hide or remove content" documentation section [#734](https://github.com/executablebooks/jupyter-book/pull/734) ([`@MaxGhenis`](https://github.com/MaxGhenis))
* typo fix [#731](https://github.com/executablebooks/jupyter-book/pull/731) ([`@MaxGhenis`](https://github.com/MaxGhenis))

## API Changes
* ✨ NEW: Adding - chapter entries to _toc.yml [#817](https://github.com/executablebooks/jupyter-book/pull/817) ([`@choldgraf`](https://github.com/choldgraf))
  - `headers:` is no longer supported. See the PR for more details
* removing config file numbered sections to use toc file instead [#768](https://github.com/executablebooks/jupyter-book/pull/768) ([`@choldgraf`](https://github.com/choldgraf))
  - `navbar_number_sections` is deprecated, use `numbered:` in `_toc.yml` from now on

## Other merged PRs
* � DOC: update gh-pages + ghp-import docs [#814](https://github.com/executablebooks/jupyter-book/pull/814) ([`@TomasBeuzen`](https://github.com/TomasBeuzen))

## Contributors to this release
([GitHub contributors page for this release](https://github.com/executablebooks/jupyter-book/graphs/contributors?from=2020-06-25&to=2020-07-29&type=c))

[`@AakashGfude`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AAakashGfude+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@amueller`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aamueller+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@bmcfee`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Abmcfee+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@brian`-rose](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Abrian-rose+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@choldgraf`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acholdgraf+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@chrisjsewell`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Achrisjsewell+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@codecov`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acodecov+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@consideRatio`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AconsideRatio+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@cpjobling`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acpjobling+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@jstac`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajstac+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@MaxGhenis`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AMaxGhenis+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@mmcky`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ammcky+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@nathancarter`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Anathancarter+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@phaustin`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aphaustin+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@ptcane`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aptcane+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@tobydriscoll`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Atobydriscoll+updated%3A2020-06-25..2020-07-29&type=Issues) | [`@TomasBeuzen`](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3ATomasBeuzen+updated%3A2020-06-25..2020-07-29&type=Issues)
