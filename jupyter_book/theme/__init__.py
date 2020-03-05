"""A lightweight extension of the pydata bootstrap theme"""
import os
from pathlib import Path
import sphinx.builders.html
import docutils


def get_html_theme_path():
    """Return list of HTML theme paths."""
    theme_path = str(Path(__file__).parent.absolute())
    return theme_path


def setup(app):
    from pandas_sphinx_theme import setup
    setup(app)

    app.add_html_theme("jupyter_book_theme", get_html_theme_path())
