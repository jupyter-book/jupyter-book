This page contains more advanced and complete information about the
[`jupyter-book` repository](https://github.com/jupyter/jupyter-book). See the sections below.


## Enable Google Analytics

If you have a Google Account, you can use Google Analytics to collect some 
information on the traffic to your Jupyter Book. With this tool, you can find 
out how many people are using your site, where they come from and how they 
access it, wether they are using the Desktop or the mobile version etc. 

To add Google Analytics to your Jupyter Book, navigate to 
[Google Analytics](https://analytics.google.com/analytics/web/), create a new 
Google Analytics account and add the url of your Jupyter Book to a new 
*property*. Once you have set everything up, your Google Analytics property 
will have a so-called Tracking-ID, that typically starts with the letters UA. 
All that you need to do is to copy this ID and paste it into your 
configuration file:

```yaml
google_analytics:
  mytrackingcode: UA-XXXXXXXXX-X
```

## Retain custom YAML front-matter in your files

Jupyter book will check your files for YAML front-matter and will **append**
any newly-generated YAML to the built files for the page. This means you
can provide your own custom YAML to files (which may be useful if you'd like
to modify this site's HTML).

Be careful not to add YAML with the same key names as the auto-generated YAML, as
this will create duplicated keys in your page's front-matter.


## Deploying a JupyterHub

If you wish, you may deploy a JupyterHub alongside your textbook. This way, for pages that are built from
Jupyter Notebooks, students can click the "interact" links
at the top of each page and be taken to a live Jupyter Notebook running on your JupyterHub.

The easiest way to set up a JupyterHub is to follow [The Littlest JupyterHub guide](https://the-littlest-jupyterhub.readthedocs.io/en/latest/index.html).
This is a straightforward deployment of JupyterHub on a single VM, and is suitable for
courses / workshops of less than 50-60 students.

Once you have your JupyterHub set up, you can use the [nbgitpuller](https://github.com/data-8/nbgitpuller)
package to send links to course material to your students, or use the interact links that Textbooks for Jupyter
automatically inserts into your course material.


## Build the book's site HTML locally

Once you've generated the intermediate files for your notebooks and installed the
necessary dependencies. You are ready to build your site HTML.

Ensure that your notebooks have been converted to intermediate files, there should be a
collection of them in `_build/`.

In order to locally build your site's HTML with Jekyll, you'll take one of two approaches:

1. Use a container software (Docker or Singularity) along with a Docker image that we've
   prepared for you
   [from this Dockerfile](https://github.com/jupyter/jupyter-book/blob/master/jupyter_book/Dockerfile).
2. Install a copy of the Ruby language (which is a free open-source language, but can be a pain to install).

In our experience, we've found that [containers](https://www.docker.com/resources/what-container)
provide an easier installation for most systems.
If you are developing on a system where you have administrator privileges
(i.e., you have `root` permissions), we recommend you use [Docker](https://docs.docker.com/get-started/).

We also provide instructions for using [Singularity](https://www.sylabs.io/guides/2.6/user-guide/quick_start.html),
an alternate containerization software for systems where you do not have administrator privileges.
To learn more about using containers, please see the
[Docker for scientists guide](https://neurohackweek.github.io/docker-for-scientists/).

### Building your site locally with Containers: Docker

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
   emdupre/jupyter-book bundle exec jekyll serve --host 0.0.0.0
```

If you navigate to `http://0.0.0.0:4000/jupyter-book/` in your browser,
you should see a preview copy of your book.
If you instead see an error, please try to update your local book;
see [the Jupyter Book FAQ section](https://jupyter.org/jupyter-book/guide/04_faq.html#how-can-i-update-my-book)
for more details on how to do so.

You'll find the HTML for your book in the `_site/` folder.

### Building your site locally with Containers: Singularity

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
    jupyter-book.simg bundle exec jekyll serve
```

And that's it! If you navigate to `http://127.0.0.1:4000/jupyter-book/` in your browser,
you should see a preview copy of your book.

### Building your site locally with Ruby

You can also choose to build your site locally without a container.
In this case, you'll need Ruby, an open-source programming language, to build your site's
HTML with Jekyll.

> **NOTE:** If these instructions don't work, you can also try installing Jekyll at the
> following URLs.
>
> * [MacOS Instructions](https://jekyllrb.com/docs/installation/macos/)
> * [Ubuntu Instructions](https://jekyllrb.com/docs/installation/ubuntu/)
> * [Linux (non-Ubuntu) Instructions](https://jekyllrb.com/docs/installation/other-linux)
> * [Windows Instructions](https://jekyllrb.com/docs/installation/windows/)
>
> Once you've finished those steps, head to [install ruby plugins](#install-ruby-plugins)
> and follow the directions.

The easiest way to install Ruby on *nix systems is to use
the *`conda`* package manager:

```bash
conda install -c conda-forge ruby
```

Once you have Ruby installed, the conda-built clang compiler for your system need to be installed. Details depend on your OS.

#### On OSX

Two steps are needed on OSX. First, install the *`conda`'s* clang compiler:

```bash
conda install -c conda-forge clangxx_osx-64
```

If you are running OSX 10.14 (Mojave) you also need to install system libraries in
the default *nix locations by running

```bash
open /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg
```

#### On Linux

Install *`conda`'s* clang compiler:

```bash
conda install -c conda-forge gxx_linux-64
```

#### Install Ruby plugins

Finally, run

```bash
make install
```

which will install Bundler (a Ruby dependency management tool) and then install the plugins
needed to build the site for your book.

You can then build the site locally by running:

```
make site
```

Alternatively, you can preview your book's site locally by running this command:

```
make serve
```

This should open up a port on your computer with a live version of the book.


### When should you build the HTML locally?

You might ask: if GitHub pages can build my site automatically from the intermediate files, why
build it locally? The main reason for this is that you get more flexibility by building locally
and serving raw HTML, as opposed to auto-building the site with GitHub-pages.

In particular, if you wish to use any **extra Jekyll plugins**, such as the `jekyll-scholar` plugin that
enables you to add citations and bibliographies, then you need to build your site
locally as HTML. GitHub-pages doesn't let you enable any extra plugins if it auto-builds your site.

## Hosting your book's HTML online

If you're choosing to build the HTML for your book by hand, there are a few options for
where you should store the book. The two most common approaches are:

* **Use the `gh-pages` or `master` branch of a GitHub repository**. In this case, the build
  process is very similar to [using GH-pages to build the HTML for your site](https://jupyter.org/jupyter-book/guide/03_build.html#publish-your-book-online-with-github-pages).
  However, there is one caveat: you must include a file called `.nojekyll` along with the HTML
  files of your book. This tells GitHub **not** to use Jekyll to build the HTML.
* **Use a static site hosting service like Netlify**. There are many services that will simply
  host a collection of static HTML files for you in a public URL. The most common is
  [the Netlify CMS service](https://www.netlifycms.org/). Follow the instructions on this site
  for information on how you should upload your HTML files to work with Netlify.

### Automatically build your book HTML with CI/CD

If you're comfortable with continuous integration services like CircleCI, you can set up
a build job to build your book's HTML automatically and push them to an online repository
(such as a `gh-pages` branch). This is a fairly advanced topic, but for some guidance,
check out these resources:

* **[This blog post on pushing changes from a CircleCI Job](https://predictablynoisy.com/circleci-mirror)**
  covers how you can give CircleCI permissions to push to a branch from within a job.
* **[The Jupyter Book CircleCI configuration file](https://github.com/jupyter/jupyter-book/blob/master/.circleci/config.yml)**
  automatically deploys changes to the `jupyter-book` master branch to the live book. In
  particular, [this section builds the book HTML files](https://github.com/jupyter/jupyter-book/blob/master/.circleci/config.yml#L74)
  while [this section builds the HTML and pushes them to a `gh-pages` branch](https://github.com/jupyter/jupyter-book/blob/master/.circleci/config.yml#L31).

This process can be tricky to set up initially, but is quite useful in ensuring that your live book
always stays up-to-date.

## Store your notebook content as text files with Jupytext

One major drawback of Jupyter Notebooks is that they can be difficult
to use with version control tools such as Git and GitHub. Creating
a "diff" with notebooks often results in large, unreadable results
because of the metadata and binary information that is stored in a notebook.

If you'd like to have the flexibliity and interface experience of a notebook,
but the simplicity of using text-based content, a good option is to use
[**Jupytext** for two-way sync between notebooks and text files](https://jupytext.readthedocs.io).

For example, say you're collaborating on a book with several co-authors on GitHub.
Take the following steps to use Jupytext for keeping a text-based version
of your notebook content:

1. **Make sure collaborators install Jupytext**. This will allow them to synchronize
   the text and `ipynb` versions of the content.
2. **Begin writing the notebook**. To start with, create your notebook's content. We'll
   convert it into text in the next step.
3. **Configure jupytext to save the notebook in a text format**. The easiest way to
   do this is to use the JupyterLab command palette (`ctrl+shift c` will open this palette).
   Start typing `jupytext` and you will see a collection of options for pairing the
   notebook with a variety of text files. Choose the one you'd like and click it.
4. **Save the notebook**. From now on, when you save the notebook within your
   Jupyter session, the text file will be automatically updated when you save your notebook.
5. **How to use the two formats in diffs?** You've now got two versions of each
   notebook file in your content folder (after you save each notebook). You can commit
   each to the repository. Use the `.ipynb` files to preview the full rendered content,
   and the text files to track the diffs in the content.
5. **(optional) Add `ipynb` files to your gitignore**. You may wish to *only* use the
   text files in your repository instead of both the text files and the notebooks. In
   this case, you can add any `.ipynb` files to your gitignore file. This will prevent
   git from adding in any `.ipynb` files to your repository (even though they still
   exist on disk). When you pull in new changes to your text files, the next time you
   open them in Jupyter the notebook will automatically update itself.