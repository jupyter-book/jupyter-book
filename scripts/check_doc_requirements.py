#!/usr/bin/env python3
import sys
from pathlib import Path

import tomli


def check_reqs(pyproject_path="pyproject.toml", req_path=".binder/requirements.txt"):
    with open(pyproject_path, "rb") as f:
        toml_dict = tomli.load(f)

    optional_deps = toml_dict["project"]["optional-dependencies"]
    sphinx_content = "\n".join(optional_deps["sphinx"]).strip()
    sphinx_content = "# Copied from 'sphinx' extra of pyproject.toml\n" + sphinx_content
    req_content = Path(req_path).read_text()
    if sphinx_content != req_content.strip():
        Path(req_path).write_text(sphinx_content + "\n")
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    check_reqs()
