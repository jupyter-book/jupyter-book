"""Build a book with Jupyter Notebooks and Sphinx."""
from pathlib import Path

__version__ = "0.12.3"


def add_static_files(app, config):
    """Search the static files paths and initialize any CSS of JS files."""
    static_paths = config.html_static_path
    for path in static_paths:
        path = Path(app.confdir).joinpath(path)
        for path_css in path.rglob("*.css"):
            app.add_css_file((path_css.relative_to(path)).as_posix())
        for path_js in path.rglob("*.js"):
            app.add_js_file((path_js.relative_to(path)).as_posix())


# We connect this function to the step after the builder is initialized
def setup(app):

    app.add_config_value("use_jupyterbook_latex", True, "env")
    app.add_config_value("use_multitoc_numbering", True, "env")
    # Add custom static files to the sphinx build
    app.connect("config-inited", add_static_files)

    # Extensions
    return {
        "version": __version__,
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
