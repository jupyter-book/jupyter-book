# Create custom directives, roles, and transforms

This page provides minimal examples of how to create roles and directives in plugins.
It focuses on the JavaScript plugin architecture, rather than the Executable Plugin architecture.

For each of the plugins below, you can register them by adding configuration to your `myst.yml` file like the following:

```{code} yaml
:filename: myst.yml

project:
  plugins:
    - src/myplugin.mjs
```

And then re-building your MyST site:

```{code} shell
$ myst start
```

## Create a directive

Below is boilerplate code for how to create a directive.

```{code} javascript
:filename: src/myplugin.mjs
const myDirective = {
  name: "mydirective",
  doc: "My new directive!",
  arg: { type: String, doc: "The argument of the directive.", required: true },
  body: { type: String, doc: "The body of the directive." },
  options: {
    option1: { type: String, doc: "An option of the directive." },
    option2: { type: Boolean, doc: "Another option of the directive." },
  },
  run(data, vfile, ctx) {
    const arg = data.arg;
    const body = data.body || "";
    const option1 = data.options.option1 || "mystring";
    const option2 = data.options.option2 || false;

    const sentence = {
      type: "text",
      value: `Arg: ${arg}\nBody: ${body}\nOption 1: ${option1}\nOption 2: ${option2}`
    };
    return [sentence];
  },
};

const plugin = {
  name: "My cool plugin",
  directives: [myDirective],
};

export default plugin;
```

Example usage:

````{code} markdown
:filename: myplugindemo.md

```{mydirective} myword
:option1: foo
:option2: true
My body
```
````

## Create a custom admonition

A common use-case for directive plugins is to create a custom admonition.
Let's say that we want to create an admonition called "checkitout" that uses a specific color, and is always a dropdown.
Here's plugin code you can copy/paste into a file to accomplish this:

```{literalinclude} ../src/admonition.mjs
```

You can then register this plugin in your `myst.yml` file like so:

```{code} yaml
:filename: myst.yml

project:
  plugins:
    - src/admonition.mjs
```

Then we can use this admonition like so:

````markdown
```{checkitout} My title
My body
```
````

```{checkitout} My title
My body
```

## Create a role

Below is boilerplate code for how to create a role.
This one shows how to use the `'myst'` type to treat the role's body as MyST.

```{code} javascript
:filename: src/myplugin.mjs
const myRole = {
  name: "myrole",
  doc: "My new role!",
  body: { type: 'myst', doc: "The body of the role.", required: true },
  run(data, vfile, ctx) {
    const result = {
      type: "span",
      class: "myrole",
      children: data.body
    };
    return [result];
  },
};

const plugin = {
  name: "My cool plugin",
  roles: [myRole],
};

export default plugin;
```

Example usage:

```markdown
This content {myrole}`will be **parsed as myst**` and inserted.
```

## Create a transform

Transforms allow you to modify the AST in place during your build.
Below is a sample transform that searches for the word "up" and changes it to "down".

```{code} javascript
:filename: src/myplugin.mjs
const myTransform = {
  name: "updown",
  doc: "Turn up to down.",
  stage: "document",
  plugin: (opts, utils) => (tree) => {
    const textNodes = utils.selectAll("text", tree);
    textNodes.forEach((text, index) => {
        text.value = text.value.replace("up", "down");
    });
  }
};

const plugin = {
  name: "My cool plugin",
  transforms: [myTransform],
};

export default plugin;
```

Example usage: register this plugin for your MyST project, and put the word "up" in your text anywhere.
When you view your MyST build output, all instances of "up" should be replace with "down".

## More information on plugins

For more information on writing plugins, see:

- [The Jupyter Book plugins tutorial](../tutorial/plugins.md)
- [The MyST guide plugins documentation](xref:guide/plugins)
