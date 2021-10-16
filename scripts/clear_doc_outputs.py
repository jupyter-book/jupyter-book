from glob import glob

import nbformat as nbf
from nbconvert.exporters import NotebookExporter
from traitlets.config import Config

notebooks = glob("docs/content/**/*.ipynb", recursive=True)

c = Config()
c.NotebookExporter.preprocessors = ["nbconvert.preprocessors.ClearOutputPreprocessor"]
exporter = NotebookExporter(config=c)

for path_ntbk in notebooks:
    print(f"Clearing output for {path_ntbk}")
    ntbk = nbf.read(path_ntbk, nbf.NO_CONVERT)
    (ntbk, _) = exporter.from_notebook_node(ntbk)
    ntbk = nbf.reads(ntbk, nbf.NO_CONVERT)
    nbf.write(ntbk, path_ntbk)
