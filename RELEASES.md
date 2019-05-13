# Instructions for creating a new release

Jupyter-Book is [hosted on the pypi repository](https://pypi.org/project/jupyter-book/).
To create a new release of Jupyter Book, you need to do these things:

## Before you start

1. Ensure that you have push access to the [Jupyter Book pypi repository](https://pypi.org/project/jupyter-book/)
2. Install [the twine package](https://twine.readthedocs.io/en/latest/). This is a package that helps you
   bundle and push new Python package distributions to pip.
3. Install the [github-changelog-generator](https://github.com/github-changelog-generator/github-changelog-generator#installation).

## To create the release

1. Ensure that there aren't any extra issues tackle in
   [the milestone for the next release](https://github.com/jupyter/jupyter-book/milestones?direction=asc&sort=due_date)
2. Ensure that the [Jupyter Book version number](https://github.com/jupyter/jupyter-book/blob/master/jupyter_book/__init__.py)
   is correct, and remove the `dev0` part of the version number.
3. Create a new distribution for Jupyter Book by
   [following the twine release instructions](https://twine.readthedocs.io/en/latest/#using-twine)
4. Confirm that the new version of Jupyter Book [is posted to pypi](https://pypi.org/project/jupyter-book/)
5. Bump the [Jupyter Book version number](https://github.com/jupyter/jupyter-book/blob/master/jupyter_book/__init__.py) to
   the next minor (or major) release and append `dev0` to the end.
6. Generate the new changelog using the `github-changelog-generator`.
   * See [here for `github-changelog-generator` installation instructions](https://github.com/github-changelog-generator/github-changelog-generator#installation).
   * Run the generator with this command:
    
     ```
     github_changelog_generator sphinx-gallery/sphinx-gallery --token <<your-github-api-token>>
     ```
   * It will overwrite [`CHANGELOG.md`](https://github.com/jupyter/jupyter-book/blob/master/CHANGELOG.md).
     Ensure that the new version looks correct, then commit it to master.
7. Celebrate! You've just released a new version of Jupyter Book!