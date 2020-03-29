"""Defines the commands that the CLI will use."""
import sys
import os.path as op
from pathlib import Path
import click
from glob import glob
import shutil as sh

from ..sphinx import build_sphinx
from ..toc import build_toc


@click.group()
def main():
    """Build and manage books with Jupyter."""
    pass


@main.command()
@click.argument("path-book")
@click.option("--path-output", default=None, help="Path to the output artifacts")
@click.option("--config", default=None, help="Path to the YAML configuration file")
@click.option("--toc", default=None, help="Path to the Table of Contents YAML file")
@click.option(
    "--execute/--no-execute",
    is_flag=True,
    help="Execute notebooks before converting them.",
)
def build(path_book, path_output, config, toc, execute):
    """Convert a collection of Jupyter Notebooks into HTML suitable for a book.
    """
    # Paths for our notebooks
    PATH_BOOK = Path(path_book).absolute()

    book_config = {}

    # Table of contents
    if toc is None:
        if PATH_BOOK.joinpath("_toc.yml").exists():
            toc = PATH_BOOK.joinpath("_toc.yml")
        else:
            raise ValueError(
                f"Couldn't find a Table of Contents file. To auto-generate one, run\n\n\tjupyter-book build {path_book}"
            )
    book_config["globaltoc_path"] = str(toc)

    # Configuration file
    if config is None:
        if PATH_BOOK.joinpath("_config.yml").exists():
            config = PATH_BOOK.joinpath("_config.yml")

    if config is not None:
        book_config["yaml_config_path"] = str(config)

    OUTPUT_PATH = path_output if path_output is not None else PATH_BOOK
    OUTPUT_PATH = Path(OUTPUT_PATH).joinpath("_build/html")

    # Now call the Sphinx commands to build
    build_sphinx(
        PATH_BOOK, OUTPUT_PATH, noconfig=True, confoverrides=book_config, builder="html"
    )


@main.command()
@click.argument("path-page")
@click.option("--path-output", default=None, help="Path to the output artifacts")
@click.option("--config", default=None, help="Path to the YAML configuration file")
@click.option("--execute", default=None, help="Whether to execute the notebook first")
def page(path_page, path_output, config, execute):
    """Convert a single notebook page to HTML or PDF.
    """
    # Paths for our notebooks
    PATH_PAGE = Path(path_page)
    PATH_PAGE_FOLDER = PATH_PAGE.parent.absolute()
    PAGE_NAME = PATH_PAGE.with_suffix("").name
    if config is None:
        config = ""
    if not execute:
        execute = "off"

    OUTPUT_PATH = path_output if path_output is not None else PATH_PAGE_FOLDER
    OUTPUT_PATH = Path(OUTPUT_PATH).joinpath("_build/html")

    # Find all files that *aren't* the page we're building and exclude them
    to_exclude = glob(str(PATH_PAGE_FOLDER.joinpath("**", "*")), recursive=True)
    to_exclude = [
        op.relpath(ifile, PATH_PAGE_FOLDER)
        for ifile in to_exclude
        if ifile != str(PATH_PAGE.absolute())
    ]
    to_exclude.extend(
        ["_build", "Thumbs.db", ".DS_Store", "**.ipynb_checkpoints",]
    )

    # Now call the Sphinx commands to build
    config = {
        "master_doc": PAGE_NAME,
        "yaml_config_path": config,
        "globaltoc_path": "",
        "exclude_patterns": to_exclude,
        "jupyter_execute_notebooks": execute,
        "html_theme_options": {"single_page": True},
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

    PATH_OUTPUT = Path(path_output)
    if PATH_OUTPUT.is_dir():
        raise ValueError(f"The output book already exists. Delete {path_output} first.")
    template_path = Path(__file__).parent.parent.joinpath("book_template")
    sh.copytree(template_path, PATH_OUTPUT)

    # Now copy the logo images
    PATH_IMAGE = Path(__file__).parent.parent.parent.joinpath(
        "docs", "images", "logo.png"
    )
    PATH_OUTPUT_IMAGES = PATH_OUTPUT.joinpath("images")
    PATH_OUTPUT_IMAGES.mkdir()
    sh.copy2(PATH_IMAGE, PATH_OUTPUT_IMAGES)
    print(f"Your book template can be found at {PATH_OUTPUT}")


@main.command()
@click.argument("path")
@click.option(
    "--filename_split_char",
    default="_",
    help="A character used to split file names for titles",
)
@click.option(
    "--skip_text",
    default=None,
    help="If this text is found in any files or folders, they will be skipped.",
)
@click.option(
    "--output-folder",
    default=None,
    help="A folder where the TOC will be written. Default is `path`",
)
def toc(path, filename_split_char, skip_text, output_folder):
    """Generate a _toc.yml file for your content folder (and sub-directories).
    The alpha-numeric name of valid conten files will be used to choose the
    order of pages/sections. If any file is called "index.{extension}", it will be
    chosen as the first file.
    """
    out_yaml = build_toc(path, filename_split_char, skip_text)
    if output_folder is None:
        output_folder = path
    output_file = Path(output_folder).joinpath("_toc.yml")
    output_file.write_text(out_yaml)
    print(f"Table of Contents written to {output_file}")
