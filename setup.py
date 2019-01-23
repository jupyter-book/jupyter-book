from setuptools import setup, find_packages
import sys
import versioneer

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
    include_package_data=True,
    cmdclass=versioneer.get_cmdclass(),
    entry_points={
        'console_scripts': [
            'jupyter-book = jupyter_book.main:main',
        ]
    },
)