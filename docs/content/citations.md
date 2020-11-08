---
jupytext:
  formats: ipynb,md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# References and citations

Because `jupyter-book` is built on top of {term}`Sphinx`,
there are many ways to reference content within your book (or even across other books, or Sphinx websites). This page has several examples of what you can reference and how to accomplish it.

:::{tip}
You can check for missing references when building a Jupyter Book.
To do so, use the following options:

```bash
jupyter-book build -W -n --keep-going docs/
```

This will check for missing references (`-n`) and turn them into errors (`-W`),
but will still attempt to run the full build (`--keep-going`),
so that you can see all errors in one run.
:::

## Referencing overview

Referencing is accomplished with **roles** or with **markdown link syntax**, depending on your use-case.
There are a few ways to reference content from your book, depending on what kind of content you'd like to reference.
Here is a quick overview of some common roles for referencing:

* `{ref}` is used to reference section labels that you define or figures with a `name` value
* `{numref}` is used to provide *numbered* references to figures, tables, or headers
* `{doc}` is used to reference other files in your book
* `{eq}` is used to reference equations that have been given a `label` value

:::{admonition,tip} Choosing your own link text
You can reference a section label through ``{ref}`label` `` or ``{ref}`some text <label>` ``.
Documents can be referenced through ``{doc}`path/to/document` `` or ``{doc}`some text <path/to/document>` ``
:::

### Referencing with markdown link syntax

If you wish to use Markdown style syntax, then MyST Markdown will try to find a reference,
from any of the above reference types (and more!).
This has an advantage, in that you can used nested markdown syntax in your text, for example:

```md
[A **bolded _reference_** to a page](./myst.md)

[A reference to a header](content:references)
```

produces

[A **bolded _reference_** to a page](./myst.md)

[A reference to a header](content:references)

Leaving the title empty will mean the reference uses the target as text, for example the syntax

```md
[](./myst.md)
```

will link to a section and use its header text as the link text itself:

[](./myst.md)

:::{admonition,tip} Internval vs. External URLs
You can control how MyST Markdown distinguishes between internal references and external URLs in your `_config.yml`.
For example,

```yaml
parse:
   myst_url_schemes: [mailto, http, https]
```

means that `[Jupyter Book](https://jupyterbook.org)` will be recognised as a URL, but `[Citations](content:citations)` will not:

* [Jupyter Book](https://jupyterbook.org)
* [Citations](content:citations)

:::


(content:references)=
## Reference section labels

Labels are a way to add tags to parts of your content so that you can reference them
later on. This is helpful if you want to quickly insert links to other
parts of your book. Labels can be added before major elements of a page,
such as titles or figures.

To add a label, use the following pattern **before** the element you wish
to label:

```md
(my-label)=
# The thing to label
```

For example, we've added the following label above the header for this section with:

```md
(content:references)=
## Cross-references and labels
```

You can insert cross-references to labels in your content with two kinds of syntax:

- `` {ref}`label-text` ``
- `[](label-text)`

For example, the syntax `` {ref}`content:references` `` or `[](content:references)` results in a link to this section like so: {ref}`content:references`.

## Referencing figures

To reference a figure in your book, first add a figure and ensure that it has both a `name` as well as a caption associated with it:

```{figure} ../images/cool.jpg
:name: my-cool-fig

Here is my caption.
```

Then, reference the figure by its `:name:` value. For example:

Here is {ref}`My cool fig <my-cool-fig>`.


## Reference tables

To reference a table, first create a table and ensure that it has a `:name:` and a title:

```{table} Here is my title
:name: my-reference-table

| 1 | 2 |
|---|---|
| 3 | 4 |
```

{ref}`my-reference-table`.

## Reference content files

To reference other files of book content, use the `{doc}` role, or link directly to another file with Markdown link syntax. For exmaple:

{doc}`../file-types/myst-notebooks`.
[](../file-types/myst-notebooks.md).

## Reference equations

To reference equations, first insert an equation with a label like so:

```{math}
:label: my-reference-math
w_{t+1} = (1 + r_{t+1}) s(w_t) + y_{t+1}
```

Next, reference the equation like so:

{eq}`my-reference-math`.
[](my-reference-math)

## Numbered references

Numbered references allow you to refer to attach a number to each figure, equation, or table.
Use the `{numref}` role to insert a numbered reference, like so:

{numref}`Numbered ref %s <my-reference-table>`.

When generating custom text for your numbered references, include a `%s` character and the number for that reference will be inserted there.

For example:

{numref}`Numbered ref %s <my-reference-table>`.


(content:citations)=
## Citations and bibliographies

You can add citations and bibliographies using references that are stored in a `bibtex` file that is in your book's folder. You can then add a citation in-line in your Markdown with the `{cite}` role, and include the bibliography from your bibtex file with the `{bibliography}` directive.

```{seealso}
This functionality uses the excellent [sphinxcontrib-bibtex](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/) extension.
```

**To add citations to your book**, take the following steps:

1. **Create a references bibtex file**.

   ```bash
   touch references.bib
   ```

2. **Add references**. Add some references to your BibTex file. See
   [the BibTex documentation](http://www.bibtex.org/Using/) for information on
   the BibTex reference style. Here's an example citation:

   ```latex
   @article{perez2011python
   ,	title	= {Python: an ecosystem for scientific computing}
   ,	author	= {Perez, Fernando and Granger, Brian E and Hunter, John D}
   ,	journal	= {Computing in Science \\& Engineering}
   ,	volume	= {13}
   ,	number	= {2}
   ,	pages	= {13--21}
   ,	year	= {2011}
   ,	publisher	= {AIP Publishing}
   }
   ```

3. **Add a citation**. In your content, use the following syntax to include a citation:

   ```md
   {cite}`mybibtexcitation`
   ```

   For example,

   ```md
   {cite}`perez2011python`
   ```

   generates this citation: {cite}`perez2011python`

   You can also include multiple citations in one go, like so:

   ```md
   {cite}`perez2011python,holdgraf_rapid_2016,RePEc:the:publsh:1367,caporaso2010qiime`
   ```

   becomes {cite}`perez2011python,holdgraf_rapid_2016,RePEc:the:publsh:1367,caporaso2010qiime`.

4. **Add a bibliography**. Use the following directive to do so:

   ````md
   ```{bibliography} path/to/references.bib
   ```
   ````

   This will generate the bibliography of your entire bibtex file. See
   [the bibliography at the end of this page](citations/bibliography) for an example.

When your book is built, the bibliography and citations will now be included.

:::{warning}
If you are adding a bibliography to a *different* page from your references, then
you may need to ensure that page is processed last. Because Sphinx processes pages alphabetically,
you may want to name the file `zreferences.rst` for example.

See [this `sphinxcontrib-bibtex` section](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/usage.html#unresolved-citations-across-documents)
for more information.
:::

This feature uses [`sphinxcontrib-bibtex`](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/usage.html#roles-and-directives)
under the hood, so check its documentation for more information on how to use and configure
bibliographies in your book. Do note the documentation
is written with rST syntax in mind and you'll need to adapt the directive/role syntax for your
Markdown content.

### Selecting your reference style

You can also optionally customize the style of your references.
By default, references are displayed in the `alpha` style.
Other currently supported styles include `plain`, `unsrt`, and `unsrtalpha`.
These styles create the following bibliography formatting:

* `alpha`: Use alphanumeric reference labels, citations are sorted by author, year.
* `plain`: Use numeric reference labels, citations are sorted by author, year.
* `unsrt`: Use numeric reference labels, citations are sorted by order of appearance.
* `unsrtalpha`: Use alphanumeric reference labels, citations are sorted by order of appearance.

To set your reference style, use the style option:

````md
```{bibliography} path/to/references.bib
:style: unsrt
```
````

### Local bibliographies

You may wish to include a bibliography listing at the end of each document
rather than having a single bibliography contained in a separate document.
Having multiple bibliography directives, however, can cause `sphinx` to issue
`duplicate citation warnings`.

A common fix is to add a filter to the bibliography directives:

````md
```{bibliography} path/to/references.bib
:filter: docname in docnames
```
````

See `sphinxcontrib-bibtex` documentation on [local bibliographies](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/usage.html#section-local-bibliographies).

(citations/bibliography)=
## Bibliography

```{bibliography} ../references.bib
```
