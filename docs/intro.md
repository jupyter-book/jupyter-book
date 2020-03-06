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

## Get started

To get started, check out the pages above. These are major sections of the documentation.
In particular, {doc}`guide/01_overview` is a good way to get familiar with this tool and how to
create your own books.

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
top-level command called `jupyter-book`, and a number of sub-commands.
Run `jupyter-book -h` for more information.

For more information on how to use this tool, see {doc}`guide/01_overview`.