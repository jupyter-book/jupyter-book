from pathlib import Path
from subprocess import run, PIPE
import pytest
import yaml
from bs4 import BeautifulSoup


path_books = Path(__file__).parent.joinpath("books")


def test_toc(build_resources):
    books, tocs = build_resources
    run(f"jb toc {tocs}".split(), check=True)
    toc_yaml = tocs.joinpath("_toc.yml")
    _ = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))

    # Folder with no content should return none
    p_empty = tocs.parent
    with pytest.raises(ValueError):
        out = run(f"jb toc {p_empty}".split(), stderr=PIPE, stdout=PIPE)
        err = out.stderr.decode()
        if "ValueError" in err:
            raise ValueError(err)
    assert "No content files were found in" in err


def test_toc_add_titles(build_resources):
    books, tocs = build_resources
    run(f"jb toc {tocs}".split(), check=True)
    toc_yaml = tocs.joinpath("_toc.yml")
    res = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))
    assert "title" not in res
    for section in res["sections"]:
        assert "title" not in section

    run(f"jb toc {tocs} --add-titles".split(), check=True)
    toc_yaml = tocs.joinpath("_toc.yml")
    res = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))
    assert "title" in res
    for section in res["sections"]:
        assert "title" in section


def test_toc_numbered(tmpdir, file_regression):
    """Testing that numbers make it into the sidebar"""
    path_output = Path(tmpdir).joinpath("mybook").absolute()
    toc_list = [
        "_toc_numbered.yml",  # Numbered in top-level title
        "_toc_numbered_parts.yml",  # Numbered in top-level title w/ parts
        "_toc_numbered_parts_subset.yml",  # Only some sections numbered
    ]
    for itoc in toc_list:
        # Numbering with files
        p_toc = path_books.joinpath("toc")
        path_toc = p_toc.joinpath(itoc)
        run(
            f"jb build {p_toc} --path-output {path_output} --toc {path_toc} -W".split(),
            check=True,
        )

        path_toc_directive = path_output.joinpath("_build", "html", "index.html")

        # get the tableofcontents markup
        soup = BeautifulSoup(
            path_toc_directive.read_text(encoding="utf8"), "html.parser"
        )
        toc = soup.select("nav.bd-links")[0]
        file_regression.check(str(toc), basename=itoc.split(".")[0], extension=".html")
