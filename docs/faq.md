# Frequently Asked Questions

This page answers common questions about Jupyter Book 2.

## General Questions

### What's the difference between Jupyter Book 1 and 2?

Jupyter Book 2 is a complete rewrite built on the [MyST Document Engine](https://mystmd.org) instead of Sphinx. Key differences:

- **Architecture**: Built on MyST-MD (JavaScript/TypeScript) instead of Sphinx (Python)
- **Performance**: Faster builds and better incremental compilation
- **Features**: Modern web development features, improved cross-referencing, enhanced interactivity
- **Ecosystem**: Part of the broader [MyST ecosystem](./community/ecosystem.md) with shared tools and standards

For a detailed comparison, see our [ecosystem documentation](./community/ecosystem.md).

### Should I upgrade to Jupyter Book 2 now or wait?

**Upgrade if:**
- You're starting a new project
- You want modern web features and faster builds
- Your content uses standard MyST Markdown features
- You don't rely heavily on Sphinx-specific extensions

**Consider waiting if:**
- You need features not yet available in 2.0 (see [known limitations](#known-limitations))
- Your project uses many Sphinx extensions
- You have a stable workflow with JB 1.0 that meets your needs and don't want to upgrade.

See our [upgrade guide](./upgrade.md) for detailed migration instructions.

### How can I downgrade to Jupyter Book 1?

See the [downgrade guide](./downgrade.md) for more details.

### What MyST Markdown features work in Jupyter Book?

Jupyter Book 2 supports the full [MyST Markdown specification](https://mystmd.org/spec), including:

- Directives and roles
- Cross-references and citations
- Figures, tables, and equations
- Executable code blocks
- Tabs, grids, and cards

For authoring details, see our [MyST Markdown tutorial](./authoring/mystmd.md).

### Should I use Jupyter Book or MyST directly?

Since Jupyter Book 2 is built on MyST, you might wonder which to use.
Currently, the difference is minimal - both use the same CLI commands and configuration. 
Over time, we imagine that:

- Jupyter Book will remain focused on **out-of-the-box functionality for end-users**
- The MyST Engine will focus more on **flexible, hackable building blocks for applications like Jupyter Book**

However for right now, Jupyter Book is essentially a Python wrapper around MyST that makes installation easier.

**Use Jupyter Book if:**
- You want a simpler "batteries included" experience for creating books
- You're familiar with Jupyter Book 1 and want to continue that workflow
- You primarily create books and similar long-form documents
- You prefer working in a Python environment (e.g., `pip install`, Python-based workflows)

**Use MyST directly if:**
- You prefer working with `Node.js/npm` tooling
- You need cutting-edge MyST features before they're in Jupyter Book
- You want maximum flexibility and control over the MyST toolchain

### Will Jupyter Book 1 continue to be maintained?

In short: maintanance will continue to be supported, but will be dependent on support from community contributors, as the resources of the core team are focused on Jupyter Book 2 and the MyST ecosystem.

More generally, the [Executable Books](https://executablebooks.org/) organization will remain the stewards of the Sphinx-based stack (the engine of Jupyter Book 1), and we anticipate continuing support and development of the Sphinx ecosystem of tools, likely with a focus on supporting the open source developer community rather than the broader “scientific communication” community.
These projects are strongly supported by open-source contributors, and we hope that this continues alongside work from the Executable Books team.
Some Executable Books tools will likely slow their development (e.g., [MyST-NB](https://myst-nb.readthedocs.io/en/latest/)), while more heavily-used tools will likely continue to evolve and improve (e.g., [myst-parser](https://myst-parser.readthedocs.io/en/latest/), which now powers a large part of the markdown experience in Sphinx).
We recognize that there is an on-going need for these tools, and will continue working to ensure their long-lived success for the developer community, with the constraint that we are all volunteers with limited time!


## Technical Questions

### What's the relationship between Jupyter Book and MyST?

Jupyter Book 2 is built on top of the MyST ecosystem. See our [ecosystem documentation](./community/ecosystem.md) for details.

### How do I add custom features or plugins?

Jupyter Book 2 uses MyST's plugin system:

- [Creating directives and roles](./plugins/directives-and-roles.md)
- [Plugin development guide](./plugins/plugins.md)
- [Plugin AST documentation](./plugins/ast.md)

### How do I deploy my Jupyter Book?

See our [publishing guide](./build/publish.md) for deployment options including:

- GitHub Pages
- ReadTheDocs
- Netlify/Vercel
- CurveNote
- Custom hosting

## Getting Help

### How do I get help with Jupyter Book?

Multiple channels available:

- **Quick questions**: [Discord community](https://discord.mystmd.org)
- **Detailed questions**: [GitHub Discussions](https://github.com/orgs/jupyter-book/discussions)
- **Upgrade help**: [Upgrade discussions category](https://github.com/orgs/jupyter-book/discussions/categories/upgrading-jupyterbook)
- **Bug reports**: Most issues should be reported to the [`mystmd` repository](https://github.com/jupyter-book/mystmd/issues) since Jupyter Book 2 is built on the MyST engine. Use [`jupyter-book` issues](https://github.com/jupyter-book/jupyter-book/issues) only for Jupyter Book-specific functionality (like the Python wrapper or upgrade tooling).

See our [help page](./community/help.md) for more resources.

### How can I contribute to Jupyter Book?

We welcome contributions! See our [contributing guide](./contribute.md) and our [community guide](./community/community.md) for details.

## Still Have Questions?

If your question isn't answered here:

1. Search our [discussions](https://github.com/orgs/jupyter-book/discussions)
2. Check the [MyST documentation](https://mystmd.org/guide)
3. Ask in our [Discord](https://discord.mystmd.org)
4. Start a new [discussion](https://github.com/orgs/jupyter-book/discussions/new)
