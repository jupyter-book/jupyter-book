# Building and publishing your book

Once you've added content and configured your book, it's time to
build the raw material that Jekyll will use to turn your book into a website.
This entails converting each **page** of the book into HTML.

## Build each page's HTML

Now that you've got the files installed content is in the book, you can build
your book.

Build your book by running the following command:

```
jupyter-book build mybookname/
```

This will:

* Use the links specified in the `_data/toc.yml` file (pointing to files in `/content/`) and
  do the following:
  * Run `nbconvert` to turn the content files (e.g., `.ipynb`, `.md`, etc) files into HTML
  * Replace relative image file paths so that they work on your new built book
  * Place all these generated files in the `mybookname/_build/` directory.

Note that `jupyter-book` will automatically update any files in `_build/` that are older
than the timestamp of the corresponding file in your `content/` folder.

## Create an *online* repository for your book

You've created your book on your own computer, but you haven't yet added it
online. This section covers the steps to create your own GitHub repository,
and to add your book's content to it. In this case, we'll use GitHub-Pages
to build the HTML for your book. However, you can also build the book's HTML
manually. Both will be covered in [building and publishing your book](04_publish.html).

1. First, log-in to GitHub, then go to the "create a new repository" page:

   https://github.com/new

2. Next, add a name and description for your book. You can choose whatever
   initialization you'd like.

3. Now, clone the empty repository to your computer:

   ```bash
   git clone https://github.com/<my-org>/<my-book-name>
   ```

4. Copy all of your book files and folders (what was created when you ran `jupyter-book create mybook`)
   into the new repository. For example, if you created your book locally with `jupyter-book create mylocalbook`
   and your online repository is called `myonlinebook`, the command would be:

   ```bash
   cp -r mylocalbook/* myonlinebook/
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
