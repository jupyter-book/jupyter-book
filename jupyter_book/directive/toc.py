from docutils import nodes

from sphinx.util import logging
from sphinx.util.docutils import SphinxDirective
from sphinx.util.nodes import clean_astext
from sphinx.transforms import SphinxTransform
from sphinx import builders

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

    def _process_toc_dict(self, globaltoc):
        """Filters globaltoc to take children of the current page only"""
        for key, val in globaltoc.items():
            if key == "file":
                if val == self.env.docname:
                    del globaltoc[key]
                    return globaltoc
            if key == "sections":
                for item in val:
                    if "file" in item and item["file"] == self.env.docname:
                        del item["file"]
                        return item
                    elif "sections" in item:
                        globaltoc = self._process_toc_dict(item)
        return globaltoc

    def _has_toc_yaml(self, subnode, tocdict, depth):
        """constructs toc nodes from globaltoc dict"""
        depth += 1
        for key, val in tocdict.items():
            if key in ["file", "url"]:
                if "title" in tocdict:
                    title = tocdict["title"]
                else:
                    if val not in self.env.titles:
                        continue
                    title = clean_astext(self.env.titles[val])
                if key == "url":
                    if "http" in val:
                        internal = False
                    else:
                        # since "file" key will be anyways for each "url" key
                        continue
                else:
                    val = val
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
        if val in self.env.titles:
            title = clean_astext(self.env.titles[val])
            reference = nodes.reference(
                "", "", internal=False, refuri=val, anchorname="", *[nodes.Text(title)]
            )
            para = addnodes.compact_paragraph("", "", reference)
        else:
            para = addnodes.compact_paragraph("", "", nodes.Text(val))
        item = nodes.list_item("", para)
        item["classes"].append("fs-1-2")
        return item

    def apply(self):
        if isinstance(self.env.app.builder, builders.latex.LaTeXBuilder):
            # if Latex Builder makes reference nodes instead of using toctree directive
            for index, tocnode in enumerate(
                self.document.traverse(TableOfContentsNode)
            ):
                ret = []
                wrappernode = nodes.compound(classes=["tableofcontents-wrapper"])
                # self.add_name(wrappernode)
                depth = 0

                globaltoc = self._process_toc_dict(copy.deepcopy(self.config.globaltoc))

                # remove master_doc from the dict
                if "file" in globaltoc and globaltoc["file"] == self.config.master_doc:
                    del globaltoc["file"]

                wncopy = wrappernode.deepcopy()
                self._has_toc_yaml(wncopy, globaltoc, depth)

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
