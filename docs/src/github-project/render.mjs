#!/usr/bin/env node
import { graphql } from "@octokit/graphql";
import dayjs from "dayjs";
import { markdownTable } from "markdown-table";

/**
 * Parse CLI flags (`--owner`, `--project`, `--view`). Keeps the renderer easy to poke.
 */
const args = parseArgs(process.argv.slice(2));
const owner = args.owner ?? "jupyter-book";
const project = Number(args.project ?? 1);
const viewName = args.view ?? "Team Priorities";

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("Set GITHUB_TOKEN to query the GitHub API.");
  process.exit(1);
}

const client = graphql.defaults({
  headers: { authorization: `bearer ${token}` },
});

// Minimal query: grab every item + the single-select values we care about.
const ITEMS_QUERY = `
  query ($org: String!, $number: Int!, $cursor: String) {
    organization(login: $org) {
      projectV2(number: $number) {
        items(first: 50, after: $cursor, orderBy: {field: POSITION, direction: ASC}) {
          nodes {
            content {
              __typename
              ... on Issue {
                title
                url
                updatedAt
                repository { nameWithOwner url }
              }
              ... on PullRequest {
                title
                url
                updatedAt
                repository { nameWithOwner url }
              }
            }
            fieldValues(first: 25) {
              nodes {
                __typename
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                  field { ... on ProjectV2SingleSelectField { name } }
                }
              }
            }
          }
          pageInfo { hasNextPage endCursor }
        }
      }
    }
  }
`;

const nodes = await fetchItems(owner, project);
const rows = sortRows(filterRows(normalizeItems(nodes)));
const markdown = buildMarkdown(viewName, rows);
process.stdout.write(markdown);

async function fetchItems(owner, project) {
  const rows = [];
  let cursor = null;
  // Walk every page to preserve the board order GitHub shows in the UI.
  while (true) {
    const data = await client(ITEMS_QUERY, { org: owner, number: project, cursor });
    const connection = data?.organization?.projectV2?.items;
    rows.push(...(connection?.nodes ?? []));
    if (!connection?.pageInfo?.hasNextPage) break;
    cursor = connection.pageInfo.endCursor;
  }
  return rows;
}

function normalizeItems(nodes) {
  return nodes.map((node) => {
    const content = node?.content ?? {};
    const fields = {};
    for (const value of node?.fieldValues?.nodes ?? []) {
      if (value?.__typename !== "ProjectV2ItemFieldSingleSelectValue") continue;
      const fieldName = value.field?.name;
      if (fieldName) fields[fieldName] = value.name;
    }
    return {
      title: content.title ?? "Untitled",
      url: content.url ?? "",
      repoName: content.repository?.nameWithOwner ?? "",
      repoUrl: content.repository?.url ?? "",
      lastUpdated: content.updatedAt ?? "",
      fields,
    };
  });
}

function filterRows(rows) {
  // Keep active priorities only; done or untagged work is noise for this page.
  return rows.filter((row) => {
    const priority = row.fields["Team Priority"];
    const status = row.fields["Status"];
    return priority && status !== "Done";
  });
}

function sortRows(rows) {
  const order = { Priority: 0, "Side Quest": 1 };
  return [...rows].sort((a, b) => {
    const aOrder = order[a.fields["Team Priority"]] ?? 2;
    const bOrder = order[b.fields["Team Priority"]] ?? 2;
    if (aOrder !== bOrder) return aOrder - bOrder;
    // Within each bucket, show the most recently updated work first.
    const aDate = dayjs(a.lastUpdated).valueOf() || 0;
    const bDate = dayjs(b.lastUpdated).valueOf() || 0;
    return bDate - aDate;
  });
}

function buildMarkdown(viewName, rows) {
  if (!rows.length) {
    return `*No items matched the "${viewName}" project view.*`;
  }
  const table = markdownTable([
    ["priority", "title", "repo", "last_updated"],
    ...rows.map((row) => [
      row.fields["Team Priority"] ?? "",
      row.url ? `[${row.title}](${row.url})` : row.title,
      row.repoUrl ? `[${row.repoName}](${row.repoUrl})` : row.repoName,
      row.lastUpdated ? dayjs(row.lastUpdated).format("MMM Do, YYYY") : "",
    ]),
  ]);
  return `**${viewName}**\n\n${table}\n`;
}

function parseArgs(argv) {
  const result = {};
  for (let i = 0; i < argv.length; i += 2) {
    const key = argv[i];
    const value = argv[i + 1];
    if (!key?.startsWith("--") || value === undefined) continue;
    result[key.slice(2)] = value;
  }
  return result;
}
