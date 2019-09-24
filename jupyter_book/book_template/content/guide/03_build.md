# Building and publishing your book

Once you've added content and configured your book, it's time to
build the raw material that Jekyll will use to turn your book into a website.
We'll also cover how to turn this book into the HTML for a website that can
be served online.

## Build the book's intermediate files

Now that you've got the files installed content is in the book, you can build
your book. The build process uses the fields filled out in `_config.yml` and other configuration files to generate Markdown files which can be converted by Jekyll (or GitHub Pages) automatically to HTML files for your site. In particular, the build process leading to a usable site requires the fields in these files to be filled out correctly.

Build your book by running the following command:

```
jupyter-book build mybookname/
```

This will:

* Use the links specified in the `_data/toc.yml` file (pointing to files in `/content/`) and
  do the following:
  * Run `nbconvert` to turn the `.ipynb` files into Markdown files
  * Replace relative image file paths so that they work on your new built site
  * Clean up formatting issues for things like MathJax to display properly
  * Place all these generated files in the `mybookname/_build/` directory.

Note that `jupyter-book` will automatically update any files in `_build/` that are older
than the timestamp of the corresponding file in your `content/` folder.

From here, you have **two options**

1. [**Option 1: GitHub builds the site for you**](#create-an-online-repository-for-your-book):

   By default, pushing a repository
   cloned from Jupyter Book will tell GitHub to use Jekyll to build the repository
   using the config files in the project root and the HTML files in the `_build` directory when you push changes.

   For more information and help troubleshooting setting up Jupyter-Book with a GitHub repository and GitHub pages, see [the relevant section in the documentation below](#troubleshooting).


2. [**Option 2: Build your site's HTML locally**](./05_advanced.html#build-the-books-site-html-locally):

   Building your book's site locally lets you preview your book locally before you
   push it online. It also gives you a bit more functionality than using
   GitHub Pages to build your book. However, it also requires you to install
   Docker or Singularity (containerization platforms) _or_
   Ruby (an open source programming language).
   If you'd like to build your site locally then see the
   [Advanced topics page](./05_advanced.html#build-the-books-site-html-locally).

## Create an *online* repository for your book

You've created your book on your own computer, but you haven't yet added it
online. This section covers the steps to create your own GitHub repository,
and to add your book's content to it. In this case, we'll use GitHub-Pages
to build the HTML for your book. If you wish to do this manually, see the
advanced topic [guide to building your book's HTML locally](05_advanced.html#build-the-books-site-html-locally)

1. First, log-in to GitHub, then go to the "create a new repository" page:

   https://github.com/new

2. Next, add a name and description for your book. You can choose whatever
   initialization you'd like.

3. Now, clone the empty repository to your computer:

   ```bash
   git clone https://github.com/<my-org>/<my-book-name>
   ```

4. Copy all of your book files and folders (what was created when you ran `jupyter-book create mybook`)
   into the new repository. For example, if you created your book locally with `jupyter-book create mylocalbook`
   and your online repository is called `myonlinebook`, the command would be:

   ```bash
   cp -r mylocalbook/* myonlinebook/
   ```

   This will copy over the local book files into the online book folder.

5. Commit the new files to the repository in `myonlinebook/`:

   ```bash
   cd myonlinebook
   git add ./*
   git commit -m "adding my first book!"
   git push
   ```

That's it!

## Publish your book online with GitHub Pages

Once you've built the intermediate files for your book (in `_build`) or built the HTML
for your book (in `_site`), you can push your book contents to GitHub so that
others can access your book. To do so, follow these steps:

0. Confirm that your site files are built. You should see a
   collection of HTML files/folders in the `_build` folder (if you've run `jupyter-book build`),
   or a collection of HTML in your `_site/` folder (if you've also run `make serve` and/or `bundle exec guard`, see [instructions for building your site locally](./05_advanced.html#building-your-site-locally-with-ruby)).
1. Commit and push the changes to your repository.
2. Enable GitHub site building for your repository.

   From your GitHub repository, click `Settings` then scroll down to the
   `GitHub Pages` section. You should see the message `Your site is published at <YOUR-URL>`.
   Ensure that you're building from the correct folder.

3. Go to the URL listed at `<YOUR-URL>` and you should see your live site.

### Troubleshooting

GitHub Pages come in two types: (1) Organization/User pages, and (2) Project pages. We will assume you use the Project pages setup for your GitHub repository, the instructions for which can be found [here](https://help.github.com/en/articles/user-organization-and-project-pages#project-pages-sites).

_Make sure that the name of your repository on GitHub matches the value of `baseurl` in your `_config.yml` file._ Otherwise the setup will not work. 

If problems persist, try deleting your `_build` directory and then re-running `jupyter-book build`. (By default `jupyter-book build` will not modify files that have already been built, even if they reflect values from an outdated version of `_config.yml`.) Push again to your repository. If 404 or other errors persist, make sure also that your browser is not looking at a cached version of your website, e.g. by deleting recent cache in your browser settings or using a shortcut like `Ctrl-Shift-R` in Google Chrome. Sometimes waiting 10 minutes will work, but if waiting 10 minutes doesn't work then there is most likely an additional issue that needs to be addressed.

[Building your site locally](./05_advanced.html#build-the-books-site-html-locally), if possible, can also help to diagnose problems that might be happening when uploading to GitHub. Note that the root of your GitHub repository should be _the same_ as the root of your project directory if you have only used `jupyter-book build` and not used [`make serve` to have Jekyll build your repository locally](./05_advanced.html#building-your-site-locally-with-ruby). 

However, if you have [used `make serve` to have Jekyll build your repository locally](./05_advanced.html#building-your-site-locally-with-ruby), then you have the additional option of making the `_site/` directory generated by this process the root of your GitHub repository and it should still work (as long as e.g. the value of `baseurl` in `_config.yml` had a value matching the name of your GitHub repository when building). Keep in mind though that since all of these files are generated by files which would not be in the GitHub repository, this project structure might be more unwieldy to manage in the long-term.
