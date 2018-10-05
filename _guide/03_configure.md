---
title: Preparing and Configuring your site
---

## Site configuration

You can configure several aspects of your site. This is primarily done
by changing [the values in `_config.yml`](https://github.com/choldgraf/jupyter-book/blob/master/_config.yml). Values that are unique to the
textbook can be found under the `# Textbook settings` section. See the
[comments in that file](https://github.com/choldgraf/jupyter-book/blob/master/_config.yml) for information about what each field does.

You can modify things like where your interact links point (if you've set up your
own JupyterHub or BinderHub) or whether these links should use JupyterLab by default.

## Site CSS and Javascript

You can change the site's CSS rules to get the look and feel you desire, as well as add
any javascript that you wish. To do so, find the relevant folders in the `assets/` folder.

This site uses SCSS to make it easier to create modular and beautiful CSS rules. If you create
a new CSS file, make sure that you include it in `_sass/main.scss`.
