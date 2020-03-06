# Books with Jupyter 2.0

```{warning}
This is an early prototype tool that may evolve quickly. Your feedback is
very welcome! To give it, please [open an issue in the CLI repository](https://github.com/ExecutableBookProject/cli/issues/new)
```

This tool provides a command-line interface and a Python API that lets users
do the following:

* Write their content in markdown files, Jupyter Notebooks, or rST files.
* Include computational elements in any of the above (e.g. executable
  code cells along with their outputs)
* Include rich syntax for publication features, such as citations,
  cross-references, and equations.
* Using a simple command, convert this content into:
    * A web-based interactive book
    * A publication-quality PDF

Currently it accomplishes a subset of these features.

## Install

Install this tool directly from the Master branch. When it has stabilized
we will begin creating releases.

```
pip install git+https://github.com/ExecutableBookProject/cli.git@master
```

## Develop

First clone the package:

```
git clone https://github.com/ExecutableBookProject/cli
cd cli
```

Next, install:

```
pip install -e .
```

## Use

The primary way to use this tool is via the command line. It provides a
top-level command called `jb`, and a number of sub-commands. Run `jb -h` for
more information.

```{note}
In the future this will probably be renamed to `jupyter-book`, but it remains
`jb` for now to avoid confusion with the current `jupyter-book` project.
```

For more information on how to use this tool, see {ref}`guide/01_overview`.