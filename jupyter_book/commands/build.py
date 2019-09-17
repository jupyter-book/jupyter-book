import sys
import os.path as op

import argparse

from ..build import build_book
from ..page import build_page

DESCRIPTION = ("Convert a collection of Jupyter Notebooks into HTML "
               "suitable for a course textbook.")

DESCRIPTION_PAGE = ("Convert a single Jupyter Notebook into HTML.")


def build():
    parser = argparse.ArgumentParser(description=DESCRIPTION)
    parser.add_argument(
        "path_book", help="Path to the root of the book repository.")
    parser.add_argument("--template", default=None,
                        help="Path to the template nbconvert uses"
                             " to build markdown files")
    parser.add_argument("--config", default=None,
                        help="Path to the Jekyll configuration file")
    parser.add_argument("--toc", default=None,
                        help="Path to the Table of Contents YAML file")
    parser.add_argument("--overwrite", action='store_true',
                        help="Overwrite md files if they already exist.")
    parser.add_argument("--execute", action='store_true',
                        help="Execute notebooks before converting them.")
    parser.add_argument("--local-build", action='store_true',
                        help="Specify you are building site locally"
                             " for later upload.")
    parser.set_defaults(overwrite=False, execute=False)

    ###############################################
    # Default values and arguments

    args = parser.parse_args(sys.argv[2:])
    overwrite = bool(args.overwrite)
    execute = bool(args.execute)

    # Paths for our notebooks
    PATH_BOOK = op.abspath(args.path_book)

    PATH_TOC_YAML = args.toc if args.toc is not None else op.join(
        PATH_BOOK, '_data', 'toc.yml')
    CONFIG_FILE = args.config if args.config is not None else op.join(
        PATH_BOOK, '_config.yml')
    PATH_TEMPLATE = args.template if args.template is not None else op.join(
        PATH_BOOK, 'scripts', 'templates', 'html.tpl')

    local_build = args.local_build

    build_book(PATH_BOOK, PATH_TOC_YAML, CONFIG_FILE,
               PATH_TEMPLATE, local_build, execute, overwrite)


def page():
    parser = argparse.ArgumentParser(description=DESCRIPTION_PAGE)
    parser.add_argument(
        "path_ntbk", help="Path to the notebook you'll convert.")
    parser.add_argument(
        "path_html_output", help="Path to the folder where HTML will be placed.")
    parser.add_argument("template", help="Path to a template to render the HTML")
    parser.add_argument("--path_media_output", default=None,
                        help="The path to where images should be extracted")
    parser.add_argument("--execute", action='store_true', help="Execute the notebook before converting")
    parser.set_defaults(execute=False)

    ###############################################
    # Default values and arguments

    args = parser.parse_args(sys.argv[2:])
    execute = bool(args.execute)

    # Paths for our notebooks
    PATH_PAGE = op.abspath(args.path_ntbk)
    PATH_HTML_OUTPUT = op.abspath(args.path_html_output)
    PATH_MEDIA_OUTPUT = args.path_media_output if args.path_media_output is not None else PATH_HTML_OUTPUT

    # Choose the template we'll use
    path_template = op.abspath(args.template)

    build_page(PATH_PAGE, PATH_HTML_OUTPUT, PATH_MEDIA_OUTPUT,
               execute, path_template)
