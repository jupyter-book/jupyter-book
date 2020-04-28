# Custom Sphinx configuration

Jupyter Book uses the excellent documentation tool [Sphinx](http://www.sphinx-doc.org/)
to build your book and manage citations, cross-references, and extensability.

While Jupyter Book comes pre-configured with several Sphinx extensions, power-users may
wish to add their own extensions and configuration. This page describes how to do so.

```{warning}
Adding your own Sphinx configuration and extensions may cause Jupyter Book to behave
unpredictably. Use at your own risk!
```

## Custom Sphinx extensions

To enable your own Sphinx extensions when building a Jupyter Book, use the following
configuration in your `_config.yml` file:

```yaml
sphinx:
  extra_extensions:
   - extension1
   - extension2
```

Any extensions that are listed will be appended to the list of Sphinx extensions at
build time.

```{note}
Make sure that you have your extension installed on your machine, or Sphinx won't know
how to build the extensions.
```

### An example: `sphinx-tabs`

For example, let's say you'd like to include **tabbed content** in your book. There
is [a sphinx-extension for that](https://github.com/djungelorm/sphinx-tabs). To enable
it, we'll do the following:

* **Install `sphinx-tabs`**. Here's the command to do so:

  ```bash
  pip install sphinx-tabs
  ```
* **Add `sphinx-tabs` content to your book**. Here's an example with MyST markdown:

  `````md
  ````{tabs}
  ```{tab} Line one

  Beautiful is better than ugly. ✨

  ```
  ```{tab} Line two

  Explicit is better than implicit. ❗
  ```
  ```{tab} Line three

  Simple is better than complex. 😵
  ```
  ````
  `````
* **Activate `sphinx-tabs` in `_config.yml`**. [The `sphinx-tabs` documentation](https://github.com/djungelorm/sphinx-tabs#installation)
  says we activate it in sphinx by adding `extensions = ["sphinx_tabs.tabs"]`, so we'll
  add it to our Jupyter Book like so:

  ```yaml
  sphinx:
    extra_extensions:
    - sphinx_tabs.tabs
  ```

Now, Jupyter Book will know how to interpret the `{tabs}` directive (and any other
directives that `sphinx-tabs` supports).

For example, here is a rendered version of the tab code pasted above:

The [Zen of Python](https://www.python.org/dev/peps/pep-0020/), in 3 tabs.

````{tabs}
```{tab} Line one

Beautiful is better than ugly. ✨

```
```{tab} Line two

Explicit is better than implicit. ❗
```
```{tab} Line three

Simple is better than complex. 😵
```
````

## Manually sphinx configuration

You may also directly override the key-value pairs that Sphinx normally has
you configure in `conf.py`. To do so, use the following section of `_config.yml`:

  ```yaml
  sphinx:
    config:
      key1: value1
      key2: value2
  ```
