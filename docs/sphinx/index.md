# Sphinx usage and customization

Jupyter Book uses [the Sphinx documentation engine](https://www.sphinx-doc.org) to build a rich document model from your source files.
This also allows for some extra customization under the hood.
This chapter covers a few ways to customize Sphinx or to directly use it in building your book.

:::{caution}

Manually customizing Sphinx is considered **advanced usage** - it is highly recommended that you read the [Sphinx documentation](https://www.sphinx-doc.org).

:::

(sphinx:convert)=
## Convert your Jupyter Book into a Sphinx website

It is possible to *convert* a Jupyter Book into a structure that is directly compatible with Sphinx.
This allows you to directly build the book with Sphinx commands, like `sphinx-build`.
It is useful if you wish to use services that directly support Sphinx builds, like [ReadTheDocs](https://readthedocs.org), or if you wish to use sphinx-specific commands like [`sphinx-autobuild`](https://github.com/executablebooks/sphinx-autobuild).

The only file that Sphinx requires to build a Jupyter Book is `conf.py`.
To generate one from your book's `_config.yml` file, run the following command:

```bash
jupyter-book config sphinx path/to/book
```

:::{seealso}
See [](/reference/cli.md) for more usage information of this command.
:::

This will use your `_config.yml` file along with your `_toc.yml` file to generate the appropriate `conf.py`.
After doing so, you can build your book with the standard Sphinx build commands.
For example:

```bash
sphinx-build path/to/book path/to/book/_build/html -b html
```

:::{warning}

Don't manually edit your `conf.py` file.
Instead, update your `_config.yml` file and re-run `jupyter-book config sphinx` to make sure the two configuration files stay in-sync.

:::
