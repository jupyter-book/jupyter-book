---
interact_link: content/features/notebooks.ipynb
kernel_name: python3
title: 'Jupyter notebooks'
prev_page:
  url: /features/markdown
  title: 'Markdown files'
next_page:
  url: /features/hiding
  title: 'Hiding code blocks or entire cells'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---

# Content with notebooks

You can also create content with Jupyter Notebooks. The content for the current page is contained
in a Jupyter Notebook in the `notebooks/` folder of the repository. This means that we can include
code blocks and their outputs, and export them to Jekyll markdown.

**You can find the original notebook for this page [at this address](https://github.com/jupyter/textbooks-with-jupyter/blob/master/notebooks/introduction/notebooks.ipynb)**

## Markdown + notebooks

As it is markdown, you can embed images, HTML, etc into your posts!

![](cool.jpg)

You an also $add_{math}$ and

$$
math^{blocks}
$$

or

$$
\begin{align*}
\mbox{mean} la_{tex} \\ \\
math blocks
\end{align*}
$$

But make sure you \\$Escape \\$your \\$dollar signs \\$you want to keep!

## Code blocks and image outputs

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



{:.output .output_png}
![png](../images/features/notebooks_2_0.png)



Note that the image above is captured and displayed by Jekyll.

## Removing content before publishing

You can also remove some content before publishing your book to the web. For example,
in [the original notebook](https://github.com/jupyter/jupyter-book/blob/master/notebooks/introduction/notebooks.ipynb) there
used to be a cell below...

You can also **remove only the code** so that images and other output still show up.

Below we'll *only* display an image. It was generated with Python code in a cell,
which you can [see in the original notebook](https://github.com/jupyter/jupyter-book/blob/master/notebooks/introduction/notebooks.ipynb)





{:.output .output_png}
![png](../images/features/notebooks_6_0.png)



And here we'll *only* display a Pandas DataFrame. Again, this was generated with Python code
from [this original notebook](https://github.com/jupyter/textbooks-with-jupyter/blob/master/notebooks/introduction/notebooks.ipynb).







<div markdown="0" class="output output_html">
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



You can configure the text that *Textbooks with Jupyter* uses for this by modifying your site's `_config.yml` file.

## Interactive outputs

We can even do the same for *interactive* material. Below we'll display a map using `ipyleaflet`. When the notebook
is converted to Markdown, the code for creating the interactive map is retained.

**Note that this will only work for some packages.** They need to be able to output standalone HTML/Javascript, and not
depend on an underlying Python kernel to work.



{:.input_area}
```python
import folium
```




{:.input_area}
```python
m = folium.Map(
    location=[45.372, -121.6972],
    zoom_start=12,
    tiles='Stamen Terrain'
)

folium.Marker(
    location=[45.3288, -121.6625],
    popup='Mt. Hood Meadows',
    icon=folium.Icon(icon='cloud')
).add_to(m)

folium.Marker(
    location=[45.3311, -121.7113],
    popup='Timberline Lodge',
    icon=folium.Icon(color='green')
).add_to(m)

folium.Marker(
    location=[45.3300, -121.6823],
    popup='Some Other Location',
    icon=folium.Icon(color='red', icon='info-sign')
).add_to(m)


m

```





<div markdown="0" class="output output_html">
<div style="width:100%;"><div style="position:relative;width:100%;height:0;padding-bottom:60%;"><iframe src="data:text/html;base64,CiAgICAgICAgPCFET0NUWVBFIGh0bWw+CiAgICAgICAgPGhlYWQ+CiAgICAgICAgICAgIAogICAgICAgIAogICAgICAgICAgICA8bWV0YSBodHRwLWVxdWl2PSJjb250ZW50LXR5cGUiIGNvbnRlbnQ9InRleHQvaHRtbDsgY2hhcnNldD1VVEYtOCIgLz4KICAgICAgICAKICAgICAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIDxzY3JpcHQgc3JjPSJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9sZWFmbGV0LzAuNy4zL2xlYWZsZXQuanMiPjwvc2NyaXB0PgogICAgICAgIAogICAgICAgIAogICAgICAgIAogICAgICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgPHNjcmlwdCBzcmM9Imh0dHBzOi8vYWpheC5nb29nbGVhcGlzLmNvbS9hamF4L2xpYnMvanF1ZXJ5LzEuMTEuMS9qcXVlcnkubWluLmpzIj48L3NjcmlwdD4KICAgICAgICAKICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIDxzY3JpcHQgc3JjPSJodHRwczovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjIuMC9qcy9ib290c3RyYXAubWluLmpzIj48L3NjcmlwdD4KICAgICAgICAKICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIDxzY3JpcHQgc3JjPSJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9MZWFmbGV0LmF3ZXNvbWUtbWFya2Vycy8yLjAuMi9sZWFmbGV0LmF3ZXNvbWUtbWFya2Vycy5taW4uanMiPjwvc2NyaXB0PgogICAgICAgIAogICAgICAgIAogICAgICAgIAogICAgICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgPHNjcmlwdCBzcmM9Imh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2xlYWZsZXQubWFya2VyY2x1c3Rlci8wLjQuMC9sZWFmbGV0Lm1hcmtlcmNsdXN0ZXItc3JjLmpzIj48L3NjcmlwdD4KICAgICAgICAKICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIDxzY3JpcHQgc3JjPSJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9sZWFmbGV0Lm1hcmtlcmNsdXN0ZXIvMC40LjAvbGVhZmxldC5tYXJrZXJjbHVzdGVyLmpzIj48L3NjcmlwdD4KICAgICAgICAKICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvbGVhZmxldC8wLjcuMy9sZWFmbGV0LmNzcyIgLz4KICAgICAgICAKICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iaHR0cHM6Ly9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4yLjAvY3NzL2Jvb3RzdHJhcC5taW4uY3NzIiAvPgogICAgICAgIAogICAgICAgIAogICAgICAgIAogICAgICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwczovL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjIuMC9jc3MvYm9vdHN0cmFwLXRoZW1lLm1pbi5jc3MiIC8+CiAgICAgICAgCiAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIAogICAgICAgIAogICAgICAgICAgICA8bGluayByZWw9InN0eWxlc2hlZXQiIGhyZWY9Imh0dHBzOi8vbWF4Y2RuLmJvb3RzdHJhcGNkbi5jb20vZm9udC1hd2Vzb21lLzQuMS4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcyIgLz4KICAgICAgICAKICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvTGVhZmxldC5hd2Vzb21lLW1hcmtlcnMvMi4wLjIvbGVhZmxldC5hd2Vzb21lLW1hcmtlcnMuY3NzIiAvPgogICAgICAgIAogICAgICAgIAogICAgICAgIAogICAgICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9sZWFmbGV0Lm1hcmtlcmNsdXN0ZXIvMC40LjAvTWFya2VyQ2x1c3Rlci5EZWZhdWx0LmNzcyIgLz4KICAgICAgICAKICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvbGVhZmxldC5tYXJrZXJjbHVzdGVyLzAuNC4wL01hcmtlckNsdXN0ZXIuY3NzIiAvPgogICAgICAgIAogICAgICAgIAogICAgICAgIAogICAgICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcHl0aG9uLXZpc3VhbGl6YXRpb24vZm9saXVtL21hc3Rlci9mb2xpdW0vdGVtcGxhdGVzL2xlYWZsZXQuYXdlc29tZS5yb3RhdGUuY3NzIiAvPgogICAgICAgIAogICAgICAgIAogICAgICAgIAogICAgICAgICAgICAKICAgICAgICAgICAgPHN0eWxlPgoKICAgICAgICAgICAgaHRtbCwgYm9keSB7CiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTsKICAgICAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgICAgICAgICB9CgogICAgICAgICAgICAjbWFwIHsKICAgICAgICAgICAgICAgIHBvc2l0aW9uOmFic29sdXRlOwogICAgICAgICAgICAgICAgdG9wOjA7CiAgICAgICAgICAgICAgICBib3R0b206MDsKICAgICAgICAgICAgICAgIHJpZ2h0OjA7CiAgICAgICAgICAgICAgICBsZWZ0OjA7CiAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgIDwvc3R5bGU+CiAgICAgICAgICAgIAogICAgICAgIAogICAgICAgICAgICAKICAgICAgICAgICAgPHN0eWxlPiAjbWFwXzBmYmQ5NTMyN2Q1YzQ2MDlhNDQ3YTRkYzEzNGVkNjgyIHsKICAgICAgICAgICAgICAgIHBvc2l0aW9uIDogcmVsYXRpdmU7CiAgICAgICAgICAgICAgICB3aWR0aCA6IDEwMC4wJTsKICAgICAgICAgICAgICAgIGhlaWdodDogMTAwLjAlOwogICAgICAgICAgICAgICAgbGVmdDogMC4wJTsKICAgICAgICAgICAgICAgIHRvcDogMC4wJTsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgPC9zdHlsZT4KICAgICAgICAKICAgICAgICAKICAgICAgICAKICAgICAgICA8L2hlYWQ+CiAgICAgICAgPGJvZHk+CiAgICAgICAgICAgIAogICAgICAgIAogICAgICAgICAgICAKICAgICAgICAgICAgPGRpdiBjbGFzcz0iZm9saXVtLW1hcCIgaWQ9Im1hcF8wZmJkOTUzMjdkNWM0NjA5YTQ0N2E0ZGMxMzRlZDY4MiIgPjwvZGl2PgogICAgICAgIAogICAgICAgIAogICAgICAgIAogICAgICAgIDwvYm9keT4KICAgICAgICA8c2NyaXB0PgogICAgICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCgogICAgICAgICAgICB2YXIgc291dGhXZXN0ID0gTC5sYXRMbmcoLTkwLCAtMTgwKTsKICAgICAgICAgICAgdmFyIG5vcnRoRWFzdCA9IEwubGF0TG5nKDkwLCAxODApOwogICAgICAgICAgICB2YXIgYm91bmRzID0gTC5sYXRMbmdCb3VuZHMoc291dGhXZXN0LCBub3J0aEVhc3QpOwoKICAgICAgICAgICAgdmFyIG1hcF8wZmJkOTUzMjdkNWM0NjA5YTQ0N2E0ZGMxMzRlZDY4MiA9IEwubWFwKCdtYXBfMGZiZDk1MzI3ZDVjNDYwOWE0NDdhNGRjMTM0ZWQ2ODInLCB7CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXI6WzQ1LjM3MiwtMTIxLjY5NzJdLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgem9vbTogMTIsCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhCb3VuZHM6IGJvdW5kcywKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyczogW10sCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcnM6IEwuQ1JTLkVQU0czODU3CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgIAogICAgICAgIAogICAgICAgIAogICAgICAgICAgICAKICAgICAgICAgICAgdmFyIHRpbGVfbGF5ZXJfYWI5ZmZlOTk4YjkyNDM1OGJhOTRjMmJjMjU4OTYyNTIgPSBMLnRpbGVMYXllcigKICAgICAgICAgICAgICAgICdodHRwczovL3N0YW1lbi10aWxlcy17c30uYS5zc2wuZmFzdGx5Lm5ldC90ZXJyYWluL3t6fS97eH0ve3l9LmpwZycsCiAgICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAgICAgbWF4Wm9vbTogMTgsCiAgICAgICAgICAgICAgICAgICAgbWluWm9vbTogMSwKICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ01hcCB0aWxlcyBieSA8YSBocmVmPSJodHRwOi8vc3RhbWVuLmNvbSI+U3RhbWVuIERlc2lnbjwvYT4sIHVuZGVyIDxhIGhyZWY9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL2xpY2Vuc2VzL2J5LzMuMCI+Q0MgQlkgMy4wPC9hPi4gRGF0YSBieSA8YSBocmVmPSJodHRwOi8vb3BlbnN0cmVldG1hcC5vcmciPk9wZW5TdHJlZXRNYXA8L2E+LCB1bmRlciA8YSBocmVmPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS8zLjAiPkNDIEJZIFNBPC9hPi4nLAogICAgICAgICAgICAgICAgICAgIGRldGVjdFJldGluYTogZmFsc2UKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICApLmFkZFRvKG1hcF8wZmJkOTUzMjdkNWM0NjA5YTQ0N2E0ZGMxMzRlZDY4Mik7CgogICAgICAgIAogICAgICAgIAogICAgICAgICAgICAKCiAgICAgICAgICAgIHZhciBtYXJrZXJfZTdkNjUxM2QyZWJkNGQwM2EzYmQ3YmM1ODRlNjgzYzMgPSBMLm1hcmtlcigKICAgICAgICAgICAgICAgIFs0NS4zMjg4LC0xMjEuNjYyNV0sCiAgICAgICAgICAgICAgICB7CiAgICAgICAgICAgICAgICAgICAgaWNvbjogbmV3IEwuSWNvbi5EZWZhdWx0KCkKICAgICAgICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgICApCiAgICAgICAgICAgICAgICAuYWRkVG8obWFwXzBmYmQ5NTMyN2Q1YzQ2MDlhNDQ3YTRkYzEzNGVkNjgyKTsKICAgICAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIAoKICAgICAgICAgICAgICAgIHZhciBpY29uX2Y5Yzg4ZDczNzhkZTQ3ZWJhODJjYTFjNzEwYWQ0YThmID0gTC5Bd2Vzb21lTWFya2Vycy5pY29uKHsKICAgICAgICAgICAgICAgICAgICBpY29uOiAnY2xvdWQnLAogICAgICAgICAgICAgICAgICAgIGljb25Db2xvcjogJ3doaXRlJywKICAgICAgICAgICAgICAgICAgICBtYXJrZXJDb2xvcjogJ2JsdWUnLAogICAgICAgICAgICAgICAgICAgIHByZWZpeDogJ2dseXBoaWNvbicsCiAgICAgICAgICAgICAgICAgICAgZXh0cmFDbGFzc2VzOiAnZmEtcm90YXRlLTAnCiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICBtYXJrZXJfZTdkNjUxM2QyZWJkNGQwM2EzYmQ3YmM1ODRlNjgzYzMuc2V0SWNvbihpY29uX2Y5Yzg4ZDczNzhkZTQ3ZWJhODJjYTFjNzEwYWQ0YThmKTsKICAgICAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIAogICAgICAgICAgICB2YXIgcG9wdXBfNjVjN2RlOWQyYzQ1NDZlMmEyNzdhNjc3MmE1OWM3NjkgPSBMLnBvcHVwKHttYXhXaWR0aDogJzMwMCd9KTsKCiAgICAgICAgICAgIAogICAgICAgICAgICAgICAgdmFyIGh0bWxfYTg2MDZjODYxOWRmNDJjM2EzNDc5MDg1Y2MxOTk3YzggPSAkKCcgICAgICAgICA8ZGl2IGlkPSJodG1sX2E4NjA2Yzg2MTlkZjQyYzNhMzQ3OTA4NWNjMTk5N2M4IiAgICAgICAgICAgICAgICAgc3R5bGU9IndpZHRoOiAxMDAuMCU7IGhlaWdodDogMTAwLjAlOyI+ICAgICAgICAgICAgICAgICBNdC4gSG9vZCBNZWFkb3dzPC9kaXY+ICAgICAgICAgICAgICAgICAnKVswXTsKICAgICAgICAgICAgICAgIHBvcHVwXzY1YzdkZTlkMmM0NTQ2ZTJhMjc3YTY3NzJhNTljNzY5LnNldENvbnRlbnQoaHRtbF9hODYwNmM4NjE5ZGY0MmMzYTM0NzkwODVjYzE5OTdjOCk7CiAgICAgICAgICAgIAoKICAgICAgICAgICAgbWFya2VyX2U3ZDY1MTNkMmViZDRkMDNhM2JkN2JjNTg0ZTY4M2MzLmJpbmRQb3B1cChwb3B1cF82NWM3ZGU5ZDJjNDU0NmUyYTI3N2E2NzcyYTU5Yzc2OSk7CgogICAgICAgICAgICAKICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCgogICAgICAgICAgICB2YXIgbWFya2VyXzAwMDE1M2YxNTA2YTRlZDhhZWUyMjhhNWM3OGFmYWIxID0gTC5tYXJrZXIoCiAgICAgICAgICAgICAgICBbNDUuMzMxMSwtMTIxLjcxMTNdLAogICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgIGljb246IG5ldyBMLkljb24uRGVmYXVsdCgpCiAgICAgICAgICAgICAgICAgICAgfQogICAgICAgICAgICAgICAgKQogICAgICAgICAgICAgICAgLmFkZFRvKG1hcF8wZmJkOTUzMjdkNWM0NjA5YTQ0N2E0ZGMxMzRlZDY4Mik7CiAgICAgICAgICAgIAogICAgICAgIAogICAgICAgICAgICAKCiAgICAgICAgICAgICAgICB2YXIgaWNvbl8xYTk3ZGUxYjU5NTY0ZDE0OWFjMzYwNDJmMmJlOTI3ZiA9IEwuQXdlc29tZU1hcmtlcnMuaWNvbih7CiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2luZm8tc2lnbicsCiAgICAgICAgICAgICAgICAgICAgaWNvbkNvbG9yOiAnd2hpdGUnLAogICAgICAgICAgICAgICAgICAgIG1hcmtlckNvbG9yOiAnZ3JlZW4nLAogICAgICAgICAgICAgICAgICAgIHByZWZpeDogJ2dseXBoaWNvbicsCiAgICAgICAgICAgICAgICAgICAgZXh0cmFDbGFzc2VzOiAnZmEtcm90YXRlLTAnCiAgICAgICAgICAgICAgICAgICAgfSk7CiAgICAgICAgICAgICAgICBtYXJrZXJfMDAwMTUzZjE1MDZhNGVkOGFlZTIyOGE1Yzc4YWZhYjEuc2V0SWNvbihpY29uXzFhOTdkZTFiNTk1NjRkMTQ5YWMzNjA0MmYyYmU5MjdmKTsKICAgICAgICAgICAgCiAgICAgICAgCiAgICAgICAgICAgIAogICAgICAgICAgICB2YXIgcG9wdXBfZmQ2YzRjOTFkMWE4NDI4Nzk1ZGZhMGZhMzQ4YjU4MGQgPSBMLnBvcHVwKHttYXhXaWR0aDogJzMwMCd9KTsKCiAgICAgICAgICAgIAogICAgICAgICAgICAgICAgdmFyIGh0bWxfYjQyZjdjOTYzM2FjNGU1OTlkMDk1Mzg0NTRhNDU4NTMgPSAkKCcgICAgICAgICA8ZGl2IGlkPSJodG1sX2I0MmY3Yzk2MzNhYzRlNTk5ZDA5NTM4NDU0YTQ1ODUzIiAgICAgICAgICAgICAgICAgc3R5bGU9IndpZHRoOiAxMDAuMCU7IGhlaWdodDogMTAwLjAlOyI+ICAgICAgICAgICAgICAgICBUaW1iZXJsaW5lIExvZGdlPC9kaXY+ICAgICAgICAgICAgICAgICAnKVswXTsKICAgICAgICAgICAgICAgIHBvcHVwX2ZkNmM0YzkxZDFhODQyODc5NWRmYTBmYTM0OGI1ODBkLnNldENvbnRlbnQoaHRtbF9iNDJmN2M5NjMzYWM0ZTU5OWQwOTUzODQ1NGE0NTg1Myk7CiAgICAgICAgICAgIAoKICAgICAgICAgICAgbWFya2VyXzAwMDE1M2YxNTA2YTRlZDhhZWUyMjhhNWM3OGFmYWIxLmJpbmRQb3B1cChwb3B1cF9mZDZjNGM5MWQxYTg0Mjg3OTVkZmEwZmEzNDhiNTgwZCk7CgogICAgICAgICAgICAKICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCgogICAgICAgICAgICB2YXIgbWFya2VyX2MzYzYyZmUwN2ZlNDQ2NWJhMjYxZDc2MGJjYTc2ZWZmID0gTC5tYXJrZXIoCiAgICAgICAgICAgICAgICBbNDUuMzMsLTEyMS42ODIzXSwKICAgICAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgICAgICBpY29uOiBuZXcgTC5JY29uLkRlZmF1bHQoKQogICAgICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgICAgICkKICAgICAgICAgICAgICAgIC5hZGRUbyhtYXBfMGZiZDk1MzI3ZDVjNDYwOWE0NDdhNGRjMTM0ZWQ2ODIpOwogICAgICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCgogICAgICAgICAgICAgICAgdmFyIGljb25fYjZiNDJkZTgxOGQ0NGJhY2E3MmNlZTc4YmM5MjZjZGQgPSBMLkF3ZXNvbWVNYXJrZXJzLmljb24oewogICAgICAgICAgICAgICAgICAgIGljb246ICdpbmZvLXNpZ24nLAogICAgICAgICAgICAgICAgICAgIGljb25Db2xvcjogJ3doaXRlJywKICAgICAgICAgICAgICAgICAgICBtYXJrZXJDb2xvcjogJ3JlZCcsCiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiAnZ2x5cGhpY29uJywKICAgICAgICAgICAgICAgICAgICBleHRyYUNsYXNzZXM6ICdmYS1yb3RhdGUtMCcKICAgICAgICAgICAgICAgICAgICB9KTsKICAgICAgICAgICAgICAgIG1hcmtlcl9jM2M2MmZlMDdmZTQ0NjViYTI2MWQ3NjBiY2E3NmVmZi5zZXRJY29uKGljb25fYjZiNDJkZTgxOGQ0NGJhY2E3MmNlZTc4YmM5MjZjZGQpOwogICAgICAgICAgICAKICAgICAgICAKICAgICAgICAgICAgCiAgICAgICAgICAgIHZhciBwb3B1cF8zNWJlNjdkOWRlMGY0OGYwOTU2NTM5MmI5ODFhMWNkMCA9IEwucG9wdXAoe21heFdpZHRoOiAnMzAwJ30pOwoKICAgICAgICAgICAgCiAgICAgICAgICAgICAgICB2YXIgaHRtbF8zNDdhMmRkNzFkMDE0ZWEwYTFiNmM5YzcwNTFiNjIwNyA9ICQoJyAgICAgICAgIDxkaXYgaWQ9Imh0bWxfMzQ3YTJkZDcxZDAxNGVhMGExYjZjOWM3MDUxYjYyMDciICAgICAgICAgICAgICAgICBzdHlsZT0id2lkdGg6IDEwMC4wJTsgaGVpZ2h0OiAxMDAuMCU7Ij4gICAgICAgICAgICAgICAgIFNvbWUgT3RoZXIgTG9jYXRpb248L2Rpdj4gICAgICAgICAgICAgICAgICcpWzBdOwogICAgICAgICAgICAgICAgcG9wdXBfMzViZTY3ZDlkZTBmNDhmMDk1NjUzOTJiOTgxYTFjZDAuc2V0Q29udGVudChodG1sXzM0N2EyZGQ3MWQwMTRlYTBhMWI2YzljNzA1MWI2MjA3KTsKICAgICAgICAgICAgCgogICAgICAgICAgICBtYXJrZXJfYzNjNjJmZTA3ZmU0NDY1YmEyNjFkNzYwYmNhNzZlZmYuYmluZFBvcHVwKHBvcHVwXzM1YmU2N2Q5ZGUwZjQ4ZjA5NTY1MzkyYjk4MWExY2QwKTsKCiAgICAgICAgICAgIAogICAgICAgIAogICAgICAgIAogICAgICAgIAogICAgICAgIDwvc2NyaXB0PgogICAgICAgIA==" style="position:absolute;width:100%;height:100%;left:0;top:0;"></iframe></div></div>
</div>



## Rich outputs from notebook cells

Because notebooks have rich text outputs, you can store these in
your Jupyter Book as well!



{:.input_area}
```python
!jupyter-book create -h
```


{:.output .output_stream}
```
usage: jupyter-book [-h] [--out-folder OUT_FOLDER] [--license LICENSE]
                    [--content-folder CONTENT_FOLDER] [--toc TOC]
                    [--config CONFIG] [--custom-css CUSTOM_CSS]
                    [--custom-js CUSTOM_JS]
                    [--extra-files EXTRA_FILES [EXTRA_FILES ...]]
                    [--overwrite] [--demo] [--verbose VERBOSE]
                    name

Create a new Jupyter Book

positional arguments:
  name                  The name of your Jupyter Book (your book template will
                        be placed in a folder of this name)

optional arguments:
  -h, --help            show this help message and exit
  --out-folder OUT_FOLDER
                        The location where your book will be placed
  --license LICENSE     A path to a LICENSE.md file if you have already
                        created one
  --content-folder CONTENT_FOLDER
                        A path to a folder that holds your book content
  --toc TOC             A path to a yaml file that contains a Table of
                        Contents for your Jupyter Book. This will overwrite
                        parts of the book template's default toc.yml
                        configuration
  --config CONFIG       A path to a configuration YAML file that contains
                        configuration for your Jupyter Book. This will
                        overwrite parts of the book template's default
                        _config.yml configuration
  --custom-css CUSTOM_CSS
                        A path to a CSS file that defines some custom CSS
                        rules for your book
  --custom-js CUSTOM_JS
                        A path to a JS file that defines some custom CSS rules
                        for your book
  --extra-files EXTRA_FILES [EXTRA_FILES ...]
                        A list of extra files / folders to copy into your
                        book's directory
  --overwrite           Whether to overwrite a pre-existing book if it exists
  --demo                Whether to build the book with demo content instead of
                        your own content
  --verbose VERBOSE     Whether to display output information. [yes/no]

```



{:.input_area}
```python
this_will_error
```


{:.output .output_traceback_line}
```

    ---------------------------------------------------------------------------

    NameError                                 Traceback (most recent call last)

    <ipython-input-1-09f61459889d> in <module>()
    ----> 1 this_will_error
    

    NameError: name 'this_will_error' is not defined


```
