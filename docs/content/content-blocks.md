---
substitutions:
  key1: "I'm a **substitution**"
  key2: |
    ```{note}
    {{ key1 }}
    ```
  fishy: |
    ```{image} /images/fun-fish.png
    :alt: fishy
    :width: 200px
    ```
  jinja: "[Jinja templates](https://jinja.palletsprojects.com/en/2.11.x/)"
  repo_name: "jupyter-book"
  repo_url: "[my repo url](https://github.com/executablebooks/jupyter-book)"
---

# Special content blocks

A common use of directives and roles is to designate "special blocks" of your content.
This allows you to include more complex information such as warnings and notes, citations, and figures.
This section covers a few common ones.

% REMOVE when version is >= 0.14
:::{admonition} Upgrading from `sphinx-panels`
Previous versions of Jupyter Book used `sphinx-panels` to define major UI elements.
These now use [Sphinx Design instead](https://sphinx-design.readthedocs.io).
Documentation for these UI elements is now in [](components.md).
See [the migration guide](https://sphinx-design.readthedocs.io/en/latest/get_started.html#migrating-from-sphinx-panels) and [this migration discussion issue](https://github.com/executablebooks/sphinx-design/issues/51) for more information.
:::

(content-blocks:myst-extensions)=
## MyST syntax extensions

{term}`MyST Markdown` has a base syntax that it supports, and additional syntax can be enabled to add extra functionality.
By default, Jupyter Book enables a few extra syntax pieces for MyST in order to more closely resemble the Markdown experience in Jupyter Notebooks and interfaces.
These extensions are:

`dollarmath`
: To support `$$` and `$` syntax for math blocks. See [](./math.md).

`linkify`
: To auto-detect HTML-like links in your markdown and convert them to hyperlinks.

`substitution`
: To allow you to define markdown "variables" and substitute text in using them. See [](content:substitutions).

`colon_fence`
: To allow you to use `:::` fences for admonitions, in order to make them easier to render in interfaces that do not support MyST. See [](admonitions:colons).

To enable your own syntax extensions, use the following configuration pattern:

```yaml
parse:
  myst_enable_extensions:
    - extension-1
    - extension-2
```

Note that this will **override** the default Jupyter Book extension list.
You should include all of the extensions that you want to be enabled.

:::{seealso}
For a list of syntax extensions in MyST, see [the MyST documentation](https://myst-parser.readthedocs.io/en/latest/using/syntax-optional.html).
:::

(content:admonitions)=
## Notes, warnings, and other admonitions

Let's say you wish to highlight a particular block of text that exists slightly apart from the narrative of your page.
You can use the **`{note}`** directive for this.

For example:

````{example}
```{note}
Here is a note!
```
````

````{margin} A note on nesting
You can nest admonitions (and other content blocks) inside one another. For example:

:::{note}
Here's a note block inside a margin block
:::

See {ref}`markdown/nesting` for instructions to do this.
````

There are a number of similarly-styled blocks of text. For example, here is a `{warning}`
block:

`````{warning}
Here's a warning! It was created with:
````
```{warning}
```
````
`````

You can also create **dropdown admonitions** by adding a `dropdown` class to an admonition.
For example:

:::{note}
:class: dropdown
Here's a dropdown note!
See [](components:dropdowns) for more details.
:::

For a complete list of options, see [the `sphinx-book-theme` documentation](https://sphinx-book-theme.readthedocs.io/en/latest/reference/kitchen-sink/paragraph-markup.html#admonitions).

### Blocks of text with custom titles

You can also choose the title of your message box by using the
**`{admonition}`** directive. For example:

````{example}
```{admonition} Here's your admonition
Here's the admonition content
```
````

If you'd like to **style these blocks**, then use the `:class:` option. For
example:

``````{example}
`````{admonition} This admonition was styled...
:class: tip
With a tip class!
`````
``````

(admonitions:colons)=
### Markdown-friendly directives with `:::`

The admonition syntax above utilises the general [directives syntax](content:myst/directives).
However, if you're using an interface that does not support {term}`MyST Markdown`, it will render as a raw literal block.
Many directives contain markdown inside, and if you'd like this markdown to render "normally", you may also use `:::` fences rather than ` ``` ` fences to define the directive. As a result, the contents of the directive will be rendered as markdown.


For example:

````{example}

:::{note}
This text is **standard** _Markdown_
:::
````

Similar to normal directives, these admonitions can also be nested:

`````{example}

::::{important}
:::{note}
This text is **standard** _Markdown_
:::
::::
`````

:::{note}
You can use this syntax for any kind of directive, though it is generally recommended to use only with directives that contain pure markdown in their content.
:::

### Insert code cell outputs into admonitions

If you'd like to insert the outputs of running code *inside* admonition
blocks, we recommend using [`glue` functionality](content:code-outputs:glue).
For example, we'll insert one of the outputs that was glued into the book from the [code outputs page](./code-outputs.md).

For example:

````{example}

```{note}
Here's my figure:

```{glue:figure} sorted_means_fig
```

````

See [](content:code-outputs:glue) for more information on how to use `glue` to insert your outputs directly into your content.

:::{tip}
To hide code input and output that generated the variable you are inserting, use the `remove_cell` tag.
See [](../interactive/hiding.md) for more information and other tag options.
:::

(content-blocks:html-admonitions)=
### HTML admonitions

A drawback of admonition syntax is that it will not render in interfaces that do not support this syntax (e.g., GitHub). If you'd like to use admonitions that are defined *purely with HTML*, MyST can parse them via the `html_admonitions` extension. To use it, first enable it with the following configuration:

```yaml
parse:
  myst_enable_extensions:
    # don't forget to list any other extensions you want enabled,
    # including those that are enabled by default!
    - html_admonition
```

Then, you may define admonitions in your book like so:

````{example}
```html
<div class="admonition note" name="html-admonition" style="background: lightgreen; padding: 10px">
<p class="title">This is the **title**</p>
This is the *content*
</div>
```
````

See [](myst-parser:syntax/html-admonition) for more information about HTML admonitions.

(content-blocks:warning-headers-admonitions)=
### Do not embed headings inside admonitions

You should **not** embed headings (lines starting with `#`) inside of admonitions, dropdowns, or other content blocks such as this.
Sphinx (and thus Jupyter Book) uses headings to define the major top-level sections of a document.
For this reason, nesting a heading within a block will cause unpredictable breakage of the document structure.

`````{admonition} Do not do this
:class: warning
For example, **do not do this**:

````
```{note}
## This heading is inside an admonition, and will mess things up!

Don't do this!
```
````
`````

To achieve a similar effect, write some **bold text** instead of using a markdown header.

(content/definition-lists)=

## Definition lists

Definition lists are enabled by defining the following setting in your `_config.yml`:

```yaml
parse:
  myst_enable_extensions:
    # don't forget to list any other extensions you want enabled,
    # including those that are enabled by default!
    - deflist
```

Definition lists utilise the [markdown-it-py deflist plugin](https://markdown-it-py.readthedocs.io/en/latest/plugins.html), which itself is based on the [Pandoc definition list specification](http://johnmacfarlane.net/pandoc/README.html#definition-lists).

Here's an example:

````{example}
Term 1
: Definition

Term 2
: Definition
````

From the [Pandoc documentation](https://pandoc.org/MANUAL.html#definition-lists):

> Each term must fit on one line, which may optionally be followed by a blank line, and must be followed by one or more definitions.
> A definition begins with a colon or tilde, which may be indented one or two spaces.
>
> A term may have multiple definitions, and each definition may consist of one or more block elements (paragraphs, code blocks, lists, etc.)

Here is a more complex example, demonstrating some of these features:

```{example}
Term *with Markdown*
: Definition [with reference](content/definition-lists)

  A second paragraph
: A second definition

Term 2
  ~ Definition 2a
  ~ Definition 2b

Term 3
:     A code block
: > A quote
: A final definition, that can even include images:

  <img src="../images/fun-fish.png" alt="fishy" width="200px">
```

## Quotations and epigraphs

Quotations and epigraphs provide ways to highlight information given by others.

### Quotations

**Regular quotations** are controlled with standard Markdown syntax, i.e., by
inserting a caret (`>`) symbol in front of one or more lines of text. For example:

````{example}
> Here is a cool quotation.
>
> From me, Jo the Jovyan
````

### Epigraphs

**Epigraphs** draw more attention to a quote and highlight its author. You should
keep these relatively short so that they don't take up too much vertical space. Here's
how an epigraph looks:

`````{example}
```{epigraph}
Here is a cool quotation.

From me, Jo the Jovyan
```
`````

You can provide an **attribution** to an epigraph by adding `--` to the final line, followed by the quote author. For example:

`````{example}
```{epigraph}
Here is a cool quotation.

-- Jo the Jovyan
```
`````

(content-blocks:glossaries)=
## Glossaries

Glossaries allow you to define terms in a glossary so you can then link back to it
throughout your content. You can create a glossary with the following
syntax:

````{example}
```{glossary}
Term one
  An indented explanation of term 1

A second term
  An indented explanation of term2
```
````

To reference terms in your glossary, use the `{term}` role. For example,
`` {term}`Term one` `` becomes {term}`Term one` and `` {term}`A second term` ``
becomes {term}`A second term`.

:::{note}
Glossary terms are automatically added to [your book's index page](content:indexes).
:::

(content:indexes)=
## Indexes

Indexes allow you to define index items (terms, phrases, keywords, etc) that are collected in a single page, with links back to their location in your content.
This is called the **General Index**.

```{index} General Index
```

When you build your book, a general index page will automatically be generated.

### Reference your general index

To create a reference / link to your general index, use the `genindex` keyword.
For example:

- `` {ref}`using a ref role <genindex>` ``: {ref}`using a ref role <genindex>`
- `[using markdown link syntax](genindex)`: [using markdown link syntax](genindex)
- `[](genindex)`: [](genindex) (to demonstrate the title of the general index)


### The `{index}` directive

You can add items to your general index with the `{index}` directive.
It has the following syntax:

````md
```{index} Entry name
```
````

This will not insert anything into your final page's content, but will add a link to this section in your general index.
For example"

````{example}
```{index} index directive
```
````

You can [find this term in the index](genindex).

#### Add a label to your `{index}` directive

You can customize the name for an index entry by setting the `:name:` parameter.
For example:

````{example}
```{index} Index names
:name: index-names
```
````

You can then reference this index in your book.
For example:

- `` {ref}`See index names <index-names>` ``: {ref}`See index names <index-names>`
- `[See index names](index-names)`: [See index names](index-names)

#### Create more complex index entries

The Sphinx [*Index-generating markup*](https://www.sphinx-doc.org/en/master/usage/restructuredtext/directives.html?highlight=index#index-generating-markup) page describes the full range of indexing possibilites.
This includes the ability to construct nested headings using the `;` separator to represent a change in index level:

````md
```{index} single: Jupyter Book ; installation
```
````

Multiple index entry terms can be created from a single reference.
For example, we can create entries `references ; index terms` and `index terms ; references` from the following entry:

````md
```{index} double: references ; index terms
```
````

Readers can be directed towards alternative index terms within the index itself by using `see` or `seealso`, as in the following example which adds an entry for `citations` to also refer to `bibliographies`:

````md
```{index} seealso: citations ; bibliographies
```
````

### Create index entries with other extensions

You can also create index entries through the use of other Sphinx extensions.
For example, any term you define [in a Glossary](content-blocks:glossaries) will also be inserted into the index.

### Add the general index to your table of contents

To add your general index to your book's table of contents, take the following steps:

- Create a file in the root of your book called `genindex.md`.
- It **must have a title** but the rest can be blank.
  The title will actually be replaced with `Index` when your book is built, but it is needed in your source file to avoid errors.
- Add an entry for this page in [your table of contents](structure:book).
  For example:

  ```yaml
  format: jb-book
  root: index
  chapters:
  - file: path/to/chapter1
  - file: path/to/chapter2
  - file: genindex
  ```

(content:substitutions)=
## Substitutions and variables in markdown

Substitutions allow you to define **variables** in the front-matter of your page, and then **insert** those variables into your content throughout.

To use a substitution, first add front-matter content to the top of a page like so:

````yaml
---
substitutions:
  key1: "I'm a **substitution**"
  key2: |
    ```{note}
    {{ key1 }}
    ```
  fishy: |
    ```{image} img/fun-fish.png
    :alt: fishy
    :width: 200px
    ```
---
````

You can use these substitutions inline or as blocks, and you can even nest substitutions in other substitutions (but circular references are prohibited):

```{example}
Inline: {{ key1 }}

Block level:

{{ key2 }}

```

You can also insert substitutions inside of other markdown structures like tables:

````{example}
| col1     | col2      |
| -------- | --------- |
| {{key2}} | {{fishy}} |
````

:::{seealso}
For more information about Substitutions, see [](myst-parser:syntax/substitutions).
:::

### Define substitutions for your whole book

You can also define book-level substitution variables with the following configuration:

```yaml
parse:
  myst_substitutions:
    key: value
```

These substitutions will be available throughout your book. For example, the global substitution key `my-global-substitution` is defined in this book's `_config.yml` file, and it produces: {{ sub3 }}.

### Formatting substitutions

MyST substitutions use {{ jinja }} in order to substite in key / values. This means that you can apply any standard Jinja formatting to your substitutions. For example, you can **replace text in your substitutions** like so:

```{example}
The original key1: {{ key1 }}

{{ key1 | replace("a substitution", "the best substitution")}}
```

### Using substitutions in links

If you'd like to use substitutions to insert and modify **links** in your book, here are two options to explore:

1. **Define the entire markdown link as a variable**. For example:
   ```yaml
   substitutions:
     repo_url: [my repo url](https://github.com/executablebooks/jupyter-book)
   ```

   ```{example}
   Here's my link: {{ repo_url }}
   ```
2. Use Jinja features to insert the variable.
   Because substitutions use {{ jinja }}, you also have access to **Python formatting** operations in your substitution.
   For example:
   ```yaml
   substitutions:
     repo_name: jupyter-book
   ```
   ```{example}
   Here's my link: {{ '[my repo: `{repo}`](https://github.com/executablebooks/{repo})'.format(repo=repo_name) }}
   ```

## Citations and cross-references

You can add citations and cross-references to your book. See
{doc}`citations` for more information on how to do this.

## Figures

You can thoroughly customise the look of figures in your book. See {doc}`figures` for
more information.

## Sidebar content

You can also use MyST to control various aspects of the page layout. For more
information on this, see {doc}`layout`.

## Footnotes

You can include footnotes in your book using standard Markdown syntax.
This will include a numbered reference to the footnote in-line, and append the footnote
to a list of footnotes at the bottom of the page.

To create a footnote, first insert a reference in-line with this syntax: `[^mylabel]`.
Then, define the text for that label like so:

```md
[^mylabel]: My footnote text.
```

You can define `[^mylabel]` anywhere in the page, though its definition will always
be placed at the bottom of your built page. For example, here's a footnote [^mynote]
and here's another one [^mynote2]. You can click either of them to see the footnotes
at the bottom of this page.

[^mynote]: Here's the text of my first note.
[^mynote2]: And the text of my second note.
            Note that
            [you can include Markdown footnote definitions](https://executablebooks.org).
