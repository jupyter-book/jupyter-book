from pathlib import Path
from subprocess import run, PIPE

import pytest
from bs4 import BeautifulSoup as bs
from click.testing import CliRunner

from jupyter_book import commands


path_tests = Path(__file__).parent.resolve()
path_books = path_tests.joinpath("books")
path_root = path_tests.parent
p_toc = path_books.joinpath("toc")


@pytest.fixture()
def cli():
    runner = CliRunner()
    return runner


def test_build_book(tmpdir, cli):
    """Test building the book template and a few test configs."""
    # Create the book from the template
    book_root = Path(tmpdir).joinpath("mybook")
    create_result = cli.invoke(commands.create, str(book_root))

    assert create_result.exit_code == 0
    assert book_root.joinpath("_config.yml").exists()

    # Build the book
    build_result = cli.invoke(commands.build, str(book_root))
    assert build_result.exit_code == 0
    path_html = book_root.joinpath("_build", "html")
    assert path_html.joinpath("index.html").exists()
    assert path_html.joinpath("intro.html").exists()


def test_custom_config(cli):
    path_config = path_books.joinpath("config")
    result = cli.invoke(commands.build, str(path_config))
    assert result.exit_code == 0
    html = path_config.joinpath("_build", "html", "index.html").read_text()
    assert '<h1 class="site-logo" id="site-title">TEST PROJECT NAME</h1>' in html
    assert '<div class="sphinx-tabs docutils container">' in html
    assert '<link rel="stylesheet" type="text/css" href="_static/mycss.css" />' in html
    assert '<script src="_static/js/myjs.js"></script>' in html


@pytest.mark.parametrize("toc", ["_toc.yml", "_toc_startwithlist.yml"])
def test_toc_builds(tmpdir, cli, toc):
    """Test building the book template with several different TOC files."""
    result = cli.invoke(commands.build, (f"{p_toc} --path-output {tmpdir} "
                                         f"--toc {p_toc / toc} -W").split())
    assert result.exit_code == 0

# <<<<<<< variant A
#     ###############################
#     # TOC Builds

#     # Regular TOC should work
#     p_toc = path_books.joinpath("toc")
#     path_toc = p_toc.joinpath("_toc.yml")
#     out = run(f"jb build {p_toc} --path-output {tmpdir} --toc {path_toc} -W".split())

#     # TOC with a single-item list should work
#     p_toc = path_books.joinpath("toc")
#     path_toc = p_toc.joinpath("_toc_startwithlist.yml")
#     out = run(f"jb build {p_toc} --path-output {tmpdir} --toc {path_toc} -W".split())

#     # TOC should force a re-build of pages if it changes and no pages change
#     # Only difference between these is the relative ordering of content pages
#     toc_tmp = [
#         ("- file: index\n- file: content1\n- file: content2\n", "content1.html"),
#         ("- file: index\n- file: content2\n- file: content1\n", "content2.html"),
#     ]
#     for toc_tmp_text, first_page in toc_tmp:
#         path_toctmp = Path(tmpdir).joinpath("_toc_tmp.yml")
#         path_toctmp.write_text(toc_tmp_text)
#         # Not using -W because we expect warnings for pages not listed in TOC
#         out = run(
#             f"jb build {p_toc} --path-output {tmpdir} --toc {path_toctmp}".split()
#         )
#         path_index = Path(tmpdir).joinpath("_build", "html", "index.html")
#         index_html = bs(path_index.read_text(), "html.parser")
#         sidebar_links = index_html.select(".bd-sidebar a.internal")
#         # The first page should be different in each run bc of switched TOC order
#         assert sidebar_links[1].attrs["href"] == first_page

#     ###############################
#     # TOC errors
#     p_toc = path_books.joinpath("toc")
# >>>>>>> variant B
# ======= end

@pytest.mark.parametrize("toc,msg",
                         [("_toc_startswithheader.yml", "Table of Contents must start"),
                          ("_toc_urlwithouttitle.yml", "`url:` link should"),
                          ("_toc_url.yml", "Rename `url:` to `file:`"),
                          ("_toc_wrongkey.yml", "Unknown key in `_toc.yml`")])
def test_corrupt_toc(tmpdir, cli, toc, msg):
    path_output = Path(tmpdir).joinpath("mybook")
    with pytest.raises(ValueError):
        result = cli.invoke(commands.build,
                            (f"{p_toc} --path-output {path_output} "
                             f" --toc {p_toc / toc} -W".split()))
        assert result.exit_code == 1
        assert msg in result.output
        raise result.exception


def test_build_errors(tmpdir, cli):
    # Create the book from the template
    path = Path(tmpdir).joinpath("mybook").absolute()
    run(f"jb create {path}".split())

    # === Expected errors ===
    # Create pre-existing folder
    with pytest.raises(ValueError):
        out = run(f"jb create {path}".split(), stderr=PIPE)
        err = out.stderr.decode()
        if "ValueError" in err:
            raise ValueError(err)
    assert "The output book already exists" in err

    # Non-existent folder
    with pytest.raises(ValueError):
        out = run("jb build doesnt/exist".split(), stderr=PIPE)
        err = out.stderr.decode()
        if "ValueError" in err:
            raise ValueError(err)
    assert "Path to book isn't a directory" in err

    # Incorrect build
    result = cli.invoke(commands.build, [path.as_posix(), "--builder", "blah"])
    assert result.exit_code == 2

    # No table of contents message
    p_notoc = path_books.joinpath("notoc")
    with pytest.raises(ValueError):
        out = run(f"jb build {p_notoc}".split(), stderr=PIPE)
        err = out.stderr.decode()
        if "ValueError" in err:
            raise ValueError(err)
    assert "Couldn't find a Table of Contents file" in err

    # Test error on warnings and book error message
    p_syntax = path_books.joinpath("sphinx_syntaxerr")
    with pytest.raises(ValueError):
        out = run(f"jb build {p_syntax} --path-output {path} -W".split(), stderr=PIPE)
        err = out.stderr.decode()
        if "Warning, treated as error:" in err:
            raise ValueError(err)
    assert "There was an error in building your book" in err


def test_build_docs(tmpdir):
    """Test building the documentation book."""
    path_output = Path(tmpdir).absolute()
    path_docs = path_root.joinpath("docs")
    run(f"jb build {path_docs} --path-output {path_output}".split(), check=True)
    path_html = path_output.joinpath("_build", "html")
    assert path_html.joinpath("index.html").exists()
    assert path_html.joinpath("intro.html").exists()
    assert path_html.joinpath("content", "citations.html").exists()


def test_build_page(tmpdir):
    """Test building the documentation book."""
    path_output = Path(tmpdir).absolute()
    path_page = path_tests.joinpath("pages", "single_page.ipynb")

    run(f"jb page {path_page} --path-output {path_output}".split(), check=True)
    path_html = path_output.joinpath("_build", "html")
    assert path_html.joinpath("single_page.html").exists()
    # The extra page shouldn't have been built with Sphinx (or run)
    assert not path_html.joinpath("extra_page.html").exists()
    # An index file should be created
    path_index = path_html.joinpath("index.html")
    assert path_index.exists()
    assert 'url=single_page.html" />' in path_index.read_text()


class TestPageExecute:

    basename = "nb_test_page_execute"
    cell_out_div = r'<div class="cell_output docutils container">'
    path_page = path_tests.joinpath("pages", f"{basename}.ipynb")

    def _run(self, tmpdir, flags=""):
        path_output = Path(tmpdir).absolute()
        out_html = path_output.joinpath("_build", "html", f"{self.basename}.html")
        run(
            f"jb page {self.path_page} --path-output {path_output} {flags}".split(),
            check=True,
        )
        with open(out_html, "r") as fh:
            self.html = fh.read()

    @property
    def has_cell_output(self):
        return self.cell_out_div in self.html

    @pytest.mark.parametrize(
        ("flag", "expected"),
        (("", True), ("--execute", True), ("--no-execute", False),),
    )
    def test_build_page_execute_flags(self, tmpdir, flag, expected):
        self._run(tmpdir, flags=flag)
        assert self.has_cell_output == expected
