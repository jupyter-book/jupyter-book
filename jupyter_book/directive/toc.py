from docutils import nodes

from sphinx import addnodes
from sphinx.util import logging
from sphinx.util.nodes import clean_astext
from sphinx.util.docutils import SphinxDirective

import copy

logger = logging.getLogger(__name__)


class TableofContents(SphinxDirective):
    def run(self):
        """ returns an array of nodes for the tableofcontents directive declaration
        """
        ret = []
        wrappernode = nodes.compound(classes=["toctree-wrapper"])
        self.add_name(wrappernode)
        depth = 0

        globaltoc = self._process_toc_dict(copy.deepcopy(self.config.globaltoc))

        # remove master_doc from the dict
        if "file" in globaltoc and globaltoc["file"] == self.config.master_doc:
            del globaltoc["file"]

        wncopy = wrappernode.deepcopy()
        self._has_toc_yaml(wncopy, globaltoc, depth)

        ret.append(wncopy)
        return ret

    def _process_toc_dict(self, globaltoc):
        """ Filters globaltoc to take children of the current page only
        """
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
        """ constructs toc nodes from globaltoc dict
        """
        depth += 1
        for key, val in tocdict.items():
            if key == "header":
                header = self._handle_toc_header(subnode, val, depth)
                subnode["classes"].append("ls-none")
                subnode.append(header)
            if key == "file":
                if val not in self.env.titles:
                    continue
                title = clean_astext(self.env.titles[val])
                val = "/" + val + self.env.app.builder.out_suffix
                reference = nodes.reference(
                    "",
                    "",
                    internal=False,
                    refuri=val,
                    anchorname="",
                    *[nodes.Text(title)]
                )
                para = addnodes.compact_paragraph("", "", reference)
                item = nodes.list_item("", para)
                item["classes"].append("toctree-l%d" % (depth))
                subnode.append(item)
            if key == "sections":
                sectionlist = nodes.bullet_list().deepcopy()
                sectionheader = None
                headerlist = None
                for item in val:
                    if "header" in item:
                        if headerlist:
                            sectionlist["classes"].append("ls-none")
                            sectionlist.append(sectionheader)
                            sectionlist.append(headerlist)
                        headerlist = nodes.bullet_list().deepcopy()
                        sectionheader = self._handle_toc_header(
                            sectionlist, item["header"], depth
                        )
                    else:
                        if headerlist:
                            self._has_toc_yaml(headerlist, item, depth)
                        else:
                            self._has_toc_yaml(sectionlist, item, depth)
                # handling for last header in the section
                if headerlist:
                    sectionlist["classes"].append("ls-none")
                    sectionlist.append(sectionheader)
                    sectionlist.append(headerlist)
                subnode.append(sectionlist)

    def _handle_toc_header(self, subnode, val, depth):
        """ Constructs node for the headers in globaltoc
        """
        if val in self.env.titles:
            title = clean_astext(self.env.titles[val])
            val = "/" + val + self.env.app.builder.out_suffix
            reference = nodes.reference(
                "", "", internal=False, refuri=val, anchorname="", *[nodes.Text(title)]
            )
            para = addnodes.compact_paragraph("", "", reference)
        else:
            para = addnodes.compact_paragraph("", "", nodes.Text(val))
        item = nodes.list_item("", para)
        item["classes"].append("fs-1-2")
        return item
