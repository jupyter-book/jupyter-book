---
title: Writing In MyST Markdown
short_title: Add New Content
subtitle: Use MyST Markdown to author rich narrative and integrate computation.
subject: Quickstart Tutorial
---

:::{important} Objective
The goal of this tutorial is to explore a sample of the ways in which MyST Markdown can be used to create compelling reading experiences, and use the MyST-MD documentation to learn more about MyST.
:::

(tutorial:creating-new-file)=

## Creating a New File

After following [](init.md), our book has some metadata in a `myst.yml` that adds some metadata including a title, description, and an author list. Let's now add some content by creating a new file `intro.md`. Here's an example of what you might write:

::::{myst}

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

The above "widget" shows both the contents of `intro.md`, and what the underlying MyST-MD engine produces when you build the project as a website. To learn more about the supported syntax of MyST Markdown, and the features supported by the MyST-MD engine that powers Jupyter Book, see [the MyST-MD authoring documentation](xref:guide/frontmatter).

Now that we have some content, we're ready to [](./build-websites.md).
