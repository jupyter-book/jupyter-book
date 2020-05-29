---
jupytext:
  formats: ipynb,md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: '0.8'
    jupytext_version: 1.4.1+dev
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Citations and cross-references

Because `jupyter-book` is built on top of {term}`Sphinx`, we can use the excellent
[sphinxcontrib-bibtex](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/)
extension to include citations and a bibliography with your book.

## Citations and bibliographies

You can add citations and bibliographies using references that are stored in a
`bibtex` file that is in your book's folder. You can then add a citation in-line in your
markdown with the **`{cite}`** role, and add a bibliography from your bibtex file
with the `{bibliography}` directive.

**To add citations to your book**, take the following steps:

1. **Create a references bibtex file**.

   ```
   touch references.bib
   ```

2. **Add references**. Add some references to your BibTex file. See
   [the BibTex documentation](http://www.bibtex.org/Using/) for information about
   the BibTex reference style. Here's an example citation:

   ```
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
3. **Add a citation**. In your content, add the following text to include a citation

   ```
   {cite}`mybibtexcitation`
   ```

   For example, this text

   ```
   {cite}`perez2011python`
   ```

   generates this citation: {cite}`perez2011python`

   You can also include multiple citations in one go, like so:

   ```
   {cite}`perez2011python,holdgraf_rapid_2016,RePEc:the:publsh:1367,caporaso2010qiime`
   ```

   becomes {cite}`perez2011python,holdgraf_rapid_2016,RePEc:the:publsh:1367,caporaso2010qiime`.

4. **Add a bibliography**. Use the following directive to do so:

   ````
   ```{bibliography} path/to/references.bib
   ```
   ````

   This will generate a bibliography for your entire bibtex file. See
   [the bibliography at the end of this page](citations/bibliography) for an example.


When your book is built, the bibliography and citations will now be included.

`````{warning}
If you are adding a bibliography to a *different* page from your references, then
you may need to ensure that page is processed last, which Sphinx does alphabetically.
For example, name the file `zreferences.rst`.

See [this `sphinxcontrib-bibtex` section](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/usage.html#unresolved-citations-across-documents)
for more information.
`````

This feature uses [`sphinxcontrib-bibtex`](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/usage.html#roles-and-directives)
under the hood, see its documentation for more information on how to use and configure
bibliographies in your book. Though note the documentation
is written for rST and you'll need to adapt the directive/role syntax for your
markdown content.

(labels-and-refs)=
## Cross-references and labels

Labels are a way to add tags to parts of your content that you can reference
later on. This is helpful if you want to quickly insert links to other
parts of your book. Labels can be added before major elements of a page,
such as titles or figures.

To add a label, use the following pattern **before** the element you wish
to label:

```
(my-label)=
# The thing to label
```

For example, we've added the following label above the header for this section:

```md
(labels-and-refs)=
## Cross-references and labels
```

You can insert cross-references to labels in your content with the following
syntax: `` {ref}`label-text` ``. For example, the following syntax:
`` {ref}`labels-and-refs` `` results in a link to this section like so:
{ref}`labels-and-refs`.

### Referencing your book's content

There are a few ways to reference your book's content, depending on what kind of
content you'd like to reference. Here is a quick overview of some common options:

* `{ref}` is used to reference section labels that you define or figures with a `name` value
* `{numref}` is used to provide *numbered* references to figures
* `{doc}` is used to reference other files in your book
* `{eq}` is used to reference equations that have been given a `label` value

```{tip}
You can reference a section label through ``{ref}`label` `` or ``{ref}`some text <label>` ``.
Documents can be referenced through ``{doc}`path/to/document` `` or ``{doc}`some text <path/to/document>` ``
```

(citations/bibliography)=
## Bibliography

```{bibliography} ../references.bib
```
