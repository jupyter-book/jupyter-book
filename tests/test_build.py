from pathlib import Path

import pytest
from bs4 import BeautifulSoup

from jupyter_book import commands


def test_create(tmpdir, cli):
    book = Path(tmpdir) / "new_book"
    result = cli.invoke(commands.create, str(book))
    assert result.exit_code == 0
    assert book.joinpath("_config.yml").exists()
    assert len(list(book.iterdir())) == 9


def test_build_from_template(tmpdir, cli):
    """Test building the book template and a few test configs."""
    # Create the book from the template
    book = Path(tmpdir) / "new_book"
    _ = cli.invoke(commands.create, str(book))
    build_result = cli.invoke(commands.build, str(book))
    assert build_result.exit_code == 0
    html = book.joinpath("_build", "html")
    assert html.joinpath("index.html").exists()
    assert html.joinpath("intro.html").exists()


def test_custom_config(cli, build_resources):
    """Test a variety of custom configuration values."""
    books, _ = build_resources
    config = books.joinpath("config")
    result = cli.invoke(commands.build, str(config))
    assert result.exit_code == 0
    html = config.joinpath("_build", "html", "index.html").read_text()
    soup = BeautifulSoup(html, "html.parser")
    assert '<h1 class="site-logo" id="site-title">TEST PROJECT NAME</h1>' in html
    assert '<div class="sphinx-tabs docutils container">' in html
    assert '<link rel="stylesheet" type="text/css" href="_static/mycss.css" />' in html
    assert '<script src="_static/js/myjs.js"></script>' in html

    # Check that our comments engines were correctly added
    assert soup.find("script", attrs={"kind": "hypothesis"})
    assert soup.find("script", attrs={"kind": "utterances"})


@pytest.mark.parametrize("toc", ["_toc.yml", "_toc_startwithlist.yml"])
def test_toc_builds(cli, build_resources, toc, tmpdir):
    """Test building the book template with several different TOC files."""
    books, tocs = build_resources
    toc = str(tocs / toc)
    result = cli.invoke(commands.build, [str(tocs), "--toc", toc, "-W"])
    assert result.exit_code == 0


def test_toc_rebuild(cli, build_resources):
    """Changes to the TOC should force a re-build of pages. Also tests for changes
    to the relative ordering of content pages.
    """
    _, tocs = build_resources
    toc = tocs / "_toc_simple.yml"
    index_html = tocs.joinpath("_build", "html", "index.html")

    # Not using -W because we expect warnings for pages not listed in TOC
    result = cli.invoke(commands.build, [str(tocs), "--toc", str(toc)])
    html = BeautifulSoup(index_html.read_text(), "html.parser")
    tags = html.find_all("a", "reference internal")
    assert result.exit_code == 0
    assert tags[1].attrs["href"] == "content1.html"
    assert tags[2].attrs["href"] == "content2.html"

    toc.write_text("- file: index\n- file: content2\n- file: content1\n")
    result = cli.invoke(commands.build, [str(tocs), "--toc", str(toc)])
    assert result.exit_code == 0
    html = BeautifulSoup(index_html.read_text(), "html.parser")
    tags = html.find_all("a", "reference internal")
    # The rendered TOC should reflect the order in the modified _toc.yml
    assert tags[1].attrs["href"] == "content2.html"
    assert tags[2].attrs["href"] == "content1.html"


@pytest.mark.parametrize(
    "toc,msg",
    [
        ("_toc_emptysections.yml", "Found an empty section"),
        ("_toc_urlwithouttitle.yml", "`url:` link should"),
        ("_toc_url.yml", "Rename `url:` to `file:`"),
        ("_toc_wrongkey.yml", "Unknown key in `_toc.yml`"),
    ],
)
def test_corrupt_toc(build_resources, cli, toc, msg):
    books, tocs = build_resources
    toc = str(tocs / toc)
    with pytest.raises(ValueError):
        result = cli.invoke(commands.build, [str(tocs), "--toc", toc, "-W"])
        assert result.exit_code == 1
        assert msg in result.output
        raise result.exception


def test_build_errors(build_resources, cli):
    books, tocs = build_resources
    path = books.joinpath("mybook").absolute()
    # Bad builder
    result = cli.invoke(commands.build, [path.as_posix(), "--builder", "blah"])
    assert result.exit_code == 2

    # No table of contents message
    p_notoc = books.joinpath("notoc")
    with pytest.raises(ValueError):
        result = cli.invoke(commands.build, [p_notoc.as_posix()])
        assert result.exit_code == 1
        assert "Couldn't find a Table of Contents file" in str(result.exception)
        raise result.exception

    # Test error on warnings and book error message
    p_syntax = books.joinpath("sphinx_syntaxerr")
    with pytest.raises(ValueError):
        result = cli.invoke(commands.build, [p_syntax.as_posix(), "-W"])
        assert result.exit_code == 1
        assert "There was an error in building your book" in str(result.exception)
        raise result.exception


def test_build_docs(docs, cli):
    """Test building the documentation book."""
    html = docs.joinpath("_build", "html")
    result = cli.invoke(commands.build, [docs.as_posix()])
    assert result.exit_code == 0
    assert html.joinpath("index.html").exists()
    assert html.joinpath("intro.html").exists()
    assert html.joinpath("content", "citations.html").exists()


def test_build_page(pages, cli):
    """Test building the documentation book."""
    page = pages.joinpath("single_page.ipynb")
    html = pages.joinpath("_build", "html")
    index = html.joinpath("index.html")
    result = cli.invoke(commands.page, [page.as_posix()])
    assert result.exit_code == 0
    assert html.joinpath("single_page.html").exists()
    assert not html.joinpath("extra_page.html").exists()
    assert 'url=single_page.html" />' in index.read_text()


@pytest.mark.parametrize(
    ("flag", "expected"), (("", True), ("--execute", True), ("--no-execute", False))
)
def test_build_page_execute_flags(pages, cli, flag, expected):
    basename = "nb_test_page_execute"
    cell_out_div = r'<div class="cell_output docutils container">'
    path_page = pages.joinpath(f"{basename}.ipynb")
    html = pages.joinpath("_build", "html", f"{basename}.html")
    opts = [path_page.as_posix()]
    if flag:
        opts.append(flag)
    result = cli.invoke(commands.page, opts)
    assert result.exit_code == 0
    with open(html) as f:
        lines = f.read()
        assert (cell_out_div in lines) == expected
