---
jupyter:
  jupytext:
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.1'
      jupytext_version: 1.2.4
  kernelspec:
    display_name: Python 3
    language: python
    name: python3
---

# Publishing your book with GitHub Pages


GitHub pages is a [free service that GitHub provides](https://pages.github.com/) to let you host website content
using your GitHub repositories.

Once you've built the intermediate files for your book (in `_build`) or built the HTML
for your book (in `_site`), you can push your book contents to GitHub so that
others can access your book.

**Prerequisites**

* **If you are building your book's HTML manually**

  We assume that you have already [built your book's HTML](book-html.html) and that
  your HTML content is in the `_site/` folder. We also assume that you have a
  [GitHub repository created for your book](../03_build.html#Create-an-online-repository-for-your-book).
* **If you are using GitHub-page's Jekyll builder**

  We assume that you have a
  [GitHub repository created for your book](../03_build.html#Create-an-online-repository-for-your-book).
  We also assume that your book's template and content have been pushed to
  your GitHub repository.

## Publish your book's HTML manually to GitHub-pages

You can manually publish HTML to GitHub-pages so that it will serve a website
for you. To do so, we'll need to push the HTML for our book to a branch, tell GitHub-pages
that this branch contains raw HTML (not a Jekyll template), and then activate
GitHub-pages on the repository. To do this, follow these steps:

0. Confirm that your book's HTML is built. You should see a
   collection of HTML files/folders in the `_site` folder.
1. Install the `ghp-import` tool. This is a command-line tool for
   quickly pushing some built HTML to a GitHub-pages branch.

   ```bash
   pip install ghp-import
   ```
2. Use `ghp-import` to push your book's HTML onto the `gh-pages` branch of your repository.

   ```bash
   ghp-import -n -p -f _site
   ```

   The `-n` adds a `.nojekyll` file to your book's built HTML, and the `-p` and `-f` tell
   `ghp-import` to push the contents of `_site/` to the `gh-pages` branch. Run `ghp-import -h`
   to see more configuration options for this tool.
3. Confirm that your `gh-pages` branch has newly-pushed HTML for your book. You should see
   a `.nojekyll` file as well as the contents of `_site/` in the **root** of your `gh-pages` branch.
4. Enable GitHub site building for your repository.

   From your GitHub repository, click `Settings` then scroll down to the
   `GitHub Pages` section. You should see the message `Your site is published at <YOUR-URL>`.
   Ensure that you're building from the `gh-pages` branch.

5. Go to the URL listed at `<YOUR-URL>` and you should see your live site.

## Automatically build your book's HTML with the GitHub Pages Jekyll builder

You'll need to activate GitHub-pages on your repository in order to tell GitHub
to host a website from the repository's contents.
To do so, follow these steps:

0. Confirm that each page's HTML is built. You should see a
   collection of HTML files/folders in the `_build` folder.
1. Commit and push the changes to your repository.
2. Enable GitHub site building for your repository.

   From your GitHub repository, click `Settings` then scroll down to the
   `GitHub Pages` section. You should see the message `Your site is published at <YOUR-URL>`.
   Ensure that you're building from the correct folder.

3. Go to the URL listed at `<YOUR-URL>` and you should see your live site.

That should be all that is needed for GitHub Pages to automatically build
and publish your site. Any time you push changes to the `_build/` folder
(by running `jupyter-book build` locally and pushing the changes to GitHub),
your book content will update.
