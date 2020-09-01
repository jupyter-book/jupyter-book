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

As discussed in [this section](content:myst/directives), MyST allows for directives to be used such as `image` and `figure` (see [the sphinx documentation](sphinx:rst-primer) for available options):

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
The final option then is directly using HTML, which can also be parsed by MyST Markdown.
Using raw HTML is usually a bad choice (see [this explanation](raw-html-in-markdown)),
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

(content-blocks-images/formats)=
### Supported image formats

Standard rasterized image formats, such as `.png`, `jpg`, are supported for both HTML and LaTeX/PDF output formats.
Vector formats, such as `.svg`, `.pdf` and `.eps`, by contrast are normally builder specific.
See the `supported_image_types` specification for [each sphinx builder here](sphinx:builders).

To support multiple builders, Jupyter Book allows you to use a `*` asterisk as the extension:

```html
<img src="../images/fun-fish.*" alt="fishy" class="bg-primary mb-1" width="200px">
```

All images matching the provided pattern will then be searched for and each builder chooses the best image out of these candidates.

<img src="../images/fun-fish.*" alt="fishy" class="bg-primary mb-1" width="200px">

You can use a tool such as [imagemagick](https://imagemagick.org), to pre-convert your images into multiple formats.

Alternatively, you may wish to check out these sphinx extensions:

- [sphinx.ext.imgconverter](sphinx:sphinx.ext.imgconverter)
- [sphinxcontrib-svg2pdfconverter](https://github.com/missinglinkelectronics/sphinxcontrib-svg2pdfconverter)

## Figures

MyST Markdown also lets you include **figures** in your page. Figures are
like images, except that they are easier to reference elsewhere in your
book, and they include things like captions. To include a figure, use this
pattern:

````md
```{figure} ../images/C-3PO_droid.png
---
height: 150px
name: directive-fig
---
Here is my figure caption!
```
````

```{figure} ../images/C-3PO_droid.png
---
height: 150px
name: directive-fig
---
Here is my figure caption!
```

:::{note}
You can also include figures that were generated from your code in notebooks.
To do so, see [](content:code-outputs:glue).
:::

## Markdown Figures

Markdown figures combine [colon style admonitions](admonitions:colons) and [HTML image parsing](content-blocks-images), to produce a "Markdown friendly" syntax for figures,
with equivalent behaviour to the `figure` directive above.

To enable them, add in your `_config.yml`:

```yaml
parse:
  myst_extended_syntax: true
```

The figure block must contain **only** two components; an image, in either Markdown or HTML syntax, and a single paragraph for the caption.

As with admonitions, the figure can have additional classes set on it, but the title is now taken as the reference target of the figure:

```md
:::{figure,myclass} markdown-fig
<img src="../images/fun-fish.png" alt="fishy" class="bg-primary mb-1" width="200px">

This is a caption in **Markdown**!
:::
```

:::{figure,myclass} markdown-fig
<img src="../images/fun-fish.png" alt="fishy" class="bg-primary mb-1" width="200px">

This is a caption in **Markdown**!
:::

As we see here, the target we set can be referenced:

```md
[Go to the fish!](markdown-fig)
```

[Go to the fish!](markdown-fig)

## Referencing figures

You can then refer to your figures using the `{ref}` role or Markdown style references like:

```md
- {ref}`directive-fig`
- [](markdown-fig)
```

which will replace the reference with the figure caption like so:

- {ref}`directive-fig`
- [](markdown-fig)

### Numbered references

Another convenient way to create cross-references is with the `{numref}` role,
which automatically numbers the labelled objects.
For example, `` {numref}`directive-fig` `` will produce a reference like: {numref}`directive-fig`.

If an explicit text is provided, this caption will serve as the title of the reference.

```md
- {ref}`Fly to the droid <directive-fig>`
- [Swim to the fish](markdown-fig)
```

- {ref}`Fly to the droid <directive-fig>`
- [Swim to the fish](markdown-fig)

With `numref`, you can also access the figure number and caption individually:
the characters "%s" and "{number}" will be replaced with a figure number, while "{name}" will be replaced with a figure caption.

For example, ``{numref}`Figure {number}: {name} <directive-fig>` `` will produce: {numref}`Figure {number}: {name} <directive-fig>`.

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

Figures can also be aligned by using the option `:align: right` or `:align: left`. By default, figures are aligned to the center (see {numref}`directive-fig`).

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
