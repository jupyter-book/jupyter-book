---
jupytext:
  cell_metadata_filter: -all
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Execute and cache your pages

Jupyter Book can automatically run and cache any notebook pages.
Notebooks can either be run each time the documentation is built,
or cached locally so that notebooks will only be re-run when the code cells in a notebook have changed.

Caching behaviour is controlled with the `execute:` section [in your `_config.yml` file](../customize/config.md). See
the sections below for each configuration option and its effect.

:::{tip}
If you'd like to execute code that is in your Markdown files,
you can use the `{code-cell}` directive in MyST Markdown.
See [](../file-types/myst-notebooks.md) for more information.
:::

## Trigger notebook execution

By default, Jupyter Book will execute any content files that have a notebook structure
and that are missing at least one output. This is equivalent to the following configuration in _config.yml`:

```yaml
execute:
  execute_notebooks: auto
```

This will only execute notebooks that are missing at least one output.
If the notebook has *all* of its outputs populated, then it will not be executed.

**To force the execution of all notebooks, regardless of their outputs**, change the
above configuration value to:

```yaml
execute_notebooks: force
```

**To cache execution outputs with [jupyter-cache]**, change the above configuration
value to:

```yaml
execute:
  execute_notebooks: cache
```

See {ref}`execute/cache` for more information.

**To turn off notebook execution**, change the above configuration value to:

```yaml
execute:
  execute_notebooks: 'off'
```

(execute/exclude)=
## Exclude files from execution

**To exclude certain file patterns from execution**, use the following
configuration:

```yaml
execute:
  exclude_patterns:
    - 'pattern1'
    - 'pattern2'
    - '*pattern3withwildcard'
```

Any file that matches one of the items in `exclude_patterns` will not be executed.

:::{tip}
To auto-exclude all files outside of your table of contents, see [](config:exclude-non-toc-files)
:::

(execute/cache)=
## Caching the notebook execution

You may also **cache the results of executing a notebook page** using [jupyter-cache].
In this case, when a page is executed, its outputs will be stored in a local database.
This allows you to be sure that the outputs in your documentation are up-to-date,
while saving time avoiding unnecessary re-execution.
It also allows you to store your `.ipynb` files in your `git` repository *without their outputs*,
but still leverage a cache to save time when building your site.

When you re-build your site, the following will happen:

* Notebooks that have not seen changes to their **code cells** since the last build will not be re-executed.
  Instead, their outputs will be pulled from the cache and inserted into your site.
* Notebooks that **have had any change to their code cells** will be re-executed
  and the cache will be updated with the new outputs.

To enable caching of notebook outputs, use the following configuration:

```yaml
execute:
  execute_notebooks: cache
```

By default, the cache will be placed in the parent of your build folder.
Generally, this is in `_build/.jupyter_cache`.

You may also specify a path to the location of a jupyter cache you'd like to use:

```yaml
execute:
  cache: path/to/mycache
```

The path should point to an **empty folder**, or a folder where a **jupyter cache already exists**.

[jupyter-cache]: https://github.com/executablebooks/jupyter-cache "the Jupyter Cache Project"

## Execution configuration

You can control notebook execution and how output content is handled at a project level using your `_config.yml` but, in some cases, also at a notebook and code cell level.
Below we explore a number of ways to achieve this.

:::{seealso}
[](jupyter-cell-tags) and [](./code-outputs.md).
:::

### The execution working directory

:::{important}
The default behaviour of `cache` is now to run in the local directory.
This is a change from `v0.7`.
:::

By default, the command working directory (cwd) in which a notebook runs will be the directory in which it is located (for both `auto` and `cache`). This means that notebooks requiring access to assets in relative paths will work.

Alternatively, if you wish for your notebooks to isolate your notebook execution in a temporary folder,
you can use the following `_config.yml` setting:

```yaml
execute:
  run_in_temp: true
```

### Setting execution timeout

Execution timeout defines the maximum time (in seconds) each notebook cell is allowed to run for.
If the execution takes longer an exception will be raised.
The default is 30 seconds, so in cases of long-running cells you may want to specify a higher value.
The timeout option can also be set to -1, to remove any restriction on execution time.

You can set the timeout for all notebook executions in your `_config.yml`:

```yaml
execute:
  timeout: 100
```

This global value can also be overridden per notebook by adding this to your notebook metadata:

```json
{
 "metadata": {
  "execution": {
      "timeout": 30
  }
}
```

### Dealing with code that raises errors

In some cases, you may want to intentionally show code that doesn't work
(e.g., to show the error message).

You can allow errors for all notebooks in your `_config.yml`:

```yaml
execute:
  allow_errors: true
```

This global value can also be overridden per notebook by adding this to your notebook metadata:

```json
{
 "metadata": {
  "execution": {
      "allow_errors": false
  }
}
```

Lastly, you can allow errors at a cell level, by adding a `raises-exception` tag to your code cell.
This can be done via a Jupyter interface, or via the `{code-cell}` directive like so:

````md
```{code-cell}
---
tags: [raises-exception]
---
print(thisvariabledoesntexist)
```
````

Which produces:

```{code-cell}
---
tags: [raises-exception]
---
print(thisvariabledoesntexist)
```

### Dealing with code that produces stderr

You may also wish to control how stderr outputs are dealt with.

Alternatively, you can configure how stdout is dealt with at a global configuration level, using the `nb_output_stderr` configuration value.

You can configure the default behaviour for all notebooks in your `_config.yml`:

```yaml
execute:
  stderr_output: show
```

Where the value is one of:

* `"show"` (default): show all stderr (unless a `remove-stderr` tag is present)
* `"remove"`: remove all stderr
* `"remove-warn"`: remove all stderr, but log a warning if any found
* `"warn"`, `"error"` or `"severe"`: log the stderr at a certain level, if any found.

You can also remove stderr at a cell level, using the `remove-stderr` [cell tag](https://jupyter-notebook.readthedocs.io/en/stable/changelog.html#cell-tags), like so:

````md
```{code-cell} ipython3
:tags: [remove-stderr]

import sys
print("this is some stdout")
print("this is some stderr", file=sys.stderr)
```
````

which produces

```{code-cell} ipython3
:tags: [remove-stderr]

import sys
print("this is some stdout")
print("this is some stderr", file=sys.stderr)
```

### Dealing with code that produces stdout

Similar to stderr, you can remove stdout at a cell level with the `remove-stdout` tag, by which

````md
```{code-cell} ipython3
:tags: [remove-stdout]

import sys
print("this is some stdout")
print("this is some stderr", file=sys.stderr)
```
````

produces the following:

```{code-cell} ipython3
:tags: [remove-stdout]

import sys
print("this is some stdout")
print("this is some stderr", file=sys.stderr)
```

(content:execute:merge-stdout-and-stderr)=
### Merging stdout and stderr output

Code contained in code cells may print outputs through both the `stdout` and `stderr` stream.

These outputs may appear in a mixed order and you may want them to be grouped and sorted
to display the correct `logical` ordering.

This can be achieved using the [nb_merge_streams feature contained in
`myst_nb`](myst-nb:render/output/stdout-stderr).

You can enable this in your `_config.yml`:

```yaml
sphinx:
  config:
    nb_merge_streams: true
```

## Execution statistics

As notebooks are executed, certain statistics are stored on the build environment by MyST-NB.
The simplest way to access and visualise this data is using the `{nb-exec-table}` directive.

:::{seealso}
The [MyST-NB documentation](myst-nb:execute/statistics), for creating your own directives to manipulate this data.
:::

The simple directive

````md
```{nb-exec-table}
```
````

produces:

```{nb-exec-table}
```

(execute:tracebacks)=
## Execution tracebacks in the terminal

It is possible to print tracebacks for execution errors directly into the terminal, instead of saving them to a log file.
This is particularly useful if you're executing your book as part of an online build process (for example, via [GitHub Pages](../publish/gh-pages.md), [ReadTheDocs](../publish/readthedocs.md), or [Netlify](../publish/netlify.md)).

Enable activate execution tracebacks, in your `_config.yml`:

```yaml
sphinx:
  config:
    execution_show_tb: True
```

See [the MyST-NB documentation](https://myst-nb.readthedocs.io) for more information.
