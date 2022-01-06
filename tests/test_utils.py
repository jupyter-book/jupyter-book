import pytest
from click.testing import CliRunner

from jupyter_book.cli.main import init as myst_init
from jupyter_book.utils import init_myst_file


def test_myst_init(cli: CliRunner, temp_with_override):
    """Test adding myst metadata to text files."""
    path = temp_with_override.joinpath("tmp.md").absolute()
    text = "TEST"
    with open(path, "w") as ff:
        ff.write(text)

    init_myst_file(path, kernel="python3")

    # Make sure it runs properly. Default kernel should be python3
    new_text = path.read_text(encoding="utf8")
    assert "format_name: myst" in new_text
    assert "TEST" == new_text.strip().split("\n")[-1]
    assert "name: python3" in new_text

    # Make sure the CLI works too
    with pytest.warns(None) as records:
        result = cli.invoke(myst_init, f"{path} --kernel python3".split())
    # old versions of jupytext give: UserWarning: myst-parse failed unexpectedly
    assert len(records) == 0, records
    assert result.exit_code == 0

    # Non-existent kernel
    with pytest.raises(Exception) as err:
        init_myst_file(path, kernel="blah")
    assert "Did not find kernel: blah" in str(err)

    # Missing file
    with pytest.raises(Exception) as err:
        init_myst_file(path.joinpath("MISSING"), kernel="python3")
    assert "Markdown file not found:" in str(err)
