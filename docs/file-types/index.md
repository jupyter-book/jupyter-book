(file-types:index)=
# Types of content source files

Jupyter Book supports many kinds of source files for your book's content.
These sections cover the major types of content and how you can control their behavior in Jupyter Book.
See the list of sections to the left for information about each type.

## Section table of contents

```{tableofcontents}
```

## Allowed content types

In general, these are the types of content supported by Jupyter Book (along with
links to their section in this book):

[Markdown files](./markdown.md)
: These are text files written in either CommonMark or in MyST Markdown.

[Jupyter notebooks](./notebooks.md)
: AKA, `.ipynb` files. These files can contain Markdown cells with MyST Markdown.
: A Jupyter notebook can utilise any program kernel that implements the [Jupyter messaging protocol](http://jupyter-client.readthedocs.io/en/latest/messaging.html) for executing code.
  There are kernels available for [Python](http://ipython.org/notebook.html), [Julia](https://github.com/JuliaLang/IJulia.jl), [Ruby](https://github.com/minad/iruby), [Haskell](https://github.com/gibiansky/IHaskell) and [many other languages](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels).

[MyST Markdown notebooks](./myst-notebooks.md)
: These are Markdown files (ending in `.md`) that will be *converted to a notebook and executed*.

[reStructuredText](./restructuredtext.md).
: These are text files used by the Sphinx documentation engine (which is used by Jupyter Book).
  It is recommended to use MyST Markdown instead.

[Custom notebook formats](file-types:custom)
: Any other file type can be *auto-converted* before execution by assigning it a custom Python function, for example those provided by the Jupytext conversion tool.

(rules-all-content-types)=
## Rules for all content types

There are a few things that are true for all content types. Here is a short list:

* **Files must have a title**. Generally this means that they must begin with
  a line that starts with a single `#`
* **Use only one top-level header**. Because each page must have a clear
  title, it must also only have one top-level header. You cannot have multiple
  headers with single `#` tag in them.
* **Headers should increase linearly**. If you're inside of a section with
  one `#`, then the next nested section should start with `##`. Avoid jumping straight
  from `#` to `###`.

## Two-way conversion between text-files and `.ipynb` files

For information about how to convert between text files and `.ipynb` files for use
with Jupyter Book, see [](file-types:custom:jupytext).
