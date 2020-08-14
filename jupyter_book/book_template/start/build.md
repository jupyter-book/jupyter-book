# Build your book

Once you've added content and configured your book, it's time to
build outputs for your book. We'll use the
`jupyter-book build` command-line tool for this.

Currently, there are two kinds of supported outputs: an HTML website for your
book, and a PDF that contains all of the pages of your book that is built
from the book HTML.

## Install the command-line interface

First off, make sure you have the CLI installed so that you can work with Jupyter Book.
The Jupyter-Book CLI allows you to build and control your
Jupyter Book. You can install it via pip with the following command:

```bash
pip install -U jupyter-book
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
   it online as a public website.

## Anatomy of a Jupyter Book

Jupyter-Book comes with a demo book so that you can see how the content files
are used in the book. We'll begin with a quick tour of these files, as they are
the pieces that you'll modify for your own book.

Running the following command will create a new Jupyter Book with a few
content pages and a Table of Contents to get you started:

## Build your book's HTML

Now that your book's content is in your book folder and you've
defined your book's structure in `_toc.yml`, you can build
the HTML for your book.

**Note:** HTML is the default builder.

Do so by running the following command:

```bash
jupyter-book build mybookname/
```

This will generate a fully-functioning HTML site using a **static site generator**.
The site will be placed in the `_build/html` folder. You can then open the pages
in the site by entering that folder and opening the `html` files with your
web browser.

```{note}
You can also use the short-hand `jb` for `jupyter-book`. E.g.,:
`jb build mybookname/`.
```

## Build a standalone page

Sometimes you'd like to build a single page of content rather than an
entire book. For example, if you'd like to generate a web-friendly HTML
page from a Jupyter Notebook for a report or publication.

You can generate a standalone HTML file for a single page of Jupyter Book
content by running the following command:

```
jupyter-book page path/to/mypage.ipynb
```

This will execute your content and output the proper HTML in a
`_build/html` folder.
If you'd like to generate HTML for a page *without* executing any code cells,
you can use the `--no-execute` flag:

```
jupyter-book page --no-execute path/to/mypage.ipynb
```

## Page caching

By default, Jupyter Book will only build the HTML for pages that have
been updated since the last time you built the book. This helps reduce the
amount of unnecessary time needed to build your book. If you'd like to
force Jupyter Book to re-build a particular page, you can either edit the
corresponding file in your book's folder, or delete that page's HTML
in the `_build/html` folder.

## Local preview

To preview your book, you can open the generated HTML files in your browser.
Either double-click the html file in your local folder, or enter the absolute
path to the file in your browser navigation bar adding `file://` at the beginning
(e.g. `file://Users/my_path_to_book/_build/index.html`).
