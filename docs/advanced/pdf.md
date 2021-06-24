# Build a PDF

It is possible to build a single PDF that contains all of your book's content. This
page describes a couple ways to do so.

:::{warning}
PDF building is experimental, and may change or have bugs.
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
This can behave differently depending on your operating system and `tex` setup.
This section tries to recommend a few best-practices.

:::{note}
We recommend using the [texlive](https://www.tug.org/texlive/) distribution
:::

The default is to build your project as a single PDF file, however it is possible to build
individual PDF files for each page of the project by enabling the `--individualpages` option
when using the `pdflatex` builder.

### Installation

For `Debian`-based `Linux` platforms it is recommended to install the following packages:

```bash
sudo apt-get install texlive-latex-recommended texlive-latex-extra \
                     texlive-fonts-recommended texlive-fonts-extra \
                     texlive-xetex latexmk
```

Alternatively you can install the full [TeX Live](https://www.tug.org/texlive/quickinstall.html) distribution.

For `OSX` you may want to use [MacTeX](http://www.tug.org/mactex/) which is a more
user friendly approach. Alternatively you may also use [TeX Live](https://www.tug.org/texlive/quickinstall.html).

For `Windows` users, please install [TeX Live](https://www.tug.org/texlive/windows.html).

### Build

`jupyter-book` uses the [sphinx-jupyterbook-latex](https://github.com/executablebooks/sphinx-jupyterbook-latex) package
which handles much of the customised LaTeX infrastructure. A feature list of this package can be found
[here](https://github.com/executablebooks/sphinx-jupyterbook-latex/blob/master/docs/intro.md#feature-list).

This package enables building `pdf` files with full support for the `file` and `part/chapter`
[structures that are defined in the _toc.yml](https://jupyterbook.org/customize/toc.html). This builds
`pdf` files that are similar in structure to the `html` output.

If you need to **turn off** this package, the following config is required:

```yaml
latex:
  use_jupyterbook_latex: false
```

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

**Individual PDF Files:**

:::{warning}
The current implementation of `--individualpages` does **not** make use of the improvements
introduced by [sphinx-jupyterbook-latex](https://github.com/executablebooks/sphinx-jupyterbook-latex) and
uses the default `latex` writer included with Sphinx.
We are currently working on making improvements to how `--individualpages` are constructed.
You can track progress [here](https://github.com/executablebooks/sphinx-jupyterbook-latex/issues/41)
:::

To build PDF files for each page of the project,
you can specify the option `--individualpages` for `--builder=pdflatex`.

The individual PDF files will be available in the `_build/latex` build folder.
These files will have the same name as the source file or, if nested in folders, will be named `{folder}-{filename}.pdf`.

:::{note}
When specifying a page using the `build` command,
the `--individualpages` will automatically be set to `True`.

In the future we intend for this to produce latex documents more suitable to single pages
(see [issue #904](https://github.com/executablebooks/jupyter-book/issues/904)).
:::

### Updating the name of the Global PDF file

To update the name of your `PDF` file you can set the following in `_config.yml`

```yaml
latex:
  latex_documents:
     targetname: book.tex
```

This will act as an automatic `override` when Sphinx builds the
[latex_documents](https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-latex_documents). It is typically inferred by `Sphinx` but when
using `jupyter-book` naming the file in the `_config.yml` generally makes it
easier to find.

### Using a different LaTeX engine

The current default is to use `xelatex` to build `pdf` files.

:::{warning}
The `--individualpages` option currently uses `pdflatex` by default.
:::

Some users may want to switch to using a different LaTeX engine such as `pdflatex`.
To revert the `LaTeX` engine to `pdflatex` you can add the following to your `_config.yml`

```yaml
latex:
  latex_engine: pdflatex
```

:::{note}
The Sphinx documentation [for available builders](https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-latex_engine)
contains a full list of supported `latex` builders.
:::

### Other Sphinx LaTeX settings

Other [LaTeX settings](https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-latex_engine) available
to Sphinx can be passed through using the config section
of `Sphinx` in the `_config.yml` file for your project.

For example, if you would like to set the [latex_toplevel_sectioning](https://www.sphinx-doc.org/en/master/usage/configuration.html#confval-latex_toplevel_sectioning) option to use `part` instead of `chapter` you would use:

```yaml
sphinx:
  config:
    latex_toplevel_sectioning: 'part'
```
