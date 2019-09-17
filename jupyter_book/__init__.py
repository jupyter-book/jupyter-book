"""Build an online book using Jupyter Notebooks and Jekyll."""
import yaml
import os.path as op
import os

# Load the version from the template Jupyter Book repository config
path_yml = op.join(op.dirname(__file__), 'book_template', '_config.yml')
with open(path_yml, 'r') as ff:
    __version__ = yaml.safe_load(ff.read()).get(
        "jupyter_book_version"
    )
