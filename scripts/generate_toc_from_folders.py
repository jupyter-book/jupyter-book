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
parser.add_argument("content_folder", default=None, help="Path to the folder where the textbook is stored.")
parser.add_argument("--out_path", default=None, help="Path to the folder where the output toc.yml file will be written.")
parser.add_argument("--filename_split_char", default='_', help="The character used to split words in the file name. Used to generate titles from file names. Defaults to '_'")
parser.add_argument("--overwrite", action='store_true', help="Overwrite SUMMARY.md if it already exists.")

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

def path_to_dict(path, split_char='_', base_dir=None):
    # Ensures we propagate the first path to subsequent calls
    base_dir = path if base_dir is None else base_dir

    # Infer title from the name of the file/folder
    ext = os.path.splitext(path)[-1]
    if ('ipynb_checkpoints' in path) or (len(ext) > 0 and ext not in ['.html', '.md', '.ipynb']):
        # Skip non-content files
        return "UNSUPPORTED FILE"
    d = {'title': _filename_to_title(os.path.basename(path), split_char=split_char)}
    if os.path.isdir(path):
        new_sections = [path_to_dict(os.path.join(path, ii), base_dir=base_dir, split_char=split_char) for ii in os.listdir(path)]
        new_sections = [ii for ii in new_sections if ii != "UNSUPPORTED FILE"]
        if len(new_sections) != 0:
            d['sections'] = new_sections
    else:
        d['url'] = os.path.splitext(path)[0].split(base_dir)[-1]
    return d

if __name__ == '__main__':
    args = parser.parse_args()
    if args.out_path is None:
        args.out_path = None

    # Generate YAML from the directory structure
    toc = path_to_dict(args.content_folder, split_char=args.filename_split_char)

    # Remove empty sections
    toc = toc['sections']

    # Write the TOC to YAML or print it
    yaml = YAML()
    if args.out_path is None:
        yaml.dump(toc, sys.stdout)
    else:
        if os.path.exists(args.out_path) and bool(args.overwrite) is False:
            raise ValueError('toc.yaml file exists, delete the file or set `overwrite=True`')
        with open(args.out_path, 'w') as ff:
            yaml.dump(toc, ff)
        with open(args.out_path, 'r') as ff:
            contents = ff.read()
        with open(args.out_path, 'w') as ff:
            top = ("# This file contains the order and numbering for all sections in the book."
                   "# _includes/sidebar.html renders this as a sidebar.\n"
                   "#\n"
                   "# Each entry has the following schema:\n"
                   "#\n"
                   "# title: Title of chapter or section\n"
                   "# url: URL of section. Use absolute URLs to link between pages\n"
                   "# class: (optional) a CSS class to add to this link\n"
                   "# sections: Contains chapter's sections\n"
                   "# not_numbered: true if the section shouldn't have a number in the sidebar\n"
                   "#   (e.g. Introduction or appendices)\n"
                   "# expand_sections: true if you'd like the sections of this chapter to always\n"
                   "#   be expanded in the sidebar.\n"
                   "# divider: true if this entry should just be rendered as a horizontal divider\n"
                   "#   in the sidebar. All other values are ignored.\n\n")
            warn = ("# ======\n"
                    "# AUTOMATICALLY GENERATED TOC FILE.\n"
                    "# You should review the contents of this file, re-order items as you wish,\n"
                    "# and remove the empty sections below. In particular, ensure that each\n"
                    "# item has at least a 'title' and 'url' field defined (which will not be the case for folders)\n"
                    "# ======\n")
            ff.write(top+warn + contents)
        print('TOC written to: {}'.format(args.out_path))
