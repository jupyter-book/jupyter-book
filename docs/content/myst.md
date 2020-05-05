# MyST Markdown Overview

In addition to [Jupyter Notebook markdown](../content-types/notebooks), Jupyter Book also supports
a special flavor of markdown called **MyST (or
Markedly Structured Text)**. It was designed to make it easier to create
publishable computational documents in Markdown. It is a superset of
[CommonMark markdown](https://commonmark.org/) and draws heavy inspiration
from the fantastic [RMarkdown language from RStudio](https://rmarkdown.rstudio.com/).

```{margin}
For those who are familiar with Sphinx, MyST markdown is basically
CommonMark + Sphinx roles and directives
```

Whether you write your book's content in Jupyter Notebooks (`.ipynb`) or
in regular markdown files (`.md`), you'll write in the same flavor of
**MyST Markdown**. Jupyter Book will know how to parse both of them.

This page contains a few pieces of information about MyST markdown and how it
relates to Jupyter Book. You can
find much more information about this flavor of markdown at
[The Myst Parser documentation][myst-parser].


## Directives and roles

Roles and directives are two of the most powerful tools in Jupyter Book. They
are kind of like *functions*, but written in a markup language. They both
serve a similar purpose, but **roles are written in one line**, whereas
**directives span many lines**. They both accept different kinds of inputs,
and what they do with those inputs depends on the specific role or directive
that is being called.

### Directives

Directives customize the look, feel, and behavior of your book. They are
kind of like *functions*, and come in a variety of names
with different behavior. This section covers how to structure and use them.

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

#### More arguments and metadata in directives

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

### Roles

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

## Other MyST Markdown syntax

In addition to roles and directives, there are several other kinds of syntax
that it supports. MyST supports all syntax in CommonMark markdown (the kind of
markdown that Jupyter Notebooks use), as well as an extended syntax that is used
for scientific publishing.

The [MyST-Parser](https://myst-parser.readthedocs.io/en/latest/) is the tool
that Jupyter Book uses to allow you to write your book content in MyST. It is
also a good source of information about the MyST syntax. Here are some links
you can use as a reference:

* [CommonMark block syntax](https://myst-parser.readthedocs.io/en/latest/using/syntax.html#commonmark-tokens)
* [Extended MyST block syntax in MyST](https://myst-parser.readthedocs.io/en/latest/using/syntax.html#extended-block-tokens)
* [CommonMark in-line syntax](https://myst-parser.readthedocs.io/en/latest/using/syntax.html#commonmark-inline-tokens)
* [Extended in-line syntax in MyST](https://myst-parser.readthedocs.io/en/latest/using/syntax.html#extended-inline-tokens)

## What can I create with MyST markdown?

See {doc}`content-blocks` for an introduction to what you can do with MyST markdown
in Jupyter Book. In addition, the other pages in this site cover many more use-cases
for how to use directives with MyST.

## Tools for writing MyST markdown

There is some support for MyST markdown in tools across the community, here are
a few prominent ones.

### Jupyter interfaces

While MyST markdown does not (yet) render in traditional Jupyter interfaces, most
of its syntax should "gracefully degrade", meaning that you can still work with
MyST in Jupyter, and then build your book with Jupyter Book.

### Jupytext and text sync

For working between Jupyter notebook and markdown files, we recommend [jupytext](https://jupytext.readthedocs.io/en/latest),
an open source tool for two-way conversion between `.ipynb` and text files.
Jupytext [supports the MyST markdown format](https://jupytext.readthedocs.io/en/latest/formats.html#myst-markdown).

### VSCode

If editing the markdown files using VS Code, the
[vscode MyST markdown extension](https://marketplace.visualstudio.com/items?itemName=executablebooks.myst-highlight)
provides syntax highlighting and other features.
