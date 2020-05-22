# Overview and installation

This is a guide for creating your own book using Jupyter Book.
Book content is written in markdown and Jupyter Notebooks, and
`jupyter-book` converts these into a book fit for hosting on the web or a
publishable PDF.

## Install the command-line interface

First off, make sure you have the CLI installed so that you can work with Jupyter Book.
The Jupyter-Book CLI allows you to build and control your
Jupyter Book. You can install it via pip with the following command:

```bash
pip install -U "jupyter-book>=0.7.0b"
```

```{admonition} A note for windows users
:name: warning
Currently, Jupyter Book is tested in a unix-like environment, and it is highly
recommended that you use a unix environment to build your books. If you're running
a recent version of Windows 10, we recommend
[installing Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
If you'd like to help with adding Windows support, please [say hello in this issue](https://github.com/executablebooks/jupyter-book/issues/575).
```

## The book building process

Building a Jupyter Book broadly consists of two steps:

1. **Put your book content in a folder**. Jupyter Book needs the following
   pieces in order to build your book:

   * Your content files (the pages of your book) in either markdown or Jupyter
     Notebooks.
   * A Table of Contents `YAML` file (`_toc.yml`) that defines
     the structure of your book.
   * (optional) A configuration file (`_config.yml`) to control the behavior
     of Jupyter Book.
2. **Build your book**. Using Jupyter Book's command-line interface you can
   convert your pages into either an HTML or a PDF book.
3. **Host your book's HTML online**. Once your book's HTML is built, you can host
   it online as a public website. See {doc}`publish` for more information.

## Anatomy of a Jupyter Book

Jupyter-Book comes with a demo book so that you can see how the content files
are used in the book. We'll begin with a quick tour of these files, as they are
the pieces that you'll modify for your own book.

Running the following command will create a new Jupyter Book with a few
content pages and a Table of Contents to get you started:

```{note}
Jupyter Book uses a command-line interface to generate books. For more complete
information about the CLI, see {doc}`../reference/cli`.
```

### Create a template Jupyter Book

We'll use a small template book to show what kinds of files you might put inside your own.
To create a new Jupyter Book, type the following at the command-line:

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
{term}`Binder` button for pages built from a Jupyter Notebook), and more.

```{margin}
For more information about your book's configuration file, see
{doc}`../customize/config`.
```

### Table of Contents

Jupyter Book uses your Table of Contents to define the structure of your book.
For example, your chapters, sub-chapters, etc.

The Table of Contents lives at this location:

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
several sections (defined in `sections:`) and each section can have several sub-sections
(which would be define with a deeper level of `sections:`). In addition, you can
use a few extra YAML values to control the behavior of Jupyter-Book (for example,
`not_numbered: true` will prevent Jupyter Book from numbering the pages in that chapter).

Each item in the `_toc.yml` file points to a single content file. The links
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

The markdown and ipynb files in your folder is your book's content. Some content
files for the demo book are shown below:

```bash
mybookname/
...
├── content.md
└── notebooks.ipynb
```

Note that the content files are either **Jupyter Notebooks** or **Markdown**
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
see {doc}`../content/citations`.


## Next step: build your book

Now that you've got a Jupyter Book folder structure, we can create
the HTML (or PDF) for each of your book's pages. That's covered in the next
section.
