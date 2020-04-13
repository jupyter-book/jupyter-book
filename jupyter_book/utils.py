from pathlib import Path
from textwrap import dedent

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


##############################################################################
# CLI utilities

border = "=" * 79
endc = "\033[0m"
bcolors = dict(
    blue="\033[94m",
    green="\033[92m",
    orange="\033[93m",
    red="\033[91m",
    bold="\033[1m",
    underline="\033[4m",
)


def _color_message(msg, style):
    return bcolors[style] + msg + endc


def _message_box(msg, color="green", doprint=True):
    # Prepare the message so the indentation is the same as the box
    msg = dedent(msg)

    # Color and create the box
    border_colored = _color_message(border, color)
    box = """
    {border_colored}

    {msg}

    {border_colored}
    """
    box = dedent(box).format(msg=msg, border_colored=border_colored)
    if doprint is True:
        print(box)
    return box


def _error(msg):
    box = _message_box(msg, color="red")
    raise ValueError(box)
