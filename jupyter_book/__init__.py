"""Build a book with Jupyter Notebooks and Sphinx."""
from docutils.parsers.rst.directives.body import Sidebar
from .toc import update_indexname, add_toctree
from .yaml import add_yaml_config


__version__ = "0.0.1dev0"


class MySidebar(Sidebar):
    """Allow sidebars to not have titles."""

    optional_arguments = 1
    required_arguments = 0

    def run(self):
        if not self.arguments:
            self.arguments = [""]

        return super().run()


# We connect this function to the step after the builder is initialized
def setup(app):
    app.connect("config-inited", update_indexname)
    app.connect("source-read", add_toctree)

    app.add_config_value("globaltoc_path", "toc.yml", "env")
    app.add_directive("sidebar", MySidebar)

    # configuration for YAML metadata
    app.add_config_value("yaml_config_path", "", "html")

    # Add configuration value to the template
    app.connect("builder-inited", add_yaml_config)
    return {
        "version": __version__,
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
