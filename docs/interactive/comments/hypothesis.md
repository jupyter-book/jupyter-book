# Hypothes.is

```{raw} html
<script async="async" src="https://hypothes.is/embed.js"></script>
```

Hypothesis is a centralized web services that allows you to comment and annotate arbitrary web pages across the web.

Hypothesis is activated on this page. You can see the web overlay by clicking on the `<` button in the upper-right corner of this page.

## Activate `hypothes.is`

You can activate `hypothes.is` by adding the following to your `conf.py` file:

```python
html:
  comments:
    hypothesis: true
```

This will add a [hypothes.is overlay](https://web.hypothes.is/) to your documentation. This extension simply activates the hypothes.is javascript bundle on your Sphinx site. This will cause the hypothes.is overlay to be shown, allowing your readers to log-in and comment on your documentation if they have questions.

When you build your documentation, you will see the hypothes.is overlay to the right of your screen.
