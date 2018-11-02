This page contains more advanced and complete information about the
[`jupyter-book` repository](https://github.com/choldgraf/jupyter-book). See the sections below.

## Relevant files

There are a few moving parts associated with Jupyter Books, and this
section tries to cover most of the relevant pieces. The following list contains some
of the more important files/folders worth knowing about.

### Course materials

* `contents/` contains all course content in Jupyter notebook or markdown form
* `images/` contains images referenced in the book

### Auto-generated folders and files
* `images/build` contains images *generated* during the notebook conversion
* `_build/` contain notebooks automatically converted to markdown in the build process
* `_site/` contains the HTML for the built site. It is created by Jekyll, and should only exist if you build the site locally

### Repository configuration and build files
* `_config.yml` contains all site configuration.
* `_data/toc.yml` contains the table of contents for the book (AKA, the sidebar)
* `assets/` contains CSS and Javascript for the book and website
* `requirements.txt` contains the packages needed to run the notebooks in the Jupyter book
* `build-requirements.txt` contains the packages needed to build the Jupyter book

### Helper scripts

* `scripts/` contains scripts to generate the textbook from the Jupyter notebooks. These helper scripts are
  all run with the `Makefile` included with this repository.
    * `scripts/generate_book.py` will generate the markdown for your book.
       After you make any changes in `contents/`, you should run this script via
       `make book` so your site stays up-to-date.
    * `scripts/clean.py` is used to clean out any auto-generated files
    * `scripts/execute_all_notebooks.py` will use nbconvert to execute all notebooks in `contents/` in-place.
