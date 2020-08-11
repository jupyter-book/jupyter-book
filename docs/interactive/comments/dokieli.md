# Dokieli

```{raw} html
<script src="https://dokie.li/scripts/dokieli.js"></script>
<link media="all" rel="stylesheet" type="text/css" href="https://dokie.li/media/css/dokieli.css" />
```

Dokieli is an open source comments and annotation engine that follows web standards and allows you to have full control over where your comments are aggregated and who has access.

Dokieli is activated on this page. You can see the web overlay by clicking on the hamburger menu in the upper-right corner of this page.

## Activate `dokie.li`

You can activate [`dokie.li`](https://dokie.li/)
by adding the following to your `conf.py` file:

```yaml
html:
  comments:
    dokieli: true
```

Next, [follow the `dokie.li` configuration instructions](https://dokie.li/).

When you build your documentation, pages will now have an active dokieli overlay.
