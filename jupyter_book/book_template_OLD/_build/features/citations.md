---
interact_link: content/features/citations.ipynb
kernel_name: python3
title: 'Citations and bibliographies'
prev_page:
  url: /features/interact
  title: 'Connecting content with JupyterHub and Binder'
next_page:
  url: /features/search
  title: 'Searching your book'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---

# Including citations in your book

Because `jupyter-book` is built on top of Jekyll, we can use the excellent
[jekyll-scholar](https://github.com/inukshuk/jekyll-scholar) book to
include citations and a bibliography with your book.

**Note that this only works if you're building your book HTML locally and
hosting the HTML files online somewhere**. This can still use GitHub pages, but
not the auto-generation of a cite from markdown files feature of GitHub pages.
This is because GitHub pages doesn't include the `jekyll-scholar` plugin.

## How to use citations

Including citations with your markdown files or notebooks is done in the following
way.

1. Modify the file in `_bibliography/references.bib`. This has a few sample citations
in bibtex form. Update as you wish!
2. In your content, add the following text to include a citation
   
   ```
   {% raw %}{% cite bibtex_shortname %}{% endraw %}
   ```
   
   For example, this text: `{% raw %}{% cite holdgraf_evidence_2014 %}{% endraw %}` generates this citation: {% cite holdgraf_evidence_2014 %}
   
   You can also include multiple citations in one go, like so:
   
   `{% raw %}{% cite holdgraf_evidence_2014 holdgraf_portable_2017 ruby %}{% endraw %}` becomes {% cite holdgraf_evidence_2014 holdgraf_portable_2017 ruby %}
   
3. Generate a bibliography on your page by using the following text:

   ```
   {% raw %}{% bibliography %}{% endraw %}
   ```
   
   This will generate a bibliography for your entire bibtex file. If you'd like to restrict teh
   bibliography to only the citations you've used on a page, use the following syntax:
   
   ```
   {% raw %}{% bibliography --cited %}{% endraw %}
   ```
   
When your book is built, the bibliography and citations will now be included. For example,
see the Bibliography generated below!

## References

{% bibliography --cited %}
