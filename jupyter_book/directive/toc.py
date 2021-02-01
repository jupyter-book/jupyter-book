from docutils import nodes

from sphinx.util import logging
from sphinx.util.docutils import SphinxDirective
from sphinx.util.nodes import clean_astext
from sphinx.transforms import SphinxTransform
from sphinx import builders
from pathlib import Path

import copy

from sphinx import addnodes
from docutils.nodes import compound

logger = logging.getLogger(__name__)


class TableOfContentsNode(nodes.Element):
    """Add a TableOfContents node that will be replaced in the future."""

    def __init__(self, rawsource="", *children, text="Run code", **attributes):
        super().__init__("")


class TableofContents(SphinxDirective):
    def run(self):
        """returns an array of nodes for the tableofcontents directive declaration"""
        return [TableOfContentsNode()]


class SwapTableOfContents(SphinxTransform):
    default_priority = 700

    def _process_toc_dict(self, globaltoc, parent_file, filtered_toc):
        """Filters globaltoc to take children of the current page only"""
        for key, val in globaltoc.items():
            if key == "file":
                if val == parent_file:
                    del globaltoc["file"]
                    return globaltoc
            if key == "sections":
                for item in val:
                    if "file" in item and item["file"] == parent_file:
                        del item["file"]
                        filtered_toc = item
                        break
                    elif "sections" in item:
                        filtered_toc = self._process_toc_dict(
                            item, parent_file, filtered_toc
                        )
                if filtered_toc:
                    return filtered_toc
        return

    def _has_toc_yaml(self, subnode, tocdict, depth):
        """constructs toc nodes from globaltoc dict"""
        depth += 1
        for key, val in tocdict.items():
            if key in ["file", "url"]:
                internal = False
                if "title" in tocdict:
                    title = tocdict["title"]
                else:
                    if val not in self.env.titles:
                        continue
                    title = clean_astext(self.env.titles[val])
                if "url" in tocdict:
                    if "http" in tocdict["url"]:
                        internal = False
                    else:
                        continue
                else:
                    val = "%" + val
                    internal = True
                reference = nodes.reference(
                    "",
                    "",
                    internal=internal,
                    refuri=val,
                    anchorname="",
                    *[nodes.Text(title)],
                )
                para = addnodes.compact_paragraph("", "", reference)
                item = nodes.list_item("", para)
                item["classes"].append("tableofcontents-l%d" % (depth))
                subnode.append(item)
            if key in ["sections"]:
                sectionlist = nodes.bullet_list().deepcopy()
                sectionheader = None
                for item in val:
                    if "part" in item:
                        sectionheader = self._handle_toc_header(
                            sectionlist, item["part"], depth
                        )
                        sectionlist.append(sectionheader)
                        del item["part"]
                        self._has_toc_yaml(sectionlist, item, depth)
                    else:
                        self._has_toc_yaml(sectionlist, item, depth)
                subnode.append(sectionlist)

    def _handle_toc_header(self, subnode, val, depth):
        """Constructs node for the headers in globaltoc"""
        para = addnodes.compact_paragraph("", "", nodes.Text(val))
        item = nodes.list_item("", para)
        item["classes"].append("fs-1-2")
        return item

    def _get_parent_file(self, tocnode):
        """searches parent nodes to find the chapter name"""
        if isinstance(tocnode.parent, nodes.document):
            parent_file = Path(tocnode.parent.attributes["source"]).relative_to(
                self.env.app.confdir
            )
            parent_file = str(parent_file).replace(parent_file.suffix, "")
            return parent_file
        else:
            return self._get_parent_file(tocnode.parent)

    def apply(self):
        if isinstance(self.env.app.builder, builders.latex.LaTeXBuilder):
            # if Latex Builder makes reference nodes instead of using toctree directive
            parent_file = None
            for index, tocnode in enumerate(
                self.document.traverse(TableOfContentsNode)
            ):
                parent_file = self._get_parent_file(tocnode)

                ret = []
                wrappernode = nodes.compound(classes=["tableofcontents-wrapper"])

                depth = 0

                filtered_toc = self._process_toc_dict(
                    copy.deepcopy(self.config.globaltoc), parent_file, filtered_toc=None
                )

                wncopy = wrappernode.deepcopy()
                self._has_toc_yaml(wncopy, filtered_toc, depth)
                ret.append(wncopy)
                tocnode.replace_self(ret)
        else:
            # toctrees will have a compound just before them
            toctrees = [
                ii
                for ii in self.document.traverse(compound)
                if "toctree-wrapper" in ii.attributes["classes"]
            ]

            # replacing all TableOfContentsNode with tocnode
            for index, tocnode in enumerate(
                self.document.traverse(TableOfContentsNode)
            ):
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
