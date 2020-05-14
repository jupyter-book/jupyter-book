# Developing Jupyter Book

This page contains information about developing and running the code used by
Jupyter Book. For more general information about contributing to Jupyter Book,
see {doc}`intro`.

## Get started

To get started with Jupyter Book's *codebase*, take the following steps:

### Clone and install the package

```
git clone https://github.com/executablebooks/jupyter-book
cd jupyter-book
```

Next, install:

```
pip install -e .[testing,code_style,sphinx]
```

This will install Jupyter Book locally, along with the packages needed to test it
as well as packages for ensuring code style.

### Install the pre-commit hooks

Jupyter Book uses [pre-commit](https://pre-commit.com/) to ensure code style
and quality before a commit is made. This ensures that the look and feel of Jupyter Book
remain consistent over time and across developers. `pre-commit` is installed when you
install jupyter book with `pip install -e .[code_style]`.

To enable `pre-commit` for your clone, run the following from the repository root:

```
pre-commit install
```

From now on, when you make a commit to Jupyter Book, `pre-commit` will ensure that your
code looks correct according to a few checks.

### Run the tests

For information about running tests, see {ref}`developer/tests`.

## Code style

Jupyter Book follows [PEP8 style](https://www.python.org/dev/peps/pep-0008/) for its
code, which it enforces by running [**flake8**](https://pypi.org/project/flake8/) as a
part of pre-commit hooks and tests.

In addition, Jupyter Book [the `black` code formatter](https://black.readthedocs.io/en/stable/).
This defines the *structure* of the code, but does not change its function.

(developer/tests)=
## Testing infrastructure

Jupyter Book uses [**`pytest`**](https://docs.pytest.org/en/latest/) for its testing
infrastructure. You may run the tests with the following command:

```
pytest --ignore=tests/test_pdf.py
```

This will run the Jupyter Book test suite, *except for the PDF tests*. This is because
running the PDF generation tests require a full Latex environment, which you may not have
set up.

### To test PDF generation

If you'd like to test (or try out) the generation of PDFs, take the following steps:

**To generate PDFs via HTML**, make sure you install Jupyter Book with
`pip install -e .[pdfhtml]`. This will install [`pyppeteer`](https://github.com/pyppeteer/pyppeteer),
which runs a headless chrome session to convert your book to PDF. Next, follow
the installation instructions at {ref}`pdf-html`. You should then be able to build your
book's PDF through HTML.

**To generate PDFs via Latex**, make sure you install a working latex distribution locally.
Do so by following the instructions in {ref}`pdf-latex`.

If you have installed the requirements for both HTML and Latex generation, you should
be able to run the full test suite with pytest.


## Repository Structure of Jupyter Book

This section covers the general structure of the
[Jupyter Book repository](https://github.com/executablebooks/jupyter-book), and
explains which pieces are where.

The Jupyter Book repository contains two main pieces:

### MyST markdown

Jupyter Book supports an *extended version of Jupyter Markdown* called "MyST markdown".
For information about the myst syntax and how to use it, see
[the myst parser documentation](https://myst-parser.readthedocs.io/en/latest/using/syntax.html).

### The command-line tool and Python package

This is used to help create and build books.
It can be found at [`./jupyter_book`](https://github.com/executablebooks/jupyter-book/tree/master/jupyter_book).
* **The `commands/` folder has the CLI**. This is the interface for users to create,
  build, and control their book via the command-line.
* **The `sphinx.py` module builds the books**.
* **The `yaml.py` module handles configuration**.
* **The `toc.py` module prepares the table of contents**.

The other modules handle more specific functionality in Jupyter Book - see their
module docstrings for more information.

### The template Jupyter Book

Jupyter Book comes bundled with a small template book to show off content. This can
be immediately built with `jupyter-book build`. It can be found at
[`jupyter_book/book_template`](https://github.com/executablebooks/jupyter-book/tree/master/jupyter_book/book_template).

### An example

Here are a few examples of how this code gets used to help you get started.

* when somebody runs `jupyter-book create mybook/`, the `create.py` module is used to generate an empty template using the template in `jupyter_book/book_template/`.
* when somebody runs `jupyter-book build mybook/`, the `build.py` module to loop through your page content files,
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
* {term}`MyST markdown<MyST>` is parsed into Sphinx by
  {term}`the MyST Parser<MyST-Parser>`.
* {term}`The MyST-NB package<MyST-NB>` parses Jupyter Notebooks into Sphinx and also
  controls some parts of notebook execution. It also provdes
  {doc}`inserting code outputs into content <../content/glue>`.
* {term}`Jupyter-Cache` manages the execution and cacheing of notebook content at
  build time. It is controlled by {term}`MyST-NB`.
* The {term}`Sphinx-Book-Theme` defines the look and feel of Jupyter Book, and is
  where most of the CSS rules are defined.
