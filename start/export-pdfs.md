---
title: Export PDFs
subtitle: Create beautifully typeset PDFs from your MyST project.
subject: Quickstart Tutorial
---

:::{important} Objective
The goal of this tutorial is to explore the ways in which the MyST-MD engine can be used to create beautiful, well-typeset PDF documents.
:::

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
