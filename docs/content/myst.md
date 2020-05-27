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

[myst-parser]: https://myst-parser.readthedocs.io/en/latest/

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

(directive-arguments)=
#### More arguments and metadata in directives

Many directives allow you to control their behavior with extra pieces of
information. In addition to the directive name and the directive content,
directives allow two other configuration points:

**directive arguments** - are a list of words that come just after the `{directivename}` is given.

Here's an example use of directive arguments:

````
```{directivename} arg1 arg2
My directive content.
```
````

**directive keywords** - is a collection of flags or key/value pairs
that come just underneath `{directivename}`.

There are two ways to write directive keywords, either as `:key: val` pairs, or
as `key: val` pairs inside of `---` lines. They both work the same way:

Here's an example of directive keywords using `:key: val` pairs:

````
```{directivename}
:key1: metadata1
:key2: metadata2
My directive content.
```
````

and here's an example of directive keywords using `---` lines:

````
```{directivename}
---
metadata1: metadata2
metadata3: metadata4
---
My directive content.
```
````

```{tip}
Remember, specifying directive keywords with `:key:` or `---` will both work the same.
We recommend using `---` if you have many keywords you wish to specify, or if some values
will span multiple lines. Use the `:key: val` syntax as a short-hand for just one or two
keywords.
```

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

## What roles and directives are available?

There is currently no single list of roles / directives to use as a refernece, but this
section tries to give as much as information as possible. For those who are familiar
with the Sphinx ecosystem, **you may use any directive / role that is available in Sphinx**.
This is because Jupyter Book uses Sphinx to build your book, and MyST Markdown supports
all syntax that Sphinx supports (think of it as a markdown version of reStructuredText).

```{caution}
If you search the internet (and the links below) for information about roles and directives,
the documentation will generally be written with reStructuredText in mind. MyST markdown
is different from reStructuredText, but all of the functionality should be the same. See
[the MyST Sphinx parser documentation](https://myst-parser.readthedocs.io/en/latest/) for
more information about MyST vs. rST.
```

For a list of directives that are available to you, there are three places to check:

1. [The Sphinx directives page](https://www.sphinx-doc.org/en/2.0/usage/restructuredtext/directives.html)
   has a list of directives that are available by default in Sphinx.
2. [The reStructuredText directives page](https://docutils.sourceforge.io/docs/ref/rst/directives.html)
   has a list of directives in the Python "docutils" module.
3. This documentation has several directives that are specific to Jupyter Book in addition.

(markdown/nexting)=
## Nesting content blocks in markdown

If you'd like to nest content blocks inside of one another with Markdown (for
example, to put a `{note}` inside of a `{margin}`), you may do so by adding
extra backticks (`` ` ``) to the outer-most block. This works for literal
code blocks as well.

For example, the following syntax:

`````
````
```
```
````
`````

Yields:

````
```
```
````

Thus, if you'd like to nest directives inside one another, you can take the same
approach, for example, the following syntax:

`````
````{margin}
```{note}
Here's my note!
```
````
`````

produces:

````{margin}
```{note}
Here's my note!
```
````

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
[vscode MyST markdown extension](https://marketplace.visualstudio.com/items?itemName=ExecutableBookProject.myst-highlight)
provides syntax highlighting and other features.
