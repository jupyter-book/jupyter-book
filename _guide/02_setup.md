---
title: Setup dependencies
---

# Set up your repository and dependencies

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
       
3. (optionally) **Install Ruby and the Jekyll plugin.

   [See the Jekyll docs](https://jekyllrb.com/docs/installation/) for information on this.
   As well as the [GitHub gh-pages documentation](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/)
   for more information on how Jekyll and GitHub interact.
