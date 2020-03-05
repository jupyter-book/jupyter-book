"""Defines the commands that the CLI will use."""
import sys
import os.path as op
from pathlib import Path
import click

from ..sphinx import build_sphinx

ROOT = Path(__file__)
DEFAULT_CONFIG = dict(
    project="Testing my book",
    copyright="2018, Chris Holdgraf",
    author="Chris Holdgraf",
    extensions=[
        "sphinx_togglebutton",
        "myst_parser",
        "myst_nb",
        "jupyter_book",
        "sphinxcontrib.bibtex",
    ],
    togglebutton_selector=".toggle, .secondtoggle",
    myst_nb_require_url="",
    # Add any paths that contain templates here, relative to this directory.
    templates_path=["_templates", str(ROOT.parent.joinpath("static", "templates").absolute())],
    master_doc="index.rst",
    language=None,
    exclude_patterns=["_build", "Thumbs.db", ".DS_Store", "**.ipynb_checkpoints"],
    pygments_style="sphinx",
    # -- Options for HTML output -------------------------------------------------
    html_theme="jupyter_book_theme",
)


@click.group()
def main():
    """Build and manage books with Jupyter."""
    pass


@main.command()
@click.option(
    "--path-book", default=".", help="Path to the root of the book repository."
)
@click.option("--path-output", default=None, help="Path to the output artifacts")
@click.option("--config", default=None, help="Path to the YAML configuration file")
@click.option("--toc", default=None, help="Path to the Table of Contents YAML file")
@click.option(
    "--execute", is_flag=True, help="Execute notebooks before converting them."
)
def build(path_book, path_output, config, toc, execute):
    """Convert a collection of Jupyter Notebooks into HTML suitable for a course textbook.
    """
    # Paths for our notebooks
    PATH_BOOK = Path(path_book).absolute()

    PATH_TOC_YAML = toc if toc is not None else PATH_BOOK.joinpath("toc.yml")
    CONFIG_FILE = config if config is not None else PATH_BOOK.joinpath("_config.yml")

    OUTPUT_PATH = path_output if path_output is not None else PATH_BOOK
    OUTPUT_PATH = Path(OUTPUT_PATH).joinpath("_build/html")

    # Now call the Sphinx commands to build
    config = DEFAULT_CONFIG.copy()
    config.update(
        {"yaml_config_path": str(CONFIG_FILE), "globaltoc_path": str(PATH_TOC_YAML)}
    )
    print(PATH_BOOK)
    build_sphinx(
        PATH_BOOK, OUTPUT_PATH, noconfig=True, confoverrides=config, builder="html"
    )


