# Jupytext source files

[Jupytext](https://jupytext.readthedocs.io/en/latest/) is an excellent Python
tool for two-way conversion between Jupyter Notebook `.ipynb` files and
[a variety of text-based files](https://jupytext.readthedocs.io/en/latest/formats.html).
Currently, Jupyter Book directly supports one Jupytext file format:
{doc}`notebooks with MyST Markdown <./myst-notebooks>`).

```{note}
If you'd like to see support in Jupyter Book for other types of Jupytext source files,
such as Python `.py` files, [open an issue](https://github.com/executablebooks/jupyter-book/issues/new)
and let us know!
```

## Convert a Jupytext file into a MyST notebook

If you'd like to convert your pre-existing Jupytext files into the MyST Notebook format,
so that they may be read in with Jupyter Book, install Jupytext and then run the
following command:

```bash
jupytext --to myst path/to/yourfile
```

Note that you may also pass a wildcard that will be used to convert multiple
files. For example:

```bash
jupytext --to myst ./*.py
```

See [the Jupytext CLI documentation](https://jupytext.readthedocs.io/en/latest/using-cli.html)
for more information.
