# Glossary

A glossary of common terms used throughout Jupyter Book.

```{glossary}
[CommonMark](https://commonmark.org/)
    A standard syntax of markdown that is used across many communities and projects.
    It is the base flavor of markdown for Jupyter Notebooks, and the base flavor
    for {term}`MyST Markdown <MyST>` and Jupyter Book.

[ExecutableBookProject](https://executablebooks.org/en/latest/)
    The project that supports and develops many of the core tools used by Jupyter Book.

[MyST](https://myst-parser.readthedocs.io/en/latest/using/syntax.html)
    A flavor of markdown that was designed for use with the {term}`sphinx` project.
    It is a combination of {term}`CommonMark Markdown <CommonMark>` and a few extra
    syntax pieces to support features of Sphinx, so that you can write Sphinx
    documentation in 100% markdown. It is one of the
    core techologies that Jupyter Book uses.

[MyST-Parser](https://myst-parser.readthedocs.io/en/latest/)
    A parser for {term}`Sphinx` that allows it to read in content that is written
    in MyST Markdown. It is also used by {term}`MyST-NB` to parser MyST markdown
    that is inside Jupyter Notebooks.

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

[Jupyter-Cache](https://github.com/executablebooks/jupyter-cache)
    An open source tool for executing and cacheing the outputs of Jupyter Notebook
    content. Outputs are cached in a hidden folder so that they do not need to be
    included directly with your source files.

[Sphinx-Book-Theme](https://github.com/executablebooks/sphinx-book-theme)
    A customized version of the
    [PyData Sphinx Theme](https://pydata-sphinx-theme.readthedocs.io/en/latest/)
    that defines the look and feel of Jupyter Book.

```
