# Migrating to myst-nb>=0.16

The newer versions of [Myst-nb](https://myst-nb.readthedocs.io/en/latest/) have some breaking changes in terms of configuration which should be kept in mind
when creating a jupyter-book.
Although, all the configurations can be found in the myst-nb docs, we will highlight some of them here which we found necessary when building the docs of this package.

## Global configuration

The configuration options related to execution when used inside the `execute` object are mostly the same. However, when used at the top-level, some noteworthy changes are:

- `execute_notebooks` key has been changed to `nb_execution_mode`.
