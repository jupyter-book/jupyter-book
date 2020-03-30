# Build your book

Once you've added content and configured your book, it's time to
build outputs for your book. We'll use the
`jupyter-book build` command-line tool for this.

Currently, there are two kinds of supported outputs: an HTML website for your
book, and a PDF that contains all of the pages of your book that is built
from the book HTML.

## Prerequisites

In order to build the HTML for each page, you should have followed the steps
in [creating your Jupyter Book structure](02_create). You should have
a collection of notebook/markdown files in your `mybookname/` folder, a `_toc.yml` file
that defines the structure of your book, and any configuration you'd like
in the `_config.yml` file.

## Build each page's HTML

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

## Build a PDF from your book HTML

It is also possible to build a single PDF from your book's HTML. This first
converts all of your book's content into a single HTML file, and then renders
it as a PDF by emulating a browser from the command-line.

```{warning}
This is an experimental feature, and may change in the future.
```

````{sidebar} **Note**
If you wish to build a PDF from your book's HTML, you will need the `pyppeteer` package.
You can install it like so:

```
pip install pyppeteer
```

In addition, if you get errors about libraries that don't exist, check out
[these install commands](https://circleci.com/orbs/registry/orb/threetreeslight/puppeteer)
to see if that fixes it. We warned you it was an experimental feature :-)
````

To build a single PDF from your book's HTML, use the following command:

```
jupyter-book build mybookname/ --build pdf_html
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
