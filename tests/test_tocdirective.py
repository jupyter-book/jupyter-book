from pathlib import Path
from subprocess import run


path_tests = Path(__file__).parent.resolve()
path_books = path_tests.joinpath("books")
path_root = path_tests.parent


def test_toc(tmpdir, file_regression):
    """Testing a basic _toc.yml for tableofcontents directive"""
    path_output = Path(tmpdir).joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc.yml")
    run(
        f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
        check=True,
    )

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")
    file_regression.check(path_toc_directive.read_text(), extension=".html")


def test_toc_withheaders(tmpdir, file_regression):
    """Testing `header` in _toc.yml"""
    path_output = Path(tmpdir).joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_withheaders.yml")
    run(
        f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
        check=True,
    )

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")
    file_regression.check(path_toc_directive.read_text(), extension=".html")


def test_toc_url(tmpdir, file_regression):
    """Testing with additional `url` key in _toc.yml"""
    path_output = Path(tmpdir).joinpath("mybook").absolute()
    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_url.yml")
    run(
        f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
        check=True,
    )

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")
    file_regression.check(path_toc_directive.read_text(), extension=".html")
