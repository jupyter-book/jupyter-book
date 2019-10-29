# The Jupyter Book Guide

This is a guide for creating your own book using
Jupyter Notebooks and Jekyll. Book content is written in markdown and
Jupyter Notebooks, and `jupyter-book` converts these into
a book fit for hosting on the web.

## Install the command-line interface

First off, make sure you have the CLI installed so that you can work with Jupyter Book.
The Jupyter-Book CLI allows you to create, build, upgrade, and otherwise control your
Jupyter Book. You can install it via pip with the following command:

```bash
pip install jupyter-book
```

## The book building process

Building a Jupyter Book broadly consists of three steps:

1. **Create your book template**. Jupyter Book expects a particular
   collection of files and folders that work with the Static Site Generator
   Jekyll. The [anatomy of a Jupyter Book](01-5_tour.html) section covers the
   general structure of Jupyter Books, and the [create your book template](02_create.html)
   guide shows how to create your own book structure.
2. **Convert each page of your book into HTML**. We first create each page of
   your book into HTML. This converts your `.ipynb`, `.md`, etc files into HTML
   that can be understood by a website. It also uses your book's metadata to insert
   tags and other layout elements into each page's HTML. See the [building each page's HTML](03_build.html)
   section for more information.
3. **Build your book's HTML from these pages**. Once we have HTML for each page, we
   can stitch them together for a book. At the end of this step, you should have
   standalone HTML that can be hosted online. See the [build your book's html](publish/book-html.html)
   section for more information.
4. **Host your book's HTML online**. Once your book's HTML is built, you can host
   it online as a public website. This guide [covers a few ways to do this](04_publish.html).

To begin, check out the next section. You can follow this guide linearly, or use it as
a reference later on.
