import os
import os.path as op
from subprocess import run, CalledProcessError
import shutil as sh
from ruamel.yaml import YAML
import pytest
from jupyter_book.utils import _split_yaml

def read(path):
    with open(path, 'r') as ff:
        text = ff.read()
    return text

yaml = YAML()
this_folder = op.dirname(__file__)

########################################################################################################
# Creating a new book with the CLI
########################################################################################################

path_test_book = op.join(this_folder, 'site')
path_toc = op.join(path_test_book, '_data', 'toc.yml')
path_content = op.join(path_test_book, 'content')
path_license = op.join(path_test_book, 'test_license.md')

def test_round_trip(tmpdir):
    path_config = op.join(this_folder, '..', 'book_template', '_config.yml')
    path_out = op.join(tmpdir.dirpath(), 'tmp_test')
    new_name = "test"
    cmd = ["jupyter-book", "create", new_name, "--config", path_config,
        "--toc", path_toc, "--content-folder", path_content, "--license", path_license,
        "--out-folder", path_out]
    run(cmd, check=True)

    # Table of contents
    old_toc = read(path_toc)
    new_toc = read(op.join(path_out, new_name, '_data', 'toc.yml'))
    assert old_toc == new_toc

    # Config files
    with open(path_config, 'r') as ff:
        old_config = yaml.load(ff)
    with open(op.join(path_out, new_name, '_config.yml'), 'r') as ff:
        new_config = yaml.load(ff)

    for ii in old_config.keys():
        assert old_config[ii] == new_config[ii]

    # License
    old_license = read(path_license)
    new_license = read(op.join(path_out, 'test', 'content', 'LICENSE.md'))
    assert old_license == new_license

    # Content
    for ifolder, _, ifiles in os.walk(path_content):
        for ifile in ifiles:
            basename = op.basename(ifile)
            # Only check the text files we care about since reading in other files is trickier
            if 'LICENSE.md' in basename or all(ii not in basename for ii in ['.md', '.ipynb', '.html']):
                continue

            old_content = read(op.join(ifolder, ifile))
            new_content = read(op.join(path_out, 'test', 'content', ifolder, basename))
            assert old_content == new_content

    # This should raise an error because the folder exists now
    with pytest.raises(CalledProcessError):
        cmd = ["jupyter-book", "create", new_name, "--config", path_config,
            "--toc", path_toc, "--content-folder", path_content, "--license", path_license,
            "--out-folder", path_out]
        run(cmd, check=True)

    # If we succeed, remove the tmpdir
    tmpdir.remove()

def test_config_update(tmpdir):
    path_out = op.join(tmpdir.dirpath(), 'tmp_test')
    path_config = op.join(this_folder, 'configs', 'config_simple.yml')
    new_name = "test2"

    cmd = ["jupyter-book", "create", new_name, "--config", path_config,
        "--toc", path_toc, "--content-folder", path_content, "--license", path_license,
        "--out-folder", path_out]
    run(cmd, check=True)

    # Config files
    with open(path_config, 'r') as ff:
            old_config = yaml.load(ff)

    with open(op.join(path_out, new_name, '_config.yml'), 'r') as ff:
        new_config = yaml.load(ff)

    for ii in old_config.keys():
        assert old_config[ii] == new_config[ii]

    # If we succeed, remove the tmpdir
    tmpdir.remove()

########################################################################################################
# Building the book after the book is created
########################################################################################################

####################################################
# Helper funcs

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


def test_build(tmpdir):
    path_build_test = op.join(tmpdir.dirpath(), 'tmp_test', 'test')
    if op.isdir(op.join(path_build_test, '_build')):
        sh.rmtree(op.join(path_build_test, '_build'))
    print("Building site for test suite...")

    # Copy over the config.yml file from the template so that this builds
    cmd = ["jupyter-book", 'build', path_build_test]
    out = run(cmd, check=True)


def test_notebook(tmpdir):
    path_build_test = op.join(tmpdir.dirpath(), 'tmp_test', 'test')
    with open(op.join(path_build_test, '_build', 'tests', 'notebooks.md'), 'r') as ff:
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
    assert op.exists(op.join(path_build_test, '_build', 'tests', 'cool.jpg'))


def test_split_yaml(tmpdir):
    path_build_test = op.join(tmpdir.dirpath(), 'tmp_test', 'test')
    with open(op.join(path_build_test, '_build', 'tests', 'features.md'), 'r') as ff:
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

def test_notebook_update(tmpdir):
    path_build_test = op.join(tmpdir.dirpath(), 'tmp_test', 'test')
    cmd = ["jupyter-book", 'build', path_build_test]

    source_file = op.join(path_build_test, 'content', 'tests', 'features.md')
    target_file = op.join(path_build_test, '_build', 'tests', 'features.md')
    source_text = 'https://'
    target_text = 'www.'

    # replace source_text with target_text in source_file
    assert is_not_in(open(target_file).readlines(), target_text)
    replace_in_file(source_text, target_text, source_file)
    out = run(cmd, check=True)
    assert is_in(open(target_file).readlines(), target_text)
    replace_in_file(target_text, source_text, source_file)
    out = run(cmd, check=True)
    assert is_not_in(open(target_file).readlines(), target_text)

def test_upgrade(tmpdir):
    path_build_test = op.join(tmpdir.dirpath(), 'tmp_test', 'test')

    # Change the contents of a file in test to see if it is updated
    with open(op.join(path_build_test, 'assets', 'css', 'styles.scss'), 'w') as ff:
        ff.write("RANDOMTEXT")
    cmd = ["jupyter-book", 'upgrade', path_build_test]
    run(cmd, check=True)

    # Make sure the test contents are the same
    with open(op.join(path_build_test, 'assets', 'css', 'styles.scss'), 'r') as ff:
        text = ff.read()
        assert "RANDOMTEXT" not in text