(tutorials:references)=
# Get started with references

References allow you to refer to other content in your book or to external content.
They allow you to automatically generate links to that content, or to add extra information like *numbers* to the reference.

Citations and bibliographies allow you to cite scholarly work and provide bibliographies that allow readers to follow the references.

This tutorial covers the basics of setting up **references** as well as **citations and bibliographies** for your book.

:::{seealso}
For more information about citation and reference syntax, see the [`sphinxcontrib-bibtex` documentation](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/usage.html#roles-and-directives).
Note that this documentation is written with rST syntax in mind and you'll need to adapt the directive/role syntax for your Markdown content.
:::

## Prerequisites

This tutorial assumes that you've either created a demo Jupyter Book from [](../start/your-first-book.md), or that you've got your own Jupyter Book to work from.

## Basic structure of a reference

Cross-references in Jupyter Book usually involve two things:

1. Create a **label** for something.
   This is the thing you'll refer to later in your reference.
2. Create a reference with a **target**.
   This target is usually the label you created in `#1`.

## Create a label

First, we'll create a label.
Labels must come just before headers.
You can then refer to them elsewhere in your text.

To start with, create a new markdown file in your book (or edit a pre-existing one).
Add a markdown header with a label like so:

```md
(my-label)=
## My header

Some text
```

This is how you specify a label called `my-label` that points to the header just below (`## My header`).

:::{margin}
You can also reference labels in this way with the following syntax:

```
Some text and {ref}`my-label`
```
:::

## Refer to your label

Now that you've created a label, you can refer to it from elsewhere.
Try adding the following markdown on the same page (or some other page).

```md
Here's some text and [here's my label](my-label).
```

Now re-build your book's HTML:

```bash
jb build pathto/mybook
```

You should see that your reference has been replaced with a link to the right spot on the page.

## Create a citation

Next, we'll add a *citation*.

### Create a bibtex file

You'll need a [bibtex](http://www.bibtex.org/) file to store the information for your citations.
In this case, we'll create an empty bibtex file and populate it with one reference.

```bash
touch references.bib
```

Next, configure your book to include this bibtex file, like so:

```yaml
# In _config.yml
bibtex_bibfiles:
    - references.bib
```

This will activate the [`sphinxcontrib.bibtex` extension](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/)

Finally, note that the default reference style is `label` which shows up as an in-line link in the rendered HTML as [ABC21]; it is [described in detail here](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/usage.html#referencing-style) along with other styles.
You can adjust the reference style in your book's `_config.yml` file like so:

```yaml
# In _config.yml
sphinx:
  config:
    bibtex_reference_style: author_year
```

### Add your references

Add some references to your BibTex file. Here's an example citation:

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

:::{seealso}
See
[the BibTex documentation](http://www.bibtex.org/Using/) for information on
the BibTex reference style.
:::


### Add a citation

In your content, add the following syntax to include a citation:

```md
Here is my nifty citation {cite}`perez2011python`.
```

Re-build your book, and it should look like this:

Here is my nifty citation {cite}`perez2011python`.

### Add multiple citations at once

Now try adding multiple citations at once by separating each one with a comma.

Add the following text to your page:

```md
Here are multiple citations {cite}`perez2011python,holdgraf_rapid_2016,RePEc:the:publsh:1367,caporaso2010qiime`!
```

when you build your book, it should look like this:

Here are multiple citations {cite}`perez2011python,holdgraf_rapid_2016,RePEc:the:publsh:1367,caporaso2010qiime`!

## Add a bibliography

Finally, we'll generate a bibliography for our citations.
Links to this bibliography will automatically be created when you cite something.

We'll use the `{bibliography}` directive to add one to our book.
Add the following to your page:

````md
```{bibliography}
```
````

This will generate the bibliography of all citations in your book.
See the bibliography below for an example.

:::{seealso}
For more information about configuring and using citations and bibliographies, see [](content:references).
:::

## Bibliography

An example bibliography, for reference:

```{footbibliography}
```
