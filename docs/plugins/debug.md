# Debug plugins

This section describes a few ways to debug MyST plugins.

(debug-mode)=
## Debug mode

You can run MyST in **debug mode** to print a lot more information about what happens under the hood.
This is useful for printing status messages in your plugins for debugging purposes.

**To run MyST in debug mode**, use the `-d` flag like so:

```shell
$ myst start -d
```

## Use `console.log` to debug JavaScript plugins

The easiest way to debug your MyST plugin is to use `console.log` statements in JavaScript to print the contents of variables in your plugin.
This allows you to inspect things at build time.

For example, if you put the following in the `run(data)` function of a directive, it will show you the metadata in `data`.

```javascript
console.log(data)
```

Make sure to [run MyST in debug mode](#debug-mode).

You should see the contents of `data` printed in your MyST build log.

### Show the full depth of a MyST object in JavaScript logs

`console.log` will only show you the first layer of depth, but you may want to inspect _all_ layers of a MyST object or AST node.
To do so, use a JavaScript call like the following:

```javascript
console.dir(node, { depth: null, colors: true });
```

## Debug executable plugins by printing to `stderr`

Executable plugins are more complex to debug because of the need to send data back and forth with the MyST build process.
Because executable plugins rely on reading `stdout` to retrieve data passed to MyST by the plugin, we cannot debug with normal print statements.

Instead, print to `stderr`, which will still be displayed in MyST when run under [debug mode](#debug-mode).

For example, here's how you'd print to `stderr` in Python:

```python
import sys
print("A message to stderr.", file=sys.stderr)
```

Or if you wanted to prettify the output of a MyST object (e.g. in a directive) you could use a module like [pretty print](https://docs.python.org/3/library/pprint.html).

```python
from pprint import pprint
pprint(data, stream=sys.stderr)
```

This will show up in your MyST build if you [run MyST in debug mode](#debug-mode).
