---
title: Citations and bibliographies
---

# Citations and bibliographies

You can add citations and bibliographies using references that are stored in a `bibtex` file in your book's folder. You can then add a citation inline in your Markdown with the `{cite}` role, and include the bibliography with the `{bibliography}` directive.

:::{seealso}
For more information about citations in MyST, see the [MyST guide on citations](https://mystmd.org/guide/citations).
:::

## Setting up citations

Create a `.bib` file with your references, for example `references.bib`:

```bibtex
@article{perez2011python,
  title={Python: an ecosystem for scientific computing},
  author={P{\'e}rez, Fernando and Granger, Brian E and Hunter, John D},
  journal={Computing in Science \& Engineering},
  volume={13},
  number={2},
  pages={13--21},
  year={2011},
  publisher={AIP Publishing}
}
```

Then configure it in your `myst.yml`:

```yaml
project:
  bibliography:
    - references.bib
```

## Basic citations

To cite a reference, use the `{cite}` role with the citation key:

```md
Jupyter notebooks enable reproducible research {cite}`perez2011python`.
```

## Citation styles

There are a few alternative roles to change the inline citation style:

- `` {cite:p}`perez2011python` `` - Parenthetical citation
- `` {cite:t}`perez2011python` `` - Textual citation (author names in text)

The exact formatting depends on your citation style configuration.

## Bibliography

MyST will automatically generate a bibliography on pages that contain citations.

You can also explicitly place a bibliography using the directive:

````md
```{bibliography}
```
````

This will display all cited references.

### Filtering bibliographies

You can show only citations from the current page:

````md
```{bibliography}
:filter: docname in docnames
```
````

This is useful when you want separate bibliographies on different pages rather than one global bibliography.

## Citation configuration

You can configure citation and bibliography styles in your `myst.yml`:

```yaml
project:
  bibliography:
    - references.bib
```

:::{seealso}
For more configuration options and advanced features, see the [MyST citations guide](https://mystmd.org/guide/citations).
:::

## Next steps

- [](cross-reference.md) - Learn about other cross-referencing features
- [MyST Citations Guide](https://mystmd.org/guide/citations) - Complete citations reference
