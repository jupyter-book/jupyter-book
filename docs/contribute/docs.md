# Documentation strategy and structure

This guide covers documentation strategy for contributors working in the `jupyter-book` repository.

## Scope of this repository

The `docs/` folder in this repository is the canonical source for Jupyter Book user documentation served at:

- `https://jupyterbook.org/stable` (latest release)
- `https://jupyterbook.org/latest` (`main` branch)

The `jupyterbook.org` repository remains the canonical home for community/organization pages (for example project history, contribution entry points, and team material).

## Documentation structure

Top-level pages in `docs/` represent major user journeys. For example:

- `index.md`: Product landing page for users.
- `get-started/`: Installation and first workflow.
- `authoring/`: Content authoring.
- `build-and-publish/`: Build and publishing workflows.
- `execution/`: Computation and execution.
- `plugins/`: Plugin architecture and extension points.
- `resources/`: FAQs and reference resources.

:::{note} Use `[folder].md` for section landing pages
Instead of creating `authoring/index.md`, create `authoring.md` at the top level. This produces `/authoring` rather than `/authoring/index`.
:::

## Organizing content with Diataxis

Within each topic area, organize content using [Diataxis](https://diataxis.fr/):

- `tutorials`: Goal-oriented walkthroughs.
- `how-to`: Task-focused guides.
- `reference`: Technical and factual details.
- `discussion`: Explanations and concepts.

Keep folder hierarchy flat unless nesting is clearly necessary.

## Local docs workflow

This repository includes `nox` sessions for docs work.

Build static HTML:

```bash
nox -s docs
```

Run live-reload development server:

```bash
nox -s docs-live
```

## Writing style

- Prefer short, active language.
- Keep pages scannable with descriptive headings.
- Link to a single source of truth instead of duplicating content.
