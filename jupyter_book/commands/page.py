"""A CLI for building a single page of a book."""
import sys
import os.path as op
import jupytext as jpt

import argparse

from ..page import page_html, write_page


DESCRIPTION = ("Convert a single Jupyter Notebook into HTML.")


def page():
    parser = argparse.ArgumentParser(description=DESCRIPTION)
    parser.add_argument(
        "path_ntbk", help="Path to the notebook you'll convert.")
    parser.add_argument(
        "--path_html_output", default='.', help="Path to the folder where HTML will be placed.")
    parser.add_argument("--template", default=None, help="Path to a template to render the HTML")
    parser.add_argument("--path_media_output", default=None,
                        help="The path to where images should be extracted")
    parser.add_argument("--execute", action='store_true', help="Execute the notebook before converting")
    parser.set_defaults(execute=False)

    ###############################################
    # Default values and arguments

    args = parser.parse_args(sys.argv[2:])

    # Paths for our notebooks
    PATH_PAGE = op.abspath(args.path_ntbk)
    PATH_HTML_OUTPUT = op.abspath(args.path_html_output)
    PATH_MEDIA_OUTPUT = args.path_media_output

    if bool(args.execute) is True:
        execute_dir = op.dirname(PATH_PAGE)
    else:
        execute_dir = None

    # If a media output folder is given, set the nbconvert media path relative to the HTML output
    if PATH_MEDIA_OUTPUT is not None:
        PATH_MEDIA_OUTPUT = op.relpath(PATH_MEDIA_OUTPUT, PATH_HTML_OUTPUT)

    # Load and convert the notebook
    ntbk = jpt.read(PATH_PAGE)
    html, resources = page_html(
        ntbk, path_media_output=PATH_MEDIA_OUTPUT, execute_dir=execute_dir,
    )

    # Write to disk as a standalone HTML page
    path_html = write_page(html, PATH_HTML_OUTPUT, resources, standalone=True)
    print(f"HTML created at: {path_html}")
