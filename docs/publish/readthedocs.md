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

To publish your book with {{RTD}}, follow these steps:

1. **Get started with Read the Docs**.
   To do so, follow [the Read the Docs tutorial](https://docs.readthedocs.io/en/stable/tutorial/index.html).
   Configure {{RTD}} to host a website from your book's repository.
2. **Convert your book into a Sphinx site**.
   There are two ways to do this using the Jupyter Book CLI.

   - [Manually convert your book to a Sphinx site](sphinx:convert).
   - [Use `pre-commit` to automatically convert your book to sphinx](sphinx:convert:pre-commit).

   In either case, it will generate a `conf.py` file along with your book's source files.
   This is the file Sphinx uses to build your book.
3. **Commit the `conf.py` file and push to your online repository**.

If you've configured {{RTD}} correctly, it should now automatically build your book's HTML and host it online.
