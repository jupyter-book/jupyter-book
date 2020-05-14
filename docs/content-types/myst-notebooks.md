---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: '0.8'
    jupytext_version: 1.4.1+dev
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Notebooks written entirely in markdown

It is possible to store Jupyter Notebooks in pure markdown. This allows you
to define a notebook structure entirely using MyST Markdown. For more information
about MyST Markdown, see {doc}`../content/myst`.

Notebooks with markdown can be read in, executed, and cached by Jupyter Book (see {doc}`../content/execute`
for information on how to cache pages). This allows you to store all of your
notebook content in a text format that is much friendlier to version control,
while still having all the functionality of a Jupyter Notebook.

```{note}
MyST notebooks use
[jupytext to convert between ipynb and text files][jupytext].
See its documentation for more information.
```

To see an example of a MyST notebook, you can look at
[many of the pages of this documentation](https://github.com/executablebooks/jupyter-book/tree/master/docs).
For example, see {download}`../interactive/hiding.md` and {download}`../content/layout.md`.

## Create a MyST notebook with Jupytext

The easiest way to create a MyST notebook is to use [Jupytext][jupytext], a tool
that allows for two-way conversion between `.ipynb` and a variety of text files.

You can convert an `.ipynb` file to a MyST notebook with the following command:

```bash
jupytext mynotebook.ipynb --to myst
```

A resulting `mynotebook.md` file will be created. This can then be used as a page
in your book.

Jupytext can also **automatically synchronize an `.ipynb` file with your markdown**.
To do so, use a Jupyter interface such as Jupyter Lab or the classic Notebook interface
and follow the [Jupytext instructions for paired notebooks](https://jupytext.readthedocs.io/en/latest/using-server.html#paired-notebooks).

```{margin} Markdown takes precedence
If **both** an `.ipynb` and a `.md` file exist in your book's folders, then
the `.md` file will take precedence!
```

### Convert a markdown file into Jupytext MyST markdown

Jupyter Book has a small CLI to provide common functionality for manipulating and
creating MyST markdown files that synchronize with Jupytext. To add Jupytext syntax
to a markdown file (that will tell Jupytext it is a MyST markdown file), run the
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
    format_version: '0.8'
    jupytext_version: 1.4.1+dev
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# My simple notebook

Some **intro markdown**!

```{code-cell} ipython3
:tags: [mytag]

print("A python cell")
```

## A section

And some more markdown...
````

There are three main sections to notice:

### Front-matter YAML

MyST notebooks need special front-matter YAML to tell Jupytext that they
can be converted to `.ipynb` files. The front-matter YAML block above:

```yaml
---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: '0.8'
    jupytext_version: 1.4.1+dev
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---
```

Tells Jupytext that the file is in `myst` format, and that its code should
be run with a Python3 kernel.

```{margin}
Remember that Jupyter always defines one, and only one, kernel per notebook.
```

### Code cells

Code blocks in MyST Notebooks are defined with the following MyST directive:

````
```{code-cell}
your-code
```
````

You can optionally add extra metadata to the code cell, which will be converted
into cell metadata in the `.ipynb` file. For example, you can add tags to your code
cell like so:

````
```{code-cell}
:tags: tag1, tag2, tag3
your-code
```
````

You may also explicitly pass the kernel name after `{code-cell}` to make it clear which
kernel you are running. For example:

````
```{code-cell} python3
your-code
```
````

However, remember that there is only one kernel allowed per page.

### Markdown content

Everything in-between your code cells is parsed as markdown content using the
[MyST Markdown parser](https://myst-parser.readthedocs.io/). See {doc}`../content/myst` for
more information about MyST markdown.

To explicitly split up markdown content into two markdown cells, use the following
pattern:

````
```md
Content in one markdown cell

+++

Content in another markdown cell
```
````

You may also attach metadata to the cell by adding a Python dictionary after the `+++`.
For example, to add tags to the second cell above:

````
```md
Content in one markdown cell

+++ {"tags": ["tag1,tag2,tag3"]}

Content in another markdown cell
```
````

[jupytext]: https://jupytext.readthedocs.io/
