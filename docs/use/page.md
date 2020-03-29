# Build a standalone page

Sometimes you'd like to build a single page of content rather than an
entire book. For example, if you'd like to generate a web-friendly HTML
page from a Jupyter Notebook for a report or publication.

You can generate a standalone HTML file for a single page of Jupyter Book
content by running the following command:

```
jupyter-book page path/to/mybook.ipynb
```

This will execute your notebook and output the proper HTML in the
`_build/html` folder. Your page will be called `pagename.html`.
