# Create your own content file

Now that you've seen a few sample content files, and built a simple book, try creating your own!

## Create your file and add content to it

In the folder with all of your sample book contents, create a new file called `mymarkdownfile.md`. Put the following content in it:

```md
# Here's my sample title

This is some sample text.

(section-label)=
## Here's my first section

Here is a [reference to the intro](intro.md). Here is a reference to [](section-label).
```

We've added two new pieces of markdown syntax, both of them are related to **cross-references**.

- `(section-label)=` is a label that's attached to a section header. It refers to whatever header follows, and allows you to refer to this label later on in your text.
- `[link text](link-target)` syntax is how you specify a link in markdown. Here we've linked to another page, as well as to the label we created above.

When you build your book, you'll see how these links resolve in the output.

## Add it to your Table of Contents

Now that you've got a new file, we need to add it to your `_toc.yml` file so that Jupyter Book knows where it fits with your book's structure.
Add the a line to your `_toc.yml` file pointing to this new content, it should look something like this:

```yaml
# In _toc.yml
format: jb-book
root: intro
chapters:
- file: markdown
- file: notebooks
- file: markdown-notebooks
- file: mymarkdownfile
```

## Re-build your book

Now that you've added the file to your `_toc.yml` file, you can re-run the build command:

```console
$ jupyter-book build mybookname
```

This will re-build your book, and your new page will show up in the output.

````{tip}
If your book's Table of Contents doesn't update after changing the `_toc.yml` file, try:

```console
$ jupyter-book build --all mybookname
```
````
