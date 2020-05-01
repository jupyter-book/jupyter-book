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

# Math and Equations

Jupyter Book uses [MathJax](http://docs.mathjax.org/) for typesetting math in your
book. This allows you to have LaTeX-style mathematics in your online content.
This page shows you a few ways to control this.

For more information about equation numbering, see the
[MathJax equation numbering documentation](http://docs.mathjax.org/en/v2.7-latest/tex.html#automatic-equation-numbering).

## In-line math

To insert in-line math use the `$` symbol within a Markdown cell.
For example, the text `$this_{is}^{inline}$` will produce: $this_{is}^{inline}$.

+++

## Math blocks

You can also include math blocks for separate equations. This allows you to focus attention
on more complex or longer equations, as well as link to them in your pages. To use a block
equation, wrap the equation in either `$$` or `\begin` statements.

For example,

```latex
\begin{equation}
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
\end{equation}
```
results in

\begin{equation}
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
\end{equation}

+++

and

```latex
$$
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
$$
```

results in

$$
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
$$

+++

### Numbering equations

If you'd like to number equations so that you can refer to them later, use the **math directive**.
It looks like this:

````
```{math}
:label: my_label
my_math
```
````

For example, the following code:


````
```{math}
:label: my_label
w_{t+1} = (1 + r_{t+1}) s(w_t) + y_{t+1}
```
````

Will generate this:


```{math}
:label: my_label
w_{t+1} = (1 + r_{t+1}) s(w_t) + y_{t+1}
```

### Linking to equations

If you've created an equation with a label, you can link to it from within your text
(and across pages!).

You can refer to the equation using the label that you've provided by using
the **`{eq}` role**. For example, putting `` {eq}`my_label` `` in-line will
result in this: {eq}`my_label`.

```{code-cell} ipython3

```
