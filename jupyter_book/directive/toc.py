from docutils import nodes

from sphinx import builders
from sphinx.util import logging
from sphinx.util.docutils import SphinxDirective
from sphinx.transforms import SphinxTransform

from docutils.nodes import compound

logger = logging.getLogger(__name__)


class TableOfContentsNode(nodes.Element):
    """Add a TableOfContents node that will be replaced in the future."""

    def __init__(self, rawsource="", *children, text="Run code", **attributes):
        super().__init__("")


class TableofContents(SphinxDirective):
    def run(self):
        """returns an array of nodes for the tableofcontents directive declaration."""
        # Not supporting this directive in latex, as a short-term fix.
        # Will revert to using reference nodes instead of toctree for latex in the next
        # release.
        if isinstance(self.env.app.builder, builders.latex.LaTeXBuilder):
            return []
        return [TableOfContentsNode()]


class SwapTableOfContents(SphinxTransform):
    default_priority = 700

    def apply(self):
        # toctrees will have a compound just before them
        toctrees = [
            ii
            for ii in self.document.traverse(compound)
            if "toctree-wrapper" in ii.attributes["classes"]
        ]

        # replacing all TableOfContentsNode with tocnode
        for index, tocnode in enumerate(self.document.traverse(TableOfContentsNode)):
            if len(toctrees) == 0:
                warn = f"Found tableofcontents directive in {self.env.docname}, but this file has no descendents."  # noqa: E501
                logger.warning(warn)

            # Replace the tableofcontents node with the page's toctree
            wrappernode = compound(classes=["tableofcontents-wrapper"])
            for itoc in toctrees:
                toctree = itoc.children[0].deepcopy()
                toctree.attributes["hidden"] = False
                if index == len(self.document.traverse(TableOfContentsNode)):
                    itoc.parent.remove(itoc)
                wrappernode.append(toctree)
            tocnode.replace_self(wrappernode)
