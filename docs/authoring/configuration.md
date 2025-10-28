---
title: Configuration reference
description: Configure your Jupyter Book with myst.yml
---

# Configuration reference

Jupyter Book projects are configured using a `myst.yml` file in the root of your project. This file controls how your book is built, published, and rendered.

:::{note}
The new Jupyter Book uses `myst.yml` for configuration, replacing the `_config.yml` file used in Jupyter Book v1.
:::

:::{seealso}
For the complete configuration reference, see the [MyST configuration guide](https://mystmd.org/guide/frontmatter).
:::

## Basic structure

A minimal `myst.yml` file looks like this:

```yaml
version: 1
project:
  title: My Book Title
  authors:
    - name: Your Name
  toc:
    - file: index.md
    - file: chapter1.md
```

## Common configuration options

### Project metadata

```yaml
project:
  title: My Jupyter Book
  description: A description of your book
  authors:
    - name: Author Name
      email: author@example.com
```

### Table of contents

The `toc` field controls your book's structure:

```yaml
project:
  toc:
    - file: index.md
    - title: Chapter 1
      file: chapter1.md
```

See [](table-of-contents.md) for details.

### Bibliography

Configure citations:

```yaml
project:
  bibliography:
    - references.bib
```

See [](citations.md) for details.

## Migration from Jupyter Book v1

The old Jupyter Book used `_config.yml` for configuration. Key differences:

| Old (`_config.yml`) | New (`myst.yml`) |
|---------------------|------------------|
| `title` | `project.title` |
| `author` | `project.authors` (now a list) |
| Uses Sphinx configuration | Uses MyST configuration |

See [](../upgrade.md) for a complete migration guide.

## Next steps

- [](table-of-contents.md) - Structure your book's navigation
- [MyST Configuration Reference](https://mystmd.org/guide/frontmatter) - Complete configuration options
