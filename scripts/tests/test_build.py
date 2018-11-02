"""Test a build of the Jupyter Book"""

import os
import os.path as op
import subprocess
import shutil as sh
import pytest

def is_in(lines, check):
    is_in = False
    for line in lines:
        if check in line:
            is_in = True
    return is_in

def is_not_in(lines, check):
    is_in = True
    for line in lines:
        if check in line:
            is_in = False
    return is_in

####################################################
# Delete old build and create a new one
curdir = op.dirname(op.abspath(__file__))
if op.isdir(op.join(curdir, 'site', '_build')):
    sh.rmtree(op.join(curdir, 'site', '_build'))

cmd = ["python", op.join(curdir, "..", "generate_book.py"),
       "--site_root", op.join(curdir, "site"), "--path-template", op.join(curdir, "..", "templates", "jekyllmd.tpl")]
out = subprocess.call(cmd)

####################################################
# Check outputs

def test_notebook():
    with open(op.join(curdir, 'site', '_build', 'tests', 'notebooks.md'), 'r') as ff:
        lines = ff.readlines()

    # Escaping characters get doubled
    assert is_in(lines, "\\\\$Escape \\\\$your \\\\$dollar signs!")

    # Notebook-converted images work
    assert is_in(lines, "../images/tests/notebooks_2_0.png")

    # Jekyll markdown classes are there
    assert is_in(lines, "{:.input_area}")

    # Cell hiding etc works
    assert is_not_in(lines, 'thisvariable = "none of this should show up in the textbook"')
    assert is_not_in(lines, '"this plot *will* show up in the textbook."')

    # Static files are copied over
    assert op.exists(op.join(curdir, 'site', '_build', 'tests', 'cool.jpg'))
