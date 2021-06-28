# Books with Jupyter <img src="images/logo-square.svg" width=40 />

```{only} html
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.2561065.svg)](https://doi.org/10.5281/zenodo.2561065)
[![Jupyter Book Badge](images/badge.svg)](https://jupyterbook.org)
```

Jupyter Book is an open source project for building beautiful,
publication-quality books and documents from computational material.

Here are some of the features of Jupyter Book:

{fa}`check,text-success mr-1` [Write publication-quality content in Markdown](file-types/markdown)
: You can write in either Jupyter Markdown, or an extended flavor of Markdown with [publishing features](content/myst).
  This includes support for rich syntax such as [citations and cross-references](content/citations), [math and equations](content/math), and [figures](content/figures).

{fa}`check,text-success mr-1` [Write content in Jupyter Notebook](file-types/notebooks)
: This allows you to include your code and outputs in your book.
  You can also write notebooks [entirely in Markdown](file-types/myst-notebooks) that get executed when you build your book.

{fa}`check,text-success mr-1` [Execute and cache your book's content](content/execute)
: For `.ipynb` and Markdown notebooks, execute code and insert the latest outputs into your book.
  In addition, {ref}`cache and re-use<execute/cache>` outputs to be used later.

{fa}`check,text-success mr-1` [Insert notebook outputs into your content](content:code-outputs)
: Generate outputs as you build your documentation, and insert them in-line with your content across pages.

{fa}`check,text-success mr-1` [Add interactivity to your book](interactive/launchbuttons)
: You can [toggle cell visibility](interactive/hiding), include [interactive outputs](interactive/interactive) from Jupyter, and [connect with online services](interactive/launchbuttons) like Binder.

{fa}`check,text-success mr-1` [Generate a variety of outputs](start/build)
: This includes single- and multi-page websites, as well as [PDF outputs](advanced/pdf).

{fa}`check,text-success mr-1` [Build books with a simple command-line interface](reference/cli)
: You can quickly generate your books with one command, like so: `jupyter-book build mybook/`

This website is built with Jupyter Book! You can browse its contents to the
left to see what is possible.

:::{admonition} Learn more and get involved
:class: tip

Jupyter Book is an open community that welcomes your feedback, input, and contributions!

💡 [Open an issue](https://github.com/executablebooks/jupyter-book/issues/new/choose)
: to provide feedback and new ideas, and to help others.

📚 [See the Jupyter Book Gallery](http://gallery.jupyterbook.org)
: to be inspired by Jupyter Books that others have created.

👍 [Vote for new features](ebp:feature-note)
: by adding a +1 to issues you'd like to see completed.

🙌 [Contribute to Jupyter Book](contribute/intro.md)
: by following our contributing guidelines and finding an issue to work on. See {ref}`the feature voting leaderboard <ebp:feature-note>` for inspiration.

:::

## Install Jupyter Book

You can install Jupyter Book [via `pip`](https://pip.pypa.io/en/stable/):

```bash
pip install -U jupyter-book
```

This will install everything you need to build a Jupyter Book locally.

## Get started

To get started with Jupyter Book, you can either

* check out the [getting started guide](start/overview),
* browse the contents of the navigation menu of this book (to the left, if you're
on a laptop), or
* review the example project shown immediately below (if you like learning from examples).

:::{warning}
Jupyter Book `0.8` is a total re-write from previous versions, and some things have changed.
See [the legacy upgrade guide](https://github.com/executablebooks/jupyter-book/wiki/The-Jupyter-Book-Wiki)
for how to upgrade, and [legacy.jupyterbook.org](https://legacy.jupyterbook.org) for
legacy documentation.

In addition, note that Jupyter Book is pre-1.0. Its API may change!
:::

To install `jupyter-book` from pip, run the following command:

```bash
pip install -U jupyter-book
```

{ref}`create-a-template-book` to get started right away, or see the [getting started guide](start/overview) for more information.

(example-project)=
## A small example project

Here's [a short example](https://executablebooks.github.io/quantecon-mini-example/docs/index.html) of a web-based book created by Jupyter Book.

Some of the features on display include

* [Jupyter Notebook-style inputs and outputs](https://executablebooks.github.io/quantecon-mini-example/docs/python_by_example.html#version-1)
* [citations](https://executablebooks.github.io/quantecon-mini-example/docs/about_py.html#bibliography)
* [numbered equations](https://executablebooks.github.io/quantecon-mini-example/docs/python_by_example.html#another-application)
* [numbered figures](https://executablebooks.github.io/quantecon-mini-example/docs/getting_started.html#jupyter-notebooks) with captions and cross-referencing

The source files can be [found on GitHub](https://github.com/executablebooks/quantecon-mini-example/)
in the [docs directory](https://github.com/executablebooks/quantecon-mini-example/tree/master/mini_book/docs).
These files are written in [MyST Markdown](content/myst), an
extension of the Jupyter Notebook Markdown, that allows for additional scientific markup.
They could alternatively have been written directly as Jupyter notebooks.

**Build the demo book**

You can build this book locally on the command line via the following steps:

1. Ensure you have a recent version of [Anaconda Python](https://www.anaconda.com/distribution/) installed.

2. Clone the repository containing the demo book source files

    ```bash
    git clone https://github.com/executablebooks/quantecon-mini-example
    cd quantecon-mini-example
    ```

    ````{margin}
    If you'd like to install Jupyter Book with `pip`, you can do so with:

    ```bash
    pip install -U jupyter-book
    ```
    See [the getting started page](start/overview) for more information.
    ````

3. Install the Python libraries needed to run the code in this particular example
   from [the `environment.yml` file](https://github.com/executablebooks/quantecon-mini-example/blob/master/environment.yml).
   This includes the latest version of Jupyter Book:

    ```bash
    conda env create -f environment.yml
    conda activate qe-mini-example
    ```

4. Run Jupyter Book over the source files

    ```bash
    jupyter-book build ./mini_book
    ```

5. View the result through a browser --- try (with, say, firefox)

    ```bash
    firefox mini_book/_build/html/index.html
    ```

    (or simply double-click on the `html` file)

Now you might like to try editing the files in ``mini_book/docs`` and then
rebuilding.

### Further reading

See [the full QuantEcon example](https://executablebooks.github.io/quantecon-example/docs/index.html)
for a longer Jupyter Book use case, drawn from the same source material.

For more information on how to use Jupyter Book, see {doc}`start/overview`.

(intro/jupyter-book-components)=
## Under the hood - the components of Jupyter Book

Jupyter Book is a wrapper around a collection of tools in the Python
ecosystem that make it easier to publish computational documents.
Here are
a few key pieces:

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

## Contribute to Jupyter Book

Jupyter Book is an open project and we welcome your feedback and contributions!
To contribute to Jupyter Book, see {doc}`contribute/intro`.

## Acknowledgements

Jupyter Book is supported by an [open community of contributors](https://github.com/executablebooks/jupyter-book/graphs/contributors), many of whom come from [the Jupyter community](https://jupyter.org/community).
Jupyter Book and many of the tools it uses are stewarded by [the Executable Book Project](https://executablebooks.org), which is supported in part by [the Alfred P. Sloan foundation](https://sloan.org/grant-detail/9231).
