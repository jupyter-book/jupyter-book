---
title: Frequently Asked Questions (FAQ)
---

The following are some common issues and questions that have arisen when
building your textbook with Jekyll.

## Why isn't my math showing up properly?

This site uses MathJax to render all math, with `$` denoting inline math,
and `$$` denoting multi-line math blocks. Make sure that all of your math
is wrapped in these characters.

Another tip is to make sure that your math isn't being escaped improperly.
Jekyll strips escape characters, so you should make sure to add **two**
escape characters when needed. This is done automatically for many escape
characters in `generate_textbook.py`, and if you notice something that should
be included in this script, please open an issue
[at the textbook template issues page](https://github.com/choldgraf/textbook-jekyll-template/issues)

## What if I have an issue or question?

If you've got questions, concerns, or suggestions, please open an issue at
[at the textbook template issues page](https://github.com/choldgraf/textbook-jekyll-template/issues)

## I only want a textbook, not a course site

If you *only* want an online build of the textbook, and no course site around
it (e.g. a navbar), then in your `_config.yml` file, set `textbook_only` to
"`true`". This will redirect your home page (`/`) to the first page of the
textbook.

 
