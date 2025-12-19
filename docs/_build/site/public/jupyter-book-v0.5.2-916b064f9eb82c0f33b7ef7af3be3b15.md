---
title: jupyter-book v0.5.2
date: 2019-07-26
url: /release/v0.5.2
repository: jupyter-book
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/jupyter-book/releases/tag/v0.5.2>`

## [v0.5.2](https://github.com/jupyter/jupyter-book/tree/v0.5.2) (2019-07-26)
[Full Changelog](https://github.com/jupyter/jupyter-book/compare/v0.5...v0.5.2)

**Implemented enhancements:**

- implement removecell for markdown cells [\#192](https://github.com/jupyter/jupyter-book/issues/192)

**Fixed bugs:**

- yaml.load\(\) is unsafe [\#230](https://github.com/jupyter/jupyter-book/issues/230)
- Update documentation links that are broken [\#224](https://github.com/jupyter/jupyter-book/issues/224)
- pip installation: jupyter-book or jupyter\_book? [\#184](https://github.com/jupyter/jupyter-book/issues/184)
- Figure out why Gemfile and Gemfile.lock are causing issues [\#154](https://github.com/jupyter/jupyter-book/issues/154)
- Page turn link URLs missing .html [\#140](https://github.com/jupyter/jupyter-book/issues/140)
- Errors when running on Windows [\#137](https://github.com/jupyter/jupyter-book/issues/137)
- Docs aren't being updated from master [\#136](https://github.com/jupyter/jupyter-book/issues/136)
- toc help is incorrect [\#132](https://github.com/jupyter/jupyter-book/issues/132)
- Double check installation dependencies [\#211](https://github.com/jupyter/jupyter-book/issues/211)

**Closed issues:**

- Update docs about how to hide code cells [\#240](https://github.com/jupyter/jupyter-book/issues/240)
- Is it possible to export Word, PDF and other formats? [\#228](https://github.com/jupyter/jupyter-book/issues/228)
- Make it clear in the documentation that the full docker path needs to be specified, not the relative path [\#220](https://github.com/jupyter/jupyter-book/issues/220)
- Why do we have "content" directory inside the "\_site"? [\#219](https://github.com/jupyter/jupyter-book/issues/219)
- mismatch in docs and functionality [\#214](https://github.com/jupyter/jupyter-book/issues/214)
- Double check that `generate\_toc.py` is getting copied properly [\#210](https://github.com/jupyter/jupyter-book/issues/210)
- jupyter-book cli does not work as stated in the getting started guide [\#208](https://github.com/jupyter/jupyter-book/issues/208)
- Unable to install jupyter-book in conda environment [\#206](https://github.com/jupyter/jupyter-book/issues/206)
- Error if kernelspec missing [\#195](https://github.com/jupyter/jupyter-book/issues/195)
- Clarify the CLI help statements [\#146](https://github.com/jupyter/jupyter-book/issues/146)
- jupyter-book upgrade also modifies requirements.txt [\#130](https://github.com/jupyter/jupyter-book/issues/130)

**Merged pull requests:**

- bumping version and adding CLI for version [\#242](https://github.com/jupyter/jupyter-book/pull/242) ([choldgraf](https://github.com/choldgraf))
- Release fixes [\#241](https://github.com/jupyter/jupyter-book/pull/241) ([choldgraf](https://github.com/choldgraf))
- Markdown exporter in Python instead of the CLI [\#235](https://github.com/jupyter/jupyter-book/pull/235) ([choldgraf](https://github.com/choldgraf))
- Change text in Markdown cell to correct URL. [\#227](https://github.com/jupyter/jupyter-book/pull/227) ([habi](https://github.com/habi))
- \[DOC\] Clarify full vs relative path in container build instructions [\#226](https://github.com/jupyter/jupyter-book/pull/226) ([emdupre](https://github.com/emdupre))
- Ensure UTF-8 Encoding When Building Book [\#225](https://github.com/jupyter/jupyter-book/pull/225) ([cczhu](https://github.com/cczhu))
- version bump to dev [\#218](https://github.com/jupyter/jupyter-book/pull/218) ([choldgraf](https://github.com/choldgraf))
- version bump for bugfix [\#217](https://github.com/jupyter/jupyter-book/pull/217) ([choldgraf](https://github.com/choldgraf))
- fix doc mismatch for "make build" [\#216](https://github.com/jupyter/jupyter-book/pull/216) ([thammegowda](https://github.com/thammegowda))
- make scripts dir as a module, to be included by `find\_packages\(\)` of setuptools [\#215](https://github.com/jupyter/jupyter-book/pull/215) ([thammegowda](https://github.com/thammegowda))
- add jupyter book to template requirements [\#209](https://github.com/jupyter/jupyter-book/pull/209) ([choldgraf](https://github.com/choldgraf))
- updating hidecode tag word and allowing total HTML removal [\#207](https://github.com/jupyter/jupyter-book/pull/207) ([choldgraf](https://github.com/choldgraf))
- Ask if kernelspec exists in metadata [\#197](https://github.com/jupyter/jupyter-book/pull/197) ([joergbrech](https://github.com/joergbrech))
- changelog and version bump [\#194](https://github.com/jupyter/jupyter-book/pull/194) ([choldgraf](https://github.com/choldgraf))
