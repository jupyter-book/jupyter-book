import os
import pathlib
import platform
import subprocess
import sys
import textwrap

from .nodeenv import (
    find_valid_node,
    PermissionDeniedError,
    NodeEnvCreationError,
    NodeVersionError,
)

__version__ = "2.1.0"

NODEENV_VERSION = "22.17.0"


def test_node_version(triple_version):
    major_version = triple_version[0]
    if not (major_version in {18, 20, 22} or major_version > 22):
        raise NodeVersionError(
            f"Jupyter Book requires node 18, 20, or 22+; you are running node {major_version}.\n\n"
            "Please update to the latest LTS release, using your preferred package manager\n"
            "or following instructions here: https://nodejs.org/en/download"
        )


def main():
    # Find NodeJS (and potential new PATH)
    binary_path = os.environ.get("PATH", os.defpath)
    try:
        node_path, os_path = find_valid_node(
            binary_path, test_version=test_node_version, nodeenv_version=NODEENV_VERSION
        )
    except NodeEnvCreationError as err:
        message = textwrap.indent(err.args[0], "    ")
        raise SystemExit(
            "💥 The attempt to install Node.js was unsuccessful.\n"
            f"🔍 Underlying error:\n{message}\n\n"
            "ℹ️  We recommend installing the latest LTS release, using your preferred package manager "
            "or following instructions here: https://nodejs.org\n\n"
        ) from err
    except PermissionDeniedError as err:
        raise SystemExit(
            "💥 The attempt to install Node.js failed because the user denied the request.\n"
            "ℹ️  We recommend installing the latest LTS release, using your preferred package manager "
            "or following instructions here: https://nodejs.org\n\n"
        ) from err

    # Build new env dict
    node_env = {**os.environ, "PATH": os_path}

    # Find path to compiled JS
    js_path = (pathlib.Path(__file__).parent / "dist" / "jupyter-book.cjs").resolve()

    # Build args for Node.js process
    jb_node_args = [js_path, *sys.argv[1:]]

    jb_env = {**node_env, "MYST_LANG": "PYTHON"}

    # Invoke appropriate binary for platform
    if platform.system() == "Windows":
        result = subprocess.run([node_path, *jb_node_args], env=jb_env)
        sys.exit(result.returncode)
    else:
        os.execve(
            node_path,
            [node_path.name, *jb_node_args],
            jb_env,
        )


if __name__ == "__main__":
    main()
