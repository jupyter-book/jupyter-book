"""Nox sessions for Jupyter Book documentation."""

import os
import nox
from pathlib import Path

# Use uv for faster installs
nox.options.default_venv_backend = "uv|virtualenv"


PLUGIN_URL = "https://github.com/jupyter-book/myst-plugins/releases/download/github-issue-table/index.mjs"
PLUGIN_DEST = Path("src/github-issue-table.mjs")


def download_issue_table_plugin(session):
    """Download the issue-table plugin bundle into docs/src."""
    import requests

    session.log(f"Downloading issue-table plugin from {PLUGIN_URL}")
    PLUGIN_DEST.parent.mkdir(parents=True, exist_ok=True)
    try:
        resp = requests.get(PLUGIN_URL, timeout=30)
        resp.raise_for_status()
        PLUGIN_DEST.write_bytes(resp.content)
        session.log(f"Downloaded issue-table plugin to {PLUGIN_DEST}")
    except Exception as err:  # keep simple; we just need a clear failure
        session.error(f"Failed to download issue-table plugin: {err}")


@nox.session(name="download-plugin")
def download_plugin(session):
    """Fetch the issue-table plugin bundle into docs/src."""
    download_issue_table_plugin(session)


@nox.session(name="docs")
def docs(session):
    """Build the documentation as static HTML."""
    session.install("-e", ".[docs]")
    session.chdir("docs")
    download_issue_table_plugin(session)
    session.run("python", "src/create_gallery.py")
    session.run("jupyter", "book", "build", "--html", "--execute", *session.posargs)


@nox.session(name="docs-live")
def docs_live(session):
    """Start a live development server for the documentation."""
    session.install("-e", ".[docs]")
    session.chdir("docs")
    download_issue_table_plugin(session)
    session.run("python", "src/create_gallery.py")
    session.run("jupyter", "book", "start", "--execute", *session.posargs)


@nox.session
def clean(session):
    """Clean the documentation build artifacts."""
    session.install("-e", ".[docs]")
    session.chdir("docs")
    session.run("jupyter", "book", "clean", "-y")
