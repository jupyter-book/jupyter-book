from sphinx.builders.html import StandaloneHTMLBuilder

NB_MIME_PRIORITY_OVERRIDES = [
    ("mycustombuilder", "application/vnd.jupyter.widget-view+json", 0),
    ("mycustombuilder", "application/javascript", 1),
    ("mycustombuilder", "text/html", 2),
    ("mycustombuilder", "image/svg+xml", 3),
    ("mycustombuilder", "image/png", 4),
    ("mycustombuilder", "image/jpeg", 5),
    ("mycustombuilder", "text/markdown", 6),
    ("mycustombuilder", "text/latex", 7),
    ("mycustombuilder", "text/plain", 8),
]


class MyCustomBuilder(StandaloneHTMLBuilder):
    name = "mycustombuilder"


def setup(app):
    app.add_builder(MyCustomBuilder)

    app.config["nb_mime_priority_overrides"] = NB_MIME_PRIORITY_OVERRIDES

    return {
        "version": "0.1",
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
