# Contribute to Jupyter Book

Welcome to the `jupyter-book` repository! We're excited you're here and want to contribute. ✨

:::{admonition} Be sure to check out our Code of Conduct
The Executable Books community follows [this Code of Conduct](https://github.com/executablebooks/.github/blob/master/CODE_OF_CONDUCT.md) to ensure that our online spaces are enjoyable, inclusive, and productive for all contributors.
:::

## Development guidelines

For information about development conventions, practices, and infrastructure, please see [the `executablebooks/` development guidelines](https://github.com/executablebooks/.github/blob/master/CONTRIBUTING.md).

## Documentation guidelines

The documentation of Jupyter Book is inspired by the [Diataxis Documentation Framework](https://diataxis.fr/).
This separates documentation into four main areas:

- **Tutorials** are step-by-step guides that are learning-oriented.
  They give the learner a feel for how a tool works, and get them excited about learning more.
  Tutorials live in a dedicated section of the documentation.
- **How-To guides** are shorter guides that tell the reader how to do something.
  They assume more background knowledge of Jupyter Book (often, that they have read the tutorial).
  They are focused on "doing things" rather than long explanations.
  How-To guides make up most of Jupyter Book's documentation, and are separated into sections for various topics.
- **Reference** documentation _describes_ Jupyter Book's structure and functionality in a complete sense.
  It is more programmatic, less narrative, and more interested in covering all configuration and options in Jupyter Book rather than describing how and when to use them.
  Jupyter Book has a reference section after our topic sections.
  In addition, it has an organization-level reference section just underneath.
- **Explanations** are higher-level discussions about topics and concepts related to Jupyter Book.
  They are less focused on doing things, and more focused on gaining a conceptual framework for how Jupyter Book works.
  Jupyter Book currently has no dedicated explanation section, but welcomes the addition of explanatory content and potentially a dedicated section.

These four areas are not **strict rules** for the Jupyter Book documentation, but should serve as inspiration in deciding what to document, and where.
Any contributions to the documentation that fall within this framework (e.g., adding a new tutorial, adding a How To section) are most-welcome!

## Getting started

To get started with Jupyter Book's *codebase*, take the following steps:

### Clone and install the package

```bash
git clone https://github.com/executablebooks/jupyter-book
cd jupyter-book
```

Next, install:

```bash
python -m pip install -e .[testing,code_style]
```

This will install Jupyter Book locally, along with the packages needed to test it
as well as packages for ensuring code style.

### Install the pre-commit hooks

Jupyter Book uses [pre-commit](https://pre-commit.com/) to ensure code style
and quality before a commit is made. This ensures that the look and feel of Jupyter Book
remains consistent over time and across developers. `pre-commit` is installed when you
install Jupyter Book with `pip install -e .[code_style]`.

To enable `pre-commit` for your clone, run the following from the repository root:

```bash
pre-commit install
```

From now on, when you make a commit to Jupyter Book, `pre-commit` will ensure that your
code looks correct according to a few checks.

### Run the tests

For code tests, Jupyter Book uses [pytest](https://docs.pytest.org).
You may run all the tests, or only ones that do not require additional installations, with the following command:

```shell
>> pytest -m 'not requires_chrome and not requires_tex'
```

You can alternatively use [tox](https://tox.readthedocs.io) to run the tests in multiple isolated environments, and also without the need for the initial dependencies install (see the `tox.ini` file for available test environments and further explanation):

```shell
>> tox -e py39-sphinx4 -- -m 'not requires_chrome and not requires_tex'
```

Either will run the Jupyter Book test suite, *except for the PDF tests*.
This is because running the PDF generation tests requires a full LaTeX environment, which you may not have set up.

:::{note}
Jupyter Book makes use of [pytest-xdist](https://github.com/pytest-dev/pytest-xdist) for running tests in parallel.
You can take advantage of this by running tests with the `-n` argument followed by the number of CPUs you would like to use.
For example: `pytest -n 4`. This makes the tests run much faster.
:::

### To test PDF generation

If you'd like to test (or try out) the generation of PDFs, take the following steps:

**To generate PDFs via HTML**, make sure you install Jupyter Book with
`pip install -e .[pdfhtml]`. This will install [`pyppeteer`](https://github.com/pyppeteer/pyppeteer),
which runs a headless chrome session to convert your book to PDF. Next, follow
the installation instructions at {ref}`pdf:html`. You should then be able to build your
book's PDF through HTML.

**To generate PDFs via LaTeX**, make sure you install a working LaTeX distribution locally.
Do so by following the instructions in {ref}`pdf:latex`.

If you have installed the requirements for both HTML and LaTeX generation, you should
be able to run the full test suite with pytest.

### GitHub Actions Artifacts

A test included for each pull request is to build the `docs` as `PDF` files using both the
`pdfhtml` and `pdflatex` writers. These tests build the `pdf` file and then save them as artifacts
attached to each workflow run.

These `pdf` files can be retrieved from the [top right corner of a workflow run](https://github.com/actions/upload-artifact#where-does-the-upload-go).

## Repository structure of Jupyter Book

This section covers the general structure of the
[Jupyter Book repository](https://github.com/executablebooks/jupyter-book), and
explains which pieces are where.

The Jupyter Book repository contains two main pieces:

### MyST Markdown

Jupyter Book supports an *extended version of Jupyter Markdown* called "MyST Markdown".
For information about the MyST syntax and how to use it, see
[the MyST-Parser documentation](https://myst-parser.readthedocs.io/en/latest/using/syntax.html).

### The command-line tool and Python package

This is used to help create and build books.
It can be found at [`./jupyter_book`](https://github.com/executablebooks/jupyter-book/tree/master/jupyter_book).

* **The `commands/` folder has the CLI**. This is the interface for users to create, build and control their book via the command-line.
* **The `sphinx.py` module builds the books**.
* **The `yaml.py` module handles configuration**.
* **The `toc.py` module prepares the table of contents**.

The other modules handle more specific functionality in Jupyter Book - see their
module docstrings for more information.

### The template Jupyter Book

Jupyter Book comes bundled with a small template book to show off content. This can
be immediately built with `jupyter-book build`.
It can be found at [`jupyter_book/book_template`](https://github.com/executablebooks/jupyter-book/tree/master/jupyter_book/book_template).

### An example

Here are a few examples of how this code gets used to help you get started.

* when somebody runs `jupyter-book create mybook/`, the `create.py` module is used to generate an empty template using the template in `jupyter_book/book_template/`.
* when somebody runs `jupyter-book build mybook/`, the `build.py` module loops through your page content files,
  and uses the `page/` module to convert each one into HTML and places it in `mybook/_build`.

Hopefully this explanation gets you situated and helps you understand how the pieces all fit together.
If you have any questions, feel free to [open an issue asking for help](https://github.com/executablebooks/jupyter-book/issues/new)!

## Other major tools in the Jupyter Book stack

Jupyter Book depends on a collection of open source tools in the Python / Sphinx
ecosystem. These tools do much of the heavy lifting of Jupyter Book, and are where
many improvements and changes will need to be. Here is a list of the major tools and
what kinds of functionality they support:

* {term}`The Sphinx Documentation engine<Sphinx>` is used to build book outputs. This relies
  on a number of extensions that are developed by Jupyter Book.
* {term}`MyST Markdown<MyST>` is parsed into Sphinx by
  {term}`the MyST-Parser<MyST-Parser>`.
* {term}`The MyST-NB package<MyST-NB>` parses Jupyter Notebooks into Sphinx and also
  controls some parts of notebook execution.
  It also allows [inserting code outputs into content](content:code-outputs:glue).
* {term}`Jupyter-Cache` manages the execution and cacheing of notebook content at
  build time. It is controlled by {term}`MyST-NB`.
* The {term}`Sphinx Book Theme` defines the look and feel of Jupyter Book, and is
  where most of the CSS rules are defined.
