# The Data 8 Jekyll textbook

This repository holds a Jekyll-based version of the Data 8 textbook.

All textbook content is primarily stored in Jupyter notebooks in the `notebooks/` folder.
This can be converted to Jekyll-ready markdown and served on github pages. Here
are steps to get started:

1. **Install the proper dependencies**. You can do this by installing the
   Anaconda environment specified in `environment.yml`:

       conda env create -f environment.yml

2. Once this is finished, activate the environment

       conda activate textbook

3. Ensure that a `SUMMARY.md` file exists in the root of the repository. This contains
   a markdown list of bullet points and links. Each item corresponds to a chapter in the
   textbook, and is used to build the table of contents in the sidebar.

   If you **do not** have a `SUMMARY.md` file made for this textbook, you may create one
   by hand, or generate one from the folders/files in `notebooks/` by running the following
   script:

       python scripts/generate_summary_from_folders.py

3. Build the textbook with the following command:

       python scripts/generate_textbook.py

This will:

* Run `nbconvert` to turn the `.ipynb` files into markdown
* Replace relative image file paths with a `{{ site.baseurl }}` base for Jekyll
* Clean up formatting issues for displaying properly
* Generate the yaml for the site sidebar automatically

You can the push the changes to GitHub, which will automatically build a Jekyll site with
your newly-created Markdown files.

**To preview your built site** using Jekyll on your computer, take the following steps:

1. Ensure that Jekyll and Ruby are installed. [See the Jekyll docs](https://jekyllrb.com/docs/installation/) for information on this.
   As well as the [GitHub gh-pages documentation](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/)
   for more information on how Jekyll and GitHub interact.
2. Ensure that your notebooks have been converted to markdown:

       python scripts/generate_textbook.py

3. Run the Jekyll site preview command:

       bundle exec jekyll serve

This should open up a port on your computer with a live version of the textbook.

## Relevant files

### Course materials

* `notebooks/` contains all course content in Jupyter notebook form
* `data/` contains the CSV data files used in the course textbook
* `images/` contains images referenced in the course
* `SUMMARY.md` contains a markdown list of chapters / paths to your textbook files. For
  example, here is a sample from the Data 8 textbook:

  ```
  * [1. Data Science](notebooks/01/what-is-data-science.md)
    * [1.1 Introduction](notebooks/01/1/intro.md)
      * [1.1.1 Computational Tools](notebooks/01/1/1/computational-tools.md)
    * [1.2 Why Data Science?](notebooks/01/2/why-data-science.md)
  * [2. Causality and Experiments](notebooks/02/causality-and-experiments.md)
    * [2.1 John Snow and the Broad Street Pump](notebooks/02/1/observation-and-visualization-john-snow-and-the-broad-street-pump.md)
    * [2.2 Snow’s “Grand Experiment”](notebooks/02/2/snow-s-grand-experiment.md)
   ```
### Auto-generated folders and files
* `images/textbook` contains images *generated* during the notebook conversion
* `_textbook/` contain notebooks converted to markdown
* `_site/` contains the HTML for the built site. It is created by Jekyll, and should only exist if you build the site locally

### Repository configuration and build files
* `_config.yml` contains all site configuration.
* `_data/navigation.yml` contains site navigation as well as auto-generated sidebar yaml
* `scripts/` contains scripts to generate the textbook from the Jupyter notebooks
* `assets/css` contains CSS for the textbook and website
* `environment.yml` contains the environment needed to build the textbook
