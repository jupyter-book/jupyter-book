# Markdown files

You can write content in regular markdown files (e.g., files ending in `.md`).
Jupyter Book supports any markdown syntax that is supported by Jupyter Notebooks.
Jupyter Notebook markdown is a slight extension of a flavor of markdown called
[CommonMark Markdown](https://commonmark.org/). It has many elements
for standard text processing, though it lacks a lot of features used for
publishing and documentation.

```{note}
If you'd like a more in-depth overview and guide to CommonMark markdown, see
[the CommonMark markdown tutorial](https://commonmark.org/help/tutorial/).
```

This page describes some basic features of Jupyter Notebook markdown, and how to
include them with your book.

```{margin}
Jupyter Book also supports a fancier version of markdown called **MyST Markdown**. This
is a slightly extended flavor of Jupyter Notebook markdown. It
allows you to include citations and cross-references, and control more complex
functionality like adding content to the margin. For more
information, check out {doc}`../content/myst`.
```

## Embedding media

### Adding images

You can reference external media like images from your markdown file. If you use
relative paths, then they will continue to work when the markdown files are copied over,
so long as they point to a file that's inside of the repository.

Here's an image relative to the book content root

![](../images/C-3PO_droid.png)

It was generated with this code:

```
![](../images/C-3PO_droid.png)
```

### Adding movies

You can even embed references to movies on the web! For example, here's a little gif for you!

![](https://media.giphy.com/media/yoJC2A59OCZHs1LXvW/giphy.gif)

This will be included in your book when it is built.



## Mathematics

Jupyter Book uses the excellent [MathJax](http://docs.mathjax.org/en/latest/) library,
along with the default Jupyter Notebook configuration, for rendering mathematics from
latex-style syntax.

For example, here's a mathematical expression rendered with MathJax:

$$
\begin{align}
    P(A_1 \cup A_2 \cup A_3)
    & = P(B \cup A_3)  \\
    & = P(B) + P(A_3) - P(BA_3) \\
    &= P(A_1) + P(A_2) - P(A_1A_2) + P(A_3) - P(A_1A_3 \cup A_2A_3) \\
    &= \sum_{i=1}^3 P(A_i) - \mathop{\sum \sum}_{1 \le i < j \le 3} P(A_iA_j) + P(A_1A_2A_3)
\end{align}
$$

### Block-level math

You can include block-level math by wrapping your math in `$$` characters.
For example, the following block:

```
$$
wow = its^{math}
$$
```

Results in this output:

$$
wow = its^{math}
$$

You can also include math blocks by using latex-style syntax using
`\begin{align*}`. For example, the following block:

```
\begin{align*}
yep = its_more^math
\end{align*}
```

Results in:

\begin{align*}
yep = its_more^math
\end{align*}

For more information about math with Jupyter Book, see {doc}`../content/math`.

## Extended markdown with MyST Markdown

In addition to CommonMark markdown, Jupyter Book also supports a more
fully-featured version of markdown called **MyST Markdown**. This is a slight
addition to CommonMark that includes syntactic pieces that are useful for
publishing computational narratives. For more information about MyST
Markdown, see {doc}`../content/myst`.
