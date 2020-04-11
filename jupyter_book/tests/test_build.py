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
