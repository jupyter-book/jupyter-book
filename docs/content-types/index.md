# Types of content source files

Jupyter Book supports many kinds of source files for your book's content.
These sections cover the major types of content, and how you can control
their behavior in Jupyter Book. See the list of sections to the left for information
about each type/

## Overview of content types

In general, these are the types of content supported in Jupyter Book (along with
links to their section in this book):

* [Markdown files](markdown). These are text files written in either CommonMark
  or in MyST Markdown.
* [Jupyter Notebooks](notebooks). AKA, `.ipynb` files. These files can contain
  markdown cells with MyST Markdown.
* [MyST markdown notebooks](myst-notebook). These are markdown files (ending in `.md`)
  that will be *converted to a notebook and executed*.

## Rules for all content types

There are a few things that are true for all content types. Here is a short list:

* **Files must have a title**. Generally this means that they must begin with
  a line that starts with a single `#`
* **Sections should increase linearly**. If you're inside of a section with
  one `#`, then the next section lower should start with `##`. Avoid jumping straight
  from `#` to `###`.

## Two-way conversion between text-files and `.ipynb` files

For information about how to convert between text files and `.ipynb` files for use
with Jupyter Book, see {doc}`jupytext`.
