# Use roles and directives

:::{seealso} See the MyST guide
The [MyST authoring guide](xref:guide/typography) has more information about how to author content with roles and directives.
:::

## Use a basic directive

Here's the basic usage of a directive, including arguments, options, and content:

```markdown
:::{my-directive} my-arg
:option: my-option

My directive content.
:::
```

### Attach a class to directives

Any directive can have classes attached to HTML outputs by using the `class` option like so:

```markdown
:::{my-directive} 
:class: classone classtwo
:::
```

These will be passed directly to the list of classes on the HTML element, so the value of `:class:` should follow the [HTML specification for the class attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class).

## Use a basic role

Here's the basic way to write a role in MyST Markdown:

```{code-block} markdown
:filename: mypage.md
Here is a role: {my-role}`some content`.
```
