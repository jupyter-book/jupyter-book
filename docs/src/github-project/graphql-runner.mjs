#!/usr/bin/env node
import { graphql } from "@octokit/graphql";

const payload = process.argv[2];
if (!payload) {
  console.error("Missing payload for Octokit GraphQL runner.");
  process.exit(1);
}

let args;
try {
  args = JSON.parse(payload);
} catch (error) {
  console.error(`Invalid JSON payload: ${error.message}`);
  process.exit(1);
}

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("Set GITHUB_TOKEN to query the GitHub API.");
  process.exit(1);
}

const client = graphql.defaults({
  headers: { authorization: `bearer ${token}` },
});

try {
  const data = await client(args.query, args.variables);
  process.stdout.write(JSON.stringify({ data }));
} catch (error) {
  const errPayload = {
    message: error?.message ?? String(error),
    errors: error?.errors ?? undefined,
  };
  console.error(JSON.stringify(errPayload));
  process.exit(1);
}
