"""Execute all of the notebooks in a folder. This is helpful if you wish
to ensure that all of your notebooks run, and that the output
contained in the notebook files is up-to-date."""
from subprocess import run
import argparse
import os.path as op
import sys
from .utils import print_message_box

DESCRIPTION = ("Execute all of the notebooks in a specified folder.")
parser = argparse.ArgumentParser(description=DESCRIPTION)
parser.add_argument("path_book", help="The path to a Jupyter Book.")
parser.add_argument("--quiet", default=False, action="store_true",
                    help="Whether to suppress the final message box.")


def build_toc():
    args = parser.parse_args(sys.argv[2:])
    path_book = args.path_book
    path_content = op.join(path_book, 'content')
    path_toc = op.join(path_book, '_data', 'toc.yml')

    # Build the TOC
    toc_script = op.join(op.dirname(__file__), 'scripts', 'generate_toc.py')
    run(['python', toc_script, path_content, '--out_path',
         path_toc, '--overwrite'], check=True)

    # Optional end message
    msg = ["Finished generating your table of contents file at: {}".format(path_toc),
           "",
           "This file contains a flat list of TOC entries that point to",
           "the content in the folder you specified, they've been ordered",
           "according to the folder / file names.  You should reorder them",
           "as well as nest them in chapters / sub-chapters as you wish."]

    if not args.quiet:
        print_message_box('\n'.join(msg))
