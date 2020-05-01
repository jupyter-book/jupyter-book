"""A small sphinx extension to let you configure a site with YAML metadata."""
from pathlib import Path
from yaml import safe_load


# Transform a "Jupyter Book" YAML configuration file into a Sphinx configuration file.
# This is so that we can choose more user-friendly words for things than Sphinx uses.
# e.g., 'logo' instead of 'html_logo'.
# Note that this should only be used for **top level** keys.
PATH_YAML_DEFAULT = Path(__file__).parent.joinpath("default_config.yml")


def add_yaml_config(app, config):
    """Load all of the key/vals in a config file into the Sphinx config"""
    # First load the default YAML config
    yaml_config = safe_load(PATH_YAML_DEFAULT.read_text())

    # Update the default config with a provided one, if it exists
    path_yaml = app.config["yaml_config_path"]
    if len(path_yaml) > 0:
        path_yaml = Path(path_yaml)
        if not path_yaml.exists():
            raise ValueError(
                f"Path to a _config.yml file was given, but not found: {path_yaml}"
            )

        # Load the YAML and update its values to translate it into Sphinx keys
        yaml_update = safe_load(path_yaml.read_text())
        for key, val in yaml_update.items():
            # If it's a dictionary, we should just updated the newly-given values
            if isinstance(yaml_config.get(key), dict):
                yaml_config[key].update(val)
            else:
                yaml_config[key] = val

    # Now update our Sphinx build configuration
    new_config = yaml_to_sphinx(yaml_config, config)
    for key, val in new_config.items():
        config[key] = val


def yaml_to_sphinx(yaml, config):
    """Convert a Jupyter Book style config structure into a Sphinx docs structure."""
    sphinx_config = {
        "html_theme_options": {},
        "exclude_patterns": [
            "_build",
            "Thumbs.db",
            ".DS_Store",
            "**.ipynb_checkpoints",
        ],
    }

    # Theme configuration updates
    theme_options = sphinx_config.get("html_theme_options", {})

    # Launch button configuration
    theme_launch_buttons_config = theme_options.get("launch_buttons", {})
    launch_buttons_config = yaml.get("launch_buttons", {})
    repository_config = yaml.get("repository", {})

    theme_launch_buttons_config.update(launch_buttons_config)
    theme_options["launch_buttons"] = theme_launch_buttons_config

    theme_options["path_to_docs"] = repository_config.get("path_to_book")
    theme_options["repository_url"] = repository_config.get("url")
    theme_options["repository_branch"] = repository_config.get("branch")

    # HTML
    html = yaml.get("html")
    if html:
        sphinx_config["html_favicon"] = html.get("favicon")
        sphinx_config["html_baseurl"] = html.get("baseurl")

        theme_options["google_analytics_id"] = html.get("google_analytics_id")
        theme_options["navbar_footer_text"] = html.get("navbar_footer_text")
        theme_options["number_toc_sections"] = html.get("navbar_number_sections")
        theme_options["home_page_in_toc"] = html.get("home_page_in_navbar")

        if html.get("use_edit_page_button"):
            for key in ["url", "branch"]:
                if not repository_config.get(key):
                    raise ValueError(
                        f"To use 'edit page' buttons, add repository key: {key}"
                    )
            theme_options["use_edit_page_button"] = html.get("use_edit_page_button")

    execute = yaml.get("execute")
    if execute:
        sphinx_config["jupyter_execute_notebooks"] = execute.get("execute_notebooks")
        sphinx_config["jupyter_cache"] = execute.get("cache")
        sphinx_config["execution_excludepatterns"] = execute.get("exclude_patterns")

    # Update the theme options in the main config
    sphinx_config["html_theme_options"] = theme_options

    # LaTeX
    latex = yaml.get("latex")
    if latex:
        sphinx_config["latex_engine"] = latex.get("latex_engine")

    # Files that we wish to skip
    sphinx_config["exclude_patterns"].extend(yaml.get("exclude_patterns", []))

    # Now do simple top-level translations
    YAML_TRANSLATIONS = {
        "logo": "html_logo",
        "title": "html_title",
        "execute_notebooks": "jupyter_execute_notebooks",
        "copyright": "copyright",
    }
    for key, newkey in YAML_TRANSLATIONS.items():
        if key in yaml:
            sphinx_config[newkey] = yaml.pop(key)

    # Manual Sphinx over-rides will supercede other config
    sphinx_overrides = yaml.get("sphinx", {}).get("config")
    if sphinx_overrides:
        sphinx_config.update(sphinx_overrides)
    return sphinx_config
