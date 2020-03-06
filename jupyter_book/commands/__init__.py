"""Defines the commands that the CLI will use."""
import sys
import os.path as op
from pathlib import Path
import click
from glob import glob

from ..sphinx import build_sphinx, DEFAULT_CONFIG


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

    PATH_TOC_YAML = toc if toc is not None else PATH_BOOK.joinpath("_toc.yml")
    CONFIG_FILE = config if config is not None else PATH_BOOK.joinpath("_config.yml")

    OUTPUT_PATH = path_output if path_output is not None else PATH_BOOK
    OUTPUT_PATH = Path(OUTPUT_PATH).joinpath("_build/html")

    # Now call the Sphinx commands to build
    config = {
        "yaml_config_path": str(CONFIG_FILE),
        "globaltoc_path": str(PATH_TOC_YAML),
    }
    build_sphinx(
        PATH_BOOK, OUTPUT_PATH, noconfig=True, confoverrides=config, builder="html"
    )


@main.command()
@click.argument("path-page")
@click.option("--path-output", default=None, help="Path to the output artifacts")
@click.option("--config", default=None, help="Path to the YAML configuration file")
def page(path_page, path_output, config):
    """Convert a single notebook page to HTML or PDF.
    """
    # Paths for our notebooks
    PATH_PAGE = Path(path_page)
    PATH_PAGE_FOLDER = PATH_PAGE.parent.absolute()
    PAGE_NAME = PATH_PAGE.with_suffix("").name
    CONFIG_FILE = (
        config if config is not None else PATH_PAGE_FOLDER.joinpath("_config.yml")
    )

    OUTPUT_PATH = path_output if path_output is not None else PATH_PAGE
    OUTPUT_PATH = Path(OUTPUT_PATH).joinpath("_build/html")

    # Find all files that *aren't* the page we're building and exclude them
    to_exclude = glob(str(PATH_PAGE_FOLDER.joinpath("**", "*")), recursive=True)
    to_exclude = [
        op.relpath(ifile, PATH_PAGE_FOLDER)
        for ifile in to_exclude
        if ifile != str(PATH_PAGE.absolute())
    ]
    to_exclude = DEFAULT_CONFIG["exclude_patterns"] + to_exclude

    # Now call the Sphinx commands to build
    config = {
        "master_doc": PAGE_NAME,
        "yaml_config_path": str(CONFIG_FILE),
        "globaltoc_path": "",
        "exclude_patterns": to_exclude,
    }

    build_sphinx(
        PATH_PAGE_FOLDER,
        OUTPUT_PATH,
        noconfig=True,
        confoverrides=config,
        builder="html",
    )


@main.command()
@click.argument("path-output")
def create(path_output):
    """Create a simple Jupyter Book that you can customize."""

    # Paths for our notebooks
    PATH_PAGE = Path(path_page)
    PATH_PAGE_FOLDER = PATH_PAGE.parent.absolute()
    PAGE_NAME = PATH_PAGE.with_suffix("").name
    CONFIG_FILE = (
        config if config is not None else PATH_PAGE_FOLDER.joinpath("_config.yml")
    )

    OUTPUT_PATH = path_output if path_output is not None else PATH_PAGE
    OUTPUT_PATH = Path(OUTPUT_PATH).joinpath("_build/html")

    # Find all files that *aren't* the page we're building and exclude them
    to_exclude = glob(str(PATH_PAGE_FOLDER.joinpath("**", "*")), recursive=True)
    to_exclude = [
        op.relpath(ifile, PATH_PAGE_FOLDER)
        for ifile in to_exclude
        if ifile != str(PATH_PAGE.absolute())
    ]
    to_exclude = DEFAULT_CONFIG["exclude_patterns"] + to_exclude

    # Now call the Sphinx commands to build
    config = {
        "master_doc": PAGE_NAME,
        "yaml_config_path": str(CONFIG_FILE),
        "globaltoc_path": "",
        "exclude_patterns": to_exclude,
    }

    build_sphinx(
        PATH_PAGE_FOLDER,
        OUTPUT_PATH,
        noconfig=True,
        confoverrides=config,
        builder="html",
    )