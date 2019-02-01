This page contains more advanced and complete information about the
[`jupyter-book` repository](https://github.com/jupyter/jupyter-book). See the sections below.

## Hide cells or cell outputs in the built site

Sometimes you want to use code to generate visualizations or prepare data,
but you don't want users to see it in your built book. To prevent code cells
from showing up in your built site, you can use the following two configuration
options in your `_config.yml` file.

**To remove entire code cells from your book*, use the following configuration:

```yaml
hide_cell_text : "YOUR TEXT"
```

Any code cell with the value of `hide_cell_text` (above it is `YOUR TEXT`)
will not show up in your built book.

**To remove only the code, but retain the outputs or a cell*, use the following
configuration:

```yaml
hide_code_text: "YOUR TEXT"
```

Any code cell with the value of `hide_code_text` (above it is `YOUR TEXT`)
will show the output (e.g. images, HTML, etc) but not the input code that
generated this output.

In both cases, the cells *will* remain in the notebooks themselves, they
simply won't show up in the site's HTML, so links that point to a JupyterHub/
Binder/etc will still work as expected.

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
