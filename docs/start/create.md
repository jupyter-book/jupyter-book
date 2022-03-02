# Create a template book

Now that we understand our book's structure, let's create a sample book to learn from.

## Quickly generate a sample book

Jupyter Book comes bundled with a lightweight sample book to help you understand a book's structure.
Create a sample book by running the following command:

```console
$ jupyter-book create mynewbook/
```

This will generate a mini Jupyter Book that you can both build and explore locally. It will have a few decisions made for you, and you can explore the configuration of the book in `_config.yml` and its structure in `_toc.yml`. Use this book as inspiration, or as a starting point to work from.

(anatomy-of-a-book)=
## Anatomy of a Jupyter Book

There are three things that you need in order to build a Jupyter Book, each of which was just created by running `jupyter-book create`:
- A configuration file (`_config.yml`)
- A table of contents file (`_toc.yml`)
- Your book's content

For example, take a look at the book that you just created:

```console
$ tree mybookname
mybookname/
├── _config.yml
├── _toc.yml
├── intro.md
├── logo.png
├── markdown-notebooks.md
├── markdown.md
├── notebooks.ipynb
├── references.bib
└── requirements.txt
```

There are a few extra files in there that we include to show off some new features, but the **required** pieces are `_toc.yml`, `_config.yml`, and content files.

We'll cover each briefly below, and you can find more information about them
elsewhere in this documentation.

### Book configuration (`_config.yml`)

All of the configuration for your book is in a YAML file called `_config.yml`.

You can define metadata for your book (such as its title), add
a book logo, turn on different "interactive" buttons (such as a
{term}`Binder` button for pages built from a Jupyter Notebook), and more.

```{margin}
For more information about your book's configuration file, see
[](../customize/config.md).
```

Here's an example of a simple `_config.yml` file:

```yaml
# In _config.yml
title: My sample book
author: The Jupyter Book Community
logo: logo.png
execute:
  execute_notebooks: force

# Add a bibtex file so that we can create citations
bibtex_bibfiles:
  - references.bib
```

- `title:` defines a title for the book. It will show up in the left sidebar.
- `author:` adds the author's name to your book template, for attribution.
- `logo:` defines a path to an image file for your book's logo (it will also show up in the sidebar).
- `execute:` contains a collection of configuration options to control [execution and cacheing](../content/execute.md).
  - `execute_notebooks: "force"` tells Jupyter Book **force execute** any computational content each time it builds the book. By default, Jupyter Book executes and **caches** all book content.
- `bibtex_bibfiles:`is a section to define bibliography files for your Jupyter Book.
  This configuration activates **citations** for your book (see [](../tutorials/references.md) for getting started with citations and references).

:::{admonition} More about `_config.yml`
:class: tip
There is much more that you can do with the `_config.yml` file. For example, you can [](source-repository-button) or add [](../interactive/interactive.ipynb). For a complete list of fields for `_config.yml`, see [](../customize/config.md).
:::

Check out the other content in your configuration file, and reference it against the pages in this documentation to see what it does.

### Table of Contents (`_toc.yml`)

Jupyter Book uses your Table of Contents to define the structure of your book.
For example, your chapters, sub-chapters, etc.

This is a YAML file with a collection of pages, each one linking to a
file in your book. Here's an example of the two content files shown above.

```yaml
# In _toc.yml
format: jb-book
root: intro
chapters:
- file: markdown
- file: notebooks
- file: markdown-notebooks
```

The `_toc.yml` is arranged with a `format` such as `jb-article`, or `jb-book`.
The `root` item is considered the landing page (for `html` builds) and is used as front matter (for `latex` builds).
For `jb-book`, subsequent chapters can be added under the `chapters:` section in the `yml` file.

Each entry relates to a file, and they should be added as names with **no extensions** and **relative to your book's root folder.**
The title of each chapter will be inferred from the title in your files.

:::{admonition} More about `_toc.yml`
:class: tip
You can specify more complex book configurations with your `_toc.yml` file. For example, you can specify **parts**, **sections**, and control **custom titles**. For more information about your book's table of contents file, see [](../structure/toc.md).
:::

### Book content

A collection of text files make up your book's content. These can be one of several types of files, such as markdown (`.md`), Jupyter Notebooks (`.ipynb`) or reStructuredText (`.rst`) files (see [](../file-types/index.md) for a full list).

In the above example, there were three files listed:

- a **Markdown** file (`markdown.md`)
- a **Jupyter Notebook** (`notebooks.ipynb`)
- a **MyST Markdown Notebook** (`markdown-notebooks.md`)

We'll cover each in the next section.

## Content files

Below is a quick description of a few major content files in Jupyter Book.

### Markdown files (`.md`)

Markdown is an example of a [markup language](https://en.wikipedia.org/wiki/Markup_language) - a way to structure text with extra characters and syntax that give it extra meaning (e.g., using `**bold**` to denote **bold**).
It is very popular and used across many different technology platforms.

Markdown files come in slight variations, often called *flavors of markdown*.
There are two flavors of markdown that Jupyter Book supports:

- [CommonMark markdown](https://commonmark.org/) - a markdown standard that is very common.
- [MyST Markdown](../content/myst.md) - an extension of CommonMark with extra functionality for enriched documents.

Let's take a look at one of the markdown files in the template book, `intro.md`:

````md
# Welcome to your Jupyter Book

This is a small sample book to give you a feel for how book content is
structured.

:::{note}
Here is a note!
:::

And here is a code block:

```
e = mc^2
```

Check out the content pages bundled with this sample book to see more.
````

Above you see several different kinds of structure:

- `#` symbols denote **section headers** in CommonMark markdown.
  They define the section headers on this page, for example.
- `:::{note}` is a **directive** in MyST Markdown.
  It is rendered like this:

  :::{note}
  I'm a note!
  :::
- ` ``` ` denotes a **code block** in CommonMark markdown.
  It is rendered like this:

  ```
  e=mc^2
  ```

All content files must have a page title (specified as the first header). All subsequent headers must increase linearly (so no jumps from H1 to H3). See [](rules-all-content-types) for more rules that all content must adhere to.

For more information about MyST markdown and all the things you can do with it, see [](../content/myst.md).


### Jupyter Notebooks (`.ipynb`)

The other type of content we'll note is a **Jupyter Notebook**, ending in `.ipynb`.
Jupyter Notebooks have a combination of computational content and narrative content.
Each notebook is associated with a **kernel** (aka, Python, R, Julia, etc) that defines the language used to execute the notebook's computational content.

By default, when Jupyter Book builds your book, **notebooks will be executed and their outputs cached**. On subsequent builds, notebook pages will be re-executed only if their code has changed.

:::{margin} ✨Notebooks with text files✨
You can also store Jupyter Notebooks as markdown files or other text files. See [](../file-types/myst-notebooks.md) and [](../file-types/jupytext.Rmd).
:::

Any outputs generated by the notebook will be inserted into your built book (though they may not be in your input notebook). This way you do not need to store the notebook's outputs with your repository. See [](../content/execute.md) for more information.

There are many other interesting things that you can do with notebook content as a part of your book. We recommend checking out [](../content/code-outputs.md) as well as [](../interactive/interactive.md) to get started with Jupyter notebooks.


### MyST Markdown Notebooks (`.md`, and other text formats)

Finally, you can **combine** Jupyter Notebook and text formats with Jupyter Book.
This allows you to write the structure of a Jupyter Notebook entirely with text.
This requires the use of a special YAML metadata blog that tells Jupyter Book (via a tool called [Jupytext](https://jupytext.readthedocs.io/)) to create a notebook for the page and execute its content.

For more information about MyST Markdown notebooks, see [](file-types:myst-notebooks).

## Next step: build your book

Now that you've got a Jupyter Book folder structure, you can create
the HTML (or PDF) for each of your book's pages. That's covered in the next
section.
