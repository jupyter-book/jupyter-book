from pathlib import Path

import pytest
from bs4 import BeautifulSoup
from click.testing import CliRunner

from jupyter_book.cli import main as commands

PATH_BOOKS = Path(__file__).parent.joinpath("books")


@pytest.mark.parametrize(
    "toc_file",
    (
        "_toc_numbered.yml",  # Numbered at top-level
        "_toc_numbered_depth.yml",  # Numbered at top-level, limited to depth 1
        "_toc_numbered_parts.yml",  # Numbered at top-level w/ parts
        "_toc_numbered_parts_subset.yml",  # Only some sections numbered
        "_toc_numbered_depth_parts_subset.yml",  # Selected numbering limited to depth 1
    ),
)
def test_toc_numbered_multitoc_numbering_false(
    toc_file: str, cli: CliRunner, temp_with_override, file_regression
):
    """Testing use_multitoc_numbering: false"""
    path_output = temp_with_override.joinpath("book2").absolute()
    p_toc = PATH_BOOKS.joinpath("toc")
    path_toc = p_toc.joinpath(toc_file)
    path_config = PATH_BOOKS.joinpath("config").joinpath(
        "_config_sphinx_multitoc_numbering.yml"
    )
    result = cli.invoke(
        commands.build,
        [
            p_toc.as_posix(),
            "--path-output",
            path_output.as_posix(),
            "--toc",
            path_toc.as_posix(),
            "--config",
            path_config.as_posix(),
            "-W",
        ],
    )
    assert result.exit_code == 0, result.output

    path_toc_directive = path_output.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.select("nav.bd-links")[0]
    file_regression.check(
        toc.prettify(),
        basename=toc_file.split(".")[0] + "_multitoc_numbering_false",
        extension=".html",
    )
