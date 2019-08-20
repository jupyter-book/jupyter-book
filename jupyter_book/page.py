import nbformat as nbf
import os.path as op
from traitlets.config import Config

from nbconvert.exporters import HTMLExporter
from nbconvert.writers import FilesWriter

from .utils import _clean_markdown_cells
from .run import run_ntbk


def build_page(path_ntbk, path_html_output, path_media_output=None, execute=False,
               path_template=None, verbose=False, kernel_name=None):
    """Build the HTML for a single notebook page.

    Inputs
    ======

    path_ntbk : string
        The path to a notebook we want to convert.
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
    ntbk = nbf.read(path_ntbk, nbf.NO_CONVERT)
    notebook_name = op.splitext(op.basename(path_ntbk))[0]

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
