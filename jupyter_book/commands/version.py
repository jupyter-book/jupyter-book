import sys
import argparse
from jupyter_book import __version__

def version():
    parser = argparse.ArgumentParser(
        description="Print the version of Jupyter Book currently in-use.")

    print("Running Jupyter Book version: {}".format(__version__))