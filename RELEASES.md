# Instructions for creating a new release

Jupyter-Book is [hosted on the pypi repository](https://pypi.org/project/jupyter-book/).
To create a new release of Jupyter Book, you need to do these things:

1. Ensure that you have push access to the [Jupyter Book pypi repository](https://pypi.org/project/jupyter-book/)
2. Install [the twine package](https://twine.readthedocs.io/en/latest/). This is a package that helps you
   bundle and push new Python package distributions to pip.
3. Ensure that new additions, bugs, etc for this release are updated in
   [the CHANGELOG](https://github.com/jupyter/jupyter-book/blob/master/CHANGELOG.md)
 release of Jupyter Book has
4. Ensure that the [Jupyter Book version number](https://github.com/jupyter/jupyter-book/blob/master/jupyter_book/__init__.py)
   is correct, and remove the `dev` part of the version number.
5. Create a new distribution for Jupyter Book by
   [following the twine release instructions](https://twine.readthedocs.io/en/latest/#using-twine)
6. Confirm that the new version of Jupyter Book [is posted to pypi](https://pypi.org/project/jupyter-book/)
7. Bump the [Jupyter Book version number](https://github.com/jupyter/jupyter-book/blob/master/jupyter_book/__init__.py) to
   the next minor (or major) release and append `dev` to the end.
9. Celebrate! You've just released a new version of Jupyter Book!