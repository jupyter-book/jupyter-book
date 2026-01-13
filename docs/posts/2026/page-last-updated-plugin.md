---
title: "Introducing the `page-last-updated` plugin"
date: 2026-01-13
authors:
  - id: jb-team
---

MyST’s plugin system makes it easy to add small, focused behaviors to your Jupyter Book or MyST project. The [myst-plugins repository](https://github.com/jupyter-book/myst-plugins/) is a community-maintained collection of plugins you can use (and contribute to).[^install]

[^install]: You can enable the plugin by linking to its released `.mjs` file in your MyST configuration:

    ```yaml
    project:
      plugins:
        - https://github.com/jupyter-book/myst-plugins/releases/download/page-last-updated/page-last-updated.mjs
    ```

In this post we wanted to quickly share the [`page-last-updated` plugin](https://jupyter-book.github.io/myst-plugins/page-last-updated/). It adds a small `Updated:` line underneath the title of each page. It uses your project’s git history to find the most recent commit that touched each file, then inserts the timestamp into the rendered page.

```{figure} ./images/last-updated.png
The last-updated plugin adds this little line underneath the title of each page.
```

You can find the current release at <https://github.com/jupyter-book/myst-plugins/releases/tag/page-last-updated>.

## How it works

Under the hood, the plugin runs `git log -1 --follow` for each source file to get a "last updated" timestamp, then it modifies the page AST to add a small node at the top of the page content. [Here's the logic that modifies the page AST](https://github.com/jupyter-book/myst-plugins/blob/9e742dba5e643f23b8ba587ab5f43f251756a1b7/plugins/page-last-updated/page-last-updated.mjs#L55-L72). If you’re curious, the full implementation is in `page-last-updated.mjs`:

<https://github.com/jupyter-book/myst-plugins/blob/main/plugins/page-last-updated/page-last-updated.mjs>

## Want to build your own plugin?

If you’ve been thinking about a plugin for your own project, consider contributing it to `myst-plugins` so others can reuse and improve it.

_Thanks to [@FreekPols](https://github.com/FreekPols) for contributing this plugin!_
