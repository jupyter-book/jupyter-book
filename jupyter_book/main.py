from subprocess import run
import sys
import os
import os.path as op
import shutil as sh
from glob import glob
import argparse
import string

DESCRIPTION = ("Jupyter Book: Generate an HTML book from your Jupyter Notebooks using Jekyll.")
parser = argparse.ArgumentParser(description=DESCRIPTION)
parser.add_argument("command", help="The command you'd like to run. Currently, this must be 'create'")

TEMPLATE_PATH = op.join(op.dirname(__file__), '..', 'book_template')

def _print_color(msg, style):
    endc = '\033[0m'
    bcolors = dict(blue='\033[94m',
                   green='\033[92m',
                   orange='\033[93m',
                   red='\033[91m',
                   bold = '\033[1m',
                   underline = '\033[4m')
    print(bcolors[style] + msg + endc)

def _check_file_exists(path):
    if not op.exists(path):
        raise FileNotFoundError("Couldn't find file: {}".format(path))

def update_config(path_to_config, new_config):
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
    parser = argparse.ArgumentParser(description="Create a new Jupyter Book")
    parser.add_argument("name", help="The name of your Jupyter Book (your book template will be placed in a folder of this name)")
    parser.add_argument("--out-folder", default='.', help="The location where your book will be placed")
    parser.add_argument("--license", default=None, help="A path to a LICENSE.md file if you have already created one")
    parser.add_argument("--content-folder", default=None, help="A path to a folder that holds your book content")
    parser.add_argument("--toc", default=None, help="A path to a yaml file that contains a Table of Contents for your Jupyter Book. This will overwrite parts of the book template's default toc.yml configuration")
    parser.add_argument("--config", default=None, help="A path to a configuration YAML file that contains configuration for your Jupyter Book. This will overwrite parts of the book template's default _config.yml configuration")
    parser.add_argument("--custom-css", default=None, help="A path to a CSS file that defines some custom CSS rules for your book")
    parser.add_argument("--custom-js", default=None, help="A path to a JS file that defines some custom CSS rules for your book")
    parser.add_argument("--overwrite", default=False, action="store_true", help="Whether to overwrite a pre-existing book if it exists")
    args = parser.parse_args(sys.argv[2:])


    path_out = op.join(args.out_folder, args.name)

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

    # Create empty folders for content and build files if they don't exist
    for ifolder in ignore_folders:
        if not op.exists(ifolder):
            os.makedirs(op.join(path_out, ifolder))

    # Copy over content
    if args.content_folder is None:
        args.content_folder = input("Enter a path to a folder where you've got content [./content]: ")
        if args.content_folder == '':
            args.content_folder = './content'
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
            print("Finished auto-generating TOC file using folder names. You should check its contents and clean it up so that it has the structure you want!\n")
        elif toc_preference == "no":
            _print_color("Skipping TOC generation: your content files don't have a table of contents, you must create one before you can build your book!\nAn example toc.yml file is there to help guide you.", 'red')
        else:
            raise ValueError("You must respond yes or no, got response: {}".format(toc_preference))
    else:
        _check_file_exists(args.toc)
        print("Copying over your TOC file...\n")
        sh.copy2(args.toc, op.join(path_out, '_data', 'toc.yml'))

    # Ask user to add a license if they wish
    if args.license is not None:
        if not os.path.exists(args.license):
            raise ValueError("Could not find license file: {}".format(args.license))
        sh.copy2(args.license, op.join(path_out, 'content', 'LICENSE.md'))

    if args.config is not None:
        update_config(op.join(path_out, '_config.yml'), args.config)
    print("Your configuration file is at {}\nYour should check its contents to make sure they look correct to you!\n".format(op.join(path_out, '_config.yaml')))

    # Now run the license check
    license_script = op.join(op.dirname(__file__), 'scripts', 'license.py')
    run(['python', license_script, '--path', op.join(path_out, 'content')], check=True)

    # Cleanup messages
    messages = ["=========",
                "Finished creating a new book at {}".format(path_out),
                "* Your content is in `{}` ".format(op.join(path_out, 'content')),
                "* A Table of Contents file is at `{}`.".format(op.join(path_out, '_data', 'toc.yml')),
                "  You should check its contents, make sure it references your content correctly, and ensure it has the correct order.",
                "* Your configuration file is at `{}`.".format(op.join(path_out, '_config.yml')),
                "  You should check its contents and double-check that the values are correct for your site.",
                "========="]
    _print_color(messages[0], 'green')
    print('\n'.join(messages[1:-1]))
    _print_color(messages[-1], 'green')

def main():
    commands = {'create': new_book}
    args = parser.parse_args(sys.argv[1:2])
    if args.command not in commands:
        parser.print_help()
        raise ValueError('Unrecognized command: {}\n See the help above for usage information'.format(args.command))
    commands[args.command]()

if __name__ == "__main__":
    main()
