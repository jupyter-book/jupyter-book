Jupyter Book markdown syntax
============================

Whether you write your book's content in Jupyter Notebooks (`.ipynb`) or
in regular markdown files (`.md`), you'll write in the same flavor of markdown
called **MyST Markdown**.

# What is MyST?

MyST stands for "Markedly Structured Text". It
is a slight variation on a flavor of markdown called "CommonMark" markdown,
with small syntax extensions to allow you to write **roles** and **directives**
in the Sphinx ecosystem.

# What are roles and directives?

Roles and directives are two of the most powerful tools in Jupyter Book. They
are kind of like functions, but written in a markup language. They both
serve a similar purpose, but **roles are written in one line**, whereas
**directives span many lines**. They both accept different kinds of inputs,
and what they do with those inputs depends on the specific role or directive
that is being called.

## Using a directive

At its simplest, you can insert a directive into your book's content like so:

````
```{mydirectivename}
My directive content
```
````

This will only work if a directive with name `mydirectivename` already exists
(which it doesn't). There are many pre-defined directives associated with
Jupyter Book. For example, to insert a note box into your content, you can
use the following directive:

````
```{note}
Here is a note
```
````

This results in:

```{note}
Here is a note
```

In your built book.

For more information on writing directives, see the
[MyST documentation](https://myst-parser.readthedocs.io/).


## Using a role

Roles are very similar to directives, but they are less-complex and written
entirely on one line. You can insert a role into your book's content with
this pattern:

```
Some content {rolename}`and here is my role's content!`
```

Again, roles will only work if `rolename` is a valid role's name. For example,
the `doc` role can be used to refer to another page in your book. You can
refer directly to another page by its relative path. For example, the
role syntax `` {doc}`intro` `` will result in: {doc}`intro`.

For more information on writing roles, see the
[MyST documentation](https://myst-parser.readthedocs.io/).


## Adding a citation

You can also cite references that are stored in a `bibtex` file. For example,
the following syntax: `` {cite}`holdgraf_evidence_2014` `` will render like
this: {cite}`holdgraf_evidence_2014`.

Moreoever, you can insert a bibliography into your page with this syntax:
The `{bibliography}` directive must be used for all the `{cite}` roles to
render properly.
For example, if the references for your book are stored in `references.bib`,
then the bibliography is inserted with:

````
```{bibliography} references.bib
```
````

Resulting in a rendered bibliography that looks like:

```{bibliography} references.bib
```
