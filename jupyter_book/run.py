"""Execute all of the notebooks in a folder. This is helpful if you wish
to ensure that all of your notebooks run, and that the output
contained in the notebook files is up-to-date."""
from glob import glob
from tqdm import tqdm
import nbformat as nbf
from nbconvert.preprocessors import ExecutePreprocessor
import os.path as op


def run_book(path, kernel_name='python3'):
    "Run a collection of notebooks. Each will be run in-place."
    print("Running all notebooks underneath {}".format(path))
    ipynb_files = glob(op.join(path, '**', '*.ipynb'), recursive=True)

    failed_files = []
    for ifile in tqdm(ipynb_files):
        ntbk = nbf.read(ifile, nbf.NO_CONVERT)
        try:
            ntbk = run_ntbk(ntbk, op.dirname(ifile))
            nbf.write(ntbk, ifile)
        except Exception:
            failed_files.append(ifile)

    print('Failing files:')
    for ifile in failed_files:
        print(ifile)


def run_ntbk(ntbk, path_directory, timeout=600, kernel_name=None):
    """Run a notebook node."""
    if kernel_name is None:
        kernel_name = ntbk.get('metadata', {}).get('kernelspec', {}).get('name')

    ep = ExecutePreprocessor(timeout=timeout, kernel_name=kernel_name)
    ntbk, _ = ep.preprocess(ntbk, {'metadata': {'path': path_directory}})
    return ntbk
