"""Create a root index.html redirect for ReadTheDocs builds.

This script is only used during RTD builds to create a redirect from the root
URL to the /docs/ subdirectory where the actual documentation is served.
"""
import os

output_dir = os.environ["READTHEDOCS_OUTPUT"]
version = os.environ["READTHEDOCS_VERSION"]

html = f"""<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=docs/{version}/">
</head>
</html>
"""

with open(f"{output_dir}/html/index.html", "w") as f:
    f.write(html)
