# Downgrade to Jupyter Book 1

If you need to return to Jupyter Book 1 (the Sphinx-based version), this guide will help you downgrade safely.

## Why You Might Want to Downgrade

You may want to downgrade to Jupyter Book 1 if:

- You need features that are not yet available in Jupyter Book 2 (see [known limitations](#known-limitations))
- Your existing content relies on Sphinx extensions not yet supported in version 2.0
- You're encountering issues with the migration process
- You need to maintain compatibility with existing workflows

:::{note}
If you're encountering issues with Jupyter Book 2, please consider posting in our [upgrade discussions](https://github.com/orgs/jupyter-book/discussions/categories/upgrading-jupyterbook) first. The community may have workarounds or solutions!
:::

## Downgrade Steps

First, uninstall the current version:

```bash
pip uninstall jupyter-book
```

Install the latest 1.x version:

```bash
pip install "jupyter-book<2.0"
```

Or install a specific 1.x version:

```bash
pip install jupyter-book==1.0.3
```

Finally, verify that you have the correct version:

```bash
jupyter-book --version
```

You should see a version number starting with `1.` (e.g., `1.0.3`).

### Restore your content

If you've been working with Jupyter Book 2:

- **Configuration files**: Restore your original `_config.yml` and `_toc.yml` files from version control
- **Content structure**: Ensure your content follows the Jupyter Book 1 structure
- **Build command**: Use the Jupyter Book 1 build command:

```bash
jupyter-book build path/to/book
```

## Get Help

If you need assistance with downgrading or have questions about version compatibility:

- **Discussion forum**: [https://github.com/orgs/jupyter-book/discussions](https://github.com/orgs/jupyter-book/discussions)
- **Upgrade discussions**: [https://github.com/orgs/jupyter-book/discussions/categories/upgrading-jupyterbook](https://github.com/orgs/jupyter-book/discussions/categories/upgrading-jupyterbook)
- **Discord**: [https://discord.mystmd.org](https://discord.mystmd.org)

## Jupyter Book 1 Documentation

The documentation for Jupyter Book 1 is available at:
[https://jupyterbook.org/v1/](https://jupyterbook.org/v1/)

## Considering an Upgrade Again?

If you later decide to upgrade to Jupyter Book 2, see our [upgrade guide](./upgrade.md) for detailed migration instructions.
