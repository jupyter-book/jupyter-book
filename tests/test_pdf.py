"""Testing PDF functionality of the CLI."""

from pathlib import Path

from click.testing import CliRunner
import pytest

from jupyter_book.commands import build

path_tests = Path(__file__).parent


@pytest.mark.requires_chrome
def test_pdfhtml(cli: CliRunner, tmpdir):
    path_output = Path(tmpdir).absolute()

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
def test_pdflatex(cli: CliRunner, tmpdir):
    path_output = Path(tmpdir).absolute()

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
