# Configure book settings

In Jupyter Book, most configuration is controlled with a **Configuration YAML file (`_config.yml`)**.
This file controls a number of options that you may use to configure your book
(the [defaults](config:defaults) can be found at the bottom of this page).

This page describes the general structure of `_config.yml`,
and how you can use it to control some basic parts of your book.
The rest of the pages in this section describe more detail for specific features.

## Structure of `_config.yml`

Here is a very simple `_config.yml` configuration (it is taken from
{download}`the demo book config file <../../jupyter_book/book_template/_config.yml>`):

```yaml
# Book settings
title: My sample book
author: The Jupyter Book Community
logo: 'images/logo.png'
```

As you can see, keys correspond to configuration options, and their values are how you control behaviour of the book.
In this case:

* **title**: controls the title of your book.
  In the HTML output, it is displayed in the left sidebar.
* **author**: controls the book's author.
  In the HTML output, it is displayed in the footer.
* **logo**: controls the logo of the book, relative to the book root.
  In the HTML output, it is displayed above the title in the left sidebar.

There are also some configuration options that are nested.
For example, to configure your book to include **binder links** with any section built from a Jupyter Notebook,
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

:::{caution}
YAML can be tricky when it comes to how it treats certain kinds of values. For example,
when using strings in YAML it is usually fine to omit quotes around them. However,
there are certain values that will be *converted* to boolean values if they do not have
strings around them. For example, `false`, `true`, `off`, etc. In addition, pure
numbers will be converted to `float` or `int` unless you put strings around them.
:::

## Add source repository buttons

There are a collection of buttons that you can use to link back to your source
repository. This lets users browse the repository, or take actions like suggest
an edit or open an issue. In each case, they require the following configuration
to exist:

```yaml
repository:
  url: https://github.com/{your-book-url}
```

### Add a link to your repository

To add a link to your repository, add the following configuration:

```yaml
repository:
  url: https://github.com/{your-book-url}
html:
  use_repository_button: true
```

### Add a button to open issues

To add a button to open an issue about the current page, use the following
configuration:

```yaml
repository:
  url: https://github.com/{your-book-url}
html:
  use_issues_button: true
```

### Add a button to suggest edits

You can add a button to each page that will allow users to edit the page text
directly and submit a pull request to update the documentation.
To include this button, use the following configuration:

```yaml
repository:
  url: https://github.com/{your-book-url}
  path_to_book: path/to/your/book  # An optional path to your book, defaults to repo root
  branch: yourbranch  # An optional branch, defaults to `master`
html:
  use_edit_page_button: true
```

(config:sphinx)=
### Advance configuration (with sphinx)

Users who are familiar with [Sphinx configuration](sphinx:build-config), may wish to directly add extensions or set options to parse to the underlying sphinx application.

To add extensions, use:

```yaml
sphinx:
  extra_extensions: [my_extension]
```

This will **append** to the list of extensions already loaded by Jupyter Book.

To set additional sphinx configuration:

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
which Jupyter Book will pass to Sphinx, you can run from the command-line:

```bash
jb config sphinx mybookname/
```

:::{seealso}
The advanced section on [sphinx configuration](advanced/sphinx-config).
:::

(config:defaults)=
## Configuration Defaults

Below is the full default configuration file.
Anything you set in your own `_config.yml` will be merged into these defaults, before they are used to configure the build.

```{literalinclude} ../../jupyter_book/default_config.yml
:language: yaml
:class: full-width
```
