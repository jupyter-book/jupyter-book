# Build your book

Once you've added content and configured your book, it's time to
build outputs for your book. We'll use the
`jupyter-book build` command-line tool for this.

Currently, there are two kinds of supported outputs: an HTML website for your
book, and a PDF that contains all of the pages of your book that is built
from the book HTML.

## Prerequisites

In order to build the HTML for each page, you should have followed the steps
in [creating your Jupyter Book structure](overview). You should have
a collection of notebook/markdown files in your `mybookname/` folder, a `_toc.yml` file
that defines the structure of your book, and any configuration you'd like
in the `_config.yml` file.

## Build your book's HTML

Now that your book's content is in your book folder and you've
defined your book's structure in `_toc.yml`, you can build
the HTML for your book.

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

## Page caching

By default, Jupyter Book will only build the HTML for pages that have
been updated since the last time you built the book. This helps reduce the
amount of unnecessary time needed to build your book. If you'd like to
force Jupyter Book to re-build a particular page, you can either edit the
corresponding file in your book's folder, or delete that page's HTML
in the `_build/html` folder.

## Next step: build and publish your book

Now that you've created the HTML for your book, it's time
to publish it online. That's covered in the next section.
