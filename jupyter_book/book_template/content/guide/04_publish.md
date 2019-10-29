# Publishing your book online

Now that you've built the HTML for each **page**, it's
time to stitch together these pages into HTML for a **book**
and host it online. This means building the left Table of Contents and
stitching each of your pages together.

You've got two options to do this.

2. **Option 1: Build your book's HTML manually and host wherever you like**:

   Building your book's site locally lets you preview your book locally before you
   push it online. It also gives you more functionality than using
   GitHub Pages to build your book. However, it also requires you to install
   Ruby (an open source programming language) or to run Ruby with a containerization
   platform like Docker or Singularity.
   
   See the [guide to building your book's HTML manually](book-html.html) for information
   on how to do this.
   
1. **Option 2: Use GitHub Pages to build and host your book**:

   When you run `jupyter-book create` it generates the structure of a Jekyll
   template. GitHub Pages can automatically build a website from a Jekyll template,
   and you can use this to automatically generate the HTML for your book.
   
   See the [guide to building books with GitHub Pages](github-pages.html#Build-your-book's-HTML-automatically-with-GitHub-Pages)
   for information on how to do this.

## When should you build the HTML locally?

You might ask: if GitHub pages can build my site automatically from the intermediate files, why
build it locally? The main reason for this is that you get more flexibility by building locally
and serving raw HTML, as opposed to auto-building the site with GitHub-pages.

If you wish to use any **extra Jekyll plugins**, such as the `jekyll-scholar` plugin that
enables you to add citations and bibliographies, then you need to build your site
locally as HTML. GitHub Pages doesn't let you enable any extra plugins if it auto-builds your site.
In addition, if you'd like to **host your book's HTML anyhwere other than GitHub Pages**,
then you'll need to build the book's HTML on your own.

### Prerequisites

Ensure that your the HTML has been built for each page of your book
(see [the previous section](03_build.html)). There should be a collection of HTML
files in your book's `_build/` folder.

## Create an *online* repository for your book

Regardless of the approach you use for publishing your book online, it will require
you to host your book's content in a GitHub repository.

This section covers the steps to create your own GitHub repository,
and to add your book's content to it.

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

Now that your repository is created and you have your book content pushed to it,
it's time to publish your book online. The next sections cover how to do this.
