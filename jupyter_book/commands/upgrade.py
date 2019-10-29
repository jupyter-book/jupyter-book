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
    args = parser.parse_args(sys.argv[2:])
    path_book = args.path_book.rstrip('/')
    upgrade_book(path_book)
