import os
import os.path as op
import shutil as sh
import yaml
from tqdm import tqdm
from glob import glob
from uuid import uuid4
import jupytext as jpt

from .utils import (print_message_box, _split_yaml, _check_url_page, _prepare_toc,
                    _prepare_url, _error, _file_newer_than, _check_book_versions)
from .page import build_page

# Defaults
BUILD_FOLDER_NAME = "_build"
SUPPORTED_FILE_SUFFIXES = ['.ipynb', '.md', ".markdown", ".Rmd", ".py", "#BREAK#"]


def _clean_lines(lines, filepath, PATH_BOOK, path_images_folder):
    """Replace images with jekyll image root and add escape chars as needed."""

    # Images: replace absolute nbconvert image paths to baseurl paths
    path_rel_root = op.relpath(PATH_BOOK, op.dirname(filepath))
    path_rel_root_one_up = path_rel_root.replace('../', '', 1)
    for ii, line in enumerate(lines):
        # Handle relative paths because we remove `content/` from the URL
        # If there's a path that goes back to the root, remove a level`
        # This is for images referenced directly in the html
        if path_rel_root in line:
            line = line.replace(path_rel_root, path_rel_root_one_up)
        # For programmatically-generated images from notebooks, replace the abspath with relpath
        line = line.replace(path_images_folder, op.join(path_rel_root_one_up, 'images'))
        lines[ii] = line
    return lines


def _copy_non_content_files(path_content_folder, content_folder_name,
                            build_folder_name):
    """Copy non-markdown/notebook files in the content folder into build folder so relative links work."""
    all_files = glob(op.join(path_content_folder, '**', '*'), recursive=True)
    non_content_files = [ii for ii in all_files if not any(
        ii.endswith(ext) for ext in SUPPORTED_FILE_SUFFIXES)]
    for ifile in non_content_files:
        if op.isdir(ifile):
            continue

        # The folder name may change if the permalink sanitizing changes it.
        # this ensures that a new folder exists if needed
        new_path = ifile.replace(
            os.sep + content_folder_name, os.sep + build_folder_name)
        if not op.isdir(op.dirname(new_path)):
            os.makedirs(op.dirname(new_path))
        sh.copy2(ifile, new_path)


def _case_sensitive_fs(path):
    """True when filesystem at `path` is case sensitive, False otherwise.

    Checks this by attempting to write two files, one w/ upper case, one
    with lower. If after this only one file exists, the system is
    case-insensitive.

    Makes directory `path` if it does not exist.
    """
    if not op.exists(path):
        os.makedirs(path)
    root = op.join(path, uuid4().hex)
    fnames = [root + suffix for suffix in 'aA']
    try:
        for fname in fnames:
            with open(fname, 'wt') as fobj:
                fobj.write('text')
        written = glob(root + '*')
    finally:
        for fname in written:
            os.unlink(fname)
    return len(written) == 2


def build_book(path_book, path_toc_yaml=None, path_ssg_config=None,
               path_template=None, local_build=False, execute=False,
               overwrite=False):
    """Build the HTML for a book using its TOC and a content folder.

    Parameters
    ----------
    path_book : str
        Path to the root of the book repository
    path_toc_yaml : str | None
        Path to the Table of Contents YAML file
    path_ssg_config : str | None
        Path to the Jekyll configuration file
    path_template : str | None
        Path to the template nbconvert uses to build HTML
        files
    local_build : bool
        Specify you are building site locally for later upload
    execute : bool
        Whether to execute notebooks before converting to HTML
    overwrite : bool
        Whether to overwrite existing HTML files
    """
    if not op.isdir(path_book):
        raise _error(
            "Could not find a Jupyter Book at the given location.\n"
            "Double-check the path you've provided:\n"
            "\n"
            f"{path_book}"
        )

    _check_book_versions(path_book)

    PATH_IMAGES_FOLDER = op.join(path_book, '_build', 'images')
    BUILD_FOLDER = op.join(path_book, BUILD_FOLDER_NAME)

    ###############################################
    # Read in textbook configuration

    # Load the yaml for this site
    with open(path_ssg_config, 'r') as ff:
        site_yaml = yaml.safe_load(ff.read())
    CONTENT_FOLDER_NAME = site_yaml.get('content_folder_name').strip('/')
    PATH_CONTENT_FOLDER = op.join(path_book, CONTENT_FOLDER_NAME)

    # Load the textbook yaml for this site
    if not op.exists(path_toc_yaml):
        raise _error(
            "No toc.yml file found, please create one at `{}`".format(path_toc_yaml))
    with open(path_toc_yaml, 'r') as ff:
        toc = yaml.safe_load(ff.read())

    # Drop divider items and non-linked pages in the sidebar, un-nest sections
    toc = _prepare_toc(toc)

    ################################################
    # Generating the Jekyll files for all content

    n_skipped_files = 0
    n_built_files = 0
    case_check = _case_sensitive_fs(BUILD_FOLDER) and local_build
    print("Convert and copy notebook/md files...")
    for ix_file, page in enumerate(tqdm(list(toc))):
        url_page = page.get('url', None)
        title = page.get('title', None)
        if page.get('external', None):
            # If its an external link, just pass
            continue

        # Make sure URLs (file paths) have correct structure
        _check_url_page(url_page, CONTENT_FOLDER_NAME)

        ##############################################
        # Create path to old/new file and create directory

        # URL will be relative to the CONTENT_FOLDER
        path_url_page = os.path.join(PATH_CONTENT_FOLDER, url_page.lstrip('/'))
        path_url_folder = os.path.dirname(path_url_page)

        # URLs shouldn't have the suffix in there already so
        # now we find which one to add
        for suff in SUPPORTED_FILE_SUFFIXES:
            if op.exists(path_url_page + suff):
                path_url_page = path_url_page + suff
                break
            elif suff == "#BREAK#":
                # Final suffix means we didn't find any existing content
                raise _error(
                    "Could not find file called {} with any of these extensions: {}".format(
                        path_url_page, SUPPORTED_FILE_SUFFIXES[:-1]))

        # Create and check new folder / file paths
        path_build_new_folder = path_url_folder.replace(
            os.sep + CONTENT_FOLDER_NAME, os.sep + BUILD_FOLDER_NAME) + os.sep
        path_build_new_file = op.join(
            path_build_new_folder, op.basename(path_url_page).replace(suff, '.html'))

        # If the new build file exists and is *newer* than the original file, assume
        # the original content file hasn't changed and skip it.
        if overwrite is False and op.exists(path_build_new_file) \
           and _file_newer_than(path_build_new_file, path_url_page):
            n_skipped_files += 1
            continue

        if not op.isdir(path_build_new_folder):
            os.makedirs(path_build_new_folder)

        ################################################
        # Generate previous/next page URLs
        if ix_file == 0:
            url_prev_page = ''
            prev_file_title = ''
        else:
            prev_file_title = toc[ix_file - 1].get('title')
            url_prev_page = toc[ix_file - 1].get('url')
            pre_external = toc[ix_file - 1].get('external', False)
            if pre_external is False:
                url_prev_page = _prepare_url(url_prev_page)

        if ix_file == len(toc) - 1:
            url_next_page = ''
            next_file_title = ''
        else:
            next_file_title = toc[ix_file + 1].get('title')
            url_next_page = toc[ix_file + 1].get('url')
            next_external = toc[ix_file + 1].get('external', False)
            if next_external is False:
                url_next_page = _prepare_url(url_next_page)

        ###############################################################################
        # Get kernel name and presence of widgets from notebooks metadata

        kernel_name = ''
        data = jpt.read(path_url_page)
        if 'metadata' in data and 'kernelspec' in data['metadata']:
            kernel_name = data['metadata']['kernelspec']['name']
        has_widgets = "true" if any("interactive" in cell['metadata'].get('tags', []) for cell in data['cells']) else "false"

        ############################################
        # Content conversion

        # Convert notebooks or just copy md if no notebook.
        if any(path_url_page.endswith(ii) for ii in ['.md', '.ipynb']):
            # Decide the path where the images will be placed, relative to the HTML location
            path_after_build_folder = path_build_new_folder.split(
                os.sep + BUILD_FOLDER_NAME + os.sep)[-1]
            path_images_new_folder = op.join(
                PATH_IMAGES_FOLDER, path_after_build_folder)

            # Build the HTML for this book
            build_page(path_url_page, path_build_new_folder, path_images_new_folder,
                       path_template=path_template, kernel_name=kernel_name,
                       execute=execute)
        else:
            raise _error(
                "Files must end in ipynb or md. Found file {}".format(path_url_page))

        ###############################################################################
        # Modify the generated HTML to work with the SSG
        with open(path_build_new_file, 'r', encoding='utf8') as ff:
            lines = ff.readlines()
        lines = _clean_lines(lines, path_build_new_file,
                             path_book, PATH_IMAGES_FOLDER)

        # Split off original yaml
        yaml_orig, lines = _split_yaml(lines)

        # Front-matter YAML
        yaml_fm = []
        yaml_fm += ['---']
        # In case pre-existing links are sanitized
        sanitized = url_page.lower().replace('_', '-')
        if sanitized != url_page:
            if case_check and url_page.lower() == sanitized:
                raise RuntimeError(
                    'Redirect {} clashes with page {} for local build on '
                    'case-insensitive FS\n'.format(sanitized, url_page) +
                    'Rename source page to lower case or build on a case '
                    'sensitive FS, e.g. case-sensitive disk image on Mac')
            yaml_fm += ['redirect_from:']
            yaml_fm += ['  - "{}"'.format(sanitized)]

        # Add interactive kernel info
        interact_path = CONTENT_FOLDER_NAME + '/' + \
            path_url_page.split(CONTENT_FOLDER_NAME + '/')[-1]
        yaml_fm += ['interact_link: {}'.format(interact_path)]
        yaml_fm += ["kernel_name: {}".format(kernel_name)]
        yaml_fm += ["has_widgets: {}".format(has_widgets)]

        # Page metadata
        # Use YAML block scalars for titles so that people can use special characters
        # See http://blogs.perl.org/users/tinita/2018/03/strings-in-yaml---to-quote-or-not-to-quote.html
        yaml_fm += ["title: |-"]
        yaml_fm += ["  {}".format(title)]
        yaml_fm += ['prev_page:']
        yaml_fm += ['  url: {}'.format(url_prev_page)]
        yaml_fm += ["  title: |-"]
        yaml_fm += ["    {}".format(prev_file_title)]
        yaml_fm += ['next_page:']
        yaml_fm += ['  url: {}'.format(url_next_page)]
        yaml_fm += ["  title: |-"]
        yaml_fm += ["    {}".format(next_file_title)]

        # Add back any original YaML, and end markers
        yaml_fm += yaml_orig
        yaml_fm += ['comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /{}***"'.format(
            CONTENT_FOLDER_NAME)]
        yaml_fm += ['---']
        yaml_fm = [ii + '\n' for ii in yaml_fm]
        lines = yaml_fm + lines

        # Write the result as UTF-8.
        with open(path_build_new_file, 'w', encoding='utf8') as ff:
            ff.writelines(lines)
        n_built_files += 1

    #######################################################
    # Finishing up...

    # Copy non-markdown files in notebooks/ in case they're referenced in the notebooks
    print('Copying non-content files inside `{}/`...'.format(CONTENT_FOLDER_NAME))
    _copy_non_content_files(PATH_CONTENT_FOLDER,
                            CONTENT_FOLDER_NAME, BUILD_FOLDER_NAME)

    # Message at the end
    msg = ["Generated {} new files\nSkipped {} already-built files".format(
        n_built_files, n_skipped_files)]
    if n_built_files == 0:
        msg += ["Delete the markdown/HTML files in '{}' for any pages that you wish to re-build, or use --overwrite option to re-build all.".format(
            BUILD_FOLDER_NAME)]
    msg += ["Your Jupyter Book is now in `{}/`.".format(BUILD_FOLDER_NAME)]
    msg += ["Demo your Jupyter book with `make serve` or push to GitHub!"]
    print_message_box('\n'.join(msg))
