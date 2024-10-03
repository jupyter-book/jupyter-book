import os
import pathlib
import platform
import shutil
import subprocess
import sys


INSTALL_NODEENV_KEY = "JB_ALLOW_NODEENV"


class PermissionDeniedError(Exception): ...


class NodeEnvCreationError(Exception): ...


def is_windows():
    return platform.system() == "Windows"


def find_installed_node():
    # shutil.which can find things with PATHEXT, but 3.12.0 breaks this by preferring NODE over NODE.EXE on Windows
    return shutil.which("node.exe") if is_windows() else shutil.which("node")


def find_nodeenv_path(version: str):
    # The conda packaging of this package does not need to install node!
    import platformdirs

    return platformdirs.user_data_path(
        appname="jupyter-book", appauthor=False, version=version
    )


def ask_to_install_node(path):
    if env_value := os.environ.get(INSTALL_NODEENV_KEY, "").lower():
        return env_value in {"yes", "true", "1", "y"}

    return input(f"❔ Install Node.js in '{path}'? (y/N): ").lower() == "y"


def create_nodeenv(env_path, version):
    command = [
        sys.executable,
        "-m",
        "nodeenv",
        "-v",
        f"--node={version}",
        "--prebuilt",
        "--clean-src",
        env_path,
    ]
    result = subprocess.run(command, capture_output=True, encoding="utf-8")
    if result.returncode:
        shutil.rmtree(env_path)
        raise NodeEnvCreationError(result.stderr)
    else:
        return env_path


def find_any_node(binary_path, nodeenv_version):
    node_path = find_installed_node()
    if node_path is not None:
        return pathlib.Path(node_path).absolute(), binary_path

    nodeenv_path = find_nodeenv_path(nodeenv_version)
    if not nodeenv_path.exists():
        print(
            "❗ Node.js (node) is required to run Jupyter Book, but could not be found`."
        )
        if ask_to_install_node(nodeenv_path):
            print(f"⚙️  Attempting to install Node.js in {nodeenv_path} ...")
            create_nodeenv(nodeenv_path, nodeenv_version)
            print(f"ℹ️  Successfully installed Node.js {nodeenv_version}")
        else:
            raise PermissionDeniedError("Node.js installation was not permitted")

    # Find the executable path
    new_node_path = (
        (nodeenv_path / "Scripts" / "node.exe")
        if is_windows()
        else (nodeenv_path / "bin" / "node")
    )
    new_path = os.pathsep.join(
        [*binary_path.split(os.pathsep), str(new_node_path.parent)]
    )
    return new_node_path, new_path
