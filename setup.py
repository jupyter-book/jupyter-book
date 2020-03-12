from setuptools import setup, find_packages
import os
import os.path as op
from glob import glob
from pathlib import Path

version = [
    line
    for line in Path("jupyter_book/__init__.py").read_text().split()
    if "__version__" in line
]
version = version[0].split(" = ")[-1]

setup(
    name="jupyter-book",
    version=version,
    python_requires=">=3.6",
    author="Project Jupyter Contributors",
    author_email="jupyter@googlegroups.com",
    url="https://jupyterbook.org/",
    project_urls={
        "Documentation": "https://jupyterbook.org",
        "Funding": "https://jupyter.org/about",
        "Source": "https://github.com/jupyter/jupyter-book/",
        "Tracker": "https://github.com/jupyter/jupyter-book/issues",
    },
    # this should be a whitespace separated string of keywords, not a list
    keywords="reproducible science environments scholarship notebook",
    description="Jupyter Book: Create an online book with Jupyter Notebooks",
    long_description=open("./README.md", "r").read(),
    long_description_content_type="text/markdown",
    license="BSD",
    packages=find_packages(),
    install_requires=[
        "pyyaml",
        "docutils>=0.15",
        "sphinx",
        "myst-nb~=0.2.1",
        "click",
        "setuptools",
        "sphinx",
        "nbformat",
        "nbconvert",
        "nbclient",
        "sphinx-togglebutton",
        "sphinx-copybutton",
        "sphinxcontrib-bibtex",
        (
            "sphinx_book_theme @ "
            "https://github.com/ExecutableBookProject/sphinx-book-theme/archive/master.zip"
        ),
    ],
    extras_require={
        "sphinx": ["folium", "numpy", "matplotlib", "ipywidgets", "pandas", "nbclient"],
        "testing": ["coverage", "pytest>=3.6,<4", "pytest-cov", "beautifulsoup4"],
    },
    entry_points={
        "console_scripts": [
            "jb = jupyter_book.commands:main",
            "jupyter-book = jupyter_book.commands:main",
        ],
    },
    package_data={"jupyter_book": ["book_template/*",]},
    include_package_data=True,
)
