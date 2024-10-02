from mystmd_py.main import main as myst_main

import os
import importlib.metadata
import sys

__version__ = "2.0.0a0"


def show_version():
    myst_version = importlib.metadata.version("mystmd")
    print(f"Jupyter Book: {__version__}")
    print(f"MyST: {myst_version}")


def main():
    os.environ["MYSTMD_READABLE_NAME"] = "Jupyter Book"
    os.environ["MYSTMD_BINARY_NAME"] = "jupyter-book"
    os.environ["MYSTMD_HOME_URL"] = "https://jupyterbook.org"

    if "-v" in sys.argv:
        show_version()
        sys.exit(0)

    myst_main()


if __name__ == "__main__":
    main()
