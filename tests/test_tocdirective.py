import os
import shutil
from pathlib import Path

import pytest
import sphinx
from bs4 import BeautifulSoup
from click.testing import CliRunner
from TexSoup import TexSoup

from jupyter_book.cli.main import build

path_tests = Path(__file__).parent.resolve()
path_books = path_tests.joinpath("books")
path_root = path_tests.parent

SPHINX_VERSION = f".sphinx{sphinx.version_info[0]}"


def test_toc_startwithlist(cli: CliRunner, temp_with_override, file_regression):
    """Testing a basic _toc.yml for tableofcontents directive"""
    path_output = temp_with_override.joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_startwithlist.yml")
    result = cli.invoke(
        build,
        [
            p_toc.as_posix(),
            "--path-output",
            path_output.as_posix(),
            "--toc",
            path_toc.as_posix(),
            "-W",
        ],
    )
    # print(result.output)
    assert result.exit_code == 0

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")
    # print(path_toc_directive.read_text(encoding="utf8"))
    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="toctree-wrapper")
    assert len(toc) == 1

    file_regression.check(toc[0].prettify(), extension=".html", encoding="utf8")


def test_toc_parts(cli: CliRunner, temp_with_override, file_regression):
    """Testing `header` in _toc.yml"""
    path_input = temp_with_override.joinpath("mybook_input").absolute()
    path_output = temp_with_override.joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    shutil.copytree(p_toc, path_input)
    # setup correct files
    (path_input / "subfolder" / "asubpage.md").unlink()
    for i in range(4):
        (path_input / "subfolder" / f"asubpage{i+1}.md").write_text(
            f"# A subpage {i+1}\n", encoding="utf8"
        )

    path_toc = path_input.joinpath("_toc_parts.yml")
    result = cli.invoke(
        build,
        [
            path_input.as_posix(),
            "--path-output",
            path_output.as_posix(),
            "--toc",
            path_toc.as_posix(),
            "-W",
        ],
    )
    # print(result.output)
    assert result.exit_code == 0

    path_index = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_index.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="toctree-wrapper")
    assert len(toc) == 2

    file_regression.check(
        toc[0].prettify(),
        basename="test_toc_parts_directive",
        extension=f"{SPHINX_VERSION}.html",
        encoding="utf8",
    )

    # check the sidebar structure is correct
    file_regression.check(
        soup.select(".bd-links")[0].prettify(),
        basename="test_toc_parts_sidebar",
        extension=f"{SPHINX_VERSION}.html",
        encoding="utf8",
    )


@pytest.mark.skipif(
    os.name == "nt",
    reason="Theme error writing content1: "
    "filename, directory name, or volume label syntax is incorrect",
)
def test_toc_urllink(cli: CliRunner, temp_with_override, file_regression):
    """Testing with additional `url` link key in _toc.yml"""
    path_output = temp_with_override.joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_urllink.yml")
    result = cli.invoke(
        build,
        [
            p_toc.as_posix(),
            "--path-output",
            path_output.as_posix(),
            "--toc",
            path_toc.as_posix(),
        ],
    )
    print(result.output)
    assert result.exit_code == 0

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="toctree-wrapper")
    assert len(toc) == 1
    file_regression.check(toc[0].prettify(), extension=".html", encoding="utf8")


@pytest.mark.requires_tex
def test_toc_latex_parts(cli: CliRunner, temp_with_override, file_regression):
    """Testing LaTex output"""
    path_input = temp_with_override.joinpath("mybook_input").absolute()
    path_output = temp_with_override.joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    shutil.copytree(p_toc, path_input)
    # setup correct files
    (path_input / "subfolder" / "asubpage.md").unlink()
    for i in range(4):
        (path_input / "subfolder" / f"asubpage{i+1}.md").write_text(
            f"# A subpage {i+1}\n", encoding="utf8"
        )
    path_toc = path_input.joinpath("_toc_parts.yml")
    result = cli.invoke(
        build,
        [
            path_input.as_posix(),
            "--path-output",
            path_output.as_posix(),
            "--toc",
            path_toc.as_posix(),
            "--builder",
            "pdflatex",
            "-W",
        ],
    )
    assert result.exit_code == 0, result.output

    # reading the tex file
    path_output_file = path_output.joinpath("_build", "latex", "python.tex")
    file_content = TexSoup(path_output_file.read_text())
    file_regression.check(str(file_content.document), extension=".tex", encoding="utf8")


@pytest.mark.requires_tex
def test_toc_latex_urllink(cli: CliRunner, temp_with_override, file_regression):
    """Testing LaTex output"""
    path_output = temp_with_override.joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_urllink.yml")
    result = cli.invoke(
        build,
        [
            p_toc.as_posix(),
            "--path-output",
            path_output.as_posix(),
            "--toc",
            path_toc.as_posix(),
            "--builder",
            "pdflatex",
        ],
    )
    assert result.exit_code == 0, result.output

    # reading the tex file
    path_output_file = path_output.joinpath("_build", "latex", "python.tex")
    file_content = TexSoup(path_output_file.read_text())
    file_regression.check(str(file_content.document), extension=".tex", encoding="utf8")
