import sys
import argparse

from jupyter_book.run import run_book

DESCRIPTION = ("Execute all of the notebooks in a specified folder.")


def run():
    parser = argparse.ArgumentParser(description=DESCRIPTION)
    parser.add_argument("path_content",
                        help="The path to a folder with Jupyter Notebooks"
                             " inside that you'd like to run.")
    parser.add_argument("--kernel-name", default="python3",
                        help="The name of the kernel used to run the notebook"
                             " code.")
    args = parser.parse_args(sys.argv[2:])
    path = args.path_content
    kernel_name = args.kernel_name
    run_book(path, kernel_name)
