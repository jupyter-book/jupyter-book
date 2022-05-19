# How Jupyter Book and Sphinx relate to one another

Jupyter Book utilizes [Sphinx](https://www.sphinx-doc.org/en/master/) heavily under the hood.
In fact, Jupyter Book can be thought of as an _opinionated distribution of Sphinx_.
This is a short explanation of how Jupyter Book and Sphinx relate to one another.

## What is Sphinx?

Sphinx is [an open-source documentation engine](https://www.sphinx-doc.org/en/master/) that has been popular in the Python community for nearly a decade.
Sphinx is based on the [Docutils](https://docutils.sourceforge.io/) core Python package, which provides a data structure for *documents* in Python.
Docutils has no concept of multi-page documents, and so Sphinx uses the basic Docutils data structure, and includes multi-page features such as cross-references and citations and multi-pages table of contents.

Sphinx primarily uses a markup language called [reStructuredText](https://docutils.sourceforge.io/rst.html) to write documents.
This is similar to markdown, though is less-popular and more flexible.
In contrast, Jupyter Book uses [MyST Markdown](https://myst-parser.readthedocs.io/en/latest/), which was created to provide the flexibility of rST but for people who wish to write markdown.

Sphinx is also highly _extensible_ - developers can write extensions and themes that allow Sphinx to do extra things not baked into the core tool.

:::{seealso}
For more information about Sphinx, check out the [ReadTheDocs Sphinx Tutorial](https://docs.readthedocs.io/en/stable/intro/getting-started-with-sphinx.html).
:::

## Jupyter Book is a distribution of Sphinx

Jupyter Book uses Sphinx for almost everything that it does.
For example - resolving cross-references, generating HTML or PDFs, reading in source files and Jupyter Notebooks, etc.
It accomplishes this via activating a number of _Sphinx Extensions_ that the [Executable Books Team](https://executablebooks.org) has created.
These extensions grow Sphinx's capabilities so that it can handle the use-cases of Jupyter Book.

:::{admonition} An example: MyST Markdown
:class: tip
Let's take the case of MyST Markdown.
As mentioned, Sphinx cannot read in markdown files by default, but we'd like our users to do so.
We can extend Sphinx's functionality by installing and activating a markdown parser.
The [MyST Parser](https://myst-parser.readthedocs.io/en/latest/) provides a Sphinx extension that allows Sphinx to read in MyST Markdown.
By installing this extension, and adding it to my Sphinx project's list of extensions, Sphinx will now automatically read in `.md` files.
:::

When Jupyter Book builds a book, it first activates this core set of Jupyter Book-specific Sphinx extensions.
It then translates your `_config.yml` into Sphinx's own configuration language, and uses Sphinx's build command to build the book.
You can see the Sphinx configuration file that Jupyter Book uses by running the following command:

```bash
jupyter-book config sphinx path/to/mybook/
```

## How does Jupyter Book differ from Sphinx?

Beyond having a few extensions pre-activated, there are a couple of other ways that Jupyter Book differs from Sphinx.

**Table of Contents** - In Sphinx, the structure of the document is determined by _directives_ called `{toctree}`.
These are placed along with the content on a page, and are a way for authors to tell Sphinx about the sub-sections that are underneath that page.
Jupyter Book instead uses a _single Table of Contents file_ (called `_toc.yml`) to define the structure of the book.

**YAML Configuration** - In Sphinx, all configuration is defined by a Python file called `conf.py`.
Jupyter Book instead uses a YAML file, with a few keys that are unique to Jupyter Book (but are translated into Sphinx configuration at build time).
See the [`yaml_to_sphinx` function](https://github.com/executablebooks/jupyter-book/blob/421f6198728b21c94726a10b61776fb4cc097d72/jupyter_book/config.py#L177) for details about how Jupyter Book converts its own config into Sphinx config.

**The Command Line Interface** - Finally, Sphinx has a few command line interfaces to control its functionality - the most popular one being `sphinx-build`.
Jupyter Book provides its own CLI (`jupyter-book build`) to handle the extra features described above.

## How to replicate Jupyter Book's functionality in Sphinx

Because most of Jupyter Book's functionality comes from Sphinx extensions, it means that the broader Sphinx community can replicate much of the functionality of Jupyter Book.
You might want to do this if you want more control over the build process or need to integrate more complex steps into your build process.

Here's a short overview of the Sphinx extensions that are activated by Jupyter Book:

- **[MyST-NB](https://myst-nb.readthedocs.io)** - Functionality for reading in Jupyter Notebooks in Sphinx, as well as executing them.
- **[MyST Parser](https://myst-parser.readthedocs.io)** - Functionality for parsing CommonMark and MyST Markdown files into Sphinx. This is not explicitly provided, but is activated by MyST-NB.
- **[Sphinx Design](https://sphinx-design.readthedocs.io/en/latest/)** - Provide Sphinx directives for UI components that are used throughout the Jupyter Book docs.
- **[Sphinx Book Theme](https://sphinx-book-theme.readthedocs.io/)** - A Sphinx theme that defines the look and feel of Jupyter Book, and its general layout.

To understand how Jupyter Book configures Sphinx, you should check out [the `config.py` module](https://github.com/executablebooks/jupyter-book/blob/master/jupyter_book/config.py). For example, [here is the line that defines the default Sphinx configuration](https://github.com/executablebooks/jupyter-book/blob/421f6198728b21c94726a10b61776fb4cc097d72/jupyter_book/config.py#L23).

If you'd like to replicate Jupyter Book's functionality in Sphinx, you should create a Sphinx site, and copy over this configuration into your `conf.py` file.
When you build your Sphinx site, it should behave very similarly to Jupyter Book.
