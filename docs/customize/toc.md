# Table of Contents structure

There are many ways in which you can control the table of contents for
your book. Most of them involve adding syntax to your `_toc.yml` file.

This page covers a few common options.

## Basic Table of Contents structure

```{note}
The {download}`_toc.yml file for this site <../_toc.yml>` has an entry for each
of the features described below for reference.
```

Let's take a look at an example `_toc.yml` file
for reference (it is a subset of this book's `_toc.yml` file):

```yaml
- file: intro

- header: Get started
- file: start/overview
- file: start/build

- header: Book pages and types
- file: content/markdown
- file: content/notebooks
- file: content/myst-notebooks

- header: Reference and test pages
- file: test_pages/test
  sections:
    - file: test_pages/layout_elements
    - file: test_pages/equations
```

```{warning}
The Table of Contents file *must* start with your book's first page. It cannot
start with a header
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

## Web-based Navigation Bar functionality

The following sections apply to controlling the left navigation bar in
HTML books built with Jupyter Book.

### Automatically expand subsections of a page

Sometimes you'd like some subsections of your book to *always* be expanded (as opposed
to only expanded when one of the subsections is active). To enable this, in an entry of
your `_toc.yml` file, add the following key:

```yaml
- file: path/to/your/page
  expand_sections: true
```

All subsections of that page will now be expanded in the Navigation Bar.

### Add section numbers to your book's pages

To automatically add section numbers to your book's navigation bar, use
the following configuration in your book's `_config.yml` file:

```yaml
html:
  navbar_number_sections: true
```

See {doc}`config` for more information on the `_config.yml` file.

### Add an external link to your navigation

You can also add external links to websites that are outside of your book.
To do so, use the following pattern:

```yaml
- url: https://yoururl.com
```

The URL will be placed alongside the links to other pages above and below the
entry.

## Automatically generate your `_toc.yml` file

You can use `jupyter-book` to *generate* a Table of Contents file from your book
using the filenames of your book's content. To do so, run the following command

```
jupyter-book toc mybookpath/
```

Jupyter Book will search `mybookpath/` for any [content files](../content-types/index)
and create a `_toc.yml` file out of them. There are a few considerations to keep in mind:

* Each sub-folder must have at least one content file inside it
* The ordering of files in `_toc.yml` will depend on the alpha-numeric order of
  the filenames (e.g., `folder_01` comes before `folder_02`, and `apage` comes
  before `b_page`)
* If there is a file called `index.md` in any folder, it will be listed first.

You may also **generate navigation bar *titles* from each file of your book**.
If you do so, note that if the file name begins with `<integer>_filename.md`, then
the `<integer>` part will be removed before it is inserted into `_toc.yml`.
