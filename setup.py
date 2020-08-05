from setuptools import setup, find_packages
from pathlib import Path

text = Path("./jupyter_book/__init__.py").read_text(encoding="utf8")
for line in text.split("\n"):
    if "__version__" in line:
        break
version = line.split("= ")[-1].strip('"')

# Documentation requirements
path_doc_reqs = Path(__file__).parent.joinpath("docs", "requirements.txt")
doc_reqs = [
    ii
    for ii in path_doc_reqs.read_text(encoding="utf8").split("\n")
    if not ii.startswith("#")
]
test_reqs = [
    "coverage",
    "pytest>=3.6,<4",
    "pytest-cov",
    "beautifulsoup4",
    "matplotlib",
    "pytest-regressions",
    "jupytext",
    "altair",
    "sphinx_click",
    "sphinx_tabs",
    "pyppeteer",
    "beautifulsoup4",
] + doc_reqs
setup(
    name="jupyter-book",
    version=version,
    python_requires=">=3.6",
    author="Executable Book Project",
    author_email="jupyter@googlegroups.com",
    url="https://executablebooks.org/",
    project_urls={
        "Documentation": "https://jupyterbook.org",
        "Funding": "https://executablebooks.org",
        "Source": "https://github.com/executablebooks/jupyter-book/",
        "Tracker": "https://github.com/executablebooks/jupyter-book/issues",
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
        "sphinx<3",
        "myst-nb~=0.8",
        "click",
        "setuptools",
        "nbformat",
        "nbconvert",
        "nbclient",
        "sphinx_togglebutton",
        "sphinx-copybutton",
        "sphinxcontrib-bibtex",
        "sphinx_book_theme>=0.0.34",
        "sphinx-thebe>=0.0.6",
    ],
    extras_require={
        "code_style": ["flake8<3.8.0,>=3.7.0", "black", "pre-commit==1.17.0"],
        "sphinx": doc_reqs,
        "testing": test_reqs,
        "pdfhtml": "pyppeteer",
    },
    entry_points={
        "console_scripts": [
            "jb = jupyter_book.commands:main",
            "jupyter-book = jupyter_book.commands:main",
        ]
    },
    package_data={"jupyter_book": ["default_config.yml", "book_template/*"]},
    include_package_data=True,
)
