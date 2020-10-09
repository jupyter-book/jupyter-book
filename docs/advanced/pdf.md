# PDFs for your book

It is possible to build a single PDF that contains all of your book's content. This
page describes a few ways to do so.

:::{warning}
PDF building is experimental, and may change or have bugs.
:::

There are two approaches to building PDF files:

```{contents}
:depth: 2
```

(pdf-html)=
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

(pdf/latex)=
## Build a PDF using LaTeX

You can also use LaTeX to build a PDF of your book. This can behave differently depending on your
operating system and setup. This section tries to recommend a few best-practices.

### Installation

For `Debian`-based `Linux` platforms it is recommended to install the following packages:

```bash
sudo apt-get install texlive-latex-recommended texlive-fonts-recommended texlive-latex-extra latexmk
```

Alternatively you can install [TeX Live](https://www.tug.org/texlive/quickinstall.html)

For `OSX` you may want to use [MacTeX](http://www.tug.org/mactex/) which is a more
user friendly approach. Alternatively you may also use [TeX Live](https://www.tug.org/texlive/quickinstall.html).

For `Windows` users, please install [TeX Live](https://www.tug.org/texlive/windows.html).

### Build

To build a single PDF using LaTeX, use the following command:

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
