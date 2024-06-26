---
title: Upgrade an Existing Book From Jupyter Book 1
subtitle: Use automated tools to upgrade a legacy (Sphinx-based )Jupyter Book project to the new MyST engine.
# subject: MyST Quickstart Tutorial
short_title: Upgrade an Existing Book
---

:::{important} Objective

The goal of this tutorial is to walk existing users through the process of upgrading their books to Jupyter Book 2.  
:::

## Structure of a {term}`Legacy Book`

:::{important} Objective

Before we can upgrade a {term}`Legacy Book`, we must first discuss its important files and structure.
:::

### Configuration Files

Jupyter Book 1 used [the Sphinx documentation engine](https://www.sphinx-doc.org/en/master/) to build each book into publication-quality books and documents. In order to do this, a {term}`Legacy Book` was required to have a number of configuration files
.
:::{table} {term}`Legacy Book` configuration files.
:name: legacy-config-files

|    Filename   |                                           Purpose                                           |
|:-------------:|:-------------------------------------------------------------------------------------------:|
| `_toc.yml`    | To define the documents that comprise the contents of a book in the form of a site-map.     |
| `_config.yml` | To define configuration options that customize the content, structure, and style of a book. |
:::

An example {term}`Legacy Book` can be seen by running the legacy Jupyter Book `create` command

```shell
$ jupyter book create ./book
===============================================================================

Your book template can be found at

    book/

===============================================================================
```

We can then list the contents of this book,
```shell
$ ls ./book
_config.yml
_toc.yml
intro.md
logo.png
markdown-notebooks.md
markdown.md
notebooks.ipynb
references.bib
requirements.txt
```

where it can be seen that a number of files have been created, including the [`_config.yml`](#code:example-config) 
```{code} yaml
:filename: _config.yml
:name: code:example-config
:caption: Extract from the `_config.yml` file produced by the `jupyter book create` command.

# Book settings
# Learn more at https://jupyterbook.org/customize/config.html

title: My sample book
author: The Jupyter Book Community
logo: logo.png

# Force re-execution of notebooks on each build.
# See https://jupyterbook.org/content/execute.html
execute:
  execute_notebooks: force

# ...
```
and [`_toc.yml`](#code:example-toc) files described in [](#legacy-config-files).

```{code} yaml
:filename: _toc.yml
:name: code:example-toc
:caption: The `_toc.yml` file produced by the `jupyter book create` command.

# Table of contents
# Learn more at https://jupyterbook.org/customize/toc.html

format: jb-book
root: intro
chapters:
- file: markdown
- file: notebooks
- file: markdown-notebooks
```

### Bibliography File
In addition to the configuration files, there is also a bibliography file called [`references.bib`](#code:example-bib), which contains a list of references to academic publications. 

```{code} bibtex
:filename: references.bib
:name: code:example-bib
:caption: Extract from the `references.bib` file produced by the `jupyter book create` command.

@inproceedings{holdgraf_evidence_2014,
	address = {Brisbane, Australia, Australia},
	title = {Evidence for {Predictive} {Coding} in {Human} {Auditory} {Cortex}},
	booktitle = {International {Conference} on {Cognitive} {Neuroscience}},
	publisher = {Frontiers in Neuroscience},
	author = {Holdgraf, Christopher Ramsay and de Heer, Wendy and Pasley, Brian N. and Knight, Robert T.},
	year = {2014}
}

...

```

This file contains references written in the [BibTeX File Format](https://www.bibtex.org/Format/), which is well-understood by tools such as the [LaTeX document preparation system](https://www.latex-project.org/about/) that is used for PDF export.

### Requirements File
Finally, a [`requirements.txt`](#code:example-requirements) file is often used to define the Python packages required to build the book. This file is normally used both to install Jupyter Book (and related tools) and run any executable Python code.i

```{code} text
:filename: requirements.txt
:name: code:example-requirements
:caption: The `requirements.txt` file produced by the `jupyter book create` command.

jupyter-book
matplotlib
numpy
```
