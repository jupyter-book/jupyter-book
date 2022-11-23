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

(content:references)=
# References and cross-references

Because `jupyter-book` is built on top of {term}`Sphinx`,
there are many ways to reference content within your book (or even across other books, or Sphinx websites).

Referencing is accomplished with **roles** or with **markdown link syntax**, depending on your use-case.
There are a few ways to reference content from your book, depending on what kind of content you'd like to reference.

:::{seealso}
If you're getting started, check out [](../tutorials/references.md) for more information.
:::

(content:references:labels)=
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
(content:references:labels)=
## Reference section labels
```

You can insert cross-references to labels in your content with two kinds of syntax:

- `` {ref}`label-text` ``
- `[](label-text)`

For example, the syntax `` {ref}`content:references:labels` `` or `[](content:references:labels)` results in a link to this section like so: {ref}`content:references:labels`.

(references:figures)=
## Reference figures

To reference a figure in your book, first add a figure and ensure that it has both a `name` as well as a caption associated with it:

````{example}
```{figure} ../images/cool.jpg
:name: my-fig-ref

My figure title.
```
````

Then, reference the figure by its `:name:` value. For example:

| source                                         | result                                   |
|------------------------------------------------|------------------------------------------|
| `` Here is {ref}`my-fig-ref` ``               | Here is {ref}`my-fig-ref`               |
| `` Here is {ref}`My cool fig <my-fig-ref>` `` | Here is {ref}`My cool fig <my-fig-ref>`              |
| `` Here is [](my-fig-ref) ``               | Here is [](my-fig-ref)               |
| `` Here is [My cool fig](my-fig-ref) `` | Here is [My cool fig](my-fig-ref)              |
| `` Here is {numref}`my-fig-ref` ``            | Here is {numref}`my-fig-ref`            |
| `` Here is {numref}`Custom Figure %s text <my-fig-ref>` `` | Here is {numref}`Custom Figure %s text <my-fig-ref>` |

(references:tables)=
## Reference tables

To reference a table, first create a table and ensure that it has a `:name:` and a title:

````{example}
```{table} My table title
:name: my-table-ref

| header 1 | header 2 |
|---|---|
| 3 | 4 |
```
````

Here are several ways to reference this content:

| source                                         | result                                   |
|------------------------------------------------|------------------------------------------|
| `` Here is {ref}`my-table-ref` ``               | Here is {ref}`my-table-ref`               |
| `` Here is {ref}`My cool table <my-table-ref>` `` | Here is {ref}`My cool table <my-table-ref>`              |
| `` Here is [](my-table-ref) ``               | Here is [](my-table-ref)               |
| `` Here is [My cool table](my-table-ref) `` | Here is [My cool table](my-table-ref)              |
| `` Here is {numref}`my-table-ref` ``            | Here is {numref}`my-table-ref`            |
| `` Here is {numref}`Custom Table %s text <my-table-ref>` `` | Here is {numref}`Custom Table %s text <my-table-ref>` |


## Reference content files

To reference other files of book content, use the `{doc}` role, or link directly to another file with Markdown link syntax. For example:

| source                                         | result                                   |
|------------------------------------------------|------------------------------------------|
| `` Here is {doc}`../file-types/myst-notebooks.md` ``               | Here is {doc}`../file-types/myst-notebooks`               |
| `` Here is {doc}`A different page <../file-types/myst-notebooks.md>` `` | Here is {doc}`A different page <../file-types/myst-notebooks>`              |
| `` Here is [](../file-types/myst-notebooks.md) ``               | Here is [](../file-types/myst-notebooks.md)               |
| `` Here is [A different page](../file-types/myst-notebooks.md) `` | Here is [A different page](../file-types/myst-notebooks.md)              |

## Reference equations

To reference equations, first insert an equation with a label like so:

````{example}
```{math}
:label: my-math-ref
w_{t+1} = (1 + r_{t+1}) s(w_t) + y_{t+1}
```
````

To reference equations, use the `{eq}` role. It will automatically insert the number of the equation.
Note that you cannot modify the text of equation links.

For example:

- `` See Equation {eq}`my-math-ref` `` results in: See Equation {eq}`my-math-ref`
- `` See Equation [](my-math-ref) `` results in: See Equation [](my-math-ref).


(references:custom-text)=
## Choose the reference text

If you'd like to choose the text of the rendered reference link, use the following pattern:

```md
{someref}`your text here <reference-target>`
```

Above, `reference-target` is the reference to which you are referring, and `your text here` will be the displayed text on the page.

For example, see the following references:

```{example}
- {ref}`Here's another references section <content:references:labels>`
- {doc}`Here's the code outputs section <code-outputs>`
```

## Number your references

You can add **numbered references** to [tables](references:tables), [figures](references:figures), or [sections](references:numbered-sections).
To add a numbered reference to a table or figure, use the `{numref}` role.

### Use custom text with numbered references

If you are [using custom text](references:custom-text) with your references, use `%s` as a placeholder for the number.

```{example}
Here's {numref}`Custom Table %s text <my-table-ref>`.
```

See more examples in the sections linked above.

(references:numbered-sections)=
### Reference numbered sections

To reference numbered sections, you should first [enable numbered sections in your Table of Contents](toc/numbering).
Then, you may use the `{numref}` role in the same way that you use it for Figures or Tables.

(references:markdown-syntax)=
## Reference with markdown link syntax

If you wish to use Markdown style syntax, then MyST Markdown will try to find a reference from any of the above reference types (and more!).

This has an advantage, in that you can used nested markdown syntax in your text, for example:

```{example}

- [A **bolded _reference_** to a page](./myst.md)
- [A reference to a header](content:references:labels)
```

Leaving the title empty will mean the reference uses the target as text, for example:

```{example}
[](./myst.md)
```

:::{admonition} Internal vs. External URLs
:class: tip
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


## Check for missing references

You can check for missing references when building a Jupyter Book.
To do so, use the following options:

```bash
jupyter-book build -W -n --keep-going docs/
```

This will check for missing references (`-n`) and turn them into errors (`-W`),
but will still attempt to run the full build (`--keep-going`),
so that you can see all errors in one run.
