# Components and UI elements

In addition to special types of content, Jupyter Book also comes with a few extensions that provide flexible ways to structure chunks of content.

:::{seealso}
Many of these are provided by [the `sphinx-design` extension](https://sphinx-design.readthedocs.io/en/latest/index.html).
This is inspired heavily by [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/) and many Bootstrap classes can be used as a part of these components.
See the [sphinx-design documentation](https://sphinx-design.readthedocs.io/en/latest/index.html) for more details.
:::

% REMOVE when version is >= 0.14
:::{admonition} Upgrading from `sphinx-panels`
Previous versions of Jupyter Book used `sphinx-panels` to define major UI elements.
These now use [Sphinx Design instead](https://sphinx-design.readthedocs.io).
Documentation for these UI elements is now in [](components.md).
See [the migration guide](https://sphinx-design.readthedocs.io/en/latest/get_started.html#migrating-from-sphinx-panels) and [this migration discussion issue](https://github.com/executablebooks/sphinx-design/issues/51) for more information.
:::

## Grids

Grids allow you to structure arbitrary chunks of content in a grid-like system.
You can also control things like the width of columns, the "gutters" between columns, etc.

To generate a grid, use the ` ```{grid} ` wrapper directive along with ` ```{grid-item} ` directives inside.

For example:

```{example}

::::{grid}
:gutter: 2

:::{grid-item}
:outline:
A
:::
:::{grid-item}
:outline:
B
:::
:::{grid-item}
:outline:
C
:::
:::{grid-item}
:outline:
D
:::

::::
```

### Control columns of a grid

You can control how many columns are in each grid item with the `:columns:` option.
Grids are split into 12 units of length, and this can be used to split up items as you wish. For example:

````{example}

::::{grid}

:::{grid-item}
:outline:
:columns: 3
A
:::
:::{grid-item}
:outline:
:columns: 9
B
:::
:::{grid-item}
:outline:
:columns: 6
C
:::
:::{grid-item}
:outline:
:columns: 6
D
:::

::::

````

### Create grids of cards

There is a short-hand for adding grids made up of cards, by using the `{grid-item-card}` directive. For example:

```{example}

::::{grid}
:gutter: 3

:::{grid-item-card} One!
Here's the first card.
:::

:::{grid-item-card} Two!
Here's the second card.
:::

:::{grid-item-card} Three!
Here's the third card.
:::
::::
```

See [](content/cards) for more information about styling cards.

### Learn more about grids

For more information about grids, see the {doc}`Sphinx Design documentation <sd:index>`.

(content/cards)=
## Cards

Cards provide an easy way for you to content into a standard "header", "body", "footer" structure that has a similar alignment and visual style.
It is useful for creating galleries or high-visibility collections of links and information.
Cards use the [sphinx-design extension](https://sphinx-design.readthedocs.io) and are based off of [Bootstrap CSS](https://getbootstrap.com/docs/5.0/components/card/).

Cards have four main sections, and uses special characters to separate certain sections:

- **A card title**: The argument given to the directive.
- **A card header**: Any content that precedes a line with `^^^`.
- **A card footer**: Any content that comes after a line with `+++`.
- **A card body**: Any content that comes in between `^^^` and `+++`.

Here is an example card (note the use of `^^^` and `+++` to separate the header, body, and footer):

:::{example}

````{card} Card 1 title

Card header 1
^^^
Card body 1
+++
Card footer 1
````
:::


```{note}
Card headers and footers are optional.
If you don't include `^^^` or `+++` in your card, they will not show up.
```

You can embed all kinds of content inside of cards. For example:

`````{example}
````{card}
Content of the top card.

{bdg-primary}`example-badge`

````

````{card}

```{button-ref} content/cards
:class: stretched-link

Clickable bottom card
```

````
`````

### Learn more about cards

See the [Sphinx Design card styling documentation](https://sphinx-design.readthedocs.io/en/sbt-theme/cards.html) for more information.


(components:dropdowns)=
## Dropdowns

Dropdowns allow you to hide content behind a title and a button.
There are two kinds of dropdowns in Jupyter Book:

### The `{dropdown}` directive

Use the `{dropdown}` directive to create a clickable dropdown with a title.

For example:

````{example}
```{dropdown} Here's my dropdown
And here's my dropdown content
```
````

(content/toggle-admonitions)=
### Dropdown admonitions

You can also hide the body of your admonition blocks so that users must click a button to reveal their content.
This is helpful if you'd like to include some text that isn't immediately visible to the user.

To turn an admonition into a dropdown, add the `dropdown` class to them. For example:

`````{example}
```{note}
:class: dropdown
The note body will be hidden!
```
`````

You can use this in conjunction with `{admonition}` directives to include your
own titles and stylings. For example:


````{example}

```{admonition} Click here!
:class: tip, dropdown
Here's what's inside!
```

````

:::{important}
Admonition dropdowns require JavaScript to be enabled on the browser which they are viewed.
By contrast, the [dropdown directive](content/cards) below works purely *via* HTML+CSS.
:::


(components:tabs)=
## Tab content

You can also produce [**tabbed content**](sd:sd-tabs).
This allows you to display a variety of tabbed content blocks that users can click on.

To do so, create a `{tab-set}` wrapper directive, and put `{tab-item}` directives inside.

For example:

`````{example}
````{tab-set}
```{tab-item} Tab 1 title
My first tab
```

```{tab-item} Tab 2 title
My second tab with `some code`!
```
````
`````

This can be used to show off many different view of the same content, such as providing multiple language examples.
For example:

`````{tab-set}
````{tab-item} c++

```{code-block} c++

int main(const int argc, const char **argv) {
  return 0;
}
```
````

````{tab-item} python

```{code-block} python

def main():
    return
```
````

````{tab-item} java

```{code-block} java

class Main {
    public static void main(String[] args) {
    }
}
```
````

````{tab-item} julia

```{code-block} julia

function main()
end
```
````

````{tab-item} fortran

```{code-block} fortran

PROGRAM main
END PROGRAM main
```
````
`````

### Learn more about tabs

See the [`sphinx-design` tabs documentation](sd:sd-tabs) for more information on how to use this.

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
