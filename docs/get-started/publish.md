---
title: Publishing to the web
short_title: Publish a website
subtitle: Deploy your Jupyter Book to GitHub Pages, Curvenote, Netlify, and many other services.
subject: Quickstart tutorial
updated: December 21, 2025
---

:::{important} Objective
The goal of this tutorial is to explore the ways in which a Jupyter Book can be published to the web for other people to enjoy.
:::

## GitHub Pages

Jupyter Book ships with support for generating the necessary configuration for deploying to GitHub Pages using GitHub Actions. Simply run the following command, and answer the prompted questions!

```{code} shell
:name: code:gh-pages
:linenos:
:emphasize-lines: 10

$ jupyter book init --gh-pages

📝 Creating a GitHub Action to deploy your MyST Site

? What branch would you like to deploy from? main
? What would you like to call the action? deploy.yml

🎉 GitHub Action is configured:

.github/workflows/deploy.yml

✅ Next Steps

1. Navigate to your GitHub Pages settings
2. Enable GitHub Pages
3. Use GitHub Actions as the source
4. Push these changes (and/or merge to main)
5. Look for a new action to start
6. Once the action completes, your site should be deployed on your https://{{ organization }}.github.io/{{ repo }} domain
7. 🎉 Celebrate and tell us about your site on Twitter or Mastodon! 🐦 🐘
```

In order for GitHub to use this configuration, you must follow the "Next Steps" above, namely:

1. Enable GitHub Pages, and _set the source to GitHub Actions_ (see [](#image:gh-pages))
   :::{figure} ../media/images/github-pages.png
   :name: image:gh-pages

   Screenshot of the GitHub Pages configuration, where the important _Source_ option resides.
   :::

2. Add the generated `.github/workflows/XXX.yml` (highlighted in [](#code:gh-pages)) to your list of tracked files (e.g. with `git add .github/workflows/XXX.yml`).
3. Commit the changes.
4. Push them to GitHub.

## `BASE_URL` Configuration for GitHub Pages
The MyST CLI needs to know the destination (base URL) of your site during build time. If you setup deployment to GitHub Pages using the `myst init --gh-pages` command, then _this is handled automatically for you_. Otherwise, if you deploy your website from a repository that's not the default GitHub Pages repository (i.e., not called `<username>.github.io`), you likely need to define a `BASE_URL` that includes the repository name.[^except-custom-domains] 
[^except-custom-domains]: If you're using a custom domain, you may not need to set `BASE_URL` if the site is served from the base domain (e.g.: `mydomain.org`) without a sub-folder (e.g., `mydomain.org/mydocs/`).

See for more information on how to set the `BASE_URL` the documentation on [Custom domains and the base URL](xref:guide/deployment#deploy-base-url).

## Check missing references and links with strict mode

By default, Jupyter Book will build your site even if there are warnings like broken internal references or missing files.

Use the `--strict` flag to check and raise warnings for these, and to treat warnings as errors, causing the build to fail if issues are detected. This is particularly useful for:

- **Catching broken cross-references** - Internal links that don't resolve to actual targets
- **Detecting missing files** - Files referenced in your TOC or includes that don't exist
- **Validating directives** - Ensuring all MyST directives have valid syntax and required parameters
- **CI/CD pipelines** - Preventing broken content from being deployed

### Using strict mode

To build your site with strict checking:

```bash
$ jupyter book build --html --strict
```

Or for static exports:

```bash
$ jupyter book build --pdf --strict
```

When strict mode is enabled, the build will fail with a non-zero exit code if any warnings are present, making it easy to catch issues in automated workflows.
