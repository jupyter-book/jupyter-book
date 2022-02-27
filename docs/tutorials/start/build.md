# Build your book

Once you've added content and configured your book, it's time to
build outputs for your book.
We'll use the `jupyter-book build` command line tool for this.

Currently, there are two kinds of supported outputs: an HTML website for your
book, and a PDF that contains all of the pages of your book that is built
from the book HTML.
In this tutorial, we'll focus on building HTML outputs.

## Prerequisites

In order to build the HTML for each page, you should have followed the steps
in [](overview.md) and [](create.md).
You should have a collection of notebook/Markdown files in your `mybookname/` folder, a `_toc.yml` file that defines the structure of your book, and any configuration you'd like in the `_config.yml` file.

## Build your book's HTML

Now that your book's content is in your book folder and you've defined your book's structure in `_toc.yml`, you can build the HTML for your book.

Do so by running the following command:

```bash
jupyter-book build mybookname/
```

This will generate a fully-functioning HTML site using a **static site generator**.
The site will be placed in the `_build/html` folder, something like this:

```bash
mybookname
 └──_build
    └── html
       ├── _images
       ├── _static
       ├── index.html
       ├── intro.html
       ...
```

These are the static files for a standalone website!
They contain the HTML and all assets needed to view your book in a browser.

You can open the pages in the site by navigating to that folder and opening the `html` files with your web browser.

:::{note}
You can also use the short-hand `jb` for `jupyter-book`. E.g.,:
`jb build mybookname/`.
:::


## Aside: Source vs build files

At this point, you have created a combination of Jupyter notebooks, markdown files, and configuration files, including `_toc.yml` and `_config.yml`.
These files are your __source__ files.
The __source__ files comprise all of the content and configuration that Jupyter Book needs to build your book.

In addition, you have created a collection of _outputs_ in the `_build` folder.
The `_build` folder contains all of your static website __build__ files.
The __build__ files contain all of the output from Jupyter Book's `build` command.
These files are only used to view your content in a browser or to share with others.

The best practice for publishing your book is to use separate branches for your __source__ and your __build__ files.
For example, you may tell git to ignore your `_build` folder on your `main` branch, and push the outputs in your `_build` folder to a branch called `gh-pages`.
We'll cover some of this later on.

:::{admonition} A note on page cacheing
:class: tip
By default, Jupyter Book will only build the HTML for pages that have
been updated since the last time you built the book.

If you'd like to force Jupyter Book to re-build a particular page, you can either edit the
corresponding file in your book's folder, or delete that page's HTML in the `_build/html` folder.

You can also signal a full re-build using the `--all` option:

```bash
jupyter-book build --all mybookname/
```
:::

## Preview your built HTML

To preview your book, you can open the generated HTML files in your browser.
Either double-click the html file in your local folder, or enter the absolute
path to the file in your browser navigation bar adding `file://` at the beginning
(e.g. `file://Users/my_path_to_book/_build/index.html`).

Take a look at the web page that was generated from the markdown page that you created.
Note how the links you inserted were automatically **resolved** to point to the right place.
This is how you can keep consistent pointers from one section of your book to another.

## Create your own content

Now that you've built a simple HTML site from your demo book, we'll create some new content so that you can get the hang of adding new files. See [](new-file.md) for the next step.
