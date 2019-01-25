"""Test the license creation code"""

import os
import os.path as op
import subprocess
import shutil as sh
import pytest

this_folder = op.dirname(op.abspath(__file__))
path_license_py = op.join(this_folder, "..", "scripts", "license.py")
def test_license():
    # Not yes/no answers should error
    if op.exists(op.join(this_folder, "site", "content", "LICENSE.md")):
        os.remove(op.join(this_folder, "site", "content", "LICENSE.md"))

    cmd_error = ["python", path_license_py, "--path", op.join(this_folder, "site", "content"), "--use-license", "blah"]

    out = subprocess.call(cmd_error)
    assert out == 1

    # Answering "yes" should add the CC-BY-SA license
    cmd_yes = ["python", path_license_py, "--path", op.join(this_folder, "site", "content"), "--use-license", "yes"]
    out = subprocess.call(cmd_yes)

    path_license = op.join(this_folder, 'site', 'content', 'LICENSE.md')
    with open(path_license, 'r') as ff:
        license_text = ff.read()
    assert "Creative Commons Attribution-ShareAlike 4.0 International" in license_text
    os.remove(path_license)

    # Answering "no" should add an empty license"
    cmd_no = ["python", path_license_py, "--path", op.join(this_folder, "site", "content"), "--use-license", "no"]
    out = subprocess.call(cmd_no)
    with open(path_license, 'r') as ff:
        license_text = ff.read()
    assert len(license_text) == 0
