# Make a new release of Jupyter Book

A new release begins by updating the `mystmd` dependency to the latest version. Once that change has been merged into `main`, the [**Jupyter Releaser**](https://github.com/jupyter-server/jupyter_releaser) workflows prepare and publish the release automatically. Finally, a bot detects the new PyPI release and opens a pull request to update the conda-forge recipe. The sections below walk you through each step of the process.

---

## Before you begin

If this is your **first time making a release**, please follow these setup instructions. Otherwise, you can skip directly to _1. 

Make sure you have:
- **Software:** [Node.js](https://nodejs.org/en/download) (which includes `npm`) installed.
- **Repository access:**
  - A local clone of the [`jupyter-book`](https://github.com/jupyter-book/jupyter-book) repository.
  - **Write access** to the repository, including **permission to run the release workflows** on GitHub.

Then prepare your local repository:

1. Switch to the `main` branch and make sure it is up to date (sync the fork!).
2. Create a **new branch** for the release (for example, `bump-myst-cli-<version>`; you can find the latest version [here](https://github.com/jupyter-book/mystmd/releases)).

---

## Updating `mystmd` dependency

- Jupyter Book ships the MyST document engine through the `myst-cli` Node dependency in `package.json`.  
  To use the latest `mystmd` release, update the `myst-cli` version in `package-lock.json`:

  ```shell
  $ npm update myst-cli
  ```
  This will change several entries in the `package-lock.json` file, because the `myst-cli` package has its own dependencies. This is to be expected!

  _Note: Double check that any changes in the `mystmd` package don't require a change here! (usually this is not the case)_

---

## Make a pull request and merge

- **Make a pull request** with the new `package-lock.json` file (add the label `dependencies` and `maintenance`) 
- **Merge** the pull request

---

## Automated releases with the Jupyter Releaser

- Go to [Step 1: Prep Release](https://github.com/jupyter-book/jupyter-book/actions/workflows/prep-release.yml) workflow in GitHub Actions. 
  - Click `Run Workflow` -> `Run Workflow` with default values.
- Go to [the Releases page](https://github.com/jupyter-book/jupyter-book/releases)
  - When `Step 1` completes, you'll see a new **Draft release** with the changelog.
  - If you don't see it yet, refresh the page once the workflow from `Step 1` completes.
  - If it looks good, proceed to the next step!
- Go to the [Step 2: Publish Release](https://github.com/jupyter-book/jupyter-book/actions/workflows/publish-release.yml) workflow page
  - Click `Run Workflow` -> `Run Workflow` with default values.
  - This will publish the release.

---

## Publishing to `conda-forge`

Your job is done! A bot should pick up the new version publish to PyPI, and open a new PR on the feedstock repository automatically.
