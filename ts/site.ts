import type { Command } from 'commander';
import { Session, startServer, makeStartCommand } from 'myst-cli';
import { spawnSync } from 'child_process';
import { copyFileSync, existsSync, rmSync } from 'fs';
import { join } from 'path';
import { clirun } from './clirun.js';

function runCliCommand(session: Session, command: string, args: string[]) {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
  if (result.error) {
    session.log.debug(
      `Failed to run command "${command} ${args.join(' ')}": ${result.error.message}`,
    );
    return false;
  }
  if (result.status !== 0) {
    session.log.error(`Command failed: ${command} ${args.join(' ')}`);
    throw new Error(`Unable to continue "jupyter book start".`);
  }
  return true;
}

function prepareCustomStartServer(session: Session) {
  if (process.env.JUPYTER_BOOK_SKIP_CUSTOM_SERVER === '1') return;

  const cwd = process.cwd();
  const customServerPath = join(cwd, '_static', 'js', 'server.js');
  if (!existsSync(customServerPath)) return;

  const siteBuildPath = join(cwd, '_build', 'site');
  const generatedServerPath = join(
    cwd,
    '_build',
    'templates',
    'site',
    'myst',
    'book-theme',
    'server.js',
  );

  session.log.info('Detected _static/js/server.js, preparing custom server injection.');
  rmSync(siteBuildPath, { recursive: true, force: true });

  const builtWithJupyter = runCliCommand(session, 'jupyter', ['book', 'build']);
  if (!builtWithJupyter) {
    runCliCommand(session, 'jupyter-book', ['build']);
  }

  if (!existsSync(generatedServerPath)) {
    throw new Error(
      `Expected generated server template at "${generatedServerPath}", but it was not found.`,
    );
  }

  copyFileSync(customServerPath, generatedServerPath);
  session.log.info('Injected custom server template from _static/js/server.js.');
}

async function startWithCustomServer(session: Session, ...args: any[]) {
  prepareCustomStartServer(session);
  await startServer(session, ...args);
}

export function makeStartCLI(program: Command) {
  const command = makeStartCommand().action(clirun(Session, startWithCustomServer, program));
  return command;
}
