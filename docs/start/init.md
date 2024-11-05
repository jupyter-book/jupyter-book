---
title: Initialise a project
subtitle: Use the Jupyter Book CLI to quickly get started.
subject: Quickstart tutorial
---

:::{important} Objective
The goal of this tutorial is to use the `jupyter book init` command to create a simple project consisting of a single MyST Markdown file.  
:::

## Generating a starting `myst.yml`

Jupyter Book ships with an `init` command, which initializes a `myst` project in the current directory. Let's run the command to create a simple `myst.yml`:

```shell
$ jupyter book init
```

The `init` command will ask whether you want to run the `start` command, which launches a local webserver that renders your MyST project. We will exit the program by pressing {kbd}`n` and {kbd}`Enter`, as we do not yet have any content to look at!

Let's inspect the `myst.yml` file that has been generated.

```{code} yaml
:filename: myst.yml
:caption: The `myst.yml` produced by `jupyter book init`.

# See docs at: https://mystmd.org/guide/frontmatter
version: 1

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
```

Most of the lines in this YAML file are comments, but there are a couple of things to take note of:

(def:project)=
`project`
: The `project` key defines the project _frontmatter_, which allows you to speocfy how your project should render and behave. We'll look at this section later in this tutorial.

`site`
: The `site` key defines the website configuration, used by the `start` command or when building an HTML export. Here, we're telling MyST to use the book theme.

## Configuring your project

A `myst.yml` file comprises multiple sections that configure different parts of the MyST engine. Of particular importance is the [`project` field](#def:project) which contains the project metadata. Examples of configuration that we might add to the project frontmatter include a list of `authors`, a `description`/`title`, and a `license`. For detailed information about the possible frontmatter fields, see [the MyST-MD documentation](xref:guide/frontmatter#available-frontmatter-fields).

Let's update our `myst.yml` with some information about the project:

```{code} yaml
:filename: myst.yml
:name: code:myst-yml
:caption: The `myst.yml` produced by `jupyter book init` with additional provenance information.
:linenos:
:emphasize-lines: 6,7,8,9,10,11

# See docs at: https://mystmd.org/guide/frontmatter
version: 1

project:
  id: 4da9cb15-177c-41f5-8c4e-6a24b4e87eab
  title: An example Jupyter Book
  description: A collection of files that build up a book
  keywords:
    - jupyter-book
    - something-else
  github: captain-jupyter/my-book
  # To autogenerate a table of contents, run "jupyter book init --write-toc"
site:
  template: book-theme
  # options:
  #   favicon: favicon.ico
  #   logo: site_logo.png
```

To proceed with building a website or PDF, we need to create some content. See [](create-content.md).
