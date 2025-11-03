---
title: Table of contents structure
description: Organize your book's pages with the table of contents
---

# Structure your book with a table of contents

The **table of contents** (TOC) defines the structure and navigation of your Jupyter Book. It determines the order of pages, how they're nested, and how they appear in the sidebar.

:::{note}
The new Jupyter Book uses `myst.yml` for the table of contents, replacing the `_toc.yml` file used in Jupyter Book v1.
:::

(basic-toc-structure)=
## Basic structure

Here's a simple table of contents, defined in your `myst.yml` file under the `project.toc` field:

```yaml
project:
  toc:
    - file: index.md
    - file: chapter1.md
    - file: chapter2.md
```

This creates a book with three pages in order: the index, chapter 1, and chapter 2.

:::{tip}
File names with numeric prefixes like `1_chapter1.md` will generate clean URLs without the prefix (e.g., `/chapter1`). This helps with organization while keeping URLs clean.
:::

:::{seealso}
For more details, see the [MyST navigation guide](xref:guide/table-of-contents).
:::

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

## External TOC files using `extends:`

For larger projects or teams with separate content and infrastructure maintainers, you can define your table of contents in a separate file using the `extends:` functionality. This allows you to keep your `myst.yml` focused on configuration while maintaining your TOC structure in a dedicated file.

```{code-block} yaml
:filename: myst.yml
version: 1
project:
  title: My Jupyter Book
  # Other project configuration...

extends:
  - toc.yml

site:
  # Site configuration...
```

Then create `toc.yml` with your table of contents structure:

```{code-block} yaml
:filename: toc.yml
version: 1
project:
  toc:
    - file: index.md
    - title: Part 1
      file: part1.md
      children:
        - file: chapter1.md
        - file: chapter2.md
    - title: Part 2
      children:
        - file: chapter3.md
        - file: chapter4.md
```

### Benefits of external TOC files

This separation is particularly useful for projects with distinct roles:

- **Content contributors** can edit the TOC structure without touching infrastructure configuration
- **Infrastructure maintainers** can manage build settings in `myst.yml` independently
- **Version control** shows cleaner diffs since content structure changes don't mix with config changes

:::{tip}
The `extends:` functionality allows you to compose configuration from multiple files. You can extend multiple files (e.g., `extends: [toc.yml, abbreviations.yml]`) to organize different aspects of your configuration.

For more details on composing configuration files, see the [MyST composing myst.yml guide](xref:guide#composing-myst-yml).
:::

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

- [](../get-started/create-content.md) - Start writing content for your book
