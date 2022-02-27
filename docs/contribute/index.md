# Contribute to Jupyter Book

Welcome to the `jupyter-book` repository! We're excited you're here and want to contribute. ✨
This section describes a few ways that you can contribute to Jupyter Book, and how to get started.

The links below point to more specific contribution guidelines, the sections below cover general getting started steps.

```{tableofcontents}
```

## Our Code of Conduct

The Executable Books community follows [this Code of Conduct](https://github.com/executablebooks/.github/blob/master/CODE_OF_CONDUCT.md) to ensure that our online spaces are enjoyable, inclusive, and productive for all contributors.

## Get started

To suggest a change to Jupyter Book, you'll need to grab a copy of the repository.
The sections below cover how to do this.

### Clone and install the package

```bash
git clone https://github.com/executablebooks/jupyter-book
cd jupyter-book
```

Next, install the codebase with all of the relevant dependencies like so:

```bash
python -m pip install -e .[testing,code_style]
```

This will install Jupyter Book locally, along with the packages needed to test it
as well as packages for ensuring code style.

### Download `tox`

We use [the command-line tool `tox`](https://tox.wiki/en/latest/) to automate many things when developing Jupyter Book.
This tool lets you automatically define isolated environments and run commands in those environments.
This makes it much easier to quickly do common development tasks such as building the documentation or running tests.

To install `tox`, run:

```python
pip install tox
```

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

## Repository structure of Jupyter Book

This section covers the general structure of the
[Jupyter Book repository](https://github.com/executablebooks/jupyter-book), and
explains which pieces are where.

The Jupyter Book repository contains two main pieces:

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

## What happens when a book is built

Here are a few examples of how this code gets used to help you get started.

* when somebody runs `jupyter-book create mybook/`, the `create.py` module is used to generate an empty template using the template in `jupyter_book/book_template/`.
* when somebody runs `jupyter-book build mybook/`, the `build.py` module loops through your page content files,
  and uses the `page/` module to convert each one into HTML and places it in `mybook/_build`.

Hopefully this explanation gets you situated and helps you understand how the pieces all fit together.
If you have any questions, feel free to [open an issue asking for help](https://github.com/executablebooks/jupyter-book/issues/new)!

## Other major tools in the Jupyter Book stack

Jupyter Book is a **distribution of Sphinx**, meaning that it integrates many independent tools and customizes them.
There is a good chance that the functionality you wish to improve is actually part of a different tool or extension that is used by Jupyter Book.

Here is a list of the major tools and what kinds of functionality they support:

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
