# Table of Contents configuration and structure

There are many ways in which you can control the table of contents for
your book. Most of them involve adding syntax to your `_toc.yml` file.

```{sidebar} HTML vs. PDF outputs
Note that some TOC options may only trigger behavior in HTML or PDF outputs,
respectively.
```

This page covers a few common options.

```{note}
The {download}`conf.py file for this site <../_toc.yml>` has an entry for each
of the features described below for reference.
```

## Basic Table of Contents structure

Let's take a look at an example `_toc.yml` file
for reference (it is a subset of this book's `_toc.yml` file):

```yaml
- header: Jupyter Book Guide
- file: start/01_overview
  title: Get started with Jupyter Book
  sections:
  - file: start/02_create
  - file: start/03_build
- file: use/index
  expand_sections: true
  sections:
    - file: use/notebooks
    - file: use/myst

- header: Reference and test pages
- file: test_pages/test
  sections:
    - file: test_pages/layout_elements
    - file: test_pages/equations
```

### The top-layer of `_toc.yml`

The top layer of entries in your Table of Contents is treated differently from everything
underneath. There are roughly two items to consider when building your Table of Contents: **headers**
and **files**.


#### Headers

**Headers** (optional) define logical groups of files that follow, and give that group of files
a title. You can think of headers as defining a **chapter** of pages in your book. If your `_toc.yml`
has no `- header` entries in it, then all of the top-level files will be treated as a single chapter
of pages.

Here is an example header entry, with a few files that follow:

```yaml
- header: My chapter name
- file: filea
- file: fileb
```

(toc/files)=
#### Files

**Files** point to a single file of content in your book's folder. They will
become a section of content in your book (in the order that they are provided in
the `_toc.yml` file). Files may also have a title that will be used in the Table of Contents
for HTML outputs (though it will *not* change the title of the page itself).

Here is an example file entry:

```yaml
- file: path/to/myfile
  title: My alternate page title
```

Additionally, **files can have subsections of pages**. These subsections allow you
to define hierarchical structure in your book. For example, you may wish for the top-level
file to serve as an "introduction" for a collection of files underneath, like so:

```yaml
- file: my_intro
  sections:
    - file: my_first_page
    - file: my_second_page
      sections:
        - file: my_second_page_subsection
```

We recommend nesting your sections no more than 3 layers deep (as shown above).

## Web-based Table of Contents functionality

The following sections apply to HTML books built with Jupyter Book.

### Automatically expand subsections of a page

Sometimes you'd like some subsections of your book to *always* be expanded (as opposed
to only expanded when one of the subsections is active). To enable this, in an entry of
your `_toc.yml` file, add the following key:

```yaml
- file: path/to/your/page
  expand_sections: true
```

All subsections of that page will now be expanded in the Table of Contents.
