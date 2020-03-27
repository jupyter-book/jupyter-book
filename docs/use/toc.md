# Controlling the left Table of Contents

There are many ways in which you can control the left table of contents for
your book. Most of them involve adding syntax to your `_toc.yml` file.
This page covers a few common options.

```{note}
The {download}`conf.py file for this site <../_toc.yml>` has an entry for each
of the features described below for reference.
```

(toc/titles)=
## Custom page titles

All pages in Jupyter Book need to have a title. This is defined as a top-level
header at the top of a page (e.g., `# My title`). These titles are used to
generate the Table of Contents to the left.

If you'd like to customize the page titles to the left, you cando so in your
`_toc.yml` file. When you add a page entry to `_toc.yml`, add a `title:` field
as well. This will be used as the title in the left ToC.

For example, let's say we have a page like this:

```md
# Here's my first title

Here's some content
```

By default, "Here's my first title" will render as the page's title. However, if
you put the following entry in your `_toc.yml` file:

```yaml
- file: path/to/mymarkdownfile.md
  title: A different title
```

Then the title in the left ToC will be rendered as "A different title".


## Automatically expand sections of your book

Sometimes you'd like some sections of your book to *always* be expanded (as opposed
to only expanded when one of the sub-pages is active). To enable this, in an entry of
your `_toc.yml` file, add the following key:

```yaml
- file: path/to/your/page
- expand_sections: true
```

All sections of that page will now be expanded in the Table of Contents.

## Adding a header to sections of your book

Headers a useful ways to break up natural chunks of content in your book. They
will be rendered as large, non-clickable text in the ToC that splits up sections.

To add a header to your left ToC, add the following syntax to one of the pages in your
`_toc.yml` file. The header will be placed **before** the page entry.

```yaml
- file: path/to/your/page
  header: My header text
```

The header will be placed in between the pages where it was placed.

## Adding a divider to sections of your book

Similar to headers, dividers are a lightweight horizontal line that can split up
sections of your book. Dividers will always be placed before headers, if both are
given. You can add a divider between sections of your book by adding the following
key to one of the pages in your `_toc.yml` file. The divider
will be placed **before** the page entry.

```yaml
- file: path/to/your/page
  divider: true
```