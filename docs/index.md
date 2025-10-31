---
title: Jupyter Book
site:
  hide_outline: true
  hide_toc: true
  hide_title_block: true
---

+++ {"class": "col-page-inset"}

:::{attention} Jupyter Book 2 is here!
Built on the [MyST Document Engine](https://mystmd.org) with faster builds, modern features, and improved workflows.

[Upgrade from 1.0](#upgrade-tldr) • [Known limitations](#known-limitations) • [Frequently Asked Questions](#faq-general)
:::

+++ {"class": "col-page-inset"}


:::{hero}
Jupyter {orange}`Book`
:::

::::::{grid} 1 2 2 2
:::::{grid-item}
{large}`Create computational narratives that are reusable, reproducible, and interactive.`

_Write in Notebooks or Markdown, execute code, cross-reference content, and publish to the web - built for and by researchers, educators, and data scientists._

:::::
:::::{grid-item}
```{code-block} bash
:filename: install
pip install jupyter-book
jupyter book start
```

{button}`Get started → <./getting-started.md>` {button}`Upgrade from JB1 → <./resources/upgrade.md>`
::::::

+++

## See It in Action

::::{tab-set}
:::{tab-item} Reusable

```{figure} media/videos/reusable.mp4
:class: sd-mb-0

**Reusable Knowledge** - Cross-reference pages, sections, figures, and equations. Link to other MyST sites for a connected reading experience.
```

:::
:::{tab-item} Reproducible

```{figure} media/videos/reproducible.mp4
:class: sd-mb-0

**Reproducible Results** - Execute Python, R, Julia, and more at build time. Include computational results directly in your documentation.
```

:::
:::{tab-item} Interactive

```{figure} media/videos/interactive.mp4
:class: sd-mb-0

**Interactive Exploration** - Publish websites with live widgets. Connect to JupyterHub, Binder, or run Python in the browser.
```

:::
::::



+++ {"kind": "justified"}

## Get started

### What do you want to do

:::::{grid} 1 2 3 3
::::{card} 📘 Get Started
:link: getting-started.md
Build your first book in minutes
+++
[Quick start →](./getting-started.md)
::::
::::{card} 📝 Author Content
:link: authoring.md
Write with MyST Markdown
+++
[Learn authoring →](./authoring.md)
::::
::::{card} 🚀 Build & Publish
Deploy to the web
+++
[Publish guide →](./build/index.md)
::::
::::{card} ⚙️ Extend with Plugins
:link: plugins.md
Customize your workflow
+++
[Explore plugins →](./plugins.md)
::::
::::{card} 💬 Community
:link: community/community
Get help and contribute
+++
[Join us →](./community/community.md)
::::
:::::

+++ {"kind": "justified"}

### Important Information

::::{grid} 1 1 2 2
:::{card} Upgrade guide
:link: ./resources/upgrade.md
Upgrade from Jupyter Book 1 to 2
+++
Includes an FAQ about known limitations and gotchas
:::

:::{card} Get Help
:link: ./community/help.md
Questions or issues?
+++
Visit our [FAQ](./resources/faq.md) for common questions, or reach out via [Discord](https://discord.mystmd.org), [Discussions](https://github.com/orgs/jupyter-book/discussions), or [Vote on features](./community/vote.md)
:::

:::{card} Cite Jupyter Book
:link: ./cite.md
Using in research?
+++
See our citation guide for proper attribution
:::

:::{card} Ecosystem
:link: ./community/ecosystem.md
Learn about the MyST ecosystem
+++
Understand how Jupyter Book fits into the broader MyST ecosystem
:::
::::
