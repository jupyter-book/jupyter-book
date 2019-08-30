"""Tests for conversions of a single page."""

import os.path as op

from jupyter_book.page import build_page

this_folder = op.dirname(__file__)
path_template = op.join(this_folder, '..', 'book_template', 'scripts', 'templates', 'html.tpl')


def test_jupytext(tmpdir):
    path_out = op.join(tmpdir.dirpath(), 'tmp_test')
    path_ntbk = op.join(this_folder, 'site', 'content', 'tests', 'jupytext.md')
    build_page(path_ntbk, path_out, path_out, path_template=path_template)

    with open(op.join(path_out, 'jupytext.html'), 'r') as ff:
        text = ff.read()
        assert "tag_hide_input" in text
        assert "This message should display: 4" in text

    # Non-jupytext markdown should not be run
    path_ntbk = op.join(this_folder, 'site', 'content', 'tests', 'markdown.md')
    build_page(path_ntbk, path_out, path_out, path_template=path_template)

    with open(op.join(path_out, 'markdown.html'), 'r') as ff:
        text = ff.read()
        assert "2+2 is 4" not in text
