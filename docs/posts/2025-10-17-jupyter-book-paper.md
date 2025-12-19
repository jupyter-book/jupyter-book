---
title: "A new paper on the design principles behind Jupyter Book 2 and the MyST Ecosystem"
date: 2025-10-17
license: CC-BY-4.0
authors:
  - Jupyter Book Team
---

We've published a new paper in the [SciPy Proceedings from 2025](https://proceedings.scipy.org/) It describes the design principles and architecture of Jupyter Book 2 and the MyST Document Engine. [Read the full paper here](xref:jb2-paper).

:::{embed} xref:jb2-paper#fig:overview
:::


:::{note} The SciPy Proceedings are built on MyST!
This means you can use cool MyST features like [content embedding](xref:guide#docs:embed)
:::


## Key principles

The [paper outlines five design principles](xref:jb2-paper) that guide Jupyter Book 2 and the MyST ecosystem:

- **[Simple to use, easy to extend](xref:jb2-paper#appendix-plugins)**: A rich plugin ecosystem lets you customize MyST's behavior without modifying core code.
- **[Canonical and machine-readable](xref:jb2-paper#fig:ast)**: Content is represented as a structured abstract syntax tree (AST) that can be easily parsed and transformed.
- **[Modular and composable](xref:jb2-paper#appendix-composable)**: Documents can be easily parsed, transformed, and remixed across projects.
- **[API-accessible and federated](xref:jb2-paper#appendix-myst-xref)**: MyST sites expose their content as structured data, enabling cross-project references and [content embedding](xref:guide#docs:embed).
- **[Computation is first-class](xref:jb2-paper#appendix-jlab-myst)**: Jupyter notebooks and computational outputs are treated as core content types, with built-in execution and caching.

## Join us

We're inviting the community to explore these ideas, try out Jupyter Book 2, and help shape the next generation of scientific publishing tools. Check out the paper to learn more about the technical details and design decisions.

**Links:**
- [Read the paper](xref:jb2-paper)
- [DOI: 10.25080/hwcj9957](https://doi.org/10.25080/hwcj9957)
- [Try Jupyter Book 2](https://next.jupyterbook.org/)
