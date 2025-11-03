# Frequently Asked Questions

This page answers common questions about Jupyter Book 2.

## General Questions

(faq-general)=
### What's the difference between Jupyter Book 1 and 2?

Jupyter Book 2 is a complete rewrite built on the [MyST Document Engine](https://mystmd.org) instead of Sphinx. Key differences:

- **Architecture**: Built on the MyST Document Engine (JavaScript/TypeScript) instead of Sphinx (Python)
- **Performance**: Faster builds and better incremental compilation
- **Features**: Modern web development features, improved cross-referencing, enhanced interactivity
- **Ecosystem**: Part of the broader [MyST ecosystem](../community/ecosystem.md) with shared tools and standards

For a detailed comparison, see our [ecosystem documentation](../community/ecosystem.md).

### Should I upgrade to Jupyter Book 2 now or wait?

**Upgrade if:**
- You're starting a new project
- You want modern web features and faster builds
- Your content uses standard MyST Markdown features
- You don't rely heavily on Sphinx-specific extensions

**Consider waiting if:**
- You need features not yet available in 2.0 (see [known limitations](#known-limitations))
- Your project uses many Sphinx extensions
- You have a stable workflow with Jupyter Book 1 that meets your needs and don't want to upgrade.

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

For authoring details, see our [MyST Markdown tutorial](../authoring/mystmd.md).

### Should I use Jupyter Book or MyST directly?

Since Jupyter Book 2 is built on MyST, you might wonder which to use.
Currently, the difference is minimal - both use the same CLI commands and configuration, for example `myst start` and `jupyter book start` do the same thing. 
Over time, we imagine that:

- Jupyter Book will remain focused on **out-of-the-box functionality for end-users**
- The MyST Engine will focus more on **flexible, hackable building blocks for applications like Jupyter Book**

However, at the moment, Jupyter Book is essentially a Python CLI wrapper around MyST that makes installation easier.

**Use Jupyter Book if:**
- You want a simpler "batteries included" experience for creating books
- You're familiar with Jupyter Book 1 and want to continue with a similar CLI workflow
- You primarily create books and similar long-form documents (i.e., no need for an [article theme](https://mystmd.org/guide/website-templates#article-theme))
- You prefer working in a Python environment (e.g., `pip install`, Python-based workflows)

**Use MyST directly if:**
- You prefer working with `Node.js/npm` tooling
- You don't want the `jupyter book` Python wrapper around `myst`
- You need cutting-edge MyST features before they're in Jupyter Book
- You want maximum flexibility and control over the MyST toolchain

### Will Jupyter Book 1 continue to be maintained?

**In short:** The Jupyter Book 1 stack is mostly in **maintenance mode**. We will do our best to review and release community PRs, but it is unlikely that we will do any active development unless another person or org steps in to actively develop the project further. That said, individual components of the Sphinx stack (e.g., `myst-parser`) may still receive ongoing development as independent efforts.

The [Executable Books](https://executablebooks.org/) organization remains the steward of the Sphinx-based stack (the engine of Jupyter Book 1). With core team resources now focused on Jupyter Book 2 and the MyST ecosystem, the Sphinx stack tools are in maintenance mode:

- **Community contributions welcome**: Feel free to open issues and bug reports, but unless you (or another community member) opens a PR to fix them, progress will be slow.
- **PR reviews and releases**: We'll do our best to review PRs from the community and cut releases when they're merged, but we cannot make any commitments.
- **No active development planned**: The core team is very unlikely to develop new features or fixes for these tools.

Some specific tools in the Executable Books stack are now in maintenance mode (e.g., [MyST-NB](https://myst-nb.readthedocs.io/en/latest/)), while more heavily-used infrastructure tools like [myst-parser](https://myst-parser.readthedocs.io/en/latest/) (which powers a large part of the Markdown experience in Sphinx) may continue to see more community activity.

We recognize there is an ongoing need for these tools and will continue working to ensure their stability for the community, with the constraint that we are all volunteers with limited time.


## Technical Questions

### What's the relationship between Jupyter Book and MyST?

Jupyter Book 2 is built on top of the MyST Document Engine. In short: Jupyter Book is an opinionated, book-focused distribution of MyST with a Python-based installation workflow.

For a detailed explanation of the architecture and technical differences, see our [ecosystem documentation](../community/ecosystem.md).

### How do I add custom features or plugins?

Jupyter Book 2 uses MyST's plugin system:

- [Creating directives and roles](../plugins/directives-and-roles.md)
- [Plugin development guide](../plugins/plugins.md)
- [Plugin AST documentation](../plugins/ast.md)

### How do I deploy my Jupyter Book?

See our [publishing guide](../get-started/publish.md) for deployment options including:

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
- **Help specific to upgrading**: [Upgrade discussions category](https://github.com/orgs/jupyter-book/discussions/categories/upgrading-jupyterbook)
- **Bug reports (Jupyter Book 2)**: Most issues should be reported to the [`mystmd` repository](https://github.com/jupyter-book/mystmd/issues) since Jupyter Book 2 is built on the MyST engine. Use [`jupyter-book` issues](https://github.com/jupyter-book/jupyter-book/issues) only for Jupyter Book-specific functionality (like the Python wrapper or upgrade tooling).
- **Bug reports (Jupyter Book 1)**: use [`jupyter-book` issues](https://github.com/jupyter-book/jupyter-book/issues), and clarify that you are using Jupyter Book **1**.

See our [help page](../community/help.md) for more resources.

### How can I contribute to Jupyter Book?

We welcome contributions! See our [contributing guide](../contribute.md) and our [community guide](../community.md) for details.

(faq:migration)=
## Migrating and troubleshooting upgrades

(known-limitations)=
### What are the known current limitations in Jupyter Book 2?

**Our intent is to make Jupyter Book 2 have all the same features as Jupyter Book 1**.
However, some features from Jupyter Book 1 are still in development and need improvement. Here are a few that are particularly important:

**Not yet available:**
- **Feature parity for execution functionality** - There are still a number of improvements we need to make to execution and customizability around it ([#2019](https://github.com/jupyter-book/mystmd/issues/2019))
- **Editable Thebe cells** - Interactive code cells that users can edit and execute ([#443](https://github.com/jupyter-book/mystmd/issues/443))
- **API documentation** - Sphinx autodoc-style API documentation generation ([#1259](https://github.com/jupyter-book/mystmd/issues/1259))
- **Embed cell outputs as MyST** - Generate MyST from notebook outputs ([#2114](https://github.com/jupyter-book/mystmd/issues/2114))

**Available with different syntax:**
- Most MyST directives (syntax mostly compatible)
- Cross-references (new MyST syntax)
- Themes and styling (new theming system)

See [upgrade discussions](https://github.com/orgs/jupyter-book/discussions/categories/upgrading-jupyterbook) for specific features and workarounds.

### Where did [feature X] from Jupyter Book 1 go?

For information about specific features, see the [known limitations section above](#known-limitations) or browse existing [upgrade discussions](https://github.com/orgs/jupyter-book/discussions/categories/upgrading-jupyterbook). You might also find solutions in the [MyST Guide](https://mystmd.org/guide). If you don't see what you are looking for, make a post on the [upgrade discussions](https://github.com/orgs/jupyter-book/discussions/categories/upgrading-jupyterbook) or on [Discord](https://discord.mystmd.org). 

(section:sphinx-extension-migration)=
### How do I migrate my Sphinx extensions?

Jupyter Book 2 uses MyST plugins instead of Sphinx extensions. Some common migrations:

- **Custom directives**: See [creating directives and roles](../plugins/directives-and-roles.md)
- **Themes**: See the MyST theme documentation
- **Build hooks**: Use MyST plugins

In some cases, functionality may _not_ yet exist in the MyST engine that _does_ exist in Sphinx.
In this case, ask in our [discussion forum](https://github.com/orgs/jupyter-book/discussions) or on [Discord](https://discord.mystmd.org).

### My build is failing after upgrading. What should I do?

Common issues and solutions:

1. **Syntax errors**: MyST syntax may differ slightly from Sphinx/RST
   - Check directive names and arguments
   - Verify cross-reference syntax
   - Try searching the [MyST Guide](https://mystmd.org/guide)

2. **Missing features**: Some JB 1.0 features aren't in 2.0 yet
   - Check [known limitations](#known-limitations)
   - Consider staying on Jupyter Book 1.0 temporarily (especially if a custom Sphinx extension is causing the issue)

3. **Configuration issues**: Config file format has changed
   - See the upgrade instructions above for config migration
   - Compare with new project structure

Post specific errors in [upgrade discussions](https://github.com/orgs/jupyter-book/discussions/categories/upgrading-jupyterbook) or ask on [Discord](https://discord.mystmd.org) for help.

## Still Have Questions?

If your question isn't answered here:

1. Search our [discussions](https://github.com/orgs/jupyter-book/discussions).
2. Check the [MyST documentation](https://mystmd.org/guide).
3. Ask in our [Discord](https://discord.mystmd.org).
4. Start a new [discussion](https://github.com/orgs/jupyter-book/discussions/new).
