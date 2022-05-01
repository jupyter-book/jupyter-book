import pickle

import pytest
from TexSoup import TexSoup

from jupyter_book.cli.main import build


@pytest.mark.requires_tex
def test_toc(cli, build_resources, file_regression):
    books, tocs = build_resources
    path_parts_toc = books.joinpath("sphinx-jupyterbook-latex")
    cmd = f"{path_parts_toc} --builder pdflatex"
    result = cli.invoke(build, cmd.split())
    assert result.exit_code == 0, result.output

    # reading the tex file
    path_output_file = path_parts_toc.joinpath("_build", "latex", "book.tex")
    file_content = TexSoup(path_output_file.read_text())

    # checking if correct no. of parts, chapters, sections are present
    parts = list(file_content.find_all("part"))
    chapters = list(file_content.find_all("chapter"))
    sections = list(file_content.find_all("section"))
    assert len(parts) == 2
    assert len(chapters) == 3
    assert len(sections) == 4

    # reading the xml file
    doctree_path = path_parts_toc.joinpath("_build", ".doctrees", "intro.doctree")
    doc = pickle.load(open(doctree_path, "rb"))
    pseudoxml = doc.pformat()

    # to remove source attribute of document as it is a temp
    index = pseudoxml.index("\n")
    substr = pseudoxml[index:]
    pseudoxml = "<document>" + substr
    file_regression.check(str(pseudoxml), extension=".xml", encoding="utf8")
