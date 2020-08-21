"""Defines the commands that the CLI will use."""
import sys
import os
import os.path as op
from pathlib import Path
import click
from glob import glob
import shutil as sh
import subprocess
from textwrap import dedent
from sphinx.util.osutil import cd
from sphinx.util import logging

from ..sphinx import build_sphinx, REDIRECT_TEXT
from ..toc import build_toc
from ..pdf import html_to_pdf
from ..utils import _message_box, _error, init_myst_file
from .. import __version__ as jbv
from sphinx_book_theme import __version__ as sbtv
from myst_nb import __version__ as mnbv
from myst_parser import __version__ as mpv
from jupyter_cache import __version__ as jcv

versions = {
    "Jupyter Book": jbv,
    "MyST-NB": mnbv,
    "Sphinx Book Theme": sbtv,
    "MyST-Parser": mpv,
    "Jupyter-Cache": jcv,
}
versions_string = "\n".join(f"{tt}: {vv}" for tt, vv in versions.items())
logger = logging.getLogger(__name__)


@click.group()
@click.version_option(message=versions_string)
def main():
    """Build and manage books with Jupyter."""
    pass


BUILDER_OPTS = {
    "html": "html",
    "pdfhtml": "singlehtml",
    "latex": "latex",
    "pdflatex": "latex",
}


@main.command()
@click.argument("path-source", type=click.Path(exists=True, file_okay=True))
@click.option("--path-output", default=None, help="Path to the output artifacts")
@click.option("--config", default=None, help="Path to the YAML configuration file")
@click.option("--toc", default=None, help="Path to the Table of Contents YAML file")
@click.option("-W", "--warningiserror", is_flag=True, help="Error on warnings.")
@click.option(
    "--builder",
    default="html",
    help="Which builder to use.",
    type=click.Choice(list(BUILDER_OPTS.keys())),
)
def build(path_source, path_output, config, toc, warningiserror, builder):
    """Convert your book's or page's content to HTML or a PDF."""

    # Paths for the notebooks
    PATH_SRC_FOLDER = Path(path_source).absolute()

    config_overrides = {}
    freshenv = False
    BUILD_PATH = (
        path_output if path_output is not None else find_config_path(PATH_SRC_FOLDER)
    )
    if not PATH_SRC_FOLDER.is_dir():
        # it is a single file
        build_type = "page"
        PATH_SRC = Path(path_source)
        PATH_SRC_FOLDER = PATH_SRC.parent.absolute()
        PAGE_NAME = PATH_SRC.with_suffix("").name
        BUILD_PATH = Path(BUILD_PATH).joinpath("_build", "_page", PAGE_NAME)

        # Find all files that *aren't* the page we're building and exclude them
        to_exclude = glob(str(PATH_SRC_FOLDER.joinpath("**", "*")), recursive=True)
        to_exclude = [
            op.relpath(ifile, PATH_SRC_FOLDER)
            for ifile in to_exclude
            if ifile != str(PATH_SRC.absolute())
        ]
        to_exclude.extend(["_build", "Thumbs.db", ".DS_Store", "**.ipynb_checkpoints"])

        # Now call the Sphinx commands to build
        config_overrides = {
            "master_doc": PAGE_NAME,
            "globaltoc_path": "",
            "exclude_patterns": to_exclude,
            "html_theme_options": {"single_page": True},
        }
    else:
        build_type = "book"
        PAGE_NAME = None
        BUILD_PATH = Path(BUILD_PATH).joinpath("_build")

        # Table of contents
        if toc is None:
            toc = PATH_SRC_FOLDER.joinpath("_toc.yml")
        else:
            toc = Path(toc)

        if not toc.exists():
            _error(
                "Couldn't find a Table of Contents file. To auto-generate "
                f"one, run\n\n\tjupyter-book toc {path_source}"
            )

        # Check whether the table of contents has changed. If so we rebuild all
        if toc and BUILD_PATH.joinpath(".doctrees").exists():
            toc_modified = toc.stat().st_mtime
            build_files = BUILD_PATH.rglob(".doctrees/*")
            build_modified = max([os.stat(ii).st_mtime for ii in build_files])

            # If the toc file has been modified after the build we need to force rebuild
            freshenv = toc_modified > build_modified

        config_overrides["globaltoc_path"] = str(toc)

        # Builder-specific overrides
        if builder == "pdfhtml":
            config_overrides["html_theme_options"] = {"single_page": True}

    # Configuration file
    path_config = config
    if path_config is None:
        # Check if there's a `_config.yml` file in the source directory
        if PATH_SRC_FOLDER.joinpath("_config.yml").exists():
            path_config = str(PATH_SRC_FOLDER.joinpath("_config.yml"))
    if path_config:
        if not Path(path_config).exists():
            raise ValueError(f"Config file path given, but not found: {path_config}")

    if builder in ["html", "pdfhtml"]:
        OUTPUT_PATH = BUILD_PATH.joinpath("html")
    elif builder in ["latex", "pdflatex"]:
        OUTPUT_PATH = BUILD_PATH.joinpath("latex")

    # Now call the Sphinx commands to build
    exc = build_sphinx(
        PATH_SRC_FOLDER,
        OUTPUT_PATH,
        noconfig=True,
        path_config=path_config,
        confoverrides=config_overrides,
        builder=BUILDER_OPTS[builder],
        warningiserror=warningiserror,
        freshenv=freshenv,
    )

    builder_specific_actions(exc, builder, OUTPUT_PATH, build_type, PAGE_NAME)


@main.command()
@click.argument("path-book", type=click.Path(file_okay=False, exists=False))
def create(path_book):
    """Create a simple Jupyter Book that you can customize."""
    book = Path(path_book)
    template_path = Path(__file__).parent.parent.joinpath("book_template")
    sh.copytree(template_path, book)
    _message_box(f"Your book template can be found at\n\n    {book}{os.sep}")


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
@click.option(
    "--add-titles",
    is_flag=True,
    help="Whether to generate page titles from file names.",
)
def toc(path, filename_split_char, skip_text, output_folder, add_titles):
    """Generate a _toc.yml file for your content folder.
    It also generates a _toc.yml file for sub-directories.
    The alpha-numeric name of valid content files will be used to choose the
    order of pages/sections. If any file is called "index.{extension}", it will be
    chosen as the first file. Note that each folder must have at least one content file
    in it.
    """
    out_yaml = build_toc(path, filename_split_char, skip_text, add_titles)
    if output_folder is None:
        output_folder = path
    output_file = Path(output_folder).joinpath("_toc.yml")
    output_file.write_text(out_yaml, encoding="utf8")

    _message_box(f"Table of Contents written to {output_file}")


@main.command()
@click.argument("path-book")
@click.option("-a", "--all", "all_", is_flag=True, help="Remove build directory.")
@click.option("--html", is_flag=True, help="Remove html directory.")
@click.option("--latex", is_flag=True, help="Remove latex directory.")
def clean(path_book, all_, html, latex):
    """Empty the _build directory except jupyter_cache.
    If the all option has been flagged, it will remove the entire _build. If html/latex
    option is flagged, it will remove the html/latex subdirectories."""

    def remove_option(path, option, rm_both=False):
        """Remove folder specified under option. If rm_both is True, remove folder and
        skip message_box."""
        option_path = path.joinpath(option)
        if not option_path.is_dir():
            return

        sh.rmtree(option_path)
        if not rm_both:
            _message_box(f"Your {option} directory has been removed")

    def remove_html_latex(path):
        """Remove both html and latex folders."""
        print_msg = False
        for opt in ["html", "latex"]:
            if path.joinpath(opt).is_dir():
                print_msg = True
            remove_option(path, opt, True)

        if print_msg:
            _message_box("Your html and latex directories have been removed")

    def remove_all(path):
        """Remove _build directory entirely."""
        sh.rmtree(path)
        _message_box("Your _build directory has been removed")

    def remove_default(path):
        """Remove all subfolders in _build except .jupyter_cache."""
        to_remove = [
            dd for dd in path.iterdir() if dd.is_dir() and dd.name != ".jupyter_cache"
        ]
        for dd in to_remove:
            sh.rmtree(path.joinpath(dd.name))
        _message_box("Your _build directory has been emptied except for .jupyter_cache")

    PATH_OUTPUT = Path(path_book).absolute()
    if not PATH_OUTPUT.is_dir():
        _error(f"Path to book isn't a directory: {PATH_OUTPUT}")

    build_path = PATH_OUTPUT.joinpath("_build")
    if not build_path.is_dir():
        return

    if all_:
        remove_all(build_path)
    elif html and latex:
        remove_html_latex(build_path)
    elif html:
        remove_option(build_path, "html")
    elif latex:
        remove_option(build_path, "latex")
    else:
        remove_default(build_path)


@main.group()
def myst():
    """Manipulate MyST markdown files."""
    pass


@myst.command()
@click.argument("path", nargs=-1, type=click.Path(exists=True, dir_okay=False))
@click.option(
    "--kernel", help="The name of the Jupyter kernel to attach to this markdown file."
)
def init(path, kernel):
    """Add Jupytext metadata for your markdown file(s), with optional Kernel name.
    """
    for ipath in path:
        init_myst_file(ipath, kernel, verbose=True)


# utility functions


def find_config_path(path):
    if path.is_dir():
        current_dir = path
    else:
        current_dir = path.parent

    root_dir = current_dir.root
    while str(current_dir) != root_dir:
        config_file = str(current_dir) + "/_config.yml"
        if os.path.isfile(config_file):
            return current_dir
        current_dir = current_dir.parent
    if not path.is_dir():
        return path.parent
    return path


def builder_specific_actions(exc, builder, output_path, cmd_type, page_name=None):
    if exc:
        _error(
            f"There was an error in building your {cmd_type}. "
            "Look above for the error message."
        )
    else:
        # Builder-specific options
        if builder == "html":
            path_output_rel = Path(op.relpath(output_path, Path()))
            if cmd_type == "page":
                path_page = path_output_rel.joinpath(f"{page_name}.html")
                # Write an index file if it doesn't exist so we get redirects
                path_index = path_output_rel.joinpath("index.html")
                if not path_index.exists():
                    path_index.write_text(
                        REDIRECT_TEXT.format(first_page=path_page.name)
                    )

                _message_box(
                    dedent(
                        f"""
                        Page build finished.
                            Your page folder is: {path_page.parent}{os.sep}
                            Open your page at: {path_page}
                        """
                    )
                )

            elif cmd_type == "book":
                path_output_rel = Path(op.relpath(output_path, Path()))
                path_index = path_output_rel.joinpath("index.html")
                _message_box(
                    f"""\
                Finished generating HTML for {cmd_type}.
                Your book's HTML pages are here:
                    {path_output_rel}{os.sep}
                You can look at your book by opening this file in a browser:
                    {path_index}
                Or paste this line directly into your browser bar:
                    file://{path_index.resolve()}\
                """
                )
        if builder == "pdfhtml":
            print(f"Finished generating HTML for {cmd_type}...")
            print(f"Converting {cmd_type} HTML into PDF...")
            path_pdf_output = output_path.parent.joinpath("pdf")
            path_pdf_output.mkdir(exist_ok=True)
            if cmd_type == "book":
                path_pdf_output = path_pdf_output.joinpath("book.pdf")
                html_to_pdf(output_path.joinpath("index.html"), path_pdf_output)
            elif cmd_type == "page":
                path_pdf_output = path_pdf_output.joinpath(page_name + ".pdf")
                html_to_pdf(output_path.joinpath(page_name + ".html"), path_pdf_output)
            path_pdf_output_rel = Path(op.relpath(path_pdf_output, Path()))
            _message_box(
                f"""\
            Finished generating PDF via HTML for {cmd_type}. Your PDF is here:
                {path_pdf_output_rel}\
            """
            )
        if builder == "pdflatex":
            print(f"Finished generating latex for {cmd_type}...")
            print(f"Converting {cmd_type} latex into PDF...")
            # Convert to PDF via tex and template built Makefile and make.bat
            if sys.platform == "win32":
                makecmd = os.environ.get("MAKE", "make.bat")
            else:
                makecmd = os.environ.get("MAKE", "make")
            try:
                with cd(output_path):
                    output = subprocess.run([makecmd, "all-pdf"])
                    if output.returncode != 0:
                        _error("Error: Failed to build pdf")
                        return output.returncode
                _message_box(
                    f"""\
                A PDF of your {cmd_type} can be found at:
                    {output_path}
                """
                )
            except OSError:
                _error("Error: Failed to run: %s" % makecmd)
                return 1
