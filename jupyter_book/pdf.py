"""Commands to facilitate conversion to PDF."""
from copy import copy
from pathlib import Path
import asyncio

from .utils import _error


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


def update_latex_document(latex_document: tuple, updates: dict):
    """Apply updates from _config.yml to a latex_document tuple"""
    names = (
        "startdocname",
        "targetname",
        "title",
        "author",
        "theme",
        "toctree_only",
    )
    updated = list(copy(latex_document))
    for i, (_, name) in enumerate(zip(latex_document, names)):
        if name in updates:
            updated[i] = updates[name]
    return tuple(updated)
