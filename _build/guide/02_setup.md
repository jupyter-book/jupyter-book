---
redirect_from:
  - "/guide/02-setup"
title: 'Setup and Install'
prev_page:
  url: /guide/01_overview
  title: 'Getting started'
next_page:
  url: /guide/03_prepare
  title: 'Prepare your book'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---
This page should get you set up with the software and code needed to build
your textbook! Follow the steps below...

## Get your own copy of this repository

The easiest way to get a copy of the template repository is to use **GitHub's Import Feature**.
This gives you a new copy of the contents of the template, without creating
a "fork". This should make it easier for you to re-use the repository multiple
times. **If you'd like to contribute improvements to the template itself, then please do fork it!**

To import the template repository to your GitHub account, take the following steps:

* Go to <a href="https://github.com/new/import" target="_blank">https://github.com/new/import</a>
* Enter the URL of the `jupyter-book` template repository in the
  "old repository's clone URL" field:

  ```
  https://github.com/choldgraf/jupyter-book
  ```

* Choose a new name for your repository, and whether you want it to be public.

  For example:

  ```
  my-course-spring-2018
  ```

* Wait while GitHub creates a version of this repository for your account. You
  can watch the progress of this process by looking at this URL:

  ```
  https://github.com/<YOUR-USERNAME>/<YOUR-NEW-REPO-NAME>/import
  ```
* Clone your repository to your computer and make edits as you wish. You may
  want to still add the URL of the original repository as a "remote" in case
  you want to pull in new changes to the template / build system.

That's it!

## Set up your repository and dependencies

The Jupyter Book repository primarily depends on three sets of tools:

* Python and Jupyter for converting Jupyter Notebooks into Jekyll-ready markdown
* GitHub (specifically, GitHub-pages) for hosting your textbook online with Jekyll
* (optionally) Ruby and Jekyll for building or previewing your site locally before pushing to GitHub

This section helps you set each of these up


0. **Install the Anaconda distribution of Python**. This is useful to install
   the dependencies in `build-environment.yml`. It's only *strictly* necessary if
   you wish to preview your book locally before pushing to GitHub. Next, you have
   two install options depending on whether you wish to only build the markdown
   for your Jupyter Book, or if you wish to preview your site locally.
1. **Option 1: Install the dependencies to build your book markdown only**.
     
   To build the markdown for your book, you need the dependencies
   specified in `build-requirements.txt`. You can install these with `pip install -r build-requirements.txt`.
   In this case, you *don't* need Ruby or Jekyll since you'll use GitHub to do all of the site creation.
2. **Option 2: Install the dependencies to build your book AND preview it locally**.

   To preview your book locally, you'll need Ruby and a set of Jekyll dependencies
   to build your site. You can install these with the following steps:
   
   * Install Ruby with conda forge (`conda install -c conda-forge ruby`) and install the requirements
     above with `pip install -r build-requirements.txt`)
   * *Alternatively*, install Ruby *and* the dependencies above in one step with
     `conda env create -f build-environment.yml`. This will create a fresh conda environment for you to
     build the book. Run `conda activate jupyter-book` to activate this environment once it's installed.
   * Once you have Ruby installed, run `make install`, which will install Bundler (a Ruby depency management tool) and then
     install the plugins needed to build the site.

## Deploying a JupyterHub

If you wish, you may deploy a JupyterHub alongside your textbook. This way, for pages that are built from
Jupyter Notebooks, students can click the "interact" links
at the top of each page and be taken to a live Jupyter Notebook running on your JupyterHub.

The easiest way to set up a JupyterHub is to follow [The Littlest JupyterHub guide](https://the-littlest-jupyterhub.readthedocs.io/en/latest/index.html).
This is a straightforward deployment of JupyterHub on a single VM, and is suitable for
courses / workshops of less than 50-60 students.

Once you have your JupyterHub set up, you can use the [nbgitpuller](https://github.com/data-8/nbgitpuller)
package to send links to course material to your students, or use the interact links that Textbooks for Jupyter
automatically inserts into your course material.
