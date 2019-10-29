import nbformat as nbf
import os
import os.path as op
import shutil as sh

from jupyter_book.utils import run_pages

this_folder = op.dirname(__file__)


def test_run(tmpdir):
    path_content = op.join(this_folder, 'site', 'content')
    path_new_content = op.join(tmpdir.dirpath(), 'tmp_run')
    path_single_notebook = op.join(path_new_content, 'tests', 'run.ipynb')

    # Copy content and remove an expensive notebook
    sh.copytree(path_content, path_new_content)
    os.remove(op.join(path_new_content, 'tests', 'notebooks.ipynb'))

    # Run a single notebook to see if it works
    run_pages(path_single_notebook, 'python3')

    # Run the notebooks in the new content folder
    run_pages(path_new_content, 'python3')

    # Check that the outputs are there
    path_new_ntbk = op.join(path_new_content, 'tests', 'run.ipynb')
    ntbk = nbf.read(path_new_ntbk, nbf.NO_CONVERT)
    assert "a is foo" in ntbk.cells[2]['outputs'][0]['text']
