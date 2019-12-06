import sys
import argparse

from jupyter_book.create import upgrade_book


def upgrade():
    parser = argparse.ArgumentParser(
        description="Upgrade a book to the latest Jupyter Book version. "
                    "This will retain your content and configuration, and upgrade "
                    "the surrounding HTML/CSS/JS and jupyter book code.")
    parser.add_argument(
        "path_book", help="Path to the root of the book "
                          "repository you'd like to upgrade.")
    parser.add_argument(
        "--extra-files", help="A comma-separated string of paths to extra files to include "
                              "in the upgrade. If these files would normally be over-written by a "
                              "update to Jupyter Book, they will not. If these files are not part "
                              "of the default Jupyter Book structure, they will be included in the "
                              "updated book.")
    args = parser.parse_args(sys.argv[2:])
    path_book = args.path_book.rstrip('/')
    extra_files = args.extra_files.split(',') if args.extra_files else None
    upgrade_book(path_book, extra_files=extra_files)
