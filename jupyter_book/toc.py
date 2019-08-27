import os
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
    # Generate YAML from the directory structure
    out = [YAML_TOP, YAML_WARN]
    for ifolder, _, ifiles in os.walk(content_folder):
        if ".ipynb_checkpoints" in ifolder:
            continue
        path_rel_to_content = ifolder.replace(content_folder, '')

        # Create a new section
        if any(any(ifile.endswith(ii) for ii in [".ipynb", ".md"]) for ifile in ifiles):
            # Add a comment denoting the new section
            out.append(TOC_SPACER)

            # Write the TOC to YAML or print it
            this_toc = []

            # If the file ends in ipynb or md, add it to this section
            for ifile in ifiles:
                suff = os.path.splitext(ifile)[-1]
                if not any(ii == suff for ii in [".ipynb", ".md"]):
                    continue

                # Convert to Jupyter-book ready names
                i_title = _filename_to_title(ifile, filename_split_char)
                i_url = os.path.join(path_rel_to_content, os.path.basename(ifile)).replace(suff, '')
                this_toc.append({'title': i_title, 'url': i_url})

            yaml = YAML()
            string = StringIO()
            yaml.dump(this_toc, string)
            out.append(string.getvalue())
    return '\n'.join(out)
