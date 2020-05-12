from pathlib import Path
from subprocess import run, PIPE
import pytest
import yaml


def test_toc():
    path_book = Path(__file__).parent.joinpath("books", "toc")
    run(f"jb toc {path_book}".split(), check=True)
    toc_yaml = path_book.joinpath("_toc.yml")
    _ = yaml.safe_load(toc_yaml.read_text())

    # Folder with no content should return none
    p_empty = path_book.parent
    with pytest.raises(ValueError):
        out = run(f"jb toc {p_empty}".split(), stderr=PIPE, stdout=PIPE)
        err = out.stderr.decode()
        if "ValueError" in err:
            raise ValueError(err)
    assert "No content files were found in" in err


def test_toc_no_title():
    path_book = Path(__file__).parent.joinpath("books", "toc")
    run(f"jb toc {path_book} --no-title".split(), check=True)
    toc_yaml = path_book.joinpath("_toc.yml")
    res = yaml.safe_load(toc_yaml.read_text())
    assert "title" not in res
    for section in res['sections']:
        assert "title" not in section