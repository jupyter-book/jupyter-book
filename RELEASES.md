# Instructions for creating a new release

Jupyter-Book is [hosted on the pypi repository](https://pypi.org/project/jupyter-book/).
A new release is automatically created via GitHub Actions
when a new release is added to the GitHub repository.

To create a new release of Jupyter Book, you need to do these things:

## To create a release

To create a new release, follow these steps:

- Ensure that there aren't any extra issues to tackle in
   [the milestone for the next release](https://github.com/executablebooks/jupyter-book/milestones?direction=asc&sort=due_date)
- Remove `dev0` from the Jupyter Book version in `__init__.py`
- Create a "release commit":

  ```
  git add jupyter_book
  git commit -m "RLS: <version-number>"
  git push upstream master
  ```
- [Create a new release](https://github.com/executablebooks/jupyter-book/releases/new) on GitHub.
  The tag and title should be `v<version-number>`. For example, `v0.6.0`.
- Bump `__init__.py` to the next dev version. Increment the minor version and add `dev0` to it. e.g.:

  ```
  __version__ = "0.6.1dev0"
  ```
- Commit and push to master

  ```
  git add jupyter_book
  git commit -m "Dev version bump"
  git push upstream master
  ```
- Confirm that a new version of the package [is posted to pypi](https://pypi.org/project/jupyter-book/)
- Add a changelog for the latest version by using `github-activity`:

  ```
  github-activity executablebooks/jupyter-book -s <old-version-tag> -u <new-version-tag>
  ```

  and pasting the result into the release description on GitHub.
