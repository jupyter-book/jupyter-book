---
title: Publish your site
---

Once you've generated the markdown for your notebooks, your site is ready to be
pushed and served by GitHub. To do this, take the following steps:

0. Confirm that your site files are built. You should see a
   collection of markdown files/folders in the `_chapters` folder.
1. Commit and push your changes to your fork of the repository. 
2. Confirm that `gh-pages` site-building is enabled.

   From your GitHub repository, click `Settings` then scroll down to the
   `GitHub Pages` section. You should see the message `Your site is published at <YOUR-URL>`.
3. Go to the URL listed at `<YOUR-URL>` and you should see your live site.

## To preview your built site

You can also preview your built site using Jekyll on your computer.
To do this, take the following steps:

1. Ensure that Jekyll and Ruby are installed. 
2. Ensure that your notebooks have been converted to markdown, there should be a
   collection of them in `_chapters`
3. Run the Jekyll site preview command:

       bundle exec jekyll serve

This should open up a port on your computer with a live version of the textbook.