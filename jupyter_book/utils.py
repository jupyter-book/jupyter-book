from pathlib import Path
from textwrap import dedent
from jupyter_client.kernelspec import find_kernel_specs

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


def _error(msg, kind=None):
    if kind is None:
        kind = ValueError
    box = _message_box(msg, color="red", doprint=False)
    raise kind(box)


##############################################################################
# MyST + Jupytext


def init_myst_file(path, kernel, verbose=True):
    """Initialize a file with a Jupytext header that marks it as MyST markdown.

    Parameters
    ----------
    path : string
        A path to a markdown file to be initialized for Jupytext
    kernel : string
        A kernel name to add to the markdown file. See a list of kernel names with
        `jupyter kernelspec list`.
    """
    try:
        from jupytext.cli import jupytext
    except ImportError:
        raise ImportError(
            "In order to use myst markdown features, " "please install jupytext first."
        )
    if not Path(path).exists():
        raise FileNotFoundError(f"Markdown file not found: {path}")

    kernels = list(find_kernel_specs().keys())
    kernels_text = "\n".join(kernels)
    if kernel is None:
        if len(kernels) > 1:
            _error(
                "There are multiple kernel options, so you must give one manually."
                " with `--kernel`\nPlease specify one of the following kernels.\n\n"
                f"{kernels_text}"
            )
        else:
            kernel = kernels[0]

    if kernel not in kernels:
        raise ValueError(
            f"Did not find kernel: {kernel}\nPlease specify one of the "
            f"installed kernels:\n\n{kernels_text}"
        )

    args = (str(path), "-q", "--set-kernel", kernel, "--set-formats", "myst")
    jupytext(args)

    if verbose:
        print(f"Initialized file: {path}\nWith kernel: {kernel}")
