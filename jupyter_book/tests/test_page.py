"""Tests for conversions of a single page."""

import os.path as op
import jupytext as jpt

from jupyter_book.page import page_html, write_page
from jupyter_book.utils import load_ntbk

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


def test_page_standalone(tmpdir):
    path_ipynb = op.join(this_folder, 'site', 'content', 'tests', 'notebooks.ipynb')
    path_out = op.join(tmpdir.dirpath(), '.')
    ntbk = jpt.read(path_ipynb)
    html, resources = page_html(ntbk, execute_dir=op.dirname(path_ipynb))
    custom_css = """
    h1 {
        font-size: REALLYBIG;
    }
    """

    custom_js = """
    console.log("OMG")
    """

    path_html = write_page(html, path_out, resources, standalone=True,
                           custom_css=custom_css, custom_js=custom_js)

    with open(path_html, 'r') as ff:
        html = ff.read()

    assert "<!DOCTYPE html>" in html
    assert custom_css in html
    assert custom_js in html


def test_load_ntbk():
    path_ipynb = op.join(this_folder, 'site', 'content', 'tests', 'markdown.md')
    ntbk = load_ntbk(path_ipynb)
    assert 'testing: yaml' in ntbk.metadata['yaml_header']
