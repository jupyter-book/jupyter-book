"""Build a book with Jupyter Notebooks and Sphinx."""
from pathlib import Path

from .toc import update_indexname, add_toctree
from .yaml import add_yaml_config
from .directive.toc import TableofContents


__version__ = "0.7.0b4"


def add_static_files(app, config):
    """Search the static files paths and initialize any CSS of JS files."""
    static_paths = config.html_static_path
    for path in static_paths:
        path = Path(app.confdir).joinpath(path)
        for path_css in path.rglob("*.css"):
            app.add_css_file(str(path_css.relative_to(path)))
        for path_js in path.rglob("*.js"):
            app.add_js_file(str(path_js.relative_to(path)))


# We connect this function to the step after the builder is initialized
def setup(app):

    app.connect("config-inited", update_indexname)
    app.connect("source-read", add_toctree)

    app.add_config_value("globaltoc_path", "toc.yml", "env")

    # configuration for YAML metadata
    app.add_config_value("yaml_config_path", "", "html")

    app.connect("config-inited", add_yaml_config)
    app.connect("config-inited", add_static_files)

    app.add_directive("tableofcontents", TableofContents)

    return {
        "version": __version__,
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
