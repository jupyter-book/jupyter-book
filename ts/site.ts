import type { Command } from 'commander';
import { Session, startServer, makeStartCommand } from 'myst-cli';
import { clirun } from './clirun.js';

export function makeStartCLI(program: Command) {
  const command = makeStartCommand().action(clirun(Session, startServer, program));
  return command;
}
