---
title: Upgrade an existing book from Jupyter Book 1
subtitle: Use automated tools to upgrade a legacy (Sphinx-based) Jupyter Book project to the new MyST Document Engine.
# subject: myst Quickstart tutorial
short_title: Upgrade from Jupyter Book 1
---

(upgrade-tldr)=
## tl;dr to upgrade

- Create and activate a virtual environment with Jupyter Book 2.
- Run `jupyter book` inside your existing book directory to automatically upgrade to Jupyter Book 2 (typically a `myst.yml` file will be created).
- Some manual cleanup may be needed to address build warnings.
- Some functionality in your book may be missing in Jupyter Book 2 (see [](#known-limitations)).


## Should You Upgrade?

**Upgrade for:**

- Faster builds
- Modern features and active development
- Better performance

**Stay on 1.0 if you rely on:**

- Custom Sphinx extensions you cannot port
- Key functionality not yet implemented (see [](#known-limitations))

(section:structure-legacy-book)=

## What You Need to Know

Jupyter Book 1 uses two configuration files:
- **`_config.yml`** - Book metadata and settings
- **`_toc.yml`** - Table of contents structure

Jupyter Book 2 uses one:
- **`myst.yml`** - All configuration in a single file

The upgrade process automatically converts these files for you.

**Example:** A typical Jupyter Book 1 project (<https://github.com/jupyter-book/legacy-demo-book/>):

```{code-block} shell
:caption: Contents of a Jupyter Book 1 directory

_config.yml      # Book metadata and settings
_toc.yml         # Table of contents
intro.md
notebooks.ipynb
logo.png
```

:::{warning} Sphinx Extensions
Custom Sphinx extensions are **not** compatible with Jupyter Book 2. See [](#section:sphinx-extension-migration) for migration options.
:::

:::{note}
Books using Sphinx's `conf.py` directly (without `_config.yml`) cannot be automatically upgraded.
:::

## How to Upgrade

### Step 1: Install Jupyter Book 2

```shell
pip install jupyter-book
jupyter book --version  # Should show v2...
```

### Step 2: Run the upgrade command

Navigate to your book directory and run:

```shell
cd my-book
jupyter book
```

The CLI will detect your Jupyter Book 1 project and prompt you to upgrade:

```{code-block} shell
:caption: Upgrade prompt

? 📘 Found a legacy Jupyter Book. To proceed, myst needs to perform an upgrade which will:
‣ Upgrade any Sphinx-style glossaries to MyST-style glossaries
‣ Upgrade any case-insensitive admonition names to lowercase (Note → note)
‣ Migrate configuration from _config.yml and (if applicable) _toc.yml files
‣ Rename any modified or unneeded files so that they are hidden

Are you willing to proceed? (Y/n)
```

### Step 3: Accept the upgrade

Press <kbd>Y</kbd> to start the upgrade. The tool will:

- Create a new `myst.yml` file with your configuration
- Back up your original files as `._config.yml.myst.bak` and `._toc.yml.myst.bak`
- Update syntax where needed

```{code-block} shell
:caption: Upgrade output

💾 Writing new config file: myst.yml
Migrating Jupyter Book configuration to myst.yml
Migrating TOC to myst.yml
```

### Step 4: Preview your book

When prompted, press <kbd>Y</kbd> to start the preview server:

```shell
? Would you like to run jupyter book start now? (Y/n)
```

This launches a local server where you can preview your upgraded book and verify everything works correctly.

:::{figure} ../media/images/screenshot-jupyter-book-start.png
:name: image:screenshot

Preview server running after upgrade
:::

## Upgrade a Sphinx Site

To convert a Sphinx site to Jupyter Book, you need to replace `{toctree}` directives with a [MyST Table of Contents](xref:guide#toc-format).

### Generate a starter TOC

```bash
cd book-folder
jupyter book init --write-toc
```

This creates a TOC based on your file structure.

### Map your toctree structure

Re-order the generated TOC to match your `{toctree}` directives. For example:

**Before** (Sphinx):
````md
```{toctree}
page1
page2
```
````

**After** (Jupyter Book):
```yaml
toc:
- file: myfolder/index
  children:
  - file: myfolder/page1
  - file: myfolder/page2
```

Remove the `{toctree}` directives from your pages as you migrate them.

## FAQ: Migration and Troubleshooting

See [](#faq:migration).
