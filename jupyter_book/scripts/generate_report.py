import os.path as op
import os
import shutil as sh
from ruamel.yaml import YAML
import nbformat as nbf
from subprocess import run, PIPE

from glob import glob
import argparse

parser = argparse.ArgumentParser(description="Generate a report from a jupyter notebook")
parser.add_argument('path_notebook', help="The path to a Jupyter Notebook")
parser.add_argument('--path-output', help="The path to the output report")

# Parse inputs
args = parser.parse_args()
path_notebook = args.path_notebook
path_output_report = op.basename(path_notebook).replace('.ipynb', '') if args.path_output is None else args.path_output

name_notebook = op.basename(path_notebook)

# Copy the notebook to a temporary folder
print("Creating temporary folder...")
tmp_folder = './TMP'
path_config = op.join(tmp_folder, '_config.yml')
path_content = op.join(tmp_folder, 'content')
path_out = op.join(path_content, op.basename(path_notebook))
path_html = op.join(tmp_folder, 'html')

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
path_book = 'TMP_book/'
cmd = f"jupyter-book create {path_book} --content-folder {path_content} --config {path_config} --overwrite"
out = run(cmd.split(), check=True)

# Build the markdown for it
print("Building book markdown...")
cmd = f"jupyter-book build {path_book}"
out = run(cmd.split(), check=True)

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

# Copy into an output directory
if op.isdir(path_output_report):
    sh.rmtree(path_output_report)
sh.copytree(path_html, path_output_report)
print("Done generating report!")
print(f"Your report is here: \n{path_output_report}")