# Instructions for creating a new release

Jupyter-Book is [hosted on the pypi repository](https://pypi.org/project/jupyter-book/).
A new release is automatically created via GitHub Actions when a new release is added to the GitHub repository.

To create a new release of Jupyter Book, follow the [release instructions in the `executablebooks/` meta repository](https://github.com/executablebooks/.github/blob/master/CONTRIBUTING.md#the-process-of-creating-a-release)

## To create a release

To create a new release, follow these steps:

- Ensure that there aren't any extra issues to tackle in
   [the milestone for the next release](https://github.com/executablebooks/jupyter-book/milestones?direction=asc&sort=due_date)
- Bump `__init__.py` to the version for the release. Use
  [semantic versioning](https://semver.org/) to decide what version to choose.
  For example:

  ```
  __version__ = "0.6.1"
  ```
- Create a "release commit":

  ```
  git add jupyter_book
  git commit -m "🚀RELEASE: <version-number>"
  git push upstream master
  ```
- [Create a new release](https://github.com/executablebooks/jupyter-book/releases/new) on GitHub.
  The tag and title should be `v<version-number>`. For example, `v0.6.1`.
  - GitHub Actions will automatically deploy this release to PyPI using
    [this configuration](https://github.com/executablebooks/jupyter-book/blob/master/.github/workflows/tests.yml#L86).
  - Confirm that a new version of the package [is posted to pypi](https://pypi.org/project/jupyter-book/)
- Add a changelog for the latest version by using `github-activity`:

  ```
  github-activity executablebooks/jupyter-book -s <old-version-tag> -u <new-version-tag>
  ```

  Paste the result into the release description on GitHub.
- You're done! 🎉
