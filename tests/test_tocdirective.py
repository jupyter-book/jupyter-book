from pathlib import Path
from subprocess import run
from bs4 import BeautifulSoup

path_tests = Path(__file__).parent.resolve()
path_books = path_tests.joinpath("books")
path_root = path_tests.parent


def test_toc_startwithlist(tmpdir, file_regression):
    """Testing a basic _toc.yml for tableofcontents directive"""
    path_output = Path(tmpdir).joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_startwithlist.yml")
    run(
        f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
        check=True,
    )

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="tableofcontents-wrapper")[0]

    file_regression.check(str(toc), extension=".html")


def test_toc_chapters(tmpdir, file_regression):
    """Testing `header` in _toc.yml"""
    path_output = Path(tmpdir).joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_chapters.yml")
    run(
        f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
        check=True,
    )

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="tableofcontents-wrapper")[0]

    file_regression.check(str(toc), extension=".html")


def test_toc_urllink(tmpdir, file_regression):
    """Testing with additional `url` link key in _toc.yml"""
    path_output = Path(tmpdir).joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_urllink.yml")
    run(
        f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
        check=True,
    )

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.find_all("div", class_="tableofcontents-wrapper")[0]
    file_regression.check(str(toc), extension=".html")


def test_toc_numbered(tmpdir, file_regression):
    """Testing that numbers make it into the sidebar"""
    path_output = Path(tmpdir).joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_numbered.yml")
    run(
        f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
        check=True,
    )

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.select("nav.bd-links")[0]
    file_regression.check(str(toc), extension=".html")
