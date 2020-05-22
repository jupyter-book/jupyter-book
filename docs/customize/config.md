# Configure book settings

In Jupyter Book, most configuration is controlled with a
**Configuration YAML file (`_config.yml`)**. This file controls a number
of options that you may use to configure your book.

This page describes the general structure of `_config.yml`, and how
you can use it to control some basic parts of your book. The rest of the
pages in this section describe more detail for specific features.

## Structure of `_config.yml`

Here is a very simple `_config.yml` configuration (it is taken from
{download}`the demo book config file <../../jupyter_book/book_template/_config.yml>`):


```yaml
# Book settings
title: My sample book
author: The Jupyter Book Community
logo: 'images/logo.png'
```

As you can see, keys correspond to configuration options, and their values are how
you control behavior of the book. In this case:

* **title**: controls the title of your book.
  In the HTML output, it is displayed in the left sidebar.
* **author**: controls the book's author.
  In the HTML output, it is displayed in the footer.
* **logo**: controls the logo of the book, relative to the book root.
  In the HTML output, it is displayed above the title in the left sidebar.

There are also some configuration options that are nested. For example, to configure
your book to include **binder links** with any section built from a Jupyter Notebook,
you may use the following configuration:

```yaml
# Information about where the book exists on the web
repository:
  url                       : https://github.com/yourusername/yourbookrepo

# Configure your Binder links, such as the URL of the BinderHub.
launch_buttons:
  binderhub_url             : https://mybinder.org
```

Look throughout this book's documentation for different ways that you can configure
your book.

```{caution}
YAML can be tricky when it comes to how it treats certain kinds of values. For example,
when using strings in YAML it is usually fine to omit quotes around them. However,
there are certain values that will be *converted* to boolean values if they do not have
strings around them. For example, `false`, `true`, `off`, etc. In addition, pure
numbers will be converted to `float` or `int` unless you put strings around them.
```

## Configuration reference

For a reference example of *all* the possible Binder links and their default values, see the
section below:

```{literalinclude} ../../jupyter_book/default_config.yml
   :language: yaml
   :class: full-width
```
