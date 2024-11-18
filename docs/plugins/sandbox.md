# Use the MyST Sandbox to identify card AST structure

The [MyST interactive sandbox](https://mystmd.org/sandbox) is a great way to explore what MyST looks like when it is rendered, and what its underlying AST structure looks like.

This is particularly useful if you're generating MyST AST from scratch. For example, as part of a [plugin role or directive](../tutorial/plugins.md).

For example, here's a video that shows how to use the MyST sandbox to explore the structure of a `{card}` directive.

```{figure} media/sandbox-demo.mp4
Using [the MyST sandbox](https://mystmd.org/sandbox) to preview and show the AST of the `{card}` directive.
```

:::{note} Click here to see the full output of the MyST sandbox
:class: dropdown
{
  "type": "root",
  "children": [
    {
      "type": "block",
      "children": [
        {
          "type": "card",
          "children": [
            {
              "type": "cardTitle",
              "children": [
                {
                  "type": "text",
                  "value": "My title"
                }
              ]
            },
            {
              "type": "paragraph",
              "children": [
                {
                  "type": "text",
                  "value": "My card body."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
:::
