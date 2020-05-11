---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: '0.8'
    jupytext_version: 1.4.1+dev
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Hide or remove content

It's possible to control which content shows up in your book. For example,
you may want to display a complex visualization to illustrate an idea, but don't
want the page to be cluttered with a large code cell that generated the viz. In other
cases, you may want to remove a code cell entirely.

In this case, you have two options:

* **Hiding** content provide a button that lets readers reveal the content.
* **Removing** content prevents it from making it into your book. It
  will be entirely gone (though still present in the source files)

There are two ways to hide content:

* To hide markdown, use the `{toggle}` directive.
* To hide or remove code cells or their outputs, use **notebook cell tags**.

We'll cover each below.

## Hide markdown using MyST markdown

In order to hide markdown content, you can use the `{toggle}` directive.
This allows you to wrap chunks of markdown in a button that lets users show
and hide the content.

You can activate this behavior in markdown with the `{toggle}`
directive like so:

````
```{toggle}
This content will be toggled!
```
````

This results in:

```{toggle}
This content will be toggled!
```

You can also include a title with your toggle section. The title will always be displayed,
and the toggle button will reveal the section's content. Use this like so:

````
```{toggle} Click the button to reveal!
Some hidden toggle content!

![](../images/cool.jpg)
```
````

This results in:

```{toggle} Click the button to reveal!
Some hidden toggle content!

![](../images/cool.jpg)
```

Note that if you'd like to **show the toggle content by default**, you can
add the `:show:` flag when you call `{toggle}`, like so:

````
```{toggle} Click the button to reveal!
:show:
Some hidden toggle content!

![](../images/cool.jpg)
```
````

See the [`sphinx-togglebutton` documentation](https://sphinx-togglebutton.readthedocs.io/en/latest/)
for more information about toggle functionality.

## Hide code cell content

You can hide most cell elements of a page. The sections below describe how
to hide each.

If an element is hidden, Jupyter Book will display a small button to the right of the
old location for the hidden element. If a user clicks the button,
the element will be displayed.


### Hide cell inputs

If you add the tag `hide-input` to a cell, then Jupyter Book will hide the cell but
display the outputs.

Here's an example of cell metadata that would trigger the "hide code" behavior:

```json
{
    "tags": [
        "hide-input",
    ]
}
```

For example, see the cell below contains the `hide-input` tag:

```{code-cell} ipython3
:tags: [hide-input]

import numpy as np
import matplotlib.pyplot as plt
plt.ion()

data = np.random.randn(2, 100)
fig, ax = plt.subplots()
ax.scatter(*data, c=data[1], s=100*np.abs(data[0]));
```

Note how we only see the output by default. Now try clicking the button
to the right of the empty spot above!

+++

### Hide cell outputs

You can also hide the *outputs* of a cell. For example, if you'd like to ask users to
think about what the output will look like first before viewing an answer. To do so,
add the following tag to your cell:

```json
{
    "tags": [
        "hide-output",
    ]
}
```

```{code-cell} ipython3
:tags: [hide-output]

# This cell should have its output hidden!
data = np.random.randn(2, 100)
fig, ax = plt.subplots()
ax.scatter(*data, c=data[1], s=100*np.abs(data[0]));
```

### Hide entire code cells

If you'd like to hide the whole code cell (both inputs and outputs) just add each
tag to the cell metadata, like so:

```json
{
    "tags": [
        "hide-cell",
    ]
}
```

```{code-cell} ipython3
:tags: [hide-cell]

# This cell should have its output hidden!
data = np.random.randn(2, 100)
fig, ax = plt.subplots()
ax.scatter(*data, c=data[1], s=100*np.abs(data[0]));
```

(hiding/remove-content)=
## Removing code cell content

In the above examples, we are only *hiding* the inputs, with the option
that readers can reveal them if they wish. However, if you'd like to completely **remove**
the inputs, so that their contents do not make it into the book's HTML, you may
use the following tag:

To remove the inputs of a cell:

```json
{
    "tags": [
        "remove-input",
    ]
}
```

+++

The following cell demonstrates removing inputs. Note that in
this case, there is no button available to show the input contents,
the entire input cell is gone!

+++

### Remove cell inputs

The following cell has its inputs removed

```{code-cell} ipython3
:tags: [remove-input]

# For example, this cell's inputs will be removed
import numpy as np
import matplotlib.pyplot as plt
plt.ion()

data = np.random.randn(2, 100)
fig, ax = plt.subplots()
ax.scatter(*data, c=data[1], s=100*np.abs(data[0]));
```

### Remove cell outputs

Similar to hiding inputs, it is also possible to hide the outputs
of a cell.

To remove the outputs of a cell:

```json
{
    "tags": [
        "remove-output",
    ]
}
```

+++

### Remove an entire code cell

You can also remove **both** the inputs and outputs of a cell, in which case it
won't show up in your book at all. These cells remain in the notebook file itself,
so they'll show up if readers click on a {term}`JupyterHub` or {term}`Binder` link from a page.

To remove both the inputs and outputs of a cell, add the tag `remove-cell` to the tags
of the cell. Here's an example of cell metadata that would trigger the "remove cell" behavior:

```json
{
    "tags": [
        "remove-cell",
    ]
}
```

These cells will be entirely removed from each book page - remember that if you'd like to
optionally display the inputs of a cell instead, you should use the `hide-input` tag.

For example, there's a cell below this one that won't make it into the final book,
because it has been removed!

```{code-cell} ipython3
:tags: [remove-cell]

# For example, this entire cell (input and output) will be removed
import numpy as np
import matplotlib.pyplot as plt
plt.ion()

data = np.random.randn(2, 100)
fig, ax = plt.subplots()
ax.scatter(*data, c=data[1], s=100*np.abs(data[0]));
```

### Remove empty cells

You don't need to do anything to remove empty cells from your pages.
Jupyter Book will remove these automatically. Any cell with *only*
whitespace will be removed.

```{code-cell} ipython3


```

```{code-cell} ipython3

```

For example, in the notebook for this page there are two cells above this one. One
cell with whitespace, and another cell with a few line-breaks. Both are gone in
the final output.
