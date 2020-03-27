"""A small sphinx extension to let you configure a site with YAML metadata."""
from pathlib import Path
from yaml import safe_load


# Transform a "Jupyter Book" YAML configuration file into a Sphinx configuration file.
# This is so that we can choose more user-friendly words for things than Sphinx uses.
# e.g., 'logo' instead of 'html_logo'.
# Note that this should only be used for **top level** keys.
PATH_YAML_DEFAULT = Path(__file__).parent.joinpath("default_config.yml")


def add_yaml_config(app):
    """Load all of the key/vals in a config file into the HTML page context"""
    path_yaml = app.config["yaml_config_path"]

    # If no path is given we'll just skip
    if len(path_yaml) == 0:
        return

    path_yaml = Path(path_yaml)
    if not path_yaml.exists():
        raise ValueError(
            f"Path to a YAML configuration file was given, but not found: {path_yaml}"
        )

    # First load the default YAML config
    yaml_config = safe_load(PATH_YAML_DEFAULT.read_text())

    # Load the YAML and update its values to translate it into Sphinx keys
    yaml_update = safe_load(path_yaml.read_text())
    yaml_config.update(yaml_update)

    # Now update our Sphinx build configuration
    config = yaml_to_sphinx(yaml_config)
    for key, val in config.items():
        app.config[key] = val


def yaml_to_sphinx(yaml):
    """Convert a Jupyter Book style config structure into a Sphinx docs structure."""
    out = {
        "html_theme_options": {},
        "exclude_patterns": [
            "_build",
            "Thumbs.db",
            ".DS_Store",
            "**.ipynb_checkpoints",
        ],
    }
    binder = yaml.get("binder")
    if binder:
        binder_config = {}
        binder_config["use_binder_button"] = True
        binder_config["binderhub_url"] = binder.get("binderhub_url")
        binder_config["path_to_docs"] = yaml.get("repository", {}).get("path_to_book")
        binder_config["repository_url"] = yaml.get("repository", {}).get("url")
        out["html_theme_options"]["binder_config"] = binder_config

    html = yaml.get("html")
    if html:
        out["html_favicon"] = html.get("favicon")
        out["html_theme_options"]["sidebar_footer_text"] = html.get(
            "sidebar_footer_text"
        )
        out["google_analytics_id"] = html.get("google_analytics_id")

    # Files that we wish to skip
    out["exclude_patterns"].extend(yaml.get("exclude_patterns", []))

    # Now do simple top-level translations
    YAML_TRANSLATIONS = {"logo": "html_logo", "title": "project"}
    for key, newkey in YAML_TRANSLATIONS.items():
        if key in yaml:
            out[newkey] = yaml.pop(key)
    return out
