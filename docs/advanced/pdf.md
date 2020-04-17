# PDFs for your book

It is possible to build a single PDF that contains all of your book's content. This
page describes a few ways to do so.

```{warning}
PDF building is experimental, and may change or have bugs.
```

## Build a PDF from your book HTML

It is also possible to build a single PDF from your book's HTML. This first
converts all of your book's content into a single HTML file, and then renders
it as a PDF by emulating a browser from the command-line.

```{warning}
This is an experimental feature, and may change in the future.
```

### Installing pyppeteer

If you wish to build a PDF from your book's HTML, you will need the `pyppeteer` package.
You can install it like so:

```
pip install pyppeteer
```

You may also need to install this bundle of packages below (on *nix systems):

```{literalinclude} ../../.github/workflows/pyppeteer_reqs.txt
```

```{margin}
In addition, if you get errors about libraries that don't exist, check out
[these install commands](https://circleci.com/orbs/registry/orb/threetreeslight/puppeteer)
to see if that fixes it. We warned you it was an experimental feature :-)
```

To build a single PDF from your book's HTML, use the following command:

```
jupyter-book build mybookname/ --build pdf_html
```

## Build a PDF using Latex

```{warning}
Not yet implemented, but coming soon...
```
