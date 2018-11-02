---
interact_link: content/tests/notebooks.ipynb
title: 'Jupyter notebooks'
prev_page:
  url: /tests/markdown
  title: 'Markdown files'
next_page:
  url: /
  title: ''
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---

# Content with notebooks

This page tests that notebooks image linking etc works well. See sections below:

## Markdown



Images should be embedded

![](cool.jpg)

### Math

You an also $add_{math}$ and

$$
math^{blocks}
$$

or

$$
\\begin{align*}
\\mbox{mean} la_{tex} \\ \\
math blocks
\\end{align*}
$$

\\$Escape \\$your \\$dollar signs \\$should work!

### Code blocks and image outputs

Textbooks with Jupyter will also embed your code blocks and output in your site.
For example, here's some sample Matplotlib code:



{:.input_area}
```python
from matplotlib import rcParams, cycler
import matplotlib.pyplot as plt
import numpy as np
plt.ion()
```




{:.input_area}
```python
# Fixing random state for reproducibility
np.random.seed(19680801)

N = 10
data = [np.logspace(0, 1, 100) + np.random.randn(100) + ii for ii in range(N)]
data = np.array(data).T
cmap = plt.cm.coolwarm
rcParams['axes.prop_cycle'] = cycler(color=cmap(np.linspace(0, 1, N)))


from matplotlib.lines import Line2D
custom_lines = [Line2D([0], [0], color=cmap(0.), lw=4),
                Line2D([0], [0], color=cmap(.5), lw=4),
                Line2D([0], [0], color=cmap(1.), lw=4)]

fig, ax = plt.subplots(figsize=(10, 5))
lines = ax.plot(data)
ax.legend(custom_lines, ['Cold', 'Medium', 'Hot']);
```



![png](../images/build/tests/notebooks_2_0.png)


Note that the image above is captured and displayed by Jekyll.

## Removing content before publishing

You can also remove some content before publishing your book to the web. For example,
in [the original notebook](https://github.com/choldgraf/textbooks-with-jupyter/blob/master/notebooks/introduction/notebooks.ipynb) there
used to be a cell below...

You can also **remove only the code** so that images and other output still show up.

Below we'll *only* display an image. It was generated with Python code in a cell,
which you can [see in the original notebook](https://github.com/choldgraf/textbooks-with-jupyter/blob/master/notebooks/introduction/notebooks.ipynb)





![png](../images/build/tests/notebooks_6_0.png)


And here we'll *only* display a Pandas DataFrame. Again, this was generated with Python code
from [this original notebook](https://github.com/choldgraf/textbooks-with-jupyter/blob/master/notebooks/introduction/notebooks.ipynb).







<div markdown="0">
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Word A</th>
      <th>Word B</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>hi</td>
      <td>there</td>
    </tr>
    <tr>
      <th>1</th>
      <td>this</td>
      <td>is</td>
    </tr>
    <tr>
      <th>2</th>
      <td>a</td>
      <td>DataFrame</td>
    </tr>
  </tbody>
</table>
</div>
</div>


