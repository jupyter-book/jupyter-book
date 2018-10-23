# Books with Jupyter and Jekyll

Jupyter Books lets you build an online book using a collection of Jupyter Notebooks
and Markdown files.

For an example of a book built with Jupyter Books, see the [textbook for Data 100](https://www.textbook.ds100.org/) at UC Berkeley.

Here are a few features of Jupyter Books

* All course content is written in markdown and Jupyter Notebooks, stored in `notebooks/`
* The Jupyter Book repo comes packaged with helper scripts to convert these into Jekyll pages (in `scripts/`) that can be hosted for free on GitHub
* Pages can have [Binder](https://mybinder.org) or JupyterHub links automatically added for interactivity.
* The website itself is based on Jekyll, and is highly extensible and can be freely-hosted on GitHub.
* There are lots of nifty HTML features under-the-hood, such as Turbolinks fast-navigation and
  click-to-copy in code cells.

## Getting started

To get started, you may be interested in the following links.
Here are a few links of interest:

* **[Quickstart](ch/introduction/intro)** is a quick demo and overview of Jupyter Books.

* **[The Jupyter Book Guide](ch/guide/00_intro)**
  will step you through the process of configuring and building your own Jupyter Book.

* **[The Jupyter Book template repo](https://github.com/choldgraf/jupyter-book)** is the template
  repository you'll use as a start for your Jupyter Book.

* **A demo of the Jupyter Book** can be browsed via the sidebar to the left.

## Installation

Here's a brief rundown of how to create your own Jupyter Book using this site. For a more
complete guide, see [the Jupyter Book guide](ch/guide/00_intro).

* Fork the Jupyter Book template repo
* Replace the demo notebooks in `notebooks/` with your own notebooks and markdown files.
* Create a Table of Contents yaml file by editing `_data/toc.yaml`.
* Generate the Jekyll markdown for your notebooks by running `scripts/generate_book.py`
* Push your changes to GitHub (or wherever you host your site)!

## Acknowledgements

Jupyter Books was originally created by [Sam Lau][sam] and [Chris Holdgraf][chris]
with support of the **UC Berkeley Data Science Education Program and the Berkeley
Institute for Data Science**.

[sam]: http://www.samlau.me/
[chris]: https://predictablynoisy.com
