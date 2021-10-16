---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.12
    jupytext_version: 1.6.0
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

(create-a-template-book)=
# Create books automatically

This section covers how you can create books automatically in order to get started more quickly.

## Create a book from a simple template

Jupyter Book lets you quickly generate a book structure from templates.
This section covers the process of creating a template book and building it as an alternative to manually creating the files in your book.

To see your options for creating books from templates, run the following command:

% doubling the commands so users aren't confused by the !
```bash
jupyter-book create --help
```

```{code-cell}
:tags: [remove-input]
!jupyter-book create --help
```

This option is best if you are starting from scratch, or would like to see one example of a simple Jupyter Book on your own filesystem.

If you'd just like to quickly create a sample book, you may do so by running the following command:

```
jupyter-book create mynewbook/
```

This will generate a mini Jupyter Book that you can both build and explore locally. It will have a few decisions made for you, and you can explore the configuration of the book in `_config.yml` and its structure in `_toc.yml`. Use this book as inspiration, or as a starting point to work from.


## Create a more complete book from interactive prompts

This option is best if you'd like to answer a few questions from the command line in order to create a template book that is more complex and customized for your use-case.

Jupyter Book also provides a [Jupyter Book cookiecutter](https://github.com/executablebooks/cookiecutter-jupyter-book) that can be used to interactively create a book directory structure.

```{margin}
[`cookiecutter`](https://cookiecutter.readthedocs.io/en/latest/) is a Python tool for quickly generating folders from a templatized repository. Jupyter Book uses `cookiecutter` under the hood.
```

The cookiecutter is suitable for users that want to create a ready-to-go repository to host their book that includes pre-populated metafiles such as `README`, `LICENSE`, `CONDUCT`, `CONTRIBUTING`, etc., as well as GitHub Actions workflow files to [](publish/gh-actions).

To try the cookiecutter template, run the following command:

```bash
jupyter-book create mynewbook/ --cookiecutter
```

For more help, see the [Jupyter Book cookiecutter GitHub repository](https://github.com/executablebooks/cookiecutter-jupyter-book), or run:


## Create book files from a Table of Contents

It is possible to use a `_toc.yml` file in order to create the skeleton of a book automatically.
This is useful if you wish to quickly generate empty files from a single structure, and then populate them with content yourselves.

To create your book's files from the Table of Contents, use the following command:

```bash
jupyter-book toc to-project path/to/_toc.yml
```

This will generate a collection of files according to the structure in `_toc.yml`.

In addition, you have a few options to control the behavior of this tool.
See below for reference.

```{code-cell}
:tags: [remove-input]
!jupyter-book toc to-project -h
```
