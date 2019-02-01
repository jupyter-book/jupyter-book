# Create your Jupyter Book

This page covers how to create a Jupyter Book with your own content.
You've got three primary ways to create your Jupyter Book.

## by modifying the Demo Book

If you'd like, you can simply modify the files created by running

```
jupyter-book create mybookname --demo
```

See the previous section for a description of all of the relevant files you
should modify for your book.

## by answering questions at the command line

If you'd like to create a book from your own content using the CLI, run the
following command:

```
jupyter-book create mybookname
```

This will give you several prompts that will help fill in information about your book.
You'll need to specify the **location of your book's content**, and optionally you
can **generate a Table of Contents from your book's content**.

This will create a new book using your content in `mybookname/`. You'll then need to go in
and ensure that `mybookname/_data/toc.yml` as well as `mybookname/_config.yml` look correct.

## by using a pre-existing book configuration

If you've used Jupyter Book before, you can quickly generate a *new* book using a pre-existing
set of folders and files. These are all available as arguments in the command line interface.

For example, if you have your book's content in a folder structure like this:

```
myoldbook/
├── content
│   ├── root_test.md
│   └── tests
├── _data
│   └── toc.yml
├── images
│   └── tests
├── mylicense.md
└── config.yml
```

You can generate a Jupyter Book from it with the following command:


```
jupyter-book create mybookname --content-folder myoldbook/content \
                              --toc myoldbook/_data/toc.yml \
                              --config myoldbook/_config.yml \
                              --license myoldbook/mylicense.md
```

This will create a new Jupyter Book using these files. In this case, you need to ensure
that the values in `_config.yml` are correct, and that the Table of Contents (`toc.yml`) file
has the structure that you want.
