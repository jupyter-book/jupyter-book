"""Tools for interacting with Sphinx."""
import sys
import os.path as op
import yaml
from pathlib import Path
from sphinx.util.docutils import docutils_namespace, patch_docutils
from sphinx.application import Sphinx
from sphinx.cmd.build import handle_exception


REDIRECT_TEXT = """
<meta http-equiv="Refresh" content="0; url={first_page}" />
"""

ROOT = Path(__file__)
DEFAULT_CONFIG = dict(
    project="Jupyter Book",
    copyright="2020, ExecutableBookProject",
    author="Executable Book Project",
    extensions=[
        "sphinx_togglebutton",
        "sphinx_copybutton",
        "myst_parser",
        "myst_nb",
        "jupyter_book",
        "sphinxcontrib.bibtex",
    ],
    togglebutton_selector=".toggle, .secondtoggle",
    jupyter_sphinx_require_url="",
    # Add any paths that contain templates here, relative to this directory.
    templates_path=[
        "_templates",
        str(ROOT.parent.joinpath("static", "templates").absolute()),
    ],
    master_doc="index.rst",
    language=None,
    exclude_patterns=["_build", "Thumbs.db", ".DS_Store", "**.ipynb_checkpoints"],
    pygments_style="sphinx",
    # -- Options for HTML output -------------------------------------------------
    html_theme="jupyter_book_theme",
    html_theme_options={"single_page": False},
)


def build_sphinx(
    sourcedir,
    outputdir,
    confdir=None,
    noconfig=False,
    confoverrides=None,
    htmloverrides=None,
    doctreedir=None,
    filenames=None,
    force_all=False,
    quiet=False,
    really_quiet=False,
    nitpicky=False,
    builder="html",
    freshenv=False,
    warningiserror=False,
    tags=None,
    verbosity=0,
    jobs=None,
    keep_going=False,
):
    """Sphinx build "main" command-line entry.

    This is a slightly modified version of
    https://github.com/sphinx-doc/sphinx/blob/3.x/sphinx/cmd/build.py#L198.
    """

    # Manual configuration overrides
    if confoverrides is None:
        confoverrides = {}
    config = DEFAULT_CONFIG.copy()
    config.update(confoverrides)

    # HTML-specific configuration
    if htmloverrides is None:
        htmloverrides = {}
    for key, val in htmloverrides.items():
        config["html_context.%s" % key] = val

    # Configuration directory
    if noconfig:
        confdir = None
    elif not confdir:
        confdir = sourcedir

    # Doctrees directory
    if not doctreedir:
        doctreedir = op.join(outputdir, ".doctrees")

    if jobs is None:
        jobs = 1

    # Manually re-building files in filenames
    if filenames is None:
        filenames = []
    missing_files = []
    for filename in filenames:
        if not op.isfile(filename):
            missing_files.append(filename)
    if missing_files:
        raise ValueError("cannot find files %r" % missing_files)

    if force_all and filenames:
        raise ValueError("cannot combine -a option and filenames")

    # Debug args (hack to get this to pass through properly)
    def debug_args():
        pass

    debug_args.pdb = False
    debug_args.verbosity = False
    debug_args.traceback = False

    # Logging behavior
    status = sys.stdout
    warning = sys.stderr
    error = sys.stderr
    if quiet:
        status = None
    if really_quiet:
        status = warning = None

    # Error on warnings
    if nitpicky:
        config["nitpicky"] = True

    app = None  # In case we fail, this allows us to handle the exception
    try:
        with patch_docutils(confdir), docutils_namespace():
            app = Sphinx(
                sourcedir,
                confdir,
                outputdir,
                doctreedir,
                builder,
                config,
                status,
                warning,
                freshenv,
                warningiserror,
                tags,
                verbosity,
                jobs,
                keep_going,
            )
            app.build(force_all, filenames)

            # Write an index.html file in the root to redirect to the first page
            path_index = outputdir.joinpath("index.html")
            path_toc = Path(config["globaltoc_path"])
            if not path_index.exists() and path_toc.exists():
                toc = yaml.safe_load(path_toc.read_text())
                first_page = toc[0]["path"].split(".")[0] + ".html"
                with open(path_index, "w") as ff:
                    ff.write(REDIRECT_TEXT.format(first_page=first_page))
            return app.statuscode
    except (Exception, KeyboardInterrupt) as exc:
        handle_exception(app, debug_args, exc, error)
        return 2
