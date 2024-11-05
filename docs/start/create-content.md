---
title: Writing in MyST Markdown
short_title: Add new content
subtitle: Use MyST Markdown to author rich narrative and integrate computation.
subject: Quickstart tutorial
---

:::{important} Objective
The goal of this tutorial is to explore a sample of the ways in which MyST Markdown can be used to create compelling reading experiences, and use the MyST-MD documentation to learn more about MyST.
:::

(tutorial:creating-new-file)=

## Supported file formats

After following [](init.md), our book has a `myst.yml` that contains some metadata including a title, description, and an author list. Let's now add some content! The MyST engine that powers Jupyter Book supports a few different file formats for authoring content:

- MyST Markdown `.md`
- Jupyter Notebook `.ipynb`
- LaTeX `.tex`

In this tutorial, we'll author a simple page `intro.md` using MyST Markdown, a markup format based upon the [CommonMark](https://commonmark.org/) Markdown implementation.

## Writing with MyST Markdown

MyST is designed for creating publication-quality, computational documents. By building on top of CommonMark Markdown, MyST markup is designed to be readable and compatible with a large number of existing editors.[^compat] As a CommonMark superset, the following markup is all valid MyST:

````{myst}
This is *emphasized*, **bold**, `inline code`, and [a link](https://Wikipedia.org).

```python
print("""
This is a code block
""")
```
> And this is a quote!
````

The most notable way that MyST extends CommonMark is through the introduction of _roles_ and _directives_. Roles are a mechanism add semantic to inline markup, e.g. the `delete` role:

```{myst}
The following text {delete}`should be struck-through!`
```

Directives serve a similar function for _block_ level markup, like images:

```{myst}
There is a nice sunset below:

:::{figure} https://github.com/rowanc1/pics/blob/main/sunset.png?raw=true
I'm a nice sunset!
:::
```

Directives may have a body, like the caption:

```{code} markdown
:linenos:
:emphasize-lines: 2

:::{figure} https://github.com/rowanc1/pics/blob/main/sunset.png?raw=true
I'm a nice sunset!
:::
```

And/or an argument, like the image URL:

```{code} markdown
:linenos:
:emphasize-lines: 1

:::{figure} https://github.com/rowanc1/pics/blob/main/sunset.png?raw=true
I'm a nice sunset!
:::
```

They can even take options:

```{code} markdown
:linenos:
:emphasize-lines: 2

:::{figure} https://github.com/rowanc1/pics/blob/main/sunset.png?raw=true
:align: center

I'm a nice sunset!
:::
```

The MyST-MD engine defines a large number of pre-existing roles and directives, such as the <xref:guide/directives#directive-figure>, which are defined in the MyST guide (see <xref:guide/roles> and <xref:guide/directives>). The MyST guide defines a helpful overview of MyST Markdown syntax in <xref:guide/syntax-overview>

Having explored the supported syntax for writing MyST, let's create a simple `intro.md` file that showcases these features!

::::::{tab-set}
:::::{tab-item} Markup

```{code} markdown
:filename: intro.md

# Introduction

I am a book about ... something! Wikipedia has [information about books](wiki:book): hover over the link for more information.

% An admonition containing a note
:::{note}
Books are usually written on paper ... But Jupyter Book can create _websites_!
:::

If you sold 100 books at \$10 per book, you'd have \$1000 dollars according to [](#eq:book). If instead you publish your Jupyter Book to the web for free, you'd have \$0 dollars!

% An arbitrary math equation
:::{math}
:name: eq:book

x \times y = z
:::

Sometimes when reading it is helpful to foster a _tranquil_ environment. The image in [](#fig:mountains) would be a perfect spot!

% A figure of a photograph of some mountains, followed by a caption
:::{figure} https://github.com/rowanc1/pics/blob/main/mountains.png?raw=true
:label: fig:mountains

A photograph of some beautiful mountains to look at whilst reading.
:::

```

:::::
::::{tab-item} Result

# Introduction

I am a book about ... something! Wikipedia has [information about books](wiki:book): hover over the link for more information.

% An admonition containing a note
:::{note}
Books are usually written on paper ... But Jupyter Book can create _websites_!
:::

If you sold 100 books at \$10 per book, you'd have \$1000 dollars according to [](#eq:book). If instead you publish your Jupyter Book to the web for free, you'd have \$0 dollars!

% An arbitrary math equation
:::{math}
:name: eq:book

x \times y = z
:::

Sometimes when reading it is helpful to foster a _tranquil_ environment. The image in [](#fig:mountains) would be a perfect spot!

% A figure of a photograph of some mountains, followed by a caption
:::{figure} https://github.com/rowanc1/pics/blob/main/mountains.png?raw=true
:label: fig:mountains

A photograph of some beautiful mountains to look at whilst reading.
:::

::::
::::::

The above tab-set shows both the contents of `intro.md`, and what the underlying MyST-MD engine produces when you build the project as a website. To learn more about the supported syntax of MyST Markdown, and the features supported by the MyST-MD engine that powers Jupyter Book, see [the MyST-MD authoring documentation](xref:guide/frontmatter).

Now that we have some content, we're ready to [](./build-websites.md).

[^compat]: Whilst specialised MyST integrations provide the best editing experience, most editors that understand Markdown will be able to make some sense of a MyST document.
