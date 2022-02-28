# Contribute to code

This page has sections that cover how to contribute code and work with the codebase in Jupyter Book.

## Development guidelines

For information about development conventions, practices, and infrastructure, please see [the `executablebooks/` development guidelines](https://executablebooks.org/en/latest/contributing.html).

## Run the tests

For code tests, Jupyter Book uses [pytest](https://docs.pytest.org).
The easiest way to run the tests is with [tox](https://tox.readthedocs.io).
For example:

```console
$ tox
```

This will run the test suite with the default `tox` environment (currently, Python 3.9 and Sphinx 4).

:::{note}
With the default `tox` invocation, some PDF and Latex tests will fail.
This is expected and not a big deal.
When you make a PR, use the test suite that is run as part of CI/CD to confirm whether these tests work.
:::

### Pass arguments to pytest

You can pass arguments to pytest by using `-- <arg-list>`.
For example, to only run tests that match the phrase `match_phrase`, run the following:

```console
$ tox -- -k match_phrase
```

### Run tests in a specific environment

There are a number of environments in which you can run tests, covering several versions of Python and Sphinx.

For example, to run tests for `python==3.8` and `sphinx==3`:

```console
$ tox -e py38-sphinx3
```

### Run tests in parallel

If you'd like to speed up the test suite, you can try running the tests in parallel using [pytest-xdist](https://github.com/pytest-dev/pytest-xdist) for running tests in parallel.

To do so, use the `-n` argument followed by the number of CPUs you would like to use.
For example: `pytest -n 4`.

## Test PDF generation

If you'd like to test (or try out) the generation of PDFs, take the following steps:

**To generate PDFs via HTML**, make sure you install Jupyter Book with
`pip install -e .[pdfhtml]`. This will install [`pyppeteer`](https://github.com/pyppeteer/pyppeteer),
which runs a headless chrome session to convert your book to PDF. Next, follow
the installation instructions at {ref}`pdf:html`. You should then be able to build your
book's PDF through HTML.

**To generate PDFs via LaTeX**, make sure you install a working LaTeX distribution locally.
Do so by following the instructions in {ref}`pdf:latex`.

If you have installed the requirements for both HTML and LaTeX generation, you should
be able to run the full test suite with pytest.

## GitHub Actions

We use a number of [GitHub Actions](https://docs.github.com/en/actions) in order to run tests, build documentation, and do quality assurance for Jupyter Book.
Their configuration is located in the `.github/workflows` folder.
They are run automatically with every Pull Request.

### View PDFs generated in GitHub Actions

A test included for each pull request is to build the `docs` as `PDF` files using both the
`pdfhtml` and `pdflatex` writers. These tests build the `pdf` file and then save them as artifacts
attached to each workflow run.

These `pdf` files can be retrieved from the [top right corner of a workflow run](https://github.com/actions/upload-artifact#where-does-the-upload-go).
