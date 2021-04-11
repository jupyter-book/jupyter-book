# Connect your book to a code repository

There are many ways that you can connect your book's content back to the source files in a public repository.
Below we cover a few options.

(source-repository-button)=
## Add source repository buttons

There is a collection of buttons that you can use to link back to your source
repository. This lets users browse the repository or take actions like suggesting
an edit or opening an issue. In each case, they require the following configuration
to be set:

```yaml
repository:
  url: https://github.com/{your-book-url}
```

### Add a link to your repository

To add a link to your repository, add the following configuration:

```yaml
repository:
  url: https://github.com/{your-book-url}
html:
  use_repository_button: true
```

### Add a button to open issues

To add a button to open an issue about the current page, use the following
configuration:

```yaml
repository:
  url: https://github.com/{your-book-url}
html:
  use_issues_button: true
```

### Add a button to suggest edits

You can add a button to each page that will allow users to edit the page text
directly and submit a pull request to update the documentation.
To include this button, use the following configuration:

```yaml
repository:
  url: https://github.com/{your-book-url}
  path_to_book: path/to/your/book  # An optional path to your book, defaults to repo root
  branch: yourbranch  # An optional branch, defaults to `master`
html:
  use_edit_page_button: true
```
