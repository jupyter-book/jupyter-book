(example-project)=
# Build a small example project

Now that you've built your first book, you may wish to get some inspiration from a more "complete" book example.

This section describes the [QuantEcom mini book](https://executablebooks.github.io/quantecon-mini-example/docs/index.html) to show you how it's made.

Some of the features on display include

* [Jupyter Notebook-style inputs and outputs](https://executablebooks.github.io/quantecon-mini-example/docs/python_by_example.html#version-1)
* [citations](https://executablebooks.github.io/quantecon-mini-example/docs/about_py.html#bibliography)
* [numbered equations](https://executablebooks.github.io/quantecon-mini-example/docs/python_by_example.html#another-application)
* [numbered figures](https://executablebooks.github.io/quantecon-mini-example/docs/getting_started.html#jupyter-notebooks) with captions and cross-referencing

:::{seealso}
For more inspiration and example books, see [the Jupyter Book gallery](https://executablebooks.org/en/latest/gallery.html)
:::

## Mini-book source files

The source files can be [found on GitHub](https://github.com/executablebooks/quantecon-mini-example/)
in the [docs directory](https://github.com/executablebooks/quantecon-mini-example/tree/master/mini_book/docs).
These files are written in [MyST Markdown](../content/myst.md), an
extension of the Jupyter Notebook Markdown, that allows for additional scientific markup.
They could alternatively have been written directly as Jupyter notebooks.

## Build the demo book

You can build this book locally on the command line via the following steps:

1. Ensure you have a recent version of [Anaconda Python](https://www.anaconda.com/distribution/) installed.

2. Clone the repository containing the demo book source files

    ```bash
    git clone https://github.com/executablebooks/quantecon-mini-example
    cd quantecon-mini-example
    ```

    ````{margin}
    If you'd like to install Jupyter Book with `pip`, you can do so with:

    ```bash
    pip install -U jupyter-book
    ```
    See [the getting started page](../start/overview.md) for more information.
    ````

3. Install the Python libraries needed to run the code in this particular example
   from [the `environment.yml` file](https://github.com/executablebooks/quantecon-mini-example/blob/master/environment.yml).
   This includes the latest version of Jupyter Book:

    ```bash
    conda env create -f environment.yml
    conda activate qe-mini-example
    ```

4. Run Jupyter Book over the source files

    ```bash
    jupyter-book build ./mini_book
    ```

5. View the result through a browser --- try (with, say, firefox)

    ```bash
    firefox mini_book/_build/html/index.html
    ```

    (or simply double-click on the `html` file)

Now you might like to try editing the files in ``mini_book/docs`` and then
rebuilding.

## Further reading

See [the full QuantEcon example](https://executablebooks.github.io/quantecon-example/docs/index.html)
for a longer Jupyter Book use case, drawn from the same source material.
