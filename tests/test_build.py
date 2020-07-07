from pathlib import Path

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


def test_create(tmpdir, cli):
    # test with an empty dir that already exists
    book = Path(tmpdir)
    result = cli.invoke(commands.create, str(book))
    assert result.exit_code == 0
    assert book.joinpath("_config.yml").exists()
    assert len(list(book.iterdir())) == 9

    # test with a dir that doesn't exist
    book = Path(tmpdir.join('non-existent'))
    result = cli.invoke(commands.create, str(book))
    assert result.exit_code == 0
    assert book.joinpath("_config.yml").exists()
    assert len(list(book.iterdir())) == 9

    # test with a dir that exists but isn't empty
    result = cli.invoke(commands.create, tmpdir.strpath)
    assert result.exit_code == 2
    assert "must be empty" in result.output


def test_build_from_template(tmpdir, cli):
    """Test building the book template and a few test configs."""
    # Create the book from the template
    _ = cli.invoke(commands.create, tmpdir.strpath)
    build_result = cli.invoke(commands.build, tmpdir.strpath)
    assert build_result.exit_code == 0
    html = Path(tmpdir).joinpath("_build", "html")
    assert html.joinpath("index.html").exists()
    assert html.joinpath("intro.html").exists()


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
    toc = p_toc / toc
    result = cli.invoke(
        commands.build,
        [p_toc.as_posix(), "--path-output", tmpdir, "--toc", toc.as_posix(), "-W"],
    )
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

@pytest.mark.parametrize(
    "toc,msg",
    [
        ("_toc_startswithheader.yml", "Table of Contents must start"),
        ("_toc_urlwithouttitle.yml", "`url:` link should"),
        ("_toc_url.yml", "Rename `url:` to `file:`"),
        ("_toc_wrongkey.yml", "Unknown key in `_toc.yml`"),
    ],
)
def test_corrupt_toc(tmpdir, cli, toc, msg):
    path_output = Path(tmpdir).joinpath("mybook")
    with pytest.raises(ValueError):
        result = cli.invoke(
            commands.build,
            (
                f"{p_toc} --path-output {path_output} "
                f" --toc {p_toc / toc} -W".split()
            ),
        )
        assert result.exit_code == 1
        assert msg in result.output
        raise result.exception


def test_build_errors(tmpdir, cli):
    # Create the book from the template
    path = Path(tmpdir).joinpath("mybook").absolute()
    # Incorrect build
    result = cli.invoke(commands.build, [path.as_posix(), "--builder", "blah"])
    assert result.exit_code == 2

    # No table of contents message
    p_notoc = path_books.joinpath("notoc")
    with pytest.raises(ValueError):
        result = cli.invoke(commands.build, [p_notoc.as_posix()])
        assert result.exit_code == 1
        assert "Couldn't find a Table of Contents file" in str(result.exception)
        raise result.exception

    # Test error on warnings and book error message
    p_syntax = path_books.joinpath("sphinx_syntaxerr")
    with pytest.raises(ValueError):
        result = cli.invoke(
            commands.build, [p_syntax.as_posix(), "--path-output", path, "-W"]
        )
        assert result.exit_code == 1
        assert "There was an error in building your book" in str(result.exception)
        raise result.exception


def test_build_docs(tmpdir, cli):
    """Test building the documentation book."""
    path_output = Path(tmpdir).absolute()
    path_docs = path_root.joinpath("docs")
    path_html = path_output.joinpath("_build", "html")
    result = cli.invoke(
        commands.build, [path_docs.as_posix(), "--path-output", path_output.as_posix()]
    )
    assert result.exit_code == 0
    assert path_html.joinpath("index.html").exists()
    assert path_html.joinpath("intro.html").exists()
    assert path_html.joinpath("content", "citations.html").exists()


def test_build_page(tmpdir, cli):
    """Test building the documentation book."""
    path_output = Path(tmpdir).absolute()
    path_page = path_tests.joinpath("pages", "single_page.ipynb")
    path_html = path_output.joinpath("_build", "html")
    result = cli.invoke(
        commands.page, [path_page.as_posix(), "--path-output", path_output]
    )
    assert result.exit_code == 0
    assert path_html.joinpath("single_page.html").exists()
    # The extra page shouldn't have been built with Sphinx (or run)
    assert not path_html.joinpath("extra_page.html").exists()
    # An index file should be created
    path_index = path_html.joinpath("index.html")
    assert path_index.exists()
    assert 'url=single_page.html" />' in path_index.read_text()


@pytest.mark.parametrize(
    ("flag", "expected"), (("", True), ("--execute", True), ("--no-execute", False))
)
def test_build_page_execute_flags(cli, tmpdir, flag, expected):
    basename = "nb_test_page_execute"
    cell_out_div = r'<div class="cell_output docutils container">'
    path_page = path_tests.joinpath("pages", f"{basename}.ipynb")
    path_output = Path(tmpdir).absolute()
    out_html = path_output.joinpath("_build", "html", f"{basename}.html")

    opts = [path_page.as_posix(), "--path-output", path_output]
    if flag:
        opts.append(flag)

    result = cli.invoke(commands.page, opts)
    assert result.exit_code == 0
    with open(out_html, "r") as f:
        html = f.read()
        assert (cell_out_div in html) == expected
