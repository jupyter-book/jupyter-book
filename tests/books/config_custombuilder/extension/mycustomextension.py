from sphinx.builders.html import StandaloneHTMLBuilder

NB_RENDER_PRIORITY = {
    "mycustombuilder": (
        "application/vnd.jupyter.widget-view+json",
        "application/javascript",
        "text/html",
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "text/markdown",
        "text/latex",
        "text/plain",
    )
}


class MyCustomBuilder(StandaloneHTMLBuilder):
    name = "mycustombuilder"


def setup(app):
    app.add_builder(MyCustomBuilder)

    # Add config to support myst_nb
    if "nb_render_priority" in app.config:
        app.config["nb_render_priority"]["mycustombuilder"] = NB_RENDER_PRIORITY[
            "mycustombuilder"
        ]
    else:
        app.add_config_value(
            "nb_render_priority", NB_RENDER_PRIORITY, "mycustombuilder"
        )

    return {
        "version": "0.1",
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
