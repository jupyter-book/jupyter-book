# Documentation strategy and structure

This document is a high-level guide for maintainers and core contributors. It defines the structure, audience, and style for the Jupyter Book documentation.

## Documentation Structure

Our documentation is organized into top-level sections based on audience. The `docs/` directory contains folders that correspond directly to these top-level URL paths:

* **Landing Page (`index.md`)**  
  * **Audience:** Newcomers and all users.  
  * **Content:** The file `docs/index.md` becomes the `jupyterbook.org/` landing page. It should demonstrate the core value proposition of the Jupyter Book tool, and give all the information needed to orient a new user and know where to look for more information. It should be easy to read, simple, and visually attractive.
* **User Docs (e.g., `authoring/`, `execution/`)**
  * **Audience:** Users of Jupyter Book.
  * **Content:** These are the main "topic-areas" of the product. They live in their own top-level folders. For example, all content related to authoring files lives in the `authoring/` folder.
* **Topic-Area Landing Pages (e.g., `authoring.md`, `build.md`)**
  * **Audience:** Users exploring a specific topic area.
  * **Content:** Each major topic area should have a landing page that provides the same function as the main landing page, but focused on that topic. The landing page should be simple, visually attractive, and guide users to content organized by Diataxis categories (Tutorials, How-To, Reference, Discussion). These files become the `/authoring`, `/build` URLs and should be low-maintenance—linking to existing content rather than duplicating it.
* **Contributor Docs (`contribute/`)**
  * **Audience:** Contributors to Jupyter Book.
  * **Content:** How to navigate the project's repositories, know where to make a contribution, project-wide contributing guidelines and styles, and how to set up the project for development.
* **Community and Project Docs (`community/`)**
  * **Audience:** People who want to learn *about* the project (not use the product).
  * **Content:** Team compass, organizational structure, and project history.

:::{note} Don't use `[folder]/index.md` - Use `[folder].md` instead
Instead of creating `authoring/index.md`, create `authoring.md` at the top level. This file becomes the `/authoring` URL and serves as the landing page for that topic area. MyST doesn't currently support `folder/index.md` resulting in a `/folder` URL—it creates `/folder/index` instead. See [this issue](https://github.com/jupyter-book/mystmd/issues/2372) for details.
:::

## Topic Organization

Each topic-area (like `authoring/` or `execution/`) should be categorized by the [Diataxis framework](https://diataxis.fr/). You can intermingle different categories of content on the same page, but don't intermingle them in the same section within a page.

* **`tutorials`**: Goal-oriented guides to lead a user through a complete process (e.g., "Build your first book"). These are usually standalone pages, and come first.
* **`how-to`**: Short, focused guides to answer a specific question (e.g., "How do I add citations?"). This usually come just after tutorials.
* **`reference`**: Technical descriptions and factual information (e.g., "Configuration options"). This usually goes at the bottom of a page or section.
* **`discussion`**: Explanations of key concepts and high-level discussions (e.g., "Why we use MyST"). This usually goes at the bottom of a page or section.

Pages are organized in a _flat hierarchy_ within each topic folder, try not to nest them inside sub-folders unless really needed.

### When to create topic-area landing pages

Create a `[topic].md` landing page when:
- The topic is a major user journey (authoring, building, execution, etc.)
- The topic has 4+ pages that need organization by Diataxis categories
- Users would benefit from navigation guidance within the topic

**Don't create** landing pages for:
- Simple collections of related pages (like `community/` with 5 pages)
- Single-page topics
- Sections with a clear linear flow where direct links work better

### Example structure

**Good structure** following this guide:
```
docs/
├── index.md              # Main landing page
├── authoring.md          # Topic landing page
├── authoring/
│   ├── mystmd.md         # Tutorial
│   ├── create-content.md # How-to
│   └── roles-and-directives.md # Reference
└── community/
    ├── community.md      # Individual page (no landing needed)
    └── ecosystem.md
```

**Avoid**:
- `authoring/index.md` (MyST limitation, use `authoring.md` instead)
- Mixing content types in one page (tutorial + reference together)
- Deep nesting (prefer flat structure within topic areas)

### How can I tell what type of content I'm adding?

Use the [Diataxis compass](https://diataxis.fr/compass/) to decide what type of content you're adding. Here's the key table they recommend:

| If the content… | …and serves the user’s… | …then it must belong to… |
| ----- | ----- | ----- |
| informs action | acquisition of skill | a tutorial |
| informs action | application of skill | a how-to guide |
| informs cognition | application of skill | reference |
| informs cognition | acquisition of skill | explanation |


## Development Workflow

### Building the documentation

The Jupyter Book repository includes a `noxfile.py` with commands for building and previewing the documentation:

**Build static HTML:**
```bash
nox -s docs
```

**Start live development server:**
```bash
nox -s docs-live
```

The live server will automatically rebuild pages as you edit them, making it easy to preview your changes.

:::{note}
The docs build has a read-only `GITHUB_TOKEN` scoped to the `jupyter-book` org that expires on **Dec 1, 2026**. This is what allows the `{issue-table}` directive to query the GitHub API during builds.
:::

### Repository structure

- `docs/` - All documentation source files
- `py/jupyter_book/` - Python package code
- `ts/` - TypeScript/JavaScript application code
- `noxfile.py` - Documentation build commands

See [`CONTRIBUTING.md`](https://github.com/jupyter-book/jupyter-book/blob/a3d0dad1307c1f011ad34fe17e888764892488d3/CONTRIBUTING.md) for complete development setup instructions.

## Style

* Use active and short language instead of passive language (e.g., `Get started` rather than `Getting started`)
* Be direct and to-the-point. Avoid overly wordy sections.
* Make documentation scannable. Provide high-information headers and titles.
* Cross-reference heavily. Rather than re-writing content, link back to a section as a source of truth.
