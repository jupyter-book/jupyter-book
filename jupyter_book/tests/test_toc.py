"""Test that the table of contents generator works."""

from jupyter_book.toc import build_toc
import os.path as op
from subprocess import run, PIPE

this_folder = op.dirname(__file__)
path_root = op.join(this_folder, "site")
path_content = op.join(path_root, "content")


def test_toc():
    yaml = build_toc(path_content)
    proc = run(f'jupyter-book toc {path_root}'.split(), stdout=PIPE)
    yaml_cl = proc.stdout.decode()

    for iyaml in [yaml, yaml_cl]:
        # License file is skipped
        assert "LICENSE.md" not in yaml

        # Links to nested folder work
        assert "tests/features" in yaml

        # Make sure the extensions are removed
        assert ".ipynb" not in yaml
        assert ".md" not in yaml
