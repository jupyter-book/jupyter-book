import chalk from "chalk";
import { Option } from "commander";

export function makeProjectOption(description: string) {
  return new Option("--project", description).default(false);
}

export function makeWriteTOCOption() {
  return new Option(
    "--write-toc",
    `Generate editable table of contents within your ${chalk.bold.blue(
      "myst.yml"
    )} file, if it does not exist`
  )
    .default(false)
    .implies({ writeTOC: true });
}

export function makeGithubPagesOption() {
  return new Option(
    "--gh-pages",
    `Creates a GitHub Action that will deploy your site to ${chalk.yellow(
      "Github Pages"
    )}`
  ).default(false);
}

export function makeGithubCurvenoteOption() {
  return new Option(
    "--gh-curvenote",
    `'Creates a GitHub Action that will deploy your site to ${chalk.yellow(
      "Curvenote"
    )}`
  ).default(false);
}
