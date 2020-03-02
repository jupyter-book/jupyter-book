"""Tools for interacting with Sphinx."""
import sys
import os.path as op
from sphinx.util.docutils import docutils_namespace, patch_docutils
from sphinx.application import Sphinx
from sphinx.cmd.build import handle_exception

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

    # HTML-specific configuration
    if htmloverrides is None:
        htmloverrides = {}
    for key, val in htmloverrides.items():
        confoverrides["html_context.%s" % key] = val

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
        confoverrides["nitpicky"] = True

    app = None  # In case we fail, this allows us to handle the exception
    try:
        with patch_docutils(confdir), docutils_namespace():
            app = Sphinx(
                sourcedir,
                confdir,
                outputdir,
                doctreedir,
                builder,
                confoverrides,
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
            return app.statuscode
    except (Exception, KeyboardInterrupt) as exc:
        handle_exception(app, debug_args, exc, error)
        return 2
