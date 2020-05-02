# Books with Jupyter

Jupyter Book is an open-source tool for building publication-quality books and documents from computational material.

Jupyter Book allows users to

* write their content in [markdown files](https://myst-parser.readthedocs.io/en/latest/) or [Jupyter](https://jupyter.org/) notebooks,
* include computational elements (e.g., code cells) in either type,
* include rich syntax such as citations, cross-references, and numbered equations, and
* using a simple command, run the embedded code cells, [cache](https://jupyter-cache.readthedocs.io/en/latest/) the outputs and convert this content into:
    * a web-based interactive book and
    * a publication-quality PDF.

```{warning}
This is an early-release of a re-write of Jupyter Book. It may change slightly but is ready for general
testing and use. See the {ref}`example-project` section below to get started.
[Feedback](https://github.com/executablebooks/jupyter-book/issues/new) is very welcome!

For the old Jupyter Book documentation, see [legacy.jupyterbook.org](https://legacy.jupyterbook.org)
```

(example-project)=
## A Small Example Project

Here's [a short example](https://executablebooks.github.io/quantecon-mini-example/docs/index.html) of a web-based book created by Jupyter Book.

Some of the features on display include

* [Jupyter notebook-style inputs and outputs](https://executablebooks.github.io/quantecon-mini-example/docs/python_by_example.html#version-1)
* [citations](https://executablebooks.github.io/quantecon-mini-example/docs/about_py.html#bibliography)
* [numbered equations](https://executablebooks.github.io/quantecon-mini-example/docs/python_by_example.html#another-application)
* [numbered figures](https://executablebooks.github.io/quantecon-mini-example/docs/getting_started.html#jupyter-notebooks) with captions and cross-referencing

The source files  can be [found on GitHub](https://github.com/executablebooks/quantecon-mini-example/) in the [docs directory](https://github.com/executablebooks/quantecon-mini-example/tree/master/mini_book/docs).

These files are written in [MyST markdown](https://myst-parser.readthedocs.io/en/latest/), an
extension of Jupyter notebook markdown that allows for
additional scientific markup (e.g., numbered equations).

They could alternatively have been written directly as Jupyter notebooks.

In fact the MyST source files can be edited as either text files or Jupyter notebooks,  via [Jupytext](https://jupytext.readthedocs.io/en/latest/introduction.html).

Note that

* Jupytext [supports](https://jupytext.readthedocs.io/en/latest/formats.html#myst-markdown) the MyST markdown format.

* If editing the markdown files using VS Code, the [MyST markdown extension](https://marketplace.visualstudio.com/items?itemName=executablebooks.myst-highlight) provides syntax highlighting and other features.

### Build the demo book

You can build this book locally on the command line via the following steps:

1. Ensure you have a recent version of [Anaconda Python](https://www.anaconda.com/distribution/) installed.

2. Install the Python libraries needed to run the code in this particular example:

    ```
    conda install numpy scipy matplotlib sympy pandas
    ```

3. Install the pre-release for Jupyter Book

    ```
    pip install -U jupyter-book --pre
    ```

4. Clone the repository containing the source files

    ```
    git clone https://github.com/executablebooks/quantecon-mini-example
    ```

5. Run Jupyter Book over the source files

    ```
    cd quantecon-mini-example
    jupyter-book toc mini_book/docs
    jupyter-book build mini_book/docs
    ```

6. View the result through a browser --- try (with, say, firefox)


    ```
    firefox mini_book/docs/_build/html/index.html
    ```

    or

    ```
    cd mini_book/docs/_build/html
    python -m http.server
    ```

    and point your browser at the indicated port (e.g., ``localhost:8000``).

Now you might like to try editing the files in ``mini_book/docs`` and then
rebuilding.

### Further Reading

See [here](https://executablebooks.github.io/quantecon-example/docs/index.html)
for a longer Jupyter Book use case, drawn from the same source material.

The remaining documentation provides more information on installation, use and
features of Jupyter Book.



## The components of Jupyter Book

Jupyter Book is a wrapper around a collection of tools in the Python
ecosystem that make it easier to publish computational documents. Here are
a few key pieces:

* It uses {term}`the MyST markdown language<MyST>` in
  markdown and notebook documents. This allows users to write rich,
  publication-quality markup in their documents.
* It uses {term}`the MyST-NB package<MyST-NB>` to parse and
  read-in notebooks so they are built into your book.
* It uses {term}`the Sphinx documentation engine<Sphinx>`
  to build outputs from your book's content.
* It uses a slightly-modified version of the [PyData Sphinx theme](https://pydata-sphinx-theme.readthedocs.io/en/latest/)
  for beautiful HTML output.
* It uses a collection of Sphinx plugins and tools to add new functionality.

For more information about the project behind many of these tools, see
[The Executable Book Project](https://ebp.jupyterbook.org/) documentation.


## Get started

To get started, check out the pages above. These are major sections of the documentation.
In particular, {doc}`start/overview` is a good way to get familiar with this tool and how to
create your own books.

## Install

Install the pre-release of Jupyter Book from PyPI. This version of
Jupyter Book may change a bit, but is ready for use.

```
pip install -U jupyter-book --pre
```

## Develop

First clone the package:

```
git clone https://github.com/executablebooks/jupyter-book
cd jupyter-book
```

Next, install:

```
pip install -e .[testing]
```

See {doc}`advanced/contributing` for more information.

## Use

The primary way to use this tool is via the command line. It provides a
top-level command called `jupyter-book`, and a number of sub-commands.
Run `jupyter-book -h` for more information.

For more information on how to use this tool, see {doc}`start/overview`.
