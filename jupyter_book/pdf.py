"""Commands to facilitate conversion to PDF."""
from pathlib import Path
import asyncio

from .utils import _error, _message_box


def html_to_pdf(html_file, pdf_file):
    """
    Convert arbitrary HTML file to PDF using pyppeteer.

    Parameters
    ----------
    html_file : str
        A path to an HTML file to convert to PDF
    pdf_file : str
        A path to an output PDF file that will be created
    """
    asyncio.get_event_loop().run_until_complete(_html_to_pdf(html_file, pdf_file))


async def _html_to_pdf(html_file, pdf_file):
    try:
        from pyppeteer import launch
    except ImportError:
        _error(
            "Generating PDF from book HTML requires the pyppeteer package. "
            "Install it first.",
            ImportError,
        )
    browser = await launch(args=["--no-sandbox"])
    page = await browser.newPage()

    # Absolute path is needed
    html_file = Path(html_file).resolve()

    # Waiting for networkidle0 seems to let mathjax render
    await page.goto(f"file:///{html_file}", {"waitUntil": ["networkidle0"]})
    # Give it *some* margins to make it look a little prettier
    # I just made these up
    page_margins = {"left": "0in", "right": "0in", "top": ".5in", "bottom": ".5in"}
    await page.pdf({"path": pdf_file, "margin": page_margins})
    await browser.close()


def update_latex_documents(latex_documents, latexoverrides):
    """
    Apply latexoverrides from _config.yml to latex_documents tuple
    """
    if len(latex_documents) > 1:
        _message_box(
            "Latex documents has been specified as a multi element list in the _config",
            "This suggests the user has made custom settings to their build",
            "[Skipping] update_latex_documents for specific latex overrides",
        )
        return latex_documents
    else:
        # Extract latex_documents tuple
        latex_documents = latex_documents[0]
    # Apply single overrides from _config.yml
    latexdocs_tuple = (
        "startdocname",
        "targetname",
        "title",
        "author",
        "theme",
        "toctree_only",
    )
    updated_latexdocs = []
    for loc, item in enumerate(latexdocs_tuple):
        # the last element toctree_only seems optionally included
        if loc >= len(latex_documents):
            break
        if item in latexoverrides["latex_documents"].keys():
            updated_latexdocs.append(latexoverrides["latex_documents"][item])
        else:
            updated_latexdocs.append(latex_documents[loc])
    return list(tuple(updated_latexdocs))


def build_singlepage_latexdocuments(latex_documents, toc):
    """
    Build list of tuples for each document in the Project
    [((startdocname, targetname, title, author, theme, toctree_only))]
    https://www.sphinx-doc.org/en/3.x/usage/configuration.html#confval-latex_documents

    TODO:
    1. How best to get a list of documents?
    2. How best to fetch titles for each document

    """
    import pdb

    pdb.set_trace()
