import shutil
from pathlib import Path

import pytest
from click.testing import CliRunner


@pytest.fixture()
def build_resources(temp_with_override):
    """Copys ./books and ./books/tocs to a temporary directory and yields the paths
    as `pathlib.Path` objects.
    """
    src = Path(__file__).parent.resolve().joinpath("books").absolute()
    dst = temp_with_override / "books"
    shutil.copytree(src, dst)
    yield Path(dst), Path(dst) / "toc"
    shutil.rmtree(dst)


@pytest.fixture()
def pages(temp_with_override):
    """Copys ./pages to a temporary directory and yields the path as a `pathlib.Path`
    object.
    """
    src = Path(__file__).parent.joinpath("pages").absolute()
    dst = temp_with_override / "pages"
    shutil.copytree(src, dst)
    yield Path(dst)
    shutil.rmtree(dst)


@pytest.fixture()
def cli():
    """Provides a click.testing CliRunner object for invoking CLI commands."""
    runner = CliRunner()
    yield runner
    del runner
