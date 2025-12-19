---
title: Custom banners and sidebar footers in the MyST Book Theme
date: 2025-11-24
authors:
  - id: choldgraf
---

Two new customization points recently landed in the MyST Book Theme: announcement banners you can write in Markdown, and a primary sidebar footer you can customize. They make it easier to share timely notices—upgrade windows, workshops, deprecations—or tailor the navigation area with your own links and branding instead of the default "Made with MyST" badge.

## Dismissible announcement banners

You can now add a site-wide banner that appears above the navigation on every page.

```{figure} ../media/banner-custom.png
Announcement banner example.
```

For example, put any MyST Markdown content into `site.parts.banner` in `myst.yml` like so:

```yaml
site:
  parts:
    # Here we show linking to a local file, you could also give md directly
    banner: _site/banner.md
```

The banner includes an "`X`" button so readers can dismiss it, and that choice persists in their browser. The theme hashes the content, so if you change the message it will reappear for everyone. Complex content is _somewhat_ supported, so feel free to add links, badges, or short callouts, but some functionality may not work the same (e.g., executable code cells).

## A customizable primary sidebar footer

The primary sidebar (the left table of contents) now accepts custom content at the bottom - this will replace the _Made with MyST_ logo.

```{figure} ../media/primary-sidebar-footer.png
Custom sidebar footer example.
```

Set a Markdown file under `site.parts.primary_sidebar_footer` and it will render in place of the default branding. For example, here's the sidebar footer in the Jupyter Book blog:

```yaml
site:
  parts:
    primary_sidebar_footer: |
      Made with [Jupyter Book](https://jupyterbook.org) and the [MyST Engine](https://mystmd.org).

      ```{image} https://raw.githubusercontent.com/jupyter-book/jupyter-book/refs/heads/main/docs/media/images/logo.svg
      :link: https://jupyterbook.org
      :width: 50%
      ```
```

If you leave the file empty, the sidebar footer vanishes. Otherwise drop in a logo, support link, or short note.

## Try it out

For details, see the updated [UI components guide](https://github.com/jupyter-book/myst-theme/blob/main/docs/ui.md).
Let us know how you use them, and what else would help you brand and communicate in your books.
