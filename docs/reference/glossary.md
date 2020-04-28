# Glossary

A glossary of common terms used throughout Jupyter Book.

```{glossary}
[CommonMark](https://commonmark.org/)
    A standard syntax of markdown that is used across many communities and projects.
    It is the base flavor of markdown for Jupyter Notebooks, and the base flavor
    for {term}`MyST Markdown <MyST>` and Jupyter Book.

[MyST](https://myst-parser.readthedocs.io/en/latest/using/syntax.html)
    A flavor of markdown that was designed for use with the {term}`sphinx` project.
    It is a combination of {term}`CommonMark Markdown <CommonMark>` and a few extra
    syntax pieces to support features of Sphinx, so that you can write Sphinx
    documentation in 100% markdown. It is one of the
    core techologies that Jupyter Book uses.

[MyST-NB](https://myst-nb.readthedocs.io/en/latest/)
    An extension for {term}`Sphinx` that uses the {term}`MyST Parser <MyST>` to
    parse Jupyter Notebooks directly into Sphinx. This also allows users to write
    MyST Markdown inside of notebooks that are parsed with Sphinx. It is one of the
    core techologies that Jupyter Book uses.

[Sphinx](https://www.sphinx-doc.org/en/master/)
    A documentation engine written in Python. Sphinx supports many features that are
    necessary for scientific and scholarly publishing. It is one of the
    core techologies that Jupyter Book uses.

[Binder](https://mybinder.org)
    A free, public service for running reproducible interactive computing environments.
    Binder is 100% open source infrastructure that is run by members of the Jupyter
    community. The underlying technology behind the Binder project is {term}`BinderHub`.

[BinderHub](https://binderhub.readthedocs.io/en/latest/)
    The underlying technology of mybinder.org, BinderHub is an open source tool that
    runs on Kubernetes and utilizes a {term}`JupyterHub` in order to provide live, reproducible
    interactive computing environments that users host on GitHub.

[JupyterHub](https://jupyterhub.readthedocs.io/en/stable/)
    A core open source tool from the Jupyter community, JupyterHub allows you to
    deploy an application that provides remote data science environments to multiple
    users. It can be deployed in the cloud, or on your own hardware.
```
