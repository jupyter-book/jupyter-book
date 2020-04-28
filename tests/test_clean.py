"""Testing clean functionality of the CLI."""

from pathlib import Path
from subprocess import run, PIPE
import pytest


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
        out = run(f"jb clean doesnt/exist".split(), stderr=PIPE)
        err = out.stderr.decode()
        if "ValueError" in err:
            raise ValueError(err)
    assert "Path to book isn't a directory" in err

    # Non-existent _build
    with pytest.raises(ValueError):
        out = run(f"jb clean {path}".split(), stderr=PIPE)
        err = out.stderr.decode()
        if "ValueError" in err:
            raise ValueError(err)
    assert "Your book does not have a _build directory." in err
