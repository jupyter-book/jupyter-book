This page contains more advanced and complete information about the
[`jupyter-book` repository](https://github.com/choldgraf/jupyter-book). See the sections below.

## Customize your book with your own custom CSS or Javascript

To add your own CSS or Javascript files, you should add your own code
to the following files:

* `assets/custom/custom.css`
* `assets/custom/custom.js`

These are empty by default, but are loaded into your HTML's header.
They can be used to style your book however you'd like. For example,
you may want to apply some of the [distill.pub stylesheets](https://github.com/distillpub/template/tree/master/src/styles).

## Retain custom YAML front-matter in your files

Jupyter book will check your files for YAML front-matter and will **append**
any newly-generated YAML to the built files for the page. This means you
can provide your own custom YAML to files (which may be useful if you'd like
to modify this site's HTML).

Be careful not to add YAML with the same key names as the auto-generated YAML, as
this will create duplicated keys in your page's front-matter.

## Add buttons to direct users to a JupyterHub or BinderHub

It is often helpful to let readers quickly interact with their own version of a
page in order to run the code, experiment, etc. Since many of the pages in a Jupyter
book are powered by notebooks, it is possible to set up a JupyterHub/BinderHub
with an environment that is needed to run your book's content.

You can place a button at the top of each page that will direct users to a JupyterHub
that you specify and load the content from that page. To enable this, use the following
configuration:

```yaml
use_interact_button: true
```

You can configure this button according to the location of the JupyterHub/BinderHub
that you have set up. For example, 

```yaml
hub_url : "https://<url-to-your-hub>"  # The URL for your JupyterHub/BinderHub.

# ['binder', 'jupyterhub']  Whether to build interact links for a BinderHub or a JupyterHub
hub_type : "binder"
```

Alternatively, you can use `https://mybinder.org` for your `hub_url` in order to
use the free mybinder.org service.

## Make your static pages interactive with Thebelab

[Thebelab](https://github.com/minrk/thebelab) is a project to automatically turn
static code cells into interactive cells powered by a Binder kernel. This is triggered
with a `Thebelab` button at the top of each page that has been generated from a notebook.
To make this button appear, use the following configuration in your `_config.yaml` file:

```yaml
use_thebelab_button : true
```

## List of relevant files

There are a few moving parts associated with Jupyter Books, and this
section tries to cover most of the relevant pieces. The following list contains some
of the more important files/folders worth knowing about.

### Course materials

* `content/` contains all course content in Jupyter notebook or markdown form

### Auto-generated folders and files
* `_build/` contain markdown and assets created when you run `make book`. This is what Jekyll uses to serve your site.
* `_site/` contains the HTML for the built site. It is created by Jekyll, and should only exist if you build the site locally

### Repository configuration and build files
* `_config.yml` contains all site configuration.
* `_data/toc.yml` contains the table of contents for the book (AKA, the sidebar)
* `assets/` contains CSS and Javascript for the book and website
* `requirements.txt` contains the packages needed to run the notebooks in the Jupyter book
* `build-requirements.txt` contains the packages needed to build the Jupyter book

### Helper scripts
* `scripts/` contains scripts to generate the textbook from the Jupyter notebooks. These helper scripts are
  all run with the `Makefile` included with this repository.
    * `scripts/generate_book.py` will generate the markdown for your book.
       After you make any changes in `contents/`, you should run this script via
       `make book` so your site stays up-to-date.
    * `scripts/clean.py` is used to clean out any auto-generated files
    * `scripts/execute_all_notebooks.py` will use nbconvert to execute all notebooks in `contents/` in-place.

