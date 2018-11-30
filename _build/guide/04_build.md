---
redirect_from:
  - "/guide/04-build"
title: 'Build your book'
prev_page:
  url: /guide/03_prepare
  title: 'Prepare your book'
next_page:
  url: /guide/05_publish
  title: 'Publish your book'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---
To build your site, take the following steps.:

0. (optionally) clean out the auto-generated folders by running

       make clean

1. Build the textbook by navigating to the site root, and running the following command:

       make book

This will:

* Use the links specified in the `_data/toc.yml` file (pointing to files in `/content/`) and
  do the following: 
* Run `nbconvert` to turn the `.ipynb` files into markdown
* Replace relative image file paths so that they work on your new built site
* Clean up formatting issues for things like MathJax to display properly
* Place all these generated files in the `/_build/` directory.

You can the push the changes to GitHub, which will automatically build a Jekyll site with
your newly-created Markdown files. We'll cover this next.
