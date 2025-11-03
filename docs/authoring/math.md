---
title: Math and equations
---

# Math and equations

Jupyter Book uses [MathJax](http://docs.mathjax.org/) for typesetting math in your HTML book build.
This allows you to have LaTeX-style mathematics in your online content (and, which can be exported to both LaTeX and [Typst](https://typst.app/)).
This page shows you a few ways to control this.

:::{seealso}
For more information about math in MyST, see the [MyST guide on math](https://mystmd.org/guide/math).
:::

## Inline math

To insert inline math use the `$` symbol within a Markdown cell.
For example, the text `$this_{is}^{inline}$` will produce: $this_{is}^{inline}$.

## Math blocks

You can also include math blocks for separate equations. This allows you to focus attention
on more complex or longer equations, as well as link to them in your pages. To use a block
equation, wrap the equation in `$$` symbols.

For example,

```latex
$$
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
$$
```

results in:

$$
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
$$

## LaTeX-style math

MyST supports LaTeX-style math blocks with environments like `align`, `gather`, etc.

For example:

```latex
\begin{gather*}
a_1=b_1+c_1\\
a_2=b_2+c_2-d_2+e_2
\end{gather*}

\begin{align}
a_{11}& =b_{11}&
  a_{12}& =b_{12}\\
a_{21}& =b_{21}&
  a_{22}& =b_{22}+c_{22}
\end{align}
```

results in:

\begin{gather*}
a_1=b_1+c_1\\
a_2=b_2+c_2-d_2+e_2
\end{gather*}

\begin{align}
a_{11}& =b_{11}&
  a_{12}& =b_{12}\\
a_{21}& =b_{21}&
  a_{22}& =b_{22}+c_{22}
\end{align}

:::{seealso}
For advanced use, see the [MyST guide on math directives](https://mystmd.org/guide/math).
:::

## Numbering equations

If you'd like to number equations so that you can refer to them later, use the **math directive**.
It looks like this:

````md
```{math}
:label: my_label
my_math
```
````

For example, the following code:

````md
```{math}
:label: eq_my_label
w_{t+1} = (1 + r_{t+1}) s(w_t) + y_{t+1}
```
````

will generate

```{math}
:label: eq_my_label
w_{t+1} = (1 + r_{t+1}) s(w_t) + y_{t+1}
```

Alternatively you can use the dollar math syntax with a label:

```md
$$
  w_{t+1} = (1 + r_{t+1}) s(w_t) + y_{t+1}
$$ (my_other_label)
```

which generates

$$
  w_{t+1} = (1 + r_{t+1}) s(w_t) + y_{t+1}
$$ (my_other_label)

:::{note}
Labels cannot start with an integer, or they won't be referenced correctly.
For example, `:label: 1eq` cannot be referenced.
:::

## Linking to equations

If you have created an equation with a label, you can link to it from within your text
(and across pages!).

You can refer to the equation using the label that you've provided by using
the `{eq}` role. For example:

```md
- A link to an equation directive: {eq}`eq_my_label`
- A link to a dollar math block: {eq}`my_other_label`
```

results in

- A link to an equation directive: {eq}`eq_my_label`
- A link to a dollar math block: {eq}`my_other_label`

## Next steps

- [](../get-started/cross-reference.md) - Learn more about cross-referencing
- [MyST Math Guide](https://mystmd.org/guide/math) - Complete math reference
