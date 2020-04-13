from pathlib import Path
from subprocess import run


path_tests = Path(__file__).parent


def test_build_book(tmpdir):
    path = Path(tmpdir).joinpath("mybook").absolute()
    path_template = path_tests.parent.joinpath("book_template")
    run(f"jb create {path}".split())

    # Ensure the book is created properly
    assert path.joinpath("_config.yml").exists()

    # Build the book
    run(f"jb build {path}".split(), check=True)
    path_html = path.joinpath("_build", "html")
    assert path_html.joinpath("index.html").exists()
    for path_static in path_template.joinpath("static").glob("*"):
        assert path.joinpath("_static", path_static.name).exists()


def test_build_docs(tmpdir):
    """Test building the documentation book."""
    path_output = Path(tmpdir).absolute()
    path_docs = path_tests.parent.parent.joinpath("docs")
    run(f"jb build {path_docs} --path-output {path_output}".split(), check=True)
    path_html = path_output.joinpath("_build", "html")
    assert path_html.joinpath("index.html").exists()
    assert path_html.joinpath("intro.html").exists()
    assert path_html.joinpath("use", "citations.html").exists()


def test_build_page(tmpdir):
    """Test building the documentation book."""
    path_output = Path(tmpdir).absolute()
    path_page = path_tests.parent.parent.joinpath("examples", "single_page.ipynb")

    run(f"jb page {path_page} --path-output {path_output}".split(), check=True)
    path_html = path_output.joinpath("_build", "html")
    assert path_html.joinpath("single_page.html").exists()
