(file-types:markdown)=
# Markdown files

You can write content in regular Markdown files (e.g., files ending in `.md`).
Jupyter Book supports any Markdown syntax that is supported by Jupyter notebooks.
Jupyter Notebook Markdown is an extension of a flavour of Markdown called
[CommonMark Markdown](https://commonmark.org/).
It has many elements for standard text processing, though it lacks a lot of features used for
publishing and documentation.

```{note}
If you'd like a more in-depth overview and guide to CommonMark Markdown, see
[the CommonMark Markdown tutorial](https://commonmark.org/help/tutorial/).
```

This page describes some basic features of the Jupyter Notebook Markdown, and how to
include them with your book.

```{margin}
Jupyter Book also supports a fancier version of Markdown called **MyST Markdown**. This
is a slightly extended flavour of Jupyter Notebook Markdown. It
allows you to include citations and cross-references, and control more complex
functionality like adding content to the margin. For more
information, check out {doc}`../content/myst`.
```

## Embedding media

### Adding images

You can reference external media like images from your Markdown file. If you use
relative paths, then they will continue to work when the Markdown files are copied over,
so long as they point to a file that's inside of the repository.

Here's an image relative to the book content root

![C-3PO_droid](../images/C-3PO_droid.png)

It was generated with this code:

```md
![C-3PO_droid](../images/C-3PO_droid.png)
```

:::{seealso}
[](../content/figures.md) for more information.
:::

### Adding movies

You can even embed references to movies on the web! For example, here's a little GIF for you!

![giphy](https://media.giphy.com/media/yoJC2A59OCZHs1LXvW/giphy.gif)

This will be included in your book when it is built.

## Mathematics

For HTML outputs, Jupyter Book uses the excellent [MathJax](http://docs.mathjax.org/en/latest/) library,
along with the default Jupyter Notebook configuration, for rendering mathematics from LaTeX-style syntax.

For example, here's a mathematical expression rendered with MathJax:

$$
P(A_1 \cup A_2 \cup A_3)
& = P(B \cup A_3)  \\
& = P(B) + P(A_3) - P(BA_3) \\
&= P(A_1) + P(A_2) - P(A_1A_2) + P(A_3) - P(A_1A_3 \cup A_2A_3) \\
&= \sum_{i=1}^3 P(A_i) - \mathop{\sum \sum}_{1 \le i < j \le 3} P(A_iA_j) + P(A_1A_2A_3)
$$

:::{seealso}
[](../content/math.md) for more information.
:::

### Block-level mathematics

You can include block-level mathematics by wrapping your formulas in `$$` characters.
For example, the following block:

```md
$$
wow = its^{math}
$$
```

Results in this output:

$$
wow = its^{math}
$$

You can also include math blocks by using LaTeX-style syntax using `\begin{align*}`.
For example, the following block:

```latex
\begin{align*}
yep = its_{more}^{math}
\end{align*}
```

Results in:

\begin{align*}
yep = its_{more}^{math}
\end{align*}

:::{important}
This requires the [`amsmath` MyST extension to be enabled](math:latex).
:::

## Extended Markdown with MyST Markdown

In addition to CommonMark Markdown, Jupyter Book also supports a more fully-featured version of Markdown called **MyST Markdown**.
This is a superset of CommonMark that includes syntactic pieces that are useful for publishing computational narratives.
For more information about MyST Markdown, see [](../content/myst.md).
