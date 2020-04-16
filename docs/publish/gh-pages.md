# Publish with GitHub Pages

Since your content is already on GitHub, you can easily host it as a `github-pages`
website. This is a service where GitHub hosts your static files as if they were
a standalone website.

The easiest way to use GitHub-pages with your built HTML is to use the `ghp-import`
tool. It is a lightweight Python package that makes it easier to push HTML content
to a GitHub repository.

Follow these steps to use it:

1. Install `ghp-import`

   ```
   pip install ghp-import
   ```
2. Call `ghp-import` and point it to your HTML files, like so:

   ```
   ghp-import -n -p -f mylocalbook/_build/html
   ```

This will cause `ghp-import` to push *all* of the contents of the `_build/html` folder
to the `gh-pages` branch of your current repository, and push the contents to GitHub.
By default, this generally means your site should now be viewable online.

```{warning}
Make sure that you included the `-n` - this tells GitHub *not* to build your book with
Jekyll, which we don't want because our HTML is already built!
```
