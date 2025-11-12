# build_gallery.py
from pathlib import Path
import yaml
import html

SRC = Path("gallery.yml")
DST = Path("gallery.md")

def esc(t: str) -> str:
    # Minimal escaping for safety inside Markdown
    return html.escape(t or "", quote=False)

items = yaml.safe_load(SRC.read_text(encoding="utf-8"))

lines = []
lines.append("# Gallery")
lines.append('Jupyter Book 2 technology has been applied across a wide range of use cases, including curricula vitae, official educational textbooks, student portfolios, lab manuals, and technical documentation.')
lines.append('This is a gallery of Jupyter Books built from across the community. If you’d like to add your book to this list, simply add an entry to this gallery.yml file and open a Pull Request to add it.')
lines.append('Below is a gallery showcasing examples of such outputs.')

lines.append(":::{grid} 1 1 2 2")

for it in items:
    name = esc(it.get("name", ""))
    website = it.get("website", "") or it.get("repository", "") or ""
    repo = it.get("repository", "")
    image = it.get("image", "")
    desc = esc(it.get("description", ""))
    key = it.get("keywords","")

    # TEXT CARD (title + description)
    lines.append(f"```{{card}} {name}")
    if website:
        lines.append(f":link: {website}")
        lines.append(f"")

    if desc:
        lines.append(desc)
    else:
        # optional: show repo if no description given
        if repo:
            lines.append(f"[Repository]({repo})")
    lines.append("```")
    lines.append(f"")

    # IMAGE CARD (clickable) with footer
    if image:
        lines.append("````{card}")
        if website:
            lines.append(f":link: {website}")
        if key:
            lines.append(f":footer: {key}")
            lines.append("")  # blank line before body

        lines.append("```{figure} " + image)
        lines.append("")  # allow figure options later if you want
        lines.append("```")
        lines.append("````")
        lines.append(f"")

# close grid
lines.append(":::")
lines.append("")  # trailing newline

DST.write_text("\n".join(lines), encoding="utf-8")

print("✅ gallery.md generated")
