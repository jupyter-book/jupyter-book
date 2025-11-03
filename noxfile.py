import nox

nox.options.default_venv_backend = "uv"

# Define the sessions
@nox.session(venv_backend="uv")
def docs(session):
    """
    Build the documentation.
    """
    session.install("-e", ".[sphinx]")
    session.run("jupyter-book", "build", "docs")
