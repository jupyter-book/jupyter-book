# Special content blocks with MyST

A common use of directives and roles is to designate "special blocks" of your
content. This allows your to include more complex information such as warnings
and notes, citations, and figures. This section covers a few common ones.

(content-blocks-images)=
## Images

You can add images with more control using MyST markdown.

````{margin}
Note that the traditional way to add images with CommonMark will still work.
For example:
```
![cool!](../images/cool.jpg)
```
````

If you'd like more control over an image, use the following
MyST markdown syntax:

````
```{image} ../images/cool.jpg
:alt: cool!
:height: 100px
```
````

This allows you to control aspects of the image with
{ref}`directive arguments <directive-arguments>`. For example, here we have
controlled both the *alternative text* as well as the *height* of the image.
Using html to control your image appearance is discouraged. If you insist,
read more about {ref}`using raw html in Markdown <raw-html-in-markdown>`.

For a list of all of the options you can supply to `image`, see the
[reStructured Text image documentation](https://docutils.sourceforge.io/docs/ref/rst/directives.html#image).

## Notes and warnings

Let's say you wish to highlight a particular block of
text that exists slightly apart from the narrative of your page. You can
use the **`{note}`** directive for this.

For example, the following text:

````
```{note}
Here is a note!
```
````

Results in the following output:

```{note}
Here is a note!
```

Another common directive that result in similar output is **`{warning}`**.

Finally, you can choose the title of your message box by using the
**`{admonition}`** directive. For example, the following text:

````
```{admonition} Here's your admonition
Here's the admonition content
```
````

Results in the following output:

```{admonition} Here's your admonition
Here's the admonition content
```

## Quotations and epigraphs

Quotations and epigraphs provide ways to highlight information given by others.
They behave slightly differently.

**Regular quotations** are controlled with standard markdown syntax, i.e., by
putting a caret (`>`) symbol in front of one or more lines of text. For example,
the following quotation:

> Here is a cool quotation.
>
> From me, Jo the Jovyan

Was created with this text:

```
> Here is a cool quotation.
>
> From me, Jo the Jovyan
```

**Epigraphs** draw more attention to a quote and highlight its author. You should
keep these relatively short so that they don't take up too much vertical space. Here's
how an epigraph looks:

```{epigraph}
Here is a cool quotation.

From me, Jo the Jovyan
```

Was generated with this markdown:

````
```{epigraph}
Here is a cool quotation.

From me, Jo the Jovyan
```
````

You can provide an **attribution** to an epigraph by adding `--` to the final line, followed
by the quote author. For example:

```{epigraph}
Here is a cool quotation.

-- Jo the Jovyan
```

Was generated with this markdown:

````
```{epigraph}
Here is a cool quotation.

-- Jo the Jovyan
```
````

## Section Table of Contents

If you've got a content file that has "sections" underneath it, then you can
display a Table of Contents on the parent page by using the following syntax:

````
```{tableofcontents}
```
````

It will display a list of all sub-pages underneath the current page. See
{doc}`../content-types/index` for an example of its usage.

## Glossaries

Glossaries allow you to define terms in a glossary, and then link back to the
glossary throughout your content. You can create a glossary with the following
syntax:

````
```{glossary}
term one
  An indented explanation of term 1

A second term
  An indented explanation of term2
```
````

which creates:

```{glossary}
term one
  An indented explanation of term 1

A second term
  An indented explanation of term2
```

To reference terms in your glossary, use the `{term}` role. For example,
`` {term}`term one` `` becomes {term}`term one`. And `` {term}`A second term` ``
becomes {term}`A second term`.

## Citations and cross-references

You can add citations and cross-references to your book's content. See
{doc}`citations` for more information.

## Figures

You can control many aspects of figures in your book. See {doc}`figures` for
more information.

## Page layout and sidebar content

You can also use MyST to control various aspects of the page layout. For more
information on this, see {doc}`layout`.


[myst-parser]: https://myst-parser.readthedocs.io/en/latest/
