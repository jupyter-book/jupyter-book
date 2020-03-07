# Markdown

Jupyter Book supports a common flavor of markdown called
[CommonMark Markdown](https://commonmark.org/). This is the flavor of markdown
that Jupyter (and many other online platforms) use. It has many elements
for standard text processing, though it lacks a lot of features used for
publishing and documentation. If you need these extra features in Jupyter
Book, see {doc}`myst`.

You can write markdown in either markdown files, or in Jupyter Notebooks.
Jupyter Book will know how to parse both of them. This page describes some
basic features of CommonMark markdown, and how they fit in to Jupyter Book.

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
P(A_1 \cup A_2 \cup A_3) ~ = ~ P(B \cup A_3) &= ~ P(B) + P(A_3) - P(BA_3) \\
&= ~ P(A_1) + P(A_2) - P(A_1A_2) + P(A_3) - P(A_1A_3 \cup A_2A_3)\\
&= ~ \sum_{i=1}^3 P(A_i) - \mathop{\sum \sum}_{1 \le i < j \le 3} P(A_iA_j) + P(A_1A_2A_3)
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

For more information about math with Jupyter Book, see {doc}`math`.


## Downloading and Printing pages

✨**experimental**✨

While interactivity is nice, sometimes you need a static version of your book
that's suitable for printing. Currently, Jupyter Book uses a tool called
[PrintJS](https://printjs.crabbly.com) to create rendered PDF versions of your
book's content.

In the top of each page you'll find a "download" button. Hovering over this button
gives the reader an option to print to PDF. When clicked, PrintJS will convert
*only the book's content* (so no sidebar or in-page navigation) to PDF, and trigger
a print action. Note that results for this vary between devices or browsers, and
PRs that improve this functionality are welcome!

```{note}
If you print your page (using the print button), then mathematics may not show
up properly in an output PDF. This is because MathJax isn't able to render the math
before converting to PDF. If you have a good idea for how to get around this, please do
[open an issue](https://github.com/jupyter/jupyter-book/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)!
```

## Writing markdown with more features

In addition to CommonMark markdown, Jupyter Book also supports a more
fully-featured version of markdown called **MyST Markdown**. This is a slight
addition to CommonMark that includes syntactic pieces that are useful for
publishing computational narratives. For more information about MyST
Markdown, see {doc}`myst`.
