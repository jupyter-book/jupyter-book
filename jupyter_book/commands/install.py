import sys
import argparse
from pathlib import Path
from subprocess import run
from ..utils import print_message_box


def install():
    parser = argparse.ArgumentParser(
        description="Install the necessary dependencies to build a Jupyter Book."
    )
    parser.add_argument(
        "path_book",
        help="Path to the root of the book "
        "repository for which you're installing depdendencies.",
    )

    args = parser.parse_args(sys.argv[2:])
    path_book = Path(args.path_book)

    def myrun(cmd, verbose=True):
        if verbose:
            print("Running: " + cmd)
        run(cmd.split(), cwd=path_book, check=True)

    # Check to see whether bundler is already installed. If not, install it.
    try:
        myrun("bundler -v", False)
    except Exception:
        myrun("gem install bundler")

    # Now install with bundle
    try:
        myrun("bundle install")
    except Exception:
        # Try installing nokogiri first because it's a PITA on some machines
        myrun("bundle config --global build.nokogiri --use-system-libraries")
        myrun("bundle install")

    print_message_box("Finished installing dependencies...")
