(content:myst)=
# MyST Markdown overview

In addition to [Jupyter Notebook Markdown](../file-types/notebooks.ipynb),
Jupyter Book also supports a special flavour of Markdown called **MyST (or
Markedly Structured Text)**.
It was designed to make it easier to create publishable computational documents written with Markdown notation.
It is a superset of [CommonMark Markdown](https://commonmark.org/) and draws heavy inspiration from the fantastic [RMarkdown language from RStudio](https://rmarkdown.rstudio.com/).

```{margin}
For those who are familiar with Sphinx, MyST Markdown is basically
CommonMark + Markdown extensions + Sphinx roles and directives
```

Whether you write your book's content in Jupyter notebooks (`.ipynb`) or in regular Markdown files (`.md`),
you'll write in the same flavour of **MyST Markdown**. Jupyter Book will know how to parse both of them.

This page contains a few pieces of information about MyST Markdown and how it relates to Jupyter Book.
You can find much more information about this flavour of Markdown at
[the Myst Parser documentation](myst-parser:syntax/core).

:::{admonition} Want to use RMarkdown directly?
:class: tip
See [](../file-types/jupytext.md)
:::

## Directives and roles

Roles and directives are two of the most powerful tools in Jupyter Book.
They are kind of like *functions*, but written in a markup language.
They both serve a similar purpose, but **roles are written in one line** whereas **directives span many lines**.
They both accept different kinds of inputs, and what they do with those inputs depends on the specific role or directive being used.

(content:myst/directives)=
### Directives

Directives customize the look, feel, and behaviour of your book.
They are kind of like *functions*, and come in a variety of names with different behaviour.
This section covers how to structure and use them.

At its simplest, you can use directives in your book like so:

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

being inserted in your built book.

For more information on using directives, see the [MyST documentation](myst-parser:syntax/directives).

(directive-arguments)=
#### More arguments and metadata in directives

Many directives allow you to control their behaviour with extra pieces of
information. In addition to the directive name and the directive content,
directives allow two other configuration points:

**directive arguments** - a list of words that come just after the `{directivename}`.

Here's an example usage of directive arguments:

````md
```{directivename} arg1 arg2
My directive content.
```
````

**directive keywords** - a collection of flags or key/value pairs
that come just underneath `{directivename}`.

There are two ways to write directive keywords, either as `:key: val` pairs, or
as `key: val` pairs enclosed by `---` lines. They both work the same way:

Here's an example of directive keywords using the `:key: val` syntax:

````md
```{directivename}
:key1: metadata1
:key2: metadata2
My directive content.
```
````

and here's an example of directive keywords using the enclosing `---` syntax:

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
Remember, specifying directive keywords with `:key:` or `---` will make no difference.
We recommend using `---` if you have many keywords you wish to specify, or if some values
will span multiple lines. Use the `:key: val` syntax as a shorthand for just one or two
keywords.
:::

For examples of how this is used, see the sections below.

(content:myst/roles)=
### Roles

Roles are very similar to directives, but they are less complex and written
entirely in one line. You can use a role in your book with
this syntax:

```md
Some content {rolename}`and here is my role's content!`
```

Again, roles will only work if `rolename` is a valid role name.
For example, the `doc` role can be used to refer to another page in your book.
You can refer directly to another page by its relative path.
For example, the syntax `` {doc}`../intro` `` will result in: {doc}`../intro`.

```{warning}
It is currently a requirement for roles to be on the **same line** in your source file. It will
not be parsed correctly if it spans more than one line. Progress towards supporting roles
that span multiple lines can be tracked [by this issue](https://github.com/executablebooks/MyST-Parser/issues/269)
```

For more information on using roles, see the [MyST documentation](myst-parser:syntax/roles).

## What roles and directives are available?

There is currently no single list of roles / directives to use as a reference, but this
section tries to give as much as information as possible. For those who are familiar
with the Sphinx ecosystem, **you may use any directive / role that is available in Sphinx**.
This is because Jupyter Book uses Sphinx to build your book, and MyST Markdown supports
all syntax that Sphinx supports (think of it as a Markdown version of reStructuredText).

:::{caution}
If you search the internet (and the links below) for information about roles and directives,
the documentation will generally be written with reStructuredText in mind. MyST Markdown
is different from reStructuredText, but all of the functionality should be the same.
See [the MyST Sphinx parser documentation](myst-parser:intro/get-started) for more information about the differences between MyST and rST.
:::

For a list of directives that are available to you, there are three places to check:

1. [The Sphinx directives page](sphinx:usage/restructuredtext/directives)
   has a list of directives that are available by default in Sphinx.
2. [The reStructuredText directives page](https://docutils.sourceforge.io/docs/ref/rst/directives.html)
   has a list of directives in the Python "docutils" module.
3. This documentation has several additional directives that are specific to Jupyter Book.

:::{admonition} What if it exists in rST but not MyST?
:class: tip
In some unusual cases, MyST may be incompatible with a certain role or directive.
In this case, you can use the special `eval-rst` directive, to directly parse reStructuredText:

````md
```{eval-rst}
.. note::

   A note written in reStructuredText.
```
````

which produces

```{eval-rst}
.. note::

   A note written in reStructuredText.
```
:::

:::{seealso}
The MyST-Parser documentation on [how directives parse content](myst-parser:syntax/directives/parsing), and its use for [including rST files into a Markdown file](myst-parser:howto/include-rst), and [using `sphinx.ext.autodoc` in Markdown files](myst-parser:howto/autodoc).
:::

(markdown/nesting)=
## Nesting content blocks in Markdown

If you'd like to nest content blocks inside one another in Markdown (for
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

yields

````md
```
```
````

Thus, if you'd like to nest directives inside one another, you can take the same
approach. For example, the following syntax:

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
that MyST Markdown supports.
MyST supports all syntax of CommonMark Markdown (the kind of Markdown that Jupyter notebooks use), as well as an extended syntax that is used for scientific publishing.

The [MyST-Parser](myst-parser:intro/get-started) is the tool that Jupyter Book uses to allow you to write your book content in MyST.
It is also a good source of information about the MyST syntax.
Here are some links you can use as a reference:

* [CommonMark block syntax](myst-parser:commonmark-block-tokens)
* [Extended MyST block syntax in MyST](myst-parser:extended-block-tokens)
* [CommonMark in-line syntax](myst-parser:commonmark-span-tokens)
* [Extended in-line syntax in MyST](myst-parser:extended-span-tokens)

:::{seealso}
For information about enabling extended MyST syntax, see [](content-blocks:myst-extensions).
In addition, see other examples of this extended syntax (and how to enable each) throughout this documentation.
:::

## What can I create with MyST Markdown?

See [](./content-blocks.md) for an introduction to what you can do with MyST Markdown
in Jupyter Book.
In addition, the other pages in this site cover many more use-cases for how to use directives with MyST.

## Tools for writing MyST Markdown

There is some support for MyST Markdown in tools across the community. Here we include
a few prominent ones.

### Jupyter interfaces

While MyST Markdown does not (yet) render in traditional Jupyter interfaces, most
of its syntax should "gracefully degrade", meaning that you can still work with
MyST in Jupyter, and then build your book with Jupyter Book.

### Jupytext and text sync

For working with Jupyter notebook and Markdown files, we recommend [jupytext](https://jupytext.readthedocs.io/en/latest),
an open source tool for two-way conversion between `.ipynb` and text files.
Jupytext [supports the MyST Markdown format](https://jupytext.readthedocs.io/en/latest/formats.html#myst-markdown).

:::{note}
For full compatibility with `myst-parser`, it is necessary to use `jupytext>=1.6.0`.

See also [](file-types:custom:jupytext).
:::

### VS Code

If editing the Markdown files using VS Code, the
[VS Code MyST Markdown extension](https://marketplace.visualstudio.com/items?itemName=ExecutableBookProject.myst-highlight)
provides syntax highlighting and other features.
