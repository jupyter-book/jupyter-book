"""Build an online book using Jupyter Notebooks and Jekyll."""
from pathlib import Path
import os

# Load the version from the template Jupyter Book repository config
path_file = Path(__file__)
path_yml = path_file.parent.joinpath('book_template', '_config.yml')

# Read in the version *without* pyyaml because we can't assume it's installed
lines = path_yml.read_text().split('\n')
version = [line for line in lines if 'jupyter_book_version' in line]
version_line = [line for line in lines if 'jupyter_book_version' in line][0]
__version__ = version_line.split(' ')[-1].strip().strip('"')
