from pathlib import Path

import yaml
from click.testing import CliRunner
from sphinx_external_toc.cli import create_toc

path_books = Path(__file__).parent.joinpath("books")


def test_toc_basic(cli: CliRunner, build_resources):
    books, tocs = build_resources
    # run(f"jb toc from-project {tocs} -f jb-article".split(), check=True)
    result = cli.invoke(create_toc, [tocs.as_posix()])
    assert result.exit_code == 0
    yaml.safe_load(result.output)


def test_toc_fail(cli: CliRunner, build_resources):
    """Folder with no content should return none"""
    books, tocs = build_resources
    p_empty = tocs.parent
    result = cli.invoke(create_toc, [p_empty.as_posix()])
    assert result.exit_code != 0
    assert isinstance(result.exception, OSError)
    assert "path does not contain a root file" in str(result.exception)


def test_toc_add_titles(cli: CliRunner, build_resources):
    books, tocs = build_resources
    result = cli.invoke(create_toc, [tocs.as_posix(), "-f", "jb-article"])
    assert result.exit_code == 0
    res = yaml.safe_load(result.output)
    assert "title" not in res
    assert "sections" in res
    for section in res["sections"]:
        assert "title" not in section

    result = cli.invoke(
        create_toc, [tocs.as_posix(), "-f", "jb-article", "--guess-titles"]
    )
    assert result.exit_code == 0
    res = yaml.safe_load(result.output)
    # print(result.output)
    # assert "title" in res
    assert "sections" in res
    for section in res["sections"]:
        assert "title" in section


# note: build tests moved to test_build
