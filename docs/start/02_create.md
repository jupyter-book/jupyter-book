# Anatomy of a Jupyter Book

Jupyter-Book comes with a demo book so that you can see how the content files
are used in the book. We'll begin with a quick tour of these files, as they are
the pieces that you'll modify for your own book.

Running the following command will create a new Jupyter Book with a few
content pages and a Table of Contents to get you started:

```{note}
Jupyter Book uses a command-line interface to generate books. For more complete
information about the CLI, see {doc}`cli`.
```

## Create a template Jupyter Book

We'll use a small template book to show what kinds of files you might put inside your own.
To create a new Jupyter Book, type the following at the command-line:

```{sidebar}
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
````

## Inspecting your book's contents

Let's take a quick look at some important files in the demo book you created:

```bash
mybookname/
├── _config.yml
├── _toc.yml
├── content.md
├── intro.md
├── markdown.md
├── notebooks.ipynb
├── references.bib
└── syntax.md
```

Here's a quick rundown of the files you can modify for yourself, and that
ultimately make up your book.

## Book configuration

All of the configuration for your book is in the following file:

```bash
mybookname/
├── _config.yml
```

You can define metadata for your book (such as its title), add
a book logo, turn on different "interactive" buttons (such as a
Binder button for pages built from a Jupyter Notebook), and more.


## Table of Contents

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
`mybookname/use/notebooks.ipynb`. The TOC entry that points to
this file is here:

```yaml
    - file: features/notebooks
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


## Book bibliography for citations

If you'd like to build a bibliography for your book, you can do so by including
the following file:

```bash
mybookname/
└── references.bib
```

This BiBTex file can be used to insert citations into your book's pages. For more information,
see {doc}`../use/citations`.


## Next step: convert your book content into HTML

Now that you've got a Jupyter Book folder structure, we can create
the HTML for each of your book's pages. That's covered in the next
section.
