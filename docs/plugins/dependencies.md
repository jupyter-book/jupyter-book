# Install JavaScript dependencies with your plugin

You can expand your plugin's functionality by installing dependencies from the [npm package repository][npmjs]. You can install new dependencies by defining a `package.json` file[^1] in the same directory as your `myst.yml`[^2], and running `npm install`.

Here's an example `package.json` file that includes the `js-yaml` package, which is a YAML parser.

```{code} json
:filename: package.json
{
  "dependencies": {
    "js-yaml": "^4.1.0"
  }
}
```

By running `npm install`, we see:
```{code} shell
$ npm install
added 2 packages, and audited 3 packages in 898ms

found 0 vulnerabilities
````

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

## 

[^1]: For more information about `package.json` files, see the [Node.js documentation](https://docs.npmjs.com/cli/v9/using-npm/package-json) and [the MDN package documentation](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management).
[^2]: In fact, you can define a new `package.json` for each custom plugin, by defining your plugins in their own folders. There is little benefit to doing this, though.

[npmjs]: https://www.npmjs.com/
