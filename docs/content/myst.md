# MyST Markdown Overview

In addition to [Jupyter Notebook markdown](../file-types/notebooks.ipynb),
Jupyter Book also supports a special flavour of markdown called **MyST (or
Markedly Structured Text)**.
It was designed to make it easier to create publishable computational documents in Markdown.
It is a superset of [CommonMark markdown](https://commonmark.org/) and draws heavy inspiration from the fantastic [RMarkdown language from RStudio](https://rmarkdown.rstudio.com/).

```{margin}
For those who are familiar with Sphinx, MyST markdown is basically
CommonMark + Markdown Extensions + Sphinx roles and directives
```

Whether you write your book's content in Jupyter Notebooks (`.ipynb`) or in regular markdown files (`.md`),
you'll write in the same flavour of **MyST Markdown**. Jupyter Book will know how to parse both of them.

This page contains a few pieces of information about MyST markdown and how it relates to Jupyter Book.
You can find much more information about this flavour of markdown at
[The Myst Parser documentation](myst-parser:example_syntax).

:::{admonition,tip} Want to use RMarkdown directly?
See [](../file-types/jupytext.md)
:::

## Directives and roles

Roles and directives are two of the most powerful tools in Jupyter Book.
They are kind of like *functions*, but written in a markup language.
They both serve a similar purpose, but **roles are written in one line**, whereas **directives span many lines**.
They both accept different kinds of inputs, and what they do with those inputs depends on the specific role or directive that is being called.

(content:myst/directives)=
### Directives

Directives customize the look, feel, and behaviour of your book.
They are kind of like *functions*, and come in a variety of names with different behaviour.
This section covers how to structure and use them.

At its simplest, you can insert a directive into your book's content like so:

````md
```{mydirectivename}
My directive content
```
````

This will only work if a directive with name `mydirectivename` already exists (which it doesn't).
There are many pre-defined directives associated with Jupyter Book.
For example, to insert a note box into your content, you can use the following directive:

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

For more information on writing directives, see the [MyST documentation](myst-parser:syntax/directives).

(directive-arguments)=
#### More arguments and metadata in directives

Many directives allow you to control their behaviour with extra pieces of
information. In addition to the directive name and the directive content,
directives allow two other configuration points:

**directive arguments** - are a list of words that come just after the `{directivename}` is given.

Here's an example use of directive arguments:

````md
```{directivename} arg1 arg2
My directive content.
```
````

**directive keywords** - is a collection of flags or key/value pairs
that come just underneath `{directivename}`.

There are two ways to write directive keywords, either as `:key: val` pairs, or
as `key: val` pairs inside of `---` lines. They both work the same way:

Here's an example of directive keywords using `:key: val` pairs:

````md
```{directivename}
:key1: metadata1
:key2: metadata2
My directive content.
```
````

and here's an example of directive keywords using `---` lines:

````md
```{directivename}
---
metadata1: metadata2
metadata3: metadata4
---
My directive content.
```
````

:::{tip}
Remember, specifying directive keywords with `:key:` or `---` will both work the same.
We recommend using `---` if you have many keywords you wish to specify, or if some values
will span multiple lines. Use the `:key: val` syntax as a short-hand for just one or two
keywords.
:::

For examples of how this is used, see the sections below.

(content:myst/roles)=
### Roles

Roles are very similar to directives, but they are less-complex and written
entirely on one line. You can insert a role into your book's content with
this pattern:

```md
Some content {rolename}`and here is my role's content!`
```

Again, roles will only work if `rolename` is a valid role's name.
For example, the `doc` role can be used to refer to another page in your book.
You can refer directly to another page by its relative path.
For example, the role syntax `` {doc}`../intro` `` will result in: {doc}`../intro`.

For more information on writing roles, see the [MyST documentation](myst-parser:syntax/roles).

## What roles and directives are available?

There is currently no single list of roles / directives to use as a reference, but this
section tries to give as much as information as possible. For those who are familiar
with the Sphinx ecosystem, **you may use any directive / role that is available in Sphinx**.
This is because Jupyter Book uses Sphinx to build your book, and MyST Markdown supports
all syntax that Sphinx supports (think of it as a markdown version of reStructuredText).

:::{caution}
If you search the internet (and the links below) for information about roles and directives,
the documentation will generally be written with reStructuredText in mind. MyST markdown
is different from reStructuredText, but all of the functionality should be the same.
See [the MyST Sphinx parser documentation](myst-parser:intro/get-started) for more information about MyST vs. rST.
:::

For a list of directives that are available to you, there are three places to check:

1. [The Sphinx directives page](sphinx:usage/restructuredtext/directives)
   has a list of directives that are available by default in Sphinx.
2. [The reStructuredText directives page](https://docutils.sourceforge.io/docs/ref/rst/directives.html)
   has a list of directives in the Python "docutils" module.
3. This documentation has several directives that are specific to Jupyter Book in addition.

In some unusual cases, MyST-Parser may be incompatible with a certain role or directive.
In this case, you can use the special `eval-rst` directive, to directly parse reStructuredText:

````md
```{eval-rst}
.. note::

   A note written in reStructuredText.
```
````

```{eval-rst}
.. note::

   A note written in reStructuredText.
```

:::{seealso}
The MyST-Parser documentation on [how directives parse content](myst-parser:syntax/directives/parsing), and its use for [including rST files into a Markdown file](myst-parser:howto/include-rst), and [using `sphinx.ext.autodoc` in Markdown files](myst-parser:howto/autodoc).
:::

(markdown/nexting)=
## Nesting content blocks in markdown

If you'd like to nest content blocks inside of one another with Markdown (for
example, to put a `{note}` inside of a `{margin}`), you may do so by adding
extra backticks (`` ` ``) to the outer-most block. This works for literal
code blocks as well.

For example, the following syntax:

`````md
````
```
```
````
`````

Yields:

````md
```
```
````

Thus, if you'd like to nest directives inside one another, you can take the same
approach, for example, the following syntax:

`````md
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

In addition to roles and directives, there are numerous other kinds of syntax
that it supports.
MyST supports all syntax in CommonMark markdown (the kind of markdown that Jupyter Notebooks use), as well as an extended syntax that is used for scientific publishing.

The [MyST-Parser](myst-parser:intro/get-started) is the tool that Jupyter Book uses to allow you to write your book content in MyST.
It is also a good source of information about the MyST syntax.
Here are some links you can use as a reference:

* [CommonMark block syntax](myst-parser:commonmark-block-tokens)
* [Extended MyST block syntax in MyST](myst-parser:extended-block-tokens)
* [CommonMark in-line syntax](myst-parser:commonmark-span-tokens)
* [Extended in-line syntax in MyST](myst-parser:extended-span-tokens)

As a shorthand, Jupyter Book offers a single configuration, to enable the MyST [extended syntaxes](myst-parser:syntax-optional):

```yaml
parse:
  myst_extended_syntax: true
```

## What can I create with MyST markdown?

See [](./content-blocks.md) for an introduction to what you can do with MyST markdown
in Jupyter Book.
In addition, the other pages in this site cover many more use-cases for how to use directives with MyST.

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

:::{note}
For full compatibility with `myst-parser`, it is necessary to use `jupytext==1.6.0rc0` or later.

See also [](file-types:custom:jupytext).
:::

### VSCode

If editing the markdown files using VS Code, the
[vscode MyST markdown extension](https://marketplace.visualstudio.com/items?itemName=ExecutableBookProject.myst-highlight)
provides syntax highlighting and other features.
