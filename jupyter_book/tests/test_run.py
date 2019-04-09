import nbformat as nbf
import os
import os.path as op
import shutil as sh

from jupyter_book.run import run_book

this_folder = op.dirname(__file__)


def test_run(tmpdir):
    path_content = op.join(this_folder, 'site', 'content')
    path_new_content = op.join(tmpdir.dirpath(), 'tmp_run')
    sh.copytree(path_content, path_new_content)
    # Remove an expensive notebook
    os.remove(op.join(path_new_content, 'tests', 'notebooks.ipynb'))

    # Run the notebooks in the new content folder
    run_book(path_new_content, 'python3')

    # Check that the outputs are there
    path_new_ntbk = op.join(path_new_content, 'tests', 'run.ipynb')
    ntbk = nbf.read(path_new_ntbk, nbf.NO_CONVERT)
    assert "a is foo" in ntbk.cells[2]['outputs'][0]['text']
