---
title: Jupyter Book at the Scientific Python 2025 Developer Summit
subtitle: How the team took advantage of being co-located and working closely with Scientific Python developers.
date: 2025-05-23
authors:
  - choldgraf
  - fwkoch
  - agoose77
---

## The Scientific Python community

Scientific Python is an ecosystem of open-source software packages and a community of developers and maintainers that is working ...

> To better coordinate the ecosystem and support the community of contributors and maintainers.
>
> -- https://scientific-python.org/about/

This month, the organizers of the 2025 Scientific Python Developer Summit invited to the Jupyter Book team to join them in Seattle, Washington, where Chris Holdgraf, Franklin Koch, and Angus Hollands spent five days talking about the Jupyter Book project and its role in the Scientific Python ecosystem.

:::{figure} https://github.com/user-attachments/assets/5ea3a695-d728-4818-9625-d88f0df97fce
Photograph of Angus and Franklin co-working with Scientific Python developers during the summit. Image redistributed from [a LinkedIn post shared by Scientific Python][post].
:::

[post]: https://www.linkedin.com/posts/scientific-python_scientificpython-activity-7330324425700966400-hPB4

## Our objectives

At the start of the week, we set out our goals for the summit:

1. To share the mission, vision, and goals of the Jupyter Book project.
2. To identify and [eliminate obstacles for others to contribute](https://github.com/jupyter-book/team-compass/issues/19).
3. To make progress on building missing features for the MyST Document Engine needed by the Scientific Python community

## What we achieved

### A demonstration of the MyST ecosystem

Angus and Franklin gave a short on-the-fly talk on the Jupyter Book project, walking through the high-level design of the MyST Document Engine, and explaining how the MyST AST that it produces can be rendered with different MyST Renderers.

:::{figure} https://github.com/user-attachments/assets/82578cd1-ecda-4739-9611-9431afe3367a
Angus and Franklin talking with the Scientific Python Developer Summit attendees about the Jupyter Book project and the exciting new features in Jupyter Book 2.
:::

Our fellow attendees asked many interesting and thought provoking questions, which set the scene for subsequent deep-dive conversations during the rest of the summit. One such conversation gave us the chance to learn more about the kinds of [improvements to executing MyST documents][execute] with Jupyter Kernels that tutorial and documentation authors were keen to see in future versions of the MyST Document Engine.

We also found the opportunity to talk about extensions to the MyST content-sharing [that might improve the tutorial authoring experience][sharing-improvements], and how the MyST Document Engine CLI [might be extended to simplify PR previews for documentation builds][pr-preview].

### Theme support to meet the needs of scientific-python.org

Franklin and Angus worked with Stefan van der Walt on porting over the Scientific Python Hugo Theme to the MyST Book Theme. Stefan had been working to build [support for custom footers][footer] in the Book Theme, and with contributions from the rest of the team[^team], we were able to finalise this work and merge it into MyST!

At the same time, Angus worked with a [new contributor Kira](https://github.com/kne42) to onboard them with contributing to MyST, and build several exciting new features:

- [Support for defining social links for a MyST project][social-links]
- [UI components for rendering these social links][link-renderer]
- [A UI button for linking to the editable contents of a MyST page][edit-button]

### A prototype for software API support in MyST

Towards the end of the summit, Franklin and Stefan worked closely together to prototype integration of a [standalone API documentation tool][api-docs] with the MyST Engine to pull in API documentation to a MyST project.

:::{iframe} https://www.loom.com/embed/589a947389fb49829c9b712b796d8a7d?sid=fbe32e5f-b68d-4de2-b9a5-2cee70d74a74
:width: 100%
Python API documentation with MyST
:::

### An overhaul of the MyST overview and contributing docs

One of the most important outcomes of our time in Seattle was the significant improvements to the [MyST ecosystem overview](https://mystmd.org/guide/overview), our [contributing documentation](https://mystmd.org/guide/developer). These changes were were spearheaded by Chris and Stefan, with the rest of the Jupyter Book team[^team] helping to shape the narrative.

### A discussion about our practices as an open source team

We also discussed our team processes, with the goal of identifying minimal practices that would help others contribute to the project more effectively. This resulted in proposed practices for [encouraging more fluid PR merging](https://github.com/jupyter-book/team-compass/issues/27) and [prioritizing issues and PRs for work across the team](https://github.com/jupyter-book/team-compass/issues/28).

[pr-preview]: https://github.com/jupyter-book/mystmd/issues/2017
[link-renderer]: https://github.com/jupyter-book/myst-theme/pull/581/files
[social-links]: https://github.com/jupyter-book/mystmd/pull/2021
[execute]: https://github.com/jupyter-book/mystmd/issues/2019
[footer]: https://github.com/jupyter-book/myst-theme/pull/565
[edit-button]: https://github.com/jupyter-book/myst-theme/pull/577
[sharing-improvements]: https://github.com/jupyter-book/mystmd/issues/2018
[api-docs]: https://github.com/stefanv/npdoc2json

## Thanks for organizing!

Many thanks to the [Berkeley Institute of Data Science](https://bids.berkeley.edu) and the [Scientific Python team](https://scientific-python.org) for their leadership around organizing this summit, and the [eScience Institute at UW](https://escience.washington.edu/) for hosting us.

[^team]: Those that could make it to the Summit, of course!
