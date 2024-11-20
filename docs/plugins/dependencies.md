# Install JavaScript dependencies with your plugin

You can expand your plugin's functionality by installing dependencies that will be available to your MyST plugin code.
To do so, use a `package.json` file in your plugin's root directory.[^1]

[^1]: For more information about `package.json` files, see the [Node.js documentation](https://docs.npmjs.com/cli/v9/using-npm/package-json) and [the MDN package documentation](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management).

Here's an example `package.json` file that includes the `js-yaml` package, which is a YAML parser.

```{code} json
:filename: package.json
{
  "dependencies": {
    "js-yaml": "^4.1.0"
  }
}
```

You can then use the `js-yaml` package in your plugin code by importing it.
For example, the following JavaScript snippet uses the `js-yaml` package and the `fs` package (already built into JavaScript) to load YAML data from a file.

```{code} javascript
:filename: my_plugin.mjs
import yaml from "js-yaml";
import fs from "fs";

// Read and parse team data
const someData = yaml.load(fs.readFileSync("data.yml", "utf8"));
```

Note that any plugins will be run from the root of the project, so set your file paths accordingly.
