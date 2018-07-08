---
title: Overview and Intro
---

# Textbooks with Jupyter and Jekyll

This repository / website is a template for hosting your own textbook using
Jekyll and Jupyter Notebooks. All course content is written in markdown and
Jupyter Notebooks, and a set of helper scripts converts these notebooks into
Jekyll-based markdown fit for hosting on the web. This short guide will
help you through the process should you want to do this for your own textbook.

## The build process

The build process in general goes something like this:

* Fork and clone this repository to your computer. [Here's the repo URL on GitHub](https://github.com/choldgraf/textbook-jekyll-template).
* Put your Jupyter Notebooks in `notebooks/` (they can be in sub-folders)
* Create a `SUMMARY.md` file in the root of the repository. This defines the structure
  of your textbook.
* Navigate to the repo root, then run `make textbook` to convert your Jupyter Notebooks into Jekyll-ready markdown.
* Push these changes to GitHub.
* Tell GitHub you want to build a website from your fork of the repository.
* That's it!

See the rest of this guide for more detailed instructions on this process.

## Relevant files

First off, a short description of this repository. The following list contains some
of the more important files/folders worth knowing about.

### Website materials

* `_posts` contains a collection of posts that are displayed chronologically
  with Jekyll's `posts` page.
* `<XXX>.md` all files in the site's room ending in `.md` will be built into HTML
  and available as pages on the final website.

### Course materials

* `notebooks/` contains all course content in Jupyter notebook form
* `data/` contains the CSV data files used in the course textbook
* `images/` contains images referenced in the course
* `SUMMARY.md` contains a markdown list of chapters / paths to your textbook files. For
  example, here is a sample from the Data 8 textbook:

  ```
  * [1. Data Science](notebooks/01/what-is-data-science.md)
    * [1.1 Introduction](notebooks/01/1/intro.ipynb)
      * [1.1.1 Computational Tools](notebooks/01/1/1/computational-tools.md)
    * [1.2 Why Data Science?](notebooks/01/2/why-data-science.md)
  * [2. Causality and Experiments](notebooks/02/causality-and-experiments.ipynb)
    * [2.1 John Snow and the Broad Street Pump](notebooks/02/1/observation-and-visualization-john-snow-and-the-broad-street-pump.md)
    * [2.2 Snow’s “Grand Experiment”](notebooks/02/2/snow-s-grand-experiment.ipynb)
   ```

### Auto-generated folders and files
* `images/chapters` contains images *generated* during the notebook conversion
* `_chapters/` contain notebooks automatically converted to markdown in the build process
* `_site/` contains the HTML for the built site. It is created by Jekyll, and should only exist if you build the site locally
* `_data/textbook.yml` contains information generated in the textbook build process.

### Repository configuration and build files
* `_config.yml` contains all site configuration.
* `_data/navigation.yml` contains site navigation as well as auto-generated sidebar yaml
* `assets/css` contains CSS for the textbook and website
* `environment.yml` contains the environment needed to build the textbook
* `_includes/textbook.html` contains Javascript and HTML needed to set up the textbook

### Helper scripts

* `scripts/` contains scripts to generate the textbook from the Jupyter notebooks
    * `scripts/generate_textbook.py` will generate the markdown and sidebar for your textbook. After you make any changes
      in `notebook/`, you should run this script via `make textbook` so your site stays up-to-date.
    * `scripts/clean.py` is used to clean out any auto-generated files
    * `scripts/execute_all_notebooks.py` will use nbconvert to execute all notebooks in `notebooks/` in-place.
    * `scripts/generate_summary_from_folders.py` is a helper script to automatically gneerate a `SUMMARY.md` file from
      the files/folders in `notebooks/`.
