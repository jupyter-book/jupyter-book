import shutil
from pathlib import Path

import pytest

from click.testing import CliRunner


@pytest.fixture()
def build_resources(tmpdir):
    src = Path(__file__).parent.resolve().joinpath("books").absolute()
    dst = tmpdir.join("books")
    shutil.copytree(src, dst)
    books = Path(dst)
    tocs = books / "toc"
    yield books, tocs
    shutil.rmtree(dst)


@pytest.fixture()
def pages(tmpdir):
    src = Path(__file__).parent.joinpath("pages").absolute()
    dst = tmpdir.join("pages")
    shutil.copytree(src, dst)
    pages = Path(dst)
    yield pages
    shutil.rmtree(dst)


@pytest.fixture()
def docs(tmpdir):
    src = Path(__file__).parent.parent.joinpath("docs").absolute()
    dst = tmpdir.join("docs")
    shutil.copytree(src, dst)
    docs = Path(dst)
    yield docs
    shutil.rmtree(dst)


@pytest.fixture()
def cli():
    runner = CliRunner()
    return runner
