---
title: Upgrade an existing book from Jupyter Book 1
subtitle: Use automated tools to upgrade a legacy (Sphinx-based) Jupyter Book project to the new MyST engine.
# subject: myst Quickstart tutorial
short_title: Upgrade from JB 1 ⭐
---

:::{important} Objective
The goal of this tutorial is to walk existing users through the process of upgrading their books to Jupyter Book 2.  
:::

:::{hint} TL;DR
Run the new `jupyter book` command inside your existing {term}`Legacy Book` to automatically upgrade it to Jupyter Book 2. This process is automated
but you might need to clean up a few things by hand to eliminate warnings.
:::

(section:structure-legacy-book)=

## Structure of a legacy book

Before we can upgrade a {term}`Legacy Book`, we must first discuss its important files and structure. Jupyter Book 1 uses [the Sphinx documentation engine](https://www.sphinx-doc.org/en/master/) to build each book into publication-quality books and documents. Sphinx was originally designed for documentation generation, such as <https://docs.python.org>, and has a long historical legacy. In order to hide the complexity that stems from making a documentation engine behave like a book authoring tool, Jupyter Book 1 introduced its own configuration files and CLI. Consequently, a {term}`Legacy Book` is required to have a number of configuration files shown in @legacy-config-files.

:::{table} {term}`Legacy Book` configuration files.
:name: legacy-config-files

|   Filename    |                                           Purpose                                           |
| :-----------: | :-----------------------------------------------------------------------------------------: |
|  `_toc.yml`   |   To define the documents that comprise the contents of a book in the form of a site-map.   |
| `_config.yml` | To define configuration options that customize the content, structure, and style of a book. |

:::

The most important files in a {term}`Legacy Book` are the `_toc.yml` and `_config.yml` files described in [](#legacy-config-files). These files control what a book contains and what it looks like.

An example {term}`Legacy Book` can be seen at <https://github.com/jupyter-book/legacy-demo-book/>. If we inspect the contents of the `my_book` directory, there are a number of files including [`_toc.yml`](#code:example-toc) and [`_config.yml`](#code:example-config):

```{code} shell
:caption: Contents of the {term}`Legacy Book` at <https://github.com/jupyter-book/legacy-demo-book/>.
:name: legacy-contents

$ git clone https://github.com/jupyter-book/legacy-demo-book
$ cd demo-book
$ ls ./my_book
_config.yml
content.md
intro.md
logo.png
markdown.md
markdown-notebooks.md
notebooks.ipynb
references.bib
_toc.yml
```

```{code} yaml
:filename: my_book/_config.yml
:name: code:example-config
:caption: Extract from the `_config.yml` file defined in <https://github.com/jupyter-book/legacy-demo-book/>.

#######################################################################################
# A default configuration that will be loaded for all jupyter books
# See the documentation for help and more options:
# https://jupyterbook.org/customize/config.html

#######################################################################################
# Book settings
title                       : My Book  # The title of the book. will be placed in the left navbar.
author                      : Captain Jupyter  # The author of the book
copyright                   : "2024"  # Copyright year to be placed in the footer
logo                        : logo.png  # A path to the book logo

# Force re-execution of notebooks on each build.
# See https://jupyterbook.org/content/execute.html
execute:
  execute_notebooks: force

# ...
```

```{code} yaml
:filename: my_book/_toc.yml
:name: code:example-toc
:caption: The `_toc.yml` file defined in <https://github.com/jupyter-book/legacy-demo-book/>.

# Table of contents
# Learn more at https://jupyterbook.org/customize/toc.html

format: jb-book
root: intro
chapters:
- file: markdown
- file: notebooks
- file: markdown-notebooks
```

Some advanced books may have chosen to migrate away from Jupyter Book's configuration files, and use Sphinx directly. These books do not define a `_config.yml`, instead they utilise a Sphinx-style `conf.py` file. Jupyter Book does not support upgrading books from Sphinx sites, for now.

## Upgrading a legacy book

Now that we know what a {term}`Legacy Book` looks like, we can compare its structure with a {term}`New Book`.

The new Jupyter Book has a single configuration file `myst.yml`. See @code:myst-example-config for the `myst.yml` that corresponds to @code:example-config and @code:example-toc:

```{code} yaml
:filename: myst.yml
:name: code:myst-example-config
:caption: Contents of the `myst.yml` file that corresponds to [](#code:example-config).

version: 1
project:
  title: My sample book
  authors:
    - name: The Jupyter Book Community
  github: executablebooks/jupyter-book
  bibliography:
    - references.bib
  exports:
    - format: pdf
      template: plain_latex_book
      output: exports/book.pdf
  toc:
    - file: intro.md
    - file: markdown.md
    - file: notebooks.ipynb
    - file: markdown-notebooks.md
site:
  options:
    logo: logo.png
  template: book-theme
```

It can be seen that [](#code:myst-example-config) has a `toc` section that looks very similar to [](#code:example-toc). This style of defining a TOC is designed to be easier to read and write.

% TODO: link or embed myst.yml?

Jupyter Book will automatically upgrade a {term}`Legacy Book` to a {term}`New Book` if it detects the `_config.yml` file described in @section:structure-legacy-book. To do this, we need to run the _new_ `jupyter book` command in the Legacy Book directory. Let's try this tool with the example book given above.

% TODO: what should this report?

First, let's confirm that we're now using the _new_ Jupyter Book tool:

```{code} shell
$ jupyter book --version
v2.0.0-alpha.0
```

We can then run the `jupyter book` command, which will detect the {term}`Legacy Book` and ask to perform an in-place upgrade:

```{code} shell
:linenos:
:emphasize-lines: 15,16,17
:name: code:upgrade-prompt

$ cd book
$ jupyter book
Welcome to the Jupyter Book (via myst) CLI! 🎉 🚀

jupyter book init walks you through creating a myst.yml file.

You can use Jupyter Book (via myst) to:

 - create interactive websites from markdown and Jupyter Notebooks 📈
 - build & export professional PDFs and Word documents 📄

Learn more about this CLI and MyST Markdown at: https://mystmd.org

? 📘 Found a legacy Jupyter Book. To proceed, myst needs to perform an upgrade which will:
‣ Upgrade any Sphinx-style glossaries to MyST-style glossaries
‣ Upgrade any case-insensitive admonition names to lowercase (Note → note)
‣ Migrate configuration from _config.yml and (if applicable) _toc.yml files
‣ Rename any modified or unneeded files so that they are hidden

Are you willing to proceed? (Y/n)
```

Pressing <kbd>Y</kbd> will start the upgrade process, during which time Jupyter Book reports the steps that take place, e.g. the lines highlighted in [](#code:upgrade-steps). For this particular book, the configuration files from the Legacy Book are migrated:

```{code} shell
:linenos:
:emphasize-lines: 3,4
:name: code:upgrade-steps

Are you willing to proceed? (Y/n) Yes
💾 Writing new config file: myst.yml
Migrating Jupyter Book configuration to myst.yml
Migrating TOC to myst.yml
```

We can see that the migration step has created some {term}`Hidden Files` (see [](#upgraded-contents)). This ensures that you can recover the original files if something goes wrong during the upgrade.

```{code} shell
:linenos:
:emphasize-lines: 5,14
:caption: Contents of an {term}`Legacy Book` upgraded with the new `jupyter book` command.
:name: upgraded-contents

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

Finally, Jupyter Book then asks us whether we'd like to run `jupyter book start`.

```{code} shell
? Would you like to run jupyter book start now?
```

We can press the {kbd}`y` key in this terminal window to launch a MyST webserver. Clicking the generated link (or pasting it into a new browser tab) will allow us to preview our site and see changes quickly reflected in the browser (see [](#image:screenshot)).

:::{figure} media/images/screenshot-jupyter-book-start.png
:name: image:screenshot

Browser screenshot of the URL generated by `jupyter book start`.
:::
