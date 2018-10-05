---
title: Advanced topics
---

This page contains more advanced and complete information about the
[`jupyter-book` repository](https://github.com/choldgraf/jupyter-book). See the sections below.

## Relevant files

There are a few moving parts associated with Jupyter Books, and this
section tries to cover most of the relevant pieces. The following list contains some
of the more important files/folders worth knowing about.

### Website pages

* `<XXX>.md` all files in the repository's root ending in `.md` will be built into HTML
  and available as pages on the final website. These should have **Jekyll Front Matter**
  in them (e.g., beginning/ending with `---`). If you create a new page, make sure to
  link it in the sidebar (`_data/toc.yml`).

### Course materials

* `notebooks/` contains all course content in Jupyter notebook or markdown form
* `data/` contains the CSV data files used in the book
* `images/` contains images referenced in the book

### Auto-generated folders and files
* `images/ch` contains images *generated* during the notebook conversion
* `_ch/` contain notebooks automatically converted to markdown in the build process
* `_site/` contains the HTML for the built site. It is created by Jekyll, and should only exist if you build the site locally

### Repository configuration and build files
* `_config.yml` contains all site configuration.
* `_data/toc.yml` contains the table of contents for the book (AKA, the sidebar)
* `assets/` contains CSS and Javascript for the book and website
* `environment.yml` contains the environment needed to build the jupyter book

### Helper scripts

* `scripts/` contains scripts to generate the textbook from the Jupyter notebooks
    * `scripts/generate_book.py` will generate the markdown for your book.
       After you make any changes in `notebook/`, you should run this script via
       `python scripts/generate_book.py` or `make textbook` so your site stays up-to-date.
    * `scripts/clean.py` is used to clean out any auto-generated files
    * `scripts/execute_all_notebooks.py` will use nbconvert to execute all notebooks in `notebooks/` in-place.
