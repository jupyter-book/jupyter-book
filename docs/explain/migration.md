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
include those that control execution of `jupyter` notebooks. The majority of the changes include
adding a `nb_` prefix to the pre-existing option name, however there are some cases where the
option name has been changed. 

For example `jupyter_execute_notebooks` has become `nb_execution_mode`. Most of the old option
names will be auto-converted and a warning is issued such as:

```
WARNING: 'jupyter_execute_notebooks' is deprecated for 'nb_execution_mode' [mystnb.config]
```

The warning now includes the software that is responsible as can be seen in the square brackets.
In this case this warning is issued by `myst-nb`. This helps to identify where your warning
is coming from and using the `myst-nb` documentation may be the best source of information.

