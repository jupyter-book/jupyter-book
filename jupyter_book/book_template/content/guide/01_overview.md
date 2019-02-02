# The Jupyter Book Guide

This is a guide for creating your own book using
Jupyter Notebooks and Jekyll. Book content is written in markdown and
Jupyter Notebooks, and `jupyter-book` converts these into
a book fit for hosting on the web.

## Install the command-line interface

First off, make sure you have the CLI installed so that you can work with Jupyter Book.
The Jupyter-Book CLI allows you to create, build, upgrade, and otherwise control your
Jupyter Book. You can install it via pip with the following command:

```
pip install jupyter-book
```

## A quick tour of a Jupyter Book

Jupyter-Book comes with a demo book so that you can see how the content files
are used in the book. We'll begin with a quick tour of these files, as they are
the pieces that you'll modify for your own book.

To create a **demo Jupyter Book** to use as a template, run the following command:

```
jupyter-book create mybookname --demo
```

A new book will be created at the path that you've given (in this case, `mybookname/`).

Let's take a quick look at some important files in the demo book you created:

```
mybookname/
├── assets
│   └── custom
│       ├── custom.css
│       └── custom.js
├── _config.yml
├── content
│   ├── features
│   │  ├── features.md
│   │  └── notebooks.ipynb
│   └── LICENSE.md
├── _data
│   └── toc.yml
└── requirements.txt
```

Here's a quick rundown of the files you can modify for yourself, and that
ultimately make up your book.

### Book configuration

All of the configuration for your book is in the following file:

```
mybookname/
├── _config.yml
```

You can define metadata for your book (such as its title), add
a book logo, turn on different "interactive" buttons (such as a
Binder button for pages built from a Jupyter Notebook), and more.

### Book content

Your book's content can be found in the `content/` folder. Some content
files for the demo book are shown below:

```
mybookname/
├── content
    └── features
       ├── features.md
       └── notebooks.ipynb
```

Note that the content files are either **Jupyter Notebooks** or **Markdown**
files. These are the files that define "pages" in your book.

You can store these files in whatever collection of folders you'd like, note that
the *structure* of your book when it is built will depend solely on the order of
items in your `_data/toc.yml` file (see below section)

### Table of Contents

Jupyter Book uses your Table of Contents to define the structure of your book.
For example, your chapters, sub-chapters, etc.

The Table of Contents lives at this location:

```
mybookname/
├── _data
    └── toc.yml
```

This is a YAML file with a collection of pages, each one linking to a
file in your `content/` folder. Here's an example of a few pages defined in `toc.yml`.

```yaml
- title: Features and customization
  url: /features/features
  not_numbered: true
  expand_sections: true
  sections:
  - title: Markdown files
    url: /features/markdown
    not_numbered: true
  - title: Jupyter notebooks
    url: /features/notebooks
    not_numbered: true
```

The top-most level of your TOC file are **book chapters**. Above, this is the
"Features and customization" page. Each chapter can have
several sections (defined in `sections:`) and each section can have several sub-sections
(which would be define with a deeper level of `sections:`). In addition, you can
use a few extra YAML values to control the behavior of Jupyter-Book (for example,
`not_numbered: true` will prevent Jupyter Book from numbering the pages in that chapter).

Each item in the YAML file points to a single content file. The links
should be **relative to the `/content/` folder and with no extension.**

For example, in the example above there is a file in
`mybookname/content/features/notebooks.ipynb`. The TOC entry that points to
this file is here:

```yaml
    - title: Jupyter notebooks
        url: /features/notebooks
```

### A license for your content

When you share content online, it's a good idea to add a license so that others know
what rights you retain to the work. This can make your book more sharable and (re)usable.

The license for a Jupyter Book lives in this location:

```
mybookname/
├── content
    └── LICENSE.md
```

When you create a new book, if you don't specify a license, then `jupyter-book` will by default
add a [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/)
(CC BY-SA 4.0) license to your book. CC BY-SA requires attribution of
your work, and also requires that any derivations someone creates are released
under a license *at least as permissive* as CC BY-SA.

If you'd like to choose a different license, you can add whatever text you like to the file
in `/content/LICENSE.md`. We commend checking out the [Creative Commons licenses page](https://creativecommons.org/licenses)
for several options for licenses that may suit your needs.

### Book code requirements files

Since your Jupyter Book likely has computational material specified in Jupyter
Notebooks, you should specify the packages needed to run your Jupyter Book.
In this case, we use a `requirements.txt` file:

```
mybookname/
└── requirements.txt
```

The demo book uses `requirements.txt` because it has Python code, but you can
include any other files that you'd like to.

### Book bibliography for citations

If you'd like to build a bibliography for your book, you can do so by including
the following file:

```
mybookname/
├── _bibliography
    └── references.bib
```

This BiBTex file can be used along with the `jekyll-scholar` extension. For more information
on how to use citations in Jupyter Book, see [Citations with Jupyter Book](../features/citations)

### Custom Javascript and CSS

These are the files in this location:

```
├── assets
    └── custom
        ├── custom.css
        └── custom.js
```

Jupyter Book lets you supply your own CSS and Javascript that will be
built into your book. Feel free to edit these files with whatever you like.

## Next section

Now that you're familiar with the Jupyter Book structure, head to the next section
to learn how to create your own!