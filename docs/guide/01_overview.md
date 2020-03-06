# The Jupyter Book Guide

This is a guide for creating your own book using Jupyter Book.
Book content is written in markdown and Jupyter Notebooks, and
`jupyter-book` converts these into a book fit for hosting on the web or a
publishable PDF.

## Install the command-line interface

First off, make sure you have the CLI installed so that you can work with Jupyter Book.
The Jupyter-Book CLI allows you to build and control your
Jupyter Book. You can install it via pip with the following command:

```bash
pip install git+https://github.com/ExecutableBookProject/cli.git@master
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
   it online as a public website. See {doc}`04_publish` for more information.

To begin, check out the next section. You can follow this guide linearly, or use it as
a reference later on.
