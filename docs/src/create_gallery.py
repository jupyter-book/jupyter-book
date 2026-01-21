from pathlib import Path
import yaml
import html
import random

SRC = Path("gallery.yml")
DST = Path("_build/temp/gallery.txt")

def esc(t: str) -> str:
    # Minimal escaping for safety inside Markdown
    return html.escape(t or "", quote=False)

items = yaml.safe_load(SRC.read_text(encoding="utf-8"))
random.shuffle(items)

lines = []

lines.append("::::{grid} 1 1 1 1")

for it in items:
    name = esc(it.get("name", ""))
    website = it.get("website", "") or it.get("repository", "") or ""
    repo = it.get("repository", "")
    image = it.get("image", "")
    desc = esc(it.get("description", ""))
    key = it.get("tags","")

    
    # Create the card
    lines.append(f"````{{card}}")
    
    lines.append(f":link: {website}")
    lines.append(f":header: [{name}]({repo})")
    lines.append(f"")

    # Include the figure with description
    lines.append("```{figure} " + image)
    lines.append(":class: card-img-limit")
    lines.append("")
    lines.append(desc)
    lines.append("```")

    lines.append("````")
    lines.append(f"")

    # Include index
    # lines.append(f":::{{index}} {key}")
    # lines.append(":::")

# close grid
lines.append("::::")
lines.append("")  # trailing newline

DST.parent.mkdir(parents=True, exist_ok=True)
DST.write_text("\n".join(lines), encoding="utf-8")

print(f"✅ gallery.txt generated at {DST}")
