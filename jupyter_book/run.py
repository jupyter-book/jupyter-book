"""Execute all of the notebooks in a folder. This is helpful if you wish
to ensure that all of your notebooks run, and that the output
contained in the notebook files is up-to-date."""
from glob import glob
from subprocess import run
from tqdm import tqdm

import os.path as op


def run_book(path, kernel_name='python3'):

    print("Running all notebooks underneath {}".format(path))
    ipynb_files = glob(op.join(path, '**', '*.ipynb'), recursive=True)

    failed_files = []
    for ifile in tqdm(ipynb_files):
        call = 'jupyter nbconvert --inplace --ExecutePreprocessor.kernel_name={} --to notebook --execute {}'.format(
            kernel_name, ifile)
        try:
            run(call.split(), check=True)
        except Exception:
            failed_files.append(ifile)

    print('Failing files:')
    for ifile in failed_files:
        print(ifile)
