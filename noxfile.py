"""Nox sessions for Jupyter Book documentation."""

import nox

# Use uv for faster installs
nox.options.default_venv_backend = "uv|virtualenv"


@nox.session(name="docs")
def docs(session):
    """Build the documentation as static HTML."""
    session.install("-e", ".[docs]")
    session.chdir("docs")
    session.run("jupyter", "book", "build", "--html", "--execute")


@nox.session(name="docs-live")
def docs_live(session):
    """Start a live development server for the documentation."""
    session.install("-e", ".[docs]")
    session.chdir("docs")
    session.run("jupyter", "book", "start", "--execute")
