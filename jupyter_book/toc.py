"""A small sphinx extension to use a global table of contents"""
import os
import yaml
from textwrap import dedent
from pathlib import Path


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
        if _no_suffix(page.get("path")) == name:
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
    path = app.env.doc2path(docname, base=None)
    toc = app.config["globaltoc"]
    page = find_name(toc, _no_suffix(path))

    # If we didn't find this page in the TOC, raise an error
    if page is None:
        raise FileNotFoundError(
            f"The following path in your table of contents couldn't be found:\n\n{path}.\n\nDouble check your `_toc.yml` file to make sure the paths are correct."
        )

    # If we have no sections, then don't worry about a toctree
    sections = [(ii.get("path"), ii.get("name")) for ii in page.get("sections", [])]
    if len(sections) == 0:
        return

    for ii, (path_sec, name) in enumerate(sections):
        # Update path so it is relative to the root of the parent
        path_parent_folder = Path(page["path"]).parent
        path_sec = os.path.relpath(path_sec, path_parent_folder)

        # Decide whether we'll over-ride with a name in the toctree
        this_section = f"{path_sec}"
        if name:
            this_section = f"{name} <{this_section}>"
        sections[ii] = this_section

    # Parse the options block
    options = page.get("options", [])
    if isinstance(options, str):
        options = [options]
    options = "\n".join([f":{ii}:" for ii in options])

    # Figure out what kind of text defines a toctree directive for this file
    # currently, assumed to be markdown
    suff = Path(path).suffix
    toctree_text = dedent(
        """
    ```{{toctree}}
    :hidden:
    :titlesonly:
    {options}

    {sections}
    ```
    """
    )

    # Create the markdown directive for our toctree
    toctree = toctree_text.format(options=options, sections="\n".join(sections))
    if suff == ".md":
        source[0] += toctree + "\n"
    elif suff == ".ipynb":
        # Lazy import nbformat because we only need it if we have an ipynb file
        import nbformat as nbf

        ntbk = nbf.reads(source[0], nbf.NO_CONVERT)
        md = nbf.v4.new_markdown_cell(toctree)
        ntbk.cells.append(md)
        source[0] = nbf.writes(ntbk)
    else:
        raise ValueError("Only markdown and ipynb files are supported.")


def update_indexname(app, config):
    # If no globaltoc is given, we'll skip this part
    if not app.config["globaltoc_path"]:
        return

    # Load the TOC and update the env so we have it later
    toc = yaml.safe_load(Path(app.config["globaltoc_path"]).read_text())
    if isinstance(toc, list):
        toc_updated = toc[0]
        if len(toc) > 1:
            subsections = toc[1:]
            toc_updated["sections"] = subsections
    app.config["globaltoc"] = toc_updated

    # Update the main toctree file for whatever the first file here is
    app.config["master_doc"] = _no_suffix(toc_updated["path"])
