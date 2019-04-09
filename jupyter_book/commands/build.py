import sys
import os.path as op

import argparse

from jupyter_book.build import build_book

DESCRIPTION = ("Convert a collection of Jupyter Notebooks into Jekyll "
               "markdown suitable for a course textbook.")


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
                        help="Execute notebooks before converting to MD.")
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
        PATH_BOOK, 'scripts', 'templates', 'jekyllmd.tpl')

    local_build = args.local_build

    build_book(PATH_BOOK, PATH_TOC_YAML, CONFIG_FILE,
               PATH_TEMPLATE, local_build, execute, overwrite)
