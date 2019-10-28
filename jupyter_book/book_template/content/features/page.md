# Building a single page instead of a book

Sometimes you'd like to build a single page of content rather than an
entire book. For example, if you'd like to generate a web-friendly HTML
page from a Jupyter Notebook for a report or publication.

You can generate a standalone HTML file for a single page of Jupyter Book
content by running the following command:

```
jupyter-book page path/to/mybook.ipynb
```

This will do the following:

1. Convert your page to HTML
2. Add the Jupyter Book CSS and Javascript to the header of
   that HTML.
3. Write the result to disk

The page's HTML will be missing a few Jupyter Book features, such as
a Table of Contents, however the layout and style will largely be the
same. [Here is an example of what this looks like](/notebooks.html).
