# MyST Markdown

Jupyter Book uses a special flavor of markdown called **MyST (or
Markedly Structured Text)**. It was designed to make it easier to create
publishable computational documents in Markdown. It is a superset of
[CommonMark markdown](https://commonmark.org/) and draws heavy inspiration
from the fantastic [RMarkdown language from RStudio](https://rmarkdown.rstudio.com/).

You can write MyST markdown in either markdown files, or in Jupyter Notebooks.
Jupyter Book will know how to parse both of them.

This page contains a few pieces of information about MyST markdown and how it
relates to Jupyter Book. You can
find much more information about this flavor of markdown at
[The Myst Parser documentation][myst-parser].

## Roles and Directives

Roles and directives are two of the most powerful tools in Jupyter Book. They
are kind of like *functions*, but written in a markup language. They both
serve a similar purpose, but **roles are written in one line**, whereas
**directives span many lines**. They both accept different kinds of inputs,
and what they do with those inputs depends on the specific role or directive
that is being called.

Whether you write your book's content in Jupyter Notebooks (`.ipynb`) or
in regular markdown files (`.md`), you'll write in the same flavor of
**MyST Markdown**.

### Using a directive

At its simplest, you can insert a directive into your book's content like so:

````
```{mydirectivename}
My directive content
```
````

This will only work if a directive with name `mydirectivename` already exists
(which it doesn't). There are many pre-defined directives associated with
Jupyter Book. For example, to insert a note box into your content, you can
use the following directive:

````
```{note}
Here is a note
```
````

This results in:

```{note}
Here is a note
```

In your built book.

For more information on writing directives, see the
[MyST documentation](https://myst-parser.readthedocs.io/).


### Using a role

Roles are very similar to directives, but they are less-complex and written
entirely on one line. You can insert a role into your book's content with
this pattern:

```
Some content {rolename}`and here is my role's content!`
```

Again, roles will only work if `rolename` is a valid role's name. For example,
the `doc` role can be used to refer to another page in your book. You can
refer directly to another page by its relative path. For example, the
role syntax `` {doc}`../intro` `` will result in: {doc}`../intro`.

For more information on writing roles, see the
[MyST documentation](https://myst-parser.readthedocs.io/).


### An example: adding a citation

A common use of both roles and directives is to add citations to your book.
You can cite references that are stored in a `bibtex` file that is in your
book's folder. For example, let's say you have a file called
`references.bib` with the following entry:

```
@InProceedings{ project_jupyter-proc-scipy-2018,
  author    = { {P}roject {J}upyter and {M}atthias {B}ussonnier and {J}essica {F}orde and {J}eremy {F}reeman and {B}rian {G}ranger and {T}im {H}ead and {C}hris {H}oldgraf and {K}yle {K}elley and {G}ladys {N}alvarte and {A}ndrew {O}sheroff and {M} {P}acer and {Y}uvi {P}anda and {F}ernando {P}erez and {B}enjamin {R}agan-{K}elley and {C}arol {W}illing },
  title     = { {B}inder 2.0 - {R}eproducible, interactive, sharable environments for science at scale },
  booktitle = { {P}roceedings of the 17th {P}ython in {S}cience {C}onference },
  pages     = { 113 - 120 },
  year      = { 2018 },
  editor    = { {F}atih {A}kici and {D}avid {L}ippa and {D}illon {N}iederhut and {M} {P}acer },
  doi       = { 10.25080/Majora-4af1f417-011 }
}
```

You can add a citation in-line in your markdown with the **{cite}** role.
The following syntax: `` {cite}`project_jupyter-proc-scipy-2018` `` will render like
this: {cite}`project_jupyter-proc-scipy-2018`.

Once you've added citations to your page, you can add a bibliography by
calling the **bibliography directive**. To do so, use this syntax:

````
```{bibliography} references.bib
```
````

And in your built book, it will look like this:

```{bibliography} mdrefs.bib
```

For more information about adding citations, see {doc}`citations`. For more
information about the MyST markdown language, see
[The MyST Parser documentation][myst-parser].


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

````
```python
\begin{align*}
P(A_1 \cup A_2 \cup A_3) ~ = ~ P(B \cup A_3) &= ~ P(B) + P(A_3) - P(BA_3) \\
&= ~ P(A_1) + P(A_2) - P(A_1A_2) + P(A_3) - P(A_1A_3 \cup A_2A_3)\\
&= ~ \sum_{i=1}^3 P(A_i) - \mathop{\sum \sum}_{1 \le i < j \le 3} P(A_iA_j) + P(A_1A_2A_3)
\end{align*}
```
````

For more information about math with Jupyter Book, see {doc}`math`.


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

```{note}
If you print your page (using the print button), then mathematics may not show
up properly in an output PDF. This is because MathJax isn't able to render the math
before converting to PDF. If you have a good idea for how to get around this, please do
[open an issue](https://github.com/jupyter/jupyter-book/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc)!
```


[myst-parser]: https://myst-parser.readthedocs.io/en/latest/