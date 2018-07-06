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
* `hub_type`: *['binder', 'jupyterhub']*  Whether to build interact links for a BinderHub or a JupyterHub.
* `textbook_repo_base`: The site on which the textbook repository is hosted
  interact links.
* `textbook_repo_org`: The username or organization that owns this repository
* `textbook_repo_name`: The name of the repository on the web
* `textbook_repo_branch`: The branch on which your textbook is hosted.
* `number_chapters`: Whether to add numbers to the title of each chapter.
* `chapter_titles`: Whether to include the title of each chapter to the top of its page.
* `textbook_only`: If 'true', the home page will be the first chapter of the textbook,
  and *only* the sidebar is shown.
* `use_jupyterlab`: If 'true', interact links will initialize with the Jupyter Lab interface

Once you've got your site configured how you'd like, it's to build your textbook!

## Site CSS and Javascript

You can change the site's CSS rules to get the look and feel you desire, as well as add
any javascript that you wish. To do so, find the relevant folders in the `assets/` folder.
If you add a *new* CSS/JS file, make sure that you link it properly by modifying the header
template in `_includes/head/custom.html`.
