---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.12
    jupytext_version: 1.6.0
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Structure the Table of Contents

Your book's structure is determined by a **Table of Contents**.
This is a YAML file (called `_toc.yml`) that defines a structure that Jupyter Book uses to create the order and nesting of pages.

% DEPRECATE in 0.14
:::{admonition} Migrate to the new Table of Contents structure
:class: warning, dropdown
A new Table of Contents structure was introduced in `v0.11`.
To migrate your old TOC structure to the new structure, you have a few options:

- **Manually migrate your TOC**. See [this blog post](https://executablebooks.org/en/latest/updates/2021-06-18-update-toc.html) for one example migration from an old TOC structure.
- **Use the migration tool**. This automatically generates a new TOC from your old one, though may alter the formatting slightly.
  To do so, use the following command:

  ```shell
  jupyter-book toc migrate path/to/_toc.yml -o path/to/_toc.yml
  ```

:::

(structure:book)=
## Structure of a Book

The table of contents is broadly organized like so:

```yaml
format: jb-book
root: index
chapters:
- file: path/to/chapter1
- file: path/to/chapter2
```

Here is a brief explanation of each key:

`format:`
: Defines the structure of this Table of Contents (e.g., how to interpret the key names). `jb-book` tells Jupyter Book to expect `chapters` and `parts` terminology (see below for details).

`root:`
: The first page of your book (aka, the "root page").
  It is the landing page for the HTML of your book.
  All paths for chapters/sections will be relative to this root document.

`chapters:`
: A list of entries, each of which maps onto **chapters** of your book.

`file:`
: A path to a file that contains the content for a chapter / section.
  These paths are _relative to the `root:` document.

### Use chapter sub-sections

You may optionally split a chapter across multiple files (each making up a **section** of the chapter).
To do so, use the `sections:` configuration, like so:

```yaml
format: jb-book
root: index
chapters:
- file: path/to/chapter1
- file: path/to/chapter2
  sections:
  - file: path/to/chapter2/section1
```

Here's a brief explanation of `sections:`

`sections:`
: A list of entries that define **sub-sections** of a chapter.
  This is useful if you'd like to split a chapter across multiple pages.
  See [](toc/structure) for more information.

### Use parts to organize chapters

You may optionally organize your chapters into **parts**, by using the `parts:` key like so:

```yaml
format: jb-book
root: index
parts:
  - caption: Name of Part 1
    chapters:
    - file: path/to/part1/chapter1
    - file: path/to/part1/chapter2
      sections:
      - file: path/to/part1/chapter2/section1
  - caption: Name of Part 2
    chapters:
    - file: path/to/part2/chapter1
    - file: path/to/part2/chapter2
      sections:
      - file: path/to/part2/chapter2/section1
```

Here's a brief explanation of `parts:`

`parts:`
: A list of entries, each of which defines a chapter.
  This is useful if you'd like to use different groups of chapters.

(structure:article)=
## Structure of an Article

You can build an **article** (e.g., a single page) rather than an entire book.
You can build outputs for an article from a single source file, or split it up across multiple files (similar to how you'd structure a book).

This section contains more information about how to do this.

:::{admonition} Work in progress
Article building functionality for Jupyter Book is still under design and development.
This functionality may change over time!
If you have ideas, suggestions, or would like to help out, please [see the contributing guide](../contribute/intro.md).
:::

### Build an article from a single file

You can generate a standalone HTML file for a single page of the Jupyter Book using the `jupyter-book` command, and pointing it to a **single file** instead of a book's directory:

```bash
jupyter-book build path/to/mypage.ipynb
```

This will build the file as usual, and place it in an output folder called `_build/_page/html/<mypage>`.

If the file is in a subdirectory relative to the `_build` folder, the HTML will be in a `_build/_page/html/<subdirectory-mypage>` folder.

Your page will be called `mypage.html`.
This will work for any [content source file](../file-types/index.md) that is supported by Jupyter Book.


### Build an article from multiple files

You may also split an article across multiple input files (e.g., if you'd like to store sections separately).
To do so, use the `format: jb-article` option in your `_toc.yml` file.

For example:

```yaml
format: jb-article
root: index
sections:
- file: path/to/chapter1
- file: path/to/chapter2
```

The primary difference is that the `jb-book` format uses `parts:` and `chapters:` syntax, while the `jb-article` format uses `sections:` syntax alone.

To build a single HTML page from these files (rather than one page per file), use the [singlehtml builder](https://www.sphinx-doc.org/en/master/usage/builders/index.html#sphinx.builders.singlehtml.SingleFileHTMLBuilder).

For example:

```bash
jupyter-book build path/to/book --builder singlehtml
```

## Types of content entries

There are several types of entries that you may provide in order to point to specific types of content.
Here is a quick overview:

`file:`
: A path that points to a local text file, which defines the content of this entry (the chapter, section, or sub-section).
  These paths should be relative to your `_toc.yml` file.

`glob:`
: A [glob-like pattern](https://docs.python.org/3/library/glob.html) that can be used to match against **multiple local files**.
  Each of these files will be collected and inserted into your content, in the order that `glob` discovers them.

`url:`
: An external link to a website (starting with `http` or `https`).
  This will be inserted into your book's Table of Contents, though it will not affect your book's structure (like numbering).

  When a `title:` entry is provided its text is used instead of the full URL.

Here is an example to show all three types:

```yaml
format: jb-book
root: index
chapters:
- file: path/to/chapter1
- url: https://example.com
  title: Example website
- glob: subfolder/other*
```

## Generate a Table of Contents from content files

You can use `jupyter-book` to *generate* a table of contents file from your book
using the filenames of your book's content. To do so, run the following command

```bash
jupyter-book toc from-project path/to/book -f [jb-book/jb-article]
```

Jupyter Book will search `mybookpath/` for any [content files](../file-types/index.md)
and create a `_toc.yml` file out of them. There are a few considerations to keep in mind:

* Each sub-folder must have at least one content file inside it
* The ordering of files in `_toc.yml` will depend on the alphanumeric order of
  the filenames (e.g., `folder_01` comes before `folder_02`, and `apage` comes
  before `b_page`)
* If there is a file called `index.md` in any folder, it will be listed first.

You may also **generate navigation bar *titles* from each file of your book**.
If you do so, note that if the file name begins with `<integer>_filename.md`, then
the `<integer>` part will be removed before it is inserted into `_toc.yml`.

In addition, you have a few extra options for controlling how the `_toc.yml` file is generated.

```{code-cell}
:tags: [remove-input]
!jupyter-book toc from-project -h
```
