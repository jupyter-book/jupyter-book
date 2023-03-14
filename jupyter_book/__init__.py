"""Build a book with Jupyter Notebooks and Sphinx."""

__version__ = "0.15.1"


# We connect this function to the step after the builder is initialized
def setup(app):
    app.add_config_value("use_jupyterbook_latex", True, "env")
    app.add_config_value("use_multitoc_numbering", True, "env")

    # Extensions
    return {
        "version": __version__,
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
