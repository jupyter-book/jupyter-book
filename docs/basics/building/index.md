# Build and publish outputs

These sections cover aspects of **building and publishing your book** - that is, generating output artifacts using your book pages.

You can generate a variety of build outputs, such as **HTML outputs** and **PDF** outputs via either Latex or HTML.
These outputs can be published and shared with others in a variety of ways, which we describe in this section as well.

```{tableofcontents}
```

## Generate a badge for your book

You can generate a badge like this so that others know your repository and content files are built for Jupyter Book.
Here's what the badge looks like (only visible on HTML):

:::{only} html
[![Jupyter Book Badge](../../images/badge.svg)](https://jupyterbook.org)
:::

To generate the badge, copy the code block below, and replace `<YOUR URL HERE>` with the URL of your choice.

```
[![Jupyter Book Badge](https://jupyterbook.org/badge.svg)](<YOUR URL HERE>)
```

Additionally, you can generate a badge directly from [shields.io](https://shields.io).
Here's the URL to auto-generate the badge above, using a base64-encoded version of the Jupyter Book logo.
Feel free to modify this as you wish!

:::{admonition} Shields.io badge link
:class: seealso
https://img.shields.io/badge/jupyter-book-orange?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAZCAMAAAAVHr4VAAAAXVBMVEX////v7+/zdybv7+/zdybv7+/zdybv7+/zdybv7+/zdybv7+/zdybv7+/zdybv7+/zdybv7+/zdybv7+/v7+/zdybv7+/zdybv7+/v7+/zdybv7+/zdybv7+/zdyaSmqV2AAAAHXRSTlMAEBAgIDAwQEBQUGBgcHCAgJCQoLCwwMDQ4ODw8MDkUIUAAADJSURBVHjaddAFkgNBCAXQP+7uAvc/5tLFVseYF8crUB0560r/5gwvjYYm8gq8QJoyIJNwlnUH0WEnART6YSezV6c5tjOTaoKdfGXtnclFlEBEXVd8JzG4pa/LDql9Jff/ZCC/h2zSqF5bzf4vqkgNwEzeClUd8uMadLE6OnhBFsES5niQh2BOYUqZsfGdmrmbN+TMvPROHUOkde8sEs6Bnr0tDDf2Roj6fmVfubuGyttejCeLc+xFm+NLuLnJeFAyl3gS932MF/wBoukfUcwI05kAAAAASUVORK5CYII=
:::
