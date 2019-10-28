"""Functions to process and create a Table of Contents file."""
from pathlib import Path
from ruamel.yaml import YAML
from ruamel.yaml.compat import StringIO
from .build import SUPPORTED_FILE_SUFFIXES, _filename_to_title

DESCRIPTION = ("Automatically generate a toc.yaml file from a collection"
               " of Jupyter Notebooks/markdown files that make a jupyter book."
               " The alpha-numeric name of folders/files will be used to choose the order of chapters."
               " This is just a helper script, it will likely not generate YAML that will create a "
               " valid Jupyter Book. Use it as a time-saver, not a total solution for making a TOC.")

YAML_TOP = ("# Each entry has the following schema:\n"
            "#\n"
            "# - title: mytitle   # Title of chapter or section\n"
            "#   url: /myurl  # URL of section relative to the /content/ folder.\n"
            "#   sections:  # Contains a list of more entries that make up the chapter's sections\n"
            "#   not_numbered: true  # if the section shouldn't have a number in the sidebar\n"
            "#     (e.g. Introduction or appendices)\n"
            "#   expand_sections: true  # if you'd like the sections of this chapter to always\n"
            "#     be expanded in the sidebar.\n"
            "#   external: true  # Whether the URL is an external link or points to content in the book\n"
            "#\n"
            "# Below are some special values that trigger specific behavior:\n"
            "# - search: true  # Will provide a link to a search page\n"
            "# - divider: true  # Will insert a divider in the sidebar\n"
            "# - header: My Header  # Will insert a header with no link in the sidebar\n")

YAML_WARN = ("#\n"
             "# ==============================\n"
             "# AUTOMATICALLY GENERATED TOC FILE.\n"
             "# You should review the contents of this file, re-order items as you wish,\n"
             "# and nest chapters in sections if you wish. The ======= symbols represent \n"
             "# folder breaks.\n"
             "# \n"
             "# See the demo `toc.yml` for the right structure to follow. You can \n"
             "# generate a demo book by running `jupyter-book create mybook --demo`\n"
             "# ==============================\n\n\n")

TOC_SPACER = "# ===== NEW SECTION ========================================"


def _list_supported_files(directory, exclude=["LICENSE.md"], rglob=False):
    glob = directory.rglob if rglob is True else directory.glob
    supported_files = [
        ipath for suffix in SUPPORTED_FILE_SUFFIXES
        for ipath in glob(f"*{suffix}")
        if (ipath.name not in exclude) and ('ipynb_checkpoints' not in str(ipath))
    ]
    return supported_files


def build_toc(content_folder, filename_split_char='_'):
    """Auto-generate a Table of Contents from files/folders.

    Parameters
    ----------
    content_folder : str
        Path to the folder where content exists. The TOC will be generated
        according to the alphanumeric sort of these files/folders.
    filename_split_char : str
        The character used in inferring spaces in page names from filenames.
    """
    content_folder = Path(content_folder)
    if not content_folder.is_dir():
        raise ValueError(f"Could not find the provided content folder\n{content_folder}")

    # Generate YAML from the directory structure
    out = [YAML_TOP, YAML_WARN]
    toc_pages = []

    # First find all the allowed file types in path
    paths = _list_supported_files(content_folder)
    for ipath in paths:
        ipath = ipath.with_suffix('')
        url = str(Path(*ipath.parts[1:]))
        toc_pages.append({'url': url})

    # Now find all the top-level directories of the content folder
    subdirectories = sorted([sub for sub in content_folder.glob('*')
                             if (sub.is_dir() and '.ipynb_checkpoints' not in sub.name)])

    for subdir in subdirectories:
        ipaths = _list_supported_files(subdir, rglob=True)
        if len(ipaths) == 0:
            continue

        # Add a section break for this section
        toc_pages.append("## REPLACE ##")
        toc_pages.append({'header': _filename_to_title(subdir.name, filename_split_char)})

        # Now add the children as a list of pages
        for ipath in ipaths:
            ipath = ipath.with_suffix('')
            url = str(Path(*ipath.parts[1:]))
            toc_pages.append({'url': url})

    # Convert the dictionary into YAML and append it to our output
    yaml = YAML()
    string = StringIO()
    yaml.dump(toc_pages, string)
    out.append(string.getvalue().replace("- '## REPLACE ##'", ''))
    return '\n'.join(out)
