# Migrating to `jupyter-book>=0.14`

The recent release of `jupyter-book>=0.14` includes major updates to [myst-nb](https://myst-nb.readthedocs.io/en/latest/)
and [myst-parser](https://myst-parser.readthedocs.io/en/latest/) that include some breaking changes. This includes incorporating
three major upgrades to `myst-nb` moving from `myst-nb~=0.13.1` to `myst-nb~=0.17.1`. These changes also mean moving from
`myst-parser~=0.15` to `myst-parser~=0.18`.

While every effort has been
made to enable backward compatibility there are some new warnings that may appear when upgrading to the latest version and
this page has been put together to help explain these warnings and provides suggestions on how to fix them.

The latest configuration options are well documented in the underlying libraries:

1. [myst-nb configuration](https://myst-nb.readthedocs.io/en/latest/configuration.html)
2. [myst-parser configuration](https://myst-parser.readthedocs.io/en/latest/configuration.html)

so it is worth noting these resources when updating any options you may be using in your project.

## Common Configuration Updates

A number of configuration option names have been updated. Some of the more commonly used options
include those that control execution of `jupyter` notebooks. The majority of options concerning notebooks 
have an `nb_` prefix added to the pre-existing option name, however there are some cases where the
option name has been changed.

For example `jupyter_execute_notebooks` has become `nb_execution_mode`. Most of the old option
names will be auto-converted and a warning is issued such as:

```
WARNING: 'jupyter_execute_notebooks' is deprecated for 'nb_execution_mode' [mystnb.config]
```

The warning now includes the software that is responsible as can be seen in the square brackets.
In this case this warning is issued by `myst-nb`. This helps to identify where your warning
is coming from and using the `myst-nb` documentation may be the best source of information.

We will highlight some of the configuration changes here, which we found useful when updating our 
projects. It should be noted that these are only a handful of examples, please refer to the doc links 
mentioned above for the full picture.  

### Global configuration

Some of the configurations have been renamed, and the variable types of some have also been changed.
Few of the noteworthy configuration changes which effected most of our projects were:

1. `jupyter_execute_notebooks` is renamed to  `nb_execution_mode`.
2. `nb_render_priority` is renamed to `nb_mime_priority_overrides` and it accepts a sequence of tuples now.
    Each tuple takes three mandatory entries namely builder name, mime type, and priority. 


### File level configuration

If the configurations options belong to **Myst-nb**, overriding the default configuration at a per-file level 
now requires them to under the `mystnb` key. If they belong to **Myst-parser**, then they should be under the 
`myst` key. 

#### Myst-nb

````md
```
---
file_format: mystnb
mystnb:
  execution_timeout: 60
---
```
````

#### Myst-parser

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

### Cell level configuration

Similarly, overriding the default configuration at a per-cell level 
now requires them to be under the `mystnb` key. Since cell-level operations are in myst-nb domain,
we don't have to worry about **Myst-parser** here. This now changes the previous way of putting it 
under the `render` object. Replace the `render` cell-level object with `mystnb` object.

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

Other features of `myst-nb`, like `glue`, also have slight changes. For example, Using `glue` directive 
to paste content from other notebooks now requires a `:doc:` key, which specifies the relative path of the
notebook. Otherwise, the `glue` roles and directives now only identify keys in the same notebook, by default.

````md
```{glue} sorted_means_fig
:doc: executable/output-insert.md
```
````

