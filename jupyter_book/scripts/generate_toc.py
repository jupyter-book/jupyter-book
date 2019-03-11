import os
import argparse
from ruamel.yaml import YAML
import sys

DESCRIPTION = ("Automatically generate a toc.yaml file from a collection"
               " of Jupyter Notebooks/markdown files that make a jupyter book."
               " The alpha-numeric name of folders/files will be used to choose the order of chapters."
               " This is just a helper script, it will likely not generate YAML that will create a "
               " valid Jupyter Book. Use it as a time-saver, not a total solution for making a TOC.")

parser = argparse.ArgumentParser(description=DESCRIPTION)
parser.add_argument("content_folder", default=None,
                    help="Path to the folder where the textbook is stored.")
parser.add_argument("--out_path", default=None,
                    help="Path to the folder where the output toc.yml file will be written.")
parser.add_argument("--filename_split_char", default='_', help="The character used to split words in the file name. Used to generate titles from file names. Defaults to '_'")
parser.add_argument("--overwrite", action='store_true', help="Overwrite SUMMARY.md if it already exists.")

toc_spacer = "# ===== NEW SECTION ========================================"


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


if __name__ == '__main__':
    args = parser.parse_args()
    if args.out_path is None:
        args.out_path = None

    # Generate YAML from the directory structure
    toc = []
    for ifolder, _, ifiles in os.walk(args.content_folder):
        if ".ipynb_checkpoints" in ifolder:
            continue
        path_rel_to_content = ifolder.replace(args.content_folder, '')
        if any(any(ifile.endswith(ii) for ii in [".ipynb", ".md"]) for ifile in ifiles):
            toc.append(toc_spacer)
        for ifile in ifiles:
            suff = os.path.splitext(ifile)[-1]
            if not any(ii == suff for ii in [".ipynb", ".md"]):
                continue
            i_title = _filename_to_title(ifile, args.filename_split_char)
            i_url = os.path.join(path_rel_to_content, os.path.basename(ifile)).replace(suff, '')
            toc.append({'title': i_title, 'url': i_url})

    # Write the TOC to YAML or print it
    yaml = YAML()
    top = ("# Each entry has the following schema:\n"
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

    warn = ("#\n"
            "# ==============================\n"
            "# AUTOMATICALLY GENERATED TOC FILE.\n"
            "# You should review the contents of this file, re-order items as you wish,\n"
            "# and nest chapters in sections if you wish. The ======= symbols represent \n"
            "# folder breaks.\n"
            "# \n"
            "# See the demo `toc.yml` for the right structure to follow. You can \n"
            "# generate a demo book by running `jupyter-book create mybook --demo`\n"
            "# ==============================\n\n\n")
    if args.out_path is None:
        print(top + warn)
        yaml.dump(toc, sys.stdout)
    else:
        if os.path.exists(args.out_path) and bool(args.overwrite) is False:
            raise ValueError('toc.yaml file exists, delete the file or set `overwrite=True`')

        # Dump the YAML
        with open(args.out_path, 'w') as ff:
            yaml.dump(toc, ff)

        # Read back in so we can add a comment
        with open(args.out_path, 'r') as ff:
            content = ff.read()
            # Ensure that the section spacers are comments since they'll be YAML list items by default
            content = content.replace("- '{}'".format(toc_spacer), '\n' + toc_spacer)

        with open(args.out_path, 'w') as ff:

            ff.write(top + warn + content)
        print('TOC written to: {}'.format(args.out_path))
