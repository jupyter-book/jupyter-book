"""Tests for conversions of a single page."""

import os.path as op

from jupyter_book.page import build_page

this_folder = op.dirname(__file__)
path_template = op.join(this_folder, '..', 'book_template', 'scripts', 'templates', 'html.tpl')


def test_jupytext(tmpdir):
    path_out = op.join(tmpdir.dirpath(), 'tmp_test')
    path_jupytext_dir = op.join(this_folder, 'site', 'content', 'tests', 'jupytext')

    jupytext_files = {
        '.md': op.join(path_jupytext_dir, 'jupytext_md.md'),
        '.ipynb': op.join(path_jupytext_dir, 'jupytext_ipynb.ipynb'),
        '.py': op.join(path_jupytext_dir, 'jupytext_py.py'),
        '.Rmd': op.join(path_jupytext_dir, 'jupytext_Rmd.Rmd')
    }

    jupytext_html = {}

    for ext, ifile in jupytext_files.items():
        build_page(ifile, path_out, path_out, path_template=path_template)

        # Now read in the built page and make sure there are correct things in it
        with open(op.join(path_out, op.basename(ifile).replace(ext, '.html')), 'r') as ff:
            text = ff.read()
            jupytext_html[ext] = text

        assert "tag_hide_input" in text
        assert "This message should display: 4" in text

    # Make sure all of the jupytext files in different formats are the same
    base_ext = ".ipynb"
    for compare_ext in [".md", ".py", ".Rmd"]:
        assert jupytext_html[base_ext] == jupytext_html[compare_ext]

    # Non-jupytext markdown should not be run
    path_ntbk = op.join(this_folder, 'site', 'content', 'tests', 'markdown.md')
    build_page(path_ntbk, path_out, path_out, path_template=path_template)

    with open(op.join(path_out, 'markdown.html'), 'r') as ff:
        text = ff.read()
        assert "2+2 is 4" not in text
