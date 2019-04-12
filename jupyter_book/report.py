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

def new_report(path_notebook, path_output, css, js, overwrite=False):
    """Create a new report from a single notebook."""

    name_notebook = op.basename(path_notebook)

    # Check if we've specified a single notebook (and in this case will use the report script)
    if not op.exists(path_notebook):
        raise ValueError(f"Could not find the notebook specified at {path_notebook}")
    if not path_notebook.endswith('.ipynb'):
        raise ValueError(f"Specified path_notebook file does not end in .ipynb, found {op.splitext(path_notebook)[-1]}")


    # Remove an old report if we want
    if op.isdir(path_output):
        if overwrite is True:
            sh.rmtree(path_output)
        else:
            raise ValueError(f"Found a pre-existing report at {path_output}. Please delete it or use `--overwrite`.")

    # Copy the notebook to a temporary folder
    print("Creating temporary folder...")
    path_temp = op.join(path_output, 'TMP')
    raw_folder = op.join(path_temp, 'raw')

    # Content we'll use to build the report
    path_config = op.join(raw_folder, '_config.yml')
    path_content = op.join(raw_folder, 'content')
    path_out = op.join(path_content, op.basename(path_notebook))

    # The temporary book goes here
    path_book = op.join(path_temp, 'book')

    # HTML for the built report
    path_html = op.join(path_temp, 'html')

    os.makedirs(path_content, exist_ok=True)
    sh.copy2(path_notebook, path_out)

    ## Hide code cells
    ntbk = nbf.read(path_out, nbf.NO_CONVERT)
    for cell in ntbk['cells']:
        if cell['cell_type'] == 'code':
            tags = cell['metadata'].get('tags', [])
            if not 'hidecode' in tags:
                tags.append('hidecode')
            cell['metadata']['tags'] = tags
    nbf.write(ntbk, path_out)


    ##### Create book for the report ###############################################

    # Add some config for a report
    yaml = YAML()
    config = {'show_sidebar': False, "baseurl": "", "url": ""}
    with open(path_config, 'w') as ff:
        yaml.dump(config, ff)

    # Create the new book
    print("Creating new book...")
    new_book(path_book, path_content, None, None, config=path_config, overwrite=overwrite)

    # Build the markdown for it
    print("Building book markdown...")
    path_toc = op.join(path_book, '_data', 'toc.yml')
    path_template = op.join(path_book, 'scripts', 'templates', 'jekyllmd.tpl')
    build_book(path_book, path_toc_yaml=path_toc, path_template=path_template, config_file=path_config)

    # Build the HTML in the temp folder
    print("Building report HTML...")
    path_html_rel_build_folder = op.relpath(path_html, path_book)
    cmd = f'bundle exec jekyll build -d {path_html_rel_build_folder}'
    err = run(cmd.split(), check=True, cwd=path_book)

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