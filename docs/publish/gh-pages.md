(publish/gh-pages)=

# GitHub Pages and Actions

Once your Book is on GitHub, you can easily host it as a [GitHub Pages](https://docs.github.com/en/pages/quickstart) website. This is a service where GitHub hosts your static files as if they were a standalone website. Note [there are a multiple kinds of GitHub Pages sites](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#types-of-github-pages-sites). The quickest way to get started with Jupyter Book on GitHub Pages is to use GitHub Actions to deploy the built HTML files.

[GitHub Actions](https://docs.github.com/en/actions) is a tool that allows you to automate things on GitHub.
It is used for a variety of things, such as testing, publishing packages and continuous integration.

Note that if you're not hosting your book on GitHub,
or if you'd like another, user-friendly service to build it automatically,
see the [guide to publishing your book on Netlify](./netlify.md).

```{note}
You should be familiar with GitHub Actions before using them
to automatically host your Jupyter Books.
[See the GitHub Actions documentation](https://help.github.com/en/actions)
for more information.
```

## Enable

To build your book with GitHub Actions, you'll first need to **enable GitHub pages for your project**. The GitHub Pages settings for a repository can be found at `Settings` -> `Pages`, where `Source` should be set to `GitHub Actions`.

![Setting the source for GitHub Pages in the repository settings](../images/ghp-source.png)

## Workflow

Next, you'll need to setup a workflow that does the following things:

- Activates when a _push_ event happens on `master` (or whichever)
  branch has your latest book content.
- Installs Jupyter Book and any dependencies needed to build
  your book.
- Builds your book's HTML.
- [Uses the `actions/deploy-pages` action to upload that HTML to GitHub Pages.](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow)

````{margin}
```{note}
Make sure you use Jupyter Book >= `1.0.0`.
To use the latest version, run `pip install -U jupyter-book`.
```
````

Below are simple YAML configurations for a Github Action that will publish a Jupyter Book found _in the root of the GitHub repository_ to GitHub Pages. For more information on GitHub Pages, such as configuring custom domains, visit the [GitHub Pages documentation](https://docs.github.com/en/pages).

**Copy the following to `.github/workflows/deploy.yml`** based on which package manager you're using. You can [name the workflow file something else](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows#about-workflows) if you like.

### pip

```yaml
name: deploy-book

# Run this when the master or main branch changes
on:
  push:
    branches:
      - master
      - main
    # If your git repository has the Jupyter Book within some-subfolder next to
    # unrelated files, you can make this run only if a file within that specific
    # folder has been modified.
    #
    # paths:
    # - some-subfolder/**

# This job installs dependencies, builds the book, and pushes it to `gh-pages`
jobs:
  deploy-book:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v5

      # Install dependencies
      - name: Set up Python
        uses: actions/setup-python@v6
        with:
          python-version: "3.13"
          cache: pip # Implicitly uses requirements.txt for cache key

      - name: Install dependencies
        run: pip install -r requirements.txt

      # (optional) Cache your executed notebooks between runs
      # if you have config:
      # execute:
      #   execute_notebooks: cache
      - name: cache executed notebooks
        uses: actions/cache@v4
        with:
          path: _build/.jupyter_cache
          key: jupyter-book-cache-${{ hashFiles('requirements.txt') }}

      # Build the book
      - name: Build the book
        run: |
          jupyter-book build .

      # https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow

      # Upload the book's HTML as an artifact
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: _build/html

      # Deploy the book's HTML to GitHub Pages
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Conda

Here's how to build using [Conda (Anaconda)](https://docs.conda.io/projects/conda/en/stable/) with an [`environment.yml`](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-from-an-environment-yml-file). This assumes

```yaml
name: deploy-book

# Run this when the master or main branch changes
on:
  push:
    branches:
      - master
      - main
    # If your git repository has the Jupyter Book within some-subfolder next to
    # unrelated files, you can make this run only if a file within that specific
    # folder has been modified.
    #
    # paths:
    # - some-subfolder/**

# This job installs dependencies, builds the book, and pushes it to `gh-pages`
jobs:
  deploy-book:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    # https://github.com/marketplace/actions/setup-miniconda#example-3-other-options
    defaults:
      run:
        shell: bash -el {0}
    steps:
      - uses: actions/checkout@v5

      # Install dependencies
      - uses: conda-incubator/setup-miniconda@v3
        with:
          # If you don't have `python` included as a package in your `environment.yml`:
          # python-version: '3.13'
          environment-file: environment.yml
          auto-activate-base: false
          activate-environment: computing-in-context

      # Build the book
      - name: Build the book
        run: |
          jupyter-book build .

      # Upload the book's HTML as an artifact
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: _build/html

      # Deploy the book's HTML to GitHub Pages
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Confirm

1. Commit the changes.
1. Push the changes to GitHub.
1. [View the latest `deploy-book` workflow run.](https://docs.github.com/en/actions/how-tos/monitor-workflows/use-the-visualization-graph)
1. Wait for it / confirm it passed.
1. [View your published site.](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site#viewing-your-published-site)
