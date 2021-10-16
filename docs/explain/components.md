(intro/jupyter-book-components)=
# The Jupyter Book toolchain and components

Jupyter Book is a wrapper around a collection of tools in the Python ecosystem that make it easier to publish computational documents.
Here are a few key pieces:

* It uses {term}`the MyST Markdown language<MyST>` in
  Markdown and notebook documents.
  This allows users to write rich, publication-quality markup in their documents.
* It uses {term}`the MyST-NB package<MyST-NB>` to parse and
  read-in notebooks so they are built into your book.
* It uses {term}`the Sphinx documentation engine<Sphinx>`
  to build outputs from your book's content.
* It uses a slightly modified version of the [PyData Sphinx theme](https://pydata-sphinx-theme.readthedocs.io/en/latest/) for beautiful HTML output.
* It uses a collection of Sphinx plugins and tools to add new functionality.

For more information about the project behind many of these tools, see [The Executable Book Project](https://ebp.jupyterbook.org/) documentation.
