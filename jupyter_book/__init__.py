"""Build an online book using Jupyter Notebooks and Jekyll."""
from pathlib import Path
import os
from pandas_sphinx_theme import setup as pandas_setup
from .toc import update_indexname, add_toctree
from .yaml import add_yaml_config

__version__ = "0.0.1dev0"


def get_html_theme_path():
    """Return list of HTML theme paths."""
    theme_path = str(Path(__file__).parent.joinpath("theme").absolute())
    return theme_path


def add_static_path(app):
    static_path = Path(__file__).parent.joinpath("theme", "static").absolute()
    app.config.html_static_path.append(str(static_path))


# We connect this function to the step after the builder is initialized
def setup(app):
    app.connect("config-inited", update_indexname)
    app.connect("source-read", add_toctree)
    app.connect("builder-inited", add_static_path)

    app.add_config_value("globaltoc_path", "toc.yml", "env")

    # configuration for YAML metadata
    app.add_config_value("yaml_config_path", "", "html")

    # Add configuration value to the template
    app.connect("builder-inited", add_yaml_config)
    app.add_html_theme("jupyter_book_theme", get_html_theme_path())
    pandas_setup(app)
    return {
        "version": __version__,
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
