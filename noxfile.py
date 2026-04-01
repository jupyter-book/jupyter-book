"""Nox sessions for Jupyter Book documentation."""

import os

import nox

# Use uv for faster installs
nox.options.default_venv_backend = "uv|virtualenv"


def _prep_docs(session):
    """Ensure JS bundle is fresh, then install the package."""
    # On Read the Docs the bundle is built during the install step,
    # but locally a stale .cjs can linger so we rebuild explicitly.
    if not os.environ.get("READTHEDOCS"):
        session.run("npm", "run", "build", external=True)
    session.install("-e", ".[docs]")


@nox.session(name="docs")
def docs(session):
    """Build the documentation as static HTML."""
    _prep_docs(session)
    session.chdir("docs")
    session.run("jupyter", "book", "build", "--html", "--execute", *session.posargs)


@nox.session(name="docs-live")
def docs_live(session):
    """Start a live development server for the documentation."""
    _prep_docs(session)
    session.chdir("docs")
    session.run("jupyter", "book", "start", "--execute", *session.posargs)


@nox.session
def clean(session):
    """Clean the documentation build artifacts."""
    session.install("-e", ".[docs]")
    session.chdir("docs")
    session.run("jupyter", "book", "clean", "-y")
