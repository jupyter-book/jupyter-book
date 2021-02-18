# Build your book

Once you've added content and configured your book, it's time to
build outputs for your book.
We'll use the `jupyter-book build` command line tool for this.

Currently, there are two kinds of supported outputs: an HTML website for your
book, and a PDF that contains all of the pages of your book that is built
from the book HTML.

## Prerequisites

In order to build the HTML for each page, you should have followed the steps
in [creating your Jupyter Book structure](./overview.md).
You should have a collection of notebook/Markdown files in your `mybookname/` folder, a `_toc.yml` file
that defines the structure of your book and any configuration you'd like
in the `_config.yml` file.

## Build your book's HTML

Now that your book's content is in your book folder and you've defined your book's structure in `_toc.yml`, you can build the HTML for your book.

**Note:** HTML is the default builder.

Do so by running the following command:

```bash
jupyter-book build mybookname/
```

This will generate a fully-functioning HTML site using a **static site generator**.
The site will be placed in the `_build/html` folder. You can then open the pages
in the site by navigating to that folder and opening the `html` files with your
web browser.

:::{tip}
If you find a lot of unwanted files are being built into your book, you can auto-exclude files outside of your table of contents with [only_build_toc_files](config:exclude-non-toc-files)
:::

:::{note}
You can also use the short-hand `jb` for `jupyter-book`. E.g.,:
`jb build mybookname/`.
:::

:::{tip}
When debugging your book build, the following options can be helpful:

```bash
jupyter-book build -W -n --keep-going mybookname/
```

This will check for missing references (`-n`), turning them into errors (`-W`),
but will still attempt to run the full build (`--keep-going`),
so that you can see all errors in one run.

You can also use `-v` or `-vvv` to increase verbosity.
:::

## Build a standalone page

Sometimes you'd like to build a single page of content rather than an entire book.
For example, if you'd like to generate a web-friendly HTML page from a Jupyter notebook for a report or publication.

You can generate a standalone HTML file for a single page of the Jupyter Book using the same command:

```bash
jupyter-book build path/to/mypage.ipynb
```

This will execute your content and output the proper HTML in a `_build/_page/html/<mypage>` folder.
If the file is in a subdirectory relative to the `_build` folder, the HTML will be in a `_build/_page/html/<subdirectory-mypage>` folder.

Your page will be called `mypage.html`.
This will work for any [content source file](../file-types/index.md) that is supported by Jupyter Book.

:::{note}
Users should note that building **single pages** in the context of a larger project can trigger warnings and incomplete links.
For example, building `docs/start/overview.md` will issue a number of `unknown document`, `term not in glossary`, and `undefined links` warnings.
:::

## Page caching

By default, Jupyter Book will only build the HTML for pages that have
been updated since the last time you built the book.
This helps reduce the amount of time needed to build your book.
If you'd like to force Jupyter Book to re-build a particular page, you can either edit the
corresponding file in your book's folder, or delete that page's HTML in the `_build/html` folder.

You can also signal a full re-build using the `--all` option:

```bash
jupyter-book build --all mybookname/
```

## Local preview

To preview your book, you can open the generated HTML files in your browser.
Either double-click the html file in your local folder, or enter the absolute
path to the file in your browser navigation bar adding `file://` at the beginning
(e.g. `file://Users/my_path_to_book/_build/index.html`).

## Other builder types

You can build a variety of outputs using Jupyter Book. To choose a different builder, use the `--builder <builder-name>` configuration when running `jupyter-book build` from the command-line. Here is a list of builders that are available to you:

- `html`: HTML outputs (default)
- `singlehtml`: A single HTML page for your book
- `dirhtml`: HTML outputs with `<filename>/index.html` structure.
- `pdfhtml`: Build a PDF via HTML outputs (see [](pdf:html))
- `linkcheck`: Run the Sphinx link checker
- `latex`: Build Latex files for your book
- `pdflatex`: Build a PDF of your book via Latex (see [](pdf:latex))

## Next step: publish your book

Now that you've created the HTML for your book, it's time to publish it online.
That's covered in the [next section](./publish.md).
