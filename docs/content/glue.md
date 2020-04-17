---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: '0.8'
    jupytext_version: '1.4.1'
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

(glue)=

# Insert code outputs into page content

You often wish to run analyses in one notebook and insert them into your
documents text elsewhere. For example, if you'd like to include a figure,
or if you want to cite a statistic that you have run.

```{margin}
Currently, `glue` only works with Python.
```

The **`glue`** tool from [MyST-NB](https://myst-nb.readthedocs.io/)
allows you to add a key to variables in a notebook,
then display those variables in your book by referencing the key. It
follows a two-step process:

* **Glue a variable into your notebook**. Do this by using
  the `myst_nb.glue` function on a variable
  that you'd like to re-use elsewhere in the book. You'll give the variable
  a name that can be referenced later.
* **Reference that variable from your page's content**. Then, when you are
  writing your book's content, insert the variable into your text by using a
  `{glue:}` role.

We'll cover each step in more detail below.

```{margin}
For more information about roles, see {doc}`myst`.
```

+++

(glue/gluing)=

## Gluing variables in your notebook

You can use `myst_nb.glue()` to assign value of a variable to
a key of your choice. `glue` will store all of the information that is normally used to **display**
that variable (ie, whatever happens when you display the variable by putting it at the end of a
code cell). Choose a key that you will remember, as you will use it later.

The following code glues a variable inside the notebook:

```{code-cell} ipython3
from myst_nb import glue
my_variable = "here is some text!"
glue("cool_text", my_variable)
```

You can then insert it into your text like. Adding
`` {glue:}`cool_text` `` to your content results in the
following: {glue:}`cool_text`.

### Gluing numbers, plots, and tables

You can glue anything in your notebook and display it later with `{glue:}`. Here
we'll show how to glue and paste **numbers and images**. We'll simulate some
data and run a simple bootstrap on it. We'll hide most of this process below,
to focus on the glueing part.

+++

```{code-cell} ipython3
:tags: [hide-cell]

# Simulate some data and bootstrap the mean of the data
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

n_points = 10000
n_boots = 1000
mean, sd = (3, .2)
data = sd*np.random.randn(n_points) + mean
bootstrap_indices = np.random.randint(0, n_points, n_points*n_boots).reshape((n_boots, n_points))
```

In the cell below, `data` contains our data, and `bootstrap_indices` is a collection of sample indices in each bootstrap. Below we'll calculate a few statistics of interest, and
**`glue()`** them into the notebook.

```{code-cell} ipython3
# Calculate the mean of a bunch of random samples
means = data[bootstrap_indices].mean(0)
# Calcualte the 95% confidence interval for the mean
clo, chi = np.percentile(means, [2.5, 97.5])

# Store the values in our notebook
glue("boot_mean", means.mean())
glue("boot_clo", clo)
glue("boot_chi", chi)
```

By default, `glue` will display the value of the variable you are gluing. This
is useful for sanity-checking its value at glue-time. If you'd like to **prevent display**,
use the `display=False` option. Note that below, we also *overwrite* the value of
`boot_chi` (but using the same value):

```{code-cell} ipython3
glue("boot_chi_notdisplayed", chi, display=False)
```

You can also glue visualizations, such as matplotlib figures (here we use `display=False` to ensure that the figure isn't plotted twice):

```{code-cell} ipython3
# Visualize the historgram with the intervals
fig, ax = plt.subplots()
ax.hist(means)
for ln in [clo, chi]:
    ax.axvline(ln, ls='--', c='r')
ax.set_title("Bootstrap distribution and 95% CI")

# And a wider figure to show a timeseries
fig2, ax = plt.subplots(figsize=(6, 2))
ax.plot(np.sort(means), lw=3, c='r')
ax.set_axis_off()

glue("boot_fig", fig, display=False)
glue("sorted_means_fig", fig2, display=False)
```

The same can be done for DataFrames (or other table-like objects) as well.

```{code-cell} ipython3
bootstrap_subsets = data[bootstrap_indices][:3, :5].T
df = pd.DataFrame(bootstrap_subsets, columns=["first", "second", "third"])
glue("df_tbl", df)
```

```{tip}
Since we are going to paste this figure into our document at a later point,
you may wish to remove the output here, using the `remove-output` tag
(see {ref}`hiding/remove-content`).
```

+++

(glue/pasting)=

## Pasting glued variables into your page

Once you have glued variables into a notebook, you can then **paste**
those variables into your text in your book anywhere you like (even on other pages).
These variables can be pasted using one of the roles or directives in the `glue:` *family*.

+++

### The `glue` role/directive

The simplest role and directive are `glue:any`,
which paste the glued output inline or as a block respectively,
with no additional formatting.
Simply add this:

````
```{glue:} your-key
```
````

For example, we'll paste the plot we generated above with the following text:

````md
```{glue:} boot_fig
```
````

Here's how it looks:

```{glue:} boot_fig
```

Or we can paste inline objects like so:


```md
Inline text; {glue:}`boot_mean`, and figure; {glue:}`boot_fig`.
```

Inline text; {glue:}`boot_mean`, and figure; {glue:}`boot_fig`.

```{tip}
We recommend using wider, shorter figures when plotting in-line, with a ratio
around 6x2. For example, here's is an in-line figure of sorted means
from our bootstrap: {glue:}`sorted_means_fig`.
It can be used to make a visual point that isn't too complex! For more
ideas, check out [how sparklines are used](https://en.wikipedia.org/wiki/Sparkline).
```

Next we'll cover some more specific pasting functionality, which gives you more
control over how the outputs look in your pages.

+++

## Controling the pasted outputs

You can control the pasted outputs by using a sub-command of `{glue:}`. These are called like so:
`` {glue:subcommand}`key` ``. These subcommands allow you to control more of the look, feel, and
content of the pasted output.

```{tip}
When you use `{glue:}` you are actually using a short-hand for `{glue:any}`. This is a
generic command that doesn't make many assumptions about what you are gluing.
```

+++

### The `glue:text` role

The `glue:text` role, is specific to text outputs.
For example, the following text:

```
The mean of the bootstrapped distribution was {glue:text}`boot_mean` (95% confidence interval {glue:text}`boot_clo`/{glue:text}`boot_chi`).
```

Is rendered as:
The mean of the bootstrapped distribution was {glue:text}`boot_mean` (95% confidence interval {glue:text}`boot_clo`/{glue:text}`boot_chi`)

```{note}
`glue:text` only works with glued variables that contain a `text/plain` output.
```

With `glue:text` we can **add formatting to the output**.
This is particularly useful if you are displaying numbers and
want to round the results. To add formatting, use this pattern:

* `` {glue:text}`mykey:formatstring` ``

For example, the following: ``My rounded mean: {glue:text}`boot_mean:.2f` `` will be rendered like this: My rounded mean: {glue:text}`boot_mean:.2f` (95% CI: {glue:text}`boot_clo:.2f`/{glue:text}`boot_chi:.2f`).

+++

### The `glue:figure` directive

With `glue:figure` you can apply more formatting to figure like objects,
such as giving them a caption and referencable label:

````md
```{glue:figure} boot_fig
:figwidth: 300px
:name: "fig-boot"

This is a **caption**, with an embedded `{glue:text}` element: {glue:text}`boot_mean:.2f`!
```
````

```{glue:figure} boot_fig
:figwidth: 300px
:name: "fig-boot"

This is a **caption**, with an embedded `{glue:text}` element: {glue:text}`boot_mean:.2f`!
```

```md
Here is a {ref}`reference to the figure <fig-boot>`
```

Here is a {ref}`reference to the figure <fig-boot>`

+++

Here's a table:

````md
```{glue:figure} df_tbl
:figwidth: 300px
:name: "tbl:df"

A caption for a pandas table.
```

````
```{glue:figure} df_tbl
:figwidth: 300px
:name: "tbl:df"

A caption for a pandas table.
```

+++

### The `glue:math` directive

The `glue:math` directive, is specific to latex math outputs
(glued variables that contain a `text/latex` mimetype),
and works similarly to the [sphinx math directive](https://www.sphinx-doc.org/en/1.8/usage/restructuredtext/directives.html#math).
For example:

```{code-cell} ipython3
import sympy as sym
f = sym.Function('f')
y = sym.Function('y')
n = sym.symbols(r'\alpha')
f = y(n)-2*y(n-1/sym.pi)-5*y(n-2)
glue("sym_eq", sym.rsolve(f,y(n),[1,4]))
```

````md
Insert the equation here:

```{glue:math} sym_eq
:label: eq-sym
```

Which we reference as Equation {eq}`eq-sym`
````

Insert the equation here:

```{glue:math} sym_eq
:label: eq-sym
```

% TODO: figure out why this isn't working
% Which we reference as Equation {eq}`eq-sym`.

```{note}
`glue:math` only works with glued variables that contain a `text/latex` output.
```

+++

## Advanced glue usecases

Here are a few more specific and advanced uses of the `glue` submodule.

### Pasting into tables

In addition to pasting blocks of outputs, or in-line with text, you can also paste directly
into tables. This allows you to compose complex collections of structured data using outputs
that were generated in other notebooks. For example the following table:

````md
| name                            |       plot                    | mean                      | ci                                                |
|:-------------------------------:|:-----------------------------:|---------------------------|---------------------------------------------------|
| histogram and raw text          | {glue:}`boot_fig`             | {glue:}`boot_mean`          | {glue:}`boot_clo`-{glue:}`boot_chi`                   |
| sorted means and formatted text | {glue:}`sorted_means_fig`     | {glue:text}`boot_mean:.3f` | {glue:text}`boot_clo:.3f`-{glue:text}`boot_chi:.3f` |
````

Results in:

| name                            |       plot                  | mean                      | ci                                                |
|:-------------------------------:|:---------------------------:|---------------------------|---------------------------------------------------|
| histogram and raw text          | {glue:}`boot_fig`             | {glue:}`boot_mean`          | {glue:}`boot_clo`-{glue:}`boot_chi`                   |
| sorted means and formatted text | {glue:}`sorted_means_fig`     | {glue:text}`boot_mean:.3f` | {glue:text}`boot_clo:.3f`-{glue:text}`boot_chi:.3f` |
