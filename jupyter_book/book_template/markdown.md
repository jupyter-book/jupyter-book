Markdown files
==============

Jupyter Book allows you to write your content directly in markdown files.
If you'd like to include computational content with these markdown files,
use the following directive:

````
```{execute}
print("Here is some code to execute")
```
````

When your book is build, the contents of any `{execute}` blocks will be
executed with your default Jupyter kernel, and their outputs will be displayed
in-line with the rest of your content.

For more information about executing computational content with Jupyter Book,
see [The MyST-NB documentation](https://myst-nb.readthedocs.io/).
