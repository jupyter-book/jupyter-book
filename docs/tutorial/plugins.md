---
title: Create Plugins in JavaScript
description: Plugins implemented in JavaScript are easily used across different projects, as they do not require any additional programs to be installed.
---

Jupyter Book uses the [MyST plugins infrastructure](xref:guide/plugins) to extend Jupyter Book's base functionality.
Here are some things you can do with plugins:

- Define a new directive or role to generate block-level or inline content.
- Define a transform that modifies a page's content at build time.

Plugins are natively written in JavaScript, or by writing an executable script in another language that follows [the MyST plugin protocol](xref:guide/executable-plugins).
This tutorial shows you how to create a JavaScript plugin from scratch.

## Create a basic Jupyter Book template

We'll start by creating a basic template book that we can add to.

🛠 First, create a new folder for a demo Jupyter Book (or use a pre-existing book).

```shell
$ mkdir plugin-demo
$ cd plugin-demo
```

🛠 Next initialize a Jupyter Book in the folder to add a configuration file:

```shell
$ jupyter book init
```

🛠 Finally, create an empty file that we'll use to play around with our plugin:

```shell
$ echo '# My demo page' > myplugindemo.md
```

🛠 And add it to your Jupyter Book's configuration file:

```yaml
project:
  toc:
    - file: myplugindemo.md
```

You should now be able to run `jupyter book start` and see a page with just your title rendered:

🛠️ Run `jupyter book start` to confirm that your demo book is set up properly.

```shell
$ jupyter book start
```

## Create an empty plugin script

Next we'll create an empty JavaScript file[^esm] that we'll use to add new plugin logic.

[^esm]: The format of the JavaScript should be an ECMAScript modules, not CommonJS. This means it uses `import` statements rather than `require()` and is the most modern style of JavaScript. See [the MDN modules documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) for background on modules.

🛠 Create a `src/` folder and add an empty JavaScript file to it

```{code} javascript
:filename: src/myplugin.mjs
mkdir src
touch src/myplugin.mjs
```

In this tutorial we will define a **directive** and play around with ways to control it.
Other plugins you could define are **roles** and **transforms**.

### Register the plugin

You register plugins by defining JavaScript objects that follow the **plugin specification**[^esm] - this is a way of structuring plugin configuration so that Jupyter Book and MyST know how to read them.

Below we'll create the skeleton of a MyST plugin - the following defines an empty plugin structure and "exports" the plugin so that MyST can use it.
We'll add the specific code later.

🛠 Copy and paste the JavaScript below into the `myplugin.mjs` file that you created.

```{code} javascript
:filename: src/myplugin.mjs
const plugin = {
  name: "My cool plugin",
  directives: [],
};

export default plugin;
```

We'll register the plugin so that MyST can discover and use it.

🛠 Add the following to your `myst.yml` file:

```yaml
project:
  plugins:
    - src/myplugin.mjs
```

🛠 Start your MyST site.

```shell
$ jupyter book start
```

You should see MyST log the activation of this plugin, it'll look something like this:

```shell
🔌 My cool plugin (src/myplugin.mjs) loaded: 0 directives, 0 roles, 0 transforms
```

However, this plugin doesn't have any functionality!
We'll add that next.

(tutorial:plugins:directive)=

## Create a directive plugin

Directives plugins allow you to control your own block-level content creation.
Here we will create a simple directive that returns a phrase that the user can control.

Directives must follow a specific structure so that MyST knows how to read them[^spec].
First, create a directive with the right structure, but no "logic" to do anything.

[^spec]: Here's the [Directive Specification](https://github.com/jupyter-book/mystmd/blob/main/packages/myst-common/src/types.ts#L92-L101) and the [Role Specification](https://github.com/jupyter-book/mystmd/blob/main/packages/myst-common/src/types.ts#L103-L110)

🛠 Copy and paste the code **above** the plugin code in your `myplugin.mjs` file.

```{code} javascript
:filename: src/myplugin.mjs
const myDirective = {
  name: "mydirective",
  doc: "My new directive!",
  arg: { type: String, doc: "The word to display" },
  run(data, vfile, ctx) {},
};
```

Here's how to interpret the above:

`name`
: The name of the directive in MyST (i.e., how you will write the directive)

`doc`
: A docstring to help others know what the directive does.

`arg`
: Tell MyST that this directive expects an argument of a "String" type.

`run(data, vfile, ctx)`
: A special function all directives must have. This is executed when the directive is run.

`data`
: A data object provided to each directive when it is run. This contains information about the directive, and also other information about what's on the page.

`vfile`
: A [VFile](https://github.com/vfile/vfile) object. This is a virtual file object that contains information about the page that the directive is being run on.

`ctx`
: A context object provided to each directive when it is run. This provides helper functions and information for working with MyST. See [](#plugins:ctx) for more information.

Next, we'll add some logic to this directive so that it does something when we run it.

🛠️ Modify the directive code above so that it looks like this:

```{code} javascript
:filename: src/myplugin.mjs
const myDirective = {
  name: "mydirective",
  doc: "My new directive!",
  arg: { type: String, doc: "The word to display" },
  run(data, vfile, ctx) {
    const word = data.arg
    const sentence = {
      type: "text",
      value: "The word you gave is: " + word,
    };
    return [{type: "paragraph", children: [sentence]}];
  },
};
```

In this directive, we are **constructing MyST {term}`AST`** using the directive's argument.
MyST AST is the structure built when you "build a MyST site".
Above, we're defining two MyST nodes: a `paragraph` node (`type: "paragraph"`) and a `text` node (`type: "text"`). We're then nesting the `text` node underneath the `paragraph` node (`children: [sentence]`).

Finally, we **return an array of MyST nodes**.
This array is what will be inserted into the document when the directive is run.
You must always return an array (list) of nodes in a directive or role.

Next we add this directive to the list of plugin exports for our plugin:

🛠️ Modify the plugin exports so that it looks like the following:

```{code} javascript
:filename: src/myplugin.mjs
const plugin = {
  name: "My cool plugin",
  directives: [myDirective],
};
```

Now our plugin should be ready to use!
We'll add it to our content to try it out.

🛠️ Add the directive to your MyST document.

````{code} markdown
:filename: myplugindemo.md
# My demo page

```{mydirective} myword
```
````

🛠️ **Re-build** MyST (you must re-build manually any time you change a plugin)

```shell
$ jupyter book start
```

Now preview the page, you should see `The word you gave is: myword` printed on the document.

Congratulations, you've created your first MyST directive!

:::{margin} The MyST Sandbox is great for exploring AST
There is [a MyST sandbox](https://mystmd.org/sandbox) designed to help you experiment with writing MyST.
On the preview window, click the "AST" tab and it will display the parsed AST for whatever you write.
This is a helpful way to quickly figure out how to create various AST outputs manually.
:::

```{tip} Some tips for debugging
See [](../plugins/debug.md) for tips on Debugging MyST plugins.
```

## Add an option to our directive

Let's extend the functionality of our directive by supporting an **option**.
Options are `key:value` pairs that you can use to control your directive's behavior.

🛠️ Modify the directive code so that it looks like the following:

```{code} javascript
:filename: src/myplugin.mjs
const myDirective = {
  name: "mydirective",
  doc: "My new directive!",
  arg: { type: String, doc: "The word to display" },
  options: {
    bold: { type: Boolean, doc: "Whether to make the directive *bold*." },
  },
  ...
};
```

Note that we've added an `options:` section to the directive metadata.
This tells the directive the name of the option, as well as its type.

Next we'll modify the directive logic to make use of the option. If the option is `true` then we'll wrap the entire `text` node in a `strong` node, which tells MyST that it should be bold.

🛠️ Modify the directive so that it looks like the following:

```{code} javascript
:filename: src/myplugin.mjs
const myDirective = {
  name: "mydirective",
  doc: "My new directive!",
  arg: { type: String, doc: "The word to display" },
  options: {
    bold: {type: Boolean, doc: "Make the sentence bold!"}
  },
  run(data, vfile, ctx) {
    const word = data.arg
    const bold = data.options.bold || false;
    var sentence = {
      type: "text",
      value: "The word you gave is: " + word,
    };
    if (bold === true) {
      var strong = {"type": "strong", "children": [sentence]};
      return [{type: "paragraph", children: [strong]}];
    } else {
      return [{type: "paragraph", children: [sentence]}];
    }
  },
};
```

We've modified the directive logic so that it will nest the `text` node inside of a `strong` node if `bold: true`. This will make the entire sentence bold. Note that we use JavaScript's `||` to specify a default value for `bold` if none is given.

🛠️ Add the `bold` option to your markdown's directive and re-build your MyST site.

````{code} markdown
:filename: myplugindemo.md
# My demo page

```{mydirective} Not bold
```

```{mydirective} Bold
:bold: true
```
````

🛠️ Restart the MyST build to load the new directive logic.

```shell
$ jupyter book start
```

You should see the first sentence as before, and the second sentence in bold!

## Use the directive body to generate a card

Let's expand the functionality of our directive by supporting a **directive body** and making it **output a [MyST card](xref:guide/dropdowns-cards-and-tabs)** instead of a text node.

🛠️ Modify your directive configuration to register a `body`:

```{code} javascript
:filename: src/myplugin.mjs
const myDirective = {
  name: "mydirective",
  doc: "My new directive!",
  arg: { type: String, doc: "The word to display" },
  body: { type: String, doc: "Goes in the middle of the card."},
  options: {
    bold: {type: Boolean, doc: "Make the sentence bold!"}
  },
  ...
};
```

Next, we'll modify our directive logic generate a MyST card if the body is present, and set the directive argument as the card title.

The AST of a card output is a bit more complex than a paragraph or text node.
Rather than building it by hand, we'll use the `ctx.parseMyst` function to generate MyST ast from MyST Markdown[^sandbox].

:::{warning} `ctx.parseMyst` is experimental
This is a helpful function that may change or move in the near future.
A more reliable way to generate MyST AST is to manually create the AST nodes yourself.
See the how-to on [using the MyST sandbox](../plugins/sandbox.md) for a reference on manually identifying MyST AST structure.
:::

🛠️ Modify your directive with the code below to use `ctx.parseMyst` to parse the directive argument into MyST AST.

```{code} javascript
:filename: src/myplugin.mjs
  ...
  run(data, vfile, ctx) {
    const word = data.arg
    const bold = data.options.bold || false;
    const body = data.body || '';
    var sentence = {
      type: "text",
      value: "The word you gave is: " + word,
    };
    if (bold === true) {
      var sentence = {"type": "strong", "children": [sentence]}
    }

    if (body) {
      var ast = ctx.parseMyst(`:::{card} ${word}\n${body}\n:::`);
      var out = ast.children[0]
    } else {
      var out = {"type": "paragraph", "children": [sentence]}
    }
    return [out];
  }
```

In the (body) we're parsing a MyST `{card}` directive string into MyST AST.

:::{note} Click to show what the AST for a card looks like
:class: dropdown

This widget shows the rendered card, and its corresponding AST. Take a look at the `AST` → `JSON` → `POST` tab to see the final AST representation, after MyST has transformed the raw source code. You will find the `card` node contained within a `block` node under the `root `

````{myst}

```{card} A title
Here's a card body!
```
````

:::

🛠️ Now modify your page markdown to include a body for the directive.

````{code} markdown
:filename: myplugindemo.md
# My demo page

```{mydirective} Not bold
```

```{mydirective} Bold
:bold: true
```

```{mydirective} A card
Here's a card body!
```

````

🛠️ Re-build your site!

The result should be a MyST card in addition to your previous two cards!

## Create a transform to count your cards

Finally, we'll create a new type of plugin called a **Transform**.
Transforms allow you to modify a page's content at build time, after everything has been parsed into MyST AST.

Transforms can be used to modify the AST of a page, so let's demonstrate this by adding **a footer** to each card produced by our directives.
It will display the total number of times that directive has been used on a page.

🛠️ Create the skeleton of a Transform and register it in your plugin output like so:

```{code} javascript
:filename: src/myplugin.mjs

const myTransform = {
  name: "directive-counter",
  doc: "Count the number of word directives on a page.",
  stage: "document",
  plugin: (_, utils) => (node) => {
  },
};

const plugin = {
  name: "My cool plugin",
  directives: [myDirective],
  transforms: [myTransform],
};
```

The logic of a transform lives in the `plugin:` value.
It should be a function that operates on nodes (see the structure above).
Each node is a MyST AST for a page.

The `utils` parameter is a helper module to provide some functions for manipulating MyST AST.
We'll use it in our plugin to find all of our directive nodes.

First, let's confirm that this plugin is properly loaded.

🛠️ Re-start MyST to confirm that the plugin's transform is loaded.

```shell
$ jupyter book start
```

You should see output like:

```shell
🔌 My cool plugin (src/myplugin.mjs) loaded: 1 directive, 0 roles, 1 transform
```

Now we'll modify the transform to be more useful.
Because we know the directive outputs cards, we can add a card footer in-place for each card.
The JavaScript below will do so:

🛠️ Modify the Transform logic to look like the following:

```{code} javascript
:filename: src/myplugin.mjs
const myTransform = {
  name: "directive-counter",
  doc: "Count the number of word directives on a page.",
  stage: "document",
  plugin: (opts, utils) => (tree) => {
    const cards = utils.selectAll("card", tree);
    const totalCards = cards.length;

    cards.forEach((card, index) => {
        card.children.push({
            type: "footer",
            children: [{
                type: "text",
                value: `Card ${index + 1} of ${totalCards}`
            }],
        });
    });
  }
};
```

Here's a short description of what it does:

- `plugin:` expects a _function_ that is called on the document tree (the AST of the page). That's what the first line defines.
- Use the `utils` module to find all of the nodes for a `card` on the page. `utils` has a few helper functions to make it easier to create plugins.
- Loop through each card node and add footer content to its AST.[^footer]

[^footer]: Not sure what the AST for footer looks like? Try [this MyST sandbox demo](https://mystmd.org/sandbox?tab=demo&myst=YABgAGAAewBjAGEAcgBkAH0AIABNAHkAIAB0AGkAdABsAGUACgA6AGgAZQBhAGQAZQByADoAIABNAHkAIABoAGUAYQBkAGUAcgAKADoAZgBvAG8AdABlAHIAOgAgAE0AeQAgAGYAbwBvAHQAZQByAAoATQB5ACAAYgBvAGQAeQAuAAoAYABgAGAA).

Let's add bodies to each of the cards on our markdown, and then re-build to see the result.

🛠️ Modify your markdown file to look like this.

````{code} markdown
:filename: myplugindemo.md
# My demo page

```{mydirective} Not bold
A body!
```

```{mydirective} Bold
:bold: true
Another body!
```

```{mydirective} A card
Here's a card body!
```
````

🛠️ Re-build your demo site.

```shell
$ jupyter book start
```

You should now see each card with a footer with a running count.

## Learn more about plugins

That's the end of this tutorial - you've created a plugin, used it to define a new directive, output custom AST when each directive is called, and created a transform that modifies that AST at build time.

There is a lot more that you can do with plugins, and this functionality is young in MyST and will grow considerably.

See the following MyST pages for more complete information and examples for how to create plugins:

- <xref:guide/javascript-plugins>
- <xref:guide/executable-plugins>

#### This raises a warning

````{code} markdown
```{mydirective}
```
````

and

````{code-block} markdown
```{mydirective}
```
````

#### This works fine

````markdown
```{mydirective}

```
````
