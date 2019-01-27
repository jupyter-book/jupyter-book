The following are some common issues and questions that have arisen when
building your textbook with Jekyll.

## How can I update my book?

Sometimes Jupyter Book will get updates that you want to incorporate into
a book you've already built. The easiest way to do this is to checkout the latest
versions of the relevant files from the [Jupyter Book repository](https://github.com/jupyter/jupyter-book),
make sure that you haven't overwritten anything important in your site, and then commit them.

To pull in new changes, take the following steps:

1. Add [Jupyter Book repository](https://github.com/jupyter/jupyter-book) as a "remote" on your local git repo:

   ```bash
   git remote add template https://github.com/jupyter/jupyter-book
   ```

2. Check out the latest versions of relevant files from the template. Here's the command to do this for one file.

   ```bash
   git checkout template/master path/to/myfile.css
   ```

   See the section below for which files you should focus on.

3. Check the diff between your newly-checked-out file and its previous version, to make sure that
   you haven't overwritten any changes that you've made.

   This is especially important for configuration files like `_config.yml`.

4. Demo your book, then push changes to your github repository once you're happy:

   ```bash
   git push
   ```

## Which files do I need to update?

These sections help give you an idea for which files you should manually upgrade, vs. which you can automatically update
with the latest version from `jupyter-book`

These sections assume that the `jupyter-book` repository is added as a "remote" repository called `template` to your local copy.

### Files that you should force-update

These are files that you can probably just upgrade directly, you probably haven't changed their
contents for your site.

* `scripts/` - these are scripts for building and cleaning the book. You should just pull in the latest contents
  of this folder (unless you know what you're doing and have modified these scripts yourself).
* `Makefile` - the Makefile is tuned to whatever is inside `scripts/`. You should update it to the latest version
  as well.
* `assets/` - these are assets used by jupyter-book. You should update to grab the newest ones, unless you have
  modified or added your own assets.
* `_sass/` - the SASS defines the styling of the site. You should also just grab the latest version unless you know
  what you're doing.
* `_includes/` and `_layouts/`. These are template files, and should be auto-updated.
* `Gemfile` which lists the Ruby dependencies for the site.

### Files that you might want to check

You can check the `diff` with the latest `jupyter-book` file with:

```
git diff master...template/master
```

* `_config.yml` - occasionally, there are new fields added to `jupyter-book`'s configuration file. You should
  check that the newer version of `jupyter-book` hasn't added or removed something.

Here is the code needed to add jupyter book as a remote

```bash
git remote add template https://github.com/jupyter/jupyter-book
```

and to check out the latest version of the above files:

```bash
git fetch template master
git checkout template/master scripts/ Makefile assets/ _sass/ _includes/ _layouts/ Gemfile _config.yml
```

Don't forget to check the diff to make sure that you're not overwriting your own changes!

### Files that you shouldn't need to change to upgrade

These are files you shouldn't need to update unless there is a major change to `jupyter-book`.

* `contents/` - these are files unique to your book, so you shouldn't need to change them.
* `_data/toc.yml` - the Table of Contents structure will not change unless there is a major version change in `jupyter-book`.
* Any other folders/files that are unique to your book.


## Why isn't my math showing up properly?

This site uses MathJax to render all math, with `$` denoting inline math,
and `$$` denoting multi-line math blocks. Make sure that all of your math
is wrapped in these characters.

Another tip is to make sure that your math isn't being escaped improperly.
Jekyll strips escape characters, so you should make sure to add **two**
escape characters when needed. This is done automatically for many escape
characters in `generate_book.py`, and if you notice something that should
be included in this script, please open an issue
[at the textbook template issues page](https://github.com/jupyter/jupyter-book/issues)

## What if I have an issue or question?

If you've got questions, concerns, or suggestions, please open an issue at
[at the jupyter book issues page](https://github.com/jupyter/jupyter-book/issues)
