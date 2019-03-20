import sys
import os.path as op

import argparse

from jupyter_book.create import new_book


def create():
    parser = argparse.ArgumentParser(description="Create a new Jupyter Book")
    parser.add_argument(
        "name", help="The name of your Jupyter Book "
                     "(your book template will be placed in a "
                     "folder of this name)")
    parser.add_argument("--out-folder", default='.',
                        help="The location where your book will be placed")
    parser.add_argument("--license", default=None,
                        help="A path to a LICENSE.md file if you "
                             "have already created one")
    parser.add_argument("--content-folder", default=None,
                        help="A path to a folder that holds your book content")
    parser.add_argument("--toc", default=None,
                        help="A path to a yaml file that contains a"
                             " Table of Contents for your Jupyter Book."
                             " This will overwrite parts of the book "
                             "template's default toc.yml configuration")
    msg = ("A path to a configuration YAML file that contains "
           "configuration for your Jupyter Book. This will overwrite"
           " parts of the book template's default _config.yml configuration")
    parser.add_argument("--config", default=None,
                        help=msg)
    msg = ("A path to a CSS file that defines some custom CSS rules for"
           " your book")
    parser.add_argument("--custom-css", default=None, help=msg)
    parser.add_argument("--custom-js", default=None,
                        help="A path to a JS file that defines some "
                             "custom CSS rules for your book")
    parser.add_argument("--extra-files", default=None, nargs="+",
                        help="A list of extra files / folders to copy"
                             " into your book's directory")
    parser.add_argument("--overwrite", default=False, action="store_true",
                        help="Whether to overwrite a pre-existing book"
                             " if it exists")
    msg = ("Whether to build the book with demo content instead of your"
           " own content")
    parser.add_argument("--demo", default=False, action="store_true",
                        help=msg)
    parser.add_argument("--verbose", default=True, action="store_true",
                        help="Whether to display output information. [yes/no]")
    args = parser.parse_args(sys.argv[2:])

    ###############################################
    # Default values and arguments
    path_out = op.join(args.out_folder, args.name)
    content_folder = args.content_folder
    toc = args.toc
    config = args.config
    demo = args.demo
    license = args.license
    custom_css, custom_js = args.custom_css, args.custom_js
    extra_files = args.extra_files
    verbose = args.verbose
    overwrite = args.overwrite

    new_book(path_out, content_folder, toc,
             license, custom_css, custom_js, config, extra_files,
             demo, verbose, overwrite)
