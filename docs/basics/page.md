(publish:page)=
# Build a single page

Sometimes you'd like to build a single page of content rather than an entire book.
For example, if you'd like to generate a web-friendly HTML page from a Jupyter notebook for a report or publication.

You can generate a standalone HTML file for a single page of the Jupyter Book using the same command:

```bash
jupyter-book build path/to/mypage.ipynb
```

This will execute your content and output the proper HTML in a `_build/_page/html/<mypage>` folder.
If the file is in a subdirectory relative to the `_build` folder, the HTML will be in a `_build/_page/html/<subdirectory-mypage>` folder.

Your page will be called `mypage.html`.
This will work for any [content source file](../file-types/index.md) that is supported by Jupyter Book.

:::{note}
Users should note that building **single pages** in the context of a larger project can trigger warnings and incomplete links.
For example, building `docs/start/overview.md` will issue a number of `unknown document`, `term not in glossary`, and `undefined links` warnings.
:::
