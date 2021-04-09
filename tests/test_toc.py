# from pathlib import Path

# from click.testing import CliRunner
# import yaml
# from bs4 import BeautifulSoup

# from jupyter_book.cli.main import build, toc

# path_books = Path(__file__).parent.joinpath("books")


# def test_toc_basic(cli: CliRunner, build_resources):
#     books, tocs = build_resources
#     # run(f"jb toc {tocs}".split(), check=True)
#     result = cli.invoke(toc, tocs.as_posix())
#     assert result.exit_code == 0

#     toc_yaml = tocs.joinpath("_toc.yml")
#     _ = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))


# def test_toc_fail(cli: CliRunner, build_resources):
#     """Folder with no content should return none"""
#     books, tocs = build_resources
#     p_empty = tocs.parent
#     result = cli.invoke(toc, p_empty.as_posix())
#     assert result.exit_code != 0
#     assert isinstance(result.exception, RuntimeError)
#     assert "No content files were found in" in str(result.exception)


# def test_toc_add_titles(cli: CliRunner, build_resources):
#     books, tocs = build_resources
#     result = cli.invoke(toc, tocs.as_posix())
#     assert result.exit_code == 0
#     toc_yaml = tocs.joinpath("_toc.yml")
#     res = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))
#     assert "title" not in res
#     for section in res["sections"]:
#         assert "title" not in section

#     result = cli.invoke(toc, (tocs.as_posix(), "--add-titles"))
#     assert result.exit_code == 0
#     toc_yaml = tocs.joinpath("_toc.yml")
#     res = yaml.safe_load(toc_yaml.read_text(encoding="utf8"))
#     assert "title" in res
#     for section in res["sections"]:
#         assert "title" in section
