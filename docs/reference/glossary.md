# Glossary

A glossary of common terms used throughout Jupyter Book.

```{glossary}
[CommonMark](https://commonmark.org/)
    A standard syntax of Markdown that is used across many communities and projects.
    It is the base flavour of Markdown for Jupyter Notebook, and the base flavour
    for {term}`MyST Markdown <MyST>` and Jupyter Book.

[ExecutableBookProject](https://executablebooks.org/en/latest/)
    The project that supports and develops many of the core tools used by Jupyter Book.

[MyST Markdown](https://myst-parser.readthedocs.io/en/latest/using/syntax.html)
[MyST](https://myst-parser.readthedocs.io/en/latest/using/syntax.html)
    A flavour of Markdown that was designed for use with the {term}`Sphinx` project.
    It is a combination of {term}`CommonMark Markdown <CommonMark>` and a few extra
    syntax pieces to support features of Sphinx, so that you can write Sphinx
    documentation in plain Markdown. It is one of the
    core technologies that Jupyter Book uses.

[MyST-Parser](https://myst-parser.readthedocs.io/en/latest/)
    A parser for {term}`Sphinx` that allows it to read in content that is written
    in MyST Markdown. It is also used by {term}`MyST-NB` to parse MyST Markdown
    that is inside Jupyter notebooks.

[MyST-NB](https://myst-nb.readthedocs.io/en/latest/)
    An extension for {term}`Sphinx` that uses the {term}`MyST-Parser <MyST>` to
    parse Jupyter notebooks directly into Sphinx. This also allows users to write
    MyST Markdown inside of notebooks that are parsed with Sphinx. It is one of the
    core technologies that Jupyter Book uses.

[Sphinx](https://www.sphinx-doc.org/en/master/)
    A documentation engine written in Python. Sphinx supports many features that are
    necessary for scientific and scholarly publishing. It is one of the
    core technologies that Jupyter Book uses.

[Binder](https://mybinder.org)
    A free, public service for running reproducible interactive computing environments.
    Binder is a 100% open source infrastructure that is run by members of the Jupyter
    community. The underlying technology behind the Binder project is {term}`BinderHub`.

[BinderHub](https://binderhub.readthedocs.io/en/latest/)
    The underlying technology of mybinder.org, BinderHub is an open source tool that
    runs on Kubernetes and utilizes a {term}`JupyterHub` in order to provide live, reproducible
    interactive computing environments that users host on GitHub.

[Google Colab](https://colab.research.google.com/)
    A Jupyter Notebook service from Google that provides access to free computing resources,
    including GPUs and TPUs.

[JupyterHub](https://jupyterhub.readthedocs.io/en/stable/)
    A core open source tool from the Jupyter community, JupyterHub allows you to
    deploy an application that provides remote data science environments to multiple
    users. It can be deployed in the cloud, or on your own hardware.

[Jupyter-Cache](https://github.com/executablebooks/jupyter-cache)
    An open source tool for executing and caching the outputs of Jupyter Notebook
    content. Outputs are cached in a hidden folder so that they do not need to be
    included directly with your source files.

[Sphinx Book Theme](https://github.com/executablebooks/sphinx-book-theme)
    A customized version of the
    [PyData Sphinx Theme](https://pydata-sphinx-theme.readthedocs.io/en/latest/)
    that defines the look and feel of Jupyter Book.

```
