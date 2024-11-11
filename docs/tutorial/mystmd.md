---
title: Write MyST Markdown
subject: Jupyter Book tutorial
subtitle: An overview of syntax features
description: MyST (Markedly Structured Text) is designed to create publication-quality documents written entirely in Markdown.
---

:::{important} Objective

The goal of this quickstart guide is to showcase the most used features of the MyST authoring experience. The MyST syntax can be used in markdown files or markdown cells in Jupyter Notebooks to add figures, tables, equations, cross-references, hover-links and citations.
:::

## Overview

{abbr}`MyST (Markedly Structured Text)` is designed to create publication-quality documents written entirely in Markdown. The extensions and design of MyST is inspired by the [Sphinx](https://www.sphinx-doc.org/) and [reStructuredText](https://docutils.sourceforge.io/rst.html) (RST) ecosystems and is is a superset of [CommonMark](xref:guide/commonmark).

MyST allows you to directly create “directives” and “roles” that extend markdown to support technical and scientific documents. Directives are block-level extension points, like [callout panels](xref:guide/admonitions), [tabs](xref:guide/dropdowns-cards-and-tabs), [figures](xref:guide/figures) or [embedded charts](xref:guide/interactive-notebooks); and roles are inline extension points, for components like [cross-references](xref:guide/cross-references), [external references](xref:guide/external-references), [citations](xref:guide/citations), or [inline math](xref:guide/math). MyST also supports rich information about linking to other documents in common services (like Wikipedia or a DOI link), these allow for rich-previews of the links as well as easy ways to include citations.

## Typography

MyST is built on CommonMark Markdown, to learn more about that standard form of Markdown as well as a [tutorial](https://commonmark.org/help/tutorial/) visit [commonmark.org](https://commonmark.org/).
CommonMark allows for headings, bold, italic, lists, links, images, code, breaks and quotes ([see more](xref:guide/commonmark)) -- but overall is designed to be very simple to read and write as text!
MyST adds various typography extensions to the markup including [footnotes](xref:guide#footnotes), [inline math](xref:guide#inline-math), and [definition lists](xref:guide#definition-lists), try the demo below to get an idea of the markup.

```{myst}
### Heading Level 3

Try changing the number of `#`s to $n$[^math] to change the **depth** of the _heading_.

1. Learn about [Markdown](https://en.wikipedia.org/wiki/Markdown)
   - Go through a [tutorial](https://commonmark.org/help/tutorial/)

[^math]: Where $n \in \mathbb{N}$ with $n \leq 6$, or between an H1 and an H6!
```

:::{seealso}
See [](xref:guide/typography) to learn in depth about all typographical elements. The [](xref:guide/commonmark) page also includes demos and examples of all CommonMark syntax.
:::

## Directives and roles

Directives are multi-line containers that include an identifier, arguments, options, and content. Examples include [admonitions](xref:guide/admonitions), [figures](xref:guide/figures), and [equations](xref:guide/math). At its simplest, you can use directives using a "fence" (either [back-ticks or colons](xref:guide#example-fence)) and the name of the directive enclosed in braces (`{name}`).

For example, try editing the following <xref:guide/directives#directive-figure> directive, you can center the figure with an `:align: center` option or change the `colons` for `backticks`.

```{myst}

:::{figure} https://github.com/rowanc1/pics/blob/main/banff-tall.png?raw=true
:align: right
:width: 40%

The picture would look better if it is `:align: center`-ed!
:::
```

Roles are very similar to directives, but they are written entirely in one line. There are a number of roles included in MyST, including abbreviations, subscript, and superscript, as well as inline [](xref:guide/math). The syntax of a role is:

```markdown
Some content {rolename}`and here is my role's content!`
```

Of course, roles will only work if `rolename` is a valid role name! The `abbr` role creates inline abbreviations, for example, `` {abbr}`MyST (Markedly Structured Text)` `` will become {abbr}`MyST (Markedly Structured Text)`! When you hover over[^1] the abbreviation you will see the `title` appear!

[^1]: Abbreviations are also great structured data for screen-readers!

:::{seealso}
See [](xref:guide/syntax-overview) to learn in depth about directives and roles, including options, and how to nest directives.
:::

## Frontmatter

Frontmatter allows you to specify metadata about your page including the `title`, `thumbnail`, `authors`, and scientific identifiers like a `doi`.
Adding frontmatter ensures that these properties are available to downstream tools or build processes like building [](xref:guide/creating-pdf-documents).
For example:

```yaml
---
title: My First Article
thumbnail: xref:guide/thumbnails/nice-image.png
date: 2022-05-11
authors:
  - name: Mason Moniker
    affiliations:
      - University of Europe
---
```

:::{seealso}
See [](xref:guide/frontmatter) for all options, how to use frontmatter in various tools like JupyterLab, and how to reuse frontmatter across your pages in a project.
:::

## Links & cross-references

As you have seen in the links in MyST (e.g. [](xref:guide/frontmatter)), there is information that is pulled forward into your reading context on hover or click. We believe it is important to provide as much possible context when you are reading on elements like links to other pages, cross-references to figures, tables and equations as well as traditional academic citations[^contextual-information] (**👈 see the footnote!**). Additionally, all of these have fallbacks in static PDF or Word documents.

[^contextual-information]:
    For example, in [](doi:10.1145/3411764.3445648) the authors showed you can speed up comprehension of a paper by 26% when showing information in context, rather than requiring researchers to scroll back and forth to find figures and equations.

    Imagine if all of science was ⚡️ 26% faster ⚡️[^3]!! (**👈💥**)\
    Designing the user-experience of scientific communication is _really_ important.

[^3]:
    Just as an example of having lots of helpful information at your finger-tips, it would be nice to see the video of that article, _right_? Well here it is:

    :::{iframe} https://www.youtube.com/embed/yYcQf-Yq8B0
    :::

    Can't do that in a PDF! [^4] (**👈💥**)

[^4]:
    I mean, now that you are down the rabbit-hole, we can get you back on track with a demo of [referencing equations](xref:guide#example-equation-targets) (**👈💥**)

    Or maybe you want to explore an [💥 interactive figure 💥](xref:guide#fig-altair-horsepower).

:::{figure}
:class: framed
Try clicking the footnote above, you can nest information and interactive figures for the interested reader! You can help with reading comprehension by around 26% by providing information when the reader needs it!!
:::

To link to a document, for example [](xref:guide/frontmatter), is done through a simple Markdown link `[](xref:guide/frontmatter)`, you can put your own content in between the square brackets, but if you leave it out the link contents will be filled in with the title of the page. If you define the frontmatter on that page (i.e. the description and tooltip), you will also see that information when you hover over the link. This also works for links to Wikipedia (e.g. [Ponies 🐴](https://en.wikipedia.org/wiki/New_Forest_pony)) as well as Github code (e.g. [](https://github.com/jupyter-book/mystmd/blob/main/README.md)).

To create a cross-reference, you need to label a referenceable "target" like a figure, section, equation or table (or anything!). Out of the box, all MyST directives support the `label` option that can be used to define a label, e.g. {myst:directive}`figure.label`. To then reference the figure, use the link syntax again pointing to the label as the target `[](xref:guide#my-fig)`. If you leave the title blank the default will fill in with an enumerated "Figure 1".

````{myst}
```{figure} https://github.com/rowanc1/pics/blob/main/mountains.png?raw=true
:label: my-fig
:align: center

My **bold** mountain 🏔🚠.
```

Check out [](xref:guide#my-fig)!!
````

:::{seealso}
See [](xref:guide/cross-references) for in depth information for using links for internal and external references. For links to external sites like Wikipedia or GitHub, see [](xref:guide/external-references).
:::

## Citations

Citations are at the heart of technical writing, and are well handled by MyST!

> If I have seen further it is by standing on the shoulders of Giants.
>
> -- Newton making a [sarcastic remark](https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants#Early_modern_and_modern_references) directed at Hooke's appearance?!

The easiest way to create a citation is just link to a DOI as any other link! For example:\
`[](https://doi.org/10.5281/zenodo.6476040)` will create:\
[](https://doi.org/10.5281/zenodo.6476040).

If you already have a citation list locally as a BiBTeX file (`*.bib`), then you can reference the keys inside it using a similar syntax to LaTeX, but adapted to roles: `` {cite:p}`myst2023,jupyterbook2021` ``. The `cite:p` will create a parenthetical citation, or a textual citation using `cite:t`, the `cite` role can also be used, and will adapt to the citation style of the document. The citations will show up inline in your documents, and also automatically create a references section at the bottom of your page!

:::{seealso}
See [](xref:guide/citations) for more information about using citations and references sections, and how to have control over the bibliography sources.
:::

## What's next?

We hope the above sections in this overview should have given you a sense of the types of things that MyST can do! Once you write a document in MyST, you can use the command line tools to translate that into a [scientific PDF article](xref:guide/creating-pdf-documents), or a [Word Document](xref:guide/creating-word-documents) or a [website](xref:guide/quickstart-myst-documents) like this site!

```{mermaid}
flowchart LR
  A[Jupyter Notebook] --> D
  B[Markdown] --> D
  D{MyST}
  D <--> E[LaTeX]
  E --> F[PDF]
  D --> G[Word]
  D --> H[React]
  D --> I[HTML]
  D <--> J[JATS]
```
