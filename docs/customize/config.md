# Configuration reference

You can configure Jupyter Book with a **YAML configuration file (`_config.yml`)**.
This file controls a number of options and feature flags.

This page is a reference for the `_config.yml` structure along with default values for each option.
For information about using and configuring specific features, see the **Topic Guides**.

:::{caution}
YAML can be tricky when it comes to how it treats certain kinds of values. For example,
when using strings in YAML it is usually fine to omit quotes around them. However,
there are certain values that will be *converted* to boolean values if they do not have
strings around them. For example, `false`, `true`, `off`, etc. In addition, pure
numbers will be converted to `float` or `int` unless you put strings around them.
:::


(config:defaults)=
## Configuration defaults

Below is the full default configuration file.
Anything you set in your own `_config.yml` will be merged into these defaults before they are used to configure the build.

```{literalinclude} ../../jupyter_book/default_config.yml
:language: yaml
:class: full-width
```
