---
title: Setup dependencies
---

This page should get you set up with the software and code needed to build
your textbook! Follow the steps below...

## Get your own copy of this repository

The easiest way to get a copy of this repository is to use **GitHub's Import Feature**.
This gives you a new copy of the contents of this repository, without creating
a "fork". This should make it easier for you to re-use the repository multiple
times.

To do this, take the following steps:

* Go to <a href="https://github.com/new/import" target="_blank">https://github.com/new/import</a>
* Enter the URL of the `textbooks-with-jupyter` repository in the
  "old repository's clone URL" field:

  ```
  https://github.com/choldgraf/textbooks-with-jupyter`
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

The textbooks for Jekyll repository primarily depends on three sets of tools:

* Python and Jupyter for converting Jupyter Notebooks into Jekyll-ready markdown
* GitHub (specifically, GitHub-pages) for hosting your textbook online with Jekyll
* (optionally) Ruby and Jekyll for previewing changes locally before pushing to GitHub

This page helps you set each of these up


0. **Install the Anaconda distribution of Python**. This is needed to install
   the dependencies in `environment.yml`. It's not *strictly* necessary, so
   if you know what you're doing feel free to skip this step.
1. **Install the proper dependencies**. You can do this by installing the
   Anaconda environment specified in `environment.yml`:

       conda env create -f environment.yml

2. **Activate the environment** before building your site.

       conda activate textbook

3. (optionally) **Install Ruby and the Jekyll plugin.**

   [See the Jekyll docs](https://jekyllrb.com/docs/installation/) for information on this.
   As well as the [GitHub gh-pages documentation](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/)
   for more information on how Jekyll and GitHub interact.

## Deploying a JupyterHub

If you wish, you may deploy a JupyterHub alongside your textbook. This way, students can
access the Jekyll markdown version of your course material, but can click the "interact" links
at the top of each page and be taken to a live Jupyter Notebook running on a JupyterHub.

The easiest way to set up a JupyterHub is to follow [The Littlest JupyterHub guide](https://the-littlest-jupyterhub.readthedocs.io/en/latest/index.html).
This is a straightforward deployment of JupyterHub on a single VM, and is suitable for
courses / workshops of less than 50-60 students.

Once you have your JupyterHub set up, you can use the [nbgitpuller](https://github.com/data-8/nbgitpuller)
package to send links to course material to your students, or use the interact links that Textbooks for Jupyter
automatically inserts into your course material.
