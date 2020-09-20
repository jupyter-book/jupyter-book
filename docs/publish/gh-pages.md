(publish/gh-pages)=
# GitHub Pages and Actions

Once your content is on GitHub, you can easily host it as a [GitHub Pages](https://docs.github.com/en/github/working-with-github-pages) website. This is a service where GitHub hosts your static files as if they were a standalone website.

There are two ways you can quickly host your book with GitHub Pages:

* Push your book's HTML to a branch that is hosted
  by GitHub Pages.
* Use a GitHub Action to automatically build your book
  and update your website when you change the content.

## Push your book to a branch hosted by GitHub Pages

The easiest way to use GitHub-pages with your built HTML is to use the [`ghp-import`](https://github.com/davisp/ghp-import) package. `ghp-import` is a lightweight Python package that makes it easy to push HTML content to a GitHub repository.

`ghp-import` works by copying *all* of the contents of your built book (i.e., the `_build/html` folder) to a branch of your repository called `gh-pages`, and pushes it to GitHub. The `gh-pages` branch will be created and populated automatically for you by `ghp-import`. To use `ghp-import` to host your book online with GitHub Pages follow the steps below:

```{note}
Before performing the below steps, ensure that HTML has been built for each page of your book
(see {doc}`the previous section <../start/build>`). There should be a collection of HTML
files in your book's `_build/html` folder.
```

1. Install `ghp-import`

   ```bash
   pip install ghp-import
   ```

2. From the `master` branch of your book's root directory (which should contain the `_build/html` folder) call `ghp-import` and point it to your HTML files, like so:

   ```bash
   ghp-import -n -p -f _build/html
   ```

```{warning}
Make sure that you included the `-n` - this tells GitHub *not* to build your book with
[Jekyll](https://jekyllrb.com/), which we don't want because our HTML is already built!
```

Typically after a few minutes your site should be viewable online at a url such as: `https://<user>.github.io/<myonlinebook>/`. If not, check your repository settings under **Options** -> **GitHub Pages** to ensure that the `gh-pages` branch is configured as the build source for GitHub Pages and/or to find the url address GitHub is building for you.

To update your online book, you would simply make changes to your book's content on the `master` branch of your repository, re-build your book with `jupyter-book build mybookname/`, and then use `ghp-import -n -p -f mylocalbook/_build/html` as before to push the newly built HTML to the `gh-pages` branch.

```{warning}
Note this warning from the [`ghp-import` GitHub repository](https://github.com/davisp/ghp-import):

"...*`ghp-import` will DESTROY your gh-pages branch...and assumes that the `gh-pages` branch is 100% derivative. You should never edit files in your `gh-pages` branch by hand if you're using this script...*"
```

(publish/gh-actions)=
## Automatically host your book with GitHub Actions

[GitHub Actions](https://docs.github.com/en/actions) is a tool that allows you to automate things on GitHub.
It is used for a variety of things, such as testing, publishing packages, and continuous integration.

Note that if you're not hosting your book on GitHub,
or if you'd like another, user-friendly service to build it automatically,
see the [guide to publishing your book on Netlify](./netlify.md).

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
`0.7.0`.
```

:::{tip}
You can use the [Jupyter Book cookiecutter](https://github.com/executablebooks/cookiecutter-jupyter-book), to quickly create a book template that already includes the GitHub Actions workflow file needed to automatically deploy your book to GitHub Pages:

```bash
jupyter-book create --cookiecutter mybookpath/
```

For more help, see the [Jupyter Book cookiecutter GitHub repository](https://github.com/executablebooks/cookiecutter-jupyter-book), or run:

```bash
jupyter-book create --help
```
:::

Here is a simple YAML configuration
for a github action that will publish your book to a `gh-pages` branch.

```yaml
name: deploy-book

# Only run this when the master branch changes
on:
  push:
    branches:
    - master
    # If your git repository has the Jupyter Book within some-subfolder next to
    # unrelated files, you can make this run only if a file within that specific
    # folder has been modified.
    #
    # paths:
    # - some-subfolder/**

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
