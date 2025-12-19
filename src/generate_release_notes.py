#!/usr/bin/env python3
"""
Script to generate release notes from GitHub releases in the jupyter-book org.
"""

import json
import re
import subprocess
import sys
import shutil
from datetime import datetime
from pathlib import Path


def format_date(date_str):
    """Convert ISO date string to readable format like 'June 17th, 2025'"""
    date_obj = datetime.strptime(date_str, "%Y-%m-%d")

    # Get month name
    month = date_obj.strftime("%B")

    # Get day with ordinal suffix
    day = date_obj.day
    if 4 <= day <= 20 or 24 <= day <= 30:
        suffix = "th"
    else:
        suffix = ["st", "nd", "rd"][day % 10 - 1]

    # Get year
    year = date_obj.year

    return f"{month} {day}{suffix}, {year}"


def main():
    # Check if gh command exists
    try:
        subprocess.run(["gh", "--version"], capture_output=True, check=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Error: GitHub CLI (gh) is not installed or not available in PATH")
        print("Please install it from: https://cli.github.com/")
        sys.exit(1)

    # Configuration
    org = "jupyter-book"
    releases_dir = Path("docs/release")

    # Clean and ensure directories exist
    if releases_dir.exists():
        shutil.rmtree(releases_dir)
    releases_dir.mkdir(parents=True, exist_ok=True)

    print(f"Fetching all repositories from {org} organization...")

    # Fetch all repositories
    try:
        result = subprocess.run(
            ["gh", "api", f"orgs/{org}/repos", "--paginate"],
            capture_output=True,
            text=True,
            check=True,
        )
        repos = json.loads(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error fetching repositories: {e}")
        sys.exit(1)

    # Use this to exclude repositories that are particularly noisy we can focus on the marquee projects.
    EXCLUDE_REPOSITORIES = ["myst-plugins", "workshop-template"]
    repos = [repo for repo in repos if repo["name"] not in EXCLUDE_REPOSITORIES]

    print("Fetching releases from all repositories...")

    all_releases = []

    for repo in repos:
        repo_name = repo["name"]
        print(f"Fetching releases from {repo_name}...")

        try:
            result = subprocess.run(
                ["gh", "api", f"repos/{org}/{repo_name}/releases", "--paginate"],
                capture_output=True,
                text=True,
                check=True,
            )
            releases = json.loads(result.stdout)

            for release in releases:
                release["repo_name"] = repo_name
                all_releases.append(release)

        except subprocess.CalledProcessError:
            print(f"No releases found for {repo_name}")
        except json.JSONDecodeError:
            print(f"Error parsing releases for {repo_name}")

    # Filter out releases without a publication date
    all_releases = [r for r in all_releases if r.get("published_at")]

    total = len(all_releases)
    print(f"Found {total} total releases")

    for release in all_releases:
        title = release["name"] or release["tag_name"]
        repo_name = release["repo_name"]

        # Add repository name to title if it's not already present
        # Normalize both strings by replacing hyphens, underscores, and spaces
        normalized_repo = (
            repo_name.lower().replace("-", "").replace("_", "").replace(" ", "")
        )
        normalized_title = (
            title.lower().replace("-", "").replace("_", "").replace(" ", "")
        )

        if normalized_repo not in normalized_title:
            title = f"{repo_name} {title}"

        date = release["published_at"][:10]
        body = release["body"] or ""

        # Generate human-readable URL from tag (e.g., mystmd@1.7.1 -> /release/mystmd-1.7.1)
        tag_name = release["tag_name"]
        url_slug = tag_name.replace("@", "-")
        url = f"/release/{url_slug}"

        # Wrap @mentions in backticks (only if preceded by space, (, comma, or [, and not already wrapped)
        body = re.sub(r"(?<=[\s(,\[])@(\w+)(?!`)", r"`@\1`", body)

        # Create filename based on tag name
        safe_tag = re.sub(r"[^a-zA-Z0-9-.]", "-", tag_name.lower())
        filename = releases_dir / f"{repo_name}-{safe_tag}.md"

        # Write the markdown file
        with open(filename, "w") as f:
            f.write("---\n")
            f.write(f"title: {title}\n")
            f.write(f"date: {date}\n")
            f.write(f"url: {url}\n")
            f.write(f"repository: {repo_name}\n")
            f.write("author: The Jupyter Book Team\n")
            f.write("tags:\n")
            f.write("  - release\n")
            f.write("---\n\n")
            f.write(
                f"{{button}}`Release Source <{release['html_url']}>`\n\n"
            )
            f.write(body)
            f.write("\n")

        print(f"Generated: {filename}")

    print("Release posts generated successfully!")


if __name__ == "__main__":
    main()
