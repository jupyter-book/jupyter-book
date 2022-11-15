---
substitutions:
    RTD: "[Read the Docs](https://readthedocs.org)"
---
# Read the Docs

{{RTD}} is a web service for hosting documentation online.
They offer free web hosting for open source projects, sustained by [ethical advertising](https://docs.readthedocs.io/en/stable/advertising/ethical-advertising.html) that is inserted into pages.
These ads can also be removed with a [small monthly payment](https://readthedocs.org/sustainability/) to help sustain the project.

{{RTD}} builds Sphinx websites, and does not support Jupyter Book directly.
However, you can [convert your book to a Sphinx website](../sphinx/index.md) in order to publish with {{RTD}}.
This can be automated with a {{RTD}} `pre_build` job.

To publish your book with {{RTD}}, follow these steps:

1. **Get started with Read the Docs**.
   To do so, follow [the Read the Docs tutorial](https://docs.readthedocs.io/en/stable/tutorial/index.html).
   Configure {{RTD}} to host a website from your book's repository.
2. **Create a `.readthedocs.yml` file** in the root of your repository.
   This file configures the behavior of {{RTD}}.
3. **Add a `pre_build` job to your `.readthedocs.yml` file**.
   Read the Docs allows you to run extra scripts before and after your documentation is built.
   You can use this to [generate the Sphinx configuration](sphinx:convert) for your Jupyter Book before {{RTD}} tries to build it.
   For example, this configuration is used to build this book:

   ```{literalinclude} ../../.readthedocs.yml
   :emphasize-lines: 7-10
   ```

   See [the Read the Docs Config File reference](https://docs.readthedocs.io/en/stable/config-file/v2.html) for a full reference to the configuration file options.

{{RTD}} should now automatically generate the Sphinx configuration for your book and build your book's HTML to host it online.

```{tip}
You can also get started by using this example project from Read the Docs:

* [Example project](https://example-jupyter-book.readthedocs.io/)
* [Example project source code on GitHub](https://github.com/readthedocs-examples/example-jupyter-book)

The project itself can be copied and customized, or you can use it as a reference when you start a Jupyter Book project from scratch that you wish to publish on Read the Docs.
```
