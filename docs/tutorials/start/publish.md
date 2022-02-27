# Publish your book online

Once you've built the HTML for your book, you can host it online.
The best way to do this is with a service that hosts **static websites**
(because that's what you have just created with Jupyter Book).
In this tutorial, we'll cover how to publish your book online with GitHub Pages, a popular and free online hosting platform.

(publish/online-repo)=
## Create an online repository for your book

In order to connect your hosted book with your book's source content, you should put your book's source content in a public repository. This section describes one approach to create your own GitHub repository and add your book's content to it.

1. First, log in to GitHub, then go to the "create a new repository" page: <https://github.com/new>

2. Next, give your online repository a name and a description. Make your repository public and do not initialize it with a README file, then click "Create repository".

3. Now, clone the (currently empty) online repository to a location on your local computer. You can do this via the command line with:

   ```bash
   git clone https://github.com/<my-org>/<my-repository-name>
   ```

4. Copy all of your book files and folders into this newly cloned repository. For example, if you created your book locally with `jupyter-book create mylocalbook` and your new repository is called `myonlinebook`, you could do this via the command line with:

   ```bash
   cp -r mylocalbook/* myonlinebook/
   ```

5. Now you need to sync your local and remote (i.e., online) repositories. You can do this with the following commands:

   ```bash
   cd myonlinebook
   git add ./*
   git commit -m "adding my first book!"
   git push
   ```

## Publish your book online with GitHub Pages

We have just pushed the *source files* for our book into our GitHub repository.
This makes it publicly accessible for you or others to see.

Next, we'll publish the *build artifact* of our book online, so that it is rendered as a website.


The easiest way to use GitHub Pages with your built HTML is to use the [`ghp-import`](https://github.com/davisp/ghp-import) package. `ghp-import` is a lightweight Python package that makes it easy to push HTML content to a GitHub repository.

`ghp-import` works by copying *all* of the contents of your built book (i.e., the `_build/html` folder) to a branch of your repository called `gh-pages`, and pushes it to GitHub. The `gh-pages` branch will be created and populated automatically for you by `ghp-import`. To use `ghp-import` to host your book online with GitHub Pages follow the steps below:

```{note}
Before performing the below steps, ensure that HTML has been built for each page of your book
(see {doc}`the previous section <../start/build>`). There should be a collection of HTML
files in your book's `_build/html` folder.
```

1. Install `ghp-import`

   ```bash
   pip install ghp-import
   ```
2. Update the settings for your GitHub pages site:

    a. Use the `gh-pages` branch to host your website.

    b. Choose root directory `/` if you're building the book in it's own repository.
       Choose `/docs` directory if you're building documentation with jupyter-book.

3. From the `main` branch of your book's root directory (which should contain the `_build/html` folder) call `ghp-import` and point it to your HTML files, like so:

   ```bash
   ghp-import -n -p -f _build/html
   ```

```{warning}
Make sure that you included the `-n` - this tells GitHub *not* to build your book with
[Jekyll](https://jekyllrb.com/), which we don't want because our HTML is already built!
If you do not do this you may see **404 not found** for your deployed content.
```

Typically after a few minutes your site should be viewable online at a url such as: `https://<user>.github.io/<myonlinebook>/`. If not, check your repository settings under **Options** -> **GitHub Pages** to ensure that the `gh-pages` branch is configured as the build source for GitHub Pages and/or to find the url address GitHub is building for you.

To update your online book, make changes to your book's content on the `main` branch of your repository, re-build your book with `jupyter-book build mybookname/` and then use `ghp-import -n -p -f mylocalbook/_build/html` as before to push the newly built HTML to the `gh-pages` branch.

```{warning}
Note this warning from the [`ghp-import` GitHub repository](https://github.com/davisp/ghp-import):

"...*`ghp-import` will DESTROY your gh-pages branch... and assumes that the `gh-pages` branch is 100% derivative. You should never edit files in your `gh-pages` branch by hand if you're using this script...*"
```
