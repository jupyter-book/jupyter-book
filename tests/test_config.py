import pytest

import jsonschema
from jupyter_book.config import get_final_config, validate_yaml
from jupyter_book.commands import sphinx

from pathlib import Path
@pytest.mark.parametrize(
    "user_config",
    [
        {"title":"alex","only_build_toc_files": True, 'exclude_patterns': ['_build/**/*']},
        
    ],
    ids=[
        "toc",

    ],
)
def test_get_final_config(user_config, data_regression):
    cli_config = {"latex_individualpages": False}
    import os
    os.chdir('/Users/alexremedios/git/volkamerlab/TeachOpenCADD')
    final_config, metadata = get_final_config(
        Path('_toc.yml'),
        user_config, cli_config, validate=True, raise_on_invalid=True
    )
    data_regression.check(
        {"_user_config": user_config, "final": final_config, "metadata": metadata}
    )


def test_validate_yaml():
    with pytest.raises(jsonschema.ValidationError):
        validate_yaml({"title": 1}, raise_on_errors=True)
    assert "Warning" in validate_yaml({"title": 1}, raise_on_errors=False)
    assert validate_yaml({"title": ""}, raise_on_errors=False) is None


def test_config_sphinx_command(cli, temp_with_override, file_regression):
    temp_with_override.joinpath("_config.yml").write_text(
        "title: test\n", encoding="utf8"
    )
    temp_with_override.joinpath("_toc.yml").write_text("\n", encoding="utf8")
    result = cli.invoke(sphinx, temp_with_override.as_posix())
    assert result.exit_code == 0, result.exception
    # remove global_toc which is path dependent
    output = "\n".join(
        line
        for line in result.output.splitlines()
        if not line.startswith("globaltoc_path")
    )
    file_regression.check(output, encoding="utf8")
