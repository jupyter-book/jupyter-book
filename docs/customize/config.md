# Configure book settings

In Jupyter Book, most configurations are controlled in a **YAML configuration file (`_config.yml`)**.
This file controls a number of options that you may use to configure your book
(the [defaults](config:defaults) can be found at the bottom of this page).

This page describes the general structure of `_config.yml`
and how you can use it to control some basic parts of your book.
The rest of the pages in this section describe specific features in more detail.

## Structure of `_config.yml`

Here is a very simple `_config.yml` configuration (it is taken from
{download}`the demo book config file <../../jupyter_book/book_template/_config.yml>`):

```yaml
# Book settings
title: My sample book
author: The Jupyter Book Community
logo: 'images/logo.png'
```

As you can see, keys correspond to configuration options and their values are how you control the behaviour of the book.
In this case:

* **title**: sets the title of your book.
  In the HTML output, it is displayed in the left sidebar.
* **author**: sets the book's author.
  In the HTML output, it is displayed in the footer.
* **logo**: sets the logo of the book, relative to the book root.
  In the HTML output, it is displayed above the title in the left sidebar.

There are also some configuration options that are nested.
For example, to configure your book to include **Binder links** in any section built from a Jupyter notebook,
you may use the following configuration:

```yaml
# Information about where the book exists on the web
repository:
  url                       : https://github.com/yourusername/yourbookrepo

# Configure your Binder links, such as the URL of the BinderHub.
launch_buttons:
  binderhub_url             : https://mybinder.org
```

Look out for different book configuration options throughout this book's documentation.

:::{caution}
YAML can be tricky when it comes to how it treats certain kinds of values. For example,
when using strings in YAML it is usually fine to omit quotes around them. However,
there are certain values that will be *converted* to boolean values if they do not have
strings around them. For example, `false`, `true`, `off`, etc. In addition, pure
numbers will be converted to `float` or `int` unless you put strings around them.
:::



### Specifying Sphinx Configuration Values

To set additional Sphinx configurations:

```yaml
sphinx:
  config:
    my_option: my_value
```

:::{warning}
Any options set in this section will **override** default configurations set by Jupyter Book.
Use at your own risk!
:::

If you wish to inspect a `conf.py` representation of the generated configuration,
which Jupyter Book will pass to Sphinx, from the command line run:

```bash
jb config sphinx mybookname/
```

:::{seealso}
The advanced section on [Sphinx configuration](advanced/sphinx-config).
:::

(config:defaults)=
## Configuration defaults

Below is the full default configuration file.
Anything you set in your own `_config.yml` will be merged into these defaults before they are used to configure the build.

```{literalinclude} ../../jupyter_book/default_config.yml
:language: yaml
:class: full-width
```
