---
site:
  hide_title_block: true
  hide_outline: true
---

# Blog

% This is a hack because hiding the title block removes the margin and title
% Whereas we just want to remove the button links etc.
<div style="margin-top: 1em;">

## Welcome to the Jupyter Book blog! 👋

</div>

This is a place for [the Jupyter Book team](https://compass.jupyterbook.org) to share updates from the community and the project.[^ebp]

[^ebp]: See the [Executable Books blog](https://executablebooks.org/en/latest/blog/) for blog posts from when Jupyter Book was a part of the Executable Books project. See this [post about moving to Jupyter](posts/2024-11-11-jupyter-book-org.md) for context on the move from Executable Books to Jupyter.

## Recent blog posts

:::{blog-posts}
:kind: table
:path: posts/*.md
:limit: 20
:::
