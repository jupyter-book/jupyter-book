import os
import os.path as op
from ruamel.yaml import YAML
from ruamel.yaml.compat import StringIO

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


def _filename_to_title(filename, split_char='_'):
    filename = os.path.splitext(filename)[0]
    filename_parts = filename.split(split_char)
    try:
        # If first part of the filename is a number for ordering, remove it
        int(filename_parts[0])
        if len(filename_parts) > 1:
            filename_parts = filename_parts[1:]
    except Exception:
        pass
    title = ' '.join(ii.capitalize() for ii in filename_parts)
    return title


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
    if not op.isdir(content_folder):
        raise ValueError(f"Could not find the provided content folder\n{content_folder}")

    # Generate YAML from the directory structure
    out = [YAML_TOP, YAML_WARN]
    toc_pages = []
    for ii, (ifolder, folders, ifiles) in enumerate(os.walk(content_folder)):
        if ".ipynb_checkpoints" in ifolder:
            continue
        path_rel_to_content = ifolder.replace(content_folder, '')

        if ii == 0:
            # Create a dictionary of top-level folders we'll append to
            top_level_dict = {folder: [] for folder in folders if len(folder) > 0}

            # Append files for the top-most folder
            for ifile in ifiles:
                if any(ifile.endswith(ii) for ii in [".ipynb", ".md"]):
                    if ifile == "LICENSE.md":
                        continue
                    suff = os.path.splitext(ifile)[-1]
                    i_title = _filename_to_title(ifile, filename_split_char)
                    i_url = os.path.join(path_rel_to_content, os.path.basename(ifile)).replace(suff, '')
                    toc_pages.append({'title': i_title, 'url': i_url})
        else:
            # Grab the top-most folder to choose which list we'll append to
            folder = path_rel_to_content.lstrip('/').split(os.sep)[0]

            # If the file ends in ipynb or md, add it to this section
            for ifile in ifiles:
                suff = os.path.splitext(ifile)[-1]
                if not any(ii == suff for ii in [".ipynb", ".md"]):
                    continue

                # Convert to Jupyter-book ready names
                i_title = _filename_to_title(ifile, filename_split_char)
                i_url = os.path.join(path_rel_to_content, os.path.basename(ifile)).replace(suff, '')
                top_level_dict[folder].append({'title': i_title, 'url': i_url})

    # Iterate through our top level dict and convert to yaml-style dict
    top_level_dict = {key: val for key, val in top_level_dict.items() if len(val) > 0}
    out_children = []
    for folder, subsections in top_level_dict.items():
        name = _filename_to_title(folder)
        out_children.append("## REPLACE ##")
        out_children.append({'header': name})
        out_children += subsections

    toc_pages += out_children

    # Convert the dictionary into YAML and append it to our output
    yaml = YAML()
    string = StringIO()
    yaml.dump(toc_pages, string)
    out.append(string.getvalue().replace("- '## REPLACE ##'", ''))
    return '\n'.join(out)
