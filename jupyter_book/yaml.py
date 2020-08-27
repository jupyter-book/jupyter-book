"""A small sphinx extension to let you configure a site with YAML metadata."""
from pathlib import Path
from functools import lru_cache
import json
import jsonschema

from .utils import _message_box


# Transform a "Jupyter Book" YAML configuration file into a Sphinx configuration file.
# This is so that we can choose more user-friendly words for things than Sphinx uses.
# e.g., 'logo' instead of 'html_logo'.
# Note that this should only be used for **top level** keys.
PATH_YAML_DEFAULT = Path(__file__).parent.joinpath("default_config.yml")
PATH_JSON_SCHEMA = Path(__file__).parent.joinpath("config_schema.json")


@lru_cache(1)
def get_validator():
    schema = json.loads(PATH_JSON_SCHEMA.read_text("utf8"))
    validator_cls = jsonschema.validators.validator_for(schema)
    validator_cls.check_schema(schema)
    return validator_cls(schema=schema)


def validate_yaml(yaml: dict, raise_on_errors=False, print_func=print):
    """Validate the YAML configuration against a JSON schema."""
    errors = sorted(get_validator().iter_errors(yaml), key=lambda e: e.path)
    error_msg = "\n".join(
        [
            "- {} [key path: '{}']".format(
                error.message, "/".join([str(p) for p in error.path])
            )
            for error in errors
        ]
    )
    if not errors:
        return
    if raise_on_errors:
        raise jsonschema.ValidationError(error_msg)
    return _message_box(
        f"Warning: Validation errors in config:\n{error_msg}",
        color="orange",
        print_func=print_func,
    )


def yaml_to_sphinx(yaml: dict):
    """Convert a Jupyter Book style config structure into a Sphinx config dict."""
    sphinx_config = {
        "exclude_patterns": [
            "_build",
            "Thumbs.db",
            ".DS_Store",
            "**.ipynb_checkpoints",
        ],
    }

    # Start with an empty options block
    theme_options = {}

    # Launch button configuration
    launch_buttons_config = yaml.get("launch_buttons", {})
    repository_config = yaml.get("repository", {})

    theme_options["launch_buttons"] = launch_buttons_config

    theme_options["path_to_docs"] = repository_config.get("path_to_book", "")
    theme_options["repository_url"] = repository_config.get("url", "")
    theme_options["repository_branch"] = repository_config.get("branch", "")

    # HTML
    html = yaml.get("html")
    if html:
        sphinx_config["html_favicon"] = html.get("favicon", "")
        sphinx_config["html_baseurl"] = html.get("baseurl", "")

        theme_options["google_analytics_id"] = html.get("google_analytics_id", "")
        # Deprecate navbar_footer_text after a release cycle
        theme_options["navbar_footer_text"] = html.get("navbar_footer_text", "")
        theme_options["extra_navbar"] = html.get("extra_navbar", "")
        theme_options["extra_footer"] = html.get("extra_footer", "")
        theme_options["home_page_in_toc"] = html.get("home_page_in_navbar")

        # Comments config
        sphinx_config["comments_config"] = html.get("comments", {})

        # Pass through the buttons
        btns = ["use_repository_button", "use_edit_page_button", "use_issues_button"]
        use_buttons = {btn: html.get(btn) for btn in btns if html.get(btn) is not None}
        if any(use_buttons.values()):
            if not repository_config.get("url"):
                raise ValueError(
                    "To use 'repository' buttons, you must specify the repository URL"
                )
        # Update our config
        theme_options.update(use_buttons)

    # Update the theme options in the main config
    sphinx_config["html_theme_options"] = theme_options

    # parse and rendering
    parse = yaml.get("parse")
    if parse:
        if parse.get("myst_extended_syntax") is True:
            sphinx_config["myst_dmath_enable"] = True
            sphinx_config["myst_amsmath_enable"] = True
            sphinx_config["myst_deflist_enable"] = True
            sphinx_config["myst_admonition_enable"] = True
            sphinx_config["myst_html_img_enable"] = True
        if parse.get("myst_url_schemes"):
            sphinx_config["myst_url_schemes"] = parse.get("myst_url_schemes")
        if parse.get("stderr_outputs"):
            sphinx_config["nb_output_stderr"] = parse.get("stderr_outputs")

    execute = yaml.get("execute")
    if execute:
        if execute.get("execute_notebooks") is False:
            # Special case because YAML treats `off` as "False".
            execute["execute_notebooks"] = "off"
        sphinx_config["jupyter_execute_notebooks"] = execute.get(
            "execute_notebooks", "auto"
        )
        sphinx_config["execution_timeout"] = execute.get("timeout", 30)
        sphinx_config["jupyter_cache"] = execute.get("cache", "")
        _recursive_update(
            sphinx_config,
            {"execution_excludepatterns": execute.get("exclude_patterns", [])},
        )
        sphinx_config["execution_allow_errors"] = execute.get("allow_errors", False)
        sphinx_config["execution_in_temp"] = execute.get("run_in_temp", False)
        sphinx_config["nb_output_stderr"] = execute.get("stderr_output", "show")

    # LaTeX
    latex = yaml.get("latex")
    if latex:
        sphinx_config["latex_engine"] = latex.get("latex_engine", "pdflatex")

    # Extra extensions
    extra_extensions = yaml.get("sphinx", {}).get("extra_extensions")
    if extra_extensions:
        if not isinstance(extra_extensions, list):
            extra_extensions = [extra_extensions]
        extensions = sphinx_config.get("extensions", [])
        for extra in extra_extensions:
            extensions.append(extra)
        sphinx_config["extensions"] = extensions

    # Files that we wish to skip
    sphinx_config["exclude_patterns"].extend(yaml.get("exclude_patterns", []))

    # Now do simple top-level translations
    YAML_TRANSLATIONS = {
        "logo": "html_logo",
        "title": "html_title",
        "execute_notebooks": "jupyter_execute_notebooks",
        "project": "project",
        "author": "author",
        "copyright": "copyright",
    }
    for key, newkey in YAML_TRANSLATIONS.items():
        if key in yaml:
            val = yaml.get(key)
            if val is None:
                val = ""
            sphinx_config[newkey] = val
    return sphinx_config


def _recursive_update(config, update):
    """Update the dict `config` with `update` recursively.
    This *updates* nested dicts / lists instead of replacing them.
    """
    for key, val in update.items():
        if isinstance(config.get(key), dict):
            config[key].update(val)
        elif isinstance(config.get(key), list):
            if isinstance(val, list):
                config[key].extend(val)
            else:
                config[key] = val
        else:
            config[key] = val
