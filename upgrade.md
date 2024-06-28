---
title: Upgrade an Existing Book From Jupyter Book 1
subtitle: Use automated tools to upgrade a legacy (Sphinx-based )Jupyter Book project to the new MyST engine.
# subject: MyST Quickstart Tutorial
short_title: Upgrade an Existing Book
---

:::{important} Objective

The goal of this tutorial is to walk existing users through the process of upgrading their books to Jupyter Book 2.  
:::

(section:structure-legacy-book)=
## Structure of a {term}`Legacy Book`

:::{important} Objective

Before we can upgrade a {term}`Legacy Book`, we must first discuss its important files and structure.
:::

### Generating a {term}`Legacy Book`

Jupyter Book 1 uses [the Sphinx documentation engine](https://www.sphinx-doc.org/en/master/) to build each book into publication-quality books and documents. Sphinx was originally designed for documentation generation, such as <https://docs.python.org>, and has a long historical legacy. In order to hide the complexity that stems from making a documentation engine behave like a book authoring tool, Jupyter Book 1 introduced its own configuration files and CLI to build a book. Consequently, a {term}`Legacy Book` is required to have a number of configuration files (see [](#legacy-config-files)).

:::{table} {term}`Legacy Book` configuration files.
:name: legacy-config-files

|    Filename   |                                           Purpose                                           |
|:-------------:|:-------------------------------------------------------------------------------------------:|
| `_toc.yml`    | To define the documents that comprise the contents of a book in the form of a site-map.     |
| `_config.yml` | To define configuration options that customize the content, structure, and style of a book. |
:::

An example {term}`Legacy Book` can be seen by running the legacy Jupyter Book `create` command:

```shell
$ jupyter book create ./book
===============================================================================

Your book template can be found at

    book/

===============================================================================
```

If we inspect the contents of the generated `book` directory, it can be seen that a number of files have been created:

```{code} shell
:caption: Contents of a {term}`Legacy Book` created using the `jupyter book create` command.
:name: legacy-contents

$ ls ./book
.
..
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

### Configuration Files
The most important files in a {term}`Legacy Book` are the [`_config.yml`](#code:example-config) and [`_toc.yml`](#code:example-toc) files described in [](#legacy-config-files). These files control what a book contains and what it looks like.


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

Some advanced books may have chosen to stop using Jupyter Book's configuration and use Sphinx directly. These books do not define a `_config.yml`, instead they utilise a Sphinx-style `conf.py` file.

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
Finally, a [`requirements.txt`](#code:example-requirements) file is often used to define the Python packages required to build the book. This file is normally used both to install Jupyter Book (and related tools) and run any executable Python code.

```{code} text
:filename: requirements.txt
:name: code:example-requirements
:caption: The `requirements.txt` file produced by the `jupyter book create` command.

jupyter-book
matplotlib
numpy
```

## Structure of a {term}`New Book`
:::{important} Objective

Now that we know what a {term}`Legacy Book` looks like, we can compare its structure with a {term}`New Book`.
:::


Whilst Jupyter Book 1 was build upon the _Sphinx_ document engine, Jupyter Book 2 is built upon the [_MyST-MD_ engine](https://mystmd.org). The reasons for this transition are outlined in [](./reference/why-switch-mystmd.md). Unlike Jupyter Book 1, Jupyter Book 2 does not try to hide the fact that it is built on a different engine; MyST-MD is designed from the ground up to be good at technical writing, and the Executable Books team believe that it is both powerful and easy-to-use. As such, Jupyter Book 2 builds on top of MyST-MD, using the same CLI and `myst.yml`. 

::: {pull-quote}
Unlike Jupyter Book 1, Jupyter Book 2 does not try to hide the underlying engine.
:::

% TODO: link or embed myst.yml?

Jupyter Book will automatically upgrade a {term}`Legacy Book` to a {term}`New Book` by looking for the `_config.yml` file described in [](#section:structure-legacy-book). To do this, we need to run the _new_ `jupyter book` command in the {term}`Legacy Book` directory. Let's try this tool with the example book given above.

% TODO: what should this report?

First, let's confirm that we're now using the _new_ Jupyter Book tool:
```{code} shell
$ jupyter book --version

```

We can then run the `jupyter book` command, which will detect the {term}`Legacy Book` and perform an in-place upgrade:
```{code} shell
:linenos:
:emphasize-lines: 15,16,17

$ cd book
$ jupyter book
Welcome to the MyST Markdown CLI!! 🎉 🚀

myst init walks you through creating a myst.yml file.

You can use myst to:

 - create interactive websites from markdown and Jupyter Notebooks 📈
 - build & export professional PDFs and Word documents 📄

Learn more about this CLI and MyST Markdown at: https://mystmd.org


📘 Found a legacy Jupyter Book, writing new config file: myst.yml
Renamed _config.yml to ._config.yml.myst.bak
Renamed _toc.yml to ._toc.yml.myst.bak

? Would you like to run myst start now?
```

This generates the following files:

```shell
$ ls
.
..
_build
intro.md
logo.png
markdown.md
markdown-notebooks.md
myst.yml
notebooks.ipynb
references.bib
requirements.txt
```
Configuration files from the {term}`Legacy Book` are renamed to {term}`Hidden Files` to make it easy to recover the original book if something goes wrong:

```{code} shell
:linenos:
:emphasize-lines: 5,14

$ ls -a
.
..
_build
._config.yml.myst.bak
intro.md
logo.png
markdown.md
markdown-notebooks.md
myst.yml
notebooks.ipynb
references.bib
requirements.txt
._toc.yml.myst.bak
```

