# Frequently Asked Questions (FAQ)

The following are some common issues and questions that have arisen when
building your textbook with Jupyter-Book.

## What if I have an issue or question?

If you've got questions, concerns, or suggestions, please open an issue at
[at the jupyter book issues page](https://github.com/executablebooks/jupyter-book/issues)

## How should I add cell tags to my notebooks?

You can control the behavior of Jupyter Book by putting custom tags
in the metadata of your cells. This allows you to do things like
{doc}`automatically hide code cells <../content/hiding>`) as well as
{ref}`adding interactive widgets to cells <launch/thebelab>`.

There are two straightforward ways to add metadata to cells:

1. **Use the Jupyter Notebook cell tag editor**. The Jupyter Notebook ships with a
   cell tag editor by default. This lets you add cell tags to each cell quickly.

   To enable the cell tag editor, go click `View -> Cell Toolbar -> Tags`. This
   will enable the tags UI. Here's what the menu looks like.

   ![](../images/tags_notebook.png)

2. **Use the JupyterLab Cell Tags plugin**. JupyterLab is an IDE-like Jupyter
   environment that runs in your browser. It has a "cell tags" plugin built-in,
   which exposes a user interface that lets you quickly insert cell tags.

   You'll find tags under the "wrench" menu section.
   Here's what the tags UI in JupyterLab looks like.

   ![](../images/tags_jupyterlab.png)
