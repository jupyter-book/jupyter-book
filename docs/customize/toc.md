# Table of Contents structure

There are many ways in which you can control the table of contents for
your book. Most of them involve adding syntax to your `_toc.yml` file.

This page covers a few common options.

```{note}
The {download}`_toc.yml file for this site <../_toc.yml>` has an entry for each
of the features described below for reference.
```

For reference, here is an example from this book's `_toc.yml` file:

```yaml
- file: intro
  numbered: true

- chapter: Get started
  sections:
  - file: start/overview
  - file: start/build

- chapter: Book pages and types
  sections:
  - file: content/markdown
  - file: content/notebooks

- chapter: Reference and test pages
  sections:
  - file: test_pages/test
    sections:
      - file: test_pages/layout_elements
      - file: test_pages/equations
```

## The top-layer of `_toc.yml`

The top layer of entries in your Table of Contents is treated differently
from everything underneath.

The first entry (`- file: intro` above) defines the introductory page for your book.
It is also where you can control some behavior for the entire book (in the example
above, we set `numbered: true` to number *all* sections of the book).

Below the first entry, you have two options for defining the structure of your book.

1. **A list of `- file:` entries.** Each file will be treated as a **chapter**.
   Below is an example `_toc.yml` file with this structure:

   ```yaml
   - file: intro
   - file: firstchapter
   - file: secondchapter
   ```

2. **A list of `- chapter:` entries with sections.** If you provide a title for
   the chapter (as above), then each file will become a *section* in that chapter.
   If no title is given, each file will be its own chapter (this is useful if you
   want to configure your files in groups). Below is an example `_toc.yml` file with
   this structure:

   ```yaml
   - file: intro
   - chapter: My first chapter
     sections:
     - file: firstsection
     - file: secondsection
   - chapter: My second chapter
     sections:
     - file: firstsection
   ```

```{admonition} Don't mix these two structures
When designing the top-level sections of your `_toc.yml` file, you must
pick *either* a list of files, or groups of files via `- chapter:` entries. You
cannot intermix them both.
```

(toc/files)=
### Files

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

## Number your book's sections

You can automatically add numbers to each section of your book. To add numbers
to **all sections of your book**, add the `numbered: true` flag to
your introduction page entry (the first entry in `_toc.yml`). For example:

```yaml
- file: home
  numbered: true
- file: page2
- file: page3
- file: page4
```

This will cause all sections of the book to be
numbered. They will follow a hierarchy according to the sub-sections structure
defined in your `_toc.yml` file.

If you'd like to number **subsets of sections**, group them into chapters and
apply the `numbered: true` flag to the chapters that you wish to be numbered.
For example:

```yaml
- file: home
  numbered: true
# This chapter will not be numbered
- chapter: Introduction
  sections:
  - file: page2
# This chapter will be numbered
- chapter: Chapter 1
  numbered: true
  sections:
  - file: page3
  - file: page4
```

### Numbering caveats and notes

Jupyter Book relies on {term}`Sphinx` to apply section numbering, and this has a
few quirks to it. Here are a few gotchas:

* **Numbering applies to _sections_ of your page**.
  Note that when you add numbering to a section, it will add numbers to *each header
  in a file*. This means that if you have headers in a top-level section, then its
  headers will become numbered as sub-sections, and any other _files_ underneath it
  will begin as third-level children.
* **Numbering re-starts across chapters**.
  If you specify groups of sections via Chapters, then numbering will restart between
  them. That means if you have two `- chapter:` entries with 2 pages each, you will
  have two sets of `1.` and `2.` sections, one for each chapter.

## Exclude some pages from your book's build

By default, Jupyter Book will build all content files that are found in your book's
folder, even if they are not specified in `_toc.yml` (and will raise a warning if
it finds a file that isn't listed there).

If you'd like Jupyter Book to skip a file entirely, you can do so with the following
configuration in `_config.yml`:

```
exclude_patterns: [pattern1/*, path/to/myfile.ipynb]
```

Any files that match the patterns described there will be excluded from the build.
If you'd like to exclude files from being *executed* but still wish for them to be
built by Jupyter Book, see [](execute/exclude).

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

### Add an external link to your navigation

You can also add external links to websites that are outside of your book.
To do so, use the following pattern:

```yaml
- url: https://yoururl.com
```

The URL will be placed alongside the links to other pages above and below the
entry.

### Add a table of contents to a page's content

If you'd like to add a table of contents for the sub-sections of a page
*within the page content* (in-line with the other content on the page), you
may do so by using the `{tableofcontents}` directive. You can use it like so:

````
```{tableofcontents}
```
````

For an example, see the source of [the content types page](../content-types/index.md).

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
