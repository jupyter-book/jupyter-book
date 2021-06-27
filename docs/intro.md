# Books with Jupyter <img src="images/logo-square.svg" width=40 />

```{only} html
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.2561065.svg)](https://doi.org/10.5281/zenodo.2561065)
```

Jupyter Book is an open source project for building beautiful,
publication-quality books and documents from computational material.

Here are some of the features of Jupyter Book:


:::{panels}
:container: +full-width text-center
:column: col-md-4 px-2 py-2
:card:

**[Publication-quality content with Markdown](file-types:markdown)** ✍
^^^
You can write in either Jupyter Markdown, or an extended flavor of Markdown with [publishing features](content/myst).
This includes support for rich syntax such as [citations and cross-references](content/citations), [math and equations](content/math), and [figures](content/figures).

---
**[Write with many kinds of source files](file-types:index)** 📄
^^^
You can write your content in [Markdown files](file-types:markdown), in [Jupyter Notebooks](file-types:notebooks), [MyST Markdown Notebooks](file-types:myst-notebooks), [reStructuredText](file-types:rst), or [any Jupytext format](file-types:custom).

---
**[Execute, cache, and insert computational content](content/execute)** 🚀
^^^
Execute notebook cells, then [format and insert the latest outputs](content:code-outputs) into your book.
[Cache outputs to save time in re-building later](execute/cache).
Even [save notebook outputs and insert them into other pages](content:code-outputs:glue).

---
**[Add interactivity to content and outputs](interactive/launchbuttons)** ✨
^^^
[Toggle cell visibility](interactive/hiding), include [interactive outputs](interactive/interactive) from Jupyter, and [connect with online services](interactive/launchbuttons) like Binder.

---
**[Build books and articles in many formats](start/build)** 🎁
^^^
You can build multi-page books or single articles, and generate many kinds of outputs from them, such as [HTML websites](start/build) or [PDF outputs](advanced/pdf).

---
**[Build books with a simple command-line interface](reference/cli)** ⌨
^^^
You can quickly generate your books with one command, like so: `jupyter-book build mybook/`
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
:column: col-md-4 px-2 py-2
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

:::{image} https://pbs.twimg.com/profile_images/1226944724365447169/MzFpwY5P_400x400.png
:class: float-left mr-2 rounded
:width: 100px
:::

Many thanks to the Sloan Foundation, which [provides support for the Executable Books Project](https://sloan.org/grant-detail/9231).
