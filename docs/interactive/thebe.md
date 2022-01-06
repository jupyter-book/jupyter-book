---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.10.3
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

(launch:thebe)=
# Make your code cells executable

This section describes how to bring interactivity to your book. This lets users
run code and see outputs *without leaving the page*. Interactivity is provided
by a kernel running on the public [**MyBinder**](https://mybinder.org) service.

For an example, click the {fa}`rocket` --> {guilabel}`Live Code` button above on this page, and run the code below.

```{code-cell} ipython3
import numpy as np
import matplotlib.pyplot as plt
plt.ion()

x = np.arange(500)
y = np.random.randn(500)

fig, ax = plt.subplots()
ax.scatter(x, y, c=y, s=x)
```

:::{warning}
This is an experimental feature, and may change in the future or work unexpectedly.
:::

## Activate Thebe

To make your content interactive without requiring readers to leave the current page, you can use a project called [Thebe](https://github.com/executablebooks/thebe).
This provides you with a {guilabel}`Live Code` button that, when clicked, will convert each code cell into an **interactive** cell that can be edited.
It also adds a "run" button to each cell, and connects to a Binder kernel running in the cloud.

To add a Thebe button to your Jupyter Book pages, take these steps:

1. First, [add the common launch button configuration](launchbuttons/configuration). This makes it possible for `thebe/` to use the correct environment and file paths for your content.
2. Activate Thebe integration with the following configuration:

   ```yaml
   launch_buttons:
     thebe                  : true
   ```

## Configure Thebe

In addition, you can configure the Binder settings that are used to provide a kernel for Thebe to run the code.
These use the same configuration fields as the BinderHub interact buttons described above.
For information about how to do this, see [the BinderHub launch button documentation](launchbuttons/binder).

+++

## Pre-execute cells when Thebe is initialized

Sometimes you'd like to run some code cells *immediately* when a kernel is requested.
This might be code that you then hide from the user in order to narrow the focus of what they interact with.
This is possible by using **cell tags** for the Jupyter Notebook.

Adding the tag {guilabel}`thebe-init` to any code cell will cause Thebe to run this cell after it has received a kernel.
Any subsequent Thebe cells will have access to the same environment (e.g. any module imports made in the initialization cell).

You can then pair this with something like {guilabel}`hide-input` in order to run initialization code that your user doesn't immediately see.
For example, below we'll initialize a variable in a hidden cell, and then tell another cell to print the output of that variable.

```{code-cell} ipython3
:tags: [hide-input, thebe-init]

my_hidden_variable = 'wow, it worked!'
```

```{code-cell} ipython3
# The variable for this is defined in the cell above!
print(my_hidden_variable)
```
