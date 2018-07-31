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

* Get yourself a copy of this repository. [Here's the repo URL on GitHub](https://github.com/choldgraf/textbook-jekyll-template).
* Put your Jupyter Notebooks in `notebooks/` (they can be in sub-folders)
* Create a `SUMMARY.md` file in the root of the repository. This defines the structure
  of your textbook.
* Navigate to the repo root, then run `make textbook` to convert your Jupyter Notebooks into Jekyll-ready markdown.
* Push these changes to GitHub.
* Tell GitHub you want to build a website from your fork of the repository.
* That's it!

For a more complete description of the relevant files for this repository,
see the [Advanced topics section](../07_advanced).

See the rest of this guide in the links to the left for detailed
instructions on this process. The next section covers [Setting up your environment](../02_setup).
