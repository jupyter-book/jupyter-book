# Hugo Book Theme
[![Build Status](https://travis-ci.org/alex-shpak/hugo-book.svg?branch=master)](https://travis-ci.org/alex-shpak/hugo-book)
### [Hugo](https://gohugo.io) documentation theme as simple as plain book

![Screenshot](https://github.com/alex-shpak/hugo-book/blob/master/images/screenshot.png)


## Features
* Clean simple design
* Mobile friendly
* Customizable
* Designed to not interfere with other layouts
* Zero initial configuration

## Requirements
* Hugo 0.43 or higher
* Hugo extended version, read more [here](https://gohugo.io/news/0.43-relnotes/)

## Installation
Navigate to your hugo website root and run:
```
git submodule add https://github.com/alex-shpak/hugo-book themes/book
```

Then run hugo (or set `theme: book` in configuration file)
```
hugo server --theme book
```

## Menu
### File tree menu (default)
By default theme will render pages from `content/docs` section as menu in a tree structure.  
You can set `title` and `weight` in front matter of pages to adjust order and titles in menu.

### Leaf bundle menu
You can also use leaf bundle and content of it's `index.md` as 
menu.

Given you have this file structure
```
├── content
│   ├── docs
│   │   ├── page-one.md
│   │   └── page-two.md
│   └── posts
│       ├── post-one.md
│       └── post-two.md
```

Create file `content/docs/menu/index.md` with content
```md
---
headless: true
---

- [Book Example](/docs/)
  - [Page One](/docs/page-one)
  - [Page Two](/docs/page-two)
- [Blog](/posts)
```

And Enable it by settings `BookMenuBundle: /docs/menu` in Site configuration

- [Example menu](https://github.com/alex-shpak/hugo-book/blob/master/exampleSite/content/menu/index.md)
- [Example config file](https://github.com/alex-shpak/hugo-book/blob/master/exampleSite/config.yml)
- [Leaf bundles](https://gohugo.io/content-management/page-bundles/)

## Blog
Simple blog supported for section `posts`

## Configuration
### Site Configuration
There are few configuration options you can add to your `config.yml|json|toml` file
```yaml
# (Optional) Set this to true if you use captial letters in file names
disablePathToLower: true

# (Optional) Set this to true to enable 'Last Modified by' date and git author
#  information on 'doc' type pages.
enableGitInfo: true

# (Warnings) Theme is intended for documentation use, there for it doesn't render taxonomy.
# You can hide related warning with config below
disableKinds: ["taxonomy", "taxonomyTerm"]

params:
  # (Optional, default true) Show or hide table of contents globally
  # You can also specify this parameter per page in front matter
  BookShowToC: true

  # (Optional, default none) Set leaf bundle to render as side menu
  # When not specified file structure and weights will be used
  BookMenuBundle: /menu

  # (Optional, default docs) Specify section of content to render as menu
  # You can also set value to "*" to render all sections to menu
  BookSection: docs

  # This value is duplicate of $link-color for making active link highlight in menu bundle mode
  # BookMenuBundleActiveLinkColor: \#004ed0

  # Include JS scripts in pages. Disabled by default.
  # - Keep side menu on same scroll position during navigation
  BookEnableJS: true

  # Set source repository location.
  # Used for 'Last Modified' and 'Edit this page' links.
  BookRepo: https://github.com/alex-shpak/hugo-book

  # Enable "Edit this page" links for 'doc' page type.
  # Disabled by default. Uncomment to enable. Requires 'BookRepo' param.
  # Path must point to 'content' directory of repo.
  BookEditPath: edit/master/exampleSite/content
```

### Page Configuration
You can specify additional params per page in front matter
```yaml
---
# Set type to 'docs' if you want to render page outside of configured section or if you render section other than 'docs'
type: docs

# Set page weight to re-arrange items in file-tree menu (if BookMenuBundle not set)
weight: 10

# (Optional) Set to mark page as flat section in file-tree menu (if BookMenuBundle not set)
bookFlatSection: true

# (Optional) Set to hide table of contents, overrides global value
bookShowToC: false
---
```

### Partials
There are few empty partials you can override in `layouts/partials/`

| Partial                                          | Placement                               |
| --                                               | --                                      |
| `layouts/partials/docs/inject/head.html`         | Before closing `<head>` tag             |
| `layouts/partials/docs/inject/body.html`         | Before closing `<body>` tag             |
| `layouts/partials/docs/inject/menu-before.html`  | At the beginning of `<nav>` menu block  |
| `layouts/partials/docs/inject/menu-after.html`   | At the end of `<nav>` menu block        |


## Contributing
Contributions are welcome and I will review and consider pull requests.  
Primary goals are:
 - Keep it simple
 - Keep minimal (or zero) default configuration
 - Avoid interference with user-defined layouts

Feel free to open issue if you missing some configuration or customization option.

## License
[MIT](LICENSE)
