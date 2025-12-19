"""Nox sessions for Jupyter Book blog."""

import nox

# Use uv for faster installs
nox.options.default_venv_backend = "uv|virtualenv"

@nox.session(name="docs")
def docs(session):
    """Build the documentation as static HTML."""
    session.install("jupyter-book")
    download_nav(session)
    download_releases(session)
    session.chdir("docs")
    session.run("jupyter", "book", "build", "--html", "--execute")


@nox.session(name="docs-live")
def docs_live(session):
    """Start a live development server for the documentation."""
    session.install("jupyter-book")
    download_nav(session)
    download_releases(session)
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
    from pathlib import Path

    # Only download if the releases directory is empty or doesn't exist
    releases_dir = Path("docs/release")
    if not releases_dir.exists() or not any(releases_dir.glob("*.md")):
        session.run("python", "src/generate_release_notes.py", external=True)
    else:
        session.log("Release notes already exist, skipping download")


@nox.session(name="download-nav")
def download_nav(session):
    """Download and process navigation from jupyter-book site.yml."""
    from pathlib import Path

    # Only download if the file doesn't exist
    if not Path("docs/site.yml").exists():
        session.install("pyyaml")
        session.run("python", "src/download_nav_items.py", external=True)
    else:
        session.log("Navigation file already exists, skipping download")
