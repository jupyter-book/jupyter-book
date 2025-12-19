---
title: jupyter-book v0.6.0
date: 2019-09-17
url: /release/v0.6.0
repository: jupyter-book
author: The Jupyter Book Team
tags:
  - release
---

{button}`Release Source <https://github.com/jupyter-book/jupyter-book/releases/tag/v0.6.0>`

# [v0.6.0](https://github.com/jupyter/jupyter-book/tree/v0.6.0) (2019-09-17)
[Full Changelog](https://github.com/jupyter/jupyter-book/compare/v0.5.2...v0.6.0)

## Major changes

This version of Jupyter Book contains several major enhancements to the book's
build process and layout. Here as some major highlights:

### Page build process

When you run `jupyter-book build`, your pages will now be converted into **HTML**
instead of Jekyll Markdown. This uses `nbconvert` under the hood, and should make
behavior more consistent (and less-dependent on Jekyll's specific markdown flavor, Kramdown).
This will also make it easier to build individual page HTML without requiring a full book.

### Page layout enhancements.

There are a number of enhancements to the layout of each page of the book.
The topbar is now sticky, and uses whitespace more effectively. In addition, the
right TOC will now only show up when the page is wide enough, and let the user
hover over it to see the page's TOC content on narrower screens.

![ag6EmkYWp0](https://user-images.githubusercontent.com/1839645/65084725-ff033980-d960-11e9-8e7c-7597f838ee68.gif)

### Jupytext integration

✨✨experimental✨✨

Jupyter Book can now build page HTML from **Jupytext text files**. This allows
you to store your book content in plain text and convert into Jupyter Notebooks
and page HTML at build time. See the [documentation on using jupytext](https://jupyter.org/jupyter-book/features/jupytext.html)
for more information.

### PDF downloads

There's now a button that uses `PrintJS` to download a PDF version of each
page of your book. This will let readers download content offline and
read on their own.

![image](https://user-images.githubusercontent.com/1839645/65084629-9ae07580-d960-11e9-8953-ac1c4c6f1e3b.png)

### TOC auto-generation

We've improved the auto-generation of the Table of Contents for a folder
of book content. This should make it easier to quickly get started 
generating a TOC file for your Jupyter Book.

### Popouts and full-width cells

There are now two different kinds of cell layouts. **popouts** will
be placed to the right of your book content. This allows you to call out
information without disrupting the narrative flow of your page. **full-width**
cells will take up a larger width on the page, causing the reader to focus on
this information. This makes it easier to highlight wide-form visual content.
Here are a few examples of this, you can [find out more on the layouts documentation](https://jupyter.org/jupyter-book/features/layout.html)

![image](https://user-images.githubusercontent.com/1839645/65084524-5523ad00-d960-11e9-85de-b96b507d6b3e.png)


### Footers

You can now add a configurable footer to each page of your book! You can
do so from the `footer_text` field in the `config.yml` file for your book.

![image](https://user-images.githubusercontent.com/1839645/65084503-40dfb000-d960-11e9-90f5-e5efbf9e3dd5.png)

## PRs and Issues

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
