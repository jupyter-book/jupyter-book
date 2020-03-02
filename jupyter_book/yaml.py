"""A small sphinx extension to let you configure a site with YAML metadata."""
from pathlib import Path
from yaml import safe_load


def add_yaml_config(app):
    """Load all of the key/vals in a config file into the HTML page context"""
    path_yaml = app.config["yaml_config_path"]

    # If no path is given we'll just skip
    if len(path_yaml) == 0:
        return

    path_yaml = Path(path_yaml)
    if not path_yaml.exists():
        raise ValueError(f"Path to a YAML configuration file was given, but not found: {path_yaml}")

    # Load the YAML and update our site's configuration
    if not path_yaml.exists():
        raise ValueError(f"Could not find YAML configuration file at path {path_yaml}")
    yaml_config = safe_load(path_yaml.read_text())
    for key, val in yaml_config.items():
        app.config[key] = val
