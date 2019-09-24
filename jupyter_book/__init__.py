"""Build an online book using Jupyter Notebooks and Jekyll."""
import os.path as op
import os

# Load the version from the template Jupyter Book repository config
path_yml = op.join(op.dirname(__file__), 'book_template', '_config.yml')
with open(path_yml, 'r') as ff:
    # Read in the version *without* pyyaml because we can't assume it's installed
    lines = ff.readlines()

version = [line for line in lines if 'jupyter_book_version' in line]
version_line = [line for line in lines if 'jupyter_book_version' in line][0]
__version__ = version_line.split(' ')[-1].strip().strip('"')
