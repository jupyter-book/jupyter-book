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
        "-o", "--path_html_output", default='.', help="Path to the folder where HTML will be placed.")
    parser.add_argument("--custom-css", default=None, help="Path to a custom CSS file")
    parser.add_argument("--custom-js", default=None, help="Path to a custom JS file")

    parser.add_argument("--path_media_output", default=None,
                        help="The path to where images should be extracted")
    parser.add_argument("--execute", action='store_true', help="Execute the notebook before converting")
    parser.add_argument("--no-head", action='store_true', help="Do not add a <head> to the output page HTML")
    parser.set_defaults(execute=False, no_head=False)

    ###############################################
    # Default values and arguments

    args = parser.parse_args(sys.argv[2:])
    custom_css = args.custom_css
    custom_js = args.custom_js

    if custom_css:
        if not op.exists(custom_css):
            raise ValueError(f"Could not find custom CSS file {custom_css}")
        else:
            with open(custom_css, 'r') as ff:
                custom_css = ff.read()

    if custom_js:
        if not op.exists(custom_js):
            raise ValueError(f"Could not find custom JS file {custom_js}")
        else:
            with open(custom_js, 'r') as ff:
                custom_js = ff.read()

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
    name = op.splitext(op.basename(PATH_PAGE))[0]
    html, resources = page_html(
        ntbk, path_media_output=PATH_MEDIA_OUTPUT, execute_dir=execute_dir, name=name
    )

    # Write to disk as a standalone HTML page
    standalone = not args.no_head
    path_html = write_page(html, PATH_HTML_OUTPUT, resources, standalone=standalone,
                           custom_css=custom_css, custom_js=custom_js)
    print(f"HTML created at: {path_html}")
