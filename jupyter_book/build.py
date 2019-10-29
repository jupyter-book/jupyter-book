"""Build the HTML for a book's pages."""
import os
import os.path as op
from pathlib import Path
import shutil as sh
import yaml
from tqdm import tqdm
from glob import glob
from uuid import uuid4


from .utils import (print_message_box, _check_url_page, load_ntbk,
                    _prepare_url, _error, _file_newer_than, _check_book_versions,
                    _is_jupytext_file, _content_to_words)
from .page import page_html, write_page, _RawCellPreprocessor
from .page.utils import _infer_title

# Defaults
BUILD_FOLDER_NAME = "_build"
SUPPORTED_FILE_SUFFIXES = ['.ipynb', '.md', ".markdown", ".Rmd", ".py", "#BREAK#"]


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


def _filename_to_title(filename, split_char='_'):
    """Convert a file path into a more readable title."""
    filename = Path(filename).with_suffix('').name
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
               overwrite=False, clear_output=False):
    """Build the HTML for a book using its TOC and a content folder.

    Parameters
    ----------
    path_book : str
        Path to the root of the book repository
    path_toc_yaml : str | None
        Path to the Table of Contents YAML file
    path_ssg_config : str | None
        Path to the Jekyll configuration file
    local_build : bool
        Specify you are building site locally for later upload
    execute : bool
        Whether to execute notebooks before converting to HTML
    overwrite : bool
        Whether to overwrite existing HTML files
    clear_output: bool
        Whether to clear existing outputs/results in the notebooks
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

    ###############################################################################
    # Read in textbook configuration

    # Load the yaml for this site
    with open(path_ssg_config, 'r', encoding='utf8') as ff:
        site_yaml = yaml.safe_load(ff.read())
    CONTENT_FOLDER_NAME = site_yaml.get('content_folder_name').strip('/')
    PATH_CONTENT_FOLDER = op.join(path_book, CONTENT_FOLDER_NAME)

    # Load the textbook yaml for this site
    if not op.exists(path_toc_yaml):
        raise _error(
            "No toc.yml file found, please create one at `{}`".format(path_toc_yaml))
    with open(path_toc_yaml, 'r', encoding='utf8') as ff:
        toc = yaml.safe_load(ff.read())

    # Drop divider items and non-linked pages in the sidebar, un-nest sections
    toc = _prepare_toc(toc)

    ################################################################################
    # Generating the Jekyll files for all content

    n_skipped_files = 0
    n_built_files = 0
    case_check = _case_sensitive_fs(BUILD_FOLDER) and local_build
    print("Convert and copy notebook/md files...")
    for ix_file, page in enumerate(tqdm(list(toc))):
        if page.get('external'):
            # If its an external link, just pass
            continue
        url_page = page.get('url')

        # Make sure URLs (file paths) have correct structure
        _check_url_page(url_page, CONTENT_FOLDER_NAME)

        ##############################################################################
        # Define paths and prepare directories for writing

        # URL will be relative to the CONTENT_FOLDER
        path_url_page = os.path.join(PATH_CONTENT_FOLDER, url_page.lstrip('/'))
        path_url_folder = os.path.dirname(path_url_page)
        notebook_name = op.split(path_url_page)[-1]  # No extension yet

        # URLs shouldn't have the suffix in there already so
        # now we find which one to add
        for suff in SUPPORTED_FILE_SUFFIXES:
            if op.exists(path_url_page + suff):
                path_url_page_suff = path_url_page + suff
                chosen_suff = suff
                break
            elif suff == "#BREAK#":
                # Final suffix means we didn't find any existing content
                raise _error(
                    "Could not find file called {} with any of these extensions: {}".format(
                        path_url_page, SUPPORTED_FILE_SUFFIXES[:-1]))

        # Folder / file path for written HTML
        path_page_rel_content_folder = CONTENT_FOLDER_NAME + os.sep + \
            path_url_page_suff.split(CONTENT_FOLDER_NAME + os.sep)[-1]
        path_page_output_folder = path_url_folder.replace(
            os.sep + CONTENT_FOLDER_NAME, os.sep + BUILD_FOLDER_NAME) + os.sep
        path_page_output_file = op.join(
            path_page_output_folder, op.basename(path_url_page_suff).replace(suff, '.html'))

        # Path for generated images. They'll be placed in `images/` folder w/ the same folder
        # structure that they have within the `content/` folder.
        path_output_folder_from_build_root = path_page_output_folder.split(
            os.sep + BUILD_FOLDER_NAME + os.sep)[-1]
        path_media_output_folder = op.join(
            PATH_IMAGES_FOLDER, path_output_folder_from_build_root)
        path_media_rel_to_output_folder = op.relpath(path_media_output_folder, path_page_output_folder)

        # Create our build folder if it doesn't exist
        if not op.isdir(path_page_output_folder):
            os.makedirs(path_page_output_folder)

        # If the new build file exists and is *newer* than the original file, assume
        # the original content file hasn't changed and skip it.
        if overwrite is False and op.exists(path_page_output_file) \
           and _file_newer_than(path_page_output_file, path_url_page_suff):
            n_skipped_files += 1
            continue

        ################################################################################
        # Generate previous/next page URLs
        if ix_file == 0:
            url_prev_page = ''
        else:
            url_prev_page = toc[ix_file - 1].get('url')
            pre_external = toc[ix_file - 1].get('external', False)
            if pre_external is False:
                url_prev_page = _prepare_url(url_prev_page)

        if ix_file == len(toc) - 1:
            url_next_page = ''
        else:
            url_next_page = toc[ix_file + 1].get('url')
            next_external = toc[ix_file + 1].get('external', False)
            if next_external is False:
                url_next_page = _prepare_url(url_next_page)

        ###########################################################################
        # Read in the page and check page metadata

        ntbk = load_ntbk(path_url_page_suff)
        yaml_extra = ntbk['metadata'].get('yaml_header', '').split('\n')

        # Decide whether to execute the notebook
        execute_dir = path_url_folder if execute is True else None

        # If it's a Jupytext file, execute it anyway
        if _is_jupytext_file(ntbk) and chosen_suff != '.ipynb':
            execute_dir = path_url_folder

        # Get kernel name and presence of widgets from notebooks metadata
        kernel_name = ntbk['metadata'].get('kernelspec', {}).get('name', '')
        has_widgets = "true" if any("interactive" in cell['metadata'].get('tags', []) for cell in ntbk['cells']) else "false"

        # Collect common words that we'll insert into the page metadata for search
        page_content = ' '.join([cell['source'] for cell in ntbk.cells
                                 if cell['cell_type'] == "markdown"])
        max_search_words = site_yaml.get("search_max_words_in_content", 100)
        search_words = ' '.join(_content_to_words(page_content, max_search_words))

        # Determine the title and author information if we wish
        title = page.get('title')
        if title is None:
            # If the title isn't in the TOC and we want titles, then infer from the page
            title = _infer_title(ntbk)
        if title is None:
            # If there's no title info in the notebook, use the filename
            title = _filename_to_title(path_url_page_suff,
                                       site_yaml.get('filename_title_split_character', '_'))

        # Use another variable to decide whether we *show* the title
        html_title = title
        if site_yaml.get("page_titles", False) is False:
            html_title = False

        author = page.get('author', ntbk.metadata.get('author'))
        html_author = author
        if site_yaml.get("page_authors", False) is False:
            html_author = False

        ###########################################################################
        # Write the page to HTML on disk

        # Convert the notebook to HTML
        html, resources = page_html(
            ntbk, path_media_output=path_media_rel_to_output_folder,
            name=notebook_name, preprocessors=_RawCellPreprocessor, execute_dir=execute_dir,
            kernel_name=kernel_name, clear_output=clear_output, title=html_title,
            author=html_author
        )

        # Write the HTML to disk
        path_html = write_page(html, path_page_output_folder, resources)
        if path_html != path_page_output_file:
            raise ValueError(
                "HTML not written to the expected location.\n\n"
                f"expected\t{path_page_output_folder}\ngot\t\t{path_html}\n"
            )

        ###########################################################################
        # Modify the generated HTML to work with the SSG

        with open(path_page_output_file, 'r', encoding='utf8') as ff:
            lines = ff.readlines()

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

        # Add interactive kernel info if the page is executable
        if chosen_suff == ".ipynb":
            yaml_fm += ['interact_link: {}'.format(path_page_rel_content_folder.replace(os.sep, '/'))]
            yaml_fm += ["kernel_name: {}".format(kernel_name)]
            yaml_fm += ["has_widgets: {}".format(has_widgets)]

        # Page metadata
        # Use YAML block scalars for titles so that people can use special characters
        # See http://blogs.perl.org/users/tinita/2018/03/strings-in-yaml---to-quote-or-not-to-quote.html
        yaml_fm += ["title: |-"]
        yaml_fm += [f"  {title}"]
        if author:
            yaml_fm += [f"author: {author}"]
        yaml_fm += [f"pagenum: {ix_file}"]
        yaml_fm += ['prev_page:']
        yaml_fm += [f'  url: {url_prev_page}']
        yaml_fm += ['next_page:']
        yaml_fm += [f'  url: {url_next_page}']
        yaml_fm += [f"suffix: {chosen_suff}"]
        yaml_fm += [f"search: {search_words}"]

        # Add back any original YaML
        yaml_fm += yaml_extra
        yaml_fm += [f'comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /{CONTENT_FOLDER_NAME}***"']
        yaml_fm += ['---']
        yaml_fm = [ii + '\n' for ii in yaml_fm]

        # Write the result as UTF-8.
        lines = yaml_fm + lines
        with open(path_page_output_file, 'w', encoding='utf8') as ff:
            ff.writelines(lines)
        n_built_files += 1

    ###########################################################################
    # Finishing up...

    # Copy non-markdown files in notebooks/ in case they're referenced in the notebooks
    print('Copying non-content files inside `{}/`...'.format(CONTENT_FOLDER_NAME))
    _copy_non_content_files(PATH_CONTENT_FOLDER,
                            CONTENT_FOLDER_NAME, BUILD_FOLDER_NAME)

    # Message at the end
    msg = [f"Generated {n_built_files} new files\n"
           f"Skipped {n_skipped_files} already-built files"]
    if n_built_files == 0:
        msg += [f"Delete the markdown/HTML files in '{BUILD_FOLDER_NAME}' "
                "for any pages that you wish to re-build, or use --overwrite "
                "option to re-build all."]
    msg += [f"Your Jupyter Book is now in `{BUILD_FOLDER_NAME}/`."]
    msg += ["Demo your Jupyter book with `make serve` or push to GitHub!"]
    print_message_box('\n'.join(msg))
