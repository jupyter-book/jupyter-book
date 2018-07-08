---
title: Build your site files
---

To build your site, take the following steps:

0. (optionally) clean out the auto-generated folders with the helper script

       python scripts/clean.py

1. Ensure that a `SUMMARY.md` file exists in the root of the repository. This contains
   a markdown list of bullet points and links. Each item corresponds to a chapter in the
   textbook, and is used to build the table of contents in the sidebar. **The links
   in this file should point to the `.ipynb` and `.md` files in your `notebooks/`
   folder.**

   > If you **do not** have a `SUMMARY.md` file made for this textbook, you may create one
     by hand, or generate one from the folders/files in `notebooks/` by running the following
     script:
   >
   >    python scripts/generate_summary_from_folders.py

2. Build the textbook by navigating to the site root, and running the following command:

       make textbook

This will:

* Run `nbconvert` to turn the `.ipynb` files into markdown
* Replace relative image file paths with a `{{ site.baseurl }}` base for Jekyll
* Clean up formatting issues for displaying properly
* Generate the yaml for the site sidebar automatically

You can the push the changes to GitHub, which will automatically build a Jekyll site with
your newly-created Markdown files. We'll cover this next.
