# GitHub Pages and Actions

Since your content is already on GitHub, you can easily host it as a `github-pages`
website. This is a service where GitHub hosts your static files as if they were
a standalone website.

There are two ways to quickly host your book with GitHub Pages:

* **Manually push your book's HTML** to a branch that is hosted
  by GitHub Pages.
* **Use a GitHub Action to automatically build your book**
  and update your website when you change the content.

## Manually host your book with GitHub Pages

The easiest way to use GitHub-pages with your built HTML is to use the
[`ghp-import`](https://github.com/davisp/ghp-import)
tool. It is a lightweight Python package that makes it easier to push HTML content
to a GitHub repository.

```{note}
Ensure that your the HTML has been built for each page of your book
(see {doc}`the previous section <../start/build>`). There should be a collection of HTML
files in your book's `_build/html` folder.
```

Follow these steps to use `ghp-import`:

1. Install `ghp-import`

   ```
   pip install ghp-import
   ```
2. Call `ghp-import` and point it to your HTML files, like so:

   ```
   ghp-import -n -p -f mylocalbook/_build/html
   ```

This will cause `ghp-import` to push *all* of the contents of the `_build/html` folder
to the `gh-pages` branch of your current repository, and push the contents to GitHub.
By default, this generally means your site should now be viewable online.

```{warning}
Make sure that you included the `-n` - this tells GitHub *not* to build your book with
Jekyll, which we don't want because our HTML is already built!
```

## Automatically host your book with GitHub Actions

GitHub Actions is a tool that allows you to automate things
on GitHub. It is used for a variety of things, such as testing,
publishing packages, and continuous integration.

```{note}
You should be familiar with GitHub Actions before using them
to automatically host your Jupyter Books.
[See the GitHub Actions documentation](https://help.github.com/en/actions)
for more information.
```

To build your book with GitHub Actions, you'll need to create
an action that does the following things:

* Activates when a *push* event happens on `master` (or whichever)
  branch has your latest book content.
* Installs Jupyter Book and any dependencies needed to build
  your book.
* Builds your book's HTML.
* Uses a `gh-pages` action to upload that HTML to your `gh-pages` branch.

For reference, [here is a sample repository](https://github.com/executablebooks/github-action-demo)
that builds a book with GitHub Actions.

```{note}
Ensure that Jupyter Book's version in your `requirements.txt` file is at least
`0.7.0b`. This line will do the trick: `jupyter-book>=0.7.0b`.
```

Here is a simple YAML configuration
for a github action that will publish your book to a `gh-pages` branch.

```yaml
name: deploy-book

# Only run this when the master branch changes
on:
  push:
    branches:
    - master

# This job installs dependencies, build the book, and pushes it to `gh-pages`
jobs:
  deploy-book:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    # Install dependencies
    - name: Set up Python 3.7
      uses: actions/setup-python@v1
      with:
        python-version: 3.7

    - name: Install dependencies
      run: |
        pip install -r requirements.txt

    # Build the book
    - name: Build the book
      run: |
        jupyter-book build .

    # Push the book's HTML to github-pages
    - name: GitHub Pages action
      uses: peaceiris/actions-gh-pages@v3.6.1
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_build/html
```

If you want to deploy your site to GitHub Pages at a User and Organization repository (`<username>.github.io`), check another example workflow and available options at the README of [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages).
