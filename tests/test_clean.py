"""Testing clean functionality of the CLI."""

from pathlib import Path
from subprocess import run, PIPE
import pytest
import os


path_tests = Path(__file__).parent.resolve()
path_books = path_tests.joinpath("books")
path_root = path_tests.parent


def test_clean_book(tmpdir):
    path = path_books.joinpath("clean_cache")
    build_path = path.joinpath("_build")
    run(f"jb build {path}".split())

    # Ensure _build exists
    assert build_path.exists()

    # Ensure _build/.jupyter_cache exists
    assert build_path.joinpath(".jupyter_cache").exists()

    # Empty _build except .jupyter_cache
    run(f"jb clean {path}".split())

    # Ensure _build and .jupyter_cache exist
    assert build_path.exists()
    assert build_path.joinpath(".jupyter_cache").exists()

    run(f"jb clean --all {path}".split())
    # Ensure _build is removed
    assert not path.joinpath("_build").exists()

    # === Excepted errors ===
    # Non-existent folder
    with pytest.raises(ValueError):
        out = run("jb clean doesnt/exist".split(), stderr=PIPE)
        err = out.stderr.decode()
        if "ValueError" in err:
            raise ValueError(err)
    assert "Path to book isn't a directory" in err


def test_clean_html(tmpdir):
    path = path_books.joinpath("clean_cache")
    build_path = path.joinpath("_build")
    run(f"jb build {path}".split())

    # Ensure _build exists
    assert build_path.exists()
    # Ensure _build/html exists
    assert build_path.joinpath("html").exists()

    # Remove html
    run(f"jb clean --html {path}".split())

    # Ensure _build  exists
    assert build_path.exists()

    # Ensure html is removed
    assert not build_path.joinpath("html").exists()


def test_clean_latex(tmpdir):
    path = path_books.joinpath("clean_cache")
    run(f"jb build {path}".split())

    build_path = path.joinpath("_build")
    # Ensure _build exists
    assert build_path.exists()

    os.mkdir(os.path.join(build_path, "latex"))

    # Ensure _build/html exists
    assert build_path.joinpath("latex").exists()

    # Remove html
    run(f"jb clean --latex {path}".split())

    # Ensure _build exists
    assert build_path.exists()

    # Ensure latex is removed
    assert not build_path.joinpath("latex").exists()


def test_clean_html_latex(tmpdir):
    path = path_books.joinpath("clean_cache")
    run(f"jb build {path}".split())

    build_path = path.joinpath("_build")

    # Ensure _build exists
    assert build_path.exists()
    os.mkdir(os.path.join(build_path, "latex"))

    # Ensure _build/html exists
    assert build_path.joinpath("latex").exists()

    # Ensure _build/html exists
    assert build_path.joinpath("html").exists()

    # Remove html
    run(f"jb clean --html --latex {path}".split())

    # Ensure _build exists
    assert build_path.exists()

    # Ensure latex is removed
    assert not build_path.joinpath("latex").exists()

    # Ensure html is removed
    assert not build_path.joinpath("html").exists()
