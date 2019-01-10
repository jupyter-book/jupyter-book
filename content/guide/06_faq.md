The following are some common issues and questions that have arisen when
building your textbook with Jekyll.

## How can I update my fork of the repository?

Sometimes this repository will get updates that you want to incorporate into
a pre-existing course. If you want to pull in new changes, take the following
steps:

1. Add this repository as a "remote" on your local git repo:

       git remote add template https://github.com/choldgraf/jupyter-book

2. Pull in the latest changes from the remote repository into your local `gh-pages` branch:

       git pull template master

3. Resolve any merge conflicts that may arise. Make sure that you don't over-write
   any important files (e.g. anything in your `content/` directory or in `_config.yml`)
4. **If there are lots of merge conflicts** you can try to "cherry pick" only the commit
   that you want to deploy to your textbook. `git` has a special command for this.
   First, go to the base repository for the textbook template and look up the "commits"
   page at the following URL:

   https://github.com/choldgraf/jupyter-book/commits/master

   Find the commit that you want to implement on *your* copy of the repository. Click the button with
   its hash (there's one on the right of each row). Finally, copy the long commit hash that's listed
   on the resulting page. This is a unique hash for this commit.

   Now, use `git cherry-pick` to make these changes to your repo:

       git cherry-pick <COMMIT-HASH>

6. **If you'd like to update a specific file with the latest version from `jupyter-book`**:

       git checkout template/master <path-to-file>

7. Push changes to your github repository once you're happy with the content:

       git push

## Which files do I need to update?

These sections help give you an idea for which files you should manually upgrade, vs. which you can automatically update
with the latest version from `jupyter-book`

These sections assume that the `jupyter-book` repository is added as a "remote" repository called `template` to your local copy.

### Files that you shouldn't need to change to upgrade

These are files you shouldn't need to update unless there is a major change to `jupyter-book`.

* `contents/` - these are files unique to your book, so you shouldn't need to change them.
* `_data/toc.yml` - the Table of Contents structure will not change unless there is a major version change in `jupyter-book`.
* `README.md` - is unique for your site.
* Any other folders/files that are unique to your book.

### Files that you might want to check

You can check the `diff` with the latest `jupyter-book` file with:

```
git diff master...template/master
```

* `_config.yml` - occasionally, there are new fields added to `jupyter-book`'s configuration file. You should
  check that the newer version of `jupyter-book` hasn't added or removed something.

### Files that you should force-update

You can grab the latest version of these files with:

```
git checkout template/master <path-to-file>
```

* `scripts/` - these are scripts for building and cleaning the book. You should just pull in the latest contents
  of this folder (unless you know what you're doing and have modified these scripts yourself).
* `Makefile` - the Makefile is tuned to whatever is inside `scripts/`. You should update it to the latest version
  as well.
* `assets` - these are assets used by jupyter-book. You should update to grab the newest ones, unless you have
  modified or added your own assets.
* `_sass` - the SASS defines the styling of the site. You should also just grab the latest version unless you know
  what you're doing.
* `_includes` and `_layouts`. These are template files, and should be auto-updated.
* `Gemfile` which lists the Ruby dependencies for the site.


## Why isn't my math showing up properly?

This site uses MathJax to render all math, with `$` denoting inline math,
and `$$` denoting multi-line math blocks. Make sure that all of your math
is wrapped in these characters.

Another tip is to make sure that your math isn't being escaped improperly.
Jekyll strips escape characters, so you should make sure to add **two**
escape characters when needed. This is done automatically for many escape
characters in `generate_book.py`, and if you notice something that should
be included in this script, please open an issue
[at the textbook template issues page](https://github.com/choldgraf/jupyter-book/issues)

## What if I have an issue or question?

If you've got questions, concerns, or suggestions, please open an issue at
[at the jupyter book issues page](https://github.com/choldgraf/jupyter-book/issues)
