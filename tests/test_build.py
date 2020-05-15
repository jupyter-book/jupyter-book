from pathlib import Path
from subprocess import run, PIPE
import pytest


path_tests = Path(__file__).parent.resolve()
path_books = path_tests.joinpath("books")
path_root = path_tests.parent


def test_build_book(tmpdir):
    """Test building the book template and a few test configs."""
    # Create the book from the template
    path = Path(tmpdir).joinpath("mybook").absolute()
    run(f"jb create {path}".split())

    # Ensure the book is created properly
    assert path.joinpath("_config.yml").exists()

    # Build the book
    run(f"jb build {path}".split(), check=True)
    path_html = path.joinpath("_build", "html")
    assert path_html.joinpath("index.html").exists()
    assert path_html.joinpath("intro.html").exists()

    # Test custom config values
    path_config = path_books.joinpath("config")
    run(f"jb build {path_config}".split(), check=True)
    html = path_config.joinpath("_build", "html", "index.html").read_text()
    assert '<h1 class="site-logo" id="site-title">TEST PROJECT NAME</h1>' in html
    assert '<div class="sphinx-tabs docutils container">' in html
    assert '<link rel="stylesheet" type="text/css" href="_static/mycss.css" />' in html
    assert '<script src="_static/js/myjs.js"></script>' in html


def test_toc_builds(tmpdir):
    """Test building the book template with several different TOC files."""
    path_output = Path(tmpdir).joinpath("mybook").absolute()

    # Regular TOC should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc.yml")
    out = run(f"jb build {p_toc} --path-output {tmpdir} --toc {path_toc} -W".split())

    # TOC with a single-item list should work
    p_toc = path_books.joinpath("toc")
    path_toc = p_toc.joinpath("_toc_startwithlist.yml")
    out = run(f"jb build {p_toc} --path-output {tmpdir} --toc {path_toc} -W".split())

    # TOC errors
    p_toc = path_books.joinpath("toc")

    with pytest.raises(ValueError):
        path_toc = p_toc.joinpath("_toc_startswithheader.yml")
        out = run(
            f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
            stderr=PIPE,
        )
        err = out.stderr.decode()
        if "There was an error in building your book." in err:
            raise ValueError(err)
    assert "Table of Contents must start with your first page" in err

    with pytest.raises(ValueError):
        path_toc = p_toc.joinpath("_toc_url.yml")
        out = run(
            f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
            stderr=PIPE,
        )
        err = out.stderr.decode()
        if "Warning, treated as error:" in err:
            raise ValueError(err)
    assert "Rename `url:` to `file:`" in err

    with pytest.raises(ValueError):
        path_toc = p_toc.joinpath("_toc_urlwithouttitle.yml")
        out = run(
            f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
            stderr=PIPE,
        )
        err = out.stderr.decode()
        if "Warning, treated as error:" in err:
            raise ValueError(err)
    assert "`url:` link should" in err

    with pytest.raises(ValueError):
        path_toc = p_toc.joinpath("_toc_wrongkey.yml")
        out = run(
            f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
            stderr=PIPE,
        )
        err = out.stderr.decode()
        if "Warning, treated as error:" in err:
            raise ValueError(err)
    assert "Unknown key in `_toc.yml`: foo" in err


def test_build_errors(tmpdir):
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
    with pytest.raises(ValueError):
        out = run(f"jb build {path} --builder blah".split(), stderr=PIPE)
        err = out.stderr.decode()
        if "ValueError" in err:
            raise ValueError(err)
    assert "Value for --builder must be one of" in err

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
