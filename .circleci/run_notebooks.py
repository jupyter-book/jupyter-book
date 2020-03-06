import nbformat as nbf
from nbclient import NotebookClient
from glob import glob
from pathlib import Path

ROOT = Path(__file__)
DOCS = ROOT.absolute().parent.parent.joinpath("docs")
expected_errors = ["features/notebooks.ipynb"]
notebooks = DOCS.glob("**/*.ipynb")
for path_ntbk in notebooks:
    path_ntbk = str(path_ntbk)
    print(f"Executing {path_ntbk}")
    with open(path_ntbk) as ff:
        ntbk = nbf.read(ff, as_version=4)
    allow_errors = any(ii in path_ntbk for ii in expected_errors)
    client = NotebookClient(ntbk, allow_errors=allow_errors, store_widget_state=False)
    client.execute()
    nbf.write(ntbk, path_ntbk)
