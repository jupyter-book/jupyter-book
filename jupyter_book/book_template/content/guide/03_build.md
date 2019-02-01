# Building and publishing your book

Once you've added content and configured your book, it's time to
build the raw material that Jekyll will use to turn your book into a website.
We'll also cover how to turn this book into the HTML for a website that can
be served online.

## Build the book's markdown

Now that you've got the files installed content is in the book, you can build
your book.

Build your book by running the following command:

```
jupyter-book build mybookname/
```

This will:

* Use the links specified in the `_data/toc.yml` file (pointing to files in `/content/`) and
  do the following:
  * Run `nbconvert` to turn the `.ipynb` files into markdown
  * Replace relative image file paths so that they work on your new built site
  * Clean up formatting issues for things like MathJax to display properly
  * Place all these generated files in the `mybookname/_build/` directory.

Note that `jupyter-book` will automatically update any files in `_build/` that are older
than the timestamp of the corresponding file in your `content/` folder.

From here, you have **two options**

1. **Option 1: Jekyll builds the site for you**:

   By default, pushing a repository
   cloned from Jupyter Book will tell GitHub to use Jekyll to build the repository
   when you push changes (your repository is configured properly on GitHub).
   Simply tell GitHub to build a site from your repo, then push the changes to
   your GitHub repo and that's it!

2. **Option 2: Build your site's HTML locally**:

   Building your book's site locally lets you preview your book locally before you
   push it online. It also gives you a bit more functionality than using
   GitHub Pages to build your book. However, it also requires you to install Ruby.
   If you'd like to build your site locally then jump to the next section.

## Build the book's site HTML locally (optional)

If you'd like to build your book's site HTML locally, you'll need to first
install the necessary dependencies and then build the HTML. Follow these
steps to do so.

### Install the dependencies to preview your book locally

You'll need Ruby, an open-source programming language, to build your site's
HTML with Jekyll. The easiest way to install Ruby on *nix systems is to use
the *`conda`* package manager:

```bash
conda install -c conda-forge ruby
```
Once you have Ruby installed, run

```bash
make install
```

which will install Bundler (a Ruby depency management tool) and then install the plugins
needed to build the site for your book.

### Build the site HTML for your book

Once you've generated the markdown for your notebooks and installed the
necessary dependencies. You are ready to build your site HTML.

Ensure that your notebooks have been converted to markdown, there should be a
collection of them in `_build/`.

Once you've confirmed this, run this command to generate your book's HTML using
Jekyll:

```
make site
```

Alternatively, you can preview your book's site locally by running this command:

```
make serve
```

This should open up a port on your computer with a live version of the book.


### When should you build the HTML locally?

You might ask: if GitHub pages can build my site automatically from the markdown files, why
build it locally? The main reason for this is that you get more flexibility by building locally
and serving raw HTML, as opposed to auto-building the site with GitHub-pages.

In particular, if you wish to use any **extra Jekyll plugins**, such as the `jekyll-scholar` plugin that
enables you to add citations and bibliographies, then you need to build your site
locally as HTML. GitHub-pages doesn't let you enable any extra plugins if it auto-builds your site.


## Publish your book online with GitHub Pages

Once you've built the markdown for your book (in `_build`) or built the HTML
for your book (in `_site`), you can push your book contents to GitHub so that
others can access your book. To do so, follow these steps:

0. Confirm that your site files are built. You should see a
   collection of markdown files/folders in the `_build` folder,
   or a collection of HTML in your `_site/` folder.
1. Commit and push the changes to your repository.
2. Enable GitHub site building for your repository.

   From your GitHub repository, click `Settings` then scroll down to the
   `GitHub Pages` section. You should see the message `Your site is published at <YOUR-URL>`.
   Ensure that you're building from the correct folder.

3. Go to the URL listed at `<YOUR-URL>` and you should see your live site.
