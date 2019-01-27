"""Test a build of the Jupyter Book"""

import os
import os.path as op
import sys
import subprocess
import shutil as sh
import pytest

this_folder = op.dirname(op.abspath(__file__))
sys.path.append(op.join(this_folder, '..'))
from jupyterbook.utils import _split_yaml

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

def replace_in_file(from_text, to_text, filename):
    with open(filename, "r") as sources:
        lines = sources.readlines()
    with open(filename, "w") as sources:
        for line in lines:
            sources.write(line.replace(from_text, to_text))

####################################################
# Delete old build and create a new one
curdir = op.dirname(op.abspath(__file__))
if op.isdir(op.join(curdir, 'site', '_build')):
    sh.rmtree(op.join(curdir, 'site', '_build'))

print("Building site for test suite...")
cmd = ["python", op.join(curdir, "..", "generate_book.py"),
       "--site-root", op.join(curdir, "site"), "--path-template", op.join(curdir, "..", "templates", "jekyllmd.tpl")]
out = subprocess.check_call(cmd)

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


def test_split_yaml():
    with open(op.join(curdir, 'site', '_build', 'tests', 'features.md'), 'r') as ff:
        lines = ff.readlines()

    # Make sure the yaml remains in the file
    assert is_in(lines, "yaml_frontmatter: true")

    # Edgecases etc on the splitter function
    assert _split_yaml([]) == ([], [])
    assert _split_yaml(['foo\n', 'bar\n']) == ([], ['foo\n', 'bar\n'])
    assert _split_yaml(['---\n', 'foo\n', 'bar\n']) == ([], ['---\n', 'foo\n', 'bar\n'])
    exp = ['---\n', 'foo\n', '---\n']
    assert _split_yaml(exp) == (['foo\n'], [])
    assert (_split_yaml(['---\n', 'foo\n', '---\n', 'baz\n', 'barf\n']) ==
            (['foo\n'], ['baz\n', 'barf\n']))
    assert (_split_yaml(['---\n', 'foo\n', 'bar\n', '---\n', 'baz\n', 'barf\n']) ==
            (['foo\n', 'bar\n'], ['baz\n', 'barf\n']))
    assert (_split_yaml(['\n', '\n', '---\n', 'foo\n', '---\n', 'baz\n', 'barf\n']) ==
            (['foo\n'], ['baz\n', 'barf\n']))
    assert (_split_yaml(['   \n', ' \n', '---\n', 'foo\n', '---\n', 'baz\n', 'barf\n']) ==
            (['foo\n'], ['baz\n', 'barf\n']))

def test_notebook_update():
    source_file = op.join(curdir, 'site', 'content', 'tests', 'features.md')
    target_file = op.join(curdir, 'site', '_build', 'tests', 'features.md')
    source_text = 'https://'
    target_text = 'www.'
    # replace source_text with target_text in source_file
    assert is_not_in(open(target_file).readlines(), target_text)
    replace_in_file(source_text, target_text, source_file)
    out = subprocess.check_call(cmd)
    assert is_in(open(target_file).readlines(), target_text)
    replace_in_file(target_text, source_text, source_file)
    out = subprocess.check_call(cmd)
    assert is_not_in(open(target_file).readlines(), target_text)
