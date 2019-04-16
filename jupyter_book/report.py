import os.path as op
import os
import sys
import shutil as sh
from ruamel.yaml import YAML
import nbformat as nbf
from subprocess import run, PIPE
from .utils import print_message_box
from .create import new_book
from .build import build_book
from distutils.dir_util import copy_tree
from glob import glob
import sass

def new_report(path_notebook, path_output, config, css, js, overwrite=False):
    """Create a new report from a single notebook."""

    # Check if we've specified a single notebook (and in this case will use the report script)
    if not op.exists(path_notebook):
        raise ValueError(f"Could not find the notebook specified at {path_notebook}")
    if not path_notebook.endswith('.ipynb'):
        raise ValueError(f"Specified path_notebook file does not end in .ipynb, found {op.splitext(path_notebook)[-1]}")

    name_notebook = op.basename(path_notebook)

    # Remove an old report
    if op.isdir(path_output):
        if overwrite is True:
            sh.rmtree(path_output)
        else:
            raise ValueError(f"Found a pre-existing report at {path_output}. Please delete it or use `--overwrite`.")

    # Copy the notebook to a temporary folder
    print("Creating temporary folder...")
    path_temp = op.join(path_output, 'TMP')
    raw_folder = op.join(path_temp, 'raw')

    # Define paths for content we'll use to build the report
    path_tmp_config = op.join(raw_folder, '_config.yml')  # Config for the report
    path_tmp_content = op.join(raw_folder, 'content')  # Content folder for the report book
    path_tmp_notebook = op.join(path_tmp_content, op.basename(path_notebook))  # Where the report will be generated
    path_tmp_book = op.join(path_temp, 'book')  # Where the jupyter book for the report is generated
    path_html = op.join(path_temp, 'html')  # Where the HTML will be built

    # Make content directory and copy our notebook
    os.makedirs(path_tmp_content, exist_ok=True)
    sh.copy2(path_notebook, path_tmp_notebook)

    ##### Modify the notebook content ###############################################

    ## Hide code cells for the report
    ntbk = nbf.read(path_tmp_notebook, nbf.NO_CONVERT)
    for cell in ntbk['cells']:
        if cell['cell_type'] == 'code':
            tags = cell['metadata'].get('tags', [])
            if not 'hidecode' in tags:
                tags.append('hidecode')
            cell['metadata']['tags'] = tags
    nbf.write(ntbk, path_tmp_notebook)


    ##### Create book for the report ###############################################

    # Add some config for a report


    # ##############################################################################
    # TODO: figure out the updating stuff here




    yaml = YAML()
    default_config = {
        "show_sidebar": False,
        "baseurl": "",
        "url": "",
        "page_nav": False,
        "use_binder_button": False,
        "use_thebelab_button": False,
        "use_show_widgets_button": False,
        "use_download_button": False
    }
    if config is not None:
        if not op.exists(config):
            raise ValueError("Configuration file not found: {}".format(config))
        with open(config, 'r') as ff:
            custom_config = yaml.load(ff)
        default_config.update(custom_config)
    with open(path_tmp_config, 'w') as ff:
        yaml.dump(config, ff)

    # Create a new book for this report
    print("Creating new book...")
    new_book(path_tmp_book, path_tmp_content, None, None, config=path_tmp_config, overwrite=overwrite)

    # Build the markdown for the book
    print("Building book markdown...")
    path_toc = op.join(path_tmp_book, '_data', 'toc.yml')
    path_template = op.join(path_tmp_book, 'scripts', 'templates', 'jekyllmd.tpl')
    build_book(path_tmp_book, path_toc_yaml=path_toc, path_template=path_template, config_file=path_tmp_config)

    # Build the HTML in the temp folder
    print("Building report HTML...")
    path_html_rel_build_folder = op.relpath(path_html, path_tmp_book)
    cmd = f'bundle exec jekyll build -d {path_html_rel_build_folder}'
    run(cmd.split(), check=True, cwd=path_tmp_book)

    ##### Clean up HTML ###########################################################

    # Move the content HTML file to the index.html spot
    path_html_index = op.join(path_html, "index.html")
    os.remove(path_html_index)
    sh.move(op.join(path_html, name_notebook.replace('.ipynb', '.html')), path_html_index)

    # Remove paths relative to root of folder
    with open(path_html_index, 'r') as ff:
        text = ff.read()
        text = text.replace('href="/', 'href="')
        text = text.replace('src="/', 'src="')
    with open(path_html_index, 'w') as ff:
        ff.write(text)

    # Copy into the output directory, overwriting it
    copy_tree(path_html, path_output)
    sh.rmtree(path_temp)
    path_output_index = op.join(path_output, 'index.html')
    msg = f"Done generating report!\n\nYour report is here: {path_output_index}"
    print_message_box(msg)