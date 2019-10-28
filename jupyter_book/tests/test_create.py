import os
import os.path as op
from subprocess import run, CalledProcessError
import shutil as sh
from ruamel.yaml import YAML
import pytest

from jupyter_book.create import new_book


def read(path):
    with open(path, 'r') as ff:
        text = ff.read()
    return text


yaml = YAML()
this_folder = op.dirname(__file__)

######################################################
# Creating a new book with the CLI
######################################################

path_test_book = op.join(this_folder, 'site')
path_toc = op.join(path_test_book, '_data', 'toc.yml')
path_content = op.join(path_test_book, 'content')
path_license = op.join(path_test_book, 'test_license.md')


def test_round_trip(tmpdir):
    path_config = op.join(this_folder, 'configs', 'config_simple.yml')
    path_out = op.join(tmpdir.dirpath(), 'tmp_test')

    # Custom CSS and JS code
    path_js = op.join(path_test_book, "my_js.js")
    path_css = op.join(path_test_book, "my_css.css")

    # Run the create command
    new_name = "test"
    new_book(path_out=op.join(path_out, new_name),
             config=path_config, toc=path_toc, content_folder=path_content,
             custom_js=path_js, custom_css=path_css,
             extra_files=[op.join(path_test_book, 'foo', 'baz.txt'),
                          op.join(path_test_book, 'foo', 'you'),
                          op.join(path_test_book, "requirements.txt"),
                          op.join(path_test_book, "_bibliography")],
             license=path_license)

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
        if ii not in ["jupyter_book_version"]:
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
            new_content = read(
                op.join(path_out, 'test', 'content', ifolder, basename))
            assert old_content == new_content

    # CSS and JS
    assert file_contents_equal(path_js, op.join(
        path_out, "test", "assets", "custom", "custom.js"))
    assert file_contents_equal(path_css, op.join(
        path_out, "test", "assets", "custom", "custom.css"))

    # Extra files
    assert op.exists(op.join(path_out, "test", "baz.txt"))
    assert op.exists(op.join(path_out, "test", "you", "bar.txt"))

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
    path_config = op.join(this_folder, 'configs', 'config_update.yml')
    new_name = "test2"

    new_book(op.join(path_out, new_name), config=path_config,
             toc=path_toc, content_folder=path_content,
             license=path_license)

    # Config files
    with open(path_config, 'r') as ff:
        old_config = yaml.load(ff)

    with open(op.join(path_out, new_name, '_config.yml'), 'r') as ff:
        new_config = yaml.load(ff)

    for ii in old_config.keys():
        if ii not in ["jupyter_book_version"]:
            assert old_config[ii] == new_config[ii]

    # If we succeed, remove the tmpdir
    tmpdir.remove()


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

    # Make sure the requirements file was copied over properly
    with open(op.join(path_build_test, 'requirements.txt'), 'r') as ff:
        text = ff.read()
        assert "mytestrequirement" in text

    # Make sure the bibliography file was copied over properly
    with open(op.join(path_build_test, '_bibliography', 'references.bib'), 'r') as ff:
        text = ff.read()
        assert "my_references" in text

########################################################################################################
# Building the book after the book is created
########################################################################################################

####################################################
# Helper funcs


def is_in(lines, check, count=None):
    is_in = 0
    for line in lines:
        if check in line:
            is_in += 1
    is_in = is_in > 0 if count is None else is_in == count
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


def file_contents_equal(file1, file2):
    with open(file1, 'r') as ff:
        file1txt = ff.read()
    with open(file2, 'r') as ff:
        file2txt = ff.read()
    return file1txt == file2txt

####################################################
# Delete old build and create a new one


def test_build(tmpdir):
    path_build_test = op.join(tmpdir.dirpath(), 'tmp_test', 'test')
    if op.isdir(op.join(path_build_test, '_build')):
        sh.rmtree(op.join(path_build_test, '_build'))
    print("Building site for test suite...")

    # Copy over the config.yml file from the template so that this builds
    cmd = ["jupyter-book", 'build', path_build_test]
    run(cmd, check=True)

    # Make sure a config with incorrect version raises an error
    path_config_built = op.join(path_build_test, "_config.yml")
    # Read in our built config and update the version so it's a mismatch
    with open(path_config_built, 'r') as ff:
        config = yaml.load(ff)
        # Store the old version so we can re-use it later
        old_version = config['jupyter_book_version']
        config['jupyter_book_version'] = 999.999

    with open(path_config_built, 'w') as ff:
        yaml.dump(config, ff)

    # Now use the new config to build the book and it should error
    with pytest.raises(CalledProcessError):
        cmd = ["jupyter-book", 'build', path_build_test]
        run(cmd, check=True)

    # Finally we'll re-update the config so that it has the the right version again
    config['jupyter_book_version'] = old_version
    with open(path_config_built, 'w') as ff:
        yaml.dump(config, ff)


def test_notebook(tmpdir):
    path_build_test = op.join(tmpdir.dirpath(), 'tmp_test', 'test')
    with open(op.join(path_build_test, '_build', 'tests', 'notebooks.html'), 'r') as ff:
        lines = ff.readlines()

    # Notebook-converted images work (not checking number in case cell count changes)
    assert is_in(lines, "../images/tests/notebooks_")

    # Input area classes are there
    assert is_in(lines, 'class="input_area')

    # Cell hiding etc works
    assert is_in(lines, 'class="jb_cell tag_hide_input')
    assert not is_in(lines, 'none of this should show up in the textbook')

    # Static files are copied over
    assert op.exists(op.join(path_build_test, '_build', 'tests', 'cool.jpg'))

    # Kernel name is added from the notebook file
    assert is_in(lines, "kernel_name: python3")

    # No interactive outputs
    assert is_in(lines, "has_widgets: false")

    # Interact links are there
    assert is_in(lines, "interact_link:")

    # Testing external link being excluded from "next page"
    assert not is_in(lines, "url: https://github.com")

    # popout tag is inserted properly
    assert is_in(lines, 'class="jb_cell tag_popout"', 1)

    ###########################################
    # Testing interactive features

    with open(op.join(path_build_test, '_build', 'tests', 'interactive.html'), 'r') as ff:
        lines = ff.readlines()

    assert is_in(lines, "has_widgets: true")

    ###########################################
    # Testing notebook image paths etc
    with open(op.join(path_build_test, '_build', 'simple_notebook.html'), 'r') as ff:
        lines = ff.readlines()
    assert is_in(lines, '<img src="images/simple_notebook_2_0.png"')

    # Make sure the most common words at at the beginning of search
    assert is_in(lines, "search: commonword lesscommonword")

    ###########################################
    # Testing markdown file conversion

    with open(op.join(path_build_test, '_build', 'tests', 'markdown.html'), 'r') as ff:
        lines = ff.readlines()

    assert not is_in(lines, 'interact_link: ')


def test_titles(tmpdir):
    path_build_test = op.join(tmpdir.dirpath(), 'tmp_test', 'test')
    titles = [
        ("/titles/title_filename", "Title Filename"),
        ("/titles/title_heading", "My Heading Title"),
        ("/titles/title_toc", "My TOC Title")
    ]
    for ipath, ititle in titles:
        ipath = ipath.lstrip('/') + '.html'
        with open(op.join(path_build_test, '_build', ipath), 'r') as ff:
            lines = ff.readlines()
        assert is_in(lines, f'{ititle}\n')

        if "title_heading" in ipath:
            assert not is_in(lines, '<h1 id="My-Heading-Title">')


def test_extra_yaml(tmpdir):
    path_build_test = op.join(tmpdir.dirpath(), 'tmp_test', 'test')
    with open(op.join(path_build_test, '_build', 'tests', 'features.html'), 'r') as ff:
        lines = ff.readlines()

    # Make sure the yaml remains in the file
    assert is_in(lines, "yaml_frontmatter: true")


def test_notebook_update(tmpdir):
    path_build_test = op.join(tmpdir.dirpath(), 'tmp_test', 'test')
    cmd = ["jupyter-book", 'build', path_build_test]

    source_file = op.join(path_build_test, 'content', 'tests', 'features.md')
    target_file = op.join(path_build_test, '_build', 'tests', 'features.html')
    source_text = 'https://'
    target_text = 'www.'

    # replace source_text with target_text in source_file
    assert is_not_in(open(target_file).readlines(), target_text)
    replace_in_file(source_text, target_text, source_file)
    run(cmd, check=True)
    assert is_in(open(target_file).readlines(), target_text)
    replace_in_file(target_text, source_text, source_file)
    run(cmd, check=True)
    assert is_not_in(open(target_file).readlines(), target_text)
