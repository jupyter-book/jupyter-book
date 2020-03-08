import os
from pathlib import Path
from subprocess import run
import jupyter_book as jb


def test_build_book(tmpdir):
    path = Path(tmpdir).joinpath("mybook").absolute()
    run(f"jb create {path}".split())

    # Ensure the book is created properly
    assert path.joinpath("_config.yml").exists()

    # Build the book
    run(f"jb build {path}".split())
    assert path.joinpath("_build", "html", "index.html").exists()
