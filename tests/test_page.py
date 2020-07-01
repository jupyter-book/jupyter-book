from pathlib import Path
from subprocess import run, PIPE
import pytest


path_tests = Path(__file__).parent.resolve()
path_books = path_tests.joinpath("books")
path_root = path_tests.parent


def test_build_page(tmpdir):
    """Test building the documentation book."""
    path_output = Path(tmpdir).absolute()
    path_page = path_tests.joinpath("pages", "single_page.ipynb")

    run(f"jb page {path_page} --path-output {path_output}".split(), check=True)
    path_html = path_output.joinpath("_build", "html")
    assert path_html.joinpath("single_page.html").exists()
    # The extra page shouldn't have been built with Sphinx (or run)
    assert not path_html.joinpath("extra_page.html").exists()


def test_execution_timeout(tmpdir):
    """Test building the documentation book."""
    path_output = Path(tmpdir).absolute()
    path_page = path_tests.joinpath("pages", "complex_outputs_unrun.ipynb")
    path_c = path_books.joinpath("config", "_config_timeout.yml")

    # should fail because of timeout value 1
    out = run(
        f"jb page {path_page} --path-output {path_output} --config {path_c}".split(),
        stderr=PIPE,
    )
    err = out.stderr.decode()
    path_html = path_output.joinpath("_build", "html")
    assert path_html.joinpath("complex_outputs_unrun.html").exists()
    assert "Execution Failed" in err
    assert path_html.joinpath("reports").joinpath("complex_outputs_unrun.log").exists()


def test_page_errors(tmpdir):

    # === Expected errors ===
    path_page = path_tests.joinpath("pages", "single_page.ipynb")

    # Path should not be a folder
    with pytest.raises(ValueError):
        out = run(f"jb page {path_books}".split(), stderr=PIPE)
        err = out.stderr.decode()
        if "ValueError" in err:
            raise ValueError(err)
    assert "Path to page is a directory" in err

    # Incorrect build
    with pytest.raises(ValueError):
        out = run(f"jb page {path_page} --builder blah".split(), stderr=PIPE)
        err = out.stderr.decode()
        if "ValueError" in err:
            raise ValueError(err)
    assert "Value for --builder must be one of" in err

    # Test error on warnings and book error message
    p_syntax = path_books.joinpath("sphinx_syntaxerr").joinpath("index.md")
    with pytest.raises(ValueError):
        out = run(f"jb page {p_syntax} -W".split(), stderr=PIPE)
        err = out.stderr.decode()
        if "Warning, treated as error:" in err:
            raise ValueError(err)
    assert "There was an error in building your page" in err
