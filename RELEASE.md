# Making a new release of Jupyter Book

The extension can be published to `PyPI` and `npm` using the [Jupyter Releaser](https://github.com/jupyter-server/jupyter_releaser).

## Automated releases with the Jupyter Releaser
Here is a summary of the steps to cut a new release:
- Go to the Actions panel
- Run the "Step 1: Prep Release" workflow
- Check the draft changelog
- Run the "Step 2: Publish Release" workflow

## Publishing to `conda-forge`

A bot should pick up the new version publish to PyPI, and open a new PR on the feedstock repository automatically.

