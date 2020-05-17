# PDFs for your book

It is possible to build a single PDF that contains all of your book's content. This
page describes a few ways to do so.

```{warning}
PDF building is experimental, and may change or have bugs.
```

There are two approaches to building PDF files:

```{contents}
:depth: 2
```

(pdf-html)=
## Build a PDF from your book HTML

It is also possible to build a single PDF from your book's HTML. This first
converts all of your book's content into a single HTML file, and then renders
it as a PDF by emulating a browser from the command-line.

### Installation

Your system will need to use `pyppeteer` to parse the generated html for
conversion to PDF.

### Installing pyppeteer

If you wish to build a PDF from your book's HTML, you will need the `pyppeteer` package.
You can install it like so:

```
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

```
jupyter-book build mybookname/ --builder pdfhtml
```

or

```
jb build mybookname/ --builder pdfhtml
```

```{warning}
If you get a "MaxRetryError" and see mentions of SSL in the error message when
when building the PDF, this could be due to a bug in `pyppeteer` as it downloads
Chromium for the first time. See [this github comment](https://github.com/miyakogi/pyppeteer/issues/258#issuecomment-563075764)
for a potential fix, and [this jupyter book issue](https://github.com/executablebooks/jupyter-book/issues/593)
where we're tracking the issue.
```

(pdf-latex)=
## Build a PDF using Latex

You can also use Latex to build a PDF of your book. This can behave differently depending on your
operating system and setup. This section tries to recommend a few best-practices.

### Installation

For `Debian` based `Linux` platforms it is recommended to install the following packages.

```bash
sudo apt-get install texlive-latex-recommended texlive-fonts-recommended texlive-latex-extra latexmk
```

alternativey you can install [texlive](https://www.tug.org/texlive/quickinstall.html)

For `OSX` you may want to use [mactex](http://www.tug.org/mactex/) which is a more
user friendly approach, alternatively you may use [texlive](https://www.tug.org/texlive/quickinstall.html)

For `Windows` please install [texlive](https://www.tug.org/texlive/windows.html)

### Build

To build a single PDF using LaTeX, use the following command:

```
jupyter-book build mybookname/ --builder pdflatex
```

or

```
jb build mybookname/ --builder pdflatex
```

```{note}
If you would just like to generate the **latex** file you may use:

jb build mybookname/ --builder latex
```
