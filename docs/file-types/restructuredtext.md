(file-types:rst)=
# reStructuredText files

In addition to writing your content in Markdown, Jupyter Book also supports
writing content in [reStructuredText](https://docutils.sourceforge.io/rst.html),
another markup language that is common in the Python documentation community.

:::{warning}
Writing content in reStructuredText is only recommended for users who are already
familiar with it.
For others, we recommend using [MyST Markdown](../content/myst.md),
which has all of the same features of rST and Sphinx, but with a Markdown flavour.
:::

Because Jupyter Book uses Sphinx under the hood, any document that is written in rST
for the Sphinx ecosystem should also work with Jupyter Book. This is particularly
useful if you've already got a significant amount of documentation written in rST
and you'd like to try it out with Jupyter Book.

For more information on writing content with reStructuredText, we recommend
reading [the Sphinx rST documentation](https://www.sphinx-doc.org/es/stable/rest.html).

## Including reStructuredText in Markdown

To insert rST into Markdown, you can use the [eval-rst directive](myst-parser:syntax/directives/parsing):

````md
```{eval-rst}
.. note::

   A note written in reStructuredText.

.. include:: ./include-rst.rst
```
````

```{eval-rst}
.. note::

   A note written in reStructuredText.

.. include:: ./include-rst.rst
```
