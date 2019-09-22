"""Utilities for building single pages."""
from nbconvert.preprocessors import ExecutePreprocessor


def _clean_markdown_cells(ntbk):
    """Clean up cell text of an nbformat NotebookNode."""
    # Remove '#' from the end of markdown headers
    for cell in ntbk.cells:
        if cell.cell_type == "markdown":
            cell_lines = cell.source.split("\n")
            for ii, line in enumerate(cell_lines):
                if line.startswith("#"):
                    cell_lines[ii] = line.rstrip("#").rstrip()
            cell.source = "\n".join(cell_lines)
    return ntbk


def run_ntbk(ntbk, path_directory, timeout=600, kernel_name=None):
    """Run a notebook node.

    Parameters
    ----------
    ntbk: NotebookNode instance
        The notebook to be run.
    path_directory: str
        A path to the working directory from which the notebook will be run.
        This is important if the notebook has commands that are relative to the
        folder where the notebook exists.
    timeout: int
        Allow notebooks to take this long before erroring due to time.
    kernel_name: string | None
        The kernel name to be used for the notebook. If None, then the kernel
        'python3' will be used.
    """
    if kernel_name is None:
        kernel_name = ntbk.get('metadata', {}).get('kernelspec', {}).get('name', 'python3')

    ep = ExecutePreprocessor(timeout=timeout, kernel_name=kernel_name)
    ntbk, _ = ep.preprocess(ntbk, {'metadata': {'path': path_directory}})
    return ntbk
