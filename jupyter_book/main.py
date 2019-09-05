import sys
import argparse

from .commands import build, create, upgrade, version, page, toc, run

DESCRIPTION = (
    "Jupyter Book: Generate an HTML book from your Jupyter Notebooks using"
    " Jekyll. Type `jupyter-book <command> -h` for help.")
commands = {'create': create,
            'build': build,
            'page': page,
            'upgrade': upgrade,
            'run': run,
            'toc': toc,
            'version': version}
parser = argparse.ArgumentParser(description=DESCRIPTION)
parser.add_argument("command", help="The command you'd like to run. Allowed commands: {}".format(
    list(commands.keys())))


def main():
    args = parser.parse_args(sys.argv[1:2])
    if args.command not in commands:
        parser.print_help()
        raise ValueError(
            'Unrecognized command: {}\n See the help above for usage information'.format(args.command))

    # Run the command
    commands[args.command]()


if __name__ == "__main__":
    main()
