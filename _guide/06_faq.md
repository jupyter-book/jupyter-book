---
title: Frequently Asked Questions (FAQ)
---

The following are some common issues and questions that have arisen when
building your textbook with Jekyll.

## How can I update my fork of the repository?

Sometimes this repository will get updates that you want to incorporate into
a pre-existing course. If you want to pull in new changes, take the following
steps:

1. Add this repository as a "remote" on your local git repo:

       git remote add upstream https://github.com/choldgraf/textbook-jekyll-template

2. Pull in the latest changes from the remote repository into your local `gh-pages` branch:

       git pull upstream master

3. Resolve any merge conflicts that may arise. Make sure that you don't over-write
   any important files (e.g. anything in your `notebooks/` directory or in `_config.yml`)
4. **If there are lots of merge conflicts** you can try to "cherry pick" only the commit
   that you want to deploy to your textbook. `git` has a special command for this.
   First, go to the base repository for the textbook template and look up the "commits"
   page at the following URL:

   https://github.com/choldgraf/textbook-jekyll-template/commits/master

   Find the commit that you want to implement on *your* copy of the repository. Click the button with
   its hash (there's one on the right of each row). Finally, copy the long commit hash that's listed
   on the resulting page. This is a unique hash for this commit.

   Now, use `git cherry-pick` to make these changes to your repo:

       git cherry-pick <COMMIT-HASH>

5. Push changes to your github repository once you're happy with the content:

       git push

## Why isn't my math showing up properly?

This site uses MathJax to render all math, with `$` denoting inline math,
and `$$` denoting multi-line math blocks. Make sure that all of your math
is wrapped in these characters.

Another tip is to make sure that your math isn't being escaped improperly.
Jekyll strips escape characters, so you should make sure to add **two**
escape characters when needed. This is done automatically for many escape
characters in `generate_textbook.py` (called by `make textbook`), and if you notice something that should
be included in this script, please open an issue
[at the textbook template issues page](https://github.com/choldgraf/textbook-jekyll-template/issues)

## What if I have an issue or question?

If you've got questions, concerns, or suggestions, please open an issue at
[at the textbook template issues page](https://github.com/choldgraf/textbook-jekyll-template/issues)

## I only want a textbook, not a course site

If you *only* want an online build of the textbook, and no course site around
it (e.g. a navbar), then in your `_config.yml` file, set `textbook_only` to
"`true`". This will redirect your home page (`/`) to the first page of the
textbook.
