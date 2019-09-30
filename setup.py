from setuptools import setup, find_packages
import os
import os.path as op
from glob import glob
from jupyter_book import __version__

# Location of the template files we use for cloning
template_files = glob(
    op.join('jupyter_book', 'book_template', '**', '*'), recursive=True)
template_files += glob(op.join('jupyter_book', 'minimal',
                               '**', '*'), recursive=True)
template_files += glob(op.join('jupyter_book', 'page', 'templates', '*.tpl'))
template_files = [ii.replace('jupyter_book' + os.sep, '', 1)
                  for ii in template_files]
PACKAGE_DATA = {"jupyter_book": template_files}

# Source dependencies from requirements.txt file.
with open('requirements.txt', 'r') as f:
    lines = f.readlines()
    install_packages = [line.strip() for line in lines]

setup(
    name='jupyter-book',
    version=__version__,
    install_requires=install_packages,
    include_package_data=True,
    python_requires='>=3.6',
    author='Project Jupyter Contributors',
    author_email='jupyter@googlegroups.com',
    url='https://jupyterbook.org/',
    project_urls={
        'Documentation': 'https://jupyterbook.org',
        'Funding': 'https://jupyter.org/about',
        'Source': 'https://github.com/jupyter/jupyter-book/',
        'Tracker': 'https://github.com/jupyter/jupyter-book/issues',
    },
    # this should be a whitespace separated string of keywords, not a list
    keywords="reproducible science environments scholarship notebook",
    description="Jupyter Book: Create an online book with Jupyter Notebooks"
                " and Jekyll",
    long_description=open('./README.md', 'r').read(),
    long_description_content_type='text/markdown',
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
