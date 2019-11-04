"""Single page HTML building / writing functionality."""
import os.path as op
from traitlets.config import Config

from nbconvert.exporters import HTMLExporter
from nbconvert.writers import FilesWriter
from nbconvert.preprocessors import Preprocessor
import nbformat as nbf
import sass

from .utils import _clean_markdown_cells, run_ntbk, _infer_title

PATH_FILE = op.dirname(op.abspath(__file__))
PATH_BOOK_TEMPLATE = op.join(PATH_FILE, '..', 'book_template')
PATH_TEMPLATE = op.join(PATH_FILE, "templates", "html.tpl")
PATH_MATHJAX = op.join(PATH_BOOK_TEMPLATE, "_includes", "mathjax.html")
PATH_JS = op.join(PATH_BOOK_TEMPLATE, "assets", "js", "page")
PATH_SCSS = op.join(PATH_BOOK_TEMPLATE, "_sass", "page", "main.scss")

PAGE_EXTRA_CSS = """
<style type="text/css">
main.jupyter-page {
    max-width: 1100px;
    margin: 0px auto;
    margin-top: 50px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 50px;
}
</style>
"""


class _RawCellPreprocessor(Preprocessor):
    """
    If a cell has the `jekyll-raw` cell tag, wrap the cell contents in a
    Jekyll {% raw %} {% endraw %} tag.
    """

    TAG = "jekyll-raw"

    # We need to make new cells because code cells can be marked as raw but
    # but we shouldn't put Jekyll commands directly into the cell's Python.
    START_RAW = nbf.v4.new_raw_cell("{% raw %}")
    END_RAW = nbf.v4.new_raw_cell("{% endraw %}")

    def preprocess(self, nb, resources):
        new_cells = []
        for cell in nb.cells:
            if self.TAG in cell.metadata.get("tags", []):
                new_cells.append(self.START_RAW)
                new_cells.append(cell)
                new_cells.append(self.END_RAW)
            else:
                new_cells.append(cell)
        nb.cells = new_cells
        return nb, resources


def write_page(html, path_out, resources, standalone=False,
               custom_css=None, custom_js=None):
    """
    Write an HTML page to disk and extract images if desired.
    Meant for running after converting a page with `page_html`.
    This uses the nbconvert `FilesWriter` class to write the HTML
    content.

    html : string
        The HTML to be written to disk.
    path_out : string
        The path to the folder where the HTML will be output.
    resources : dictionary
        NBConvert resources to be used in the conversion process. These are
        generated from the `build_book` function.
    standalone : bool
        Whether to write the page as a full standalone HTML file with its own
        <head> and <body> sections. If False, just the converted HTML will
        be written with the expectation that it will be compiled to "full"
        HTML by Jupyter Book later.
    custom_css : string of css | path to css file
        A collection of custom CSS rules to include in the output HTML, or a
        path to a CSS file. Only used if `standalone=True`.
    custom_js : string of javascript | path to js file
        A collection of custom Javascript to include in the output HTML, or a
        path to a CSS file. Only used if `standalone=True`.
    """
    c = Config()
    c.FilesWriter.build_directory = path_out
    notebook_name = op.split(resources.get("unique_key", "notebook"))[-1]

    if custom_css is None:
        custom_css = ''
    elif op.exists(custom_css):
        with open(custom_css, 'r') as ff:
            custom_css = ff.read()
    if custom_js is None:
        custom_js = ''
    elif op.exists(custom_js):
        with open(custom_js, 'r') as ff:
            custom_js = ff.read()

    # If standalone, add a head and body
    if standalone is True:
        head = page_head(custom_css=custom_css, custom_js=custom_js)
        html = f"""
        <!DOCTYPE html>
        {head}

        <body>
        {html}
        <nav class="onthispage"></nav>
        </body>
        </html>\n
        """
    # Now write the html and resources
    writer = FilesWriter(config=c)
    path_html = writer.write(html, resources, notebook_name=notebook_name)
    return path_html


def page_html(ntbk, path_media_output=None, name=None, preprocessors=None,
              execute_dir=False, kernel_name=None, clear_output=False,
              title=None, author=None):
    """Build the HTML for a single notebook page.

    Inputs
    ======

    ntbk : Instance of NotebookNode
        The notebook that we'll convert to a page's HTML.
    path_media_output : string | None
        If a string, the path to where images should be extracted, relative
        to wherever you will write the final HTML file. If None,
        images will be embedded in the HTML. Note that this will not actually
        write the images. To do so, use the `write_page` function.
    name : string | None
        The name of the notebook being converted. This will be used if
        `path_media_output` is noe None in order to create unique media
        file names.
    preprocessors : list of NBConvert Preprocessors | None
        Any extra preprocessors to add to the end of the preprocessor chain
        in the HTMLConverter.
    execute_dir : string | None
        Execute the notebook with a kernel started in the directory specified
        with this argument. If None, the notebook will not be executed.
    kernel_name : string
        The name of the kernel to use if we execute notebooks.
    clear_output: bool
        To remove the output from notebook
    title : string | "infer_title" | None
        A title to include with the page. If given, then the title will
        be printed at the top of the output page. If "infer_title", look for the title
        in `ntbk.metadata['title']` and if not found, infer it if the first
        line of the notebook is an H1 header (beginning with `# `). If None,
        or if no metadata is found, do not display a title.
    author : string | "infer_author" | None
        An author to include with the page. If given, then the author will
        be printed at the top of the output page. If "infer_author", look for the author
        in `ntbk.metadata['author']`. If `None`, or if no metadata is found,
        then do not display an author.

    Returns
    =======
    page : HTML document
        The input content file converted to HTML format.
    """
    _check_cell_tags(ntbk)

    if preprocessors is None:
        preprocessors = []
    elif not isinstance(preprocessors, (list, tuple)):
        preprocessors = [preprocessors]

    if name is None:
        name = "notebook"

    # If title and author isn't False or a string, try to infer it
    meta_html_info = ''
    if title == 'infer_title':
        title = _infer_title(ntbk)

    if isinstance(title, str):
        meta_html_info += f'<div id="page-title">{title}</div>\n'

    if author == "infer_author":
        author = ntbk.metadata.get('author')
    if author:
        meta_html_info += f'<div id="page-author">{author}</div>\n'
    meta_html = f'<div id="page-info">{meta_html_info}</div>'

    ########################################
    # Notebook cleaning
    _clean_markdown_cells(ntbk)

    #############################################
    # Preprocessor configuration
    c = Config()

    # Remove cell elements using tags
    c.TagRemovePreprocessor.remove_cell_tags = ("remove_cell", "removecell")
    c.TagRemovePreprocessor.remove_all_outputs_tags = ("remove_output",)
    c.TagRemovePreprocessor.remove_input_tags = ("remove_input",)

    # Remove any cells that are *only* whitespace
    c.RegexRemovePreprocessor.patterns = ["\\s*\\Z"]

    c.HTMLExporter.preprocessors = [
        "nbconvert.preprocessors.TagRemovePreprocessor",
        "nbconvert.preprocessors.RegexRemovePreprocessor",
    ]

    if clear_output:
        c.HTMLExporter.preprocessors.append('nbconvert.preprocessors.ClearOutputPreprocessor')

    if path_media_output is not None:
        # So the images are written to disk
        c.HTMLExporter.preprocessors.append(
            "nbconvert.preprocessors.ExtractOutputPreprocessor"
        )

    # Add extra preprocessors given by the user
    for preprocessor in preprocessors:
        c.HTMLExporter.preprocessors.append(preprocessor)

    # The text used as the text for anchor links.
    # The text used as the text for anchor links.
    # TEMPORATILY Set to empty since we'll use anchor.js for the links
    # Once https://github.com/jupyter/nbconvert/pull/1101 is fixed
    # set to '<i class="fas fa-link"> </i>'
    c.HTMLExporter.anchor_link_text = " "

    # Excluding input/output prompts
    c.HTMLExporter.exclude_input_prompt = True
    c.HTMLExporter.exclude_output_prompt = True

    #############################################
    # Run and convert to HTML

    # Excution of the notebook if we wish
    if execute_dir is not None:
        ntbk = run_ntbk(ntbk, execute_dir, allow_errors=True)

    # Generate HTML from our notebook using the template
    output_resources = {"output_files_dir": path_media_output, "unique_key": name}
    exp = HTMLExporter(template_file=PATH_TEMPLATE, config=c)
    html, resources = exp.from_notebook_node(ntbk, resources=output_resources)

    html = f"""
    <main class="jupyter-page">
    {meta_html}
    {html}
    </main>
    """
    return html, resources


def page_head(custom_css='', custom_js=''):
    """Write a header for a standalone HTML file.

    This uses CSS/JS from the book template.
    """
    js = page_js()
    js = f"""
        <script>
        {js}
        </script>
        """
    if custom_js:
        custom_js = f"""
            <script>
            {custom_js}
            </script>
            """

    # Mathjax embed
    with open(PATH_MATHJAX, "r") as ff:
        html_mathjax = ff.read()

    # SCSS styling for the page
    scss = page_css()
    scss = f"""
    <style type="text/css">
    {scss}
    </style>
    """

    if custom_css:
        custom_css = f"""
        <style tyle="text/css">
        {custom_css}
        </style>
        """
    else:
        custom_css = ""

    # Stitch them all together into a head
    head = f"""
    <head>
    {html_mathjax}
    {scss}
    {custom_css}
    {PAGE_EXTRA_CSS}
    {js}
    {custom_js}
    </head>
    """
    return head


def page_css():
    """Return a page's CSS."""
    css = sass.compile(filename=PATH_SCSS)
    return css


def page_js():
    """Return a page's javascript."""
    # Javascript files to embed
    js_files = [
        "dom-update.js",
        "documentSelectors.js",
        "copy-button.js",
        "hide-cell.js",
        "anchors.js",
        "tocbot.js"
    ]

    js = []
    for js_file in js_files:
        with open(op.join(PATH_JS, js_file), "r") as ff:
            js += ff.readlines()

    js = "\n".join(js)
    return js


def _check_cell_tags(ntbk):
    """Perform some checks on cell tags to make sure they're correct."""
    # TODO: add checks based on cell tags. Currently this is just a placeholder.
    for cell in ntbk.cells:
        cell['metadata'].get('tags', [])
