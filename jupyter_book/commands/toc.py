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
    "--path-output",
    default=None,
    help="A path to a file where the output TOC will be written.",
)


def toc():
    args = parser.parse_args(sys.argv[2:])
    path_book = args.path_book
    path_content = op.join(path_book, "content")
    path_output = args.path_output

    # Build the TOC
    gen_toc = build_toc(path_content, filename_split_char=args.filename_split_char)

    if path_output is not None:
        with open(path_output, "w") as ff:
            ff.write(gen_toc)

        # Optional end message
        msg = [
            "Finished generating your table of contents file at: {}".format(path_output),
            "",
            "This file contains a flat list of TOC entries that point to",
            "the content in the folder you specified, they've been ordered",
            "according to the folder / file names.  You should reorder them",
            "as well as nest them in chapters / sub-chapters as you wish.",
        ]

        if not args.quiet:
            print_message_box("\n".join(msg))
    else:
        print(gen_toc)
