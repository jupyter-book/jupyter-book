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


@click.group()
@click.version_option(message=versions_string)
def main():
    """Build and manage books with Jupyter."""
    pass


BUILDER_OPTIONS = ["html", "pdfhtml", "linkcheck", "latex", "pdflatex"]


@main.command()
@click.argument("path-book")
@click.option("--path-output", default=None, help="Path to the output artifacts")
@click.option("--config", default=None, help="Path to the YAML configuration file")
@click.option("--toc", default=None, help="Path to the Table of Contents YAML file")
@click.option("-W", "--warningiserror", is_flag=True, help="Error on warnings.")
@click.option(
    "--builder",
    default="html",
    help="Which builder to use. Must be one of {BUILDER_OPTIONS}",
)
def build(path_book, path_output, config, toc, warningiserror, builder):
    """Convert your book's content to HTML or a PDF."""
    # Paths for our notebooks
    PATH_BOOK = Path(path_book).absolute()
    if not PATH_BOOK.is_dir():
        _error(f"Path to book isn't a directory: {PATH_BOOK}")

    # `book_config` is manual over-rides, `config` is the path to a _config.yml file
    book_config = {}

    # Choose sphinx builder
    builder_dict = {
        "html": "html",
        "linkcheck": "linkcheck",
        "pdfhtml": "singlehtml",
        "latex": "latex",
        "pdflatex": "latex",
    }
    if builder not in builder_dict.keys():
        allowed_keys = tuple(builder_dict.keys())
        _error(f"Value for --builder must be one of {allowed_keys}. Got '{builder}'")
    sphinx_builder = builder_dict[builder]

    # Table of contents
    if toc is None:
        toc = PATH_BOOK.joinpath("_toc.yml")
    else:
        toc = Path(toc)

    if not toc.exists():
        _error(
            "Couldn't find a Table of Contents file. To auto-generate "
            f"one, run\n\n\tjupyter-book toc {path_book}"
        )
    book_config["globaltoc_path"] = str(toc)

    # Configuration file
    path_config = config
    if path_config is None:
        # Check if there's a `_config.yml` file in the source directory
        if PATH_BOOK.joinpath("_config.yml").exists():
            path_config = str(PATH_BOOK.joinpath("_config.yml"))
    if path_config:
        if not Path(path_config).exists():
            raise ValueError(f"Config file path given, but not found: {path_config}")

    # Builder-specific overrides
    if builder == "pdfhtml":
        book_config["html_theme_options"] = {"single_page": True}

    BUILD_PATH = path_output if path_output is not None else PATH_BOOK
    BUILD_PATH = Path(BUILD_PATH).joinpath("_build")
    if builder in ["html", "pdfhtml", "linkcheck"]:
        OUTPUT_PATH = BUILD_PATH.joinpath("html")
    elif builder in ["latex", "pdflatex"]:
        OUTPUT_PATH = BUILD_PATH.joinpath("latex")

    # Check whether the table of contents has changed. If so we rebuild all
    freshenv = False
    if toc and BUILD_PATH.joinpath(".doctrees").exists():
        toc_modified = toc.stat().st_mtime
        build_files = BUILD_PATH.rglob(".doctrees/*")
        build_modified = max([os.stat(ii).st_mtime for ii in build_files])

        # If the toc file has been modified after the build we need to force rebuild
        freshenv = toc_modified > build_modified

    # Now call the Sphinx commands to build
    exc = build_sphinx(
        PATH_BOOK,
        OUTPUT_PATH,
        noconfig=True,
        path_config=path_config,
        confoverrides=book_config,
        builder=sphinx_builder,
        warningiserror=warningiserror,
        freshenv=freshenv,
    )

    if exc:
        if builder == "linkcheck":
            _error(
                "The link checker either didn't finish or found broken links.\n"
                "See the report above."
            )
        else:
            _error(
                "There was an error in building your book. "
                "Look above for the error message."
            )
    else:
        # Builder-specific options
        if builder == "html":
            path_output_rel = Path(op.relpath(OUTPUT_PATH, Path()))
            path_index = path_output_rel.joinpath("index.html")
            _message_box(
                f"""\
            Finished generating HTML for book.

            Your book's HTML pages are here:
                {path_output_rel}{os.sep}

            You can look at your book by opening this file in a browser:
                {path_index}

            Or paste this line directly into your browser bar:
                file://{path_index.resolve()}\
            """
            )
        if builder == "linkcheck":
            _message_box("All links in your book are valid. See above for details.")
        if builder == "pdfhtml":
            print("Finished generating HTML for book...")
            print("Converting book HTML into PDF...")
            path_pdf_output = OUTPUT_PATH.parent.joinpath("pdf")
            path_pdf_output.mkdir(exist_ok=True)
            path_pdf_output = path_pdf_output.joinpath("book.pdf")
            html_to_pdf(OUTPUT_PATH.joinpath("index.html"), path_pdf_output)
            path_pdf_output_rel = Path(op.relpath(path_pdf_output, Path()))
            _message_box(
                f"""\
            Finished generating PDF via HTML for book. Your PDF is here:

                {path_pdf_output_rel}\
            """
            )
        if builder == "pdflatex":
            print("Finished generating latex for book...")
            print("Converting book latex into PDF...")
            # Convert to PDF via tex and template built Makefile and make.bat
            if sys.platform == "win32":
                makecmd = os.environ.get("MAKE", "make.bat")
            else:
                makecmd = os.environ.get("MAKE", "make")
            try:
                with cd(OUTPUT_PATH):
                    output = subprocess.run([makecmd, "all-pdf"])
                    if output.returncode != 0:
                        _error("Error: Failed to build pdf")
                        return output.returncode
                _message_box(
                    f"""\
                A PDF of your book can be found at:

                    {OUTPUT_PATH}
                """
                )
            except OSError:
                _error("Error: Failed to run: %s" % makecmd)
                return 1


@main.command()
@click.argument("path-page")
@click.option("--path-output", default=None, help="Path to the output artifacts")
@click.option("--config", default=None, help="Path to the YAML configuration file")
@click.option(
    "--execute/--no-execute",
    default=True,
    help="Whether to execute the notebook. Default is --execute",
)
def page(path_page, path_output, config, execute):
    """Convert a single content file to HTML or PDF.
    """
    # Paths for our notebooks
    PATH_PAGE = Path(path_page)
    PATH_PAGE_FOLDER = PATH_PAGE.parent.absolute()
    PAGE_NAME = PATH_PAGE.with_suffix("").name
    if config is None:
        config = ""

    # Page command ignores book-level execution config options: page is either
    # executed or not as dictated by command line option. Default is execute.
    jupyter_execute_notebooks = "force"
    if not execute:
        jupyter_execute_notebooks = "off"

    OUTPUT_PATH = path_output if path_output is not None else PATH_PAGE_FOLDER
    OUTPUT_PATH = Path(OUTPUT_PATH).joinpath("_build/html")

    # Find all files that *aren't* the page we're building and exclude them
    to_exclude = glob(str(PATH_PAGE_FOLDER.joinpath("**", "*")), recursive=True)
    to_exclude = [
        op.relpath(ifile, PATH_PAGE_FOLDER)
        for ifile in to_exclude
        if ifile != str(PATH_PAGE.absolute())
    ]
    to_exclude.extend(["_build", "Thumbs.db", ".DS_Store", "**.ipynb_checkpoints"])

    # Now call the Sphinx commands to build
    config_overrides = {
        "master_doc": PAGE_NAME,
        "globaltoc_path": "",
        "exclude_patterns": to_exclude,
        "jupyter_execute_notebooks": jupyter_execute_notebooks,
        "html_theme_options": {"single_page": True},
    }

    build_sphinx(
        PATH_PAGE_FOLDER,
        OUTPUT_PATH,
        path_config=config,
        noconfig=True,
        confoverrides=config_overrides,
        builder="html",
    )

    path_output_rel = Path(op.relpath(OUTPUT_PATH, Path()))
    path_page = path_output_rel.joinpath(f"{PAGE_NAME}.html")

    # Write an index file if it doesn't exist so we get redirects
    path_index = path_output_rel.joinpath("index.html")
    if not path_index.exists():
        path_index.write_text(REDIRECT_TEXT.format(first_page=path_page.name))

    _message_box(
        dedent(
            f"""
            Page build finished.

                Your page folder is: {path_page.parent}{os.sep}
                Open your page at: {path_page}
            """
        )
    )


@main.command()
@click.argument("path-book")
def create(path_book):
    """Create a simple Jupyter Book that you can customize."""

    PATH_OUTPUT = Path(path_book)
    if PATH_OUTPUT.is_dir():
        _error(f"The output book already exists. Delete {PATH_OUTPUT}{os.sep} first.")
    template_path = Path(__file__).parent.parent.joinpath("book_template")
    sh.copytree(template_path, PATH_OUTPUT)
    _message_box(f"Your book template can be found at\n\n    {PATH_OUTPUT}{os.sep}")


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
