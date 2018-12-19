---
redirect_from:
  - "/guide/01-overview"
title: 'Guide'
prev_page:
  url: /features/citations
  title: 'Citations and bibliographies'
next_page:
  url: /guide/02_setup
  title: 'Setup and Install'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---
# The Jupyter Books Guide

This repository / website is a guide for hosting your own book using
Jupyter Notebooks and Jekyll. All course content is written in markdown and
Jupyter Notebooks, and a set of helper scripts converts these notebooks into
Jekyll-based markdown fit for hosting on the web. This short guide will
help you through the process should you want to do this for your own book.

## The structure underneath Jupyter Books

This page gives a general idea for what we mean by a "Jupyter Book". Jupyter Books
are essentially these two things:

1. [**A collection of notebooks and markdown files**](https://github.com/choldgraf/jupyter-book/tree/master/content). These are in `content/`. When you run `scripts/generate_book.py`,
   they'll be converted to `.md` files (or just copied if they're already `.md` files) and placed in `/_build`.
2. [**A Table of Contents file**](https://github.com/choldgraf/jupyter-book/tree/master/_data/toc.yml) (`_data/toc.yml`). This is
   the Table of Contents, which will be used to create the sidebar for your site. Links in this file are **relative to the `/content/` folder.**
   See [the TOC for this book](https://github.com/choldgraf/jupyter-book/tree/master/_data/toc.yml) for a couple of examples.
3. [**A Jekyll configuration file**](https://github.com/choldgraf/jupyter-book/tree/master/config.yml) that defines information about your book,
   such as its title or the URL of a JupyterHub you want interact links to point to. This is also how you turn on / off many features
   of your Jupyter Book.

## To build your own Jupyter Book

To build your own Jupyter Book, you'll follow a process similar to this (we'll go into each
step in more detail in this guide):

* Get yourself a copy of the jupyter-book repository. [Here's the repo URL on GitHub](https://github.com/choldgraf/jupyter-book).
* Put your Jupyter Notebooks / markdown files in `/content/`
* Edit the `_data/toc.yml` file for your Table of Contents. This defines the structure
  of your book. The location of URLs should be **relative to the `/content/` folder.**
* Navigate to the repo root, then run `make book` to convert your Jupyter Notebooks into Jekyll-ready markdown. It will be placed in `/_build`.
* From here, you have **two options**
    * **Option 1**: Use GitHub pages to auto-generate your site from the markdown. Once you build your book, push the
      changes to your GitHub repo and that's it!
    * **Option 2**: Build the site HTML locally with `make build` and then host it wherever you like. You can still use
      GitHub pages to host the HTML by putting it in the root of the repository, or in the `docs/` folder (which is what
      this site does)
* Tell GitHub to build a website out of your repository.
* That's it!

See the rest of this guide in the links to the left for detailed
instructions on this process. The next section covers [Setting up your environment](02_setup.html).

For a more complete description of the relevant files for the template repository,
see the [Advanced topics section](../07_advanced).

