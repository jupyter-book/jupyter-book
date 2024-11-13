---
title: History of the Jupyter Book project
subtitle: A brief history of the Jupyter Book project, and the journey it took along the way.
# subject: myst Quickstart tutorial
short_title: History of Jupyter Book
---

:::{mermaid}
gantt
    dateFormat YYYY-MM
    title The history of Jupyter Book

    Jupyter Book 0.1 - 0.7 (Jekyll)               : des2, 2018-06, 2020-07
    Jupyter Book 0.7 - 1.x (Sphinx)               : des2, 2020-07, 2024-07
    Jupyter Book 1.0                              : milestone, 2024-02, 1d
    Jupyter Book 2.x (MyST-MD)                    :active, des2, 2024-07, 2024-07

:::

## A first attempt using Jekyll

The Jupyter Book project was started with [the first commit](https://github.com/jupyter-book/jupyter-book/commit/4fc6636c652cebea71556f634c9a37e0740ab26f) in June of 2018. Initially, work was focussed on building a series of scripts to compile Jupyter Notebooks into a textbook using [Jekyll](https://jekyllrb.com/).

## Creation of the `jupyter book` application

In 2020, the "new" Jupyter Book (0.7) [was announced](https://executablebooks.org/en/latest/blog/2020-08-07-announce-book/) which re-built Jupyter Book from the ground up to make it

> easier to install, faster to use, and able to create more complex publishing content in your books.
>
> -- Executable Books

This work was supported by the Executable Books project, an open community building open-source tools [powered by a grant from the Sloan foundation](https://executablebooks.org/en/latest/blog/2020-02-25-hello-world/#hello-world).

The 0.7 re-write established the Jupyter Book application on top the Sphinx documentation engine, which was at the time used primarily for documentation of Python projects. With this move to Sphinx, a new Markdown dialect _MyST Markdown_ (Markedly Structured Text Markdown) was created to combine the expressiveness of Sphinx's Restructured Text with the familiarity and readability of Markdown.

In addition to using a new documentation engine, Jupyter Book 0.7 saw the introduction of Thebe which brought interactivity and widgets to published books using the power of [Binder](https://mybinder.org).

In 2023, a broad effort to recognize the stability of the Jupyter Book software stack was made through a series of 1.0 releases. This saw updates to core Jupyter Book packages such as `myst-nb` and `sphinx-book-theme` to support Sphinx 7 and Python 3.11+, and marked the "maintenance phase" of the Jupyter Book tools.

## Jupyter Book is rebuilt on top of MyST-MD

As outlined above, Jupyter Book has a long history. Over its lifetime, it has become a well-established tool for authoring and publishing in the Jupyter ecosystem with [over 13,000 GitHub repositories now using the tool](https://executablebooks.org/en/latest/blog/2024-05-20-jupyter-book-myst/). During that time, the Executable Books team have learned a great deal about the ways in which our communities use Jupyter Book, witnessed first-hand the pain-points in building a book publishing tool on top of Sphinx, and [explored new ways in which the Jupyter Book tools can be used](https://executablebooks.org/en/latest/blog/2023-02-09-announce-mystjs/#myst-is-now-a-top-level-project-in-executable-books). Following these learnings, and the success of the MyST-MD project that was launched in 2022, it became clear that the future of Jupyter Book lay in a new direction.

Jupyter Book 2 is built on top of the [MyST-MD engine](https://mystmd.org/), which uses the latest web frameworks and JavaScript libraries to produce beautiful documents and websites that provide rich reading experiences on top of powerful structured representations.
