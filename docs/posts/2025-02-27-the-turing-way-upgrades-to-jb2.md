---
title: The Turing Way upgrades to Jupyter Book 2
subtitle: What we liked and learned, and what we’d like to see improved
authors:
  - name: Jim Madge
    github: JimMadge
  - name: Sarah Gibson
    orcid: 0000-0003-0356-2765
    github: sgibson91
  - name: Danny Garside
    orcid: 0000-0002-4579-003X
    github: da5nsy
    roles:
      - writing
      - review
  - choldgraf
  - rowanc1
date: 2025-02-27
license: CC-BY-4.0
---

[Jupyter Book 2 is nearing a beta release](https://next.jupyterbook.org), and the JB community has been working to make the transition as smooth as possible for users. Jupyter Book 2 will be built on the [MyST Document Engine](http://mystmd.org), which is a total rewrite of the documentation engine (see [this comment for more detail about the transition](https://github.com/orgs/jupyter-book/discussions/1712#discussioncomment-11719583)).

To guide this process, we’ve been working with communities that were heavy users of Jupyter Book 1 to understand where we can make the upgrade process smoother and where there is missing functionality. You can [see this Project Board with our priorities and progress](https://github.com/orgs/jupyter-book/projects/1), and to see where we’d welcome contributions and help.

One-such community is [The Turing Way](https://book.the-turing-way.org/), who write a handbook for reproducible, ethical and collaborative data science. The book is openly licensed and developed by the community of over 500 contributors in open collaboration. As of February, they’ve [merged a pull Request to upgrade their book to JB2](https://github.com/the-turing-way/the-turing-way/pull/4019). We invited them to reflect a bit on the process, with the hope that it inspires and provides guidance for other communities looking to do the same.

## What does this unlock?

The Turing Way team shared a few things that they are particularly excited about with this upgrade. Here is what stood out:

- **Ease of development and contribution.** Working with AST manipulation feels very powerful. MySTMD feels easier to build on and contribute to than Sphinx.
- **Adding plugins and extensibility.** We are thinking of how we can build features that are important to us on top of JB2 and MyST. We are keen to make plugins that others could use, or to push changes upstream so everyone can benefit. A couple of early examples of this are [adding a warning for missing alt-text in figures](https://github.com/jupyter-book/mystmd/pull/1814) and rewriting our [pathways feature](https://github.com/the-turing-way/the-turing-way/pull/4263) as a more generic “slices” or “sub ToC” plugin.
- **More powerful and simpler output formats.** More natural output to formats like PDF will give us new ways to share the book. PDF export of sections is a common request.

## Lessons we learned

Here are a few tips from The Turing Way team for handling the migration effectively and working with the Jupyter Book community.

- **Take it one step at a time.** The initial migration introduced a number of errors and warnings. The errors had to be solved for the book to build, but we decided to accept many of the warnings for now, and fix them later. That way, we can start using JB2 immediately. We realised that waiting until we had fixed all warnings would be painful as ongoing development on the book would reintroduce warnings as we merge to keep up to date with the main branch.
- **Reach out to the JB2 team\!** We have worked together with JB2 and MyST contributors and found them to be incredibly enthusiastic and helpful. We found some bugs while migrating The Turing Way, and every time the JB2 team were swift to make a fix or find a workaround. It felt great to have this support, and moreover we felt welcomed as contributors and collaborators. It’s brilliant to know that we helped to make improvements everyone can benefit from in the future.

## What we’re looking forward to

**Better multi-language support.** Eventually we would love to host multiple languages of The Turing Way on a single website. We have a fantastic [translation and localisation working group](https://book.the-turing-way.org/afterword/subprojects#translation-and-localisation-working-group-leads) who have worked extensively to set up [the processes and infrastructure to collaboratively translate the book](https://book.the-turing-way.org/community-handbook/translation) (see [the Arabic version](https://turingway-arabic.netlify.app/welcome.html), for example) but as things stand we have [no means to actually render these different languages or switch between languages without leaving the site](https://github.com/the-turing-way/the-turing-way/issues/3255).

To follow along and contribute, see [this issue about multi-language content](https://github.com/jupyter-book/mystmd/issues/1879) and [this issue about multi-language theme elements](https://github.com/jupyter-book/mystmd/issues/166).
