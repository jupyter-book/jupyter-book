import sys
import os.path as op

import argparse

from jupyter_book.report import new_report

def report():
    parser = argparse.ArgumentParser(description="Generate a report from a jupyter notebook")
    parser.add_argument('path_notebook', help="The path to a Jupyter Notebook")
    parser.add_argument('--path-output', help="The path to the output report")
    parser.add_argument('--css',default=None, help="A path to custom CSS to include with the report")
    parser.add_argument('--js', default=None, help="A path to custom JavaScript to include with the report")
    parser.add_argument("--overwrite", default=False, action="store_true", help="Whether to overwrite a pre-existing report if it exists")

    # Parse inputs
    args = parser.parse_args(sys.argv[2:])
    path_notebook = args.path_notebook
    path_output_report = op.basename(path_notebook).replace('.ipynb', '') if args.path_output is None else args.path_output

    new_report(path_notebook, path_output_report, args.css, args.js, args.overwrite)