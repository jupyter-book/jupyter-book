---
title: "Why we made a major release for Jupyter Book 2 instead of creating a new package"
date: 2025-11-04
license: CC-BY-4.0
authors:
  - Jupyter Book Team
---

This week, we [released Jupyter Book 2](https://github.com/jupyter-book/jupyter-book/releases/tag/v2.0.0).
This is a major release that introduces the [MyST Document Engine](https://mystmd.org) as the back-end infrastructure that powers Jupyter Book.
The alpha and beta versions of this release have been in progress since November 2024, and it represents a huge amount of work from the team and community that we are incredibly excited about.

Unfortunately, it also means that many Jupyter Books out there are now broken.
In particular, users who haven't pinned their Jupyter Book versions to the `1.x` series will likely experience new build failures.

If you are not ready to try out the new version, you can reinstall a version of Jupyter Book compatible with the 1.x series by using commands like:

```shell
$ pip install "jupyter-book<2"
OR
$ pip install "jupyter-book~=1"
```


## Why we didn't create an entirely new package

We considered creating a new Python package to reflect the big switch to a new documentation engine - e.g., `pip install jupyter-book2`.
This has been done before in the Python system, and is a way to strictly separate the two projects.

However, we see the engine upgrade as a continuation of the project, and not a complete replacement that warrants a new package name. We believe that it provides features that our users will appreciate, and want to make it possible for them to cross the gap between the two versions without much effort.

We do not plan on maintaining the old Sphinx-based engine[^maint], and think that releasing the new engine under the same package name signals that intent most clearly.

[^maint]: Jupyter Book 1 is essentially a [collection of Sphinx extensions](https://jupyterbook.org/v1/explain/sphinx.html). The [Sphinx engine](https://sphinx-doc.org) itself is maintained by the Sphinx community. We (the [Jupyter Book team](xref:compass/team)) do not plan on maintaining the extensions that Jupyter Book 1 used (though others in the open source ecosystem may continue doing so). This will simply not be a focus of the _Jupyter Book_ team or technology stack.

Finally, we think that having two user-facing products both called "Jupyter Book" creates some confusion: community members and users can end up talking across each other without realising that there are two engines that exist in parallel.

As it goes in open source projects, we discussed the various transition pathways, in which some team members expressed reservations with the chosen path—being concerned about the burden the transition imposed. 

However, we came to a consensus to try that path—and are all very enthusiastic about the new engine, and dedicated to helping our users adopt it successfully. 


## What we're doing to help

We know that this will result in hidden breakages in CI/CD and unexpected changes to user workflows.
We apologize in advance!

Here are recommended paths forward:

(downgrade-jb1)=
### Downgrade to Jupyter Book 1

The simplest thing that you could do is to simply [downgrade to Jupyter Book 1](xref:jb/resources/downgrade).
It is still available, and you can downgrade from the command-line like so:

```shell
$ pip install "jupyter-book<2"
```

Or via a file like `requirements.txt` like so:

```{code-block}
:filename: requirements.txt
jupyter-book<2
```

This will keep the previous version of Jupyter Book installed.

### Use the upgrade guide and helper

We've also created an [upgrade guide for Jupyter Book 1](xref:jb#upgrade-tldr) to help people navigate their upgrade path.
This includes guides to translate "old" configuration (`_config.yml`) to "new" configuration (`myst.yml`) and documents some potential paper-cuts along the way.

Bundled with this effort is an **auto-upgrade tool** that will try and do most of the hard work for you.
If you run `jupyter book build` in a directory with "old style" configuration, it should prompt you to automatically upgrade your book's configuration.

We hope that these reduce the burden on users in upgrading their books if they wish!

(And remember, you can always [downgrade to Jupyter Book 1](#downgrade-jb1) and keep using that.)

### Ask for support and guidance in our community channels

Finally, we've set up a number of [community channels](jb:community) where users and project contributors can discuss with one another and ask questions.

Here are a few dedicated spaces:

- [Our chat room](https://discord.mystmd.org/) is for quick conversations and synchronous questions.
- [Our discussions forum](https://github.com/orgs/jupyter-book/discussions) is for all kinds of general questions.
- The [Upgrading Jupyter Book category](https://github.com/orgs/jupyter-book/discussions/categories/upgrading-jupyterbook) is a special section of the forum for asking questions about upgrades.

The Jupyter Book team will be monitoring these channels for questions from folks as they hit papercuts and snags while they upgrade.

## Thanks for your support

Thanks again for using Jupyter Book and being part of our community.
We know that disruptions to your workflow are really annoying, but we hope you will also find that the benefit of a brand new engine, built on modern technology, will outweigh the disruption. 

