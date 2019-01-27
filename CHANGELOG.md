# The Jupyter Book Changelog

Below is a rough list of new features, broken down by Jupyter Book version.

## v0.3dev

### Features

- Added support for [Thebelab](https://minrk.github.io/thebelab/) to auto-generate
  interactive cells within the static page.
- Added support for Bibliographies via [jekyll-scholar](https://github.com/inukshuk/jekyll-scholar)
- Added ability to customize look and feel of the site with your own CSS/JS
- API CHANGE: there is now a separate configuration section for each button
  (jupyterhub, binderhub, etc).
- Added the ability to hide code cells and make them collapsible (#59](https://github.com/jupyter/jupyter-book/pull/59))
- Added option to hide sidebar (#59](https://github.com/jupyter/jupyter-book/pull/59))

### Minor fixes

- Minor improvements to page layout
- Redirections for sanitized URLs now check whether the filesystem is case-sensitive
  and raise an error if unexpected behavior would occur without changes. [@matthew-brett](https://github.com/matthew-brett)

## v0.2.1 - Beta 2.1

- Tests added to the Jupyter Book
- Utility scripts are now a mini python module
- Rearranging the location of the build folder and derivative files in this folder
- Default license picker ([#48](https://github.com/jupyter/jupyter-book/pull/48))
- YAML front-matter is now retained by default ([#53](https://github.com/jupyter/jupyter-book/pull/53))

## v0.2 - Beta 2

- Re-built the backend to Jupyter Book to use a simpler theme
- Niftier javascript features for faster page loading
- Improvements to CSS for math and text display

## v0.1 - Beta 1

First Jupyter Book proof-of-concept.