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

# Build the book's site HTML locally

This section covers how to build the HTML for your book locally, instead of
using GitHub Pages. This allows you to host the book's HTML anywhere you like.

In order to locally build your book's HTML with Jekyll, you'll take one of two approaches:

1. Install a copy of the Ruby language (which is a free open-source language, but can be a pain to install).
2. Use a container software (Docker or Singularity) along with a Docker image that we've
   prepared for you
   [from this Dockerfile](https://github.com/jupyter/jupyter-book/blob/master/jupyter_book/Dockerfile).

We recommend installing Ruby with one of the supplied methods first, and if this fails,
try installing with a container tool such as Docker.

<!-- #region {"tags": ["popout"]} -->
**If you wish to use GitHub's Jekyll builder** then you can skip
this section, because GitHub will automatically build your book's
HTML with its own version of Jekyll. In this case, skip to
[the GitHub Pages publishing guide](public/github-pages.html).
<!-- #endregion -->

<!-- #region -->
## Building your book with Ruby

The most straightforward way to build your book's HTML is to install
Ruby and Jekyll.

In this case, you'll need Ruby, an open-source programming language, to build your book's
HTML. You won't need to know how to program in Ruby, we'll just use some tools that utilize
Ruby's libraries.

### Installing Ruby

There are a few different methods for installing Ruby, and their ease will depend
on the operating system that you're using (in general, `*nix` platforms are more
straightforward to use for installing Ruby).

In the following sections we'll cover a few ways to install Ruby, they are roughly ordered
from most-straightforward to most-difficult. Once you've finished those steps,
head to [install ruby plugins](#install-ruby-plugins) and follow the directions.

#### Using the `conda-forge` recipe `rb-github-pages`

The easiest way to install Ruby on `*nix` systems is to use
the `conda` package manager. On some systems the following should work:

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

#### Using `conda-forge` to install Ruby from scratch

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
the default `*nix` locations by running

```bash
open /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg
```

###### On Linux

Install *`conda`'s* clang compiler:

```bash
conda install -c conda-forge gxx_linux-64
```

### Install Ruby plugins

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

### Build your book's HTML

Once you have Ruby installed, you can preview your book's
site locally by running this command:

```
make serve
```

This should run Jekyll, building your site, and then open up a port on your computer with a live version of the book.
It will **generate your book's HTML** in the `_site/` folder. This collection of files makes a
functioning **static website**.

If you'd like to only build your book's HTML without previewing the site, you can
do this with the following command:

```bash
bundle exec jekyll serve
```

Once the collection of HTML files is in `_site/`, you can move on to
[publishing your book online](#Host-your-book-online).


## Building your book HTML with Containers

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

### Docker

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

### Singularity

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

## Host your book online

Now that you've finished building the HTML for your book, it's time to host the
content online. See one of the following pages for instructions on how to do this:

* [Deploying your html on GitHub-Pages](github-pages.html)
* [Deploying your html on Netlify](netlify.html)
<!-- #endregion -->
