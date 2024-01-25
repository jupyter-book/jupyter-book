(explain:migration)=
# Migrating to `jupyter-book>=0.14`

This release of `jupyter-book>=0.14` includes major updates to [myst-nb](https://myst-nb.readthedocs.io/en/latest/)
and [myst-parser](https://myst-parser.readthedocs.io/en/latest/) that include some **breaking changes**.

This update includes incorporating three major updates to [myst-nb](https://github.com/executablebooks/myst-nb) moving from `myst-nb~=0.13.1` to `myst-nb~=0.17.1`
which incorporates changes to the underlying [myst-parser](https://github.com/executablebooks/myst-parser) moving from `myst-parser~=0.15` to `myst-parser~=0.18`.

While every effort has been made to enable backward compatibility, there are some new warnings
that may appear when upgrading to the latest version. This page has been put together to help explain
these warnings and provides suggestions on how to fix them.

The latest configuration options are well documented in the underlying libraries:

1. [myst-nb configuration](https://myst-nb.readthedocs.io/en/latest/configuration.html)
2. [myst-parser configuration](https://myst-parser.readthedocs.io/en/latest/configuration.html)

so it is worth referring to these resources when updating any options or using more advacned features in your project.

## Common Configuration Updates

A number of configuration option names have been updated.

Some of the more commonly used options include those that control execution of `jupyter` notebooks.
The majority of options concerning notebooks have an `nb_` prefix added to the pre-existing option name,
however there are some cases where the option name has been changed.

For example `jupyter_execute_notebooks` has become `nb_execution_mode`. Most of the old option
names will be auto-converted and a warning is issued by [myst-nb](https://github.com/executablebooks/myst-nb) such as:

```
WARNING: 'jupyter_execute_notebooks' is deprecated for 'nb_execution_mode' [mystnb.config]
```

These warning messages now includes the software that is responsible as seen in the square brackets.
This helps to identify where your warning is coming from and using the [myst-nb](https://github.com/executablebooks/myst-nb)
documentation may be a good source of information.

Below we highlight some of the configuration changes here, which we found useful when updating our range
projects. It should be noted that these are only a handful of examples, please refer to the doc links
mentioned above [raise an issue](https://github.com/executablebooks/jupyter-book/issues).

### Book level configuration

Some of the configurations have been renamed, and the variable types of some have also been changed.

The noteworthy configuration changes which effected most of our projects were:

1. `jupyter_execute_notebooks` is renamed to  `nb_execution_mode`.
2. `nb_render_priority` is renamed to `nb_mime_priority_overrides` and it accepts a sequence of tuples.
    Each tuple takes three mandatory entries namely `builder name`, `mime type`, and `priority`.

  An Example:

  ```yaml
  sphinx:
    config:
      nb_render_priority:
        - "application/vnd.jupyter.widget-view+json"
        - "application/javascript"
        - "text/html"
        - "text/latex"
        - "image/svg+xml"
        - "image/png"
        - "image/jpeg"
        - "text/markdown"
        - "text/plain"
  ```

  would become:

  ```yaml
  sphinx:
    config:
      nb_mime_priority_overrides: [
        ['html', 'application/vnd.jupyter.widget-view+json', 10],
        ['html', 'application/javascript', 20],
        ['html', 'text/html', 30],
        ['html', 'text/latex', 40],
        ['html', 'image/svg+xml', 50],
        ['html', 'image/png', 60],
        ['html', 'image/jpeg', 70],
        ['html', 'text/markdown', 80],
        ['html', 'text/plain', 90],
      ]
  ```

There are additional option name changes that should be notified to you via the `warnings` output.

### Configuration pass-through (file level)

If you wish to specify a configuration options that is processed by [myst-nb](https://github.com/executablebooks/myst-nb),
overriding the **default configuration** now requires them to under the `mystnb` key. Likewise, if a configuration option is
processed by [myst-parser](https://github.com/executablebooks/myst-parser), then they should be under the `myst` key.

Some examples follow:

#### myst-nb

To set the `execution_timeout` config option managed by `mystnb` you would specify the following:

````md
```
---
file_format: mystnb
mystnb:
  execution_timeout: 60
---
```
````

in the header of the notebook (or page).

#### Myst-parser

To make document level variables that will be resolved by [myst-parser](https://github.com/executablebooks/myst-parser)
then this configuration can be specified under the `myst` key in the configuration for each notebook (or page) such as:

````md
```
---
myst:
  substitutions:
    key1: "I'm a **substitution**"
    key2: |
      ```{note}
      {{ key1 }}
      ```
    fishy: |
      ```{image} /images/fun-fish.png
      :alt: fishy
      :width: 200px
      ```
    jinja: "[Jinja templates](https://jinja.palletsprojects.com/en/2.11.x/)"
    repo_name: "jupyter-book"
    repo_url: "[my repo url](https://github.com/executablebooks/jupyter-book)"
---
```
````

### Configuration pass-through (cell level)

Similarly, overriding the default configuration can also be done at the cell level
and requires them to be under the `mystnb` key.

Since cell-level operations are in myst-nb domain, we don't have to worry about **Myst-parser** here.

This changes the way configuration was previously captured under the `render` title, replacing it with `mystnb`.

An example of the new configuration:

````md
```{code-cell} ipython3
---
mystnb:
  image:
    width: 200px
    alt: fun-fish
    classes: shadow bg-primary
  figure:
    caption: |
      Hey everyone its **party** time!
    name: fun-fish
---
from IPython.display import Image
Image("../images/fun-fish.png")
```
````

Further [documentation of this feature is available here](inv:myst-nb#render/output/images)

(explain:migration:glue)=
### Changes to `glue`

```{tip}
One of the key changes is that `glue` directives will now need to use `:doc:` to
reference objects that are created in a **separate notebook (page or document)**.

The `glue` behaviour is the same as previously **within the same** notebook (page or document)
```

The `glue` roles and directives will only identify keys in the same notebook, by **default**.
To reference a glue object in another notebook (page or document), now requires you to use a `:doc:` key,
which specifies the relative path to the notebook.

An example:

````md
```{glue} cool_text
:doc: /content/executable/output-insert.md
```
````

will render as

```{glue} cool_text
:doc: /content/executable/output-insert.md
```

```{tip}
The `file extension` of the document needs to be specified. So you need to use
`executable/output-insert.md` rather than `executable/output-insert` as can be the case
in some other `sphinx/docutils` directives
```

**DataFrames:**

```{glue} df_tbl
:doc: /content/executable/output-insert.md
```

#### Limitations for Figures and Math

There are currently some limitations based on the `mime` types for `Figures` and `Math`.

**Math:**

Using the `glue` directive between documents for math results in a text representation:

```{glue} sym_eq
:doc: /content/executable/output-insert.md
```

**Figures:**

The resultant text representation when using the `glue` directive is similar for figures.

For example, if you glue in the figure `sorted_means_fig` from the `executable/output-insert.md` document:

````md
```{glue} sorted_means_fig
:doc: /content/executable/output-insert.md
```
````

it will be rendered as:

```{glue} sorted_means_fig
:doc: /content/executable/output-insert.md
```

which is the text description of the image.

These issues have been reported to the myst-nb team.
