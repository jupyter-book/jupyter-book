from pathlib import Path
from click.testing import CliRunner
from bs4 import BeautifulSoup

from jupyter_book.commands import build

path_tests = Path(__file__).parent.resolve()
path_books = path_tests.joinpath("books")
path_root = path_tests.parent


def test_toc_startwithlist(cli: CliRunner, tmpdir, file_regression):
    """Testing a basic _toc.yml for tableofcontents directive"""
    path_output = Path(tmpdir).joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_startwithlist.yml")
    result = cli.invoke(
        build, f"{p_toc} --path-output {path_output} --toc {path_toc} -W".split()
    )
    assert result.exit_code == 0

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="tableofcontents-wrapper")[0]

    file_regression.check(str(toc), extension=".html")


def test_toc_parts(cli: CliRunner, tmpdir, file_regression):
    """Testing `header` in _toc.yml"""
    path_output = Path(tmpdir).joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_parts.yml")
    result = cli.invoke(
        build, f"{p_toc} --path-output {path_output} --toc {path_toc} -W".split()
    )
    assert result.exit_code == 0

    path_index = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_index.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="tableofcontents-wrapper")[0]

    file_regression.check(
        str(toc), basename="test_toc_parts_directive", extension=".html"
    )

    # check the sidebar structure is correct
    file_regression.check(
        soup.select(".bd-links")[0].prettify(),
        basename="test_toc_parts_sidebar",
        extension=".html",
    )

    # TODO: remove these tests in 0.7.5 when chapters: is deprecated
    # check that using `chapter:` raises a warning but outputs the same thing
    path_toc = p_toc.joinpath("_toc_chapters.yml")
    result = cli.invoke(
        build, f"{p_toc} --path-output {path_output} --toc {path_toc}".split()
    )
    assert result.exit_code == 0

    assert "Found `- chapter:` in `_toc.yml`." in result.output
    soup = BeautifulSoup(path_index.read_text(encoding="utf8"), "html.parser")
    file_regression.check(
        soup.select(".bd-links")[0].prettify(),
        basename="test_toc_parts_sidebar",
        extension=".html",
    )


def test_toc_urllink(cli: CliRunner, tmpdir, file_regression):
    """Testing with additional `url` link key in _toc.yml"""
    path_output = Path(tmpdir).joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_urllink.yml")
    result = cli.invoke(
        build, f"{p_toc} --path-output {path_output} --toc {path_toc} -W".split()
    )
    assert result.exit_code == 0

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="tableofcontents-wrapper")[0]
    file_regression.check(str(toc), extension=".html")
