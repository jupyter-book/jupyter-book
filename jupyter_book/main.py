from subprocess import run
import sys
import os
import os.path as op
import shutil as sh
from glob import glob
import argparse
import string
from jupyter_book.create import new_book

DESCRIPTION = ("Jupyter Book: Generate an HTML book from your Jupyter Notebooks using Jekyll.")
parser = argparse.ArgumentParser(description=DESCRIPTION)
parser.add_argument("command", help="The command you'd like to run. Currently, this must be 'create'")

def main():
    commands = {'create': new_book}
    args = parser.parse_args(sys.argv[1:2])
    if args.command not in commands:
        parser.print_help()
        raise ValueError('Unrecognized command: {}\n See the help above for usage information'.format(args.command))

    # Run the command
    commands[args.command]()

if __name__ == "__main__":
    main()
