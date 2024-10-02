---
title: Referencing Other Books
short_title: Reference Books
subtitle: Use rich cross-references to connect with other published books.
subject: Quickstart Tutorial
---

:::{important} Objective
The goal of this tutorial is to introduce the concept of cross-references, and explore their uses in creating richer reading and sharing experiences.
:::

At the heart of Jupyter Book, and the MyST engine that powers it, is the concept of {term}`structured data`. Every Jupyter Book (MyST) website publishes its structured data publically, making it possible for entire communities to publish and share knowledge and resources in a highly connected fashion. For example, here is a rich cross-reference to the <https://mystmd.org> guide: <xref:guide#myst-xref>. By hovering over the previous link with your mouse cursor, you can see a rich-preview of the link's contents, powered by _structured data_.

## Declaring External Websites

In order to create a rich cross-reference to an external resource, you must first inform Jupyter Book of where to find it. For example, we could link to the main <https://mystmd.org/guide> website:

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

## Hover Previews and Embedded Content

Cross-references provide richer reading experiences than simple Markdown links. They take advantage of the structured data that MyST-powered websites publish, e.g. the [cross-reference data for mystmd.org](https://mystmd.org/guide/myst.xref.json). The `xref` link syntax shown above is one-way to build a connection to another resource. It is also possible to _embed_ another resource, removing the need for the user to hover over a link:

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
