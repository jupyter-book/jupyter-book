# Books with Jupyter and Jekyll

<img src="https://circleci.com/gh/jupyter/jupyter-book.svg?style=svg" class="left">

Jupyter Books lets you build an online book using a collection of Jupyter Notebooks
and Markdown files. Its output is similar to the excellent [Bookdown](https://bookdown.org/yihui/bookdown/) tool,
and adds extra functionality for people running a Jupyter stack.

For an example of a book built with Jupyter Books, see the [textbook for Data 100](https://www.textbook.ds100.org/) at UC Berkeley (or this website!)

Here are a few features of Jupyter Books

* A Command-Line Interface (CLI) to quickly create, build, and upgrade books.
* Write book content in markdown and Jupyter Notebooks
* Convert these into Jekyll pages that can be hosted for free on GitHub
* Pages can have [Binder](https://mybinder.org), JupyterHub, or Theblab links
  automatically added for interactivity.
* The website itself is based on Jekyll and is highly extensible.
* There are lots of nifty HTML features under-the-hood, such as
  Turbolinks fast-navigation and click-to-copy in code cells.

Check out other features in the [Features section](features/features).

## Getting started

To get started, you may be interested in the following links.
Here are a few links of interest:

* **[Jupyter Book features](features/features)** is a quick demo and overview
  of Jupyter Books.

* **[The Jupyter Book Guide](guide/01_overview)**
  will step you through the process of configuring and building your own Jupyter Book.

### Installation

To install the Jupyter Book command-line interface (CLI), use `pip`!

```
pip install jupyter_book
```

### Create a new book

Once you've installed the CLI, create a new book using the demo book content
(the website that you're viewing now) with this command:

```
jupyter-book create mybookname --demo
```

### Build the markdown for your book

Now, build the markdown that Jekyll will use for your book. Run this command:

```
jupyter-book build mybookname
```

### That's it!

You can now either push your book to GitHub and serve the demo with gh-pages,
or modify the book with your own content.


## Acknowledgements

Jupyter Books was originally created by [Sam Lau][sam] and [Chris Holdgraf][chris]
with support of the **UC Berkeley Data Science Education Program and the
[Berkeley Institute for Data Science](https://bids.berkeley.edu/)**.

[sam]: http://www.samlau.me/
[chris]: https://predictablynoisy.com
