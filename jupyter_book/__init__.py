"""Build a book with Jupyter Notebooks and Sphinx."""
from pathlib import Path

from .toc import add_toc_to_sphinx, add_toctree
from .directive.toc import TableofContents, SwapTableOfContents


__version__ = "0.7.4"


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

    # Updates `master_doc` using the first item of `_toc.yml`
    app.connect("config-inited", add_toc_to_sphinx)

    # Add toctrees to each content page using `_toc.yml`
    app.connect("source-read", add_toctree)

    # Path for `_toc.yml`
    app.add_config_value("globaltoc_path", "toc.yml", "env")

    # Add custom static files to the sphinx build
    app.connect("config-inited", add_static_files)

    # Directives
    app.add_directive("tableofcontents", TableofContents)

    # Transforms
    app.add_post_transform(SwapTableOfContents)

    return {
        "version": __version__,
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
