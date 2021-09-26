import sys
from pathlib import Path
from textwrap import dedent

from jupyter_client.kernelspec import find_kernel_specs
from rich.console import Console
from rich.panel import Panel

console = Console()
error_console = Console(stderr=True)

##############################################################################
# CLI utilities


def _message_box(
    msg,
    title=None,
    subtitle=None,
    color="green",
    doprint=True,
    print_func=console.print,
):
    # Prepare the message so the indentation is the same as the box
    msg = dedent(msg)
    box = Panel(msg, title=title, subtitle=subtitle, border_style=color, padding=(1, 2))

    if doprint is True:
        print_func(box)
    return box


def _error(msg, kind=None):
    _message_box(msg, title="🛑 Error! 🛑", color="red", print_func=error_console.print)
    sys.exit(1)


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
