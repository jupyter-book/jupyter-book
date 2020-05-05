# Developing Jupyter Book

## Get started

To get started with Jupyter Book's *codebase*, take the following steps:

First clone the package:

```
git clone https://github.com/executablebooks/jupyter-book
cd jupyter-book
```

Next, install:

```
pip install -e .[testing]
```

For information

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
* **The `page` module builds single pages**. This module is meant to be self-contained for
  converting single `.ipynb`/`.md`/etc pages into HTML. Jupyter Book uses this module when
  building entire books, but the module can also be used on its own (it's what `jupyter-book page` uses).
  You can find the module at: [`jupyter_book/page`](https://github.com/executablebooks/jupyter-book/tree/master/jupyter_book/page).
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
