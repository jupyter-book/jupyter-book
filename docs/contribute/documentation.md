# Contribute to documentation

The documentation for Jupyter Book is itself a Jupyter Book, and is located in `docs/`.

## Build the documentation

The easiest way to build the documentation is with `tox`.
This will install all of the necessary dependencies automatically, and build the docs in an isolated environment.

To build the documentation, run this command from the root of the repository:

```console
$ tox -e docs-update
```

To build the documentation with a **live server** that re-builds and previews changes automatically, run this command:

```console
$ tox -e docs-live
```

## Documentation guidelines

The documentation of Jupyter Book is inspired by the [Diataxis Documentation Framework](https://diataxis.fr/).
There are roughly **four types of documentation** in the Jupyter Book docs.
They are somewhat reflected in the documentation's top-level structure, although some of them (particularly `how to` and `explanation` guides are combined together under `topic guides`.

- **Tutorials** are step-by-step guides that are learning-oriented.
  They give the learner a feel for how a tool works, and get them excited about learning more.
  Tutorials live in a dedicated section of the documentation.
- **How-To guides** are shorter guides that tell the reader how to do something.
  They assume more background knowledge of Jupyter Book (often, that they have read the tutorial).
  They are focused on "doing things" rather than long explanations.
  How-To guides make up most of Jupyter Book's documentation, and are separated into sections for various topics.
- **Reference** documentation _describes_ Jupyter Book's structure and functionality in a complete sense.
  It is more programmatic, less narrative, and more interested in covering all configuration and options in Jupyter Book rather than describing how and when to use them.
  Jupyter Book has a reference section after our topic sections.
  In addition, it has an organization-level reference section just underneath.
- **Explanations** are higher-level discussions about topics and concepts related to Jupyter Book.
  They are less focused on doing things, and more focused on gaining a conceptual framework for how Jupyter Book works.
  Jupyter Book currently has no dedicated explanation section, but welcomes the addition of explanatory content and potentially a dedicated section.

These four areas are not **strict rules** for the Jupyter Book documentation, but should serve as inspiration in deciding what to document, and where.
Any contributions to the documentation that fall within this framework (e.g., adding a new tutorial, adding a How To section) are most-welcome!
