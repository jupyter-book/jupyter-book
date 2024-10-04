import chalk from "chalk";
import { Command } from "commander";
import { Session, init, makeSiteOption } from "myst-cli";
import { clirun } from "./clirun.js";
import {
  makeProjectOption,
  makeWriteTOCOption,
  makeGithubPagesOption,
  makeGithubCurvenoteOption,
} from "./options.js";

export function makeInitCLI(program: Command) {
  const command = new Command("init")
    .description(
      `Initialize a ${chalk.blue("mystmd")} project in the current directory`
    )
    .addOption(
      makeProjectOption(
        `Initialize ${chalk.blue("mystmd")} project configuration`
      )
    )
    .addOption(
      makeSiteOption(`Initialize ${chalk.blue("mystmd")} site configuration`)
    )
    .addOption(makeWriteTOCOption())
    .addOption(makeGithubPagesOption())
    .addOption(makeGithubCurvenoteOption())
    .action(clirun(Session, init, program));
  return command;
}

// The default command runs `myst init` with no arguments
export function addDefaultCommand(program: Command) {
  program.action(async (...args: any[]) => {
    if (program.args.length === 0) return clirun(Session, init, program)(args);
    console.error(
      `${chalk.red(`Invalid command: `)}${chalk.bold(
        program.args.join(" ")
      )}\n\n${chalk.dim("See --help for a list of available commands.\n")}`
    );
    console.log(program.helpInformation());
    process.exit(1);
  });
}
