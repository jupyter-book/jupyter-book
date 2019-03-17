# The Jupyter Book maintainer's guide

This is a short guide for maintaining Jupyter Book. If you're brand new to
Jupyter Book, you should probably check out the [Contributing Guide](https://github.com/jupyter/jupyter-book/blob/master/CONTRIBUTING.md)
first!

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
