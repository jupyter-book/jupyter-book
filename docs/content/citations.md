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
   the BibTex reference style. Here's the example from above:

   ```
   @InProceedings{ project_jupyter-proc-scipy-2018,
     author    = { {P}roject {J}upyter and {M}atthias {B}ussonnier and {J}essica {F}orde and {J}eremy {F}reeman and {B}rian {G}ranger and {T}im {H}ead and    {C}hris {H}oldgraf and {K}yle {K}elley and {G}ladys {N}alvarte and {A}ndrew {O}sheroff and {M} {P}acer and {Y}uvi {P}anda and {F}ernando {P}erez and    {B}enjamin {R}agan-{K}elley and {C}arol {W}illing },
     title     = { {B}inder 2.0 - {R}eproducible, interactive, sharable environments for science at scale },
     booktitle = { {P}roceedings of the 17th {P}ython in {S}cience {C}onference },
     pages     = { 113 - 120 },
     year      = { 2018 },
     editor    = { {F}atih {A}kici and {D}avid {L}ippa and {D}illon {N}iederhut and {M} {P}acer },
     doi       = { 10.25080/Majora-4af1f417-011 }
   }
   ```
3. **Add a citation**. In your content, add the following text to include a citation

   ```
   {cite}`mybibtexcitation`
   ```

   For example, this text

   ```
   {cite}`project_jupyter-proc-scipy-2018`
   ```

   generates this citation: {cite}`project_jupyter-proc-scipy-2018`

   You can also include multiple citations in one go, like so:

   ```
   {cite}`project_jupyter-proc-scipy-2018,holdgraf_rapid_2016`
   ```

   becomes {cite}`project_jupyter-proc-scipy-2018,holdgraf_rapid_2016`.

4. **Add a bibliography**. Use the following directive to do so:

   ````
   ```{bibliography} path/to/references.bib
   ```
   ````

   This will generate a bibliography for your entire bibtex file, like so:

   ```{bibliography} ../references.bib
   ```

When your book is built, the bibliography and citations will now be included.

````{note}
Adding citations and cross-references to your book might require that you re-build
your book from scratch in order to ensure that these references and links are resolved
correctly. If you run into errors, try cleaning your book's `_build/` folder
by running this command:

```
jupyter-book clean mybookname/
```

See {ref}`clean-build` for more information.
````

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

```
(labels-and-refs)=
## Labels and cross-references
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
