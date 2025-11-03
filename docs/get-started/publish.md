---
title: Publishing to the web
short_title: Publish a website
subtitle: Deploy your Jupyter Book to GitHub Pages, Curvenote, Netlify, and many other services.
subject: Quickstart tutorial
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
