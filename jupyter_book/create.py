"""Create a new book template."""
import sys
import os
import os.path as op
import shutil as sh
from ruamel.yaml import YAML

from .utils import print_message_box
from .toc import build_toc
from . import __version__

TEMPLATE_PATH = op.join(op.dirname(__file__), 'book_template')
MINIMAL_PATH = op.join(op.dirname(__file__), 'minimal')


def _final_message(path_out, notes):
    msg = ["",
           "Finished creating a new book at `{}`".format(path_out),
           ""
           "- Your content is in `{}` ".format(op.join(path_out, 'content')),
           "",
           "- A Table of Contents file is at `{}`.".format(
               op.join(path_out, '_data', 'toc.yml')),
           "  You should check its contents, make sure it references your",
           "  content correctly, and ensure it has the correct order.",
           "",
           "- Your configuration file is at `{}`.".format(
               op.join(path_out, '_config.yml')),
           "  You should check its contents and double-check that the values"
           "  are correct for your site.",
           ""]
    if len(notes) > 0:
        msg += ["", "Notes", "====="] + notes

    return '\n'.join(msg)


def _check_file_exists(path):
    if not op.exists(path):
        raise FileNotFoundError("Couldn't find file: {}".format(path))


def update_config(path_to_config, new_config):
    """Update a configuration yaml file using the values from a user-provided one."""
    _check_file_exists(new_config)

    print("Updating template configuration file with the values in {}".format(new_config))
    # Load our template and new config
    yaml = YAML()
    with open(path_to_config, 'r') as ff:
        data = yaml.load(ff)
    with open(new_config, 'r') as ff:
        data_new = yaml.load(ff)

    # Update the fields that are present in the new config
    for ii in data_new.keys():
        if ii in data:
            data[ii] = data_new[ii]
        else:
            print(
                "Not using config key with no corresponding template key: {}".format(ii))

    with open(path_to_config, 'w') as ff:
        yaml.dump(data, ff)


def new_book(path_out, content_folder, toc=None,
             license=None, custom_css=None, custom_js=None, config=None,
             extra_files=None, demo=False, verbose=True,
             overwrite=None):
    """Create a new Jupyter Book.

    Parameters
    ----------
    path_out : str
        The location where your book will be placed
    content_folder : str
        A path to a folder that holds your book content
    toc : str
        A path to a yaml file that contains a Table of Contents
        for your Jupyter Book. This will overwrite parts of the book
        template's default toc.yml configuration
    license : str
        A path to a LICENSE.md file if you have created one
    custom_css : str
        A path to a CSS file that defines some custom CSS rules for
        your book
    custom_js : str
        A path to a JS file that defines some custom CSS rules for
        your book
    config : str
        A path to a configuration YAML file that contains
        configuration for your Jupyter Book. This will overwrite
        parts of the book template's default _config.yml configuration
    extra_files : str
        A list of extra files / folders to copy into your book's directory
    demo : bool
        Whether to build the book with demo content instead of your own
        content
    verbose : bool
        Whether to display output information. [yes/no]
    overwrite : bool | None
        Whether to overwrite a pre-existing book if it exists
    """

    notes = []

    # Check folder exists and overwrite if necessary
    if op.isdir(path_out):
        if overwrite:
            sh.rmtree(path_out)
    if op.isdir(path_out):
        raise ValueError(
            "A book already exists with this name / output"
            " directory. Delete it, or use `--overwrite` if"
            " you'd like to replace it")

    # Copy the book structure to the new folder
    print("Copying new book to: {}".format(path_out))
    ignore_folders = ['_build', 'content']
    sh.copytree(TEMPLATE_PATH, path_out,
                ignore=sh.ignore_patterns('.git', *ignore_folders))

    ####################################################################
    # Copying over book files
    ####################################################################

    # If the Demo argument is provided, copy over a couple demo files and stop
    if demo is True:
        print("Copying over demo repository content")
        sh.copytree(op.join(TEMPLATE_PATH, 'content'),
                    op.join(path_out, 'content'))

        # Remove extra files we don't want
        _remove_extra_files(path_out)

        message = [
            "- You've chosen to copy over the demo Jupyter Book. This"
            "  contains",
            "  the content shown at https://jupyterbook.org.\n"
            "  Use it to get acquainted with the Jupyter-Book structure"
            " and build ",
            "  system. When you're ready, try re-running"
            " `jupyter-book create` using ",
            "  your own content!"]
        notes += message
        _final_message(path_out, [])
        sys.exit()

    # Create empty folders for build files if they don't exist
    if not op.exists(op.join(path_out, '_build')):
        os.makedirs(op.join(path_out, '_build'))

    # Copy over content
    if content_folder is None:
        content_folder = op.join(MINIMAL_PATH, 'content')
        toc = op.join(MINIMAL_PATH, '_data', 'toc.yml')
        sh.rmtree(op.join(path_out, '_build'))
        notes.append(("- Add your own content to your book. You haven't provided any content (`--content-folder`)\n"
                      "  so we've added a couple files to get you started."))

    _check_file_exists(content_folder)
    print("Copying over your content folder...")
    sh.copytree(content_folder, op.join(path_out, 'content'))

    # Copy over TOC file
    if toc is None:
        toc = build_toc(content_folder)
        with open(op.join(path_out, '_data', 'toc.yml'), 'w') as ff:
            ff.write(toc)
        notes.append(("- Check your Table of Contents file (`_data/toc.yml`). Because you specified a content foler\n"
                      "  but no Table of Conents (`--toc`), we auto-generated a TOC file file using folder and file\n"
                      "  names. You should check its contents and clean it up so that it has the structure you want!\n"))
    else:
        _check_file_exists(toc)
        print("Copying over your TOC file...\n")
        sh.copy2(toc, op.join(path_out, '_data', 'toc.yml'))

    ####################################################################
    # Configuration file
    ####################################################################
    if config is None:
        update_config(op.join(path_out, '_config.yml'),
                      op.join(MINIMAL_PATH, '_config.yml'))
    else:
        # Use the minimal configuration, which has some
        # placeholders for users to change
        update_config(op.join(path_out, '_config.yml'), config)

    # Update config values for a new book
    yaml = YAML()
    with open(op.join(path_out, '_config.yml'), 'r') as ff:
        data = yaml.load(ff)

    # Add the Jupyter Book version to the config
    data['jupyter_book_version'] = __version__
    # Remove the GA tracking code for the docs
    data['google_analytics']['mytrackingcode'] = ''

    with open(op.join(path_out, '_config.yml'), 'w') as ff:
        yaml.dump(data, ff)

    ####################################################################
    # Extra files (CSS/JS/etc) and license
    ####################################################################

    if custom_css is not None:
        if not os.path.exists(custom_css):
            raise ValueError(
                "Could not find custom CSS file: {}".format(custom_css))
        sh.copy2(custom_css, op.join(
            path_out, 'assets', 'custom', 'custom.css'))
    if custom_js is not None:
        if not os.path.exists(custom_js):
            raise ValueError(
                "Could not find custom JS file: {}".format(custom_js))
        sh.copy2(custom_js, op.join(
            path_out, 'assets', 'custom', 'custom.js'))

    # Ask user to add a license if they wish
    if license is not None:
        if not os.path.exists(license):
            raise ValueError(
                "Could not find license file: {}".format(license))
        sh.copy2(license, op.join(path_out, 'content', 'LICENSE.md'))
    else:
        notes.append(("- We've added a CC-BY-SA license for you in {}\n"
                      "  This is a reasonable license for most book content, though feel free\n"
                      "  to change it if you like!".format(op.join(path_out, 'content', 'LICENSE.md'))))
        sh.copy2(op.join(MINIMAL_PATH, 'LICENSE.md'),
                 op.join(path_out, 'content', 'LICENSE.md'))

    # Copy over extra files / folders to the root of the content folder
    if isinstance(extra_files, (list, str)):
        if isinstance(extra_files, str):
            extra_files = [extra_files]
        print('Copying over extra files: {}'.format(extra_files))
        for ipath in extra_files:
            if op.isdir(ipath):
                # Walk the directory and copy individual
                # files respecting directory structure
                for ifolder, _, ifiles in os.walk(ipath):
                    last_folder = ipath.rsplit(os.sep)[-1]
                    rel_to_last_folder = op.join(
                        last_folder, ifolder.split(last_folder, 1)[-1].strip(os.sep))
                    rel_to_out_path = op.join(path_out, rel_to_last_folder)
                    if not op.isdir(rel_to_out_path):
                        os.makedirs(rel_to_out_path)
                    for ifile in ifiles:
                        new_path = op.join(rel_to_out_path, ifile)
                        sh.copy2(op.join(ifolder, ifile), new_path)
                        print(new_path)
            else:
                # Copy the file to the root of the out path directly
                sh.copy2(ipath, op.join(path_out, op.basename(ipath)))

    # Remove extra files we don't want
    _remove_extra_files(path_out)

    # Cleanup messages
    if verbose:
        print_message_box(_final_message(path_out, notes))


def upgrade_book(path_book):
    """Upgrade a book to the latest Jupyter Book version.

    Parameters
    ----------
    path_book : str
        Path to the root of the book repository you'd like to upgrade.
    """

    path_book_new = path_book + '_UPGRADED'
    if not op.exists(op.join(path_book, '_config.yml')):
        raise ValueError(
            "This does not appear to be a valid Jupyter Book. Searched in location: {}".format(path_book))

    # Now create a new book from the old one
    try:
        print("Creating new book from your original one...")

        # Double check for pre-existing environment files as special cases
        extra_files_to_check = ['requirements.txt', 'environment.yml', '_bibliography']
        extra_files = []
        for ifile in extra_files_to_check:
            path_extra = op.join(path_book, ifile)
            if op.exists(path_extra):
                extra_files.append(path_extra)
        if len(extra_files) == 0:
            extra_files = None

        # A few optional files that are not strictly required
        optional_files = {
            "license": op.join(path_book, 'content', 'LICENSE.md'),
            "custom_css": op.join(path_book, 'assets', 'custom', 'custom.css'),
            "custom_js": op.join(path_book, 'assets', 'custom', 'custom.js')
        }
        for key, path in optional_files.items():
            if not op.exists(path):
                optional_files[key] = None

        # Now create the new book
        new_book(path_book_new, toc=op.join(path_book, '_data', 'toc.yml'),
                 content_folder=op.join(path_book, 'content'),
                 license=optional_files['license'],
                 config=op.join(path_book, '_config.yml'),
                 custom_css=optional_files['custom_css'],
                 custom_js=optional_files['custom_js'],
                 extra_files=extra_files,
                 overwrite=True, verbose=False)

        # Now overwrite the original book files with the upgraded ones
        print("Copying over upgraded files into original folder...")
        for path, _, ifiles in os.walk(path_book_new):
            new_path = path.replace(path_book_new, path_book)
            for ifile in ifiles:
                if not op.isdir(new_path):
                    os.makedirs(new_path)
                sh.copy(op.join(path, ifile), op.join(new_path, ifile))

        # Cleanup and Success message
        print("Removing the backup book...")
        sh.rmtree(path_book_new)

        print_message_box(("Finished upgrading your book at: {}\n\n"
                           "Your content, configuration, etc should not have changed, but all surrounding book\n"
                           "files should be upgraded. You should double-check that this is the case by running \n"
                           "a `git diff` on your book to see what has changed:\n"
                           "\n"
                           "   cd {}\n"
                           "   git diff\n"
                           "\n"
                           "Don't forget to commit these changes to git!".format(path_book, path_book)))
    except Exception as ex:
        print_message_box(("There was an error in upgrading your Jupyter Book!\n\n"
                           "Don't worry, your content, configuration, etc should not have changed. Any new book\n"
                           "content may by in {} if the upgrade got far enough\n"
                           "you can investigate this folder, or delete it if you'd like.\n\n"
                           "Here is the error:\n\n    {}".format(path_book_new, ex)))


def _remove_extra_files(path_out):
    """Remove some extra files we don't want in a created book."""
    # Remove some files/folders that may confuse users
    files_to_remove = ['Gemfile.lock']
    for ifile in files_to_remove:
        os.remove(op.join(path_out, ifile))
