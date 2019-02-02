from subprocess import run
import sys
import os
import os.path as op
import shutil as sh
from glob import glob
import argparse
import string
from .utils import print_color, print_message_box
TEMPLATE_PATH = op.join(op.dirname(__file__), 'book_template')
MINIMAL_PATH  = op.join(op.dirname(__file__), 'minimal')

def _final_message(path_out, notes):
    msg = ["",
           "Finished creating a new book at `{}`".format(path_out),
           ""
           "- Your content is in `{}` ".format(op.join(path_out, 'content')),
           "- A Table of Contents file is at `{}`.".format(op.join(path_out, '_data', 'toc.yml')),
           "  You should check its contents, make sure it references your content correctly, and ensure it has the correct order.",
           "- Your configuration file is at `{}`.".format(op.join(path_out, '_config.yml')),
           "  You should check its contents and double-check that the values are correct for your site.",
           ""]
    if len(notes) > 0:
        msg += ["", "Notes", "====="] + notes

    return '\n'.join(msg)

def _check_file_exists(path):
    if not op.exists(path):
        raise FileNotFoundError("Couldn't find file: {}".format(path))

def update_config(path_to_config, new_config):
    """Update a configuration yaml file using the values from a user-provided one."""
    from ruamel.yaml import YAML
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
            print("Not using config key with no corresponding template key: {}".format(ii))

    with open(path_to_config, 'w') as ff:
        yaml.dump(data, ff)

def new_book():
    """Create a new Jupyter Book."""
    parser = argparse.ArgumentParser(description="Create a new Jupyter Book")
    parser.add_argument("name", help="The name of your Jupyter Book (your book template will be placed in a folder of this name)")
    parser.add_argument("--out-folder", default='.', help="The location where your book will be placed")
    parser.add_argument("--license", default=None, help="A path to a LICENSE.md file if you have already created one")
    parser.add_argument("--content-folder", default=None, help="A path to a folder that holds your book content")
    parser.add_argument("--toc", default=None, help="A path to a yaml file that contains a Table of Contents for your Jupyter Book. This will overwrite parts of the book template's default toc.yml configuration")
    parser.add_argument("--config", default=None, help="A path to a configuration YAML file that contains configuration for your Jupyter Book. This will overwrite parts of the book template's default _config.yml configuration")
    parser.add_argument("--custom-css", default=None, help="A path to a CSS file that defines some custom CSS rules for your book")
    parser.add_argument("--custom-js", default=None, help="A path to a JS file that defines some custom CSS rules for your book")
    parser.add_argument("--extra-files", default=None, nargs="+", help="A list of extra files / folders to copy into your book's directory")
    parser.add_argument("--overwrite", default=False, action="store_true", help="Whether to overwrite a pre-existing book if it exists")
    parser.add_argument("--demo", default=False, action="store_true", help="Whether to build the book with demo content instead of your own content")
    args = parser.parse_args(sys.argv[2:])

    path_out = op.join(args.out_folder, args.name)
    notes = []

    # Check folder exists and overwrite if necessary
    if op.isdir(path_out):
        if args.overwrite:
            sh.rmtree(path_out)
    if op.isdir(path_out):
        raise ValueError("A book already exists with this name / output directory. Delete it, or use `--overwrite` if you'd like to replace it")

    # Copy the book structure to the new folder
    print("Copying new book to: {}".format(path_out))
    ignore_folders = ['_build', 'content']
    sh.copytree(TEMPLATE_PATH, path_out, ignore=sh.ignore_patterns('.git', *ignore_folders))

    # If the Demo argument is provided, copy over a couple demo files and stop
    if args.demo is True:
        print("Copying over demo repository content")
        sh.copytree(op.join(TEMPLATE_PATH, 'content'), op.join(path_out, 'content'))
        message = ["- You've chosen to copy over the demo Jupyter Book. This contains",
                   "  the content shown at https://jupyter.org/jupyter-book.\n"
                   "  Use it to get acquainted with the Jupyter-Book structure and build ",
                   "  system. When you're ready, try re-running `jupyter-book create` using ",
                   "  your own content!"]
        notes += message
        _final_message(path_out, notes)
        sys.exit()

    # Create empty folders for build files if they don't exist
    if not op.exists(op.join(path_out, '_build')):
        os.makedirs(op.join(path_out, '_build'))

    # Copy over content
    if args.content_folder is None:
        args.content_folder = op.join(MINIMAL_PATH, 'content')
        args.toc = op.join(MINIMAL_PATH, '_data', 'toc.yml')
        sh.rmtree(op.join(path_out, '_build'))
        notes.append("- You haven't provided any content (`--content`) so we've added a couple files to get you started.")

    _check_file_exists(args.content_folder)
    print("Copying over your content folder...")
    sh.copytree(args.content_folder, op.join(path_out, 'content'))

    # Copy over TOC file
    if args.toc is None:
        toc_preference = input("Would you like Jupyter Book to auto-generate a TOC from your content/ folder (you can review it later) [yes]/no: ")
        if toc_preference == '':
            toc_preference = 'yes'

        if toc_preference == "yes":
            toc_script = op.join(op.dirname(__file__), 'scripts', 'generate_toc.py')
            run(['python', toc_script, op.join(path_out, 'content'), '--out_path', op.join(path_out, '_data', 'toc.yml'), '--overwrite'], check=True)
            notes.append(("- We auto-generated a TOC file using folder names. You should check its\n"
                          "  contents and clean it up so that it has the structure you want!\n"))
        elif toc_preference == "no":
            notes.append(("- You chose to skip TOC generation. Your content files don't have a table of contents\n"
                          "  you must create one before you can build your book!\n"
                          "  An example toc.yml file is there to help guide you."))
        else:
            raise ValueError("You must respond yes or no, got response: {}".format(toc_preference))
    else:
        _check_file_exists(args.toc)
        print("Copying over your TOC file...\n")
        sh.copy2(args.toc, op.join(path_out, '_data', 'toc.yml'))

    # Configuration file
    if args.config is None:
        update_config(op.join(path_out, '_config.yml'), op.join(MINIMAL_PATH, '_config.yml'))
    else:
        update_config(op.join(path_out, '_config.yml'), args.config)

    # Custom CSS and JS
    if args.custom_css is not None:
        if not os.path.exists(args.custom_css):
            raise ValueError("Could not find custom CSS file: {}".format(args.custom_css))
        sh.copy2(args.custom_css, op.join(path_out, 'assets', 'custom', 'custom.css'))
    if args.custom_js is not None:
        if not os.path.exists(args.custom_js):
            raise ValueError("Could not find custom JS file: {}".format(args.custom_js))
        sh.copy2(args.custom_js, op.join(path_out, 'assets', 'custom', 'custom.js'))

    # Ask user to add a license if they wish
    if args.license is not None:
        if not os.path.exists(args.license):
            raise ValueError("Could not find license file: {}".format(args.license))
        sh.copy2(args.license, op.join(path_out, 'content', 'LICENSE.md'))
    else:
        notes.append(("- We've added a CC-BY-SA license for you in {}\n"
                      "  This is a reasonable license for most book content, though feel free\n"
                      "  to change it if you like!".format(op.join(path_out, 'content', 'LICENSE.md'))))
        sh.copy2(op.join(MINIMAL_PATH, 'LICENSE.md'), op.join(path_out, 'content', 'LICENSE.md'))

    # Copy over extra files / folders to the root of the content folder
    if isinstance(args.extra_files, (list, str)):
        if isinstance(args.extra_files, str):
            args.extra_files = [args.extra_files]
        print('Copying over extra files: {}'.format(args.extra_files))
        for ipath in args.extra_files:
            if op.isdir(ipath):
                # Walk the directory and copy individual files respecting directory structure
                for ifolder, _, ifiles in os.walk(ipath):
                    last_folder = ipath.rsplit(os.sep)[-1]
                    rel_to_last_folder = op.join(last_folder, ifolder.split(last_folder, 1)[-1].strip(os.sep))
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

    # Cleanup messages
    print_message_box(_final_message(path_out, notes))


def upgrade_book():
    """Upgrade a book to the latest Jupyter Book version."""
    parser = argparse.ArgumentParser(description="Upgrade a book to the latest Jupyter Book version.")
    parser.add_argument("path_book", help="Path to the root of the book repository you'd like to upgrade.")
    args = parser.parse_args(sys.argv[2:])
    path_book = args.path_book.rstrip('/')
    path_book_new = path_book + '_UPGRADED'
    if not op.exists(op.join(path_book, '_config.yml')):
        raise ValueError("This does not appear to be a valid Jupyter Book. Searched in location: {}".format(path_book))

    # Now create a new book from the old one
    run(['jupyter-book', 'create', path_book_new,
        '--toc', op.join(path_book, '_data', 'toc.yml'),
        '--content-folder', op.join(path_book, 'content'),
        '--config', op.join(path_book, '_config.yml'),
        '--license', op.join(path_book, 'content', 'LICENSE.md'),
        '--custom-css', op.join(path_book, 'assets', 'custom', 'custom.css'),
        '--custom-js', op.join(path_book, 'assets', 'custom', 'custom.js'),
        '--overwrite'],
        check=True)

    # Now overwrite the original book files with the upgraded ones
    print("Copying over upgraded files")
    for path, _, ifiles in os.walk(path_book_new):
        new_path = path.replace(path_book_new, path_book)
        for ifile in ifiles:
            if not op.isdir(new_path):
                os.makedirs(new_path)
            sh.copy(op.join(path, ifile), op.join(new_path, ifile))


    # Cleanup and Success message
    print("Removing the upgraded book")
    sh.rmtree(path_book_new)
    print_message_box(("Finished creating an upgraded your book.\n\n"
                       "The upgraded book can be found at {}.\n\n"
                       "Make sure to review and commit the changes to git!".format(path_book_new, path_book_new, path_book)))