---
interact_link: content/features/search.ipynb
kernel_name: python3
title: 'Searching your book'
prev_page:
  url: /features/citations
  title: 'Citations and bibliographies'
next_page:
  url: /https://github.com/jupyter/jupyter-book
  title: 'GitHub repository'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---

# Searching your book

It's possible to enable search in your book so that users can find the content
they're looking for. This uses a nifty package called [lunr.js](https://github.com/olivernn/lunr.js/).

To add search to your book, simple add the following entry to `_data/toc.yml`.

```yaml
- title: Search (whatever title you like)
  search: true
```

The result will be a link in your Table of Contents that directs users to a search page.
For example, click the `Search` link in the TOC of this demo book.

## Customizing how much text is stored in search

The Jupyter-Book search works by storing excerpts of text from each page. This
ensures that the search process itself doesn't take too long. However, it also
means that *some* of your content will not be searched, because it is past the
cutoff point for the search cache.

To modify the number of words that are indexed in your search, modify the following
field in your `_config.yml` file:

```yaml
search_max_words_in_content : 100  # Number of words to be indexed per page
```

Be careful, if you have many pages, and you use lots of words per page, this can
become very slow!

