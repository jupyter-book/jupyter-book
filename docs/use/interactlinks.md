# Interaction links for your content

Because Jupyter Books are built with Jupyter Notebooks, you can connect your online
book with a Jupyter kernel running in the cloud. This lets readers quickly interact
with your content in a traditional coding interface using either JupyterHub or BinderHub.
This page describes a few ways to accomplish this.

In each case, you'll need to tell Jupyter Book where your book content lives online.
To do so, use this configuration in `_config.yml`:

```yaml
# Information about where the book exists on the web
repository:
  url                       : https://github.com/yourusername/yourbookrepo  # Online location of your book
  book_path                 : path/to/book  # Optional path to your book, relative to the repository root
```

## Binder buttons for your pages

BinderHub can be used to build the environment needed to run a repository, and provides
a link that lets others interact with that repository. If your Jupyter Book is hosted online
on GitHub, you can automatically insert buttons that link to the Jupyter Notebook running in a BinderHub.
When a user clicks the button, they'll be taken to a live version of the page. If your code
doesn't require a significant amount of CPU or RAM, you can use the free, public BinderHub running
at https://mybinder.org.

To automatically include Binder link buttons in each page of your Jupyter Book, use the following
configuration in `_config.yml`:

```yaml
# Configure your Binder links, such as the URL of the BinderHub.
binder:
  binderhub_url             : "https://mybinder.org"
```

By adding this configuration, along with the repository url configuration above, Jupyter Book
will insert Binder links to any pages that were built from notebook content.

## Creating interact buttons for JupyterHub

```{warning}
This feature is not yet implemented
```

JupyterHub lets you host an online service that gives users their own Jupyter servers
with an environment that you specify for them. It allows you to give users access to
resources and hardware that you provision in the cloud, and allows you to authenticate users
in order to control who has access to your hardware.

Similar to Binder link buttons, you can also automatically include interact links that send
your readers to a JupyterHub that is running a live, interactive version of your page. This
is accomplished using the [nbgitpuller](https://github.com/jupyterhub/nbgitpuller) server
extension.

You can configure the location of the JupyterHub (which you may set up on your own using a guide
such as [zero to jupyterhub for kubernetes](https://z2jh.jupyter.org) or [the littlest jupyterhub](https://tljh.jupyter.org)) with the following configuration.

```yaml
jupyterhub:
    url:                   : "your-hub-url"  # The URL for your JupyterHub.
```