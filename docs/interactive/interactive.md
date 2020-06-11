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

# Interactive data visualizations

Jupyter Notebooks have support for many kinds of interactive outputs, including
the ipywidgets ecosystem as well as many interactive visualization libraries.
These are supported in Jupyter Book, with the right configuration.
This page has a few common examples.

First off, we'll download a little bit of data
and show its structure:

```{code-cell} ipython3
import plotly.express as px
data = px.data.iris()
data.head()
```

## Altair

Interactive outputs will work under the assumption that the outputs they produce have
self-contained HTML that works without requiring any external dependencies to load.
See the [`Altair` installation instructions](https://altair-viz.github.io/getting_started/installation.html#installation)
to get set up with Altair. Below is some example output.

```{code-cell} ipython3
import altair as alt
alt.Chart(data=data).mark_point().encode(
    x="sepal_width",
    y="sepal_length",
    color="species",
    size='sepal_length'
)
```

## Plotly

Plotly is another interactive plotting library that provides a high-level API for
visualization. See the [Plotly JupyterLab documentation](https://plotly.com/python/getting-started/#JupyterLab-Support-(Python-3.5+))
to get started with Plotly in the notebook.

```{margin}
Plotly uses [renderers to output different kinds of information](https://plotly.com/python/renderers/)
when you display a plot. Experiment with renderers to get the output you want.
```

Below is some example output.


```{code-cell} ipython3
import plotly.io as pio
import plotly.express as px
import plotly.offline as py

df = px.data.iris()
fig = px.scatter(df, x="sepal_width", y="sepal_length", color="species", size="sepal_length")
fig
```

## Bokeh

Bokeh provides several options for interactive visualizations, and is part of the PyViz ecosystem. See
[the Bokeh with Jupyter documentation](https://docs.bokeh.org/en/latest/docs/user_guide/jupyter.html#userguide-jupyter) to
get started.

Below is some example output. First we'll initialized Bokeh with `output_notebook()`.
This needs to be in a separate cell to give the JavaScript time to load.


```{code-cell} ipython3
from bokeh.plotting import figure, show, output_notebook
output_notebook()
```

Now we'll make our plot.

```{code-cell} ipython3
p = figure()
p.circle(data["sepal_width"], data["sepal_length"], fill_color=data["species"], size=data["sepal_length"])
show(p)
```


## ipywidgets

You may also run code for Jupyter Widgets in your document, and the interactive HTML
outputs will embed themselves in your side. See [the ipywidgets documentation](https://ipywidgets.readthedocs.io/en/latest/user_install.html)
for how to get set up in your own environment.

```{admonition} Widgets often need a kernel
Note that `ipywidgets` tend to behave differently from other interactive viz libraries. They
interact both with Javascript, and with Python. Some functionality in `ipywidgets` may not
work in default Jupyter Book pages (because no Python kernel is running). You may be able to
get around this with [tools for remote kernels, like thebelab](https://thebelab.readthedocs.org).
```

Here are some simple widget elements rendered below.

```{code-cell} ipython3
import ipywidgets as widgets
widgets.IntSlider(
    value=7,
    min=0,
    max=10,
    step=1,
    description='Test:',
    disabled=False,
    continuous_update=False,
    orientation='horizontal',
    readout=True,
    readout_format='d'
)
```

```{code-cell} ipython3
tab_contents = ['P0', 'P1', 'P2', 'P3', 'P4']
children = [widgets.Text(description=name) for name in tab_contents]
tab = widgets.Tab()
tab.children = children
for ii in range(len(children)):
    tab.set_title(ii, f"tab_{ii}")
tab
```

You can find [a list of possible Jupyter Widgets](https://ipywidgets.readthedocs.io/en/latest/examples/Widget%20List.html)
in the jupyter-widgets documentation.
