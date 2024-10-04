#!/usr/bin/env node
import "core-js/actual"; // This adds backwards compatible functionality for various CLIs

// This suppresses the punycode deprecation warning
// https://github.com/jupyter-book/mystmd/issues/1166
const { emit: originalEmit } = process;
function suppressor(event: string, error: Error) {
  return event === "warning" && error.name === "DeprecationWarning"
    ? false
    : // eslint-disable-next-line prefer-rest-params
      originalEmit.apply(process, arguments);
}
(process as any).emit = suppressor;

import { Command } from "commander";
import version from "./version.js";
import { makeBuildCLI } from "./build.js";
import { makeCleanCLI } from "./clean.js";
import { makeInitCLI, addDefaultCommand } from "./init.js";
import { makeStartCLI } from "./site.js";
import { makeTemplatesCLI } from "./templates.js";
import chalk from "chalk";

const program = new Command();

program.description(
  `Jupyter Book is powered by ${chalk.blue(
    "mystmd"
  )}. See https://mystmd.org for more information.`
);

program.addCommand(makeInitCLI(program));
program.addCommand(makeBuildCLI(program));
program.addCommand(makeStartCLI(program));
program.addCommand(makeCleanCLI(program));
program.addCommand(makeTemplatesCLI(program));
program.version(
  `v${version}`,
  "-v, --version",
  `Print the current version of Jupyter Book`
);
program.option("-d, --debug", "Log out any errors to the console");
addDefaultCommand(program);
program.parse(process.argv);
