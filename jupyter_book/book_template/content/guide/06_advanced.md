# Advanced topics and how-tos

This page contains more advanced and complete information about the
[`jupyter-book` repository](https://github.com/jupyter/jupyter-book). See the sections below.


## Enable Google Analytics

If you have a Google Account, you can use Google Analytics to collect some
information on the traffic to your Jupyter Book. With this tool, you can find
out how many people are using your book, where they come from and how they
access it, wether they are using the Desktop or the mobile version etc.

To add Google Analytics to your Jupyter Book, navigate to
[Google Analytics](https://analytics.google.com/analytics/web/), create a new
Google Analytics account and add the url of your Jupyter Book to a new
*property*. Once you have set everything up, your Google Analytics property
will have a so-called Tracking-ID, that typically starts with the letters UA.
All that you need to do is to copy this ID and paste it into your
configuration file:

```yaml
google_analytics:
  mytrackingcode: UA-XXXXXXXXX-X
```

## Retain custom YAML front-matter in your files

Jupyter book will check your files for YAML front-matter and will **append**
any newly-generated YAML to the built files for the page. This means you
can provide your own custom YAML to files (which may be useful if you'd like
to modify this book's HTML).

Be careful not to add YAML with the same key names as the auto-generated YAML, as
this will create duplicated keys in your page's front-matter.


## Deploying a JupyterHub

If you wish, you may deploy a JupyterHub alongside your textbook. This way, for pages that are built from
Jupyter Notebooks, students can click the "interact" links
at the top of each page and be taken to a live Jupyter Notebook running on your JupyterHub.

The easiest way to set up a JupyterHub is to follow [The Littlest JupyterHub guide](https://the-littlest-jupyterhub.readthedocs.io/en/latest/index.html).
This is a straightforward deployment of JupyterHub on a single VM, and is suitable for
courses / workshops of less than 50-60 students.

Once you have your JupyterHub set up, you can use the [nbgitpuller](https://github.com/data-8/nbgitpuller)
package to send links to course material to your students, or use the interact links that Textbooks for Jupyter
automatically inserts into your course material.

## Auto-generating a TOC file for your book

Sometimes it can be a pain to create the Table of Contents YAML file by hand.
Jupyter Book has a convenience function to automatically create this file
using the alpha-numeric sorting of the file/folder names in your content folder.
To use it, simply use the following command:

```bash
jupyter-book toc path/to/mybook
```

This put all `.md` and `.ipynb` files in the root of the **content folder**
as top-level pages. For any files that are in folders, it will create one
section per **top-level folder** and place all content files inside that
section.

By default, running this command will print the TOC YAML to the screen.
If you'd like to overwrite your `_data/toc.yml` file with the result of
running this command, you can use the `--path-output` argument like so

```bash
jupyter-book toc path/to/mybook --path-output path/to/mybook/_data/toc.yml
```

This will overwrite the contents of `toc.yml` with the new TOC.

> Note: this will make some assumptions about how you'd like your book to
> be structured. We recommend using this command as a starting point, and
> then customizing your TOC how you'd like.


## Adding tags to notebook cells based on their content

Sometimes you'd like to quickly scan through a notebook's cells in order to
add tags based on the content of the cell. For example, you might want to
hide any cell with an import statement in it using the `remove_input` tag.

Here's a short Python snippet to accomplish something close to this.
First change directories into the root of your book folder, and then
run the script below as a Python script or within a Jupyter Notebook
(modifying as necessary for your use case).
Finally, check the changes that will be made and commit them to your repository.

```python
import nbformat as nbf
from glob import glob

# Collect a list of all notebooks in the content folder
notebooks = glob("./content/**/*.ipynb", recursive=True)

# Text to look for in adding tags
text_search_dict = {
    "# HIDDEN": "remove_cell",  # Remove the whole cell
    "# NO CODE": "remove_input",  # Remove only the input
    "# HIDE CODE": "hide_input"  # Hide the input w/ a button to show
}

# Search through each notebook and look for th text, add a tag if necessary
for ipath in notebooks:
    ntbk = nbf.read(ipath, nbf.NO_CONVERT)

    for cell in ntbk.cells:
        cell_tags = cell.get('metadata', {}).get('tags', [])
        for key, val in text_search_dict.items():
            if key in cell['source']:
                if val not in cell_tags:
                    cell_tags.append(val)
        if len(cell_tags) > 0:
            cell['metadata']['tags'] = cell_tags

    nbf.write(ntbk, ipath)
```

## Customizing your `toc.yml` file

The `toc.yml` file is used to control the chapter order etc of your book.
There are a few extra features you can use to trigger certain kinds of behavior.
This section explains the possible structure of this file so you can customize it
as you like.

### The structure of a single page

Below is all of the possible fields in the entry of a single page in `toc.yml`:

```yaml
- title: mytitle   # Title of chapter or section
  url: /myurl  # URL of section relative to the /content/ folder.
  not_numbered: true  # if the section shouldn't have a number in the sidebar
    (e.g. Introduction or appendices) (default: true)
  expand_sections: true  # if you'd like the sections of this chapter to always
    be expanded in the sidebar. (default: true)
  sections:  # Contains an optional list of more entries that make up the chapter's sections
```

### Adding an external link in your TOC

To add an external link in your TOC, simply make the url point to a fully-resolved
URL and add the `external: true` field. Here's an example:

```yaml
- title: Jupyter Homepage   # Title of chapter or section
  url: https://jupyter.org  # URL of external site
  external: true
```

### Extra TOC entries

These are special entries that will trigger different behavior if they are
in the `toc.yml` file:

```yaml
- search: true  # Will provide a link to a search page
- divider: true  # Will insert a divider in the sidebar
- header: My Header  # Will insert a header with no link in the sidebar
```

## Automatically build your book HTML with CI/CD

If you're comfortable with continuous integration services like CircleCI, you can set up
a build job to build your book's HTML automatically and push them to an online repository
(such as a `gh-pages` branch). This is a fairly advanced topic, but for some guidance,
check out these resources:

* **[This blog post on pushing changes from a CircleCI Job](https://predictablynoisy.com/circleci-mirror)**
  covers how you can give CircleCI permissions to push to a branch from within a job.
* **[The Jupyter Book CircleCI configuration file](https://github.com/jupyter/jupyter-book/blob/master/.circleci/config.yml)**
  automatically deploys changes to the `jupyter-book` master branch to the live book. In
  particular, [this section builds the book HTML files](https://github.com/jupyter/jupyter-book/blob/master/.circleci/config.yml#L74)
  while [this section builds the HTML and pushes them to a `gh-pages` branch](https://github.com/jupyter/jupyter-book/blob/master/.circleci/config.yml#L31).

This process can be tricky to set up initially, but is quite useful in ensuring that your live book
always stays up-to-date.
