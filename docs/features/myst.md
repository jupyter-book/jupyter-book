# Extended markdown with MyST Markdown

In addition to {doc}`Jupyter Notebook markdown <notebooks>`, Jupyter Book also supports
a special flavor of markdown called **MyST (or
Markedly Structured Text)**. It was designed to make it easier to create
publishable computational documents in Markdown. It is a superset of
[CommonMark markdown](https://commonmark.org/) and draws heavy inspiration
from the fantastic [RMarkdown language from RStudio](https://rmarkdown.rstudio.com/).

```{sidebar} MyST and Sphinx
For those who are familiar with Sphinx, MyST markdown is basically CommonMark + Sphinx roles and directives
```

You can write MyST markdown in either markdown files, or in Jupyter Notebooks.
Jupyter Book will know how to parse both of them.

This page contains a few pieces of information about MyST markdown and how it
relates to Jupyter Book. You can
find much more information about this flavor of markdown at
[The Myst Parser documentation][myst-parser].


```{note}
Roles and directives are two of the most powerful tools in Jupyter Book. They
are kind of like *functions*, but written in a markup language. They both
serve a similar purpose, but **roles are written in one line**, whereas
**directives span many lines**. They both accept different kinds of inputs,
and what they do with those inputs depends on the specific role or directive
that is being called.
```

Whether you write your book's content in Jupyter Notebooks (`.ipynb`) or
in regular markdown files (`.md`), you'll write in the same flavor of
**MyST Markdown**.

## Directives

Directives customize the look, feel, and behavior of your book. They are
kind of like *functions*, and come in a variety of names
with different behavior. This section covers how to structure and use them.

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

### More arguments and metadata in directives

Many directives allow you to control their behavior with extra pieces of
information. In addition to the directive name and the directive content,
directives allow two other configuration points:

* **directive arguments** - are a list of words that come just after the
  `{directivename}` is given.
* **directive metadata** - is a collection of flags or key/value pairs
  that come just underneath `{directivename}`. This has two forms: either
  YAML metadata, or `:key: val` pairs.

Here's what directives with all of their configuration points look like:

````
```{directivename} directive arguments
---
metadata1: metadata2
metadata3: metadata4
---
My directive content.
```
````

or:

````
```{directivename} directive arguments
:key1: metadata1
:key2: metadata2
```
My directive content.
````

For examples of how this is used, see the sections below.

## Roles

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

(labels-and-refs)=
## Labels and cross-references

Labels are a way to add tags to parts of your content that you can reference
later on. This is helpful if you want to quickly insert links to other
parts of your book. Labels can be added before major elements of a page,
such as titles or figures.

To add a label, use the following pattern **before** the element you wish
to label:

```
(my-label)=
# The thing to label
```

For example, we've added the following label above the header for this section:

```
(labels-and-refs)=
## Labels and cross-references
```

You can insert cross-references to labels in your content with the following
syntax: `` {ref}`label-text` ``. For example, the following syntax:
`` {ref}`labels-and-refs` `` results in a link to this section like so:
{ref}`labels-and-refs`.


## Citations

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

## Figures

MyST Markdown also lets you include **figures** in your page. Figures are
like images, except that they are easier to reference elsewhere in your
book, and they include things like captions. To include a figure, use this
pattern:

````
```{figure} ../images/C-3PO_droid.png
---
height: 150px
name: my_figure
---
Here is my figure caption!
```
````

```{figure} ../images/C-3PO_droid.png
---
height: 150px
name: my_figure
---
Here is my figure caption!
```

You can then refer to this figure using the `{ref}` role like: 
`` {ref}`my-figure` ``, which will replace the reference with the figure
caption like so: {ref}`my_figure`.
Another convenient way to create cross-references is with the `{numref}` role,
which automatically numbers the labelled objects.
For example, `` {numref}`my_figure` `` will produce a reference like:
{numref}`my_figure`.

## Special blocks of markdown

Another common use of directives is to designate "special blocks" of your
content. This section covers a few common ones.

### Notes and warnings

Let's say you wish to highlight a particular block of
text that exists slightly apart from the narrative of your page. You can
use the **`{note}`** directive for this.

For example, the following text:

````
```{note}
Here is a note!
```
````

Results in the following output:

```{note}
Here is a note!
```

Another common directive that result in similar output is **`{warning}`**.

Finally, you can choose the title of your message box by using the
**`{admonition}`** directive. For example, the following text:

````
```{admonition} Here's your admonition
Here's the admonition content
```
````

Results in the following output:

```{admonition} Here's your admonition
Here's the admonition content
```

### Sidebar content

You can also specify content that should exist in the sidebar. This content
will be placed to the right, allowing it to exist separately from your main
content. To add sidebar content, use this syntax:

````
```{sidebar}
**Here is my sidebar content**, it is pretty cool!
```
````

```{sidebar} **Here is my sidebar content**
It is pretty cool!
```

### Hide your markdown with toggle buttons

Sometimes you'd like to initially hide content, and give readers the option
of clicking in order to read. You can activate this behavior in markdown with the `{toggle}`
directive like so:

````
```{toggle}
This content will be toggled!
```
````

This results in:

```{toggle}
This content will be toggled!
```

You can also include a title with your toggle section. The title will always be displayed,
and the toggle button will reveal the section's content. Use this like so:

````
```{toggle} Click the button to reveal!
Some hidden toggle content!

![](../images/cool.jpg)
```
````

This results in:

```{toggle} Click the button to reveal!
Some hidden toggle content!

![](../images/cool.jpg)
```

[myst-parser]: https://myst-parser.readthedocs.io/en/latest/
