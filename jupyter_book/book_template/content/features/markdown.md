---
jupyter:
  jupytext:
    formats: md
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.1'
      jupytext_version: 1.2.1
  kernelspec:
    display_name: Python 3
    language: python
    name: python3
---

# Creating book content

The two kinds of files that contain course content are:

* Jupyter Notebooks
* Markdown files

Each are contained in the `content/` folder and referenced from `_data/toc.yml`.

If the file is markdown, it will be copied over with front-matter YAML added so
that Jekyll can parse it.

<!-- #region -->
```python
print("Python (and any language-specific) code still works as expected")
```

```
As does non-language code.
```
<!-- #endregion -->

## Page navigation Table of Contents

You may notice that there's a sidebar to the right (if your screen is wide enough).
These are automatically generated from the headers that are present in your page.
The sidebar will automatically capture all 2nd and 3rd level section headers.
The best way to designate these headers is with `#` characters at the beginning
of a line.

### Here's a third-level header

This section is here purely to demonstrate the third-level header of the
rendered page in the sidebar!

## Mathematics

Jupyter Book uses the excellent [MathJax](http://docs.mathjax.org/en/latest/) library,
along with the default Jupyter Notebook configuration, for rendering mathematics from
latex-style syntax. For example, here's a mathematical expression rendered with MathJax:

\begin{align*}
P(A_1 \cup A_2 \cup A_3) ~ = ~ P(B \cup A_3) &= ~ P(B) + P(A_3) - P(BA_3) \\
&= ~ P(A_1) + P(A_2) - P(A_1A_2) + P(A_3) - P(A_1A_3 \cup A_2A_3)\\
&= ~ \sum_{i=1}^3 P(A_i) - \mathop{\sum \sum}_{1 \le i < j \le 3} P(A_iA_j) + P(A_1A_2A_3)
\end{align*}

And here is the code that was used to generate it:

<!-- #region -->
```python
\begin{align*}
P(A_1 \cup A_2 \cup A_3) ~ = ~ P(B \cup A_3) &= ~ P(B) + P(A_3) - P(BA_3) \\
&= ~ P(A_1) + P(A_2) - P(A_1A_2) + P(A_3) - P(A_1A_3 \cup A_2A_3)\\
&= ~ \sum_{i=1}^3 P(A_i) - \mathop{\sum \sum}_{1 \le i < j \le 3} P(A_iA_j) + P(A_1A_2A_3)
\end{align*}
```
<!-- #endregion -->

<!-- #region {"tags": ["popout"]} -->
**Note**: If you print your page (using the print button), then mathematics may not show
up properly in an output PDF. This is because MathJax isn't able to render the math
before converting to PDF. If you have a good idea for how to get around this, please do
[open an issue](https://github.com/jupyter/jupyter-book/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)!
<!-- #endregion -->

## Embedding media

### Adding images

You can reference external media like images from your markdown file. If you use
relative paths, then they will continue to work when the markdown files are copied over,
so long as they point to a file that's inside of the repository.

Here's an image relative to the book content root

![](../images/C-3PO_droid.png)

### Adding movies

You can even embed references to movies on the web! For example, here's a little gif for you!

![](https://media.giphy.com/media/yoJC2A59OCZHs1LXvW/giphy.gif)

This will be included in your book when it is built.

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
