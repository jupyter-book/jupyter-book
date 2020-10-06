# Overview and installation

This is a guide for creating your own book using Jupyter Book.
Book content is written in Markdown files and Jupyter notebooks, and
`jupyter-book` converts these into a book fit for hosting on the web or a
publishable PDF.

## Install the command line interface

First off, make sure you have the CLI installed so that you can work with Jupyter Book.
The Jupyter Book CLI allows you to build and control your
Jupyter Book. You can install it via pip with the following command:

```bash
pip install -U jupyter-book
```

:::{admonition,warning} A note for Windows users

Jupyter Book is now also tested against Windows OS 😀

However, there is a known incompatibility for notebook execution when using Python 3.8.

See [](working-on-windows)

:::

## The book building process

Building a Jupyter Book broadly consists of two steps:

1. **Put your book content in a folder or a file**. Jupyter Book needs the following
   pieces in order to build your book:

   * Your content file(s) (the pages of your book) in either Markdown files or Jupyter
     notebooks.
   * A Table of Contents `YAML` file (`_toc.yml`) that defines
     the structure of your book. Mandatory when building a folder.
   * (optional) A configuration file (`_config.yml`) to control the behavior
     of Jupyter Book.
2. **Build your book**. Using Jupyter Book's command line interface you can
   convert your pages into either an HTML or a PDF book.
3. **Host your book's HTML online**. Once your book's HTML is built, you can host
   it online as a public website. See {doc}`publish` for more information.

## Anatomy of a Jupyter Book

Jupyter Book comes with a demo book so that you can see how the content files
are used in the book. We'll begin with a quick tour of these files, as they are
the pieces that you'll modify for your own book.

Running the following command will create a new Jupyter Book with a few
content pages and a table of contents to get you started:

:::{note}
Jupyter Book uses a command line interface to generate books. For more complete
information about the CLI, see [](../reference/cli.md).
:::

### Create a template Jupyter Book

We'll use a small template book to show what kinds of files you might put inside your own.
To create a new Jupyter Book, type the following at the command line:

```{margin}
You can also use the short-hand `jb` for `jupyter-book`. E.g.,:
`jb create mybookname`. We'll use `jupyter-book` for the rest of this guide.
```

```bash
jupyter-book create mybookname
```

A new book will be created at the path that you've given (in this case, `mybookname/`).

````{note}
If you would like to quickly **generate a basic Table of Contents** YAML file,
run the following command:

```bash
jupyter-book toc mybookname/
```

And it will generate a TOC for you. Note that there must be at least one content
file in each folder in order for any sub-folders to be parsed.
````

:::{tip}
Jupyter Book also provides a [cookiecutter](https://github.com/executablebooks/cookiecutter-jupyter-book) that can be used to interactively create a book directory structure.
The cookiecutter is suitable for more advanced users that want to create a ready-to-go repository to host their book that includes pre-populated metafiles such as README, LICENSE, CONDUCT, CONTRIBUTING, etc., as well as GitHub Actions workflow files to {ref}`publish/gh-actions`.
To try the cookiecutter template, run the following command:

```bash
jupyter-book create mybookpath/ --cookiecutter
```

For more help, see the [Jupyter Book cookiecutter GitHub repository](https://github.com/executablebooks/cookiecutter-jupyter-book), or run:

```bash
jupyter-book create --help
```
:::

### Inspecting your book's contents

Let's take a quick look at some important files in the demo book you created:

```bash
mybookname/
├── _config.yml
├── _toc.yml
├── content.md
├── intro.md
├── markdown.md
├── notebooks.ipynb
└── references.bib
```

Here's a quick rundown of the files you can modify for yourself, and that
ultimately make up your book.

### Book configuration

All of the configuration for your book is in the following file:

```bash
mybookname/
├── _config.yml
```

You can define metadata for your book (such as its title), add
a book logo, turn on different "interactive" buttons (such as a
{term}`Binder` button for pages built from a Jupyter notebook), and more.

```{margin}
For more information about your book's configuration file, see
{doc}`../customize/config`.
```

### Table of contents

Jupyter Book uses your table of contents to define the structure of your book.
For example, your chapters, sub-chapters, etc.

The table of contents lives at this location:

```bash
mybookname/
├── _toc.yml
```

This is a YAML file with a collection of pages, each one linking to a
file in your `content/` folder. Here's an example of a few pages defined in `toc.yml`.

```yaml
- file: features/features
  sections:
  - file: features/markdown
  - file: features/notebooks
```

The top-most level of your TOC file are **book chapters**. Above, this is the
"Features" page.
Note that in this case the title of the page is not explicitly specified but
is inferred from the source files.
This behavior is controlled by the `page_titles` setting in `_config.yml`
(see {ref}`toc/files` for more details).
Each chapter can have
several sections (defined in `sections:`) and each section can have several sub-sections.
For more information about how section structure maps onto book structure,
see [](toc/structure).

Each item in the `_toc.yml` file points to a single file. The links
should be **relative to your book's folder and with no extension.**

For example, in the example above there is a file in
`mybookname/content/notebooks.ipynb`. The TOC entry that points to
this file is here:

```yaml
    - file: features/notebooks
```

```{margin}
For more information about your book's table of contents file, see
{doc}`../customize/toc`.
```

## Book content

The Markdown and ipynb files in your folder make up your book's content. Some content
files for the demo book are shown below:

```bash
mybookname/
...
├── content.md
└── notebooks.ipynb
```

Note that the content files are either **Jupyter notebooks** or **Markdown**
files. These are the files that define "sections" in your book.

You can store these files in whatever collection of folders you'd like, note that
the *structure* of your book when it is built will depend solely on the order of
items in your `_toc.yml` file (see below section)

### Book bibliography for citations

If you'd like to build a bibliography for your book, you can do so by including
the following file:

```bash
mybookname/
└── references.bib
```

This BiBTex file can be used to insert citations into your book's pages. For more information,
see [](../content/citations.md).

## Next step: build your book

Now that you've got a Jupyter Book folder structure, you can create
the HTML (or PDF) for each of your book's pages. That's covered in the next
section.
