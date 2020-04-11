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

# Citations and references

```{warning}
✨✨experimental✨✨
```

+++

Because `jupyter-book` is built on top of Sphinx, we can use the excellent
[sphinxcontrib-bibtex](https://sphinxcontrib-bibtex.readthedocs.io/en/latest/)
extension to include citations and a bibliography with your book.

## How to use citations

Including citations with your markdown files or notebooks is done in the following
way.

1. Modify the file in `_bibliography/references.bib`. This has a few sample citations
in bibtex form. Update as you wish!
2. In your content, add the following text to include a citation

   ```
   {cite}`mybibtexcitation`
   ```

   For example, this text

   ```
   {cite}`holdgraf_rapid_2016`
   ```

   generates this citation: {cite}`holdgraf_rapid_2016`

   You can also include multiple citations in one go, like so:

   ```
   {cite}`holdgraf_evidence_2014,holdgraf_portable_2017`
   ```

   becomes {cite}`holdgraf_evidence_2014,holdgraf_portable_2017`.

3. Generate a bibliography on your page by using the following text:

   ````
   ```{bibliography} path/to/your/bibtexfile.bib
   ```
   ````

   This will generate a bibliography for your entire bibtex file, like so:

   ```{bibliography} ../references.bib
   ```

When your book is built, the bibliography and citations will now be included.
