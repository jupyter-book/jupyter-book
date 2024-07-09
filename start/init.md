---
title: Initialise a Project
subtitle: Use the Jupyter Book CLI to quickly get started.
subject: Jupyter Book Quickstart Tutorial
---

:::{important} Objective
The goal of this tutorial is to use the `jupyter book init` command to start a simple website.  
:::

## Running `jupyter book init`

Jupyter Book ships with an `init` command, which initializes a `myst` project in the current directory. Let's run the command to create a simple `myst.yml`:
```shell
$ jupyter book init
```

The `init` command will ask whether you want to run the `start` command, which launches a local webserver that renders your MyST project. We will press {kbd}`n`, as we first need to create some content!

Let's inspect the `myst.yml` file that has been generated.

:::{code} yaml
:filename: myst.yml

# See docs at: https://mystmd.org/guide/frontmatter
version: 1

# Jupyter Book (via myst) base configuration
extends:
- https://jupyterbook.org/myst.1.yaml

project:
  id: 4da9cb15-177c-41f5-8c4e-6a24b4e87eab
  # title:
  # description:
  # keywords: []
  # authors: []
  # github:
  # To autogenerate a Table of Contents, run "jupyter book init --write-toc"
site:
  template: book-theme
  # options:
  #   favicon: favicon.ico
  #   logo: site_logo.png
:::

Most of the lines in this YAML file are comments, but there are a few things to take note of:

`extends`
: This array defines the base-configurations that this project inherits from. Here, we declare the Jupyter Book 2 configuration.

`site`
: The `site` key defines the website configuration, used by the `start` command. Here, we're telling MyST to use the book theme.
