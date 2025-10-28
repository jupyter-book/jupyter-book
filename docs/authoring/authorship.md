---
authors:
- name: Jo the Jovyan
  affiliation: Planet Jupyter
  twitter: projectjupyter
  github: projectjupyter
  url: "https://jupyter.org"
---

# Add authors and their information to a page

Jupyter Book allows you to add authors and their information to a page in order to provide attribution, affiliations, etc.
This page describes a few common use-cases and how to accomplish them.

:::{note} See the top of this page for an example!
:class: dropdown
You can click on the author name to see more metadata about them.

This page was written with the following frontmatter:

```{code-block} markdown
:filename: author/authorship.md
---
authors:
  - name: Jo the Jovyan
    affiliation: Planet Jupyter
    twitter: projectjupyter
---
```
:::

## Add authors to a page or a book

To add authors to your project, you can add them at the book level with the following key:

```{code-block} yaml
:filename: myst.yml

project:
  authors:
    - name: Jo the Jovyan
    - name: Planet Jupyter
```

To add authors at the page level, you can add the following to your [page metadata](xref:guide/frontmatter):

```{code-block} markdown
:filename: my-page.md
---
authors:
  - name: Jo the Jovyan
  - name: Planet Jupyter
---
```

## Learn more

- You can read more about the `authors` key in [the MyST frontmatter reference](xref:guide/frontmatter).
