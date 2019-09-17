"""Utility functions for Jupyter Book."""

import string
import argparse
import os
import os.path as op
import yaml

from . import __version__

##############################################################################
# CLI utilities


def print_color(msg, style):
    endc = "\033[0m"
    bcolors = dict(
        blue="\033[94m",
        green="\033[92m",
        orange="\033[93m",
        red="\033[91m",
        bold="\033[1m",
        underline="\033[4m",
    )
    print(bcolors[style] + msg + endc)


def print_message_box(msg):
    border = "================================================================================"
    print_color("\n\n" + border + "\n\n", "green")
    print(msg)
    print_color("\n\n" + border + "\n\n", "green")


def _error(msg):
    msg = "\n\n\033[91m==========\033[0m\n{}\n\033[91m==========\033[0m\n".format(msg)
    return ValueError(msg)


def str2bool(msg):
    if msg.lower() in ("yes", "true", "t", "y", "1"):
        return True
    elif msg.lower() in ("no", "false", "f", "n", "0"):
        return False
    else:
        raise argparse.ArgumentTypeError("Boolean value expected. Got: {}".format(msg))


##############################################################################
# Book conversion formatting


ALLOWED_CHARACTERS = string.ascii_letters + "-_/." + string.digits


def _split_yaml(lines):
    yaml0 = None
    for ii, iline in enumerate(lines):
        iline = iline.strip()
        if yaml0 is None:
            if iline == "---":
                yaml0 = ii
            elif iline:
                break
        elif iline == "---":
            return lines[yaml0 + 1: ii], lines[ii + 1:]
    return [], lines


def _check_url_page(url_page, content_folder_name):
    """Check that the page URL matches certain conditions."""
    if not all(ii in ALLOWED_CHARACTERS for ii in url_page):
        raise ValueError("Found unsupported character in filename: {}".format(url_page))
    if "." in os.path.splitext(url_page)[-1]:
        raise _error(
            "A toc.yml entry links to a file directly. You should strip the file suffix.\n"
            "Please change {} to {}".format(url_page, os.path.splitext(url_page)[0])
        )
    if any(
        url_page.startswith(ii)
        for ii in [content_folder_name, os.sep + content_folder_name]
    ):
        raise ValueError(
            "It looks like you have a page URL that starts with your content folder's name."
            "page URLs should be *relative* to the content folder. Here is the page URL: {}".format(
                url_page
            )
        )


def _prepare_toc(toc):
    """Prepare the TOC for processing."""
    # Un-nest the TOC so it's a flat list
    new_toc = []
    for chapter in toc:
        sections = chapter.get('sections', [])
        new_toc.append(chapter)
        for section in sections:
            subsections = section.get('subsections', [])
            new_toc.append(section)
            new_toc.extend(subsections)

    # Omit items that don't have URLs (like dividers) or have an external link
    return [
        item for item in new_toc
        if 'url' in item and not item.get('external', False)
    ]


def _prepare_url(url):
    """Prep the formatting for a url."""
    # Strip suffixes and prefixes of the URL
    if not url.startswith("/"):
        url = "/" + url

    # Standardize the quotes character
    url = url.replace('"', "'")

    # Make sure it ends in "HTML"
    if not url.endswith(".html"):
        url = op.splitext(url)[0] + ".html"
    return url


def _clean_markdown_cells(ntbk):
    """Clean up cell text of an nbformat NotebookNode."""
    # Remove '#' from the end of markdown headers
    for cell in ntbk.cells:
        if cell.cell_type == "markdown":
            cell_lines = cell.source.split("\n")
            for ii, line in enumerate(cell_lines):
                if line.startswith("#"):
                    cell_lines[ii] = line.rstrip("#").rstrip()
            cell.source = "\n".join(cell_lines)
    return ntbk


def _file_newer_than(path1, path2):
    """Check whether file at path1 is newer than path2."""
    return os.stat(path1).st_mtime > os.stat(path2).st_mtime


def _check_book_versions(path_book):
    """Check whether the version of a book matches the version of the
    CLI that's building it."""

    with open(op.join(path_book, "_config.yml"), 'r') as ff:
        config_version = yaml.safe_load(ff.read()).get(
            "jupyter_book_version"
        )

    if config_version is None:
        raise _error(
            "Couldn't find the version for your Jupyter Book.\n"
            f"Try upgrading it with `jupyter-book upgrade {path_book}"
        )

    if config_version != __version__:
        raise _error(
            f"The version of the book you are modifying doesn't match the\n"
            "version of the command-line tool that you're using. Please run\n"
            "\n"
            f"    jupyter-book upgrade {path_book} \n"
            "\n"
            "to upgrade your book to the CLI version.\n"
            "\n"
            f"This book's version: {config_version}\n"
            f"Your CLI's version: {__version__}\n"
            "\n"
            "See above for the error message."
        )

    return True
