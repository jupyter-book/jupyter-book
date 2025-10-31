---
title: Generate MyST AST with Plugins
---

A common usecase with plugins involves generating MyST AST and inserting it into the document.
This page covers a few ways that you can do so.

(plugins:ctx)=

## Parse MyST markdown to AST in a directive or role

The easiest way to generate MyST AST in a plugin is by using the `parseMyst` function in the `ctx` variable. It may be easier to parse MyST Markdown into AST nodes rather than [using the MyST sandbox](https://mystmd.org/sandbox) to preview them.

Here's an example of using the `parseMyst` function within a directive plugin to parse the _argument_ of the directive into MyST AST:

```{code} javascript
:filename: src/myplugin.mjs
const myDirective = {
  name: "mydirective",
  doc: "My new directive!",
  arg: { type: String, doc: "To be parsed into MyST AST." },
  run(data, vfile, ctx) {
    const ast = ctx.parseMyst(data.arg);
    return ast.children[0];
  },
};
```

`ctx.parseMyst` returns a `root` node, which contains the parsed MyST.
This function takes the first child of the root node, which is usually better for inserting into the document.

You can also use this to manually construct MyST outputs using the arguments of your directive as data. For example:

```{code} javascript
:filename: src/justacard.mjs
const myDirective = {
  name: "justacard",
  doc: "Basically does what a card directive does!",
  arg: { type: String, doc: "To be parsed into MyST AST." },
  body: { type: String, doc: "The body of the directive." },
  run(data, vfile, ctx) {
    const ast = ctx.parseMyst(`:::{card} ${data.arg}\n${data.body}\n:::`);
    return ast.children[0];
  },
};
```

:::{tip} If you need to use multi-line strings you must dedent them
The example above puts a multi-line string onto one line by manually coding the `\n` characters.
If you instead want to show a multi-line string in your code, you will need to remove the indentation manually, for example like the following:

```{code} javascript
:filename: src/justacard.mjs
const myDirective = {
  name: "justacard",
  doc: "Basically does what a card directive does!",
  arg: { type: String, doc: "To be parsed into MyST AST." },
  body: { type: String, doc: "The body of the directive." },
  run(data, vfile, ctx) {
    const ast = ctx.parseMyst(`
:::{card} ${data.arg}
${data.body}
::: `);
    return ast.children[0];
  },
};
```

:::

## Use the MyST Sandbox to identify card AST structure

The [MyST interactive sandbox](https://mystmd.org/sandbox) is a great way to explore what MyST looks like when it is rendered, and what its underlying AST structure looks like. This is particularly useful if you're generating MyST AST from scratch. For example, as part of a [plugin role or directive](./plugins.md).

```{figure} media/sandbox-demo.mp4
Here's how you can use [the MyST sandbox](https://mystmd.org/sandbox) to explore the structure of a `card` directive and preview its AST.
```

:::{note} Click here to see the full output of the MyST sandbox
:class: dropdown

The output of the sandbox AST generator can be seen in @code:ast. The highlighted outer `root` and `block` nodes are always included in the output, and contain the interesting AST (in this case, a `card`).

```{code} json
:linenos:
:emphasize-lines: 1-6,30-33
:label: code:ast
:caption: The AST of a card directive, produced by the MyST sandbox.
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
```

:::
