# Publishing your book online

Now that you've built the HTML for your book, it's time to host it online.
The best way to do this is with a service that hosts **static websites**
(because that's what you have just created with Jupyter Book).

There are many options for doing this, and the next sections cover some of the
more popular ones.

```{note}
Ensure that your the HTML has been built for each page of your book
(see [the previous section](03_build)). There should be a collection of HTML
files in your book's `_build/html` folder.
```

## Create an *online* repository for your book

Regardless of the approach you use for publishing your book online, it will require
you to host your book's content in a GitHub repository.

This section covers the steps to create your own GitHub repository,
and to add your book's content to it.

1. First, log-in to GitHub, then go to the "create a new repository" page:

   https://github.com/new

2. Next, add a name and description for your book. You can choose whatever
   initialization you'd like.

3. Now, clone the empty repository to your computer:

   ```bash
   git clone https://github.com/<my-org>/<my-book-name>
   ```

4. Copy all of your book files and folders (what was created when you ran `jb build mybook`)
   into the new repository. For example, if you created your book locally with `jb create mylocalbook`
   and your online repository is called `myonlinebook`, the command would be:

   ```bash
   cp -r mylocalbook/_build/html/* myonlinebook/
   ```

   This will copy over the local book files into the online book folder.

5. Commit the new files to the repository in `myonlinebook/`:

   ```bash
   cd myonlinebook
   git add ./*
   git commit -m "adding my first book!"
   git push
   ```

That's it!

Now that your repository is created and you have your book content pushed to it,
it's time to publish your book online. The next sections cover how to do this.

## Host with `github-pages`

Since your content is already on GitHub, you can easily host it as a `github-pages`
website. This is a service where GitHub hosts your static files as if they were
a standalone website.

The easiest way to use GitHub-pages with your built HTML is to use the `ghp-import`
tool. It is a lightweight Python package that makes it easier to push HTML content
to a GitHub repository.

Follow these steps to use it:

1. Install `ghp-import`

   ```
   pip install ghp-import
   ```
2. Call `ghp-import` and point it to your HTML files, like so:
   
   ```
   ghp-import -n -p -f mylocalbook/_build/html
   ```
   
This will cause `ghp-import` to push *all* of the contents of the `_build/html` folder
to the `gh-pages` branch of your current repository, and push the contents to GitHub.
By default, this generally means your site should now be viewable online.

```{warning}
Make sure that you included the `-n` - this tells GitHub *not* to build your book with
Jekyll, which we don't want because our HTML is already built!
```
