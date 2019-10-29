"""Utility functions for Jupyter Book."""

import string
import argparse
import os
import os.path as op
import yaml
from glob import glob
from collections import Counter
from string import ascii_lowercase
from tqdm import tqdm
import nbformat as nbf
import jupytext as jpt
from nbformat.v4.nbbase import new_markdown_cell, new_notebook
from .page import run_ntbk

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


def _file_newer_than(path1, path2):
    """Check whether file at path1 is newer than path2."""
    return os.stat(path1).st_mtime > os.stat(path2).st_mtime


def _minor_release(version):
    """Excludes the patch release from a version number, such that
    only major and minor versions face strict matching."""
    major_minor_version = version.rsplit('.', 1)[0]
    if len(major_minor_version .split('.')) != 2:
        raise ValueError("Version doesn't conform to `major.minor.patch` format.")
    return major_minor_version


def _check_book_versions(path_book):
    """Check whether the version of a book matches the version of the
    CLI that's building it.
    """

    with open(op.join(path_book, "_config.yml"), 'r') as ff:
        config_version = yaml.safe_load(ff.read()).get(
            "jupyter_book_version"
        )

    if config_version is None:
        raise _error(
            "Couldn't find the version for your Jupyter Book.\n"
            f"Try upgrading it with `jupyter-book upgrade {path_book}"
        )

    if _minor_release(config_version) != _minor_release(__version__):
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


def _is_jupytext_file(ntbk):
    """Infer whether a notebook node was created from a Jupytext Markdown file.

    Right now, this just tries to guess based on whether there's a particular piece of
    metadata in the notebook.
    """
    jupytext_meta = ntbk.get('metadata', {}).get('jupytext')
    if jupytext_meta is None:
        return False
    else:
        return jupytext_meta.get('notebook_metadata_filter', '') != "-all"


def run_pages(path, kernel_name='python3'):
    "Run a collection of notebooks. Each will be run in-place."
    if not op.exists(path):
        raise ValueError(f"Couldn't find anything at the path provided: {path}")
    if path.endswith('.ipynb'):
        print('Running single notebook...')
        ipynb_files = [path]
    else:
        ipynb_files = glob(op.join(path, '**', '*.ipynb'), recursive=True)
        n_notebooks = len(ipynb_files)
        if n_notebooks == 0:
            raise ValueError(f"No notebooks were found in the provided folder: {path}")
        print(f"Running a folder of notebooks, {n_notebooks} in total.")

    failed_files = []
    for ifile in tqdm(ipynb_files):
        ntbk = nbf.read(ifile, nbf.NO_CONVERT)
        try:
            ntbk = run_ntbk(ntbk, op.dirname(ifile))
            nbf.write(ntbk, ifile)
        except Exception:
            failed_files.append(ifile)

    if len(failed_files) > 0:
        print('Finished printing with these failing pages:')
        for ifile in failed_files:
            print(ifile)


def _content_to_words(content, max_words=100):
    """Convert a string of content into a list of unique words."""
    common_words = [
        "the", "of", "to", "and", "a", "in", "is", "it", "you",
        "that", "he", "was", "for", "on", "are", "with", "as", "i",
        "his", "they", "be", "at", "one", "have", "this", "from",
        "or", "had", "by", "hot", "word", "but", "what", "some", "we",
        "can", "out", "other", "were", "all", "there", "when", "up", "use",
        "your", "how", "said", "an", "each", "she", "which", "do", "their",
        "time", "if", "will", "way", "about", "many", "then", "them", "write",
        "would", "like", "so", "these", "her", "long", "make", "thing", "see",
        "him", "two", "has", "look", "more", "day", "could", "go", "come", "did",
        "number", "sound", "no", "most", "people", "my", "over", "know",
        "water", "than", "call", "first", "who", "may", "down", "side",
        "been", "now", "find"
    ]

    # Replace characters with spaces
    words = content.replace('\n', ' ')
    space_characters = '!@#[]()-{}`:=/\\,.?'
    for char in space_characters:
        words = words.replace(char, ' ')

    # Collect a list of uncommon english words
    new_words = []
    for word in words.split():
        if 'http' in word:
            continue
        word = ''.join([char for char in word.lower() if char in ascii_lowercase])
        if (len(word) == 0) or (word in common_words):
            continue
        new_words.append(word)

    counts = Counter(new_words)
    out_words = [iword[0] for iword in counts.most_common()[:max_words]]
    return out_words


def load_ntbk(path_ntbk):
    """Load a notebook from a text or ipynb file, reading out YAML header as needed.

    Parameters
    ----------
    path_ntbk : string
        Path to an ipynb file or a text file.

    Returns
    -------
    ntbk : instance of NotebookNode
        A Jupyter Notebook created from `path_ntbk`. If `path_ntbk` is an ipynb
        file, this will simply read it in. If a text file, then Jupytext will
        be used to read in the file. If Jupytext metadata is not found, then
        the content of `path_ntbk` will be read into a single markdown cell
        in the notebook.

    yaml_extra : list of yaml metadata
        If any YAML metadata is found as a header in `path_ntbk`, it will be
        collected and returned in this object.
    """
    # Read in the notebook with Jupytext
    ntbk = jpt.read(path_ntbk)
    suff = op.splitext(path_ntbk)[-1]

    # If the first cell has YAML metadata we'll convert it into notebook metadata
    if ntbk.cells[0].source.startswith('---') and ntbk.cells[0].source.endswith('---'):
        yaml_extra = ntbk.cells.pop(0).source.replace('---', '').strip()
    else:
        yaml_extra = None

    # If the file was markdown and didn't have any jupytext frontmatter
    # Just add in the raw source
    if not _is_jupytext_file(ntbk) and suff in ['.md', 'markdown']:
        # Recover the Markdown content
        md = jpt.writes(ntbk, 'md')
        # Replace the notebook with a new one, made of just one Markdown cell
        ntbk = new_notebook(cells=[new_markdown_cell(md)])

    # Add the extra YAML header info if it's there
    if yaml_extra:
        ntbk.metadata['yaml_header'] = yaml_extra

    return ntbk
