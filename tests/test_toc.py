from pathlib import Path

from click.testing import CliRunner
import yaml
from bs4 import BeautifulSoup

from jupyter_book.commands import build, toc

path_books = Path(__file__).parent.joinpath("books")


def test_toc_basic(cli: CliRunner, build_resources):
    books, tocs = build_resources
    # run(f"jb toc {tocs}".split(), check=True)
    result = cli.invoke(toc, tocs.as_posix())
    assert result.exit_code == 0

    toc_yaml = tocs.joinpath("_toc.yml")
    _ = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))


def test_toc_fail(cli: CliRunner, build_resources):
    """Folder with no content should return none"""
    books, tocs = build_resources
    p_empty = tocs.parent
    result = cli.invoke(toc, p_empty.as_posix())
    assert result.exit_code != 0
    assert isinstance(result.exception, RuntimeError)
    assert "No content files were found in" in str(result.exception)


def test_toc_add_titles(cli: CliRunner, build_resources):
    books, tocs = build_resources
    result = cli.invoke(toc, tocs.as_posix())
    assert result.exit_code == 0
    toc_yaml = tocs.joinpath("_toc.yml")
    res = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))
    assert "title" not in res
    for section in res["sections"]:
        assert "title" not in section

    result = cli.invoke(toc, (tocs.as_posix(), "--add-titles"))
    assert result.exit_code == 0
    toc_yaml = tocs.joinpath("_toc.yml")
    res = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))
    assert "title" in res
    for section in res["sections"]:
        assert "title" in section


def test_toc_skip_text(cli: CliRunner, build_resources):
    """Test that skipped files are not include in toc"""
    books, tocs = build_resources
    result = cli.invoke(toc, tocs.as_posix())
    assert result.exit_code == 0
    toc_yaml = tocs.joinpath("_toc.yml")
    res = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))
    files = [section["file"] for section in res["sections"]]
    assert "content2" in files
    
    # Test we exclude only specific files according to pattern
    skip_tests = ["content2", "ontent2", "2"]
    for skip_test in skip_tests:
      result = cli.invoke(toc, (tocs.as_posix(), "--skip_text", skip_test))
      assert result.exit_code == 0
      toc_yaml = tocs.joinpath("_toc.yml")
      res_ = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))
      files = [section["file"] for section in res_["sections"]]
      assert "content1" in files
      assert "content2" not in files

    # Test we exclude general files according to pattern
    skip_tests = ["content", "onten" ]
    for skip_test in skip_tests:
      result = cli.invoke(toc, (tocs.as_posix(), "--skip_text", skip_test))
      assert result.exit_code == 0
      toc_yaml = tocs.joinpath("_toc.yml")
      res_ = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))
      files = [section["file"] for section in res_["sections"]]
      assert not any(skip_test in s for s in files)

    # Test we don't error if there are no matches
    result = cli.invoke(toc, (tocs.as_posix(), "--skip_text", "otherwise"))
    assert result.exit_code == 0
    toc_yaml = tocs.joinpath("_toc.yml")
    res_ = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))
    # Should this be a proper dictionary comparison assertion test?
    assert res == res_


def test_toc_numbered(cli: CliRunner, temp_with_override, file_regression):
    """Testing that numbers make it into the sidebar"""
    path_output = temp_with_override.joinpath("mybook").absolute()
    toc_list = [
        "_toc_numbered.yml",  # Numbered in top-level title
        "_toc_numbered_depth.yml",  # Numbering limited to depth 1
        "_toc_numbered_parts.yml",  # Numbered in top-level title w/ parts
        "_toc_numbered_parts_subset.yml",  # Only some sections numbered
        "_toc_numbered_depth_parts_subset.yml",  # Selected numbering limited to depth 1
    ]
    for itoc in toc_list:
        # Numbering with files
        p_toc = path_books.joinpath("toc")
        path_toc = p_toc.joinpath(itoc)
        result = cli.invoke(
            build,
            [
                p_toc.as_posix(),
                "--path-output",
                path_output.as_posix(),
                "--toc",
                path_toc.as_posix(),
                "-W",
            ],
        )
        assert result.exit_code == 0

        path_toc_directive = path_output.joinpath("_build", "html", "index.html")

        # get the tableofcontents markup
        soup = BeautifulSoup(
            path_toc_directive.read_text(encoding="utf8"), "html.parser"
        )
        toc = soup.select("nav.bd-links")[0]
        file_regression.check(str(toc), basename=itoc.split(".")[0], extension=".html")
