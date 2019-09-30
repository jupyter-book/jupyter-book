# Publishing your book online

Now that you've built the HTML for each **page**, it's
time to stitch together these pages into HTML for a **book**
and host it online. This means building the left Table of Contents and
stitching each of your pages together.

You've got two options to do this.

1. **Option 1: GitHub builds and hosts your book with GitHub Pages**:

   When you run `jupyter-book create` it generates the structure of a Jekyll
   template. GitHub Pages can automatically build a website from a Jekyll template,
   and you can use this to automatically generate the HTML for your book.

2. **Option 2: Build your book's HTML locally and host wherever you like**:

   Building your book's site locally lets you preview your book locally before you
   push it online. It also gives you more functionality than using
   GitHub Pages to build your book. However, it also requires you to install
   Ruby (an open source programming language) or to run Ruby with a containerization
   platform like Docker or Singularity.

We'll cover each option below.

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

## Publish your book online with GitHub Pages

Once you've built the intermediate files for your book (in `_build`) or built the HTML
for your book (in `_site`), you can push your book contents to GitHub so that
others can access your book. To do so, follow these steps:

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

## Build the book's site HTML locally

This section covers how to build the HTML for your book locally, instead of
using GitHub Pages.

In order to locally build your book's HTML with Jekyll, you'll take one of two approaches:

1. Install a copy of the Ruby language (which is a free open-source language, but can be a pain to install).
2. Use a container software (Docker or Singularity) along with a Docker image that we've
   prepared for you
   [from this Dockerfile](https://github.com/jupyter/jupyter-book/blob/master/jupyter_book/Dockerfile).

We recommend installing Ruby with one of the supplied methods first, and if this fails,
try installing with a container tool such as Docker.

### Install Ruby and build your book HTML

The most straightforward way to build your book's HTML is to install
Ruby and Jekyll.

In this case, you'll need Ruby, an open-source programming language, to build your book's
HTML. You won't need to know how to program in Ruby, we'll just use some tools that utilize
Ruby's libraries.

There are a few different methods for installing Ruby, and their ease will depend
on the operating system that you're using (in general, `*nix` platforms are more
straightforward to use for installing Ruby).

In the following sections we'll cover a few ways to install Ruby, they are roughly ordered
from most-straightforward to most-difficult. Once you've finished those steps,
head to [install ruby plugins](#install-ruby-plugins) and follow the directions.

#### Using the `conda-forge` recipe `rb-github-pages`

The easiest way to install Ruby on *nix systems is to use
the *`conda`* package manager. On some systems the following should work:

```bash
conda install -c conda-forge rb-github-pages
```

This will install pre-compiled binaries for the Ruby package GitHub pages, Jekyll, and all of their dependencies. If this works for you, you can skip straight to [the section using `make install`](#install-ruby-plugins).

#### Using the official Jekyll instructions

The [Jekyll Documentation](https://jekyllrb.com) provides their own set of instructions
for how to install Ruby locally on your system. These are a bit more involved, but in
general should work for many operating systems. Here are a few links to OS-specific
instructions.

* [MacOS Instructions](https://jekyllrb.com/docs/installation/macos/)
* [Ubuntu Instructions](https://jekyllrb.com/docs/installation/ubuntu/)
* [Linux (non-Ubuntu) Instructions](https://jekyllrb.com/docs/installation/other-linux)
* [Windows Instructions](https://jekyllrb.com/docs/installation/windows/)

#### Install base Ruby with `conda`

If you are on a platform for which the `rb-github-pages` package isn't available, you can also try install Ruby and a C++ compiler manually using *`conda`*, as follows:

```bash
conda install -c conda-forge ruby
```

Once you have Ruby installed, the conda-built clang compiler for your
system needs to be installed. Details depend on your OS and are shown below.

##### Install clang compilers

###### On OSX

Two steps are needed on OSX. First, install the *`conda`'s* clang compiler:

```bash
conda install -c conda-forge clangxx_osx-64
```

If you are running OSX 10.14 (Mojave) you also need to install system libraries in
the default *nix locations by running

```bash
open /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg
```

###### On Linux

Install *`conda`'s* clang compiler:

```bash
conda install -c conda-forge gxx_linux-64
```

#### Install Ruby plugins

Regardless of the approach used above, you'll next install
the Ruby plugins for your specific
book. To do so, change into your book's directory, and run

```bash
make install
```

which will install the following things:

* Bundler (a Ruby dependency management tool) if it is not already installed
  (e.g. by running `conda install -c conda-forge rb-github-pages`)
* A collection of Jekyll plugins for your book

You can then preview your book's site locally by running this command:

```
make serve
```

This should run Jekyll, building your site, and then open up a port on your computer with a live version of the book.

### Building your book HTML with Containers

If the above steps do not work for you, then you can try building your
book's HTML with containers.

[Containers](https://www.docker.com/resources/what-container) can
provide an easier installation for many systems.
If you are developing on a system where you have administrator privileges
(i.e., you have `root` permissions), we recommend you use [Docker](https://docs.docker.com/get-started/).

We also provide instructions for using [Singularity](https://www.sylabs.io/guides/2.6/user-guide/quick_start.html),
an alternate containerization software for systems where you do not have administrator privileges.
To learn more about using containers, please see the
[Docker for scientists guide](https://neurohackweek.github.io/docker-for-scientists/).

#### Docker

First, you'll need to make sure you have Docker installed.
There are [installation instructions for each operating system](https://hub.docker.com/search/?type=edition&offering=community)
to guide you through this process.

Once Docker is available on your system, you can build the image locally with:

```bash
docker pull emdupre/jupyter-book
```

You can then access this image with the following command.
Make sure to specify the full path to your Jupyter Book, rather than the relative path!

```bash
docker run --rm --security-opt label:disable  \
   -v /full/path/to/your/book:/srv/jekyll \
   -p 4000:4000 \
   -it -u 1000:1000 \
   emdupre/jupyter-book
```

If you navigate to `http://0.0.0.0:4000/jupyter-book/` in your browser,
you should see a preview copy of your book.
If you instead see an error, please try to update your local book;
see [the Jupyter Book FAQ section](https://jupyterbook.org/guide/04_faq.html#how-can-i-update-my-book)
for more details on how to do so.

You'll find the HTML for your book in the `_site/` folder.

#### Singularity

If you are on a system where you do not have administrator privileges (such as a shared
computing cluster), you will not be able to use Docker.
Instead, you can use Singularity.
First, you'll need to check with your resource manager that Singularity is available
on your system.

You can then create a Jupyter Book Singularity image using:

```bash
singularity build jupyter-book.simg docker://emdupre/jupyter-book
```

Next, you can access this image with the following command.
Make sure to specify the full path to your Jupyter Book, rather than the relative path!

```bash
singularity run -B /full/path/to/your/book:/srv/jekyll \
    --pwd /srv/jekyll \
    jupyter-book.simg
```

And that's it! If you navigate to `http://127.0.0.1:4000/jupyter-book/` in your browser,
you should see a preview copy of your book.

### Hosting your book's HTML online

If you're choosing to build the HTML for your book by hand, there are a few options for
where you should store the book. The two most common approaches are:

* **Use the `gh-pages` or `master` branch of a GitHub repository**. In this case, the build
  process is very similar to [using GH-pages to build the HTML for your site](https://jupyterbook.org/guide/03_build.html#publish-your-book-online-with-github-pages).
  However, there is one caveat: you must include a file called `.nojekyll` along with the HTML
  files of your book. This tells GitHub **not** to use Jekyll to build the HTML.
* **Use a static site hosting service like Netlify**. There are many services that will simply
  host a collection of static HTML files for you in a public URL. The most common is
  [the Netlify CMS service](https://www.netlifycms.org/). Follow the instructions on this site
  for information on how you should upload your HTML files to work with Netlify.
