from pathlib import Path
from subprocess import run, PIPE
import pytest
from jupyter_book.utils import init_myst_file


def test_myst_init(tmpdir):
    """Test adding myst metadata to text files."""
    path = Path(tmpdir).joinpath("tmp.md").absolute()
    text = "TEST"
    with open(path, "w") as ff:
        ff.write(text)
    init_myst_file(path, kernel="python3")

    # Make sure it runs properly. Default kernel should be python3
    new_text = path.read_text()
    assert "format_name: myst" in new_text
    assert "TEST" == new_text.strip().split("\n")[-1]
    assert "name: python3" in new_text

    # Make sure the CLI works too
    run(f"jb myst init {path} --kernel python3".split(), check=True, stdout=PIPE)

    # Non-existent kernel
    with pytest.raises(Exception) as err:
        init_myst_file(path, kernel="blah")
    assert "Did not find kernel: blah" in str(err)

    # Missing file
    with pytest.raises(Exception) as err:
        init_myst_file(path.joinpath("MISSING"), kernel="python3")
    assert "Markdown file not found:" in str(err)
