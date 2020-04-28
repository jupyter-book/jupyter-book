# Build your book

Once you've added content and configured your book, it's time to
build outputs for your book. We'll use the
`jupyter-book build` command-line tool for this.

Currently, there are two kinds of supported outputs: an HTML website for your
book, and a PDF that contains all of the pages of your book that is built
from the book HTML.

## Prerequisites

In order to build the HTML for each page, you should have followed the steps
in {doc}`creating your Jupyter Book structure <overview>`. You should have
a collection of notebook/markdown files in your `mybookname/` folder, a `_toc.yml` file
that defines the structure of your book, and any configuration you'd like
in the `_config.yml` file.

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
`_build/html` folder. Your page will be called `mypage.html`. This will work
for any {doc}`content source file <../content-types/index>`) that is supported by Jupyter Book.

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

## Next step: publish your book

Now that you've created the HTML for your book, it's time
to publish it online. That's covered in the next section.
