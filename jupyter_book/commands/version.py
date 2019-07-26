import argparse
from jupyter_book import __version__
import sys


def version():
    parser = argparse.ArgumentParser(
        description="Print the version of Jupyter Book currently in-use.")
    # Args won't be used, just keeping so we don't break PEP
    parser.parse_args(sys.argv)
    print("Running Jupyter Book version: {}".format(__version__))
