from pathlib import Path

import pytest
from bs4 import BeautifulSoup
from click.testing import CliRunner

import sphinx

from jupyter_book import commands


def test_version(cli: CliRunner):
    result = cli.invoke(commands.main, "--version")
    assert result.exit_code == 0, result.output
    assert "Jupyter Book" in result.output, result.output


def test_create(temp_with_override: Path, cli):
    book = temp_with_override / "new_book"
    result = cli.invoke(commands.create, book.as_posix())
    assert result.exit_code == 0
    assert book.joinpath("_config.yml").exists()
    assert len(list(book.iterdir())) == 9


def test_create_from_cookiecutter(temp_with_override: Path, cli):
    book = temp_with_override / "new_book"
    result = cli.invoke(commands.create, [book.as_posix(), "--cookiecutter"])
    assert result.exit_code == 0
    # this test uses default cookiecutter prompt values
    # note that default cookiecutter book name is "my_book"
    assert book.joinpath("my_book", "my_book", "_config.yml").exists()
    assert len(list(book.joinpath("my_book").iterdir())) == 7
    assert len(list(book.joinpath("my_book", ".github", "workflows").iterdir())) == 1
    assert len(list(book.joinpath("my_book", "my_book").iterdir())) == 8


def test_build_from_template(temp_with_override, cli):
    """Test building the book template and a few test configs."""
    # Create the book from the template
    book = temp_with_override / "new_book"
    _ = cli.invoke(commands.create, book.as_posix())
    build_result = cli.invoke(
        commands.build, [book.as_posix(), "-n", "-W", "--keep-going"]
    )
    assert build_result.exit_code == 0, build_result.output
    html = book.joinpath("_build", "html")
    assert html.joinpath("index.html").exists()
    assert html.joinpath("intro.html").exists()


def test_custom_config(cli, build_resources):
    """Test a variety of custom configuration values."""
    books, _ = build_resources
    config = books.joinpath("config")
    result = cli.invoke(commands.build, [config.as_posix(), "-n", "-W", "--keep-going"])
    assert result.exit_code == 0, result.output
    html = config.joinpath("_build", "html", "index.html").read_text(encoding="utf8")
    soup = BeautifulSoup(html, "html.parser")
    assert '<h1 class="site-logo" id="site-title">TEST PROJECT NAME</h1>' in html
    assert '<div class="sphinx-tabs docutils container">' in html
    assert '<link rel="stylesheet" type="text/css" href="_static/mycss.css" />' in html
    assert '<script src="_static/js/myjs.js"></script>' in html

    # Check that our comments engines were correctly added
    assert soup.find("script", attrs={"kind": "hypothesis"})
    assert soup.find("script", attrs={"kind": "utterances"})


@pytest.mark.parametrize("toc", ["_toc.yml", "_toc_startwithlist.yml"])
def test_toc_builds(cli, build_resources, toc):
    """Test building the book template with several different TOC files."""
    books, tocs = build_resources
    result = cli.invoke(
        commands.build,
        [tocs.as_posix(), "--toc", (tocs / toc).as_posix(), "-n", "-W", "--keep-going"],
    )
    assert result.exit_code == 0, result.output


def test_toc_rebuild(cli, build_resources):
    """Changes to the TOC should force a re-build of pages. Also tests for changes
    to the relative ordering of content pages.
    """
    _, tocs = build_resources
    toc = tocs / "_toc_simple.yml"
    index_html = tocs.joinpath("_build", "html", "index.html")

    # Not using -W because we expect warnings for pages not listed in TOC
    result = cli.invoke(
        commands.build, [tocs.as_posix(), "--toc", toc.as_posix(), "-n"],
    )
    html = BeautifulSoup(index_html.read_text(encoding="utf8"), "html.parser")
    tags = html.find_all("a", "reference internal")
    assert result.exit_code == 0, result.output
    assert tags[1].attrs["href"] == "content1.html"
    assert tags[2].attrs["href"] == "content2.html"

    toc.write_text("- file: index\n- file: content2\n- file: content1\n")
    result = cli.invoke(
        commands.build, [tocs.as_posix(), "--toc", toc.as_posix(), "-n"],
    )
    assert result.exit_code == 0, result.output
    html = BeautifulSoup(index_html.read_text(encoding="utf8"), "html.parser")
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
    with pytest.raises(RuntimeError):
        result = cli.invoke(
            commands.build, [tocs.as_posix(), "--toc", (tocs / toc).as_posix(), "-W"]
        )
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
    with pytest.raises(RuntimeError):
        result = cli.invoke(commands.build, [p_notoc.as_posix()])
        assert result.exit_code == 1
        assert "Couldn't find a Table of Contents file" in str(result.exception)
        raise result.exception

    # Test error on warnings and book error message
    p_syntax = books.joinpath("sphinx_syntaxerr")
    with pytest.raises(RuntimeError):
        result = cli.invoke(commands.build, [p_syntax.as_posix(), "-W"])
        assert result.exit_code == 1
        assert "There was an error in building your book" in str(result.exception)
        raise result.exception

    # Config file path does not exist
    with pytest.raises(IOError):
        result = cli.invoke(
            commands.build, [p_syntax.as_posix(), "--config", "non_existent_path"]
        )
        assert result.exit_code == 1
        assert "Config file path given, but not found" in str(result.exception)
        raise result.exception


def test_build_page(pages, cli):
    """Test building a page."""
    page = pages.joinpath("single_page.ipynb")
    html = pages.joinpath("_build", "_page", "single_page", "html")
    index = html.joinpath("index.html")
    result = cli.invoke(commands.build, [page.as_posix(), "-n", "-W", "--keep-going"])
    assert result.exit_code == 0, result.output
    assert html.joinpath("single_page.html").exists()
    assert not html.joinpath("extra_page.html").exists()
    assert 'url=single_page.html" />' in index.read_text(encoding="utf8")


def test_build_page_nested(build_resources, cli):
    """Test building a page."""
    books, _ = build_resources
    src = books.joinpath("nested")
    page = src.joinpath("contents", "markdown.md")
    html = src.joinpath("_build", "_page", "contents-markdown", "html")
    index = html.joinpath("index.html")
    result = cli.invoke(commands.build, [page.as_posix(), "-n", "-W", "--keep-going"])
    assert result.exit_code == 0, result.output
    assert html.joinpath("markdown.html").exists()
    assert not html.joinpath("extra_page.html").exists()
    assert 'url=markdown.html" />' in index.read_text(encoding="utf8")


@pytest.mark.skipif(sphinx.version_info[0] == 2, reason="randomly fails on CI")
def test_execution_timeout(pages, build_resources, cli):
    """Testing timeout execution for a page."""
    books, _ = build_resources
    path_page = pages.joinpath("loop_unrun.ipynb")
    path_c = books.joinpath("config", "_config_timeout.yml")
    path_html = pages.joinpath("_build", "_page", "loop_unrun", "html")
    result = cli.invoke(
        commands.build,
        [
            path_page.as_posix(),
            "--config",
            path_c.as_posix(),
            "-n",
            "-W",
            "--keep-going",
        ],
    )
    assert "Execution Failed" in result.stdout
    assert path_html.joinpath("reports", "loop_unrun.log").exists()
