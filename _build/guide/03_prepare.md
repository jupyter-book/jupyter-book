---
redirect_from:
  - "/guide/03-prepare"
title: 'Prepare your book'
prev_page:
  url: /guide/02_setup
  title: 'Setup and Install'
next_page:
  url: /guide/04_build
  title: 'Build your book'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---
## Add content to your book

Jupyter Book expects all of your content to be placed in the `/content/` directory
of the repository. You should place the following files somewhere in this directory:

* notebook files for your content
* markdown files for your content
* any images referenced in notebook / markdown files. 
  Make sure to use relative paths for your images!
* Any other files you'd like copied over to the `/_build/` directory when you build
  your book.

You can store these files in whatever collection of folders you'd like, note that
the *structure* of your book when it is built will depend solely on the order of
items in your `_data/toc.yml` file (see below section)

## Update your book's Table of Contents

Ensure that your Table of Contents file (`_data/toc.yml`) is up to date. The links in
that file should be **relative to the `/content/` folder and with no extension.** For example,
the file that's located in `mysite/content/mychapter/mypage.ipynb` should have an entry like this:

    - title: My page title
        url: /mychapter/mypage

See [the template `toc.yml`](https://github.com/choldgraf/jupyter-book/tree/master/_data/toc.yml) for examples.

## Configure your book

You can configure several aspects of your site. This is primarily done
by changing [the values in `_config.yml`](https://github.com/choldgraf/jupyter-book/blob/master/_config.yml). Values that are unique to the
textbook can be found under the `# Jupyter Books settings` section. See the
[comments in that file](https://github.com/choldgraf/jupyter-book/blob/master/_config.yml) for information about what each field does.

You can modify things like where your interact links point (if you've set up your
own JupyterHub or BinderHub) or whether these links should use JupyterLab by default.

## Site CSS and Javascript

You can change the site's CSS rules to get the look and feel you desire, as well as add
any javascript that you wish. To do so, find the relevant folders in the `assets/` folder.

This site uses SCSS to make it easier to create modular and beautiful CSS rules. If you create
a new CSS file, make sure that you include it in `_sass/main.scss`.

## (optional) choose a different license

By default, all content in the `content/` folder is licensed under the
[Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/) (CC BY-SA 4.0) license. This is specified in the LICENSE.md file.

CC BY-SA requires attribution of your work, and also requires that any derivations
someone creates are released under a license *at least as permissive* as CC BY-SA.

If you'd like to choose a different license, you can modify the text in LICENSE.md to
whatever you'd like.
