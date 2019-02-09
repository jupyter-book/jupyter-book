from subprocess import run
import sys
import os
import os.path as op
import shutil as sh
from glob import glob
import argparse
import string
from .create import new_book, upgrade_book
from .build import build_book
from .run import run_book
from .utils import print_message_box
from .toc import build_toc

DESCRIPTION = ("Jupyter Book: Generate an HTML book from your Jupyter Notebooks using Jekyll. Type `jupyter-book <command> -h` for help.")
commands = {'create': new_book,
            'build': build_book,
            'upgrade': upgrade_book,
            'run': run_book,
            'toc': build_toc}
parser = argparse.ArgumentParser(description=DESCRIPTION)
parser.add_argument("command", help="The command you'd like to run. Allowed commands: {}".format(list(commands.keys())))

def main():
    args = parser.parse_args(sys.argv[1:2])
    if args.command not in commands:
        parser.print_help()
        raise ValueError('Unrecognized command: {}\n See the help above for usage information'.format(args.command))

    # Run the command
    commands[args.command]()

if __name__ == "__main__":
    main()
