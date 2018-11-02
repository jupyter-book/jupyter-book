---
redirect_from:
  - "/guide/04-build"
title: 'Build your book'
prev_page:
  url: /guide/03_configure
  title: 'Configuration'
next_page:
  url: /guide/05_publish
  title: 'Publish your book'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---
To build your site, take the following steps.:

0. (optionally) clean out the auto-generated folders by running

       make clean

1. Ensure that your Table of Contents file (`_data/toc.yml`) is up to date. The links in
   that file should be **relative to the `/_contents/` folder and with no extension.** For example,
   the file that's located in `mysite/contents/mychapter/mypage.ipynb` should have an entry like this:

       - title: My page title
         url: /mychapter/mypage

   See [the template `toc.yml`](https://github.com/choldgraf/jupyter-book/tree/master/_data/toc.yml) for examples.

2. Build the textbook by navigating to the site root, and running the following command:

       make book

This will:

* Run `nbconvert` to turn the `.ipynb` files into markdown
* Replace relative image file paths so that they work on your new built site
* Clean up formatting issues for things like MathJax to display properly
* Place all these generated files in the `/_build/` directory.

You can the push the changes to GitHub, which will automatically build a Jekyll site with
your newly-created Markdown files. We'll cover this next.
