# Change Log

# v0.6.0...v0.6.3
([full changelog](https://github.com/jupyter/jupyter-book/compare/v0.6.0...v0.6.3))


## Enhancements made
* adding anchors above headers [#366](https://github.com/jupyter/jupyter-book/pull/366) ([@choldgraf](https://github.com/choldgraf))
* adding CSS rules for epigraphs [#365](https://github.com/jupyter/jupyter-book/pull/365) ([@choldgraf](https://github.com/choldgraf))
* netlify config [#359](https://github.com/jupyter/jupyter-book/pull/359) ([@choldgraf](https://github.com/choldgraf))
* Thebelab init [#352](https://github.com/jupyter/jupyter-book/pull/352) ([@choldgraf](https://github.com/choldgraf))
* [WIP] Add option to clear outputs in build command [#349](https://github.com/jupyter/jupyter-book/pull/349) ([@akhilputhiry](https://github.com/akhilputhiry))
* [ENH] Netlify Continuous Deployment [#342](https://github.com/jupyter/jupyter-book/pull/342) ([@emdupre](https://github.com/emdupre))

## Bugs fixed
* css for thebelab z-order [#386](https://github.com/jupyter/jupyter-book/pull/386) ([@choldgraf](https://github.com/choldgraf))
* fixing TOC auto gen bug [#375](https://github.com/jupyter/jupyter-book/pull/375) ([@choldgraf](https://github.com/choldgraf))
* fixing page path link [#368](https://github.com/jupyter/jupyter-book/pull/368) ([@choldgraf](https://github.com/choldgraf))
* fixing interact link bug [#367](https://github.com/jupyter/jupyter-book/pull/367) ([@choldgraf](https://github.com/choldgraf))
* Update required python version [#363](https://github.com/jupyter/jupyter-book/pull/363) ([@emdupre](https://github.com/emdupre))
* fix: fuzzy matching of jupyter book versions [#346](https://github.com/jupyter/jupyter-book/pull/346) ([@emdupre](https://github.com/emdupre))
* fixing scrolling [#336](https://github.com/jupyter/jupyter-book/pull/336) ([@choldgraf](https://github.com/choldgraf))

## Maintenance and upkeep improvements
* fixing load ntbk function [#385](https://github.com/jupyter/jupyter-book/pull/385) ([@choldgraf](https://github.com/choldgraf))
* load ntbk function [#384](https://github.com/jupyter/jupyter-book/pull/384) ([@choldgraf](https://github.com/choldgraf))
* moving CSS and JS generation to their own function [#381](https://github.com/jupyter/jupyter-book/pull/381) ([@choldgraf](https://github.com/choldgraf))
* making sure gemfile.lock is removed [#379](https://github.com/jupyter/jupyter-book/pull/379) ([@choldgraf](https://github.com/choldgraf))
* removing unnecessary requirements [#378](https://github.com/jupyter/jupyter-book/pull/378) ([@choldgraf](https://github.com/choldgraf))
* making toc gen sorted [#377](https://github.com/jupyter/jupyter-book/pull/377) ([@choldgraf](https://github.com/choldgraf))
* fixing up download functionality [#373](https://github.com/jupyter/jupyter-book/pull/373) ([@choldgraf](https://github.com/choldgraf))
* small refactoring of names and layout [#372](https://github.com/jupyter/jupyter-book/pull/372) ([@choldgraf](https://github.com/choldgraf))
* Bump rubyzip from 1.2.4 to 2.0.0 in /jupyter_book/book_template [#371](https://github.com/jupyter/jupyter-book/pull/371) ([@dependabot](https://github.com/dependabot))
* moving to jupyterbook.org [#370](https://github.com/jupyter/jupyter-book/pull/370) ([@choldgraf](https://github.com/choldgraf))
* inlining svgs and small tweaks [#369](https://github.com/jupyter/jupyter-book/pull/369) ([@choldgraf](https://github.com/choldgraf))
* [fix] update docker image and documentation [#364](https://github.com/jupyter/jupyter-book/pull/364) ([@emdupre](https://github.com/emdupre))
* moving js outside of _includes if not needed [#347](https://github.com/jupyter/jupyter-book/pull/347) ([@choldgraf](https://github.com/choldgraf))
* removing unnecessary clean_lines function [#345](https://github.com/jupyter/jupyter-book/pull/345) ([@choldgraf](https://github.com/choldgraf))
* modularizing the bage building and beefing up single page building [#344](https://github.com/jupyter/jupyter-book/pull/344) ([@choldgraf](https://github.com/choldgraf))

## Documentation improvements
* DOC: intro.md: Jupyter Books -> Jupyter Book [#383](https://github.com/jupyter/jupyter-book/pull/383) ([@westurner](https://github.com/westurner))

## Other merged PRs
* Update executing.ipynb [#350](https://github.com/jupyter/jupyter-book/pull/350) ([@psychemedia](https://github.com/psychemedia))
* adding better circle instructions [#341](https://github.com/jupyter/jupyter-book/pull/341) ([@choldgraf](https://github.com/choldgraf))
* cleaning up circle [#340](https://github.com/jupyter/jupyter-book/pull/340) ([@choldgraf](https://github.com/choldgraf))
* ghp-import in circle [#339](https://github.com/jupyter/jupyter-book/pull/339) ([@choldgraf](https://github.com/choldgraf))
* removing _build artifacts [#338](https://github.com/jupyter/jupyter-book/pull/338) ([@choldgraf](https://github.com/choldgraf))
* making some files optional in upgrade [#337](https://github.com/jupyter/jupyter-book/pull/337) ([@choldgraf](https://github.com/choldgraf))
* adding google analytics info [#335](https://github.com/jupyter/jupyter-book/pull/335) ([@choldgraf](https://github.com/choldgraf))
* updating changelog [#334](https://github.com/jupyter/jupyter-book/pull/334) ([@choldgraf](https://github.com/choldgraf))
* fixing releases info [#333](https://github.com/jupyter/jupyter-book/pull/333) ([@choldgraf](https://github.com/choldgraf))

# [v0.6.0](https://github.com/jupyter/jupyter-book/tree/v0.6.0) (2019-09-17)
[Full Changelog](https://github.com/jupyter/jupyter-book/compare/v0.5.2...v0.6.0)

**Implemented enhancements:**

- Improve the auto-TOC function [\#271](https://github.com/jupyter/jupyter-book/issues/271)
- Export pages to PDF [\#267](https://github.com/jupyter/jupyter-book/issues/267)
- Adding popouts to the right [\#266](https://github.com/jupyter/jupyter-book/issues/266)
- Add option to execute notebooks when building the book [\#234](https://github.com/jupyter/jupyter-book/issues/234)
- Add a footer for each page [\#233](https://github.com/jupyter/jupyter-book/issues/233)
- adding error message context to the build CLI command [\#320](https://github.com/jupyter/jupyter-book/pull/320) ([choldgraf](https://github.com/choldgraf))
- Wrap `jekyll-raw` cells with {% raw %} [\#308](https://github.com/jupyter/jupyter-book/pull/308) ([SamLau95](https://github.com/SamLau95))
- adding popout cell [\#302](https://github.com/jupyter/jupyter-book/pull/302) ([choldgraf](https://github.com/choldgraf))
- adding right toc showing when there's no sidebar content [\#300](https://github.com/jupyter/jupyter-book/pull/300) ([choldgraf](https://github.com/choldgraf))
- adding jupytext support [\#280](https://github.com/jupyter/jupyter-book/pull/280) ([choldgraf](https://github.com/choldgraf))
- adding print button [\#279](https://github.com/jupyter/jupyter-book/pull/279) ([choldgraf](https://github.com/choldgraf))
- Updating page layout and hoverable table of contents [\#278](https://github.com/jupyter/jupyter-book/pull/278) ([choldgraf](https://github.com/choldgraf))
- Add a hiding topbar w/ scroll [\#276](https://github.com/jupyter/jupyter-book/pull/276) ([choldgraf](https://github.com/choldgraf))
- Improving TOC functionality [\#273](https://github.com/jupyter/jupyter-book/pull/273) ([choldgraf](https://github.com/choldgraf))
- use celltagpreprocessor to remove parts of cells and updating running code module [\#264](https://github.com/jupyter/jupyter-book/pull/264) ([choldgraf](https://github.com/choldgraf))
- Create footer [\#254](https://github.com/jupyter/jupyter-book/pull/254) ([martinagvilas](https://github.com/martinagvilas))
- removing jekyll markdown templates [\#249](https://github.com/jupyter/jupyter-book/pull/249) ([choldgraf](https://github.com/choldgraf))
- adding simple page building [\#248](https://github.com/jupyter/jupyter-book/pull/248) ([choldgraf](https://github.com/choldgraf))
- HTML build step [\#239](https://github.com/jupyter/jupyter-book/pull/239) ([choldgraf](https://github.com/choldgraf))
- \[WIP\] Refactoring page layout + adding popouts and a topbar [\#169](https://github.com/jupyter/jupyter-book/pull/169) ([choldgraf](https://github.com/choldgraf))

**Fixed bugs:**

- Some small formatting issues following upgrade to master [\#296](https://github.com/jupyter/jupyter-book/issues/296)
- Make the PDF print work for MathJax math [\#285](https://github.com/jupyter/jupyter-book/issues/285)
- Code cells in plain Markdown files are rendered as raw text [\#283](https://github.com/jupyter/jupyter-book/issues/283)
- 'jupyter-book upgrade' deletes new references [\#261](https://github.com/jupyter/jupyter-book/issues/261)
- default book doesn't build properly on github - symlink error  [\#237](https://github.com/jupyter/jupyter-book/issues/237)
- Double check installation dependencies [\#211](https://github.com/jupyter/jupyter-book/issues/211)
- Don't use quotes for user-entered YAML entries [\#305](https://github.com/jupyter/jupyter-book/pull/305) ([SamLau95](https://github.com/SamLau95))
- Set a blank excerpt for all pages [\#303](https://github.com/jupyter/jupyter-book/pull/303) ([SamLau95](https://github.com/SamLau95))
- fixing footer width [\#301](https://github.com/jupyter/jupyter-book/pull/301) ([choldgraf](https://github.com/choldgraf))
- Use CDNs for JS libraries [\#292](https://github.com/jupyter/jupyter-book/pull/292) ([SamLau95](https://github.com/SamLau95))
- Load thebelab asynchronously [\#291](https://github.com/jupyter/jupyter-book/pull/291) ([SamLau95](https://github.com/SamLau95))
- Fix missing \</div\> if page.interact\_link is false [\#290](https://github.com/jupyter/jupyter-book/pull/290) ([SamLau95](https://github.com/SamLau95))
- fixing jupytext markdown inconsistencies [\#288](https://github.com/jupyter/jupyter-book/pull/288) ([choldgraf](https://github.com/choldgraf))
- fixing double math printing [\#286](https://github.com/jupyter/jupyter-book/pull/286) ([choldgraf](https://github.com/choldgraf))
- fixing up print functionality [\#284](https://github.com/jupyter/jupyter-book/pull/284) ([choldgraf](https://github.com/choldgraf))
- making a download PDF button appear on all pages [\#282](https://github.com/jupyter/jupyter-book/pull/282) ([choldgraf](https://github.com/choldgraf))
- fixing the TOC function [\#270](https://github.com/jupyter/jupyter-book/pull/270) ([choldgraf](https://github.com/choldgraf))
- \[FIX\] Fix references being deleted with jupyter-upgrade [\#263](https://github.com/jupyter/jupyter-book/pull/263) ([martinagvilas](https://github.com/martinagvilas))
- fixing links [\#260](https://github.com/jupyter/jupyter-book/pull/260) ([choldgraf](https://github.com/choldgraf))
- adding instructions for build [\#257](https://github.com/jupyter/jupyter-book/pull/257) ([choldgraf](https://github.com/choldgraf))
- fixing pypi description [\#256](https://github.com/jupyter/jupyter-book/pull/256) ([choldgraf](https://github.com/choldgraf))
- version fix [\#250](https://github.com/jupyter/jupyter-book/pull/250) ([choldgraf](https://github.com/choldgraf))

**Closed issues:**

- Jupyter Notebook can't close a running notebook [\#317](https://github.com/jupyter/jupyter-book/issues/317)
- Building book fails with a jinja2.exceptions.TemplateNotFound error [\#310](https://github.com/jupyter/jupyter-book/issues/310)
- serving non- md/ipynb content [\#295](https://github.com/jupyter/jupyter-book/issues/295)
- Broken links [\#259](https://github.com/jupyter/jupyter-book/issues/259)
- Missing file error [\#253](https://github.com/jupyter/jupyter-book/issues/253)
- Multicursor sometimes only deletes one line when there's spaces [\#251](https://github.com/jupyter/jupyter-book/issues/251)
- Release summary for v0.6 [\#331](https://github.com/jupyter/jupyter-book/issues/331)

**Merged pull requests:**

- fixing releases info [\#333](https://github.com/jupyter/jupyter-book/pull/333) ([choldgraf](https://github.com/choldgraf))
- dev0 bump [\#332](https://github.com/jupyter/jupyter-book/pull/332) ([choldgraf](https://github.com/choldgraf))
- bumping version for release [\#330](https://github.com/jupyter/jupyter-book/pull/330) ([choldgraf](https://github.com/choldgraf))
- fixing up execute docs [\#328](https://github.com/jupyter/jupyter-book/pull/328) ([choldgraf](https://github.com/choldgraf))
- updating documentation for build [\#326](https://github.com/jupyter/jupyter-book/pull/326) ([choldgraf](https://github.com/choldgraf))
- adding miniconda-based test [\#324](https://github.com/jupyter/jupyter-book/pull/324) ([choldgraf](https://github.com/choldgraf))
- removing outdated FAQ entry [\#319](https://github.com/jupyter/jupyter-book/pull/319) ([choldgraf](https://github.com/choldgraf))
- Changes to make work with `conda skeleton pypi jupyter-book` [\#315](https://github.com/jupyter/jupyter-book/pull/315) ([krinsman](https://github.com/krinsman))
- Update Docs to include alternative method for building Jekyll locally. [\#313](https://github.com/jupyter/jupyter-book/pull/313) ([krinsman](https://github.com/krinsman))
- Omit entries w/o URLs and external links from TOC [\#309](https://github.com/jupyter/jupyter-book/pull/309) ([SamLau95](https://github.com/SamLau95))
- documenting execution functionality [\#299](https://github.com/jupyter/jupyter-book/pull/299) ([choldgraf](https://github.com/choldgraf))
- adding beta label to features [\#294](https://github.com/jupyter/jupyter-book/pull/294) ([choldgraf](https://github.com/choldgraf))
- adding a sample CircleCI build config [\#293](https://github.com/jupyter/jupyter-book/pull/293) ([choldgraf](https://github.com/choldgraf))
- footer width [\#287](https://github.com/jupyter/jupyter-book/pull/287) ([choldgraf](https://github.com/choldgraf))
- adding help entries [\#277](https://github.com/jupyter/jupyter-book/pull/277) ([choldgraf](https://github.com/choldgraf))
- Circlecibot [\#269](https://github.com/jupyter/jupyter-book/pull/269) ([choldgraf](https://github.com/choldgraf))
- factoring out page module [\#265](https://github.com/jupyter/jupyter-book/pull/265) ([choldgraf](https://github.com/choldgraf))
- summary not large image for twitter [\#247](https://github.com/jupyter/jupyter-book/pull/247) ([choldgraf](https://github.com/choldgraf))
- twitter share [\#246](https://github.com/jupyter/jupyter-book/pull/246) ([choldgraf](https://github.com/choldgraf))
- updating changelog [\#245](https://github.com/jupyter/jupyter-book/pull/245) ([choldgraf](https://github.com/choldgraf))
- version bump to dev [\#243](https://github.com/jupyter/jupyter-book/pull/243) ([choldgraf](https://github.com/choldgraf))

# [v0.5.2](https://github.com/jupyter/jupyter-book/tree/v0.5.2) (2019-07-26)
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

# [v0.5](https://github.com/jupyter/jupyter-book/tree/v0.5) (2019-05-13)
[Full Changelog](https://github.com/jupyter/jupyter-book/compare/v0.4.1...v0.5)

**Implemented enhancements:**

- Markdown guide refers to Highlightjs but Rouge is used [\#183](https://github.com/jupyter/jupyter-book/issues/183)
- Get codecov working [\#153](https://github.com/jupyter/jupyter-book/issues/153)
- Add thebelab button to every code cell [\#117](https://github.com/jupyter/jupyter-book/issues/117)
- Add an option / config for analytics tracking? [\#115](https://github.com/jupyter/jupyter-book/issues/115)
- Add support for nbinteract [\#82](https://github.com/jupyter/jupyter-book/issues/82)
- Scrolling in subtitle column [\#173](https://github.com/jupyter/jupyter-book/issues/173)

**Fixed bugs:**

- Page turn links to external sites are broken [\#186](https://github.com/jupyter/jupyter-book/issues/186)
- Code cell pre-wrap causes split lines [\#182](https://github.com/jupyter/jupyter-book/issues/182)
- problems building with images [\#124](https://github.com/jupyter/jupyter-book/issues/124)
- Problems with local build instructions on Mac \(and perhaps other 'nix platforms\) [\#123](https://github.com/jupyter/jupyter-book/issues/123)

**Closed issues:**

- Plots not showing in ipynb files [\#179](https://github.com/jupyter/jupyter-book/issues/179)
- jupyter-book is missing from the binder requirements [\#166](https://github.com/jupyter/jupyter-book/issues/166)
- Binder and Thebelab not working for demo book [\#155](https://github.com/jupyter/jupyter-book/issues/155)
- Errors building HTML [\#152](https://github.com/jupyter/jupyter-book/issues/152)
- Non `--demo` option seems to fail [\#120](https://github.com/jupyter/jupyter-book/issues/120)
- Error on notebook.py with inconsistent  and DEFAULT\_STATIC\_FILES\_PATH. [\#108](https://github.com/jupyter/jupyter-book/issues/108)
- add requirements to setup.py [\#105](https://github.com/jupyter/jupyter-book/issues/105)
- Add a CONTRIBUTING.md  [\#99](https://github.com/jupyter/jupyter-book/issues/99)
- Explore using a cookiecutter for the site [\#87](https://github.com/jupyter/jupyter-book/issues/87)
- Use a Python CLI instead of Make [\#42](https://github.com/jupyter/jupyter-book/issues/42)
- Autogenerate toc [\#40](https://github.com/jupyter/jupyter-book/issues/40)
- Force permalinks to be lowercase and replace space and '\_' with '-' [\#35](https://github.com/jupyter/jupyter-book/issues/35)
- Extra buttons to support [\#32](https://github.com/jupyter/jupyter-book/issues/32)
- Use a submodule for notebooks folder [\#14](https://github.com/jupyter/jupyter-book/issues/14)
- Jupyter Book version v0.5 [\#175](https://github.com/jupyter/jupyter-book/issues/175)

**Merged pull requests:**

- Release [\#193](https://github.com/jupyter/jupyter-book/pull/193) ([choldgraf](https://github.com/choldgraf))
- Update local install instructions [\#190](https://github.com/jupyter/jupyter-book/pull/190) ([mwcraig](https://github.com/mwcraig))
- fixing some css bugs [\#188](https://github.com/jupyter/jupyter-book/pull/188) ([choldgraf](https://github.com/choldgraf))
- \[FIX\] Issue \#137 Errors when running on Windows [\#187](https://github.com/jupyter/jupyter-book/pull/187) ([stafforddavidj](https://github.com/stafforddavidj))
- fixing content root notebook problem [\#181](https://github.com/jupyter/jupyter-book/pull/181) ([choldgraf](https://github.com/choldgraf))
- wrap code even if it has no language [\#180](https://github.com/jupyter/jupyter-book/pull/180) ([alexmorley](https://github.com/alexmorley))
- removing custom TOC code [\#178](https://github.com/jupyter/jupyter-book/pull/178) ([choldgraf](https://github.com/choldgraf))
- Make right hand toc scrollable. [\#176](https://github.com/jupyter/jupyter-book/pull/176) ([alexmorley](https://github.com/alexmorley))
- adding cell tags metadata [\#171](https://github.com/jupyter/jupyter-book/pull/171) ([choldgraf](https://github.com/choldgraf))
- make sure jupyter-book is included in the binder build [\#167](https://github.com/jupyter/jupyter-book/pull/167) ([joergbrech](https://github.com/joergbrech))
- fixing thebelab css and splitting off the interactive notebooks [\#165](https://github.com/jupyter/jupyter-book/pull/165) ([choldgraf](https://github.com/choldgraf))
- \[ENH\] Add thebelab button to every code cell [\#163](https://github.com/jupyter/jupyter-book/pull/163) ([joergbrech](https://github.com/joergbrech))
- making tags for removing cells not text [\#162](https://github.com/jupyter/jupyter-book/pull/162) ([choldgraf](https://github.com/choldgraf))
- hide cells updates [\#161](https://github.com/jupyter/jupyter-book/pull/161) ([choldgraf](https://github.com/choldgraf))
- updating css to match input and output [\#160](https://github.com/jupyter/jupyter-book/pull/160) ([choldgraf](https://github.com/choldgraf))
- Update config.yml for code coverage [\#159](https://github.com/jupyter/jupyter-book/pull/159) ([choldgraf](https://github.com/choldgraf))
- codecov activation [\#158](https://github.com/jupyter/jupyter-book/pull/158) ([choldgraf](https://github.com/choldgraf))
- Update requirements.txt [\#157](https://github.com/jupyter/jupyter-book/pull/157) ([choldgraf](https://github.com/choldgraf))
- binder links to gh-pages now [\#156](https://github.com/jupyter/jupyter-book/pull/156) ([choldgraf](https://github.com/choldgraf))
- Fix broken notebook links [\#150](https://github.com/jupyter/jupyter-book/pull/150) ([mwcraig](https://github.com/mwcraig))
- fixing thebelab and circle build [\#149](https://github.com/jupyter/jupyter-book/pull/149) ([choldgraf](https://github.com/choldgraf))
- removing build folder [\#144](https://github.com/jupyter/jupyter-book/pull/144) ([choldgraf](https://github.com/choldgraf))
- maintaining docs for site structure [\#142](https://github.com/jupyter/jupyter-book/pull/142) ([choldgraf](https://github.com/choldgraf))
- Build update [\#135](https://github.com/jupyter/jupyter-book/pull/135) ([choldgraf](https://github.com/choldgraf))
- Release guide [\#131](https://github.com/jupyter/jupyter-book/pull/131) ([choldgraf](https://github.com/choldgraf))
- \[MRG\] Refactor argparse [\#129](https://github.com/jupyter/jupyter-book/pull/129) ([jasmainak](https://github.com/jasmainak))
- Add badge for coverage [\#128](https://github.com/jupyter/jupyter-book/pull/128) ([jasmainak](https://github.com/jasmainak))
- \[ENH\] Initial commit of dockerfile, updated docs [\#127](https://github.com/jupyter/jupyter-book/pull/127) ([emdupre](https://github.com/emdupre))
- MAINT: make jupyter-book conform to pep8 [\#126](https://github.com/jupyter/jupyter-book/pull/126) ([jasmainak](https://github.com/jasmainak))
- linking minimal folder [\#122](https://github.com/jupyter/jupyter-book/pull/122) ([choldgraf](https://github.com/choldgraf))
- adding nbinteract support [\#119](https://github.com/jupyter/jupyter-book/pull/119) ([choldgraf](https://github.com/choldgraf))
- update link of the markdown version of guide [\#118](https://github.com/jupyter/jupyter-book/pull/118) ([cnydw](https://github.com/cnydw))
- \[ENH\] add google analytics option [\#116](https://github.com/jupyter/jupyter-book/pull/116) ([joergbrech](https://github.com/joergbrech))
- improving the non-sidebar layout and toc script [\#112](https://github.com/jupyter/jupyter-book/pull/112) ([choldgraf](https://github.com/choldgraf))
- \[doc\] contributing guidelines [\#111](https://github.com/jupyter/jupyter-book/pull/111) ([emdupre](https://github.com/emdupre))
- Cssfix [\#109](https://github.com/jupyter/jupyter-book/pull/109) ([choldgraf](https://github.com/choldgraf))
- source dependencies from requirements.txt [\#106](https://github.com/jupyter/jupyter-book/pull/106) ([Zsailer](https://github.com/Zsailer))
- Adding download links for the notebook files [\#104](https://github.com/jupyter/jupyter-book/pull/104) ([choldgraf](https://github.com/choldgraf))
- fixing thebelab keyboard shortcuts behavior [\#103](https://github.com/jupyter/jupyter-book/pull/103) ([choldgraf](https://github.com/choldgraf))

# [v0.4.1](https://github.com/jupyter/jupyter-book/tree/v0.4.1) (2019-02-09)
[Full Changelog](https://github.com/jupyter/jupyter-book/compare/v0.2...v0.4.1)

**Closed issues:**

- Disappearing None [\#98](https://github.com/jupyter/jupyter-book/issues/98)
- Inquiry: Plotly interactive plots in a Jupyter Books? [\#93](https://github.com/jupyter/jupyter-book/issues/93)
- iframe not rendering [\#91](https://github.com/jupyter/jupyter-book/issues/91)
- thebelab uses the wrong kernel [\#90](https://github.com/jupyter/jupyter-book/issues/90)
- An option to embed a link on sidebar logo [\#77](https://github.com/jupyter/jupyter-book/issues/77)
- Scrollbar overlaps with TOC table \(on Linux\) [\#75](https://github.com/jupyter/jupyter-book/issues/75)
- Unwanted leading white space at the beginning of code block [\#73](https://github.com/jupyter/jupyter-book/issues/73)
- Standard badges rendering too big [\#65](https://github.com/jupyter/jupyter-book/issues/65)
- Give a shout-out to bookdown [\#63](https://github.com/jupyter/jupyter-book/issues/63)
- Make it clearer how to customize the look and feel of the site [\#61](https://github.com/jupyter/jupyter-book/issues/61)
- Recommend a way to make citations [\#60](https://github.com/jupyter/jupyter-book/issues/60)
- Highlight active section in right sidebar [\#55](https://github.com/jupyter/jupyter-book/issues/55)
- Allow people to put YAML in their content files [\#51](https://github.com/jupyter/jupyter-book/issues/51)
- Site Search [\#39](https://github.com/jupyter/jupyter-book/issues/39)
- Conversion from old system to new [\#37](https://github.com/jupyter/jupyter-book/issues/37)
- Support "versions" of a book [\#31](https://github.com/jupyter/jupyter-book/issues/31)
- Book is not rebuilding [\#29](https://github.com/jupyter/jupyter-book/issues/29)
- Feature request: right-side navbar auto-scroll [\#24](https://github.com/jupyter/jupyter-book/issues/24)
- generate\_summary\_from\_folders doesn't output prefixed numerals [\#23](https://github.com/jupyter/jupyter-book/issues/23)

**Merged pull requests:**

- fixing thebelab keyboard movement [\#102](https://github.com/jupyter/jupyter-book/pull/102) ([choldgraf](https://github.com/choldgraf))
- Styles [\#101](https://github.com/jupyter/jupyter-book/pull/101) ([choldgraf](https://github.com/choldgraf))
- Update FAQ with guidelines for Plotly [\#97](https://github.com/jupyter/jupyter-book/pull/97) ([mathieuboudreau](https://github.com/mathieuboudreau))
- set kernelOptions for thebelab based on notebook's metadata [\#92](https://github.com/jupyter/jupyter-book/pull/92) ([joergbrech](https://github.com/joergbrech))
- \[WIP\] adding a CLI to generate books [\#89](https://github.com/jupyter/jupyter-book/pull/89) ([choldgraf](https://github.com/choldgraf))
- Fix very small typo [\#88](https://github.com/jupyter/jupyter-book/pull/88) ([mwcraig](https://github.com/mwcraig))
- adding update instructions [\#86](https://github.com/jupyter/jupyter-book/pull/86) ([choldgraf](https://github.com/choldgraf))
- adding search functionality and external links in sidebar [\#85](https://github.com/jupyter/jupyter-book/pull/85) ([choldgraf](https://github.com/choldgraf))
- adding codemirror theme config [\#84](https://github.com/jupyter/jupyter-book/pull/84) ([choldgraf](https://github.com/choldgraf))
- ignoring gh-pages for circle [\#81](https://github.com/jupyter/jupyter-book/pull/81) ([choldgraf](https://github.com/choldgraf))
- transferring over book to new owner [\#80](https://github.com/jupyter/jupyter-book/pull/80) ([choldgraf](https://github.com/choldgraf))
- sidebar logo link [\#79](https://github.com/jupyter/jupyter-book/pull/79) ([choldgraf](https://github.com/choldgraf))
- improve codemirror syntax highlighting [\#78](https://github.com/jupyter/jupyter-book/pull/78) ([choldgraf](https://github.com/choldgraf))
- updating sidebar css to be more minimal [\#76](https://github.com/jupyter/jupyter-book/pull/76) ([choldgraf](https://github.com/choldgraf))
- Rebuild file if source file has a newer time stamp [\#74](https://github.com/jupyter/jupyter-book/pull/74) ([gaow](https://github.com/gaow))
- Deploy to github.io using circle and update docs to reflect this [\#69](https://github.com/jupyter/jupyter-book/pull/69) ([choldgraf](https://github.com/choldgraf))
- updating requirements for binder [\#67](https://github.com/jupyter/jupyter-book/pull/67) ([choldgraf](https://github.com/choldgraf))
- adding thebelab buttons and some other updates [\#66](https://github.com/jupyter/jupyter-book/pull/66) ([choldgraf](https://github.com/choldgraf))
- adding citations support [\#64](https://github.com/jupyter/jupyter-book/pull/64) ([choldgraf](https://github.com/choldgraf))
- adding collapsible code blocks [\#59](https://github.com/jupyter/jupyter-book/pull/59) ([choldgraf](https://github.com/choldgraf))
- highlighting to right menu bar [\#58](https://github.com/jupyter/jupyter-book/pull/58) ([choldgraf](https://github.com/choldgraf))
- updating install instructions to use conda [\#57](https://github.com/jupyter/jupyter-book/pull/57) ([choldgraf](https://github.com/choldgraf))
- adding ruby to circle [\#56](https://github.com/jupyter/jupyter-book/pull/56) ([choldgraf](https://github.com/choldgraf))
- Make the sidebar stay on the page during scroll [\#54](https://github.com/jupyter/jupyter-book/pull/54) ([ReventonC](https://github.com/ReventonC))
- adding mini module and yaml splitter [\#53](https://github.com/jupyter/jupyter-book/pull/53) ([choldgraf](https://github.com/choldgraf))
- adding a default license to the book [\#48](https://github.com/jupyter/jupyter-book/pull/48) ([choldgraf](https://github.com/choldgraf))
- fixing the internet js to not use jquery [\#47](https://github.com/jupyter/jupyter-book/pull/47) ([choldgraf](https://github.com/choldgraf))
- Delete duplicated link in readme [\#46](https://github.com/jupyter/jupyter-book/pull/46) ([consideRatio](https://github.com/consideRatio))
- Typo - does it matter? [\#45](https://github.com/jupyter/jupyter-book/pull/45) ([consideRatio](https://github.com/consideRatio))
- Fix broken links [\#44](https://github.com/jupyter/jupyter-book/pull/44) ([consideRatio](https://github.com/consideRatio))
- updating guide to latest version [\#43](https://github.com/jupyter/jupyter-book/pull/43) ([choldgraf](https://github.com/choldgraf))
- adding tests and some more command-line options [\#41](https://github.com/jupyter/jupyter-book/pull/41) ([choldgraf](https://github.com/choldgraf))
- Split requirements into build and run [\#36](https://github.com/jupyter/jupyter-book/pull/36) ([matthew-brett](https://github.com/matthew-brett))
- moving notebook images folder to build [\#34](https://github.com/jupyter/jupyter-book/pull/34) ([choldgraf](https://github.com/choldgraf))
- fixing interact link paths [\#33](https://github.com/jupyter/jupyter-book/pull/33) ([choldgraf](https://github.com/choldgraf))
- Refactor textbook generator to check redirects [\#27](https://github.com/jupyter/jupyter-book/pull/27) ([matthew-brett](https://github.com/matthew-brett))
- A blank target URL here would be nice. [\#15](https://github.com/jupyter/jupyter-book/pull/15) ([arokem](https://github.com/arokem))

# [v0.2](https://github.com/jupyter/jupyter-book/tree/v0.2) (2018-10-23)
[Full Changelog](https://github.com/jupyter/jupyter-book/compare/v0.1...v0.2)

**Closed issues:**

- Feature request: Search Bar [\#25](https://github.com/jupyter/jupyter-book/issues/25)

**Merged pull requests:**

- Update to new build system [\#30](https://github.com/jupyter/jupyter-book/pull/30) ([choldgraf](https://github.com/choldgraf))

# [v0.1](https://github.com/jupyter/jupyter-book/tree/v0.1) (2018-10-20)
**Closed issues:**

- Calling newer version of nbclean than is available on pypi [\#21](https://github.com/jupyter/jupyter-book/issues/21)
- Changing MathJax Size of only Blocks [\#19](https://github.com/jupyter/jupyter-book/issues/19)
- Change Color of Links [\#18](https://github.com/jupyter/jupyter-book/issues/18)
- Enhancements to pull from the DS100 textbook [\#17](https://github.com/jupyter/jupyter-book/issues/17)
- Hidden Code Blocks [\#13](https://github.com/jupyter/jupyter-book/issues/13)
- MathJax Rendering Issues [\#12](https://github.com/jupyter/jupyter-book/issues/12)
- Generate textbook not finding README.md [\#11](https://github.com/jupyter/jupyter-book/issues/11)
- Fork and clone may not be the best workflow [\#10](https://github.com/jupyter/jupyter-book/issues/10)

**Merged pull requests:**

- Fix dollar escapes at beginning of line [\#28](https://github.com/jupyter/jupyter-book/pull/28) ([matthew-brett](https://github.com/matthew-brett))
- Add pip requirements file [\#26](https://github.com/jupyter/jupyter-book/pull/26) ([matthew-brett](https://github.com/matthew-brett))
- Made textbook\_folder an optional input [\#22](https://github.com/jupyter/jupyter-book/pull/22) ([jmason86](https://github.com/jmason86))
- adding advanced section [\#16](https://github.com/jupyter/jupyter-book/pull/16) ([choldgraf](https://github.com/choldgraf))
- adding copy buttons [\#9](https://github.com/jupyter/jupyter-book/pull/9) ([choldgraf](https://github.com/choldgraf))
- fixing c3po [\#8](https://github.com/jupyter/jupyter-book/pull/8) ([choldgraf](https://github.com/choldgraf))
- adding intro material [\#7](https://github.com/jupyter/jupyter-book/pull/7) ([choldgraf](https://github.com/choldgraf))
- adding sidebar and header inferring [\#6](https://github.com/jupyter/jupyter-book/pull/6) ([choldgraf](https://github.com/choldgraf))
- image center and max width [\#5](https://github.com/jupyter/jupyter-book/pull/5) ([choldgraf](https://github.com/choldgraf))
- updating content width [\#4](https://github.com/jupyter/jupyter-book/pull/4) ([choldgraf](https://github.com/choldgraf))
- stylistic improvements to textbook setting [\#3](https://github.com/jupyter/jupyter-book/pull/3) ([choldgraf](https://github.com/choldgraf))
- updating chapter links [\#2](https://github.com/jupyter/jupyter-book/pull/2) ([choldgraf](https://github.com/choldgraf))
- Build missing files [\#1](https://github.com/jupyter/jupyter-book/pull/1) ([choldgraf](https://github.com/choldgraf))



\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*