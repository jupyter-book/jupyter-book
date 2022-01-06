---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

(file-types:myst-notebooks)=
# Notebooks written entirely in Markdown

It is possible to store Jupyter notebooks in plain Markdown. This allows you
to define a notebook structure entirely using MyST Markdown. For more information
about MyST Markdown, see {doc}`../content/myst`.

Notebooks with Markdown can be read in, executed, and cached by Jupyter Book (see {doc}`../content/execute` for information on how to cache pages).
This allows you to store all of your notebook content in a text format that is much nicer for version control software, while still having all the functionality of a Jupyter notebook.

:::{note}
MyST notebooks uses [MyST-NB to convert between ipynb and text files](myst-nb:index).
See its documentation for more information.
:::

To see an example of a MyST notebook, you can look at
[many of the pages of this documentation](https://github.com/executablebooks/jupyter-book/tree/master/docs).
For example, see {download}`../interactive/hiding.md` and {download}`../content/layout.md`.

## Create a MyST notebook with Jupytext

The easiest way to create a MyST notebook is to use [Jupytext](https://jupytext.readthedocs.io), a tool
that allows for two-way conversion between `.ipynb` and a variety of text files.

You can convert an `.ipynb` file to a MyST notebook with the following command:

```bash
jupytext mynotebook.ipynb --to myst
```

A resulting `mynotebook.md` file will be created.
This can then be used as a page in your book.

:::{important}
For full compatibility with `myst-parser`, it is necessary to use `jupytext>=1.6.0`.
:::

Jupytext can also **automatically synchronize an `.ipynb` file with your Markdown**.
To do so, use a Jupyter interface such as Jupyter Lab or the classic notebook interface
and follow the [Jupytext instructions for paired notebooks](https://jupytext.readthedocs.io/en/latest/paired-notebooks.html).

```{margin} Markdown takes precedence
If **both** an `.ipynb` and a `.md` file exist in your book's folders, then
the `.md` file will take precedence!
```

### Convert a Markdown file into Jupytext MyST Markdown

Jupyter Book has a small CLI to provide common functionality for manipulating and
creating MyST Markdown files that synchronize with Jupytext. To add Jupytext syntax
to a Markdown file (that will tell Jupytext it is a MyST Markdown file), run the
following command:

```bash
jupyter-book myst init mymarkdownfile.md --kernel kernelname
```

If you do not specify `--kernel`, then the default kernel will be used *if there is
only one available*. If there are multiple kernels available, you must specify one
manually.

## Structure of MyST notebooks

Let's take a look at the structure that Jupytext creates, which you may also use
to create a MyST notebook from scratch. First, let's take a look at a simple MyST notebook:

````md
---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# My simple notebook

Some **intro Markdown**!

```{code-cell} ipython3
:tags: [mytag]

print("A python cell")
```

## A section

And some more Markdown...
````

There are three main sections to notice:

### Frontmatter YAML

MyST notebooks need special frontmatter YAML to tell Jupytext that they
can be converted to `.ipynb` files. The frontmatter YAML block

```yaml
---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---
```

tells Jupytext that the file is in `myst` format, and that its code should
be run with a Python 3 kernel.

```{margin}
Remember that Jupyter always defines one, and only one, kernel per notebook.
```

### Code cells

Code blocks in MyST notebooks are defined with the following MyST directive:

````md
```{code-cell}
your-code
```
````

You can optionally add extra metadata to the code cell, which will be converted
into cell metadata in the `.ipynb` file. For example, you can add tags to your code
cell like so:

````md
```{code-cell}
:tags: [tag1, tag2, tag3]
your-code
```
````

You may also explicitly pass the kernel name after `{code-cell}` to make it clear which
kernel you are running. For example:

````md
```{code-cell} python3
your-code
```
````

However, remember that there is only one kernel allowed per page.

### Markdown content

Everything in-between your code cells is parsed as Markdown content using the
[MyST Markdown parser](https://myst-parser.readthedocs.io/). See {doc}`../content/myst` for
more information about MyST Markdown.

To explicitly split up Markdown content into two Markdown cells, use the following
pattern:

```md
Content in one Markdown cell

+++

Content in another Markdown cell
```

You may also attach metadata to the cell by adding a Python dictionary after the `+++`.
For example, to add tags to the second cell above:

```md
Content in one Markdown cell

+++ {"tags": ["tag1", "tag2", "tag3"]}

Content in another Markdown cell
```

```{warning}
Please note that cell breaks and metadata specified in MyST files via the `+++` syntax
only propagate to their `.ipynb` counterpart. When generating the book's HTML, *Markdown
cell* information is discarded to avoid conflicting hierarchies in the structure of the
document. In other words, only *code cell* tags have an effect on the generated HTML.
```
