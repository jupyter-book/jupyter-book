# Components and UI elements

In addition to special types of content, Jupyter Book also comes with a few extensions that provide flexible ways to structure chunks of content.

:::{seealso}
Many of these are provided by [the `sphinx-design` extension](https://sphinx-design.readthedocs.io/en/latest/index.html).
This is inspired heavily by [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/) and many Bootstrap classes can be used as a part of these components.
See the [sphinx-design documentation](https://sphinx-design.readthedocs.io/en/latest/index.html) for more details.
:::


## Grids

Grids allow you to structure arbitrary chunks of content in a grid-like system.
You can also control things like the width of columns, the "gutters" between columns, etc.

To generate a grid, use the ` ```{grid} ` wrapper directive along with ` ```{grid-item} ` directives inside.

For example, to generate a 4-column grid of content:

```
::::{grid}

:::{grid-item}
A
:::
:::{grid-item}
B
:::
:::{grid-item}
C
:::
:::{grid-item}
D
:::

::::
```

Results in:

::::{grid} 1 2 3 4

:::{grid-item}
A
:::
:::{grid-item}
B
:::
:::{grid-item}
C
:::
:::{grid-item}
D
:::

::::



For example, you can control how many columns are in your panels by using [Bootstrap column classes](https://getbootstrap.com/docs/4.0/layout/grid/). These panels:

````{panels}
:column: col-4
:card: border-2
Header A
^^^
Body A
---
Header B
^^^
Body B
---
Header C
^^^
Body C
````

Were created by this code:

`````
````{panels}
:column: col-4
:card: border-2
Header A
^^^
Body A
---
Header B
^^^
Body B
---
Header C
^^^
Body C
````
`````

### Customize the look of grids

There are many ways to customize

% TODO: Add grids documentation here

(content/cards)=
## Cards

Cards provide an easy way for you to organize chunks of content into flexible containers on your page.
They are useful for creating flexible columns and grids.
Cards use the [sphinx-design extension](https://sphinx-design.readthedocs.io) and are based off of [Bootstrap CSS](https://getbootstrap.com/docs/4.5/components/card/).

Here is an example that creates two cards:

`````
````{card}
Card header 1
^^^
Card body 1
+++
Card footer 1
````

````{card}
Card header 2
^^^
Card body 2
+++
Card footer 2
````
`````

- `^^^` defines the card header
- `+++` defines the card footer

```{note}
Card headers and footers are optional.
If you don't include `^^^` or `+++` in your card, they will not show up.
```

You can embed all kinds of content inside of cards. For example, the following cards:

````{card}
Content of the left card.

{bdg-primary}`example-badge`

````

````{card}

```{button-ref} content/cards
:class: stretched-link

Clickable right card
```

````

were created with:


`````md
````{card}
Content of the left card.

{bdg}`example-badge`

````

````{card}

```{button-ref} content/cards
:class: stretched-link

Clickable right card
```

````
`````

```{seealso}
See the [Sphinx Design card layout documentation](https://sphinx-design.readthedocs.io/en/stable/cards.html) for more information.
```

### Controlling the look and feel of cards

You can control the look and feel of panels by passing attaching bootstrap classes to panel headers/body/footers.
You do this by passing configuration options to your  `{panels}` directive.

For example:


```{seealso}
See the [Panels card styling documentation](https://sphinx-panels.readthedocs.io/en/latest/#card-styling) for more information.
```


(content:dropdowns)=
## Dropdowns

Dropdowns allow you to hide content behind a title and a button.
There are two kinds of dropdowns in Jupyter Book:

### The `{dropdown}` directive

Use the `{dropdown}` directive to create a clickable dropdown with a title.

For example:

::::{grid} 1
:::{grid-item-card}
Source
^^^
````
```{dropdown} Here's my dropdown
And here's my dropdown content
```
:::
:::{grid-item-card}
Result
^^^
```{dropdown} Here's my dropdown
And here's my dropdown content
```
:::
::::

`````{panels}
source
^^^
````
```{dropdown} Here's my dropdown
And here's my dropdown content
```
````
---
result
^^^
```{dropdown} Here's my dropdown
And here's my dropdown content
```
`````

(content/toggle-admonitions)=
### Dropdown admonitions

You can also hide the body of your admonition blocks so that users must click a button to reveal their content.
This is helpful if you'd like to include some text that isn't immediately visible to the user.

To turn an admonition into a dropdown, add the `dropdown` class to them. For example:

`````{panels}
source
^^^
````md
```{note}
:class: dropdown
The note body will be hidden!
```
````
---
result
^^^
```{note}
:class: dropdown
The note body will be hidden!
```
`````

You can use this in conjunction with `{admonition}` directives to include your
own titles and stylings. For example:

`````{panels}
source
^^^
````md
:::{admonition} Click here!
:class: tip, dropdown
Here's what's inside!
:::
````
---
result
^^^
:::{admonition} Click here!
:class: tip, dropdown
Here's what's inside!
:::
`````

:::{important}
Admonition dropdowns require JavaScript to be enabled on the browser which they are viewed.
By contrast, the [dropdown directive](content/cards) below works purely *via* HTML+CSS.
:::


(content:tabs)=
## Tabbed content

You can also use [`sphinx-panels`](sphinx-panels:panels/usage) to produce [**tabbed content**](sphinx-panels:components-tabbed).
This allows you to display a variety of tabbed content blocks that users can click on.

For example, here's a group of tabs showing off code in a few different languages:

````{tabbed} c++

```{code-block} c++

int main(const int argc, const char **argv) {
  return 0;
}
```
````

````{tabbed} python

```{code-block} python

def main():
    return
```
````

````{tabbed} java

```{code-block} java

class Main {
    public static void main(String[] args) {
    }
}
```
````

````{tabbed} julia

```{code-block} julia

function main()
end
```
````

````{tabbed} fortran

```{code-block} fortran

PROGRAM main
END PROGRAM main
```
````

You can use this functionality with the `{tabbed}` directive. You can provide a sequence of `{tabbed}` directives, and each one will be used to generate a new tab (unless the `:new-group:` option is added to a `{tabbed}` directive.)

For example, the following code:

````
```{tabbed} Tab 1 title
My first tab
```

```{tabbed} Tab 2 title
My second tab with `some code`!
```
````

produces

```{tabbed} Tab 1 title
My first tab
```

```{tabbed} Tab 2 title
My second tab with `some code`!
```

**Insert code outputs in your tabs** with the [`glue` functionality](glue/gluing).

For example, the following tabs use this functionality to glue images and tables generated somewhere else in these docs:

````{tabbed} A histogram
```{glue:figure} boot_fig
:figwidth: 300px
:name: "fig-boot-tab"

This is a **caption**, with an embedded `{glue:text}` element: {glue:text}`boot_mean:.2f`!
```
````
````{tabbed} A table
```{glue:figure} df_tbl
:figwidth: 300px
:name: "tbl:df-tab"

A caption for a pandas table.
```
````
``````{tabbed} Code to generate this
`````
````{tabbed} A histogram
```{glue:figure} boot_fig
:figwidth: 300px
:name: "fig-boot-tab"

This is a **caption**, with an embedded `{glue:text}` element: {glue:text}`boot_mean:.2f`!
```
````

````{tabbed} A table
```{glue:figure} df_tbl
:figwidth: 300px
:name: "tbl:df-tab"

A caption for a pandas table.
```
````

````{tabbed} Code to generate this
`{ code block here }`
````
`````
``````

See the [`sphinx-panels` tabbed](sphinx-panels:components-tabbed) documentation for more information on how to use this.


(custom-div-blocks)=
## Custom `<div>` blocks

You can add custom `div` blocks along with whatever classes you'd like using
the `{div}` directive. The `{div}` directive will wrap everything inside in a single `<div>` with the classes you provide. For example:

````md
```{div} my-class
**Some content.**
```
````

Will result in the following HTML when your book is built:

```html
<div class="my-class">
  <strong>Some content.</strong>
</div>
```

This can be useful if you'd like to style your book with [custom CSS or JavaScript](custom-assets).
