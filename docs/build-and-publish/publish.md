---
title: Publish to the web
description: Deployment options for Jupyter Book websites.
---

Jupyter Book sites can be deployed to a range of hosting platforms - both as static HTML or as MyST-aware applications.
The [get-started publishing tutorial](../get-started/publish.md) walks through deploying to GitHub Pages.
This page lists the other supported hosting options and links to the in-depth MyST documentation for each.

## GitHub Pages

`jupyter book init --gh-pages` generates a GitHub Actions workflow that builds and deploys your site to GitHub Pages on every push. See the [tutorial](../get-started/publish.md) for the full walkthrough, and [](xref:guide/deployment-github-pages) for additional configuration.

## Read the Docs

[Read the Docs](https://readthedocs.org) provides free hosting for open source projects with automatic builds from GitHub, GitLab, or Bitbucket. Run `jupyter book init --readthedocs` in the root of your repository to generate a `.readthedocs.yaml` configuration file.

For the full setup walkthrough, including a complete example configuration, see [](xref:guide/deployment-readthedocs).

## GitLab Pages

GitLab Pages can host your Jupyter Book directly from a GitLab repository using GitLab CI/CD. The build runs on each push and the static site is served from your project's Pages domain.

For the GitLab CI configuration and setup steps, see [](xref:guide/deployment-gitlab).

## Netlify

[Netlify](https://netlify.com) deploys static sites with automatic builds, preview deployments for branches and pull requests, and custom domains. Point Netlify at your repository and configure it to run a MyST build.

For build commands and configuration details, see [](xref:guide/deployment-netlify).

## Curvenote

[Curvenote](https://curvenote.com) hosts your site as a MyST-aware *application* (rather than static HTML), which enables features like instant page transitions, smaller payloads, and seamless updates as new MyST versions are released.

For deployment instructions, see [](xref:guide/deployment-curvenote).

## Custom web servers and other static hosts

The `_build/html` folder produced by `jupyter book build --html` contains a complete static website that can be served from any static web host (S3, nginx, Apache, etc.). When serving from a subfolder, you may need to set the `BASE_URL` environment variable so that links resolve correctly.

For details on static vs. application hosting, the `BASE_URL` setting, and serving from a generic web server, see [](xref:guide/deployment) and [](xref:guide/deployment-webserver).
