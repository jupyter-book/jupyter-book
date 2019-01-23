"""A helper script to execute all of the notebooks
in your /notebooks folder. This is helpful if you wish
to ensure that all of your notebooks run, and that the output
contained in the notebook files is up-to-date."""
from glob import glob
from subprocess import check_call
from tqdm import tqdm

ipynb_files = glob('./notebooks/**/*.ipynb', recursive=True)
failed_files = []
for ifile in tqdm(ipynb_files):
    call = 'jupyter nbconvert --inplace --ExecutePreprocessor.kernel_name=python3 --to notebook --execute {}'.format(ifile)
    try:
        out = check_call(call.split())
    except Exception:
        failed_files.append(ifile)

print('Failing files:')
for ifile in failed_files:
    print(ifile)
