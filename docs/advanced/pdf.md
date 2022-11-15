# Build a PDF

It is possible to build a single PDF that contains all of your book's content. This
page describes a couple ways to do so.

:::{warning}
PDF building is in active development, and may change or have bugs.
:::

There are two approaches to building PDF files.

(pdf:html)=
## Build a PDF from your book HTML

It is possible to build a single PDF from your book's HTML. This starts by
converting all of your book's content into a single HTML file, and then renders
it as a PDF by emulating a browser from the command-line.

### Installation

Your system will need to use `pyppeteer` to parse the generated HTML for
conversion to PDF.

You can install it like so:

```bash
pip install pyppeteer
```

You may also need to install this bundle of packages below (on *nix systems):

```{literalinclude} ../../.github/workflows/pyppeteer_reqs.txt
```

```{margin}
In addition, if you get errors about libraries that don't exist, check out
[these install commands](https://circleci.com/orbs/registry/orb/threetreeslight/puppeteer)
to see if that fixes it. We warned you it was an experimental feature :-)
```

### Build

To build a single PDF from your book's HTML, use the following command:

```bash
jupyter-book build mybookname/ --builder pdfhtml
```

or

```bash
jb build mybookname/ --builder pdfhtml
```

:::{warning}
If you get a "MaxRetryError" and see mentions of SSL in the error message when building the PDF,
this could be due to a bug in `pyppeteer` as it downloads Chromium for the first time.
See [this GitHub comment](https://github.com/miyakogi/pyppeteer/issues/258#issuecomment-563075764)
for a potential fix, and [this Jupyter Book issue](https://github.com/executablebooks/jupyter-book/issues/593)
where we're tracking the issue.
:::

### Control the look of PDF via HTML

Because you are using HTML as an intermediary for your book's PDF, you can control the look and feel of the HTML via your own CSS rules. Most CSS changes that you make to your HTML website will also persist in the PDF version of that website. For information about how to define your own CSS rules, see [](custom-assets).

To add CSS rules that **only apply to the printed PDF**, use the `@media print` CSS pattern to define print-specific rules. These will *only* be applied when the HTML is being printed, and will not show up in your non-PDF website.

For example, to **hide the right table of contents** at print time, you could add this rule:

```scss
@media print {
    .bd-toc {
        visibility: hidden;
    }
}
```

The right Table of Contents would be present in your live website, but hidden when someone printed a PDF of your website.

(pdf:latex)=
## Build a PDF using LaTeX

You can also use LaTeX to build a PDF of your book.
This process requires you to have `tex` setup on your system.
Jupyter Book will construct a LaTeX file and then use the system `latex` to build that LaTeX file.

:::{margin}
The LaTeX file that `jupyter-book` produces is not particularly easy to edit primarily
because it contains `sphinx` and `pygments` markup to enable syntax highlighting for
code cells etc. This is an area we would like to improve so that the LaTeX file is more
human readable to enable customization.

See [#1497](https://github.com/executablebooks/jupyter-book/issues/1497)
:::

This section tries to recommend a few best-practices.

:::{note}
We recommend using the [texlive](https://www.tug.org/texlive/) distribution
:::

`jupyter-book` uses the
[sphinx-jupyterbook-latex](https://github.com/executablebooks/sphinx-jupyterbook-latex) package,
which handles much of the customised LaTeX infrastructure. A full list of features can be found
[the `sphinx-jupyterbook-latex` features list](https://github.com/executablebooks/sphinx-jupyterbook-latex/blob/master/docs/features.md).

Some of these features include:

1. This package enables building `pdf` files by providing support of the various
   [structures that are defined in the _toc.yml](https://jupyterbook.org/customize/toc.html). This also
   enables `pdf` files to be constructed in a way that is harmonised with the `html` output.
2. the `masterdoc` or `root` document for `jupyter-book` is treated as `frontmatter` in LaTeX
3. update fonts so that `unicode` characters can be used without breaking LaTeX builds (`xelatex` is used
   by default)
4. support for `png` and `gif` images using `sphinx.ext.imgconverter`
5. support for `jupyter-book` tags such as `hide-cell`

::::{note}
This functionality is enabled by default, but if you need to **turn off** this package,
you need add the following config to your `_config.yml`:

```yaml
latex:
  use_jupyterbook_latex: false
```
::::

### Installation and Setup

For `Debian`-based `Linux` platforms it is recommended to install the following packages:

```bash
sudo apt-get install texlive-latex-extra \
                     texlive-fonts-extra \
                     texlive-xetex latexmk
```

Alternatively you can install the full [TeX Live](https://www.tug.org/texlive/quickinstall.html) distribution.

For `OSX` you may want to use [MacTeX](http://www.tug.org/mactex/) which is a more
user friendly approach. Alternatively you may also use [TeX Live](https://www.tug.org/texlive/quickinstall.html).

For `Windows` users, please install [TeX Live](https://www.tug.org/texlive/windows.html).

### Build

#### Book Style PDF

To build a PDF of your project using LaTeX, use the following command:

```bash
jupyter-book build mybookname/ --builder pdflatex
```

or

```bash
jb build mybookname/ --builder pdflatex
```

::::{note}
If you would just like to generate the **latex** file you may use:

```bash
jb build mybookname/ --builder latex
```

::::

#### Individual PDF Files

It is possible to build
individual PDF files for each page of the project by enabling the `--individualpages` option
when using the `pdflatex` builder.

```bash
jupyter-book build mybookname/ --builder pdflatex --individualpages
```

This `option` is only enabled for the `pdflatex` builder.

:::{warning}
The current implementation of `--individualpages` does **not** make use of the improvements
introduced by [sphinx-jupyterbook-latex](https://github.com/executablebooks/sphinx-jupyterbook-latex) and
uses the default `latex` writer included with Sphinx.
We are currently working on making improvements to how `--individualpages` are constructed.
You can track progress [here](https://github.com/executablebooks/sphinx-jupyterbook-latex/issues/41)
:::

The individual PDF files will be available in the `_build/latex` build folder.
These files will have the same name as the source file or, if nested in folders, will be named `{folder}-{filename}.pdf` in a flat structure.

:::{note}
When specifying a single page using the `build` command,
the `--individualpages` will automatically be set to `True`.

In the future we intend for this to produce latex documents more suitable to single pages
(see [issue #904](https://github.com/executablebooks/jupyter-book/issues/904)).
:::

### Configuration

#### Updating the name of the book style PDF file

To update the name of your `PDF` file you can set the following in `_config.yml`

```yaml
latex:
  latex_documents:
     targetname: book.tex
```

This will act as an automatic `override` when Sphinx builds the
[latex_documents](https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-latex_documents).
It is typically inferred by `Sphinx` but when using `jupyter-book` naming the file in the `_config.yml`
generally makes it easier to find.

#### Choose a different LaTeX compiler

The current default is to use `xelatex` to build `pdf` files.

:::{warning}
The `--individualpages` option currently uses `pdflatex` by default.
:::

You may choose a different LaTeX engine such as `pdflatex` or `lualatex`.
For example, to use `pdflatex` engine for `LaTeX`, add the following to your `_config.yml`:

```yaml
latex:
  latex_engine: pdflatex
```

:::{seealso}
The Sphinx [documentation for available builders](https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-latex_engine)
contains a full list of supported `latex` builders.
:::

#### Customize LaTeX via Sphinx

The current focus of the EBP project has been to automate the process of building `pdf` files
from `myst:md` sources and to ensure the resulting `pdf` files are syncronised (in structure)
with the `html` output. We are actively looking at ways to enable more `LaTeX` configuration and
customization.

The majority of customization offered is via `Sphinx`, the underlying build engine that powers
`jupyter-book`.

Configuration via [Sphinx LaTeX settings](https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-latex-output) can be passed through using the `config` section
of `sphinx` in the `_config.yml` file for your project.

For example, if you would like to set the
[latex_toplevel_sectioning](https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-latex_toplevel_sectioning)
option to use `part` instead of `chapter` you would use:

```yaml
sphinx:
  config:
    latex_toplevel_sectioning: 'part'
```
