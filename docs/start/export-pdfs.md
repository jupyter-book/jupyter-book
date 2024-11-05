---
title: Export PDFs
subtitle: Create beautifully typeset PDFs from your MyST project.
subject: Quickstart tutorial
---

:::{important} Objective
The goal of this tutorial is to explore the ways in which the MyST-MD engine can be used to create beautiful, well-typeset PDF documents.
:::

## Choosing a template

Jupyter Book uses [Typst](https://typst.app) and [LaTeX](https://www.latex-project.org/) to typeset books into a high-quality PDFs through hand-crafted templates. There are a range of different templates available, suited to different end-formats e.g. the [Springer](https://link.springer.com/journals) journals, or [arXiv](https://arxiv.org/) preprint archive.

You can see a list of available templates with

```{code} shell
:linenos:
:emphasize-lines: 4,8,12

$ jupyter book templates list --pdf
PDF templates may use either "tex" or "typst"

AGU Journal                   agu2019
Description: The official 2019 AGU Journal template
Tags: paper, journal, geoscience, earthscience

arXiv (NIPS Style)            arxiv_nips
Description: An arXiv compatible template based on the NIPS 2018 Style
Tags: paper, preprint, arxiv, bioarxiv, eartharxiv

arXiv (Two Column)            arxiv_two_column
Description: A two column arXiv compatible template
Tags: paper, two-column, preprint, arxiv, bioarxiv, eartharxiv
...
```

For this tutorial, we'll use the `lapreprint-typst` template, which requires Typst to be installed. See the screenshot of the template in action in @template-screenshot.

:::{figure} https://raw.githubusercontent.com/myst-templates/lapreprint-typst/refs/heads/main/examples/pixels/files/screenshot.png
:name: template-screenshot

A screenshot of a PDF document export using the `lapreprint-typst` template.
:::

## Configuring the template

One of the most important features of templates is `parts`. A `part` of a template is a distinct piece of a document that is semantically important, such as the _abstract_, or _acknowledgements_. You can read more about `parts` in <xref:guide/document-parts>.

Let's find out which `parts`, and other configuration like `options`, are needed by our chosen template. We can do this using the `jupyter book templates list` command again. This time, we set the type to `--typst` because our template is ultimately a Typst template, and pass the name of the template:

```{code} shell
:name: template-parts
:linenos:
:emphasize-lines: 11
$ jupyter book templates list --typst lapreprint-typst

LaPreprint Typst Template     lapreprint-typst
ID: typst/myst/lapreprint-typst
Version: 0.0.1
Authors: Rowan Cockett, Franklin Koch
Description: Easily create beautiful preprints in Typst
Tags: preprint, article, paper

Parts:
abstract (required) - An abstract is a short summary of your research paper or report. A good abstract will prepare readers for the detailed information to follow, communicate the essence of the article and help readers take away and remember key points.
summary - Plain language summary
acknowledgements - Acknowledgements printed in the margin
availability - Data availability statement printed in the margin

Options:
logo (file) - An image path that is shown in the top right of the page
kind (string) - The "kind" of the content, e.g. "Original Research" - shown as the title of the margin content on the first page
```

In @template-parts we can see that the only _required_ `part` is `abstract`. Let's add a new abstract to our project. For now, the underlying MyST-MD engine only supports `parts` defined per-page, so we'll define the `abstract` in our `intro.md` document:

::::{code} markdown
:name: myst:intro-md
:filename: intro.md
:linenos:
:emphasize-lines: 3,4,5

# Introduction

+++ {"part": "abstract"}
This is my abstract!
+++

I am a book about ... something! Wikipedia has [information about books](wiki:book): hover over the link for more information.

% An admonition containing a note
:::{note}
Books are usually written on paper ... But Jupyter Book can create _websites_!
:::

If you sold 100 books at \$10 per book, you'd have \$1000 dollars according to [](#eq:book). If instead you publish your Jupyter Book to the web for free, you'd have \$0 dollars!

% An arbitrary math equation
:::{math}
:name: eq:book

x \times y = z
:::

Sometimes when reading it is helpful to foster a _tranquil_ environment. The image in [](#fig:mountains) would be a perfect spot!

% A figure of a photograph of some mountains, followed by a caption
:::{figure} https://github.com/rowanc1/pics/blob/main/mountains.png?raw=true
:label: fig:mountains

A photograph of some beautiful mountains to look at whilst reading.
:::

::::

Now that our document has an `abstract`, we can set-up the export configuration.

## Adding missing frontmatter

The MyST engine that powers Jupyter Book is designed for technical and scientific communication. It is not surprising, therefore, that concepts like authorship are very important. Before we can set-up a PDF export, we need to ensure that our project has information about who the authors are! Because the same author (you) has authored every page in this tutorial, we'll add the author information to the `project` section in `myst.yml`. Sometimes, you might have different authors for different files, in which case you can use both `myst.yml` and the frontmatter in each page.

```{code} yaml
:filename: myst.yml
:linenos:
:emphasize-lines: 10, 11

# see docs at: https://mystmd.org/guide/frontmatter
version: 1
project:
  id: 4da9cb15-177c-41f5-8c4e-6a24b4e87eab
  title: an example jupyter book
  description: a collection of files that build up a book
  keywords:
    - jupyter-book
    - something-else
  authors:
    - name: captain jupyter
  github: captain-jupyter/my-book
  # to autogenerate a table of contents, run "jupyter book init --write-toc"
  toc:
    # auto-generated by `myst init --write-toc`
    - file: intro.md
site:
  template: book-theme
  # options:
  #   favicon: favicon.ico
  #   logo: site_logo.png
```

## Defining an export

Jupyter Book projects are usually made up of multiple different files. In order to produce a single PDF export, we need to inform Jupyter Book of the files that we want to include, and their relative order. Let's define a new `pdf` export in `myst.yml` that exports only `intro.md`:

```{code} yaml
:filename: myst.yml
:linenos:
:emphasize-lines: 17,18,19,20

# See docs at: https://mystmd.org/guide/frontmatter
version: 1
project:
  id: 4da9cb15-177c-41f5-8c4e-6a24b4e87eab
  title: An example Jupyter Book
  description: A collection of files that build up a book
  keywords:
    - jupyter-book
    - something-else
  authors:
    - name: Captain Jupyter
  github: captain-jupyter/my-book
  # To autogenerate a table of contents, run "jupyter book init --write-toc"
  toc:
    # Auto-generated by `myst init --write-toc`
    - file: intro.md
  exports:
    - format: pdf
      template: lapreprint-typst
      articles: intro.md
site:
  template: book-theme
  # options:
  #   favicon: favicon.ico
  #   logo: site_logo.png
```

## Building a PDF

Now that we have all of the necessary information required to build our PDF, we can instruct Jupyter Book to create it:

```{code} shell
:linenos:
:emphasize-lines: 11

$ jupyter book build --pdf

📬 Performing exports:
   myst.yml -> _build/exports/myst_typst/intro.pdf
📖 Built intro.md in 21 ms.
📚 Built 1 page for export (including 0 dependencies) from /tmp/tmp.jSyXwF5Y2d in 40 ms.
🔍 Querying template metadata from https://api.mystmd.org/templates/typst/myst/lapreprint-typst
🐕 Fetching template from https://github.com/myst-templates/lapreprint-typst/archive/refs/heads/main.zip
💾 Saved template to path _build/templates/typst/myst/lapreprint-typst
📑 Exported typst in 243 ms, copying to _build/temp/myst3bGwbc/intro.typ
🖨  Rendering typst pdf to _build/exports/myst_typst/intro.pdf
```

It can be seen that the path to the exported PDF has been printed to the console.
