"""Build a book with Jupyter Notebooks and Sphinx."""
from .toc import update_indexname, add_toctree
from .yaml import add_yaml_config


__version__ = "0.7.0b2"


# We connect this function to the step after the builder is initialized
def setup(app):
    app.connect("config-inited", update_indexname)
    app.connect("source-read", add_toctree)

    app.add_config_value("globaltoc_path", "toc.yml", "env")

    # configuration for YAML metadata
    app.add_config_value("yaml_config_path", "", "html")

    app.connect("config-inited", add_yaml_config)

    return {
        "version": __version__,
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
