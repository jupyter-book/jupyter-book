# Making a new release of Jupyter Book

The extension can be published to `PyPI` and `npm` using the [Jupyter Releaser](https://github.com/jupyter-server/jupyter_releaser).

## Automated releases with the Jupyter Releaser
Here is a summary of the steps to cut a new release:
- In the Actions panel, go to the [Step 1: Prep Release](https://github.com/jupyter-book/jupyter-book/actions/workflows/prep-release.yml) workflow.
  - Click `Run Workflow` -> `Run Workflow` with default values.
- Go to [the Releases page](https://github.com/jupyter-book/jupyter-book/releases)
  - You should see a **Draft release** with the changelog for this release.
  - If it looks good, proceed to the next step!
- Go to the [Step 2: Publish Release](https://github.com/jupyter-book/jupyter-book/actions/workflows/publish-release.yml) workflow page
  - Click `Run Workflow` -> `Run Workflow` with default values.
  - This will publish the release.

## Updating `mystmd` dependencies

Jupyter Book ships the MyST engine via the `myst-cli` Node dependency in `package.json`.

To pick up a new `mystmd` release, update the `myst-cli` version in `package-lock.json`:

```shell
$ npm update myst-cli
```

Then make a PR with this new version and merge it.
Double check that any changes in the `mystmd` package don't require a change here! (usually this is not the case)

## Publishing to `conda-forge`

A bot should pick up the new version publish to PyPI, and open a new PR on the feedstock repository automatically.
