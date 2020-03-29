"""A small sphinx extension to use a global table of contents"""
import os
import yaml
from textwrap import dedent
from pathlib import Path

from .utils import _filename_to_title, SUPPORTED_FILE_SUFFIXES


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
            sections = page.get("pages", [])
            page = find_name(sections, name)
            if page is not None:
                return page


def add_toctree(app, docname, source):
    # If no globaltoc is given, we'll skip this part
    if not app.config["globaltoc_path"]:
        return

    # First check whether this page has any descendants
    # If so, then we'll manually add them as a toctree object
    path = app.env.doc2path(docname, base=None)
    toc = app.config["globaltoc"]
    page = find_name(toc, _no_suffix(path))

    # If we didn't find this page in the TOC, raise an error
    if page is None:
        raise FileNotFoundError(
            f"The following content page exists, but is not in your table of contents:\n\n{path}.\n\nDouble check your `_toc.yml` file to make sure the paths are correct."
        )

    # If we have no sections, then don't worry about a toctree
    pages = page.get("pages")
    if not pages:
        return

    def gen_toctree(options, pages):
        # Copy out our options and pages so we can clear later
        this_options = "\n".join(options.copy())
        this_pages = "\n".join(pages.copy())

        # Generate the TOC from our options/pages
        toctree_text = dedent(
            """
        ```{{toctree}}
        :hidden:
        :titlesonly:
        {options}

        {pages}
        ```
        """
        )

        # Create the markdown directive for our toctree
        toctree = toctree_text.format(options=this_options, pages=this_pages)
        return toctree

    # Build toctrees for the page. We may need more than one depending on the options
    toctrees = []
    toc_pages = []
    toc_options = []
    for ipage in pages:
        # First handle special case of dividers and headers
        if ipage.get("divider") or ipage.get("header"):
            if toc_pages:
                # If we already have some pages added, we need to make a new toctree
                old_toctree = gen_toctree(toc_options, toc_pages)
                toc_pages = []
                toc_options = []
                toctrees.append(old_toctree)
            # Adding options to our toctree
            if ipage.get("divider"):
                toc_options.append(":divider:")
            if ipage.get("header"):
                toc_options.append(f":caption: {ipage.get('header')}")
            continue

        # If not a special case, assume we have a "regular" page structure
        path_sec = ipage.get("file")
        title = ipage.get("title")

        # Update path so it is relative to the root of the parent
        path_parent_folder = Path(page["file"]).parent
        path_sec = os.path.relpath(path_sec, path_parent_folder)

        # Decide whether we'll over-ride with a title in the toctree
        this_section = f"{path_sec}"
        if title:
            this_section = f"{title} <{this_section}>"
        toc_pages.append(this_section)

        option_flags = ["numbered", "expand_sections"]
        for option in option_flags:
            if page.get(option):
                toc_options.append(f":{option}:")

    # Now create the final toctree for this page
    final_toctree = gen_toctree(toc_options, toc_pages)
    toctrees.append(final_toctree)

    toctrees = "\n".join(toctrees)

    # Figure out what kind of text defines a toctree directive for this file
    # currently, assumed to be markdown
    suff = Path(path).suffix
    if suff == ".md":
        source[0] += toctrees + "\n"

    elif suff == ".ipynb":
        # Lazy import nbformat because we only need it if we have an ipynb file
        import nbformat as nbf

        ntbk = nbf.reads(source[0], nbf.NO_CONVERT)
        md = nbf.v4.new_markdown_cell(toctrees)
        ntbk.cells.append(md)
        source[0] = nbf.writes(ntbk)
    else:
        raise ValueError("Only markdown and ipynb files are supported.")


def update_indexname(app, config):
    """Update `master_doc` to be the first page defined in the TOC"""
    # If no globaltoc is given, we'll skip this part
    if not app.config["globaltoc_path"]:
        return

    # Load the TOC and update the env so we have it later
    toc = yaml.safe_load(Path(app.config["globaltoc_path"]).read_text())
    if isinstance(toc, list):
        toc_updated = toc[0]
        if len(toc) > 1:
            subsections = toc[1:]
            toc_updated["pages"] = subsections
        toc = toc_updated
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
    parent["pages"] = []

    # Children become pages of the parent
    for content_file in content_files:
        if any(iskip in str(content_file) for iskip in skip_text):
            continue
        parent["pages"].append(_content_path_to_yaml(content_file, root_folder))

    # Now recursively run this on folders, and add as another sub-page
    folders = [ii for ii in path.iterdir() if ii.is_dir()]
    for folder in folders:
        if any(iskip in str(folder) for iskip in skip_text):
            continue
        folder_out = _find_content_structure(
            folder, root_folder, split_char=split_char, skip_text=skip_text
        )
        if folder_out:
            parent["pages"].append(folder_out)

    if len(parent["pages"]) == 0:
        parent.pop("pages")
    return parent


def build_toc(path, filename_split_char="_", skip_text=None):
    """Auto-generate a Table of Contents from files/folders.

    All file and folder names are ordered alpha-numerically, unless
    a file name is "index", in which case it is treated as the first
    file.

    It uses the following logic:

    * In a given folder, the first content page is the folder parent.
    * All subsequent pages are sections of the parent page
    * For each sub-folder
        * Its first page is appended to sections of the parent page
        * All other sub-folder pages are children of the subfolder's first page 

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
        raise ValueError(f"No content files were found in {path}.")
    yaml_out = yaml.safe_dump(structure, default_flow_style=False, sort_keys=False)
    return yaml_out
