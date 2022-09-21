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
2. **Create a `.readthedocs.yml` file**.
   This file can configure the behavior of {{RTD}}.
   See [the ReadTheDocs documentation on its use](https://docs.readthedocs.io/en/stable/config-file/v2.html).
3. **Add a `pre_build` job to your `.readthedocs.yml` file**.
   ReadTheDocs allows you to run extra scripts before and after your documentation is built.
   You can use this to [generate the Sphinx configuration](sphinx:convert) for your Jupyter Book before {{RTD}} tries to build it.
   For example, see the ReadTheDocs configuration that is used to build this book:

   ```{literalinclude} ../../.readthedocs.yml
   :emphasize-lines: 7-10
   ```

   See [the ReadTheDocs jobs documentation](https://docs.readthedocs.io/en/stable/config-file/v2.html#build-jobs) for more information.

{{RTD}} should now automatically generate the Sphinx configuration for your book and build your book's HTML to host it online.
