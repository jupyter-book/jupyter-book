"""Generate a Table of Contents YAML file for a collection of files/folders."""
import argparse
import os.path as op
import sys
from ..utils import print_message_box
from ..toc import build_toc

DESCRIPTION = (
    "Generate a Table of Contents YAML file for a collection of files/folders."
)
parser = argparse.ArgumentParser(description=DESCRIPTION)
parser.add_argument("path_book", help="The path to a Jupyter Book.")
parser.add_argument(
    "--quiet",
    default=False,
    action="store_true",
    help="Whether to suppress the final message box.",
)
parser.add_argument(
    "--filename_split_char",
    default="_",
    help="The character used to split words in the file name. Used to generate titles from file names. Defaults to '_'",
)
parser.add_argument(
    "--overwrite",
    default=False,
    action="store_true",
    help="Overwrite SUMMARY.md if it already exists.",
)


def toc():
    args = parser.parse_args(sys.argv[2:])
    path_book = args.path_book
    path_content = op.join(path_book, "content")
    path_toc = op.join(path_book, "_data", "toc.yml")

    # Build the TOC
    gen_toc = build_toc(path_content, filename_split_char=args.filename_split_char)

    if op.exists(path_toc) and args.overwrite is False:
        raise ValueError(
            "Table of Contents already exists. Use `--overwrite` to over-write the pre-existing TOC"
        )

    with open(path_toc, "w") as ff:
        ff.write(gen_toc)

    # Optional end message
    msg = [
        "Finished generating your table of contents file at: {}".format(path_toc),
        "",
        "This file contains a flat list of TOC entries that point to",
        "the content in the folder you specified, they've been ordered",
        "according to the folder / file names.  You should reorder them",
        "as well as nest them in chapters / sub-chapters as you wish.",
    ]

    if not args.quiet:
        print_message_box("\n".join(msg))
