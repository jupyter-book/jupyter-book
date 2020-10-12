---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.12
    jupytext_version: 1.6.0
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Overview

This is a short overview of the major components and steps in building a Jupyter Book. See the other pages in this guide for more in-depth information.

## The Jupyter Book command-line interface

Jupyter Book uses a command-line interface to perform a variety of actions. For example, building and cleaning books. You can run the following command to see what options are at your control:

```{margin}
You can also use the short-hand `jb` for `jupyter-book`. E.g.,:
`jb create mybookname`. We'll use `jupyter-book` for the rest of this guide.
```

% double-writing this so users aren't confused by the ! but we still get the output
```bash
jupyter-book --help
```

```{code-cell}
:tags: [remove-input]

!jupyter-book --help
```

:::{admonition,warning} A note for Windows users

Jupyter Book is now also tested against Windows OS 😀

However, there is a known incompatibility for notebook execution when using Python 3.8.

See [](working-on-windows)

:::

For more complete information about the CLI, see [](../reference/cli.md).

## The book building process

Building a Jupyter Book broadly consists of these steps:

1. **Put your book content in a folder or a file**. See [](anatomy-of-a-book).
2. **Build your book**. Using Jupyter Book's command-line interface you can
   convert your pages into either an HTML or a PDF book. See [](build.md).
3. **Host your book's HTML online**. Once your book's HTML is built, you can host
   it online as a public website. See {doc}`publish`.

(anatomy-of-a-book)=
## Anatomy of a Jupyter Book

There are three things that you need in order to build a Jupyter Book:

- A configuration file (`_config.yml`)
- A table of contents file (`_toc.yml`)
- Your book's content

For example, consider the following folder structure, which makes up a simple Jupyter Book.

```
mybookname/
├── _config.yml
├── _toc.yml
├── landing-page.md
└── page1.ipynb
```

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
# in _config.yml
title: "My book title"
logo: images/logo.png
execute:
  execute_notebooks: "off"
```

- `title:` defines a title for the book. It will show up in the left sidebar.
- `logo:` defines a path to an image file for your book's logo (it will also show up in the sidebar).
- `execute:` contains a collection of configuration options to control [execution and cacheing](../content/execute.md).
  - `execute_notebooks: "off"` tells Jupyter Book **not to execute** any computational content that it finds when building the book. By default, Jupyter Book executes and caches all book content.

:::{admonition,tip} More about `_config.yml`
There is much more that you can do with the `_config.yml` file. For example, you can [](source-repository-button) or add [](../interactive/interactive.ipynb). For a complete list of fields for `_config.yml`, see [](../customize/config.md).
:::

### Table of Contents (`_toc.yml`)

Jupyter Book uses your Table of Contents to define the structure of your book.
For example, your chapters, sub-chapters, etc.

This is a YAML file with a collection of pages, each one linking to a
file in your book. Here's an example of the two content files shown above.

````{margin}
If you would like to quickly **generate a basic Table of Contents** YAML file,
run the following command:

```bash
jupyter-book toc mybookname/
```

And it will generate a TOC for you. Note that there must be at least one content
file in each folder in order for any sub-folders to be parsed.
````

```yaml
# In _toc.yml
- file: landing-page
- file: page1
```

Each item in the `_toc.yml` file points to a single file. The links
should be **relative to your book's folder and with no extension.**
Think of the top-most level of your TOC file as **book chapters** (excluding the landing page). The title of each chapter will be inferred from the title in your files.

The first file specifies the **landing page** of your book (in this case, it is a **markdown file**).
The landing page is the highest page in your book's content hierarchy.
The second file specifies a **content page** of your book (in this case, it is a **Jupyter Notebook**).

```{margin}
For more information about how section structure maps onto book structure,
see [](toc/structure).
```

:::{admonition,tip} More about `_toc.yml`
You can specify more complex book configurations with your `_toc.yml` file. For example, you can specify **parts**, **sections**, and control **custom titles**. For more information about your book's table of contents file, see [](../customize/toc.md).
:::

### Book content

A collection of text files make up your book's content. These can be one of several types of files, such as markdown (`.md`), Jupyter Notebooks (`.ipynb`) or reStructuredText (`.rst`) files (see [](../file-types/index.md) for a full list).

In the above example, there were two files listed: a **markdown** file and a **Jupyter Notebook**. Let's look at the content of each:

```{margin} ✨Notebooks with text files✨
You can also store Jupyter Notebooks as markdown files or other text files. See [](../file-types/myst-notebooks.md) and [](../file-types/jupytext.Rmd).
```

`````{tabbed} landing-page.md
This is the landing page of the book. Let's take a look at some sample markdown text.

````md
# My book title

Some intro text

## My book section

```{note}
Here's a note!
```

That's it!
````

All content files must have a page title (specified as the first header). All subsequent headers must increase linearly (so no jumps from H1 to H3). See [](rules-all-content-types) for more rules that all content must adhere to.

Markdown files can contain either **CommonMark** markdown, or **MyST Markdown** (a super-set of CommonMark). The example above is written in MyST. It looks very similar to CommonMark, but has a `{note}` directive. The note will be rendered like so:

```{note}
Here's a note!
```

For more information about MyST markdown and all the things you can do with it, see [](../content/myst.md).
``````

```{tabbed} page1.ipynb
The other page in this book is a **Jupyter Notebook**. This means that the page has a combination of computational content and narrative conent. By default, when Jupyter Book builds your book, **notebooks will be executed and their outputs cached**. On subsequent builds, notebook pages will be re-executed only if their code has changed.

Any outputs generated by the notebook will be inserted into your built book (though they may not be in your input notebook). This way you do not need to store the notebook's outputs with your repository. See [](../content/execute.md) for more information.

There are many other interesting things that you can do with notebook content as a part of your book. We recommend checking out [](../content/code-outputs.md) as well as [](../interactive/interactive.md) to get started with Jupyter notebooks.
```

:::{admonition,tip} More about writing content files
This is only a simple example, and touches on just a couple of the many ways that you can configure and structure your book. For more information about this, see [](../file-types/index) as well as [](../content/content-blocks).
:::

## Create a template book

Jupyter-Book comes with a demo book so that you can see how the content files
are used in the book. This section goes through the process of creating a template book and building it as an alternative to manually creating the files in the sections above.

To see your options for creating books from templates, run the following command:

% doubling the commands so users aren't confused by the !
```bash
jupyter-book create --help
```

```{code-cell}
:tags: [remove-input]
!jupyter-book create --help
```

### Quickly generate a sample book

This option is best if you are starting from scratch, or would like to see one example of a simple Jupyter Book on your own filesystem.

If you'd just like to quickly create a sample book, you may do so by running the following command:

```
jupyter-book create mynewbook/
```

This will generate a mini Jupyter Book that you can both build and explore locally. It will have a few decisions made for you, and you can explore the configuration of the book in `_config.yml` and its structure in `_toc.yml`. Use this book as inspiration, or as a starting point to work from.

### Generate a templatized book from interactive prompts

This option is best if you'd like to answer a few questions from the command line in order to create a template book that is more complex and customized for your use-case.

Jupyter Book also provides a [Jupyter Book cookiecutter](https://github.com/executablebooks/cookiecutter-jupyter-book) that can be used to interactively create a book directory structure.

```{margin}
[`cookiecutter`](https://cookiecutter.readthedocs.io/en/latest/) is a Python tool for quickly generating folders from a templatized repository. Jupyter Book uses `cookiecutter` under the hood.
```

The cookiecutter is suitable for users that want to create a ready-to-go repository to host their book that includes pre-populated metafiles such as `README`, `LICENSE`, `CONDUCT`, `CONTRIBUTING`, etc., as well as GitHub Actions workflow files to [](publish/gh-actions).

To try the cookiecutter template, run the following command:

```bash
jupyter-book create mynewbook/ --cookiecutter
```

For more help, see the [Jupyter Book cookiecutter GitHub repository](https://github.com/executablebooks/cookiecutter-jupyter-book), or run:


## Next step: build your book

Now that you've got a Jupyter Book folder structure, you can create
the HTML (or PDF) for each of your book's pages. That's covered in the next
section.
