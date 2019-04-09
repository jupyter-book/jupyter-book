# The Jupyter Book maintainer's guide

This is a short guide for maintaining Jupyter Book. If you're brand new to
Jupyter Book, you should probably check out the [Contributing Guide](https://github.com/jupyter/jupyter-book/blob/master/CONTRIBUTING.md)
first!

## How is this repository structured?

Jupyter Book is essentially two things, both of which live in the top `jupyter_book/`
folder:

* A **book template** with HTML/CSS/structure that defines a book structure. This
  lives in [`jupyter_book/jupyter_book/`](https://github.com/jupyter/jupyter-book/tree/master/jupyter_book/book_template). There is also a **minimal** folder that contains a few simple
  content files that we use with `jupyter-book create` to pre-populate content.
* A **command-line interface** that creates new books and controls machinery to do things
  like generate book-ready files from your notebooks. These are the Python files
  in [`jupyter_book/`](https://github.com/jupyter/jupyter-book/tree/master/jupyter_book).

### Where are the tests?

Tests are located at [`jupyter_book/tests/`](https://github.com/jupyter/jupyter-book/tree/master/jupyter_book/tests).
They are written with **pytest**, and try to test much of the book creating and building
machinery. They currently don't do a great job of testing the javascript/HTML of built
books, but if you had ideas for how that could be improved, we'd really love it ✨!

The tests uses a collection of configurations (in `configs/`) and book files (in `content/`).

## How is the documentation deployed?

Jupyter Book deploys its documentation automatically using CircleCI. The
documentation lives as a collection of HTML files on the `gh-pages` branch
of the repository. CircleCI has the permissions to push to `gh-pages`, and
so the following things happen to get the docs updated:

When a PR is merged into master, do the following:

1. First, run a Docker image with Python and use `jupyter-book` to build the
   latest markdown files from the latest `content/` folder. ([circleci step here](https://github.com/jupyter/jupyter-book/blob/master/.circleci/config.yml#L65)).
   Persist the contents of the `_build/` folder with the `persist_to_workspace` command.
2. Then, run a Ruby image that loads in the `_build/` folder and builds the HTML
   for the site using Jekyll. ([circleci step here](https://github.com/jupyter/jupyter-book/blob/master/.circleci/config.yml#L18)).
3. Finally, `git push` the contents of `_site/` to the `gh-pages` branch of the
   repository, including a `.nojekyll` folder, and then GitHub Pages will host
   the updated site.

All of this is [configured in the CircleCI configuration](https://github.com/jupyter/jupyter-book/blob/master/.circleci/config.yml).
