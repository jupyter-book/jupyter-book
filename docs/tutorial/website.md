---
title: "Create a website"
subtitle: Build a website with Jupyter Book
subject: Jupyter Book tutorial
description: Get up and running with Jupyter Book for a simple website.
---

:::{note} Topics to cover
This quickstart tutorial will help you up and running with a Jupyter Book on your local computer 👩‍💻, covering the following topics:

- Render your book as a website.
- Publish with GitHub Actions.
  :::

:::{note} Skills and prerequisites
**Skills**: It is helpful if you have some familiarity with using the command line, as well as using a text editor and/or JupyterLab.

**Tools**: You'll need a code and notebook editor ([VSCode](https://code.visualstudio.com/) is great, and we recommend [Jupyter Lab](https://jupyter.org/install) for notebooks) as well as access to a CLI.
:::

(lookout-for-tutorial-actions)=

> 🛠 Throughout the tutorial, whenever you're supposed to _do_ something you will see a 🛠

## Build your first book

Next we'll download some sample content and use `jupyter book start` to render it as a local web server!

### Download example content

We provide an example project that includes a few simple markdown files and some Jupyter Notebooks.
Through the course of the tutorials we will add content to these documents that show off some of the features of MyST.

🛠 Download the example content[^no-git], and navigate into the folder:

```shell
$ git clone https://github.com/jupyter-book/mystmd-quickstart.git
$ cd mystmd-quickstart

[^no-git]: If you aren't familiar with git, it isn't required for this tutorial, you can download the zip file with the contents from the [quickstart repository](https://github.com/jupyter-book/mystmd-quickstart).

### Initialize Jupyter Book in the content folder 🚀

Next we will create a `myst.yml` configuration file that is required to render your project.
This is the [configuration file used by MyST](xref:guide/quickstart#initialize-myst-in-the-content-folder), and what Jupyter Book uses to control its behavior.

🛠 Run `jupyter book`

The `jupyter book` command is a shortcut for `jupyter book init`, which has a few more options for writing specific parts of the configuration file and a table of contents for your site.

```shell
$ jupyter book

Welcome to the Jupyter Book (via myst) CLI! 🎉 🚀

jupyter book init walks you through creating a myst.yml file.

You can use Jupyter Book (via myst) to:

 - create interactive websites from markdown and Jupyter Notebooks 📈
 - build & export professional PDFs and Word documents 📄

Learn more about this CLI and MyST Markdown at: https://jupyterbook.org


💾 Writing new project and site config file: myst.yml
```

## Preview your book locally

Now that we a valid Jupyter Book project, we can preview it as a website to make sure that Jupyter Book is working properly.

🛠 When prompted, type `Yes` to install and serve your book locally:

```shell
? Would you like to run "jupyter book start" now? Yes
```

or manually serve the quickstart content with the following command:

```shell
$ jupyter book start
```

Starting the server requires a theme, this will download the default `book-theme` from [the MyST themes](./website-templates.md).
This can take **up to a minute** the first time, and then will be cached in the `_build/templates` directory.

```text
🐕 Fetching template metadata from https://api.mystmd.org/templates/site/myst/book-theme
💾 Saved template to path _build/templates/site/myst/book-theme
⤵️ Installing web libraries (can take up to 60 s)
📦 Installed web libraries in 13 s
📖 Built interactive-graphs.ipynb in 21 ms.
📖 Built paper.md in 32 ms.
📖 Built README.md in 35 ms.
📚 Built 3 pages for myst in 82 ms.

  ✨✨✨  Starting Book Theme  ✨✨✨

⚡️ Compiled in 524ms.

🔌 Server started on port 3000!  🥳 🎉

  👉  http://localhost:3000  👈
```

🛠 Open your web browser to `http://localhost:3000`[^open-port]

[^open-port]: If port `3000` is in use on your machine, an open port will be used instead, follow the link provided in the terminal.

The example site in this tutorial only has three pages and by default the `01-paper.md` page is seen in [](#frontmatter-before), which has minimal styles applied to the content.

:::{figure} https://github.com/jupyter-book/mystmd/blob/main/docs/images/frontmatter-before.png?raw=true
:width: 50%
:label: frontmatter-before
:class: framed

The myst theme for the `01-paper.md` page without any changes made.
:::

🎉 **Congratulations**, you just build your first MyST site!

## Configuration and structure

The final section of this tutorial takes a closer look at the files that we just created, and aspects of your book that can be customized.

### Folder structure

If you are using a text editor, for example [VSCode](https://code.visualstudio.com/), open up the folder to explore the files:

```text
quickstart/
  ├── 🆕 _build
  │   ├── exports
  │   ├── site
  │   │   ├── content
  │   │   ├── public
  │   │   └── config.json
  │   ├── temp
  │   └── templates
  │       ├── site/myst/book-theme
  │       └── tex/myst/arxiv_two_column
  ├── images
  │   ├── image.png
  │   └── image.gif
  ├── 01-paper.md
  ├── 02-notebook.ipynb
  ├── README.md
  └── 🆕 myst.yml
```

Running `jupyter book init` added:

- `myst.yml` - the configuration file for your myst project and site
- `_build` - the folder containing the processed content and other `site` assets, which are used by the local web server.

The `_build` folder also contains your templates (including the site template you installed) and any exports you make (when we build a PDF the exported document will show up in the `_build/exports` folder). You can clean up the built files at any time using `myst clean`[^clean-all].

[^clean-all]:
    By default the `jupyter book clean` command doesn't remove installed templates or cached web responses; however, the function can with a:\
    `jupyter book clean --all`, or\
    `jupyter book clean --templates --cache`.

    Before deleting any folders `jupyter book` will confirm what is going to happen, or you can bypass this confirmation with the `-y` option. For example:

    ```text
    Deleting all the following paths:

      - _build/site
      - _build/templates

    ? Would you like to continue? Yes

    🗑 Deleting: _build/site
    🗑 Deleting: _build/templates
    ```

### Configure site and page options

If we open and look inside our `myst.yml` we will see a basic configuration like this:

```yaml
# See docs at: https://mystmd.org/guide/frontmatter
version: 1
project:
  # title:
  # description:
  keywords: []
  authors: []
  # github:
  # bibliography: []
site:
  template: book-theme
  # title:
  # options:
  #   logo: my_logo.png
  nav: []
  actions:
    - title: Learn More
      url: https://mystmd.org/guide
  domains: []
```

There are two important parts to the `myst.yml`:

`project:`
: The project holds metadata about the collection of files, such as authors, affiliations and licenses for all of the files, any of these values can optionally be overridden in a file. To see all of the options see [](xref:guide/frontmatter), which includes which fields can be overridden by files in the project.

`site:`
: The site holds template information about the website, such as the logo, navigation, site actions and which template to use.

🛠 In `myst.yml`: Change the "`# title:`" comment in **site** to "`title: Fancy Title 🎩`" and save

Saving the `myst.yml` will have triggered a "full site rebuild"[^myst-start].
Take a look at the browser tab and you'll see that it has updated:

:::{figure} https://github.com/jupyter-book/mystmd/blob/main/docs/images/frontmatter-site-title.png?raw=true
:width: 50%
:label: frontmatter-site-title

The site title will control site meta tags, and the browser-tab title, which is appended to each page title in the `book-theme`.
:::

[^myst-start]: If the server stopped, you can restart the server using `jupyter book start`.

:::{seealso} See all Frontmatter options
To see all of the options see [](xref:guide/frontmatter), which includes which fields can be overridden by files in the project.
:::
