#!/usr/bin/env python3
import sys
from configparser import ConfigParser
from pathlib import Path


def check_reqs(setup_path="setup.cfg", req_path="docs/requirements.txt"):
    parser = ConfigParser()
    parser.read(setup_path)
    setup_content = parser["options.extras_require"]["sphinx"]
    setup_content = (
        "# Copied from 'sphinx' extra of setup.cfg\n" + setup_content.strip()
    )
    req_content = Path(req_path).read_text()
    if setup_content != req_content.strip():
        Path(req_path).write_text(setup_content + "\n")
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    check_reqs()
