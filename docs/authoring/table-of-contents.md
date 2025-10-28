---
title: Table of contents structure
description: Organize your book's pages with the table of contents
---

# Structure your book with a table of contents

The **table of contents** (TOC) defines the structure and navigation of your Jupyter Book. It determines the order of pages, how they're nested, and how they appear in the sidebar.

The TOC is defined in your `myst.yml` file under `project.toc`.

:::{note}
The new Jupyter Book uses `myst.yml` for the table of contents, replacing the `_toc.yml` file used in Jupyter Book v1.
:::

:::{seealso}
For more details, see the [MyST navigation guide](https://mystmd.org/guide/navigation).
:::

## Basic structure

Here's a simple table of contents:

```yaml
project:
  toc:
    - file: index.md
    - file: chapter1.md
    - file: chapter2.md
```

This creates a book with three pages in order: the index, chapter 1, and chapter 2.

## Nested sections

Create hierarchical structure with `children`:

```yaml
project:
  toc:
    - file: index.md
    - title: Part 1
      file: part1.md
      children:
        - file: chapter1.md
        - file: chapter2.md
```

This creates a book with an index, followed by Part 1 which contains two chapters.

## Titles

By default, MyST uses the title from each file's frontmatter or first heading. You can override this with the `title` field:

```yaml
project:
  toc:
    - file: introduction.md
      title: Getting Started
```

## Organizing content

You can group chapters into parts:

```yaml
project:
  toc:
    - file: index.md
    - title: Part I - Foundations
      children:
        - file: intro.md
        - file: basics.md
    - title: Part II - Advanced
      children:
        - file: advanced.md
```

## External links

Include external resources in your TOC:

```yaml
project:
  toc:
    - file: index.md
    - title: MyST Documentation
      url: https://mystmd.org/guide
```

## File paths

Paths in the TOC are relative to the `myst.yml` file location:

```yaml
# If myst.yml is in the root:
project:
  toc:
    - file: docs/index.md
    - file: docs/chapter1.md
```

## Migration from Jupyter Book v1

The old Jupyter Book used `_toc.yml`. Here's how it maps to `myst.yml`:

**Old `_toc.yml`:**
```yaml
format: jb-book
root: index
chapters:
  - file: chapter1
    sections:
      - file: section1
```

**New `myst.yml`:**
```yaml
project:
  toc:
    - file: index.md
    - file: chapter1.md
      children:
        - file: section1.md
```

Key changes:
- TOC is now part of `myst.yml` (not separate `_toc.yml`)
- `sections` → `children`
- `root` is just the first entry in `toc`
- File extensions (`.md`) are now required

## Next steps

- [](configuration.md) - Learn about other `myst.yml` options
- [](create-content.md) - Start writing content for your book
- [MyST Navigation Guide](https://mystmd.org/guide/navigation) - Detailed navigation options
