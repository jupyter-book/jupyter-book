import type { Command } from 'commander';
import { Session, clean, makeCleanCommand } from 'myst-cli';
import { clirun } from './clirun.js';

export function makeCleanCLI(program: Command) {
  const command = makeCleanCommand().action(clirun(Session, clean, program));
  return command;
}
