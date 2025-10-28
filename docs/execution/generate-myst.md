---
kernelspec:
  name: python3
  display_name: 'Python 3'
---
# Generate MyST markdown at execution time

You can use Jupyter cell execution to **generate MyST Markdown at build time**.
This works because all notebook content is executed before being parsed as MyST Markdown.

:::{note} Native support for MyST generation is coming
We consider this recommendation a workaround, but share it here because it is useful.
See this issue to track support for this workflow: https://github.com/jupyter-book/mystmd/issues/1026
:::

To do so, follow a two-step process:

1. Generate MyST Markdown in a temporary file at build time.
2. Use the `{include}` directive to insert it into your content.

For example, the following code shows how you can generate MyST Markdown in a temporary file and insert it into the page.

::::::{tab-set}
:::::{tab} Result
Here's the cell that is executed:

````{code-cell} python
from pathlib import Path
text = """
:::{card} Here's a list of the files in this directory!
%s
:::
"""
source = Path().parent
files = "\n".join(f"- {ii}" for ii in source.rglob("*.md"))
build_folder = source / "../_build/tmp"
build_folder.mkdir(exist_ok=True, parents=True)
_ = (build_folder / "tmp.txt").write_text(text % files)
````

And here it is included:

```{include} ../_build/tmp/tmp.txt
```
:::::
:::::{tab} Code
`````
Here's the cell that is executed:

````{code-cell} python
from pathlib import Path
text = """
:::{card} Here's a list of the files in this directory!
%s
:::
"""
source = Path().parent
files = "\n".join(f"- {ii}" for ii in source.rglob("*.md"))
build_folder = source / "../_build/tmp"
build_folder.mkdir(exist_ok=True, parents=True)
_ = (build_folder / "tmp.txt").write_text(text % files)
````

And here it is included:

```{include} ../_build/tmp/tmp.txt
```
`````
:::::