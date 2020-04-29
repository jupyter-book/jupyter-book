# Publish your book online

Once you've built the HTML for your book, it's time to host it online.
The best way to do this is with a service that hosts **static websites**
(because that's what you have just created with Jupyter Book).

There are many options for doing this, and these sections cover some of the
more popular ones.

(publish/online-repo)=
## Create an *online* repository for your book

Regardless of the approach you use for publishing your book online, it will require
you to host your book's content in a GitHub repository.

This section covers the steps to create your own GitHub repository,
and to add your book's content to it.

1. First, log-in to GitHub, then go to the "create a new repository" page:

   <https://github.com/new>

2. Next, add a name and description for your book. You can choose whatever
   initialization you'd like.

3. Now, clone the empty repository to your computer:

   ```bash
   git clone https://github.com/<my-org>/<my-book-name>
   ```

4. Copy all of your book files and folders (what was created when you ran `jupyter-book build mybook`)
   into the new repository. For example, if you created your book locally with `jupyter-book create mylocalbook`
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

Follow the steps in the next sections for how to host your book online with various
online hosting services.
