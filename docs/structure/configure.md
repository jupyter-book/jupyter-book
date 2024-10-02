(structure/configure)=
# Configure the Table of Contents

This page covers some of the options you have available to control your book's behavior via the Table of Contents.

## Configure all entries in the TOC

To configure options for all entries of your TOC, use the `defaults:` configuration at the root of your Table of Contents.
This configuration will be applied to every list of chapters or sections within your book.

For example:

```yaml
format: jb-book
root: index
defaults:  # The defaults key will be applied to all chapters and sub-sections
  titlesonly: True
chapters:
- file: path/to/chapter1
- file: path/to/chapter2
```

## Configure a single top-level set of chapters/sections

If you're only using a single list of chapters, and not organizing them into parts, you can configure the single group of chapters with the `options:` key.

For example:

```yaml
format: jb-book
root: index
options:  # The options key will be applied to all chapters, but not sub-sections
  numbered: True
chapters:
- file: path/to/part1/chapter1
- file: path/to/part1/chapter2
```

:::{note}
If you're using `parts`, then the `options:` key has no effect.
You should configure each part individually (see below).
:::

## Configure one or more Parts

If you are organizing your book into **parts** (groups of chapters), configure each part by providing `key: value` pairs alongside each `part` entry, like so:

```yaml
format: jb-book
root: index
parts:
  - caption: Name of Numbered Part 1
    numbered: True  # Only applies to chapters in Part 1.
    chapters:
    - file: path/to/part1/chapter1
    - file: path/to/part1/chapter2
  - caption: Name of Not-numbered Part 2
    chapters:
    - file: path/to/part2/chapter1
    - file: path/to/part2/chapter2
```

In this case, the `numbered:` *only applies to Part 1*, and not Part 2.
If you want all parts to be numbered, you will need to add `numbered: true` to all `parts` entries.

:::{warning}
Currently there is no global setting to enable `numbered: true` across all parts.

You cannot use

```yaml
defaults:
  numbered: true
```

as sphinx will issue warnings due to `numbered` flag being set for subtrees.
It also causes unexpected output.
:::


## Add captions to Parts

To add a caption to a Part (so that it shows up in the sidebar, for example) use the `caption:` option like so:

```
- caption: My part name
  chapters:
  - file: chapter1
  ...
```

## Specify alternate titles

If you'd like to specify an alternate title from the one defined within a file,
you may do so with the `title:` key. For example:

```yaml
- file: path/to/myfile
  title: My alternate page title
```

Note that this only applies to the sidebar
in the table of contents, it does not change the actual chapter/section title.

(toc/numbering)=
## Number your chapters and sections

You can automatically add numbers chapters of your book.
Numbers will follow a hierarchy according to the structure defined in your `_toc.yml` file.

### Number a single group of chapters

If using a single set of chapters for your book (aka, no Parts), add numbers to them with the `numbered: true` flag, like so:

```yaml
format: jb-book
root: intro
options:
  numbered: true
chapters:
  - file: chapter1
  - file: chapter2
```

### Number one or more parts

If using one or more parts, add the `numbered: true` option to each.
For example, to number all parts in a two-part book:

```yaml
format: jb-book
root: intro
parts:
- caption: Part 1
  numbered: true
  chapters:
  - file: part1/chapter1
- caption: Part 2
  numbered: true
  chapters:
  - file: part2/chapter1
```

To number only the second part of a book:

```yaml
format: jb-book
root: intro
parts:
- caption: Part 1
  chapters:
  - file: part1/chapter1
- caption: Part 2
  numbered: true  # Only the second part is numbered
  chapters:
  - file: part2/chapter1
```

#### Restart numbering between parts

By default, chapter numbering will be continuous between parts (i.e. they will not re-start each section at `1.` each time)
using an extension called [sphinx-multitoc-numbering](https://github.com/executablebooks/sphinx-multitoc-numbering).

To **restart chapter numbering between parts**, use the following setting in your `_config.yml` file:

```yaml
html:
  use_multitoc_numbering: false
```

### Limit the depth of numbering

If you'd like to limit the depth of numbering, use an **integer** for the `numbered` flag.
This will be the depth of sub-sections to continue numbering.
For example, `numbered: 3`.

::::{admonition} A few caveats about numbering
Jupyter Book relies on {term}`Sphinx` to apply section numbering, and this has a
few quirks to it. Here are a few gotchas:

* **Numbering applies to _sections_ of your page**.
  Note that when you add numbering to a section, it will add numbers to *each header
  in a file*. This means that if you have headers in a top-level section, then its
  headers will become numbered as sub-sections, and any other _files_ underneath it
  will begin as third-level children. See [](toc/structure) for more information.

% TODO: remove after we release v0.13
:::{admonition} jupyter-book < 0.11.2
* **Numbering resets across parts**.
  If you specify groups of sections via `- part:` entries, then numbering will restart between
  them. That means if you have two `- part:` entries with 2 pages each, you will
  have two sets of `1.` and `2.` sections, one for each part.
:::

::::


## Add a table of contents to a page's content

If you'd like to add a table of contents for the sub-sections of a page
*within the page content* (in-line with the content on the page), you
may do so by using the `{tableofcontents}` directive. You can use it like so:

````md
```{tableofcontents}
```
````

See the source of [the content types page](../file-types/index.md) for an example.

## Control the depth of the displayed Table of Contents

To control the maximum depth of the Table of Contents that you insert, use the `maxdepth:` option in your `_toc.yml` file. For example:

```
- caption: My part name
  maxdepth: 2  # The displayed Table of Contents will only have two levels
  chapters:
  - file: chapter1
  ...
```

## Add a within-page Table of Contents

A within-page Table of Contents shows the _sections that are present on the current page_ (as opposed to the sub-pages listed in `_toc.yml`, as inserted by the `{tableofcontents}` directive introduced above).

To insert a within-page Table of Contents, use the `{contents}` directive.
For example, to insert a list of all sections on the current page (including the page title):

````md
# Page title

```{contents}
```
````

By default, the `{contents}` directive will include all heading levels in the current page, including heading level 1 (i.e., the title of the page).

### Add a section-specific list of contents

To only list the section titles for sub-sections of a specific parent section, add the `:local:` argument to the `{contents}` directive.
For example, to list only the contents of second-level sections on a page (and exclude the title):

````md
# Page title

```{contents}
:local:
```

## Section 1 (will be listed)

### Sub-section 1 (will be listed)

## Section 2 (will be listed)
````

To list only the contents of the `## Section 1` section:

````md
# Page title

## Section 1 (will not be listed)

```{contents}
:local:
```

### Sub-section 1 (will be listed)

## Section 1 (will not be listed)
````

### Limit the depth of the in-page contents

You can control the depth of the within-page Table of Contents with the `:maxdepth:` argument.
For example, the following usage lists only the top-level sections underneath the title, even if there are deeper sub-sections (i.e., `##` headings, but no `###` headings or deeper).

````md
# Page title

```{contents}
:local:
:depth: 1
```
````

## Exclude pages from your build

By default, Jupyter Book will build all content files that are found in your book's
folder, even if they are not specified in `_toc.yml` (and will raise a warning if
it finds a file that isn't listed there).

If you'd like Jupyter Book to skip a file entirely, you can do so with the following
configuration in `_config.yml`:

```yaml
exclude_patterns: [pattern1/*, path/to/myfile.ipynb]
```

Any files that match the patterns described there will be excluded from the build.
If you'd like to exclude files from being *executed* but still wish for them to be
built by Jupyter Book, see [](execute/exclude).


(config:exclude-non-toc-files)=
### Disable building files that aren't in the Table of Contents

By default, Jupyter Book will build all files that are in your book's folder, regardless of whether they are specified in the Table of Contents.
To disable this behavior and *only* build files that are specified in the TOC, use the following pattern in `_config.yml`:

```yaml
only_build_toc_files: true
```

Note that files that are in *hidden folders* (e.g. in `.github` or `.venv`) will still be built even if they are not specified in the TOC. You should exclude these files explicitly.
