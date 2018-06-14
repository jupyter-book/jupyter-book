---
title: Preparing and Configuring your site
---

## Site navigation

To control the navbar at the top of the site, modify the first section
of `_data/navigation.yml`. These items are used to define the buttons
at the top of each page (if you are building the masthead with your site).

## Site configuration

You can configure several aspects of your site. This is primarily done
by changing the values in `_config.yml`. Values that are unique to the
textbook can be found under the `# Textbook settings` section. Below
is a short list of the most relevant fields

### General Jekyll fields
* `url`: The URL of your site, you should get this from GitHub pages (see
  the next section if you're not sure what URL this is).
* `baseurl`: If your textbook will live at a sub-folder of the `url` above, put
  the path to this folder here.

### Textbook-specific fields
* `hub_url`: The URL of a JupyterHub that runs your notebooks. It is used
  in generating "interact links" for your textbook.
* `hub_name`: The name of your JupyterHub (used for the button in the navbar).
* `textbook_url`: The URL of your fork of the textbook on GitHub. Used to generate
  interact links.
* `textbook_branch`: The branch of your textbook repository that contains the chapters
  you'd like to share. Used to generate interact links.
* `number_chapters`: Whether to add numbers to the title of each chapter.
* `chapter_titles`: Whether to include the title of each chapter to the top of its page.
* `masthead`: Whether to include the masthead (or header) in your built website. If you
  *only* want to serve the textbook and nothing else, this should be `false`. If you'd like
  to serve a course website *along with* your online textbook, set it to `true`.

Once you've got your site configured how you'd like, it's to build your textbook!