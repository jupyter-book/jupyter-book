# Announcement banners

You can provide text that is shown in an "announcement" banner.
The banner will disappear once the user scrolls down, but is styled with contrastive colors to be more noticeable.
This can be used to draw attention to certain messages but in a way that doesn't distract from reading as the person scrolls down.

To add an announcement message to your documentation, use the following configuration in `_config.yml`:

```yaml
html:
    announcement: "My announcement!"
```

The value of `announcement` will be inserted in the top of your page.
This can take arbitrary HTML, for example:

```yaml
html:
    announcement: "<p class='mystyle'>Some custom HTML!</p>"
```
