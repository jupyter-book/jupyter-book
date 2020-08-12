# Hypothes.is

```{raw} html
<script async="async" src="https://hypothes.is/embed.js"></script>
```

[hypothes.is](https://hypothes.is/) is a centralized web service that allows you to comment and annotate arbitrary web pages across the web. It allows your readers to log-in and comment on your book.

```{note}
Hypothesis is activated on this page. You can see the web overlay by clicking on the `<` button in the upper-right corner of this page.
```

## Activate `hypothes.is`

You can activate `hypothes.is` by adding the following to your `conf.py` file:

```python
html:
  comments:
    hypothesis: true
```

This will add a [hypothes.is overlay](https://web.hypothes.is/) to your documentation. This extension simply activates the hypothes.is javascript bundle on your Sphinx site.

When you build your documentation, you will see the hypothes.is overlay to the right of your screen.
