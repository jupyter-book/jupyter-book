# Publish your book online

Once you've built the HTML for your book, you can host it online.
The best way to do this is with a service that hosts **static websites**
(because that's what you have just created with Jupyter Book). There are many options for doing this, and these sections cover some of the
more popular ones.

(publish/online-repo)=
## Create an online repository for your book

Regardless of the approach you use for publishing your book online, it will require
you to host your book's content in an online repository such as GitHub. This section describes one approach you can use to create your own GitHub repository and add your book's content to it.

1. First, log-in to GitHub, then go to the "create a new repository" page:<https://github.com/new>

2. Next, give your online repository a name and a description. Make your repository public and do not initialize with a README file, then click "Create repository".

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

Follow the steps in the next sections to learn how to host your book online with various
online hosting services.
