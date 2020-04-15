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

# Widgets and dashboards

You may also run code for Jupyter Widgets in your document, and the interactive HTML
outputs will embed themselves in your side. See [the ipywidgets documentation](https://ipywidgets.readthedocs.io/en/latest/user_install.html)
for how to get set up in your own environment.

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
tab.titles = [str(i) for i in range(len(children))]
tab
```
