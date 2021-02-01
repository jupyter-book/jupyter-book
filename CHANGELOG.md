# Change Log

## v0.10.0 2021-02-01

[full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.9.1...d3c78097edda4fefb672e32344c3806c9cdc7a72) | [GitHub contributors page for this release](https://github.com/executablebooks/jupyter-book/graphs/contributors?from=2020-12-22&to=2021-01-30&type=c)

This update focuses on new syntax features for MyST markdown, as well as a new configuration to enable MyST extensions. See below for more details.

### New

**MyST Parser version 0.13.x**
: The MyST-NB and MyST-parser have both been upgraded.
  This comes with support for new syntax and a new configuration mechanism (see below for some examples).

  See [the myst-parser changelog](https://myst-parser.readthedocs.io/en/latest/develop/_changelog.html#id4) for more information about the syntax additions.

**New `myst` extension configuration**
: The `myst_extended_syntax` configuration is **now deprecated**, in lieu of a more flexible extension mechanism.
  You may now enable individual `myst` extensions by adding them to the following section of your `_config.yml` file:
  ```yaml
  parse:
    myst_enable_extensions:
      - <list-of-extensions>
  ```
  See [](content-blocks:myst-extensions) for more information.

**Citations and references configuration**
: This version comes with a version bump to `sphinxcontrib.bibtex v2.1.*`. This introduces new configuration for connecting your bibfiles (no longer using the bibliography directive), and makes the citation resolution process much more stable and dependable.
  See [](content:citations) for more information, and the [`sphinxcontrib.bibtex` documentation](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/) for more information about updates in the latest version.

**TOC depth numbering**.
: You can now set the depth of numbering (e.g., 3.2 vs. 3.2.1) via the the `numbered` flag in your Table of Contents.


### New MyST syntax

**MyST Markdown substitutions**
: Substitutions allow you to define **variables** in markdown, and insert them elsewhere in your document.
  This lets you change the variable value and have it automatically update throughout your book.
  This is **on by default**.
  See [](content:substitutions) for more information.

**Automatic HTML links**
: The `linkify` extension will automatically identify “bare” web URLs, like `www.example.com`,  and add hyperlinks; www.example.com.
  This extension is **on by default**.

**Smart Quotes**
: The `smartquotes` extension will automatically convert standard quotations to their opening/closing variants:

  - `'single quotes'`: ‘single quotes’
  - `"double quotes"`:  “double quotes”

  This extension is **off by default**.
  See [](myst-parser:syntax/typography) for more details.

**Typography replacements for common characters**
: The `replacements` extension will automatically convert some common typographic texts, such as `+-` -> `±`.
  This extension is **off by default**.
  See [](myst-parser:syntax/typography) for more details.

**HTML admonitions**
: By adding `"html_admonition"` to `myst_enable_extensions`, you can enable parsing of `<div class="admonition">` HTML blocks to sphinx admonitions.
  This is helpful when you care about viewing the "source" Markdown, such as in Jupyter Notebooks.
  For example:
  ```html
  <div class="admonition note" name="html-admonition">
  <p class="title">This is the **title**</p>
  This is the *content*
  </div>
  ```
  See [](content-blocks:html-admonitions) for further information.
  This extension is **off by default**.

### Deprecations

**Colon fences now behave like directives**
: The `colon_fence` extension (replacing `admonition_enable`) now works exactly the same as normal ```` ``` ```` code fences, but using `:::` delimiters.
  This is helpful for directives that contain Markdown text, for example:

  ```md
  :::{admonition} The title
  :class: note

  This note contains *Markdown*
  :::
  ```

**`myst_extended_syntax` is deprecated**
: See above for new configuration details.

**Bibliographies no longer use a path to a bibtex file**.
: See above for new configuration details.

## v0.9.1 2020-12-22

This is a minor release to issue `v0.9` to PyPI and updates a broken link that prohibited the `v0.9.0` PyPI release action.

## v0.9.0 2020-12-09

([full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.8.3...6c30f554d86fe7d1a0e4ad05012a5de4133117d0))

This release includes a number of new features, improvements and bug fixes. There is also a new [gallery of jupyter-book projects](https://executablebooks.org/en/latest/gallery.html) available.

### New

* 👌 IMPROVE: Option to exclude every file not in the toc. ([docs](docs/customize/config.md), [#1123](https://github.com/executablebooks/jupyter-book/pull/1123), [@alex-treebeard](https://github.com/alex-treebeard))
*  ✨ NEW: Enable the use of local Sphinx extension via _config.yml. ([docs](docs/customize/config.md), [#1102](https://github.com/executablebooks/jupyter-book/pull/1102), [@mmcky](https://github.com/mmcky))
* ✨ NEW: Enable custom builder passthrough. This is an **advanced feature**
  that enables the use of additional sphinx builders via jupyter-book that may be provided by an extension. ([docs](docs/advanced/advanced.md), [#1094]([#1094](https://github.com/executablebooks/jupyter-book/pull/1094)), [@mmcky](https://github.com/mmcky))

**HTML:**

* 👌 NEW: Add `dirhtml` builder. This enables the use
  of the `dirhtml` sphinx builder when using jupyter book. ([docs](docs/start/build.md), [#1092](https://github.com/executablebooks/jupyter-book/pull/1092), [@choldgraf](https://github.com/choldgraf))

**LaTeX:**

* ✨ NEW: Add `--individualpages` option for pdflatex builder.
  This option enables building individual (pdflatex) files for each page of the project. **Note:** Further work is ongoing to improve the styling and formatting of pdflatex output.
  ([docs](docs/advanced/pdf.md), [#944](https://github.com/executablebooks/jupyter-book/pull/944), [@mmcky](https://github.com/mmcky))

### Maintain

* 🔧 MAINTAIN: Pin sphinxcontrib-bibtex to ~=1.0 until compatible with recently released v2 ([#1138](https://github.com/executablebooks/jupyter-book/pull/1138), [@choldgraf](https://github.com/choldgraf))

### Upgrades

* ⬆ UPGRADE: sphinx-book-theme v0.0.39 ([#1086](https://github.com/executablebooks/jupyter-book/pull/1086), [@choldgraf](https://github.com/choldgraf))

### Bugs fixed

* 🐛 FIX: Check for file extensions when generating toc. ([#1108](https://github.com/executablebooks/jupyter-book/pull/1108), [@AakashGfude](https://github.com/AakashGfude))
* 🐛 FIX: Export Notebook as HTML with no page-breaks. ([#903](https://github.com/executablebooks/jupyter-book/pull/903), [@AakashGfude](https://github.com/AakashGfude))
* 🐛 FIX: Restore linkcheck to builder opts ([#1051](https://github.com/executablebooks/jupyter-book/pull/1051), [@fmaussion](https://github.com/fmaussion))

### Deprecated

* 🗑 DEPRECATE: removing expand_sections for toc as it is deprecated in `sphinx-book-theme`. ([#1073](https://github.com/executablebooks/jupyter-book/pull/1073), [@choldgraf](https://github.com/choldgraf))


## v0.8.3 2020-10-12

This is a relatively minor release with bugfixes and under-the-hood improvements.

### Bugs fixed

* 🐛 FIX: colab default is now empty [#1026](https://github.com/executablebooks/jupyter-book/pull/1026) ([@choldgraf](https://github.com/choldgraf))

### Upgrade EBT dependencies

* ⬆️ Update sphinx-book-theme v0.0.38 [#1047](https://github.com/executablebooks/jupyter-book/pull/1047) ([@choldgraf](https://github.com/choldgraf))
* ⬆️ Update sphinx-panels pinning v0.5.2 [#1044](https://github.com/executablebooks/jupyter-book/pull/1044) ([@chrisjsewell](https://github.com/chrisjsewell))


## v0.8.2 2020-09-19

([full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.8.1...879a2d4133db58a636655e08323cd98609cefcb4))

### Improved

`sphinx-panels` version bump to v0.5, which adds several new content blocks
including `{tabbed}` content. [#972](https://github.com/executablebooks/jupyter-book/pull/972)


## v0.8.1 2020-09-09

### New ✨

Add `jupyter-book create --cookiecutter` (thanks to [@TomasBeuzen](https://github.com/TomasBeuzen))
: This adds a `--cookiecutter` option to `jb create`, to allow users to use the [Jupyter Book cookiecutter](https://github.com/executablebooks/cookiecutter-jupyter-book) to create a book template.

  The cookiecutter is suitable for more advanced users that want to create a ready-to-go repository to host their book that includes pre-populated metafiles such as README, LICENSE, CONDUCT, CONTRIBUTING, etc., as well as GitHub Actions workflow files.

### Fixes 🐛

This release contains numerous improvements, to the documentation and code, to address issues noted by you guys:

- Fix issues with single document builds (e.g. pdflatex) and relative path resolutions
- Ensure `sphinx-book-theme` is loaded on PDF builds (to allow the use of the `margin` directive)
- Allow execution `timeout: -1` and `execute_notebooks: off` to be valid in the `_config.yml`

## v0.8.0 2020-09-01

([full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.7.5...v0.8.0))

> **You spoke, we listened!**

Version 0.8.0 of Jupyter Book, incorporates a bottom-up refresh of the entire Executable Books Project (EBP) stack,
with tonnes of bugs fixes, improvements and new features 🎉

The documentation describes all this new functionality in full detail, but below we shall try to outline the major changes and additions.

### Breaking ‼️

The `jupyter-book`/`jb` executable should work almost identically to in v0.7.5, and all existing books will generally build as before (open an issue if not!).

The key change is that `jupyter-book page` is no longer available.
Instead you can now pass a single file path to `jupyter-book build`, as opposed to a directory, and it will build your single page (thanks to [@AakashGfude](https://github.com/AakashGfude)).
See [Build a standalone page](docs/start/build.md).

Another thing to note, is that if you are using "bare" LaTeX math in your documentation,
then this will only render if you activate in your `_config.yml`:

```yaml
parse:
  myst_extended_syntax: true
```

See [the math documentation](docs/content/math.md) for details.

### New and Improved ✨👌

Jupyter Book v0.8 incorporates all the great new features available by moving from:

* MyST-Parser v0.9 to v0.12 (see its [CHANGELOG.md](https://github.com/executablebooks/MyST-Parser/blob/master/CHANGELOG.md))
* MyST-NB v0.8 to v0.10 (see its [CHANGELOG.md](https://github.com/executablebooks/MyST-NB/blob/master/CHANGELOG.md))
* This also enabled, Sphinx v2 to v3

Here's the headlines:

Windows support
: Continuous Integration (CI) testing is now run against Windows OS throughout the EBP stack.
  The fixes this entailed, mean that Jupyter Book can now be run on Windows with minimal issue (see [Working on Windows](docs/advanced/advanced.md))

Extended "Markdown friendly" syntaxes
: MyST Markdown directives offer a high degree of extensibility, to add all the features we might need to create a scientific document.
  However, they are not (yet) very well integrated with external editors, like the Jupyter Notebook interface.
  Extended syntax parsing to the rescue!

  By enabling in your `_config.yaml`:

  ```yaml
  parse:
    myst_extended_syntax: true
  ```

  You can access to a number of *Markdown friendly* syntaxes, which extend the [CommonMark specification](https://commonmark.org/):

  * `:::` fenced admonitions render Markdown as standard (see [new style admonitions](docs/content/content-blocks.md)).
  * HTML images are correctly handled, allowing for control of size and style attributes,
    and Markdown style figures extend this for captions and referencing (see [images and figures](docs/content/figures.md)).
  * Definition lists are what you see here and provide a simple format for writing term/definition blocks (see [definition lists](docs/content/content-blocks.md)).
  * LaTeX math is now intrinsically supported,
    meaning that it will rendered correctly in both HTML and LaTeX/PDF outputs (see [math and equations](docs/content/math.md)).

Custom Notebook Formats
: Want to write your notebooks as RMarkdown, Python files, ....?
  Jupyter Book now supports linking any file extension to a custom conversion function,
  run before notebook execution and parsing.
  See the [custom notebook formats and Jupytext](docs/file-types/jupytext.Rmd) documentation, which itself is written in RMarkdown!

Execution Configuration
: Execution and caching of notebook outputs has been improved, to make it more consistent across `auto` and `cache` methods (`cache` execution is now also run in the notebook directory) and provide numerous configuration options, including:

  * Running the execution in the local directory or in a temporary directory.
  * Setting the execution timeout limit, at a global or notebook level.
  * Allowing errors across all notebooks, or at a notebook or cell level.
  * Removing stderr/stdout outputs or logging warnings when they are encountered
  * A directive for displaying execution statistics for all notebooks in the book (status, run time, etc)

  See the [execution documentation](docs/content/execute.md) for more details.

Code Output Formatting
: More cell outputs are handled, including Markdown and ANSI outputs,
  and you can use cell metadata to set image size, style, captions and references.
  See [formatting code outputs](docs/content/code-outputs.md).

Build options and error reporting
: The `jupyter-book build` command includes additional options/flags for controlling the build behaviour,
  such as verbose (`-v`), quiet (`-q`) and nitpick mode for checking references (`-n`).
  See the [command-line interface documentation](docs/reference/cli.md) for more details.

sphinx-panels integration
: The [sphinx-panels](https://sphinx-panels.readthedocs.io) package is now provided directly in the Jupyter Book distribution.
  This adds additional functionality for creating web based elements, such as gridded panels and dropdown boxes.
  See the [Panels and Dropdowns](docs/content/content-blocks.md) section for details.

### Fixes 🐛

Among the numerous fixes:

* Code cell syntax highlighting now works for all Jupyter kernels.
* User configuration is now recursively merged with the default configuration, and no longer overwrites an entire nested section.
  You can also use `jb config sphinx mybookname/` to inspect the sphinx `conf.py` which will be parsed to the builder.

### More to come 👀

We have many more improvements planned, check back in this change log for future improvements.

Also please continue to provide us feedback on what you would like to see next.
See our [voting for new features](https://executablebooks.org/en/latest/feature-vote.html) page.

## v0.7.5 2020-08-26

✨ NEW: This release introduces the new "Comments and Annotations" feature, powered by [sphinx-comments](https://github.com/executablebooks/sphinx-comments). See [this documentation section](https://jupyterbook.org/interactive/comments.html) for further details.

**Important:** this version also pins the `myst-nb` dependency to v0.8.
Previous versions erroneously allow for the new v0.9, which is not yet strictly compatible with jupyter-book (coming very soon!)

## v0.7.0...v0.7.4

([full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.7.5...v0.8.0))


### Enhancements made
* ✨ NEW: Adding - chapter entries to _toc.yml [#817](https://github.com/executablebooks/jupyter-book/pull/817) ([@choldgraf](https://github.com/choldgraf))
* checking for toc modification time [#772](https://github.com/executablebooks/jupyter-book/pull/772) ([@choldgraf](https://github.com/choldgraf))
* first pass toc directive [#757](https://github.com/executablebooks/jupyter-book/pull/757) ([@choldgraf](https://github.com/choldgraf))

### Bugs fixed 🐛

* Fix typo in content-blocks.md documentation [#811](https://github.com/executablebooks/jupyter-book/pull/811) ([@MaxGhenis](https://github.com/MaxGhenis))
* Using relative instead of absolute links [#747](https://github.com/executablebooks/jupyter-book/pull/747) ([@AakashGfude](https://github.com/AakashGfude))
* Fixing jupytext install/UI links [#737](https://github.com/executablebooks/jupyter-book/pull/737) ([@chrisjsewell](https://github.com/chrisjsewell))

### Documentation improvements 📚

* Note about licenses [#806](https://github.com/executablebooks/jupyter-book/pull/806) ([@choldgraf](https://github.com/choldgraf))
* Fix google analytics instructions [#799](https://github.com/executablebooks/jupyter-book/pull/799) ([@tobydriscoll](https://github.com/tobydriscoll))
* Change book_path to path_to_book [#773](https://github.com/executablebooks/jupyter-book/pull/773) ([@MaxGhenis](https://github.com/MaxGhenis))
* GitHub actions example: note about selective build [#771](https://github.com/executablebooks/jupyter-book/pull/771) ([@consideRatio](https://github.com/consideRatio))
* getting sphinx thebelab to work [#749](https://github.com/executablebooks/jupyter-book/pull/749) ([@choldgraf](https://github.com/choldgraf))
* Link documentation for adding cell tags in Jupyter from "Hide or remove content" documentation section [#734](https://github.com/executablebooks/jupyter-book/pull/734) ([@MaxGhenis](https://github.com/MaxGhenis))
* Typo fix [#731](https://github.com/executablebooks/jupyter-book/pull/731) ([@MaxGhenis](https://github.com/MaxGhenis))
* reworking interactive docs [#725](https://github.com/executablebooks/jupyter-book/pull/725) ([@choldgraf](https://github.com/choldgraf))
* Add documentation for Google Colab launch buttons [#721](https://github.com/executablebooks/jupyter-book/pull/721) ([@lewtun](https://github.com/lewtun))
* Add note about int eq labels in math directive [#720](https://github.com/executablebooks/jupyter-book/pull/720) ([@najuzilu](https://github.com/najuzilu))

### API Changes

* ✨ NEW: Adding - chapter entries to _toc.yml [#817](https://github.com/executablebooks/jupyter-book/pull/817) ([@choldgraf](https://github.com/choldgraf))
* removing config file numbered sections to use toc file instead [#768](https://github.com/executablebooks/jupyter-book/pull/768) ([@choldgraf](https://github.com/choldgraf))

### Other merged PRs

* 📚 DOCS: Remove Issue Templates [#849](https://github.com/executablebooks/jupyter-book/pull/849) ([@chrisjsewell](https://github.com/chrisjsewell))
* 📚 DOC: document available bib styles [#845](https://github.com/executablebooks/jupyter-book/pull/845) ([@emdupre](https://github.com/emdupre))
* 🐛 FIX: fixing toctree spacing bug [#836](https://github.com/executablebooks/jupyter-book/pull/836) ([@choldgraf](https://github.com/choldgraf))
* 👌 IMPROVE: chapters -> parts in toc [#834](https://github.com/executablebooks/jupyter-book/pull/834) ([@choldgraf](https://github.com/choldgraf))
* 📚 DOCS: adding information about page structure [#830](https://github.com/executablebooks/jupyter-book/pull/830) ([@choldgraf](https://github.com/choldgraf))
* 🐛 FIX: fixing chapters numbering [#829](https://github.com/executablebooks/jupyter-book/pull/829) ([@choldgraf](https://github.com/choldgraf))
* 👌 IMPROVE: improving numbered sections [#826](https://github.com/executablebooks/jupyter-book/pull/826) ([@choldgraf](https://github.com/choldgraf))
* 📚 DOC: update gh-pages + ghp-import docs [#814](https://github.com/executablebooks/jupyter-book/pull/814) ([@TomasBeuzen](https://github.com/TomasBeuzen))
* page index [#728](https://github.com/executablebooks/jupyter-book/pull/728) ([@choldgraf](https://github.com/choldgraf))
* fix windows utf8 encoding  1/3 [#719](https://github.com/executablebooks/jupyter-book/pull/719) ([@phaustin](https://github.com/phaustin))

### Contributors to this release
([GitHub contributors page for this release](https://github.com/executablebooks/jupyter-book/graphs/contributors?from=2020-06-11&to=2020-08-05&type=c))

[@AakashGfude](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AAakashGfude+updated%3A2020-06-11..2020-08-05&type=Issues) | [@amueller](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aamueller+updated%3A2020-06-11..2020-08-05&type=Issues) | [@bmcfee](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Abmcfee+updated%3A2020-06-11..2020-08-05&type=Issues) | [@brian-rose](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Abrian-rose+updated%3A2020-06-11..2020-08-05&type=Issues) | [@cedeerwe](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acedeerwe+updated%3A2020-06-11..2020-08-05&type=Issues) | [@choldgraf](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acholdgraf+updated%3A2020-06-11..2020-08-05&type=Issues) | [@chrisjsewell](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Achrisjsewell+updated%3A2020-06-11..2020-08-05&type=Issues) | [@codecov](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acodecov+updated%3A2020-06-11..2020-08-05&type=Issues) | [@consideRatio](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AconsideRatio+updated%3A2020-06-11..2020-08-05&type=Issues) | [@cpjobling](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acpjobling+updated%3A2020-06-11..2020-08-05&type=Issues) | [@drscotthawley](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Adrscotthawley+updated%3A2020-06-11..2020-08-05&type=Issues) | [@emdupre](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aemdupre+updated%3A2020-06-11..2020-08-05&type=Issues) | [@firasm](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Afirasm+updated%3A2020-06-11..2020-08-05&type=Issues) | [@jni](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajni+updated%3A2020-06-11..2020-08-05&type=Issues) | [@jstac](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajstac+updated%3A2020-06-11..2020-08-05&type=Issues) | [@lewtun](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Alewtun+updated%3A2020-06-11..2020-08-05&type=Issues) | [@MaxGhenis](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AMaxGhenis+updated%3A2020-06-11..2020-08-05&type=Issues) | [@mmcky](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ammcky+updated%3A2020-06-11..2020-08-05&type=Issues) | [@najuzilu](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Anajuzilu+updated%3A2020-06-11..2020-08-05&type=Issues) | [@nathancarter](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Anathancarter+updated%3A2020-06-11..2020-08-05&type=Issues) | [@phaustin](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aphaustin+updated%3A2020-06-11..2020-08-05&type=Issues) | [@ptcane](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aptcane+updated%3A2020-06-11..2020-08-05&type=Issues) | [@samteplitzky](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Asamteplitzky+updated%3A2020-06-11..2020-08-05&type=Issues) | [@tobydriscoll](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Atobydriscoll+updated%3A2020-06-11..2020-08-05&type=Issues) | [@TomasBeuzen](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3ATomasBeuzen+updated%3A2020-06-11..2020-08-05&type=Issues) | [@welcome](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Awelcome+updated%3A2020-06-11..2020-08-05&type=Issues)


## v0.6.4...v0.7.0
([full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.6.4...v0.7.0))


### Merged PRs
* Release prep [#711](https://github.com/executablebooks/jupyter-book/pull/711) ([@choldgraf](https://github.com/choldgraf))
* fixing topbar repo buttons [#710](https://github.com/executablebooks/jupyter-book/pull/710) ([@choldgraf](https://github.com/choldgraf))
* [DOC] Add info about 'remove_cell' tag [#708](https://github.com/executablebooks/jupyter-book/pull/708) ([@najuzilu](https://github.com/najuzilu))
* [DOC] Fix broken Jupytext link [#703](https://github.com/executablebooks/jupyter-book/pull/703) ([@najuzilu](https://github.com/najuzilu))
* misc doc improvements [#702](https://github.com/executablebooks/jupyter-book/pull/702) ([@choldgraf](https://github.com/choldgraf))
* fixing toc bug [#696](https://github.com/executablebooks/jupyter-book/pull/696) ([@choldgraf](https://github.com/choldgraf))
* [DOC, ENH] Shorten descriptions of clean and toc functions [#693](https://github.com/executablebooks/jupyter-book/pull/693) ([@pgadige](https://github.com/pgadige))
* execution error doc [#691](https://github.com/executablebooks/jupyter-book/pull/691) ([@choldgraf](https://github.com/choldgraf))
* [DOC] Fix rendering of subitems in ordered list [#686](https://github.com/executablebooks/jupyter-book/pull/686) ([@najuzilu](https://github.com/najuzilu))
* adding configuration for source buttons [#684](https://github.com/executablebooks/jupyter-book/pull/684) ([@choldgraf](https://github.com/choldgraf))
* adding versions [#679](https://github.com/executablebooks/jupyter-book/pull/679) ([@choldgraf](https://github.com/choldgraf))
* ENH: Modify execute option for jb page command (#594 followup) [#678](https://github.com/executablebooks/jupyter-book/pull/678) ([@rossbar](https://github.com/rossbar))
* fixing suffix in download files [#656](https://github.com/executablebooks/jupyter-book/pull/656) ([@choldgraf](https://github.com/choldgraf))
* config defaults [#654](https://github.com/executablebooks/jupyter-book/pull/654) ([@choldgraf](https://github.com/choldgraf))
* Additional latex newcommand example [#652](https://github.com/executablebooks/jupyter-book/pull/652) ([@najuzilu](https://github.com/najuzilu))
* How to reference docs and section labels [#651](https://github.com/executablebooks/jupyter-book/pull/651) ([@najuzilu](https://github.com/najuzilu))
* TST: minor update to reference book.pdf rather than python.pdf [#650](https://github.com/executablebooks/jupyter-book/pull/650) ([@mmcky](https://github.com/mmcky))
* improving configuration under the hood [#647](https://github.com/executablebooks/jupyter-book/pull/647) ([@choldgraf](https://github.com/choldgraf))
* draft windows instructions [#642](https://github.com/executablebooks/jupyter-book/pull/642) ([@phaustin](https://github.com/phaustin))
* [DOC] MyST cheat sheet documentation [#637](https://github.com/executablebooks/jupyter-book/pull/637) ([@najuzilu](https://github.com/najuzilu))
* TST: [pdflatex] Add build of quantecon-mini-example as a project style test case  [#636](https://github.com/executablebooks/jupyter-book/pull/636) ([@mmcky](https://github.com/mmcky))
* TST: Fix test_pdf failure. [#633](https://github.com/executablebooks/jupyter-book/pull/633) ([@rossbar](https://github.com/rossbar))
* Minor update for the extra-navbar section in advanced.md [#631](https://github.com/executablebooks/jupyter-book/pull/631) ([@malvikasharan](https://github.com/malvikasharan))
* TST: update testing requirements and adjust ignore [#626](https://github.com/executablebooks/jupyter-book/pull/626) ([@mmcky](https://github.com/mmcky))
* bump peaceiris/actions-gh-pages to v3.6.1 [#625](https://github.com/executablebooks/jupyter-book/pull/625) ([@peaceiris](https://github.com/peaceiris))
* documenting directive keywords better [#623](https://github.com/executablebooks/jupyter-book/pull/623) ([@choldgraf](https://github.com/choldgraf))
* clarifying config values [#622](https://github.com/executablebooks/jupyter-book/pull/622) ([@choldgraf](https://github.com/choldgraf))
* add tex macro documentation [#618](https://github.com/executablebooks/jupyter-book/pull/618) ([@najuzilu](https://github.com/najuzilu))
* fixing docs bug in template [#617](https://github.com/executablebooks/jupyter-book/pull/617) ([@choldgraf](https://github.com/choldgraf))
* FIX: fix bug when latex config not specified in project for "latex_documents" [#614](https://github.com/executablebooks/jupyter-book/pull/614) ([@mmcky](https://github.com/mmcky))
* adding extra footer docs [#611](https://github.com/executablebooks/jupyter-book/pull/611) ([@choldgraf](https://github.com/choldgraf))
* nesting notes [#599](https://github.com/executablebooks/jupyter-book/pull/599) ([@choldgraf](https://github.com/choldgraf))
* docs update [#597](https://github.com/executablebooks/jupyter-book/pull/597) ([@choldgraf](https://github.com/choldgraf))
* updating docs and fixing single page bug [#592](https://github.com/executablebooks/jupyter-book/pull/592) ([@choldgraf](https://github.com/choldgraf))
* add html section to tip about navbar_number_sections [#590](https://github.com/executablebooks/jupyter-book/pull/590) ([@amueller](https://github.com/amueller))
* adding custom css and js and updating docs [#583](https://github.com/executablebooks/jupyter-book/pull/583) ([@choldgraf](https://github.com/choldgraf))
* Devdocs [#581](https://github.com/executablebooks/jupyter-book/pull/581) ([@choldgraf](https://github.com/choldgraf))
* [DOC] fix contrib link in readme [#577](https://github.com/executablebooks/jupyter-book/pull/577) ([@amueller](https://github.com/amueller))
* Document use of pure html [#576](https://github.com/executablebooks/jupyter-book/pull/576) ([@joergbrech](https://github.com/joergbrech))
* add no_title argument to toc [#571](https://github.com/executablebooks/jupyter-book/pull/571) ([@amueller](https://github.com/amueller))
* instructions for toggle and toc docs [#570](https://github.com/executablebooks/jupyter-book/pull/570) ([@choldgraf](https://github.com/choldgraf))
* DOC: A few documentation fix-ups [#569](https://github.com/executablebooks/jupyter-book/pull/569) ([@rossbar](https://github.com/rossbar))
* add ticks to execute_notebooks: off in docs [#568](https://github.com/executablebooks/jupyter-book/pull/568) ([@amueller](https://github.com/amueller))
* fixing flake [#567](https://github.com/executablebooks/jupyter-book/pull/567) ([@choldgraf](https://github.com/choldgraf))
* fix typo [#565](https://github.com/executablebooks/jupyter-book/pull/565) ([@amueller](https://github.com/amueller))
* add build to test_clean method prior to build  --builder pdflatex [#561](https://github.com/executablebooks/jupyter-book/pull/561) ([@najuzilu](https://github.com/najuzilu))
* update vscode myst markdown extension url [#559](https://github.com/executablebooks/jupyter-book/pull/559) ([@najuzilu](https://github.com/najuzilu))
* [BUG] Added a returncode for make all-pdf [#556](https://github.com/executablebooks/jupyter-book/pull/556) ([@AakashGfude](https://github.com/AakashGfude))
* [ENH] A simple {tableofcontents} directive [#553](https://github.com/executablebooks/jupyter-book/pull/553) ([@AakashGfude](https://github.com/AakashGfude))
* clarifying qe mini example [#550](https://github.com/executablebooks/jupyter-book/pull/550) ([@choldgraf](https://github.com/choldgraf))
* Small edits to intro page on docs. [#548](https://github.com/executablebooks/jupyter-book/pull/548) ([@jstac](https://github.com/jstac))
* updating intro page and other docs [#545](https://github.com/executablebooks/jupyter-book/pull/545) ([@choldgraf](https://github.com/choldgraf))
* Update default_config.yml [#544](https://github.com/executablebooks/jupyter-book/pull/544) ([@Cyb3rWard0g](https://github.com/Cyb3rWard0g))
* Fix broken references in docs [#541](https://github.com/executablebooks/jupyter-book/pull/541) ([@consideRatio](https://github.com/consideRatio))
* Corrects info on bibliography in separate file [#537](https://github.com/executablebooks/jupyter-book/pull/537) ([@kyleniemeyer](https://github.com/kyleniemeyer))
* explicitly giving jupyter book install version [#535](https://github.com/executablebooks/jupyter-book/pull/535) ([@choldgraf](https://github.com/choldgraf))
* Add modules needed to build the example book to the instructions. [#533](https://github.com/executablebooks/jupyter-book/pull/533) ([@jpivarski](https://github.com/jpivarski))
* citations clean up [#529](https://github.com/executablebooks/jupyter-book/pull/529) ([@choldgraf](https://github.com/choldgraf))
* updating documentation [#527](https://github.com/executablebooks/jupyter-book/pull/527) ([@choldgraf](https://github.com/choldgraf))
* adding tests for TOC cases [#525](https://github.com/executablebooks/jupyter-book/pull/525) ([@choldgraf](https://github.com/choldgraf))
* adding linkcheck docs and support [#524](https://github.com/executablebooks/jupyter-book/pull/524) ([@choldgraf](https://github.com/choldgraf))
* update latexpdf to pdflatex in the documentation [#523](https://github.com/executablebooks/jupyter-book/pull/523) ([@najuzilu](https://github.com/najuzilu))
* update jb contributor link [#522](https://github.com/executablebooks/jupyter-book/pull/522) ([@najuzilu](https://github.com/najuzilu))
* Additional clean options [#521](https://github.com/executablebooks/jupyter-book/pull/521) ([@najuzilu](https://github.com/najuzilu))
* updating deploy docs [#520](https://github.com/executablebooks/jupyter-book/pull/520) ([@choldgraf](https://github.com/choldgraf))
* BETA: v0.7.0b1 [#516](https://github.com/executablebooks/jupyter-book/pull/516) ([@choldgraf](https://github.com/choldgraf))
* fixing tests and prep for new release [#515](https://github.com/executablebooks/jupyter-book/pull/515) ([@choldgraf](https://github.com/choldgraf))
* Rebase [#496](https://github.com/executablebooks/jupyter-book/pull/496) ([@choldgraf](https://github.com/choldgraf))
* migrating to new github org [#493](https://github.com/executablebooks/jupyter-book/pull/493) ([@choldgraf](https://github.com/choldgraf))
* adding a gallery [#472](https://github.com/executablebooks/jupyter-book/pull/472) ([@choldgraf](https://github.com/choldgraf))
* [ENH] Raise error if page URL does not start with os.sep [#471](https://github.com/executablebooks/jupyter-book/pull/471) ([@brian-rose](https://github.com/brian-rose))
* Display the Jupyter Book icon on pypi [#470](https://github.com/executablebooks/jupyter-book/pull/470) ([@mwouts](https://github.com/mwouts))
* [DOC] changed circleci docs to reflect consistent job name [#463](https://github.com/executablebooks/jupyter-book/pull/463) ([@alexnakagawa](https://github.com/alexnakagawa))
* Fix links to book-html and github-pages [#457](https://github.com/executablebooks/jupyter-book/pull/457) ([@mwouts](https://github.com/mwouts))
* Intronetlify [#454](https://github.com/executablebooks/jupyter-book/pull/454) ([@choldgraf](https://github.com/choldgraf))
* [DOC] Minor changes to documentation [#452](https://github.com/executablebooks/jupyter-book/pull/452) ([@rossbar](https://github.com/rossbar))

### Contributors to this release
([GitHub contributors page for this release](https://github.com/executablebooks/jupyter-book/graphs/contributors?from=2019-12-06&to=2020-06-11&type=c))

[@AakashGfude](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AAakashGfude+updated%3A2019-12-06..2020-06-11&type=Issues) | [@akhmerov](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aakhmerov+updated%3A2019-12-06..2020-06-11&type=Issues) | [@alejandroschuler](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aalejandroschuler+updated%3A2019-12-06..2020-06-11&type=Issues) | [@alexnakagawa](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aalexnakagawa+updated%3A2019-12-06..2020-06-11&type=Issues) | [@amueller](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aamueller+updated%3A2019-12-06..2020-06-11&type=Issues) | [@andrewsanchez](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aandrewsanchez+updated%3A2019-12-06..2020-06-11&type=Issues) | [@asteppke](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aasteppke+updated%3A2019-12-06..2020-06-11&type=Issues) | [@betatim](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Abetatim+updated%3A2019-12-06..2020-06-11&type=Issues) | [@boazbk](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aboazbk+updated%3A2019-12-06..2020-06-11&type=Issues) | [@brian-rose](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Abrian-rose+updated%3A2019-12-06..2020-06-11&type=Issues) | [@cedeerwe](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acedeerwe+updated%3A2019-12-06..2020-06-11&type=Issues) | [@choldgraf](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acholdgraf+updated%3A2019-12-06..2020-06-11&type=Issues) | [@chrisjsewell](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Achrisjsewell+updated%3A2019-12-06..2020-06-11&type=Issues) | [@consideRatio](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AconsideRatio+updated%3A2019-12-06..2020-06-11&type=Issues) | [@cpjobling](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Acpjobling+updated%3A2019-12-06..2020-06-11&type=Issues) | [@Cyb3rWard0g](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3ACyb3rWard0g+updated%3A2019-12-06..2020-06-11&type=Issues) | [@dafriedman97](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Adafriedman97+updated%3A2019-12-06..2020-06-11&type=Issues) | [@DavidPowell](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3ADavidPowell+updated%3A2019-12-06..2020-06-11&type=Issues) | [@dhruvbalwada](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Adhruvbalwada+updated%3A2019-12-06..2020-06-11&type=Issues) | [@emdupre](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aemdupre+updated%3A2019-12-06..2020-06-11&type=Issues) | [@epacuit](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aepacuit+updated%3A2019-12-06..2020-06-11&type=Issues) | [@firasm](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Afirasm+updated%3A2019-12-06..2020-06-11&type=Issues) | [@flying-sheep](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aflying-sheep+updated%3A2019-12-06..2020-06-11&type=Issues) | [@foster999](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Afoster999+updated%3A2019-12-06..2020-06-11&type=Issues) | [@gharp](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Agharp+updated%3A2019-12-06..2020-06-11&type=Issues) | [@goanpeca](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Agoanpeca+updated%3A2019-12-06..2020-06-11&type=Issues) | [@grst](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Agrst+updated%3A2019-12-06..2020-06-11&type=Issues) | [@hamelsmu](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ahamelsmu+updated%3A2019-12-06..2020-06-11&type=Issues) | [@jasmainak](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajasmainak+updated%3A2019-12-06..2020-06-11&type=Issues) | [@jgm](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajgm+updated%3A2019-12-06..2020-06-11&type=Issues) | [@jmason86](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajmason86+updated%3A2019-12-06..2020-06-11&type=Issues) | [@jni](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajni+updated%3A2019-12-06..2020-06-11&type=Issues) | [@joergbrech](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajoergbrech+updated%3A2019-12-06..2020-06-11&type=Issues) | [@johngage](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajohngage+updated%3A2019-12-06..2020-06-11&type=Issues) | [@jpivarski](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajpivarski+updated%3A2019-12-06..2020-06-11&type=Issues) | [@jstac](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ajstac+updated%3A2019-12-06..2020-06-11&type=Issues) | [@kyleniemeyer](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Akyleniemeyer+updated%3A2019-12-06..2020-06-11&type=Issues) | [@malvikasharan](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Amalvikasharan+updated%3A2019-12-06..2020-06-11&type=Issues) | [@martinagvilas](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Amartinagvilas+updated%3A2019-12-06..2020-06-11&type=Issues) | [@MasterScrat](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3AMasterScrat+updated%3A2019-12-06..2020-06-11&type=Issues) | [@mathieuboudreau](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Amathieuboudreau+updated%3A2019-12-06..2020-06-11&type=Issues) | [@matteoacrossi](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Amatteoacrossi+updated%3A2019-12-06..2020-06-11&type=Issues) | [@mgeier](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Amgeier+updated%3A2019-12-06..2020-06-11&type=Issues) | [@mikdale](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Amikdale+updated%3A2019-12-06..2020-06-11&type=Issues) | [@mmcky](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ammcky+updated%3A2019-12-06..2020-06-11&type=Issues) | [@mwcraig](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Amwcraig+updated%3A2019-12-06..2020-06-11&type=Issues) | [@mwouts](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Amwouts+updated%3A2019-12-06..2020-06-11&type=Issues) | [@najuzilu](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Anajuzilu+updated%3A2019-12-06..2020-06-11&type=Issues) | [@NatalieThurlby](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3ANatalieThurlby+updated%3A2019-12-06..2020-06-11&type=Issues) | [@ofajardo](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aofajardo+updated%3A2019-12-06..2020-06-11&type=Issues) | [@oscarys](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aoscarys+updated%3A2019-12-06..2020-06-11&type=Issues) | [@parmentelat](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aparmentelat+updated%3A2019-12-06..2020-06-11&type=Issues) | [@peaceiris](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Apeaceiris+updated%3A2019-12-06..2020-06-11&type=Issues) | [@pgadige](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Apgadige+updated%3A2019-12-06..2020-06-11&type=Issues) | [@phaustin](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aphaustin+updated%3A2019-12-06..2020-06-11&type=Issues) | [@prabhasyadav](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aprabhasyadav+updated%3A2019-12-06..2020-06-11&type=Issues) | [@psychemedia](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Apsychemedia+updated%3A2019-12-06..2020-06-11&type=Issues) | [@Racooneer](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3ARacooneer+updated%3A2019-12-06..2020-06-11&type=Issues) | [@rahuldave](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Arahuldave+updated%3A2019-12-06..2020-06-11&type=Issues) | [@rossbar](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Arossbar+updated%3A2019-12-06..2020-06-11&type=Issues) | [@roualdes](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Aroualdes+updated%3A2019-12-06..2020-06-11&type=Issues) | [@saulomaia](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Asaulomaia+updated%3A2019-12-06..2020-06-11&type=Issues) | [@TomasBeuzen](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3ATomasBeuzen+updated%3A2019-12-06..2020-06-11&type=Issues) | [@trallard](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Atrallard+updated%3A2019-12-06..2020-06-11&type=Issues) | [@xldrkp](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Axldrkp+updated%3A2019-12-06..2020-06-11&type=Issues) | [@yuvipanda](https://github.com/search?q=repo%3Aexecutablebooks%2Fjupyter-book+involves%3Ayuvipanda+updated%3A2019-12-06..2020-06-11&type=Issues)


## v0.6.3...v0.6.4
([full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.6.3...v0.6.4))

### Enhancements made
* improving the upgrade functionality [#449](https://github.com/executablebooks/jupyter-book/pull/449) ([@choldgraf](https://github.com/choldgraf))
* scrolling outputs [#444](https://github.com/executablebooks/jupyter-book/pull/444) ([@choldgraf](https://github.com/choldgraf))
* adding a page for math instructions [#432](https://github.com/executablebooks/jupyter-book/pull/432) ([@choldgraf](https://github.com/choldgraf))
* updating thebelab and improving code highlighting [#422](https://github.com/executablebooks/jupyter-book/pull/422) ([@choldgraf](https://github.com/choldgraf))
* Hide outputs and markdown cells [#420](https://github.com/executablebooks/jupyter-book/pull/420) ([@choldgraf](https://github.com/choldgraf))
* Adding a "test" section for pages that are hard to test w/ python [#416](https://github.com/executablebooks/jupyter-book/pull/416) ([@choldgraf](https://github.com/choldgraf))
* refactoring sidebar highlighting and allowing collapsed subsections [#412](https://github.com/executablebooks/jupyter-book/pull/412) ([@choldgraf](https://github.com/choldgraf))
* adding ability to add authors and titles [#390](https://github.com/executablebooks/jupyter-book/pull/390) ([@choldgraf](https://github.com/choldgraf))
* improving search functionality [#374](https://github.com/executablebooks/jupyter-book/pull/374) ([@choldgraf](https://github.com/choldgraf))
* Add kernel path for thebelab [#189](https://github.com/executablebooks/jupyter-book/pull/189) ([@joergbrech](https://github.com/joergbrech))

### Bugs fixed
* Add installation module and fix circle [#450](https://github.com/executablebooks/jupyter-book/pull/450) ([@choldgraf](https://github.com/choldgraf))
* fixing thebelab highlighting [#446](https://github.com/executablebooks/jupyter-book/pull/446) ([@choldgraf](https://github.com/choldgraf))
* fixing full width content and some formatting bugs [#417](https://github.com/executablebooks/jupyter-book/pull/417) ([@choldgraf](https://github.com/choldgraf))
* [FIX] Fix for on-page anchor-based TOC issues [#414](https://github.com/executablebooks/jupyter-book/pull/414) ([@GasperPaul](https://github.com/GasperPaul))
* tocfix [#406](https://github.com/executablebooks/jupyter-book/pull/406) ([@choldgraf](https://github.com/choldgraf))
* fixing toc [#405](https://github.com/executablebooks/jupyter-book/pull/405) ([@choldgraf](https://github.com/choldgraf))
* [FIX] Fixed issue with Unicode characters in TOC [#400](https://github.com/executablebooks/jupyter-book/pull/400) ([@GasperPaul](https://github.com/GasperPaul))
* [FIX] Fix for path separator issue on Windows [#398](https://github.com/executablebooks/jupyter-book/pull/398) ([@GasperPaul](https://github.com/GasperPaul))
* fixing issue template [#393](https://github.com/executablebooks/jupyter-book/pull/393) ([@choldgraf](https://github.com/choldgraf))

### Other merged PRs
* moving thebelab config to within the page instead of head [#448](https://github.com/executablebooks/jupyter-book/pull/448) ([@choldgraf](https://github.com/choldgraf))
* only show TOC if there are headers for it [#441](https://github.com/executablebooks/jupyter-book/pull/441) ([@choldgraf](https://github.com/choldgraf))
* Update README.md [#425](https://github.com/executablebooks/jupyter-book/pull/425) ([@choldgraf](https://github.com/choldgraf))
* using thebelab latest [#423](https://github.com/executablebooks/jupyter-book/pull/423) ([@choldgraf](https://github.com/choldgraf))
* Update limits.md [#415](https://github.com/executablebooks/jupyter-book/pull/415) ([@choldgraf](https://github.com/choldgraf))
* moving some modules to pathlib [#403](https://github.com/executablebooks/jupyter-book/pull/403) ([@choldgraf](https://github.com/choldgraf))
* adding code structure and moving contributing guide [#394](https://github.com/executablebooks/jupyter-book/pull/394) ([@choldgraf](https://github.com/choldgraf))
* updating getting started guide [#392](https://github.com/executablebooks/jupyter-book/pull/392) ([@choldgraf](https://github.com/choldgraf))
* version bump [#389](https://github.com/executablebooks/jupyter-book/pull/389) ([@choldgraf](https://github.com/choldgraf))
* new release and updating instructions [#387](https://github.com/executablebooks/jupyter-book/pull/387) ([@choldgraf](https://github.com/choldgraf))

### Contributors to this release
([GitHub contributors page for this release](https://github.com/executablebooks/jupyter-book/graphs/contributors?from=2019-10-07&to=2019-12-06&type=c))

[@choldgraf](https://github.com/search?q=repo%3Ajupyter%2Fjupyter-book+involves%3Acholdgraf+updated%3A2019-10-07..2019-12-06&type=Issues) | [@emdupre](https://github.com/search?q=repo%3Ajupyter%2Fjupyter-book+involves%3Aemdupre+updated%3A2019-10-07..2019-12-06&type=Issues) | [@GasperPaul](https://github.com/search?q=repo%3Ajupyter%2Fjupyter-book+involves%3AGasperPaul+updated%3A2019-10-07..2019-12-06&type=Issues) | [@javag97](https://github.com/search?q=repo%3Ajupyter%2Fjupyter-book+involves%3Ajavag97+updated%3A2019-10-07..2019-12-06&type=Issues) | [@joergbrech](https://github.com/search?q=repo%3Ajupyter%2Fjupyter-book+involves%3Ajoergbrech+updated%3A2019-10-07..2019-12-06&type=Issues) | [@melaniewalsh](https://github.com/search?q=repo%3Ajupyter%2Fjupyter-book+involves%3Amelaniewalsh+updated%3A2019-10-07..2019-12-06&type=Issues) | [@psychemedia](https://github.com/search?q=repo%3Ajupyter%2Fjupyter-book+involves%3Apsychemedia+updated%3A2019-10-07..2019-12-06&type=Issues)


## v0.6.0...v0.6.3
([full changelog](https://github.com/executablebooks/jupyter-book/compare/v0.6.0...v0.6.3))


### Enhancements made
* adding anchors above headers [#366](https://github.com/executablebooks/jupyter-book/pull/366) ([@choldgraf](https://github.com/choldgraf))
* adding CSS rules for epigraphs [#365](https://github.com/executablebooks/jupyter-book/pull/365) ([@choldgraf](https://github.com/choldgraf))
* netlify config [#359](https://github.com/executablebooks/jupyter-book/pull/359) ([@choldgraf](https://github.com/choldgraf))
* Thebelab init [#352](https://github.com/executablebooks/jupyter-book/pull/352) ([@choldgraf](https://github.com/choldgraf))
* [WIP] Add option to clear outputs in build command [#349](https://github.com/executablebooks/jupyter-book/pull/349) ([@akhilputhiry](https://github.com/akhilputhiry))
* [ENH] Netlify Continuous Deployment [#342](https://github.com/executablebooks/jupyter-book/pull/342) ([@emdupre](https://github.com/emdupre))

### Bugs fixed
* css for thebelab z-order [#386](https://github.com/executablebooks/jupyter-book/pull/386) ([@choldgraf](https://github.com/choldgraf))
* fixing TOC auto gen bug [#375](https://github.com/executablebooks/jupyter-book/pull/375) ([@choldgraf](https://github.com/choldgraf))
* fixing page path link [#368](https://github.com/executablebooks/jupyter-book/pull/368) ([@choldgraf](https://github.com/choldgraf))
* fixing interact link bug [#367](https://github.com/executablebooks/jupyter-book/pull/367) ([@choldgraf](https://github.com/choldgraf))
* Update required python version [#363](https://github.com/executablebooks/jupyter-book/pull/363) ([@emdupre](https://github.com/emdupre))
* fix: fuzzy matching of jupyter book versions [#346](https://github.com/executablebooks/jupyter-book/pull/346) ([@emdupre](https://github.com/emdupre))
* fixing scrolling [#336](https://github.com/executablebooks/jupyter-book/pull/336) ([@choldgraf](https://github.com/choldgraf))

### Maintenance and upkeep improvements
* fixing load ntbk function [#385](https://github.com/executablebooks/jupyter-book/pull/385) ([@choldgraf](https://github.com/choldgraf))
* load ntbk function [#384](https://github.com/executablebooks/jupyter-book/pull/384) ([@choldgraf](https://github.com/choldgraf))
* moving CSS and JS generation to their own function [#381](https://github.com/executablebooks/jupyter-book/pull/381) ([@choldgraf](https://github.com/choldgraf))
* making sure gemfile.lock is removed [#379](https://github.com/executablebooks/jupyter-book/pull/379) ([@choldgraf](https://github.com/choldgraf))
* removing unnecessary requirements [#378](https://github.com/executablebooks/jupyter-book/pull/378) ([@choldgraf](https://github.com/choldgraf))
* making toc gen sorted [#377](https://github.com/executablebooks/jupyter-book/pull/377) ([@choldgraf](https://github.com/choldgraf))
* fixing up download functionality [#373](https://github.com/executablebooks/jupyter-book/pull/373) ([@choldgraf](https://github.com/choldgraf))
* small refactoring of names and layout [#372](https://github.com/executablebooks/jupyter-book/pull/372) ([@choldgraf](https://github.com/choldgraf))
* Bump rubyzip from 1.2.4 to 2.0.0 in /jupyter_book/book_template [#371](https://github.com/executablebooks/jupyter-book/pull/371) ([@dependabot](https://github.com/dependabot))
* moving to jupyterbook.org [#370](https://github.com/executablebooks/jupyter-book/pull/370) ([@choldgraf](https://github.com/choldgraf))
* inlining svgs and small tweaks [#369](https://github.com/executablebooks/jupyter-book/pull/369) ([@choldgraf](https://github.com/choldgraf))
* [fix] update docker image and documentation [#364](https://github.com/executablebooks/jupyter-book/pull/364) ([@emdupre](https://github.com/emdupre))
* moving js outside of _includes if not needed [#347](https://github.com/executablebooks/jupyter-book/pull/347) ([@choldgraf](https://github.com/choldgraf))
* removing unnecessary clean_lines function [#345](https://github.com/executablebooks/jupyter-book/pull/345) ([@choldgraf](https://github.com/choldgraf))
* modularizing the bage building and beefing up single page building [#344](https://github.com/executablebooks/jupyter-book/pull/344) ([@choldgraf](https://github.com/choldgraf))

### Documentation improvements
* DOC: intro.md: Jupyter Books -> Jupyter Book [#383](https://github.com/executablebooks/jupyter-book/pull/383) ([@westurner](https://github.com/westurner))

### Other merged PRs
* Update executing.ipynb [#350](https://github.com/executablebooks/jupyter-book/pull/350) ([@psychemedia](https://github.com/psychemedia))
* adding better circle instructions [#341](https://github.com/executablebooks/jupyter-book/pull/341) ([@choldgraf](https://github.com/choldgraf))
* cleaning up circle [#340](https://github.com/executablebooks/jupyter-book/pull/340) ([@choldgraf](https://github.com/choldgraf))
* ghp-import in circle [#339](https://github.com/executablebooks/jupyter-book/pull/339) ([@choldgraf](https://github.com/choldgraf))
* removing _build artifacts [#338](https://github.com/executablebooks/jupyter-book/pull/338) ([@choldgraf](https://github.com/choldgraf))
* making some files optional in upgrade [#337](https://github.com/executablebooks/jupyter-book/pull/337) ([@choldgraf](https://github.com/choldgraf))
* adding google analytics info [#335](https://github.com/executablebooks/jupyter-book/pull/335) ([@choldgraf](https://github.com/choldgraf))
* updating changelog [#334](https://github.com/executablebooks/jupyter-book/pull/334) ([@choldgraf](https://github.com/choldgraf))
* fixing releases info [#333](https://github.com/executablebooks/jupyter-book/pull/333) ([@choldgraf](https://github.com/choldgraf))

## [v0.6.0](https://github.com/executablebooks/jupyter-book/tree/v0.6.0) (2019-09-17)
[Full Changelog](https://github.com/executablebooks/jupyter-book/compare/v0.5.2...v0.6.0)

**Implemented enhancements:**

- Improve the auto-TOC function [\#271](https://github.com/executablebooks/jupyter-book/issues/271)
- Export pages to PDF [\#267](https://github.com/executablebooks/jupyter-book/issues/267)
- Adding popouts to the right [\#266](https://github.com/executablebooks/jupyter-book/issues/266)
- Add option to execute notebooks when building the book [\#234](https://github.com/executablebooks/jupyter-book/issues/234)
- Add a footer for each page [\#233](https://github.com/executablebooks/jupyter-book/issues/233)
- adding error message context to the build CLI command [\#320](https://github.com/executablebooks/jupyter-book/pull/320) ([choldgraf](https://github.com/choldgraf))
- Wrap `jekyll-raw` cells with {% raw %} [\#308](https://github.com/executablebooks/jupyter-book/pull/308) ([SamLau95](https://github.com/SamLau95))
- adding popout cell [\#302](https://github.com/executablebooks/jupyter-book/pull/302) ([choldgraf](https://github.com/choldgraf))
- adding right toc showing when there's no sidebar content [\#300](https://github.com/executablebooks/jupyter-book/pull/300) ([choldgraf](https://github.com/choldgraf))
- adding jupytext support [\#280](https://github.com/executablebooks/jupyter-book/pull/280) ([choldgraf](https://github.com/choldgraf))
- adding print button [\#279](https://github.com/executablebooks/jupyter-book/pull/279) ([choldgraf](https://github.com/choldgraf))
- Updating page layout and hoverable table of contents [\#278](https://github.com/executablebooks/jupyter-book/pull/278) ([choldgraf](https://github.com/choldgraf))
- Add a hiding topbar w/ scroll [\#276](https://github.com/executablebooks/jupyter-book/pull/276) ([choldgraf](https://github.com/choldgraf))
- Improving TOC functionality [\#273](https://github.com/executablebooks/jupyter-book/pull/273) ([choldgraf](https://github.com/choldgraf))
- use celltagpreprocessor to remove parts of cells and updating running code module [\#264](https://github.com/executablebooks/jupyter-book/pull/264) ([choldgraf](https://github.com/choldgraf))
- Create footer [\#254](https://github.com/executablebooks/jupyter-book/pull/254) ([martinagvilas](https://github.com/martinagvilas))
- removing jekyll markdown templates [\#249](https://github.com/executablebooks/jupyter-book/pull/249) ([choldgraf](https://github.com/choldgraf))
- adding simple page building [\#248](https://github.com/executablebooks/jupyter-book/pull/248) ([choldgraf](https://github.com/choldgraf))
- HTML build step [\#239](https://github.com/executablebooks/jupyter-book/pull/239) ([choldgraf](https://github.com/choldgraf))
- \[WIP\] Refactoring page layout + adding popouts and a topbar [\#169](https://github.com/executablebooks/jupyter-book/pull/169) ([choldgraf](https://github.com/choldgraf))

**Fixed bugs:**

- Some small formatting issues following upgrade to master [\#296](https://github.com/executablebooks/jupyter-book/issues/296)
- Make the PDF print work for MathJax math [\#285](https://github.com/executablebooks/jupyter-book/issues/285)
- Code cells in plain Markdown files are rendered as raw text [\#283](https://github.com/executablebooks/jupyter-book/issues/283)
- 'jupyter-book upgrade' deletes new references [\#261](https://github.com/executablebooks/jupyter-book/issues/261)
- default book doesn't build properly on github - symlink error  [\#237](https://github.com/executablebooks/jupyter-book/issues/237)
- Double check installation dependencies [\#211](https://github.com/executablebooks/jupyter-book/issues/211)
- Don't use quotes for user-entered YAML entries [\#305](https://github.com/executablebooks/jupyter-book/pull/305) ([SamLau95](https://github.com/SamLau95))
- Set a blank excerpt for all pages [\#303](https://github.com/executablebooks/jupyter-book/pull/303) ([SamLau95](https://github.com/SamLau95))
- fixing footer width [\#301](https://github.com/executablebooks/jupyter-book/pull/301) ([choldgraf](https://github.com/choldgraf))
- Use CDNs for JS libraries [\#292](https://github.com/executablebooks/jupyter-book/pull/292) ([SamLau95](https://github.com/SamLau95))
- Load thebelab asynchronously [\#291](https://github.com/executablebooks/jupyter-book/pull/291) ([SamLau95](https://github.com/SamLau95))
- Fix missing \</div\> if page.interact\_link is false [\#290](https://github.com/executablebooks/jupyter-book/pull/290) ([SamLau95](https://github.com/SamLau95))
- fixing jupytext markdown inconsistencies [\#288](https://github.com/executablebooks/jupyter-book/pull/288) ([choldgraf](https://github.com/choldgraf))
- fixing double math printing [\#286](https://github.com/executablebooks/jupyter-book/pull/286) ([choldgraf](https://github.com/choldgraf))
- fixing up print functionality [\#284](https://github.com/executablebooks/jupyter-book/pull/284) ([choldgraf](https://github.com/choldgraf))
- making a download PDF button appear on all pages [\#282](https://github.com/executablebooks/jupyter-book/pull/282) ([choldgraf](https://github.com/choldgraf))
- fixing the TOC function [\#270](https://github.com/executablebooks/jupyter-book/pull/270) ([choldgraf](https://github.com/choldgraf))
- \[FIX\] Fix references being deleted with jupyter-upgrade [\#263](https://github.com/executablebooks/jupyter-book/pull/263) ([martinagvilas](https://github.com/martinagvilas))
- fixing links [\#260](https://github.com/executablebooks/jupyter-book/pull/260) ([choldgraf](https://github.com/choldgraf))
- adding instructions for build [\#257](https://github.com/executablebooks/jupyter-book/pull/257) ([choldgraf](https://github.com/choldgraf))
- fixing pypi description [\#256](https://github.com/executablebooks/jupyter-book/pull/256) ([choldgraf](https://github.com/choldgraf))
- version fix [\#250](https://github.com/executablebooks/jupyter-book/pull/250) ([choldgraf](https://github.com/choldgraf))

**Closed issues:**

- Jupyter Notebook can't close a running notebook [\#317](https://github.com/executablebooks/jupyter-book/issues/317)
- Building book fails with a jinja2.exceptions.TemplateNotFound error [\#310](https://github.com/executablebooks/jupyter-book/issues/310)
- serving non- md/ipynb content [\#295](https://github.com/executablebooks/jupyter-book/issues/295)
- Broken links [\#259](https://github.com/executablebooks/jupyter-book/issues/259)
- Missing file error [\#253](https://github.com/executablebooks/jupyter-book/issues/253)
- Multicursor sometimes only deletes one line when there's spaces [\#251](https://github.com/executablebooks/jupyter-book/issues/251)
- Release summary for v0.6 [\#331](https://github.com/executablebooks/jupyter-book/issues/331)

**Merged pull requests:**

- fixing releases info [\#333](https://github.com/executablebooks/jupyter-book/pull/333) ([choldgraf](https://github.com/choldgraf))
- dev0 bump [\#332](https://github.com/executablebooks/jupyter-book/pull/332) ([choldgraf](https://github.com/choldgraf))
- bumping version for release [\#330](https://github.com/executablebooks/jupyter-book/pull/330) ([choldgraf](https://github.com/choldgraf))
- fixing up execute docs [\#328](https://github.com/executablebooks/jupyter-book/pull/328) ([choldgraf](https://github.com/choldgraf))
- updating documentation for build [\#326](https://github.com/executablebooks/jupyter-book/pull/326) ([choldgraf](https://github.com/choldgraf))
- adding miniconda-based test [\#324](https://github.com/executablebooks/jupyter-book/pull/324) ([choldgraf](https://github.com/choldgraf))
- removing outdated FAQ entry [\#319](https://github.com/executablebooks/jupyter-book/pull/319) ([choldgraf](https://github.com/choldgraf))
- Changes to make work with `conda skeleton pypi jupyter-book` [\#315](https://github.com/executablebooks/jupyter-book/pull/315) ([krinsman](https://github.com/krinsman))
- Update Docs to include alternative method for building Jekyll locally. [\#313](https://github.com/executablebooks/jupyter-book/pull/313) ([krinsman](https://github.com/krinsman))
- Omit entries w/o URLs and external links from TOC [\#309](https://github.com/executablebooks/jupyter-book/pull/309) ([SamLau95](https://github.com/SamLau95))
- documenting execution functionality [\#299](https://github.com/executablebooks/jupyter-book/pull/299) ([choldgraf](https://github.com/choldgraf))
- adding beta label to features [\#294](https://github.com/executablebooks/jupyter-book/pull/294) ([choldgraf](https://github.com/choldgraf))
- adding a sample CircleCI build config [\#293](https://github.com/executablebooks/jupyter-book/pull/293) ([choldgraf](https://github.com/choldgraf))
- footer width [\#287](https://github.com/executablebooks/jupyter-book/pull/287) ([choldgraf](https://github.com/choldgraf))
- adding help entries [\#277](https://github.com/executablebooks/jupyter-book/pull/277) ([choldgraf](https://github.com/choldgraf))
- Circlecibot [\#269](https://github.com/executablebooks/jupyter-book/pull/269) ([choldgraf](https://github.com/choldgraf))
- factoring out page module [\#265](https://github.com/executablebooks/jupyter-book/pull/265) ([choldgraf](https://github.com/choldgraf))
- summary not large image for twitter [\#247](https://github.com/executablebooks/jupyter-book/pull/247) ([choldgraf](https://github.com/choldgraf))
- twitter share [\#246](https://github.com/executablebooks/jupyter-book/pull/246) ([choldgraf](https://github.com/choldgraf))
- updating changelog [\#245](https://github.com/executablebooks/jupyter-book/pull/245) ([choldgraf](https://github.com/choldgraf))
- version bump to dev [\#243](https://github.com/executablebooks/jupyter-book/pull/243) ([choldgraf](https://github.com/choldgraf))

## [v0.5.2](https://github.com/executablebooks/jupyter-book/tree/v0.5.2) (2019-07-26)
[Full Changelog](https://github.com/executablebooks/jupyter-book/compare/v0.5...v0.5.2)

**Implemented enhancements:**

- implement removecell for markdown cells [\#192](https://github.com/executablebooks/jupyter-book/issues/192)

**Fixed bugs:**

- yaml.load\(\) is unsafe [\#230](https://github.com/executablebooks/jupyter-book/issues/230)
- Update documentation links that are broken [\#224](https://github.com/executablebooks/jupyter-book/issues/224)
- pip installation: jupyter-book or jupyter\_book? [\#184](https://github.com/executablebooks/jupyter-book/issues/184)
- Figure out why Gemfile and Gemfile.lock are causing issues [\#154](https://github.com/executablebooks/jupyter-book/issues/154)
- Page turn link URLs missing .html [\#140](https://github.com/executablebooks/jupyter-book/issues/140)
- Errors when running on Windows [\#137](https://github.com/executablebooks/jupyter-book/issues/137)
- Docs aren't being updated from master [\#136](https://github.com/executablebooks/jupyter-book/issues/136)
- toc help is incorrect [\#132](https://github.com/executablebooks/jupyter-book/issues/132)

**Closed issues:**

- Update docs about how to hide code cells [\#240](https://github.com/executablebooks/jupyter-book/issues/240)
- Is it possible to export Word, PDF and other formats? [\#228](https://github.com/executablebooks/jupyter-book/issues/228)
- Make it clear in the documentation that the full docker path needs to be specified, not the relative path [\#220](https://github.com/executablebooks/jupyter-book/issues/220)
- Why do we have "content" directory inside the "\_site"? [\#219](https://github.com/executablebooks/jupyter-book/issues/219)
- mismatch in docs and functionality [\#214](https://github.com/executablebooks/jupyter-book/issues/214)
- Double check that `generate\_toc.py` is getting copied properly [\#210](https://github.com/executablebooks/jupyter-book/issues/210)
- jupyter-book cli does not work as stated in the getting started guide [\#208](https://github.com/executablebooks/jupyter-book/issues/208)
- Unable to install jupyter-book in conda environment [\#206](https://github.com/executablebooks/jupyter-book/issues/206)
- Error if kernelspec missing [\#195](https://github.com/executablebooks/jupyter-book/issues/195)
- Clarify the CLI help statements [\#146](https://github.com/executablebooks/jupyter-book/issues/146)
- jupyter-book upgrade also modifies requirements.txt [\#130](https://github.com/executablebooks/jupyter-book/issues/130)

**Merged pull requests:**

- bumping version and adding CLI for version [\#242](https://github.com/executablebooks/jupyter-book/pull/242) ([choldgraf](https://github.com/choldgraf))
- Release fixes [\#241](https://github.com/executablebooks/jupyter-book/pull/241) ([choldgraf](https://github.com/choldgraf))
- Markdown exporter in Python instead of the CLI [\#235](https://github.com/executablebooks/jupyter-book/pull/235) ([choldgraf](https://github.com/choldgraf))
- Change text in Markdown cell to correct URL. [\#227](https://github.com/executablebooks/jupyter-book/pull/227) ([habi](https://github.com/habi))
- \[DOC\] Clarify full vs relative path in container build instructions [\#226](https://github.com/executablebooks/jupyter-book/pull/226) ([emdupre](https://github.com/emdupre))
- Ensure UTF-8 Encoding When Building Book [\#225](https://github.com/executablebooks/jupyter-book/pull/225) ([cczhu](https://github.com/cczhu))
- version bump to dev [\#218](https://github.com/executablebooks/jupyter-book/pull/218) ([choldgraf](https://github.com/choldgraf))
- version bump for bugfix [\#217](https://github.com/executablebooks/jupyter-book/pull/217) ([choldgraf](https://github.com/choldgraf))
- fix doc mismatch for "make build" [\#216](https://github.com/executablebooks/jupyter-book/pull/216) ([thammegowda](https://github.com/thammegowda))
- make scripts dir as a module, to be included by `find\_packages\(\)` of setuptools [\#215](https://github.com/executablebooks/jupyter-book/pull/215) ([thammegowda](https://github.com/thammegowda))
- add jupyter book to template requirements [\#209](https://github.com/executablebooks/jupyter-book/pull/209) ([choldgraf](https://github.com/choldgraf))
- updating hidecode tag word and allowing total HTML removal [\#207](https://github.com/executablebooks/jupyter-book/pull/207) ([choldgraf](https://github.com/choldgraf))
- Ask if kernelspec exists in metadata [\#197](https://github.com/executablebooks/jupyter-book/pull/197) ([joergbrech](https://github.com/joergbrech))
- changelog and version bump [\#194](https://github.com/executablebooks/jupyter-book/pull/194) ([choldgraf](https://github.com/choldgraf))

## [v0.5](https://github.com/executablebooks/jupyter-book/tree/v0.5) (2019-05-13)
[Full Changelog](https://github.com/executablebooks/jupyter-book/compare/v0.4.1...v0.5)

**Implemented enhancements:**

- Markdown guide refers to Highlightjs but Rouge is used [\#183](https://github.com/executablebooks/jupyter-book/issues/183)
- Get codecov working [\#153](https://github.com/executablebooks/jupyter-book/issues/153)
- Add thebelab button to every code cell [\#117](https://github.com/executablebooks/jupyter-book/issues/117)
- Add an option / config for analytics tracking? [\#115](https://github.com/executablebooks/jupyter-book/issues/115)
- Add support for nbinteract [\#82](https://github.com/executablebooks/jupyter-book/issues/82)
- Scrolling in subtitle column [\#173](https://github.com/executablebooks/jupyter-book/issues/173)

**Fixed bugs:**

- Page turn links to external sites are broken [\#186](https://github.com/executablebooks/jupyter-book/issues/186)
- Code cell pre-wrap causes split lines [\#182](https://github.com/executablebooks/jupyter-book/issues/182)
- problems building with images [\#124](https://github.com/executablebooks/jupyter-book/issues/124)
- Problems with local build instructions on Mac \(and perhaps other 'nix platforms\) [\#123](https://github.com/executablebooks/jupyter-book/issues/123)

**Closed issues:**

- Plots not showing in ipynb files [\#179](https://github.com/executablebooks/jupyter-book/issues/179)
- jupyter-book is missing from the binder requirements [\#166](https://github.com/executablebooks/jupyter-book/issues/166)
- Binder and Thebelab not working for demo book [\#155](https://github.com/executablebooks/jupyter-book/issues/155)
- Errors building HTML [\#152](https://github.com/executablebooks/jupyter-book/issues/152)
- Non `--demo` option seems to fail [\#120](https://github.com/executablebooks/jupyter-book/issues/120)
- Error on notebook.py with inconsistent  and DEFAULT\_STATIC\_FILES\_PATH. [\#108](https://github.com/executablebooks/jupyter-book/issues/108)
- add requirements to setup.py [\#105](https://github.com/executablebooks/jupyter-book/issues/105)
- Add a CONTRIBUTING.md  [\#99](https://github.com/executablebooks/jupyter-book/issues/99)
- Explore using a cookiecutter for the site [\#87](https://github.com/executablebooks/jupyter-book/issues/87)
- Use a Python CLI instead of Make [\#42](https://github.com/executablebooks/jupyter-book/issues/42)
- Autogenerate toc [\#40](https://github.com/executablebooks/jupyter-book/issues/40)
- Force permalinks to be lowercase and replace space and '\_' with '-' [\#35](https://github.com/executablebooks/jupyter-book/issues/35)
- Extra buttons to support [\#32](https://github.com/executablebooks/jupyter-book/issues/32)
- Use a submodule for notebooks folder [\#14](https://github.com/executablebooks/jupyter-book/issues/14)
- Jupyter Book version v0.5 [\#175](https://github.com/executablebooks/jupyter-book/issues/175)

**Merged pull requests:**

- Release [\#193](https://github.com/executablebooks/jupyter-book/pull/193) ([choldgraf](https://github.com/choldgraf))
- Update local install instructions [\#190](https://github.com/executablebooks/jupyter-book/pull/190) ([mwcraig](https://github.com/mwcraig))
- fixing some css bugs [\#188](https://github.com/executablebooks/jupyter-book/pull/188) ([choldgraf](https://github.com/choldgraf))
- \[FIX\] Issue \#137 Errors when running on Windows [\#187](https://github.com/executablebooks/jupyter-book/pull/187) ([stafforddavidj](https://github.com/stafforddavidj))
- fixing content root notebook problem [\#181](https://github.com/executablebooks/jupyter-book/pull/181) ([choldgraf](https://github.com/choldgraf))
- wrap code even if it has no language [\#180](https://github.com/executablebooks/jupyter-book/pull/180) ([alexmorley](https://github.com/alexmorley))
- removing custom TOC code [\#178](https://github.com/executablebooks/jupyter-book/pull/178) ([choldgraf](https://github.com/choldgraf))
- Make right hand toc scrollable. [\#176](https://github.com/executablebooks/jupyter-book/pull/176) ([alexmorley](https://github.com/alexmorley))
- adding cell tags metadata [\#171](https://github.com/executablebooks/jupyter-book/pull/171) ([choldgraf](https://github.com/choldgraf))
- make sure jupyter-book is included in the binder build [\#167](https://github.com/executablebooks/jupyter-book/pull/167) ([joergbrech](https://github.com/joergbrech))
- fixing thebelab css and splitting off the interactive notebooks [\#165](https://github.com/executablebooks/jupyter-book/pull/165) ([choldgraf](https://github.com/choldgraf))
- \[ENH\] Add thebelab button to every code cell [\#163](https://github.com/executablebooks/jupyter-book/pull/163) ([joergbrech](https://github.com/joergbrech))
- making tags for removing cells not text [\#162](https://github.com/executablebooks/jupyter-book/pull/162) ([choldgraf](https://github.com/choldgraf))
- hide cells updates [\#161](https://github.com/executablebooks/jupyter-book/pull/161) ([choldgraf](https://github.com/choldgraf))
- updating css to match input and output [\#160](https://github.com/executablebooks/jupyter-book/pull/160) ([choldgraf](https://github.com/choldgraf))
- Update config.yml for code coverage [\#159](https://github.com/executablebooks/jupyter-book/pull/159) ([choldgraf](https://github.com/choldgraf))
- codecov activation [\#158](https://github.com/executablebooks/jupyter-book/pull/158) ([choldgraf](https://github.com/choldgraf))
- Update requirements.txt [\#157](https://github.com/executablebooks/jupyter-book/pull/157) ([choldgraf](https://github.com/choldgraf))
- binder links to gh-pages now [\#156](https://github.com/executablebooks/jupyter-book/pull/156) ([choldgraf](https://github.com/choldgraf))
- Fix broken notebook links [\#150](https://github.com/executablebooks/jupyter-book/pull/150) ([mwcraig](https://github.com/mwcraig))
- fixing thebelab and circle build [\#149](https://github.com/executablebooks/jupyter-book/pull/149) ([choldgraf](https://github.com/choldgraf))
- removing build folder [\#144](https://github.com/executablebooks/jupyter-book/pull/144) ([choldgraf](https://github.com/choldgraf))
- maintaining docs for site structure [\#142](https://github.com/executablebooks/jupyter-book/pull/142) ([choldgraf](https://github.com/choldgraf))
- Build update [\#135](https://github.com/executablebooks/jupyter-book/pull/135) ([choldgraf](https://github.com/choldgraf))
- Release guide [\#131](https://github.com/executablebooks/jupyter-book/pull/131) ([choldgraf](https://github.com/choldgraf))
- \[MRG\] Refactor argparse [\#129](https://github.com/executablebooks/jupyter-book/pull/129) ([jasmainak](https://github.com/jasmainak))
- Add badge for coverage [\#128](https://github.com/executablebooks/jupyter-book/pull/128) ([jasmainak](https://github.com/jasmainak))
- \[ENH\] Initial commit of dockerfile, updated docs [\#127](https://github.com/executablebooks/jupyter-book/pull/127) ([emdupre](https://github.com/emdupre))
- MAINT: make jupyter-book conform to pep8 [\#126](https://github.com/executablebooks/jupyter-book/pull/126) ([jasmainak](https://github.com/jasmainak))
- linking minimal folder [\#122](https://github.com/executablebooks/jupyter-book/pull/122) ([choldgraf](https://github.com/choldgraf))
- adding nbinteract support [\#119](https://github.com/executablebooks/jupyter-book/pull/119) ([choldgraf](https://github.com/choldgraf))
- update link of the markdown version of guide [\#118](https://github.com/executablebooks/jupyter-book/pull/118) ([cnydw](https://github.com/cnydw))
- \[ENH\] add google analytics option [\#116](https://github.com/executablebooks/jupyter-book/pull/116) ([joergbrech](https://github.com/joergbrech))
- improving the non-sidebar layout and toc script [\#112](https://github.com/executablebooks/jupyter-book/pull/112) ([choldgraf](https://github.com/choldgraf))
- \[doc\] contributing guidelines [\#111](https://github.com/executablebooks/jupyter-book/pull/111) ([emdupre](https://github.com/emdupre))
- Cssfix [\#109](https://github.com/executablebooks/jupyter-book/pull/109) ([choldgraf](https://github.com/choldgraf))
- source dependencies from requirements.txt [\#106](https://github.com/executablebooks/jupyter-book/pull/106) ([Zsailer](https://github.com/Zsailer))
- Adding download links for the notebook files [\#104](https://github.com/executablebooks/jupyter-book/pull/104) ([choldgraf](https://github.com/choldgraf))
- fixing thebelab keyboard shortcuts behavior [\#103](https://github.com/executablebooks/jupyter-book/pull/103) ([choldgraf](https://github.com/choldgraf))

## [v0.4.1](https://github.com/executablebooks/jupyter-book/tree/v0.4.1) (2019-02-09)
[Full Changelog](https://github.com/executablebooks/jupyter-book/compare/v0.2...v0.4.1)

**Closed issues:**

- Disappearing None [\#98](https://github.com/executablebooks/jupyter-book/issues/98)
- Inquiry: Plotly interactive plots in a Jupyter Books? [\#93](https://github.com/executablebooks/jupyter-book/issues/93)
- iframe not rendering [\#91](https://github.com/executablebooks/jupyter-book/issues/91)
- thebelab uses the wrong kernel [\#90](https://github.com/executablebooks/jupyter-book/issues/90)
- An option to embed a link on sidebar logo [\#77](https://github.com/executablebooks/jupyter-book/issues/77)
- Scrollbar overlaps with TOC table \(on Linux\) [\#75](https://github.com/executablebooks/jupyter-book/issues/75)
- Unwanted leading white space at the beginning of code block [\#73](https://github.com/executablebooks/jupyter-book/issues/73)
- Standard badges rendering too big [\#65](https://github.com/executablebooks/jupyter-book/issues/65)
- Give a shout-out to bookdown [\#63](https://github.com/executablebooks/jupyter-book/issues/63)
- Make it clearer how to customize the look and feel of the site [\#61](https://github.com/executablebooks/jupyter-book/issues/61)
- Recommend a way to make citations [\#60](https://github.com/executablebooks/jupyter-book/issues/60)
- Highlight active section in right sidebar [\#55](https://github.com/executablebooks/jupyter-book/issues/55)
- Allow people to put YAML in their content files [\#51](https://github.com/executablebooks/jupyter-book/issues/51)
- Site Search [\#39](https://github.com/executablebooks/jupyter-book/issues/39)
- Conversion from old system to new [\#37](https://github.com/executablebooks/jupyter-book/issues/37)
- Support "versions" of a book [\#31](https://github.com/executablebooks/jupyter-book/issues/31)
- Book is not rebuilding [\#29](https://github.com/executablebooks/jupyter-book/issues/29)
- Feature request: right-side navbar auto-scroll [\#24](https://github.com/executablebooks/jupyter-book/issues/24)
- generate\_summary\_from\_folders doesn't output prefixed numerals [\#23](https://github.com/executablebooks/jupyter-book/issues/23)

**Merged pull requests:**

- fixing thebelab keyboard movement [\#102](https://github.com/executablebooks/jupyter-book/pull/102) ([choldgraf](https://github.com/choldgraf))
- Styles [\#101](https://github.com/executablebooks/jupyter-book/pull/101) ([choldgraf](https://github.com/choldgraf))
- Update FAQ with guidelines for Plotly [\#97](https://github.com/executablebooks/jupyter-book/pull/97) ([mathieuboudreau](https://github.com/mathieuboudreau))
- set kernelOptions for thebelab based on notebook's metadata [\#92](https://github.com/executablebooks/jupyter-book/pull/92) ([joergbrech](https://github.com/joergbrech))
- \[WIP\] adding a CLI to generate books [\#89](https://github.com/executablebooks/jupyter-book/pull/89) ([choldgraf](https://github.com/choldgraf))
- Fix very small typo [\#88](https://github.com/executablebooks/jupyter-book/pull/88) ([mwcraig](https://github.com/mwcraig))
- adding update instructions [\#86](https://github.com/executablebooks/jupyter-book/pull/86) ([choldgraf](https://github.com/choldgraf))
- adding search functionality and external links in sidebar [\#85](https://github.com/executablebooks/jupyter-book/pull/85) ([choldgraf](https://github.com/choldgraf))
- adding codemirror theme config [\#84](https://github.com/executablebooks/jupyter-book/pull/84) ([choldgraf](https://github.com/choldgraf))
- ignoring gh-pages for circle [\#81](https://github.com/executablebooks/jupyter-book/pull/81) ([choldgraf](https://github.com/choldgraf))
- transferring over book to new owner [\#80](https://github.com/executablebooks/jupyter-book/pull/80) ([choldgraf](https://github.com/choldgraf))
- sidebar logo link [\#79](https://github.com/executablebooks/jupyter-book/pull/79) ([choldgraf](https://github.com/choldgraf))
- improve codemirror syntax highlighting [\#78](https://github.com/executablebooks/jupyter-book/pull/78) ([choldgraf](https://github.com/choldgraf))
- updating sidebar css to be more minimal [\#76](https://github.com/executablebooks/jupyter-book/pull/76) ([choldgraf](https://github.com/choldgraf))
- Rebuild file if source file has a newer time stamp [\#74](https://github.com/executablebooks/jupyter-book/pull/74) ([gaow](https://github.com/gaow))
- Deploy to github.io using circle and update docs to reflect this [\#69](https://github.com/executablebooks/jupyter-book/pull/69) ([choldgraf](https://github.com/choldgraf))
- updating requirements for binder [\#67](https://github.com/executablebooks/jupyter-book/pull/67) ([choldgraf](https://github.com/choldgraf))
- adding thebelab buttons and some other updates [\#66](https://github.com/executablebooks/jupyter-book/pull/66) ([choldgraf](https://github.com/choldgraf))
- adding citations support [\#64](https://github.com/executablebooks/jupyter-book/pull/64) ([choldgraf](https://github.com/choldgraf))
- adding collapsible code blocks [\#59](https://github.com/executablebooks/jupyter-book/pull/59) ([choldgraf](https://github.com/choldgraf))
- highlighting to right menu bar [\#58](https://github.com/executablebooks/jupyter-book/pull/58) ([choldgraf](https://github.com/choldgraf))
- updating install instructions to use conda [\#57](https://github.com/executablebooks/jupyter-book/pull/57) ([choldgraf](https://github.com/choldgraf))
- adding ruby to circle [\#56](https://github.com/executablebooks/jupyter-book/pull/56) ([choldgraf](https://github.com/choldgraf))
- Make the sidebar stay on the page during scroll [\#54](https://github.com/executablebooks/jupyter-book/pull/54) ([ReventonC](https://github.com/ReventonC))
- adding mini module and yaml splitter [\#53](https://github.com/executablebooks/jupyter-book/pull/53) ([choldgraf](https://github.com/choldgraf))
- adding a default license to the book [\#48](https://github.com/executablebooks/jupyter-book/pull/48) ([choldgraf](https://github.com/choldgraf))
- fixing the internet js to not use jquery [\#47](https://github.com/executablebooks/jupyter-book/pull/47) ([choldgraf](https://github.com/choldgraf))
- Delete duplicated link in readme [\#46](https://github.com/executablebooks/jupyter-book/pull/46) ([consideRatio](https://github.com/consideRatio))
- Typo - does it matter? [\#45](https://github.com/executablebooks/jupyter-book/pull/45) ([consideRatio](https://github.com/consideRatio))
- Fix broken links [\#44](https://github.com/executablebooks/jupyter-book/pull/44) ([consideRatio](https://github.com/consideRatio))
- updating guide to latest version [\#43](https://github.com/executablebooks/jupyter-book/pull/43) ([choldgraf](https://github.com/choldgraf))
- adding tests and some more command-line options [\#41](https://github.com/executablebooks/jupyter-book/pull/41) ([choldgraf](https://github.com/choldgraf))
- Split requirements into build and run [\#36](https://github.com/executablebooks/jupyter-book/pull/36) ([matthew-brett](https://github.com/matthew-brett))
- moving notebook images folder to build [\#34](https://github.com/executablebooks/jupyter-book/pull/34) ([choldgraf](https://github.com/choldgraf))
- fixing interact link paths [\#33](https://github.com/executablebooks/jupyter-book/pull/33) ([choldgraf](https://github.com/choldgraf))
- Refactor textbook generator to check redirects [\#27](https://github.com/executablebooks/jupyter-book/pull/27) ([matthew-brett](https://github.com/matthew-brett))
- A blank target URL here would be nice. [\#15](https://github.com/executablebooks/jupyter-book/pull/15) ([arokem](https://github.com/arokem))

## [v0.2](https://github.com/executablebooks/jupyter-book/tree/v0.2) (2018-10-23)
[Full Changelog](https://github.com/executablebooks/jupyter-book/compare/v0.1...v0.2)

**Closed issues:**

- Feature request: Search Bar [\#25](https://github.com/executablebooks/jupyter-book/issues/25)

**Merged pull requests:**

- Update to new build system [\#30](https://github.com/executablebooks/jupyter-book/pull/30) ([choldgraf](https://github.com/choldgraf))

## [v0.1](https://github.com/executablebooks/jupyter-book/tree/v0.1) (2018-10-20)
**Closed issues:**

- Calling newer version of nbclean than is available on pypi [\#21](https://github.com/executablebooks/jupyter-book/issues/21)
- Changing MathJax Size of only Blocks [\#19](https://github.com/executablebooks/jupyter-book/issues/19)
- Change Color of Links [\#18](https://github.com/executablebooks/jupyter-book/issues/18)
- Enhancements to pull from the DS100 textbook [\#17](https://github.com/executablebooks/jupyter-book/issues/17)
- Hidden Code Blocks [\#13](https://github.com/executablebooks/jupyter-book/issues/13)
- MathJax Rendering Issues [\#12](https://github.com/executablebooks/jupyter-book/issues/12)
- Generate textbook not finding README.md [\#11](https://github.com/executablebooks/jupyter-book/issues/11)
- Fork and clone may not be the best workflow [\#10](https://github.com/executablebooks/jupyter-book/issues/10)

**Merged pull requests:**

- Fix dollar escapes at beginning of line [\#28](https://github.com/executablebooks/jupyter-book/pull/28) ([matthew-brett](https://github.com/matthew-brett))
- Add pip requirements file [\#26](https://github.com/executablebooks/jupyter-book/pull/26) ([matthew-brett](https://github.com/matthew-brett))
- Made textbook\_folder an optional input [\#22](https://github.com/executablebooks/jupyter-book/pull/22) ([jmason86](https://github.com/jmason86))
- adding advanced section [\#16](https://github.com/executablebooks/jupyter-book/pull/16) ([choldgraf](https://github.com/choldgraf))
- adding copy buttons [\#9](https://github.com/executablebooks/jupyter-book/pull/9) ([choldgraf](https://github.com/choldgraf))
- fixing c3po [\#8](https://github.com/executablebooks/jupyter-book/pull/8) ([choldgraf](https://github.com/choldgraf))
- adding intro material [\#7](https://github.com/executablebooks/jupyter-book/pull/7) ([choldgraf](https://github.com/choldgraf))
- adding sidebar and header inferring [\#6](https://github.com/executablebooks/jupyter-book/pull/6) ([choldgraf](https://github.com/choldgraf))
- image center and max width [\#5](https://github.com/executablebooks/jupyter-book/pull/5) ([choldgraf](https://github.com/choldgraf))
- updating content width [\#4](https://github.com/executablebooks/jupyter-book/pull/4) ([choldgraf](https://github.com/choldgraf))
- stylistic improvements to textbook setting [\#3](https://github.com/executablebooks/jupyter-book/pull/3) ([choldgraf](https://github.com/choldgraf))
- updating chapter links [\#2](https://github.com/executablebooks/jupyter-book/pull/2) ([choldgraf](https://github.com/choldgraf))
- Build missing files [\#1](https://github.com/executablebooks/jupyter-book/pull/1) ([choldgraf](https://github.com/choldgraf))



\* *This Change Log was automatically generated by [github_changelog_generator](https://github.com/skywinder/Github-Changelog-Generator)*
