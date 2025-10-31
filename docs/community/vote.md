---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.17.1
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
---

# Vote on Issues

This page shows open issues sorted by community votes (👍 and ❤️ reactions)[^1].
If you'd like to see an issue get signal-boosted, add your own reaction and it'll change the order in the table here.[^2]

[^2]: _This is not a guarantee any of these will be worked on!_ It's just a way for the community to signal-boost things - our volunteer team ultimately works on what we can based on our capacity.

[^1]: This includes issues from both Jupyter Book repositories (including legacy Jupyter Book 1.0 issues) and the MyST Markdown engine repositories that power Jupyter Book 2.
Over time we'll try to clean this up so they only reflect Jupyter Book 2 / MyST Engine issues.


:::{note} The `github-data` repository provides this data
:class: dropdown
This data comes from [jupyter.org/github-data](https://jupyter.org/github-data), which scrapes GitHub data across the Jupyter project and exposes it as an accessible GitHub release artifact.

**Why we can't embed from github-data:** We'd prefer to embed this table directly from [jupyter.org/github-data](https://jupyter.org/github-data), but styled dataframes with Markdown formatting don't properly embed. See https://github.com/jupyter-book/mystmd/issues/2377
:::

```{code-cell} ipython3
---
tags: "remove-cell"
---
import pandas as pd
import sqlite3
import pooch
from markdown import markdown
```

```{code-cell} ipython3
---
tags: "remove-cell"
---
org = "jupyter-book"
```

```{code-cell} ipython3
---
tags: "remove-cell"
---
# Download latest release data for Jupyter Book
file_path = pooch.retrieve(
    url=f"https://github.com/jupyter/github-data/releases/download/latest/{org}.db",
    known_hash=None,
)
```

```{code-cell} ipython3
---
tags: "remove-cell"
---
def df_from_sql(query, db):
    con = sqlite3.connect(db)
    return pd.read_sql(query, con)
    con.close()
```

```{code-cell} ipython3
---
tags: "remove-cell"
---
repos = df_from_sql("SELECT * FROM repos;", file_path).set_index("id")
issues = df_from_sql("SELECT * FROM issues;", file_path)
issues = issues.query("state == 'open'")

# Add some metadata that will make the outputs nicer
for ix, irow in issues.iterrows():
    # Add number of positive reactions
    positive = 0
    for ii in ["+1", "heart", "hooray"]:
        positive += eval(irow["reactions"])[ii]
    issues.loc[ix, 'positive'] = int(positive)

    # Add the repository
    url_repo = repos.loc[irow["repo"]]["html_url"]
    url_repo_parts = url_repo.split("/")[-1]
    issues.loc[ix, "repo"] = f"[{url_repo_parts}]({url_repo})"

    # Add the URL of each issue
    url = f"{url_repo}/issues/{irow['number']}"
    issues.loc[ix, "mdtitle"] = f"[{irow['title']}]({url})"

# Add a short body
issues["bodyshort"] = issues["body"].map(lambda a: a.replace("#", "")[:400] if a else '')
```

```{code-cell} ipython3
---
tags: "remove-input"
label: jupyter-book-table
---
issues_sorted = issues.sort_values("positive", ascending=False).head(100)[["mdtitle", "repo", "bodyshort", "positive"]]
issues_sorted = issues_sorted.rename(columns={"bodyshort": "body", "mdtitle": "title", "positive": "👍"})

def render_markdown(text):
    if isinstance(text, str): # Ensure the cell content is a string
        return markdown(text)
    return text
md_cols = ["title", "body", "repo"]
styledict = {ii: render_markdown for ii in md_cols}
df_style = issues_sorted
styled_df = issues_sorted.style.format(styledict | {"👍": int}).hide(axis="index")
styled_df
```
