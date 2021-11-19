# Sphinx usage and customization

Jupyter Book uses [the Sphinx documentation engine](https://sphinx-doc.org) to build a rich document model from your source files.
This also allows for some extra customization under the hood.
This chapter covers a few ways to customize Sphinx or to directly use it in building your book.

:::{caution}

Manually customizing Sphinx is considered **advanced usage** - it is highly recommended that you read the [Sphinx documentation](https://sphinx-doc.org).

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
Alternatively, [automate this with a pre-commit hook](sphinx:convert:pre-commit).

:::

(sphinx:convert:pre-commit)=
### Automate conversion with a pre-commit hook

[pre-commit](https://pre-commit.com/) is a useful tool for automating common tasks with a git repository.
It will automatically run commands when you make a commit in `git`.

Follow these steps to use a `pre-commit` hook that converts your Jupyter Book into a Sphinx site, to ensure that they remain in-sync:

1. Install `pre-commit`. Follow the [pre-commit install instructions](https://pre-commit.com/#install).
2. Create a `.pre-commit-config.yaml` file. This is the file that tells `pre-commit` which hooks to install as a part of your project.

   :::{seealso}
   See [the pre-commit instructions](https://pre-commit.com/#pre-commit-configyaml---hooks) for more information on this file.
   :::
3. Add the _Jupyter Book to Sphinx_ conversion hook by adding the following config to `pre-commit-config.yaml`:

   ```yaml
   repos:
   - repo: https://github.com/executablebooks/jupyter-book
     rev: v0.11.2
     hooks:
     - id: jb-to-sphinx
       args: ["path/to/book"]
   ```

   Where `path/to/book` is the path to your book's source files, relative to the repository root.
4. Initialize `pre-commit` for your repository:

   ```bash
   pre-commit install
   ```

   This will install the pre-commit hook that you've configed above.
5. Make a commit to your repository, and confirm that the `jupyter-book config sphinx` command is automatically run.
