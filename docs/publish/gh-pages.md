(publish/gh-pages)=
# GitHub Pages and Actions

Once your content is on GitHub, you can easily host it as a [GitHub Pages](https://docs.github.com/en/github/working-with-github-pages) website. This is a service where GitHub hosts your static files as if they were a standalone website.

There are three ways you can quickly host your book with GitHub Pages:

* Copy/paste your book's HTML to a `docs/` folder, or a `gh-pages` branch of your repository.
* Use the `ghp-import` tool to automatically push your built documentation to a `gh-pages` branch.
* Use a GitHub Action to automatically build your book and update your website when you change the content.

We'll cover each option below.

## Manually put your book's contents online

In this case, you manually build your book's files, and then push them to a GitHub repository in order to be hosted as a website.
There are two ways to do so

:::{admonition} Make sure these steps are done first
:class: warning
Before you do any of the following, make sure that these two steps are completed:

1. Build HTML for your book (see [](../start/build.md)).
   There should be a collection of HTML files in your book's `_build/html` folder.
2. Configure your GitHub repository to serve a website via GitHub Pages at the location of your choice (either a branch or the `docs/` folder).
   See [the GitHub Pages documentation](https://docs.github.com/en/github/working-with-github-pages) for more information.
:::

### (Option 1) Copy and paste your book's `_build` contents into a new folder

The simplest way to host your book online is to simply copy everything that is inside `_build` and put it in a location where GitHub Pages knows to look.
There are two places we recommend:

In a separate branch
: You can configure GitHub Pages to build any books that are in a branch that you specify.
  By default, this is `gh-pages`.

In a `docs/` folder of your main branch
: If you'd like to keep your built book alongside your book's source files, you may paste them into a `docs/` folder.
  :::{warning}
  Note that copying all of your book's build files into the same branch as your source files will cause your repository to become very large over time, especially if you have many images in your book.
  :::

In either case, follow these steps:

1. Copy the contents of `_build/html` directory into `docs` (or your other branch).
2. Add a file called `.nojekyll` alongside your book's contents.
   This tells GitHub Pages to treat your files as a "static HTML website".
3. Push your changes to GitHub, and [configure it to start hosting your documentation](https://docs.github.com/en/github/working-with-github-pages).

### (Option 2) Automatically push your build files with `ghp-import`

The easiest way to use GitHub Pages with your built HTML is to use the [`ghp-import`](https://github.com/davisp/ghp-import) package. `ghp-import` is a lightweight Python package that makes it easy to push HTML content to a GitHub repository.

`ghp-import` works by copying *all* of the contents of your built book (i.e., the `_build/html` folder) to a branch of your repository called `gh-pages`, and pushes it to GitHub.
The `gh-pages` branch will be created and populated automatically for you by `ghp-import`.
To use `ghp-import` to host your book online with GitHub Pages follow the steps below:

1. Install `ghp-import`

   ```bash
   pip install ghp-import
   ```

2. From the `master` branch of your book's root directory (which should contain the `_build/html` folder) call `ghp-import` and point it to your HTML files, like so:

   ```bash
   ghp-import -n -p -f _build/html
   ```

```{warning}
Make sure that you included the `-n`. This adds a file called `.nojekyll` to the output of your book, which tells GitHub *not* to build your book with
[Jekyll](https://jekyllrb.com/).
```

Typically after a few minutes your site should be viewable online at a url such as: `https://<user>.github.io/<myonlinebook>/`. If not, check your repository settings under **Pages** to ensure that the `gh-pages` branch is configured as the build source for GitHub Pages and/or to find the url address GitHub is building for you.

To update your online book, make changes to your book's content on the `main` branch of your repository, re-build your book with `jupyter-book build mybookname/` and then use `ghp-import -n -p -f mylocalbook/_build/html` as before to push the newly built HTML to the `gh-pages` branch.

```{warning}
Note this warning from the [`ghp-import` GitHub repository](https://github.com/davisp/ghp-import):

"...*`ghp-import` will DESTROY your gh-pages branch... and assumes that the `gh-pages` branch is 100% derivative. You should never edit files in your `gh-pages` branch by hand if you're using this script...*"
```

(publish/gh-actions)=
## Automatically host your book with GitHub Actions

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

````{margin}
```{note}
Make sure you use Jupyter Book >= `0.7.0`.
To use the latest version, run `pip install -U jupyter-book`.
```
````

:::{tip}
You can use the [Jupyter Book cookiecutter](https://github.com/executablebooks/cookiecutter-jupyter-book) to quickly create a book template that already includes the GitHub Actions workflow file needed to automatically deploy your book to GitHub Pages:

```bash
jupyter-book create --cookiecutter mybookpath/
```

For more help, see the [Jupyter Book cookiecutter GitHub repository](https://github.com/executablebooks/cookiecutter-jupyter-book), or run:

```bash
jupyter-book create --help
```
:::

Here is a simple YAML configuration
for a Github Action that will publish your book to a `gh-pages` branch.

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

# This job installs dependencies, builds the book, and pushes it to `gh-pages`
jobs:
  deploy-book:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    # Install dependencies
    - name: Set up Python 3.8
      uses: actions/setup-python@v2
      with:
        python-version: 3.8

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


### GitHub Pages Configuration

The settings for GitHub Pages must be configured to reflect the method used to build the docs.
Access a project's Pages settings at `Settings` -> `Pages`.
Set `Source` to `Deploy from a branch` and set `Branch` to `gh-pages`.
The build location should be `/ (root)` for each of the methods described here.
However, you may choose to place the build files in `/docs` and configure Pages accordingly.

![Screen Shot 2022-10-20 at 7 15 30 PM](https://user-images.githubusercontent.com/13797903/197082656-bf5cbea4-1ff4-49dd-9d01-15cfe4aff67e.png)

## Use a custom domain with GitHub Pages

By default, GitHub Pages will host your book at a URL like `githubusername.github.io/yourbookname`.
If instead you'd like to use a custom domain with your book, you'll need to take an extra step in the instructions provided above.
In both cases, you'll need to manually add a `CNAME` file that indicates the custom URL for your book.
To do so, follow these steps:

- [Follow the instructions for setting up a custom domain with your repository](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain).
- The result of this will generate a `CNAME` file in your repository's filesystem.
  This is the file that tells GitHub pages where your site lives, but it will be *overwritten* if you build and push your book's HTML a second time.
- Copy the contents of that CNAME file, and manually add the CNAME using either `ghp-import` or the GitHub Action described above.
  - For `ghp-import`, see [the CNAME flag instructions](https://github.com/c-w/ghp-import#usage).
  - For the GitHub Action above, see [the CNAME configuration instructions](https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-add-cname-file-cname).
