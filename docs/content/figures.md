# Images and Figures

(content-blocks-images)=
## Images

MyST Markdown provides a few different syntaxes for including images in your documentation, as explained below.

The first is the standard Markdown syntax:

```md
![fishy](../images/fun-fish.png)
```

![fishy](../images/fun-fish.png)

This will correctly copy the image to the build folder and will render it in all output formats (HTML, TeX, etc).
However, it is limited in the configuration that can be applied, for example setting a width.

As discussed in [this section](content:myst/directives), MyST allow for directives to be used such as `image` and `figure` (see [the sphinx documentation](sphinx:rst-primer) for available options):

````md
```{image} ../images/fun-fish.png
:alt: fishy
:class: bg-primary
:width: 200px
:align: center
```
````

```{image} ../images/fun-fish.png
:alt: fishy
:class: bg-primary mb-1
:width: 200px
```

This allows you to control aspects of the image with [directive arguments](directive-arguments).

In one way, this is an improvement on the Markdown syntax, however, the drawback is that this syntax will not show the image in common Markdown viewers (for example when the files are viewed on GitHub).
The final option then is directly using HTML, which can also parsed by MyST Markdown.
U
sing raw HTML is usually a bad choice (see [this explanation](raw-html-in-markdown)),
but enabling extended syntax in your `_config` enables MySt-Parser to properly handle isolated `img` tags:

```yaml
parse:
  myst_extended_syntax: true
```

Now you can add:

```html
<img src="../images/fun-fish.png" alt="fishy" class="bg-primary" width="200px">
```

and we correctly render:

<img src="../images/fun-fish.png" alt="fishy" class="bg-primary mb-1" width="200px">

This will also be output in PDF LaTeX builds!

Allowed attributes are equivalent to the `image` directive: `src`, `alt`, `class`, `width` and `height`.
Any other attributes will be dropped.

## Figures

MyST Markdown also lets you include **figures** in your page. Figures are
like images, except that they are easier to reference elsewhere in your
book, and they include things like captions. To include a figure, use this
pattern:

````md
```{figure} ../images/C-3PO_droid.png
---
height: 150px
name: my-figure
---
Here is my figure caption!
```
````

```{figure} ../images/C-3PO_droid.png
---
height: 150px
name: my-figure
---
Here is my figure caption!
```

```{note}
You can also include figures that were generated from your code in notebooks.
To do so, see [](content:code-outputs:glue).
```

## Referencing figures

You can then refer to this figure using the `{ref}` role like:
`` {ref}`my-figure` ``, which will replace the reference with the figure caption like so: {ref}`my-figure`.
Another convenient way to create cross-references is with the `{numref}` role, which automatically numbers the labelled objects.
For example, `` {numref}`my-figure` `` will produce a reference like: {numref}`my-figure`.

If an explicit text is provided, this caption will serve as the title of the reference. The characters "%s" and "{number}" will be replaced with a figure number, while "{name}" will be replaced with a figure caption. For example, ``{numref}`Figure {number}: {name} <my-figure>` `` will produce: {numref}`Figure {number}: {name} <my-figure>`.

## Margin captions and figures

You can include a figure caption on the margin using `:figclass: margin-caption` as seen in {numref}`margin_caption_figure`.

```{figure} ../images/cool.jpg
---
height: 150px
figclass: margin-caption
name: margin_caption_figure
---
Here is my figure caption!
```

Another option is to include figures on the margin using `:figclass: margin` as seen in {numref}`margin_figure`.

```{figure} ../images/cool.jpg
---
width: 60%
figclass: margin
name: margin_figure
---
Here is my figure caption!
```

## Figure scaling and alignment

Figures can also be aligned by using the option `:align: right` or `:align: left`. By default, figures are aligned to the center (see {numref}`my-figure`).

````md
```{figure} ../images/cool.jpg
---
scale: 50%
align: left
---
Here is my figure caption!
```
````

```{figure} ../images/cool.jpg
---
scale: 50%
align: left
---
Here is my figure caption!
```

````md
```{figure} ../images/cool.jpg
---
scale: 50%
align: right
---
Here is my figure caption!
```
````

```{figure} ../images/cool.jpg
---
scale: 50%
align: right

---
Here is my figure caption!
```

## Figure Parameters

The following options are supported:

`scale` : _integer percentage_
:  Uniformly scale the figure. The default is "100" which indicates no scaling. The symbol "%" is optional.

`width` : _length or percentage_
:  You can set the figure width in the following units: "em", "ex", "px","in" ,"cm", "mm", "pt", "pc", "%".

`height` : _length_
:  You can set the figure height in the following units: "em", "ex", "px", "in", "cm", "mm", "pt", "pc", "".

`alt` : _text_
:  Text to be displayed if the figure cannot display, or if the reader is using assistive technologies. Generally entails a short description of the figure.

`align` : _"left", "center", or "right"_
:  Align the figure left, center, or right. Default alignment is center.

`name` : _text_
:  A unique identifier for your figure that you can use to reference it with `{ref}` or `{numref}`. Cannot contain spaces or special characters.

`figclass` : _text_
:  Value of the figure's class attribute which can be used to add custom CSS or JavaScript. Predefined options include:
  * _"margin"_ : Display figure on the margin
  * _"margin-caption"_ : Display figure caption on the margin
