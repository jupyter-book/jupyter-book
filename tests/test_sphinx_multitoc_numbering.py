import subprocess

import pytest
import sphinx
from bs4 import BeautifulSoup

# from jupyter_book.cli import main as commands

SPHINX_VERSION = f".sphinx{sphinx.version_info[0]}"


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
    toc_file, cli, build_resources, file_regression
):
    """Testing use_multitoc_numbering: false"""
    books, tocs = build_resources
    config = books.joinpath("config").joinpath("_config_sphinx_multitoc_numbering.yml")
    toc = tocs.joinpath(toc_file)
    # TODO: commented out because of the issue described below. Uncomment when it is resolved.
    # Issue #1339: There is an issue when using CliRunner and building projects
    # that make use of --config. The internal state of Sphinx appears to
    # be correct, but the written outputs (i.e. html) are not correct
    # suggesting some type of caching is going on.
    # result = cli.invoke(
    #     commands.build,
    #     [
    #         tocs.as_posix(),
    #         "--path-output",
    #         books.as_posix(),
    #         "--toc",
    #         toc.as_posix(),
    #         "--config",
    #         config.as_posix(),
    #         "-W",
    #     ],
    # )
    # assert result.exit_code == 0, result.output
    process = subprocess.Popen(
        [
            "jb",
            "build",
            tocs.as_posix(),
            "--path-output",
            books.as_posix(),
            "--toc",
            toc.as_posix(),
            "--config",
            config.as_posix(),
            "-W",
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    stdout, stderr = process.communicate()
    assert process.returncode == 0, stderr

    path_toc_directive = books.joinpath("_build", "html", "index.html")

    # get the tableofcontents markup
    soup = BeautifulSoup(path_toc_directive.read_text(encoding="utf8"), "html.parser")
    toc = soup.select("nav.bd-links")[0]
    file_regression.check(
        toc.prettify(),
        basename=toc_file.split(".")[0] + "_multitoc_numbering_false",
        extension=f"{SPHINX_VERSION}.html",
    )
