---
title: Extend with Plugins
short_title: Extend with Plugins
---

Customize and extend Jupyter Book with plugins that add custom directives, roles, and content transforms.
Common use cases include domain-specific content blocks, specialized inline markup, integrations with external tools, and AST transforms that modify content during the build.
For community-contributed examples, see the [Jupyter Book MyST plugins repository](https://github.com/jupyter-book/myst-plugins/).

```{toc}
:context: children
```

## JavaScript plugins

JavaScript plugins are written as `.mjs` files and can define new directives, roles, and AST transforms. They run inside the MyST build pipeline and have full access to the document tree.

For the authoring guide, see [](xref:guide/javascript-plugins).

## Widgets / anywidgets

Widgets are interactive UI components that you can embed in your pages, built on top of MyST's plugin system and the `anywidget` specification.

For the widget authoring guide, see [](xref:guide/widgets).

## Distributing plugins

Plugins can be shared as standalone files, npm packages, or release artifacts so other projects can install them by URL or package name.

For packaging and distribution patterns, see [](xref:guide/plugins-distribute).

## Executable plugins

Executable plugins let you write plugins in any language (Python is the most common). MyST invokes the plugin as a subprocess, passing AST nodes over stdin and reading back the transformed result.

For setup and examples, see [](xref:guide/executable-plugins).
