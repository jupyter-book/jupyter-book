---
title: The Jupyter Book and MyST ecosystem
short_title: "Jupyter Book & MyST ecosystem"
subtitle: An overview of the tools that power Jupyter Book 2.
---

Jupyter Book 2 is built upon the [MyST Markdown Document Engine](https://mystmd.org) (or `mystmd` for shorthand). `mystmd` is a next-generation document engine that is data-driven, computation-centric, and flexible. The `mystmd` project is also built by the [Jupyter Book team](https://compass.jupyterbook.org/team), and the two are evolving hand-in-hand.

## Where can I learn more about the MyST Document Engine?

The MyST Document Engine and Markdown syntax is also developed by the [Jupyter Book community](../community.md). Learn more at the [MyST Document Engine documentation](https://mystmd.org). Read the paper at [](#scipy-paper).

## What's different between Jupyter Book and the MyST Document Engine?

In short: not much. Here are the two biggest differences:

1. **Jupyter Book is opinionated about multi-document and book-based workflows**. For example, community knowledge bases, data science books, and documentation. `mystmd` is much more flexible - it includes components that can be re-used in many kinds of applications, and targets single-document workflows for things like articles as well.
2. **Jupyter Book is a lightweight re-skin and default configuration for `mystmd`**. As such, Jupyter Book is mostly a default set of options for `mystmd`, and a command line interface that builds upon `jupyter-book` 1.0 for user familiarity.

**You can just use `mystmd` if you prefer!** For the time being, Jupyter Book is "just a configuration of `mystmd`. The CLIs are identical (except for re-naming and a few upgrade pathways from Jupyter Book 1) and the functionality is the same between the two.
Over time, they may diverge as Jupyter Book leans into multi-document workflows and the MyST Document Engine remains workflow-agnostic, but we'll let you know if that is the case. 

## A comparison with Jupyter Book 1 and Sphinx

The Jupyter Book 1 stack was built on top of [the Sphinx Document Engine](https://sphinx-doc.org). Jupyter Book 1 included a number of custom Sphinx extensions to enable functionality like Markdown parsing, Jupyter Notebooks, cacheing, etc. As the [MyST Document Engine](https://mystmd.org) was built with workflows like Jupyter Book in mind from day one, it incorporates much of this functionality into the core MyST Document Engine. This means the gap between "default MyST Document Engine" and "default Jupyter Book" is narrower.

Below is a small diagram to show off the high-level differences in technical components within each stack. As you'll see, the Jupyter Book 2 / MyST Document Engine stack is simpler, and requires fewer independent components.

% To modify this diagram, upload the SVG below to ExcaliDraw and make edits
% then paste over the SVG content in the text file.
```{figure} ../media/images/jb1-jb2-comparison.svg
```
