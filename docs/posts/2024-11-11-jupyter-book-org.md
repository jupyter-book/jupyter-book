---
title: Jupyter Book Becomes a Jupyter Subproject
subtitle: Jupyter Book joins the ranks of other Jupyter Subprojects such as JupyterLab and JupyterHub.
date: "2024-11-11"
license: CC-BY-4.0
authors:
  - agoose77
  - choldgraf
---

Over the last ten months, the Jupyter Book team have been hard at work building the next major version of Jupyter Book (see the [blog post about using the MyST engine][plan]).
During this time, we identified a strong distinction between the tools developed for the legacy Sphinx application and the new [MyST Engine][mystmd]-powered version.

We decided that it's best if these two projects are developed independently due to their significantly different technical stacks and visions.
This was recently confirmed with a [Jupyter Enhancement Proposal to incorporate Jupyter Book][book-jep] as a Jupyter Subproject.

Under the Jupyter organisation, the Jupyter Book team has found

> a longer-lasting and organizationally-neutral home for the vision, strategy, tools, and standards of this modern version of the Jupyter Book toolchain.
>
> -- [Jupyter Enhancement Proposal #122](https://github.com/jupyter/enhancement-proposals/pull/123)

To facilitate creating a new Jupyter Subproject, we've created a [new `jupyter-book` GitHub Organisation][jbp]. This new organisation is distinct from the [Executable Books organisation][ebp] that served as the home for previous releases of Jupyter Book.
[`github.com/jupyter-book`](https://github.com/jupyter-book) will act as the hub for all future development and discussion surrounding Jupyter Book development.[^1]

[^1]: And [`github.com/executablebooks`](https://github.com/executablebooks) will continue to serve as the home of the Sphinx-based stack, and will be developed independently.

For more news about Jupyter Book, such as the upcoming Jupyter Book 2 alpha release, please keep an eye on this blog!

[jbp]: https://github.com/jupyter-book
[ebp]: https://github.com/executablebooks
[plan]: https://executablebooks.org/en/latest/blog/2024-05-20-jupyter-book-myst/
[book-jep]: https://github.com/jupyter/enhancement-proposals/pull/123
[mystmd]: https://mystmd.org
