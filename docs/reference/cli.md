# Command-line interface reference

Jupyter Book comes with a command-line interface that makes it easy to
build your books and run a few common functions. This page contains information
on what you can do with the CLI.

This page is a complete reference for the CLI. For newcomers who would like to
get started with the Jupyter Book CLI, we recommend starting with [](../start/overview.md)

:::{note}

You may also use ``jb`` as shorthand for ``jupyter-book`` in the command-line.
For example: `jupyter-book build mybook/` is equivalent to ``jb build mybook/``.

:::

**See below for the full command-line reference**

```{eval-rst}
.. click:: jupyter_book.cli.main:main
   :prog: jupyter-book
   :nested: full
```
