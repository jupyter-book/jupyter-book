from setuptools import setup, find_packages
import sys
import os
import os.path as op
from glob import glob

# Location of the template files we use for cloning
template_files = glob(op.join('jupyter_book', 'book_template', '**', '*'), recursive=True)
template_files = [ii.replace('jupyter_book' + os.sep, '', 1) for ii in template_files]
PACKAGE_DATA = {"jupyter_book": template_files}

version = 'v0.1'
setup(
    name='jupyter-book',
    version=version,
    install_requires=[
        'ruamel.yaml',
    ],
    python_requires='>=3.4',
    author='Project Jupyter Contributors',
    author_email='jupyter@googlegroups.com',
    url='https://jupyter.org/jupyter-book/',
    project_urls = {
        'Documentation': 'https://jupyter.org/jupyter-book',
        'Funding': 'https://jupyter.org/about',
        'Source': 'https://github.com/jupyter/jupyter-book/',
        'Tracker': 'https://github.com/jupyter/jupyter-book/issues',
    },
    # this should be a whitespace separated string of keywords, not a list
    keywords="reproducible science environments scholarship notebook",
    description = "Jupyter Books: Create an online book with Jupyter Notebooks and Jekyll",
    license='BSD',
    packages=find_packages(),
    use_package_data=True,
    package_data=PACKAGE_DATA,
    entry_points={
        'console_scripts': [
            'jupyter-book = jupyter_book.main:main',
        ]
    },
)