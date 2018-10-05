---
title: Overview and Intro
---

# The Jupyter Books Guide

This repository / website is a guide for hosting your own book using
Jekyll and Jupyter Notebooks. All course content is written in markdown and
Jupyter Notebooks, and a set of helper scripts converts these notebooks into
Jekyll-based markdown fit for hosting on the web. This short guide will
help you through the process should you want to do this for your own book.

## The build process

The build process in general goes something like this (we'll go into each
step in more detail in this guide):

* Get yourself a copy of the template repository. [Here's the repo URL on GitHub](https://github.com/choldgraf/jupyter-book).
* Put your Jupyter Notebooks in `notebooks/` (they can be in sub-folders)
* Edit the `_data/toc.yml` file for your Table of Contents. This defines the structure
  of your textbook.
* Navigate to the repo root, then run `make textbook` to convert your Jupyter Notebooks into Jekyll-ready markdown.
* Push these changes to GitHub.
* Tell GitHub you want to build a website from your fork of the repository.
* That's it!

For a more complete description of the relevant files for the template repository,
see the [Advanced topics section](../07_advanced).

See the rest of this guide in the links to the left for detailed
instructions on this process. The next section covers [Setting up your environment](../02_setup).
