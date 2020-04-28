"""Testing PDF functionality of the CLI."""

from pathlib import Path
from subprocess import run

path_tests = Path(__file__).parent


def test_pdfhtml(tmpdir):
    path_output = Path(tmpdir).absolute()
    path_template = path_tests.parent.joinpath("jupyter_book", "book_template")
    cmd = f"jb build {path_template} --path-output {path_output} --builder pdfhtml"
    run(cmd.split(), check=True)
    path_html = path_output.joinpath("_build", "html")
    path_pdf = path_output.joinpath("_build", "pdf")
    assert path_html.joinpath("index.html").exists()
    assert path_pdf.joinpath("book.pdf").exists()


# TODO: Update to include more detailed tests for pdflatex build chain
def test_pdflatex(tmpdir):
    path_output = Path(tmpdir).absolute()
    path_template = path_tests.parent.joinpath("jupyter_book", "book_template")
    cmd = f"jb build {path_template} --path-output {path_output} --builder pdflatex"
    run(cmd.split(), check=True)
    path_pdf = path_output.joinpath("_build", "latex")
    assert path_pdf.joinpath("book.pdf").exists()
