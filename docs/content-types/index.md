# Types of content source files

Jupyter Book supports many kinds of source files for your book's content.
These sections cover the major types of content, and how you can control
their behavior in Jupyter Book. See the list of sections to the left for information
about each type/

## Allowed content types

In general, these are the types of content supported in Jupyter Book (along with
links to their section in this book):

* [Markdown files](markdown). These are text files written in either CommonMark
  or in MyST Markdown.
* [Jupyter Notebooks](notebooks). AKA, `.ipynb` files. These files can contain
  markdown cells with MyST Markdown.
* [MyST markdown notebooks](myst-notebooks). These are markdown files (ending in `.md`)
  that will be *converted to a notebook and executed*.
* [reStructuredText](restructuredtext). These are text files used by the Sphinx
  documentation engine (which is used by Jupyter Book). It is recommended to use
  MyST Markdown instead.

## Rules for all content types

There are a few things that are true for all content types. Here is a short list:

* **Files must have a title**. Generally this means that they must begin with
  a line that starts with a single `#`
* **Use only one top-level header**. Because each page must have a clear
  title, it must also only have one top-level header. You cannot have multiple
  headers with single `#` tags in them.
* **Headers should increase linearly**. If you're inside of a section with
  one `#`, then the next section lower should start with `##`. Avoid jumping straight
  from `#` to `###`.

## Two-way conversion between text-files and `.ipynb` files

For information about how to convert between text files and `.ipynb` files for use
with Jupyter Book, see {doc}`jupytext`.
