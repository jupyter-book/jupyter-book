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
