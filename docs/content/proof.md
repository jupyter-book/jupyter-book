---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

(myst-content/proofs-algorithms)=
# Proofs, Theorems, and Algorithms

Infrastructure to support items such as `proof` and `algorithm` style formatting is provided by the [sphinx-proof](https://github.com/executablebooks/sphinx-proof) extension.

This extension supports the `html` and `pdflatex` builders.

[sphinx-proof](https://github.com/executablebooks/sphinx-proof) includes support for the following `directives`:

1. [Algorithms](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#algorithms)
2. [Axioms](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#axioms)
3. [Conjectures](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#conjectures)
4. [Corollaries](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#corollaries)
5. [Criteria](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#criteria)
6. [Definitions](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#definitions)
7. [Examples](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#examples)
8. [Lemmas](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#lemmas)
9. [Observations](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#observations)
10. [Properties](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#properties)
11. [Propositions](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#propositions)
12. [Proofs](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#proofs)
13. [Remarks](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#remarks)
14. [Theorems](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#theorems)

## Installation

```{warning}
This is **not** currently a default package in `jupyter-book` as is a relatively new package.

It needs to be enabled through the `_config.yml` after installation.
```

To install you can use `pip`:

```bash
pip install sphinx-proof
```

## Adding extension through `_config.yml`

Open `_config.yml` and add `sphinx_proof` to:

```yaml
sphinx:
  extra_extensions:
    - sphinx_proof
```

## Using [sphinx-proof](https://github.com/executablebooks/sphinx-proof)

This package uses a `prf` sphinx domain.

All markup objects follow the `{prf:<typeset>}` (such as `{prf:proof}`) pattern and allows the directives to be referenced using the inline role `{prf:ref}`.

```{warning}
When referencing directives in [sphinx-proof](https://github.com/executablebooks/sphinx-proof) you need to use the ```{prf:ref}`<label>` ``` inline role.
Using other cross-referencing facilities will **not** work such as `[](<label>)`
```

Below we show an example using the `{prf:algorithm}` directive.

A similar pattern can be followed for [the other syntax supported by `sphinx-proof`](https://sphinx-proof.readthedocs.io/en/latest/syntax.html).

In MyST Markdown, you can add an `algorithm` to your document using the `algorithm` directive:

::::md
```{prf:algorithm} Ford–Fulkerson
:label: my-algorithm

**Inputs** Given a Network $G=(V,E)$ with flow capacity $c$, a source node $s$, and a sink node $t$

**Output** Compute a flow $f$ from $s$ to $t$ of maximum value

1. $f(u, v) \leftarrow 0$ for all edges $(u,v)$
2. While there is a path $p$ from $s$ to $t$ in $G_{f}$ such that $c_{f}(u,v)>0$
	for all edges $(u,v) \in p$:

	1. Find $c_{f}(p)= \min \{c_{f}(u,v):(u,v)\in p\}$
	2. For each edge $(u,v) \in p$

		1. $f(u,v) \leftarrow f(u,v) + c_{f}(p)$ *(Send flow along the path)*
		2. $f(u,v) \leftarrow f(u,v) - c_{f}(p)$ *(The flow might be "returned" later)*
```
::::

will be rendered as

```{prf:algorithm} Ford–Fulkerson
:label: ford-fulkerson

**Inputs** Given a Network $G=(V,E)$ with flow capacity $c$, a source node $s$, and a sink node $t$

**Output** Compute a flow $f$ from $s$ to $t$ of maximum value

1. $f(u, v) \leftarrow 0$ for all edges $(u,v)$
2. While there is a path $p$ from $s$ to $t$ in $G_{f}$ such that $c_{f}(u,v)>0$
	for all edges $(u,v) \in p$:

	1. Find $c_{f}(p)= \min \{c_{f}(u,v):(u,v)\in p\}$
	2. For each edge $(u,v) \in p$

		1. $f(u,v) \leftarrow f(u,v) + c_{f}(p)$ *(Send flow along the path)*
		2. $f(u,v) \leftarrow f(u,v) - c_{f}(p)$ *(The flow might be "returned" later)*
```

and can be referenced using the `label` assigned to the algorithm such as ```{prf:ref}`ford-fulkerson` ``` which will provide a link such as {prf:ref}`ford-fulkerson`.

:::{margin}
The `proof` directive does not support `:label:` so it is currently recommended to use [targets](https://myst-parser.readthedocs.io/en/latest/using/syntax.html#targets-and-cross-referencing) defined by `MyST` for cross-referencing `proof` directives. See [documentation](https://sphinx-proof.readthedocs.io/en/latest/syntax.html#proofs)
:::

# Additional Documentation

Further [documentation for sphinx-proof](https://sphinx-proof.readthedocs.io/en/latest/) is also available.
