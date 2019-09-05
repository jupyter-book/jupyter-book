"""Execute all of the notebooks in a folder. This is helpful if you wish
to ensure that all of your notebooks run, and that the output
contained in the notebook files is up-to-date."""
from glob import glob
from tqdm import tqdm
import nbformat as nbf
from nbconvert.preprocessors import ExecutePreprocessor
import os.path as op


def run_pages(path, kernel_name='python3'):
    "Run a collection of notebooks. Each will be run in-place."
    if not op.exists(path):
        raise ValueError(f"Couldn't find anything at the path provided: {path}")
    if path.endswith('.ipynb'):
        print('Running single notebook...')
        ipynb_files = [path]
    else:
        ipynb_files = glob(op.join(path, '**', '*.ipynb'), recursive=True)
        n_notebooks = len(ipynb_files)
        if n_notebooks == 0:
            raise ValueError(f"No notebooks were found in the provided folder: {path}")
        print(f"Running a folder of notebooks, {n_notebooks} in total.")

    failed_files = []
    for ifile in tqdm(ipynb_files):
        ntbk = nbf.read(ifile, nbf.NO_CONVERT)
        try:
            ntbk = run_ntbk(ntbk, op.dirname(ifile))
            nbf.write(ntbk, ifile)
        except Exception:
            failed_files.append(ifile)

    if len(failed_files) > 0:
        print('Finished printing with these failing pages:')
        for ifile in failed_files:
            print(ifile)


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
