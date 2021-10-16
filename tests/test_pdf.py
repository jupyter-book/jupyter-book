"""Testing PDF functionality of the CLI."""

from pathlib import Path

import pytest
from click.testing import CliRunner

from jupyter_book.cli.main import build

path_tests = Path(__file__).parent


@pytest.mark.requires_chrome
def test_pdfhtml(cli: CliRunner, temp_with_override: Path):
    path_output = temp_with_override.absolute()

    # test for build
    path_template = path_tests.parent.joinpath("jupyter_book", "book_template")
    cmd = f"{path_template} --path-output {path_output} --builder pdfhtml"
    result = cli.invoke(build, cmd.split())
    assert result.exit_code == 0
    path_html = path_output.joinpath("_build", "html")
    path_pdf = path_output.joinpath("_build", "pdf")
    assert path_html.joinpath("index.html").exists()
    assert path_pdf.joinpath("book.pdf").exists()

    # test for page
    path_page = path_tests.parent.joinpath("jupyter_book", "book_template").joinpath(
        "markdown.md"
    )
    cmd = f"{path_page} --path-output {path_output} --builder pdfhtml"
    result = cli.invoke(build, cmd.split())
    assert result.exit_code == 0
    path_html = path_output.joinpath("_build", "_page", "markdown", "html")
    path_pdf = path_output.joinpath("_build", "_page", "markdown", "pdf")
    assert path_html.joinpath("markdown.html").exists()
    assert path_pdf.joinpath("markdown.pdf").exists()


# TODO: Update to include more detailed tests for pdflatex build chain
@pytest.mark.requires_tex
def test_pdflatex(cli: CliRunner, temp_with_override: Path):
    path_output = temp_with_override.absolute()

    # test for build
    path_template = path_tests.parent.joinpath("jupyter_book", "book_template")
    cmd = f"{path_template} --path-output {path_output} --builder pdflatex"
    result = cli.invoke(build, cmd.split())
    assert result.exit_code == 0
    path_pdf = path_output.joinpath("_build", "latex")
    assert path_pdf.joinpath("book.pdf").exists()

    # test for page
    path_page = path_tests.parent.joinpath("jupyter_book", "book_template").joinpath(
        "markdown.md"
    )
    cmd = f"{path_page} --path-output {path_output} --builder pdflatex"
    result = cli.invoke(build, cmd.split())
    assert result.exit_code == 0
    path_pdf = path_output.joinpath("_build", "_page", "markdown", "latex")
    assert path_pdf.joinpath("book.pdf").exists()


@pytest.mark.requires_tex
def test_pdflatex_individualpages(cli: CliRunner, temp_with_override: Path):
    path_output = (temp_with_override / "pdflatex_individualpages").absolute()
    path_output.mkdir(exist_ok=True)
    path_template = path_tests.parent.joinpath("jupyter_book", "book_template")
    cmd = f"{path_template} --path-output {path_output} \
            --builder pdflatex --individualpages"
    result = cli.invoke(build, cmd.split())
    assert result.exit_code == 0
    path_pdf = path_output.joinpath("_build", "latex")
    built_files = sorted([p.name for p in path_pdf.glob("*")])
    for filename in ("book.pdf", "markdown.pdf", "notebooks.pdf"):
        if not path_pdf.joinpath(filename).exists():
            raise AssertionError(
                f"file '{filename}' not in built files: {built_files!r}"
            )

    # removing as intro is startdoc for book
    # assert path_pdf.joinpath("intro.pdf").exists()


@pytest.mark.requires_tex
def test_pdflatex_individualpages_nested(cli: CliRunner, temp_with_override: Path):
    path_output = temp_with_override.absolute()
    path_template = path_tests.joinpath("books", "nested-pdflatex")
    cmd = f"{path_template} --path-output {path_output} \
            --builder pdflatex --individualpages"
    result = cli.invoke(build, cmd.split())
    assert result.exit_code == 0
    path_pdf = path_output.joinpath("_build", "latex")
    assert path_pdf.joinpath("book.pdf").exists()
    assert path_pdf.joinpath("content.pdf").exists()
    assert path_pdf.joinpath("sections-section1.pdf").exists()
    assert path_pdf.joinpath("sections-section2.pdf").exists()
