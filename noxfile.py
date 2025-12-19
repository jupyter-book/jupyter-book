"""Nox sessions for Jupyter Book blog."""

import nox

# Use uv for faster installs
nox.options.default_venv_backend = "uv|virtualenv"

@nox.session(name="docs")
def docs(session):
    """Build the documentation as static HTML."""
    session.install("jupyter-book")
    session.chdir("docs")
    session.run("jupyter", "book", "build", "--html", "--execute")


@nox.session(name="docs-live")
def docs_live(session):
    """Start a live development server for the documentation."""
    session.install("jupyter-book")
    session.chdir("docs")
    session.run("jupyter", "book", "start", "--execute")


@nox.session
def clean(session):
    """Clean the documentation build artifacts."""
    session.install("jupyter-book")
    session.chdir("docs")
    session.run("jupyter", "book", "clean", "-y")


@nox.session(name="download-releases")
def download_releases(session):
    """Download release notes from GitHub."""
    session.run("python", "src/generate_release_notes.py", external=True)
