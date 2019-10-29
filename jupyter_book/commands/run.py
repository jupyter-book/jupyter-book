import sys
import argparse

from jupyter_book.utils import run_pages

DESCRIPTION = "Execute pages for your book in-place."


def run():
    parser = argparse.ArgumentParser(description=DESCRIPTION)
    parser.add_argument(
        "path_content",
        help=(
            "The path to the content you'd like to run. If a path "
            "to a notebook, this notebook will be run in-place. "
            "If a path to a folder, this function will search for "
            "any notebook files *inside* the folder/subfolders and run them."
        ),
    )
    parser.add_argument(
        "--kernel-name",
        default="python3",
        help=(
            "The name of the kernel used to run the notebook code. If not provided, "
            "the kernel will be inferred from the notebook's metadata."
        ),
    )
    args = parser.parse_args(sys.argv[2:])
    path = args.path_content
    kernel_name = args.kernel_name
    run_pages(path, kernel_name)
