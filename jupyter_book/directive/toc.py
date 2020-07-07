from docutils import nodes

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
        """ returns an array of nodes for the tableofcontents directive declaration
        """
        return [TableOfContentsNode()]


class SwapTableOfContents(SphinxTransform):
    default_priority = 700

    def apply(self):
        for tocnode in self.document.traverse(TableOfContentsNode):
            # toctrees will have a compound just before them
            toctrees = [
                ii
                for ii in self.document.traverse(compound)
                if "toctree-wrapper" in ii.attributes["classes"]
            ]
            if len(toctrees) == 0:
                logger.warning(
                    "Found tableofcontents directive but this file has no descendents."
                )

            # Replace the tableofcontents node with the page's toctree
            for itoc in toctrees:
                toctree = itoc.children[0]
                toctree.attributes["hidden"] = False
                itoc.parent.remove(itoc)
                tocnode.replace_self(itoc)
