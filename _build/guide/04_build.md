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

2. From here, you have **two options**
    * **Option 1**: Remove the `.nojekyll` file in the root of the repository. This will tell
      GitHub pages to auto-generate your site from the markdown you just built once you upload it
      to GitHub. Push the changes to your GitHub repo and that's it!
    * **Option 2**: Build the site HTML locally by running the following command:
    
          make build
      
      This will put the HTML for the site in a folder called `docs/`, which you can use to host online with
      GitHub pages (or elsewhere if you wish).
      
* Push your site to GitHub and configure it to build a website out of your repository.
You can the push the changes to GitHub, which will automatically build a Jekyll site with
your newly-created Markdown files. We'll cover this next.

## When should you build the HTML locally?

You might ask: if GitHub pages can build my site automatically from the markdown files, why
build it locally? The main reason for this is that you get more flexibility by building locally
and serving raw HTML, as opposed to auto-building the site with GitHub-pages.

In particular, if you wish to use any **extra Jekyll plugins**, such as the `jekyll-scholar` plugin that
enables you to add citations and bibliographies, then you need to build your site
locally as HTML. GitHub-pages doesn't let you enable any extra plugins if it auto-builds your site.
