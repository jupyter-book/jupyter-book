from jupyter_book.toc import build_toc
from pathlib import Path
import pytest
import yaml


def test_toc():
    path_book = Path(__file__).parent.joinpath("books", "toc")
    toc_yaml = build_toc(path_book)
    toc_dict = yaml.safe_load(toc_yaml)

    # Folder with no content should return none
    with pytest.raises(ValueError):
        toc_yaml = build_toc(path_book.joinpath("anemptyfolder"))
