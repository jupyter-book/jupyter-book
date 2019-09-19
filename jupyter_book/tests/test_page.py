"""Tests for conversions of a single page."""

import os.path as op
import jupytext as jpt

from jupyter_book.page import page_html

this_folder = op.dirname(__file__)


def test_jupytext(tmpdir):
    path_jupytext_dir = op.join(this_folder, 'site', 'content', 'tests', 'jupytext')

    jupytext_files = {
        '.md': op.join(path_jupytext_dir, 'jupytext_md.md'),
        '.ipynb': op.join(path_jupytext_dir, 'jupytext_ipynb.ipynb'),
        '.py': op.join(path_jupytext_dir, 'jupytext_py.py'),
        '.Rmd': op.join(path_jupytext_dir, 'jupytext_Rmd.Rmd')
    }

    jupytext_html = {}

    for ext, ifile in jupytext_files.items():
        ntbk = jpt.read(ifile)
        html, resources = page_html(ntbk, execute_dir=path_jupytext_dir)
        jupytext_html[ext] = html

        assert "tag_hide_input" in html
        assert "This message should display: 4" in html

    # Make sure all of the jupytext files in different formats are the same
    base_ext = ".ipynb"
    for compare_ext in [".md", ".py", ".Rmd"]:
        assert jupytext_html[base_ext] == jupytext_html[compare_ext]
