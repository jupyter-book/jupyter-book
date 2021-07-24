# Books with Jupyter <img src="images/logo-square.svg" width=40 />

```{only} html
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.2561065.svg)](https://doi.org/10.5281/zenodo.2561065)
[![Jupyter Book Badge](images/badge.svg)](https://jupyterbook.org)
```

Jupyter Book is an open source project for building beautiful,
publication-quality books and documents from computational material.

Here are some of the features of Jupyter Book:


:::{panels}
:container: +full-width text-center
:column: col-lg-6 px-2 py-2
:card:

**[Publication-quality content](file-types:markdown)** ✍
^^^
Write in either Jupyter Markdown, MyST Markdown for more [publishing features](content/myst), [reStructuredText](file-types:rst), [Jupyter Notebooks](file-types:notebooks), or [any Jupytext format](file-types:custom).
Includes support for rich syntax such as [citations and cross-references](content/citations), [math and equations](content/math), and [figures](content/figures).

---
**[Execute, cache, and insert computational content](content/execute)** 🚀
^^^
Execute notebook cells, then [format and insert the latest outputs](content:code-outputs) into your book.
[Cache outputs to save time in re-building later](execute/cache).
Even [save notebook outputs and insert them into other pages](content:code-outputs:glue).

---
**[Add interactivity to content and outputs](interactive/launchbuttons)** ✨
^^^
Create interactive content blocks such as [](content:tabs), [](content:dropdowns). [Toggle cell visibility](interactive/hiding) and include [interactive cell outputs](interactive/interactive) with Jupyter notebooks. [Launch interactive sessions](interactive/launchbuttons) with Binder or Colab, [make your code executable with Thebe](launch:thebe), or [connect with commenting services like Hypothes.is](interactive:comments).

---
**[Build books and articles in many formats](start/build)** 🎁
^^^
Build [multi-page books](structure:book) or [single articles](structure:article), and generate many kinds of outputs from them, such as [HTML websites](start/build) or [PDF outputs](advanced/pdf). Jupyter Book uses [the Sphinx Documentation engine](https://sphinx-doc.org) which supports [a variety of output types](https://www.sphinx-doc.org/en/master/usage/builders/index.html).

:::

This documentation is organized into a few major sections.

- **Tutorials** are step-by-step introductory guides to Jupyter Book.
- **Topic Guides** cover specific areas in more depth, and are organized as discrete "how-to" sections.
- **Reference** sections describe the API/syntax/etc of Jupyter Book in detail.

This website is built with Jupyter Book!
Explore the chapters to the left to learn more!

:::{admonition} Learn more and get involved
:class: tip full-width

💡 [Open an issue](https://github.com/executablebooks/jupyter-book/issues/new/choose)
: We track enhancement requests, bug-reports, and to-do items via GitHub issues.

💬 [Join the discussion](https://github.com/executablebooks/meta/discussions)
: We have community discussions, talk about ideas, and share general questions and feedback in our [community forum](https://github.com/executablebooks/meta/discussions).

👍 [Vote for new features](ebp:feature-note)
: The community provides feedback by adding a 👍 reaction to issues in our repositories.
  You can find a list of the top issues [in the Executable Books issue leader board](ebp:feature-note).

🙌 [Join the community](contribute/intro.md)
: Jupyter Book is developed by the [Executable Books community](https://executablebooks.org).
  We welcome anyone to join us in improving Jupyter Book and helping one another learn and create their books.
  To join, check out our [contributing guide](contribute/intro.md).
:::


## Find the right documentation resources

Here are a few pointers to help you get started.

:::{panels}
:container: +full-width
:column: col-lg-4 px-2 py-2
---
:header: bg-jb-one
**Get started**
^^^

**[](start/your-first-book.md)**: a step-by-step tutorial to get started.

**[](create-a-template-book)**: get started with a simple template book.

---
:header: bg-jb-two

**Learn more**
^^^
**[](structure:index)**: Learn how to structure and organize your content.

**[](content/index.md)**: Learn how to write rich narrative content.

**[](content/executable/index.md)**: Write computational content.
---
:header: bg-jb-three

**Be inspired**
^^^
[**The Jupyter Book Gallery**](http://gallery.jupyterbook.org): A gallery of community books that have been created with Jupyter Book.

[**The QuantEcon Python Lectures**](https://python.quantecon.org/intro.html): A full mathematical textbook built with a customer Jupyter Book theme.
:::

## Acknowledgements

Jupyter Book is supported by an [open community of contributors](https://github.com/executablebooks/jupyter-book/graphs/contributors), many of whom come from [the Executable Books Community](https://executablebooks.org) and [the Jupyter community](https://jupyter.org/community).

:::{image} https://sloan.org/storage/app/media/uploaded-files/Logo-1B-SMALL-Gold-Blue.png
:class: float-left mr-2 rounded
:width: 150px
:::

Many thanks to the Sloan Foundation, which [provides support for the Executable Books Project](https://sloan.org/grant-detail/9231).
