---
title: Referencing other books
short_title: Reference books
subtitle: Use rich cross-references to connect with other published books.
subject: Quickstart tutorial
---

:::{important} Objective
The goal of this tutorial is to introduce the concept of cross-references, and explore their uses in creating richer reading and sharing experiences.
:::

At the heart of Jupyter Book, and the MyST engine that powers it, is the concept of {term}`structured data`. Every Jupyter Book (MyST) website publishes its structured data publically, making it possible for entire communities to publish and share knowledge and resources in a highly connected fashion. For example, here is a rich cross-reference to the <https://mystmd.org> guide: <xref:guide#myst-xref>. By hovering over the previous link with your mouse cursor, you can see a rich-preview of the link's contents, powered by _structured data_.

## Declaring external websites

In order to create a rich cross-reference to an external resource, you must first inform Jupyter Book of where to find it by adding entries to the `project.references` mapping. The entries in `project.references` can be Jupyter Book 2 (MyST-MD) websites, or Jupyter Book 1 (Sphinx) websites. Only MyST-MD references support the rich features like hover-previews.

For example, we could link to the main <https://mystmd.org/guide> website:

```{code} yaml
:filename: myst.yml
:linenos:
:emphasize-lines: 17,18

# See docs at: https://mystmd.org/guide/frontmatter
version: 1
project:
  # title:
  # description:
  # keywords: []
  # authors: []
  # github:
  authors:
    - The Jupyter Book Team
  toc:
    - file: intro.md
  exports:
    - format: pdf
      template: lapreprint-typst
      articles: intro.md
  references:
    guide: https://mystmd.org/guide

site:
  template: book-theme
  # options:
  #   favicon: favicon.ico
  #   logo: site_logo.png
```

During your build, the Jupyter Book CLI will report that it has read these remote references, e.g.

```
$ myst start
🏫 Read 767 myst references for "guide" in 1.38 ms (cached).
...
```

:::{tip}
An easy way to tell if a website supports rich cross-referencing is to try and access the `/myst.xref.json` file that the MyST engine uses to provide cross-referencing information, e.g. <https://mystmd.org/guide/myst.xref.json>.
:::

## Hover previews of cross-references

Now that Jupyter Book is aware of the name `guide`, we can link to its content using a special `xref` link:

::::{tab-set}
:::{tab-item} Result
Hover over [this link to a cool figure](xref:guide#subfigure)!
:::

:::{tab-item} Code

```{code} markdown
Hover over [this link to a cool figure](xref:guide#subfigure)!
```

:::
::::

Cross-references provide richer reading experiences than simple Markdown links. They take advantage of the structured data that MyST-powered websites publish, e.g. the [cross-reference data for mystmd.org](https://mystmd.org/guide/myst.xref.json). The `xref` link syntax shown above is one-way to build a connection to another resource.

The `xref` link format is comprised of several important parts. E.g. for the xref [{xref:scheme}`xref:`{xref:resource}`guide`{xref:path}`/figures`{xref:identifier}`#subfigure`](xref:guide/figures#subfigure), each part has the following meaning:

{xref:scheme}`xref:`
: `xref` scheme

{xref:resource}`guide`
: name of entry in `project.references`

{xref:path}`/figures`
: path to the resource

{xref:identifier}`#subfigure`
: fragment containing the identifier

Any content that has been explicitly labeled can found by omitting the {xref:path}`/path`, e.g. [{xref:scheme}`xref:`{xref:resource}`guide`{xref:identifier}`#subfigure`](xref:guide#subfigure).

## Embedding cross-referenced content

It is also possible to _embed_ another resource, removing the need for the user to hover over a link. This can be done using the [`embed` directive](xref:guide#directive-embed), or the markup for a Markdown image:

::::{tab-set}
:::{tab-item} Result
![A cool figure with two subfigures](xref:guide#subfigure)
:::

:::{tab-item} Code

```{code} markdown
![A cool figure with two subfigures](xref:guide#subfigure)
```

:::
::::
