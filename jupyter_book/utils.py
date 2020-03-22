from pathlib import Path

SUPPORTED_FILE_SUFFIXES = [".ipynb", ".md", ".markdown", ".myst", ".Rmd", ".py"]


def _filename_to_title(filename, split_char="_"):
    """Convert a file path into a more readable title."""
    filename = Path(filename).with_suffix("").name
    filename_parts = filename.split(split_char)
    try:
        # If first part of the filename is a number for ordering, remove it
        int(filename_parts[0])
        if len(filename_parts) > 1:
            filename_parts = filename_parts[1:]
    except Exception:
        pass
    title = " ".join(ii.capitalize() for ii in filename_parts)
    return title
