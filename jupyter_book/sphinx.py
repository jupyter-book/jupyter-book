"""Tools for interacting with Sphinx."""
import sys
import os.path as op
import yaml
from pathlib import Path
from sphinx.util.docutils import docutils_namespace, patch_docutils
from sphinx.application import Sphinx
from sphinx.cmd.build import handle_exception

from .yaml import PATH_YAML_DEFAULT, yaml_to_sphinx, _recursive_update


REDIRECT_TEXT = """
<meta http-equiv="Refresh" content="0; url={first_page}" />
"""

ROOT = Path(__file__)
# Some configuration values that are really sphinx-specific
DEFAULT_CONFIG = dict(
    extensions=[
        "sphinx_togglebutton",
        "sphinx_copybutton",
        "myst_nb",
        "jupyter_book",
        "sphinxcontrib.bibtex",
        "sphinx_thebe",
    ],
    language=None,
    pygments_style="sphinx",
    html_theme="sphinx_book_theme",
    html_theme_options={"search_bar_text": "Search this book..."},
    html_add_permalinks="¶",
    html_sourcelink_suffix="",
    numfig=True,
)


def build_sphinx(
    sourcedir,
    outputdir,
    confdir=None,
    path_config=None,
    noconfig=False,
    confoverrides=None,
    extra_extensions=None,
    htmloverrides=None,
    latexoverrides=None,
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

    Extra parameters
    ----------------

    extra_extensions : list | None
        A list of extra extensions to load into Sphinx. This must be done
        before Sphinx is initialized otherwise the extensions aren't properly
        initialized.
    """

    if confoverrides is None:
        confoverrides = {}
    if latexoverrides is None:
        latexoverrides = {}

    #######################
    # Configuration updates

    # Start with the default Sphinx config
    sphinx_config = DEFAULT_CONFIG.copy()

    # Update with the *default* config.yml
    default_yaml_config = yaml.safe_load(PATH_YAML_DEFAULT.read_text(encoding="utf8"))
    new_config = yaml_to_sphinx(default_yaml_config)
    _recursive_update(sphinx_config, new_config)

    # Update with the given config file, if it exists
    if path_config:
        path_config = Path(path_config)
        yaml_config = yaml.safe_load(path_config.read_text(encoding="utf8"))

        # Check for manual Sphinx over-rides which we'll apply later to take precedence
        sphinx_overrides = yaml_config.get("sphinx", {}).get("config")
        if sphinx_overrides:
            confoverrides.update(sphinx_overrides)

        # Some latex-specific changes we need to make if we're building latex
        if builder == "latex":
            # First update the overrides with the latex config
            latexoverrides.update(yaml_config.get("latex", {}))

            # If we have a document title and no explicit latex title, use the doc title
            if "title" in yaml_config.keys():
                latex_documents = latexoverrides.get("latex_documents", {})
                if "title" not in latex_documents:
                    latex_documents["title"] = yaml_config["title"]
                latexoverrides["latex_documents"] = latex_documents

        new_config = yaml_to_sphinx(yaml_config)
        _recursive_update(sphinx_config, new_config)

    # Manual configuration overrides from the CLI
    _recursive_update(sphinx_config, confoverrides)

    # HTML-specific configuration from the CLI
    if htmloverrides is None:
        htmloverrides = {}
    for key, val in htmloverrides.items():
        sphinx_config["html_context.%s" % key] = val

    # #LaTeX-specific configuration
    # TODO: if this is included we should ignore latex_documents
    # if latexoverrides is None:
    #     latexoverrides = {}
    # for key, val in latexoverrides.items():
    #     config[key] = val

    # Add the folder `_static` if it exists
    if Path(sourcedir).joinpath("_static").is_dir():
        paths_static = sphinx_config.get("html_static_path", [])
        paths_static.append("_static")
        sphinx_config["html_static_path"] = paths_static

    # Flags from the CLI
    # Raise more warnings
    if nitpicky:
        sphinx_config["nitpicky"] = True

    ##################################
    # Preparing Sphinx build arguments

    # Configuration directory
    if noconfig:
        confdir = None
    elif not confdir:
        confdir = sourcedir

    # Doctrees directory
    if not doctreedir:
        doctreedir = Path(outputdir).parent.joinpath(".doctrees")

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

    ###################
    # Build with Sphinx
    app = None  # In case we fail, this allows us to handle the exception
    try:
        # This patch is what Sphinx does, so we copy it blindly...
        with patch_docutils(confdir), docutils_namespace():
            app = Sphinx(
                srcdir=sourcedir,
                confdir=confdir,
                outdir=outputdir,
                doctreedir=doctreedir,
                buildername=builder,
                confoverrides=sphinx_config,
                status=status,
                warning=warning,
                freshenv=freshenv,
                warningiserror=warningiserror,
                tags=tags,
                verbosity=verbosity,
                parallel=jobs,
                keep_going=keep_going,
            )
            # Apply Latex Overrides for latex_documents
            if (
                latexoverrides is not None
                and "latex_documents" in latexoverrides.keys()
            ):
                from .pdf import update_latex_documents

                latex_documents = update_latex_documents(
                    app.config.latex_documents[0], latexoverrides
                )
                app.config.latex_documents = [latex_documents]
            app.build(force_all, filenames)

            # Write an index.html file in the root to redirect to the first page
            path_index = outputdir.joinpath("index.html")
            if sphinx_config["globaltoc_path"]:
                path_toc = Path(sphinx_config["globaltoc_path"])
                if not path_toc.exists():
                    raise ValueError(
                        (
                            "You gave a Configuration file path"
                            f"that doesn't exist: {path_toc}"
                        )
                    )
                if path_toc.suffix not in [".yml", ".yaml"]:
                    raise ValueError(
                        "You gave a Configuration file path"
                        f"that is not a YAML file: {path_toc}"
                    )
            else:
                path_toc = None

            if not path_index.exists() and path_toc:
                toc = yaml.safe_load(path_toc.read_text(encoding="utf8"))
                if isinstance(toc, dict):
                    first_page = toc["file"]
                else:
                    first_page = toc[0]["file"]
                first_page = first_page.split(".")[0] + ".html"
                with open(path_index, "w") as ff:
                    ff.write(REDIRECT_TEXT.format(first_page=first_page))
            return app.statuscode
    except (Exception, KeyboardInterrupt) as exc:
        handle_exception(app, debug_args, exc, error)
        return exc
