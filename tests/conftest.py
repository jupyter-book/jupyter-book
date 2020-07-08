import shutil
from pathlib import Path

import pytest

from click.testing import CliRunner


@pytest.fixture()
def build_resources(tmpdir):
    """Copys ./books and ./books/tocs to a temporary directory and yields the paths
    as `pathlib.Path` objects.
    """
    src = Path(__file__).parent.resolve().joinpath("books").absolute()
    dst = tmpdir.join("books")
    shutil.copytree(src, dst)
    books = Path(dst)
    tocs = books / "toc"
    yield books, tocs
    shutil.rmtree(dst)


@pytest.fixture()
def pages(tmpdir):
    """Copys ./pages to a temporary directory and yields the path as a `pathlib.Path`
    object.
    """
    src = Path(__file__).parent.joinpath("pages").absolute()
    dst = tmpdir.join("pages")
    shutil.copytree(src, dst)
    pages = Path(dst)
    yield pages
    shutil.rmtree(dst)


@pytest.fixture()
def docs(tmpdir):
    """Copys ../docs to a temporary directory and yields the path as a `pathlib.Path`
    object.
    """
    src = Path(__file__).parent.parent.joinpath("docs").absolute()
    dst = tmpdir.join("docs")
    shutil.copytree(src, dst)
    docs = Path(dst)
    yield docs
    shutil.rmtree(dst)


@pytest.fixture()
def cli():
    """Provides a click.testing CliRunner object for invoking CLI commands.
    """
    runner = CliRunner()
    return runner
