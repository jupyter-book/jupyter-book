import os
from pathlib import Path

from click.testing import CliRunner
from bs4 import BeautifulSoup
import pytest

from jupyter_book.commands import build
from TexSoup import TexSoup

path_tests = Path(__file__).parent.resolve()
path_books = path_tests.joinpath("books")
path_root = path_tests.parent


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
    assert result.exit_code == 0

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="tableofcontents-wrapper")[0]

    file_regression.check(str(toc), extension=".html", encoding="utf8")


def test_toc_parts(cli: CliRunner, temp_with_override, file_regression):
    """Testing `header` in _toc.yml"""
    path_output = temp_with_override.joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_parts.yml")
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
    assert result.exit_code == 0

    path_index = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_index.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="tableofcontents-wrapper")[0]

    file_regression.check(
        str(toc),
        basename="test_toc_parts_directive",
        extension=".html",
        encoding="utf8",
    )

    # check the sidebar structure is correct
    file_regression.check(
        soup.select(".bd-links")[0].prettify(),
        basename="test_toc_parts_sidebar",
        extension=".html",
        encoding="utf8",
    )

    # TODO: remove these tests in 0.7.5 when chapters: is deprecated
    # check that using `chapter:` raises a warning but outputs the same thing
    path_toc = p_toc.joinpath("_toc_chapters.yml")
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
    assert result.exit_code == 0

    assert "Found `- chapter:` in `_toc.yml`." in result.output
    soup = BeautifulSoup(path_index.read_text(encoding="utf8"), "html.parser")
    file_regression.check(
        soup.select(".bd-links")[0].prettify(),
        basename="test_toc_parts_sidebar",
        extension=".html",
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
            "-W",
        ],
    )
    assert result.exit_code == 0, result.output

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="tableofcontents-wrapper")[0]
    file_regression.check(str(toc), extension=".html", encoding="utf8")


@pytest.mark.requires_tex
def test_toc_latex(cli: CliRunner, temp_with_override, file_regression):
    """Testing LaTex output"""
    path_output = temp_with_override.joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_urllink.yml")
    p_config = path_books.joinpath("config")
    path_config = p_config.joinpath("_config_jupyterbooklatex.yml")
    result = cli.invoke(
        build,
        [
            p_toc.as_posix(),
            "--path-output",
            path_output.as_posix(),
            "--toc",
            path_toc.as_posix(),
            "--config",
            path_config.as_posix(),
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
