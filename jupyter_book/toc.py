"""A small sphinx extension to use a global table of contents"""
import os
import yaml
from textwrap import dedent
from pathlib import Path
from sphinx.util import logging

from .utils import _filename_to_title, SUPPORTED_FILE_SUFFIXES, _error

logger = logging.getLogger(__name__)


def _no_suffix(path):
    if isinstance(path, str):
        path = str(Path(path).with_suffix(""))
    return path


def find_name(pages, name):
    """
    Takes a dict with nested lists and dicts,
    and searches all dicts for a key of the field
    provided.
    """
    page = None
    if isinstance(pages, dict):
        pages = [pages]

    for page in pages:
        if _no_suffix(page.get("file")) == name:
            return page
        else:
            sections = page.get("sections", [])
            page = find_name(sections, name)
            if page is not None:
                return page


def add_toctree(app, docname, source):
    # If no globaltoc is given, we'll skip this part
    if not app.config["globaltoc_path"]:
        return

    # First check whether this page has any descendants
    # If so, then we'll manually add them as a toctree object
    path_parent = app.env.doc2path(docname, base=None)
    toc = app.config["globaltoc"]
    parent_page = find_name(toc, _no_suffix(path_parent))
    parent_suff = Path(path_parent).suffix
    # If we didn't find this page in the TOC, raise a warning
    if parent_page is None:
        logger.warning(f"Found a content page that is not in _toc.yml: {path_parent}.")
        return

    # If we have no sections, then don't worry about a toctree
    subsections = parent_page.get("sections")
    if not subsections:
        return

    # Look for expand_sections and add to html config
    if "expand_sections" in parent_page:
        expanded_sections = app.config.html_theme_options.get("expand_sections", [])
        expanded_sections.append(docname)
        app.config.html_theme_options["expand_sections"] = expanded_sections

    def gen_toctree(options, subsections):

        # Generate the TOC from our options/pages
        toctree_text_md = """
        ```{{toctree}}
        :hidden:
        :titlesonly:
        {options}

        {sections}
        ```
        """
        toctree_text_rst = """
        .. toctree::
           :hidden:
           :titlesonly:
           {options}

           {sections}
        """

        if parent_suff in [".ipynb", ".md"]:
            toctree_template = toctree_text_md
        elif parent_suff == ".rst":
            toctree_template = toctree_text_rst

        # Create the markdown directive for our toctree
        toctree = dedent(toctree_template).format(
            options="\n".join(options), sections="\n".join(subsections)
        )
        return toctree

    # Build toctrees for the page. We may need more than one
    toctrees = []
    toc_sections = []
    toc_options = []

    for ipage in subsections:
        # First handle special case of chapters
        if "header" in ipage:
            # If we already have some pages added, we need to make a new toctree
            if toc_sections:
                old_toctree = gen_toctree(toc_options, toc_sections)
                toctrees.append(old_toctree)
                toc_sections = []
                toc_options = []
            toc_options.append(f":caption: {ipage.get('header')}")
            continue

        # If not a special case, assume we have a "regular" page structure
        path_sec = ipage.get("file")
        title = ipage.get("title")

        # Update path so it is relative to the root of the parent
        path_parent_folder = Path(parent_page["file"]).parent
        path_sec = os.path.relpath(path_sec, path_parent_folder)

        # Decide whether we'll over-ride with a title in the toctree
        this_section = f"{path_sec}"
        if title:
            this_section = f"{title} <{this_section}>"
        toc_sections.append(this_section)

        option_flags = ["numbered"]
        for option in option_flags:
            if parent_page.get(option):
                toc_options.append(f":{option}:")

    # Now create the final toctree for this page and prep to insert into page
    if toc_sections:
        final_toctree = gen_toctree(toc_options, toc_sections)
        toctrees.append(final_toctree)
    toctrees = "\n".join(toctrees)

    # Figure out what kind of text defines a toctree directive for this file
    # currently, assumed to be markdown
    if parent_suff in [".md", ".rst"]:
        source[0] += toctrees + "\n"

    elif parent_suff == ".ipynb":
        # Lazy import nbformat because we only need it if we have an ipynb file
        import nbformat as nbf

        ntbk = nbf.reads(source[0], nbf.NO_CONVERT)
        md = nbf.v4.new_markdown_cell(toctrees)
        ntbk.cells.append(md)
        source[0] = nbf.writes(ntbk)
    else:
        _error("Only markdown, ipynb, and rst files are supported in the TOC.")


def update_indexname(app, config):
    """Update `master_doc` to be the first page defined in the TOC"""
    # If no globaltoc is given, we'll skip this part
    if not app.config["globaltoc_path"]:
        return

    # Load the TOC and update the env so we have it later
    toc = yaml.safe_load(Path(app.config["globaltoc_path"]).read_text())

    # If it's a flat list, treat the first page as the master doc
    if isinstance(toc, list):
        # Ensure that the first item in the list is not a header
        if "header" in toc[0]:
            _error("Table of Contents must start with your first page, not a header.")
        toc_updated = toc[0]
        if len(toc) > 1:
            subsections = toc[1:]
            toc_updated["sections"] = subsections
        toc = toc_updated

    # Check for proper structure, naming, etc
    _check_toc_entries([toc])

    # Update our global toc
    app.config["globaltoc"] = toc

    # Update the main toctree file for whatever the first file here is
    app.config["master_doc"] = _no_suffix(toc["file"])


def _content_path_to_yaml(path, root_path, split_char="_"):
    """Return a YAML entry for the TOC from a path."""
    path = path.with_suffix("")
    if path.name == "index":
        title = _filename_to_title(path.resolve().parent.name, split_char=split_char)
    else:
        title = _filename_to_title(path.name, split_char=split_char)

    path_rel_root = path.relative_to(root_path)
    out = {"file": str(path_rel_root.with_suffix("")), "title": title}
    return out


def _find_content_structure(path, root_folder, split_char="_", skip_text=None):
    """Parse a folder and sub-folders for content and return a dict."""
    if skip_text is None:
        skip_text = []
    skip_text.append(".ipynb_checkpoints")

    path = Path(path)

    # First parse all the content files
    content_files = [
        ii for ii in path.iterdir() if ii.suffix in SUPPORTED_FILE_SUFFIXES
    ]

    if len(content_files) == 0:
        return

    # First content page (or file called index) will be the parent
    # Each folder must have at least one content file in it
    # First see if we have an "index" page
    first_content = None
    for ii, ifile in enumerate(content_files):
        if ifile.with_suffix("").name == "index":
            first_content = content_files.pop(ii)
    if not first_content:
        first_content = content_files.pop(0)
    parent = _content_path_to_yaml(first_content, root_folder, split_char=split_char)
    parent["sections"] = []

    # Children become sections of the parent
    for content_file in content_files:
        if any(iskip in str(content_file) for iskip in skip_text):
            continue
        parent["sections"].append(_content_path_to_yaml(content_file, root_folder))

    # Now recursively run this on folders, and add as another sub-page
    folders = [ii for ii in path.iterdir() if ii.is_dir()]
    for folder in folders:
        if any(iskip in str(folder) for iskip in skip_text):
            continue
        folder_out = _find_content_structure(
            folder, root_folder, split_char=split_char, skip_text=skip_text
        )
        if folder_out:
            parent["sections"].append(folder_out)

    if len(parent["sections"]) == 0:
        parent.pop("sections")
    return parent


def build_toc(path, filename_split_char="_", skip_text=None):
    """Auto-generate a Table of Contents from files/folders.

    All file and folder names are ordered alpha-numerically, unless
    a file name is "index", in which case it is treated as the first
    file.

    It uses the following logic:

    * In a given folder, the first content page is the folder parent.
    * All subsequent files are sections of the parent page
    * For each sub-folder
        * Its first page is appended to sections of the parent page
        * All other sub-folder are children of the subfolder's first page

    Parameters
    ----------
    path : str
        Path to the folder where content exists. The TOC will be generated
        according to the alphanumeric sort of these files/folders.
    filename_split_char : str
        The character used in inferring spaces in page names from filenames.
    skip_text : str | None
        If this text is found in any files or folders, they will be skipped.
    """
    structure = _find_content_structure(
        path, path, split_char=filename_split_char, skip_text=skip_text
    )
    if not structure:
        _error(f"No content files were found in {path}.")
    yaml_out = yaml.safe_dump(structure, default_flow_style=False, sort_keys=False)
    return yaml_out


def _check_toc_entries(sections):
    """Recursive function to check a TOC structure."""
    allowed_keys = ["file", "url", "header", "sections", "title", "expand_sections"]
    for section in sections:
        # Allowed keys
        for key in section.keys():
            if key not in allowed_keys:
                logger.warning(f"Unknown key in `_toc.yml`: {key}")
        # Correct for old toc naming
        # TODO: deprecate in a few release cycles
        if "url" in section and "path" not in section:
            logger.warning(
                f"Found `url:` entry in `_toc.yml`: {section}. "
                "Rename `url:` to `file:`. This will raise an error in the future."
            )
            section["file"] = section["url"].lstrip("/")
        # Recursive call
        if "sections" in section:
            _check_toc_entries(section["sections"])
