import os.path as op
from traitlets.config import Config

from nbconvert.exporters import HTMLExporter
from nbconvert.writers import FilesWriter
import jupytext as jpt
import nbformat as nbf
from ruamel.yaml import YAML

from .utils import _clean_markdown_cells, _split_yaml
from .run import run_ntbk


def build_page(path_ntbk, path_html_output, path_media_output=None, execute=False,
               path_template=None, verbose=False, kernel_name=None):
    """Build the HTML for a single notebook page.

    Inputs
    ======

    path_ntbk : string
        The path to a notebook or text file we want to convert. If a text
        file, then Jupytext will be used to convert into a notebook. This
        will also cause the notebook to be *run* (e.g. execute=True).
    path_html_output : string
        The path to the folder where the HTML will be output.
    path_media_output : string | None
        If a string, the path to where images should be extracted. If None,
        images will be embedded in the HTML.
    execute : bool
        Whether to execute the notebook before converting
    path_template : string
        A path to the template used in conversion.
    kernel_name : string
        The name of the kernel to use if we execute notebooks.
    """

    ########################################
    # Load in the notebook
    notebook_name, suff = op.splitext(op.basename(path_ntbk))

    if suff in ['.md', '.markdown']:
        # If it's a markdown file, we need to check whether it's a jupytext format
        with open(path_ntbk, 'r') as ff:
            lines = ff.readlines()
            yaml, content = _split_yaml(lines)
            yaml = YAML().load(''.join(yaml))

        if (yaml is not None) and yaml.get('jupyter', {}).get('jupytext'):
            # If we have jupytext metadata, then use it to read the markdown file
            ntbk = jpt.reads(''.join(lines), 'md')
        else:
            # Otherwise, create an empty notebook and add all of the file contents as a markdown file
            ntbk = nbf.v4.new_notebook()
            ntbk['cells'].append(nbf.v4.new_markdown_cell(source=''.join(content)))
    else:
        # If it's not markdown, we assume it's either ipynb or a jupytext format
        ntbk = jpt.read(path_ntbk)
    
    if _is_jupytext_file(ntbk):
        execute = True

    ########################################
    # Notebook cleaning

    # Minor edits to cells
    _clean_markdown_cells(ntbk)

    #############################################
    # Conversion to HTML
    # create a configuration object that changes the preprocessors
    c = Config()

    c.FilesWriter.build_directory = path_html_output

    # Remove cell elements using tags
    c.TagRemovePreprocessor.remove_cell_tags = ("remove_cell", "removecell")
    c.TagRemovePreprocessor.remove_all_outputs_tags = ('remove_output',)
    c.TagRemovePreprocessor.remove_input_tags = ('remove_input',)

    # Remove any cells that are *only* whitespace
    c.RegexRemovePreprocessor.patterns = ["\\s*\\Z"]

    # So the images are written to disk
    c.HTMLExporter.preprocessors = [
        'nbconvert.preprocessors.TagRemovePreprocessor',
        'nbconvert.preprocessors.RegexRemovePreprocessor',
        'nbconvert.preprocessors.ExtractOutputPreprocessor',
    ]

    # The text used as the text for anchor links. Set to empty since we'll use anchor.js for the links
    c.HTMLExporter.anchor_link_text = " "

    # Excluding input/output prompts
    c.HTMLExporter.exclude_input_prompt = True
    c.HTMLExporter.exclude_output_prompt = True

    # Excution of the notebook if we wish
    if execute is True:
        ntbk = run_ntbk(ntbk, op.dirname(path_ntbk))

    # Define the path to images and then the relative path to where they'll originally be placed
    if isinstance(path_media_output, str):
        path_media_output_rel = op.relpath(path_media_output, path_html_output)

    # Generate HTML from our notebook using the template
    output_resources = {'output_files_dir': path_media_output_rel, 'unique_key': notebook_name}
    exp = HTMLExporter(template_file=path_template, config=c)
    html, resources = exp.from_notebook_node(ntbk, resources=output_resources)

    # Now write the markdown and resources
    writer = FilesWriter(config=c)
    writer.write(html, resources, notebook_name=notebook_name)
    if verbose:
        print("Finished writing notebook to {}".format(path_html_output))


def _is_jupytext_file(ntbk):
    """Infer whether a notebook node was created from a Jupytext Markdown file.

    Right now, this just tries to guess based on whether there's a particular piece of
    metadata in the notebook.
    """
    jupytext_meta = ntbk.get('metadata', {}).get('jupytext')
    if jupytext_meta is None:
        return False
    else:
        return jupytext_meta.get('notebook_metadata_filter', '') != "-all"
