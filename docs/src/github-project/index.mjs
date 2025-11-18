import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

// `{github-project}` runs the small renderer script below. Keeping the logic in
// one file ensures future tweaks stay straightforward.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RENDER_SCRIPT = path.join(__dirname, "render.mjs");
const DEFAULT_OWNER = "jupyter-book";
const DEFAULT_PROJECT = 1;

const directive = {
  name: "github-project",
  doc: "Render a GitHub Project view as a table.",
  arg: { type: String, doc: "View name shown in the heading." },
  options: {
    owner: { type: String, doc: "Organization or user name." },
    project: { type: Number, doc: "Project number." },
  },
  run(data, vfile, ctx) {
    const options = data.options ?? {};
    const owner = options.owner ?? DEFAULT_OWNER;
    const project = options.project ?? DEFAULT_PROJECT;
    const viewName = data.arg?.trim() ?? "Team Priorities";
    const args = [RENDER_SCRIPT, "--owner", owner, "--project", String(project), "--view", viewName];
    let markdown = "";
    try {
      // Render synchronously so the directive can return AST immediately.
      markdown = execFileSync("node", args, {
        encoding: "utf8",
        env: process.env,
      });
    } catch (error) {
      const message = error.stderr?.toString() || error.message;
      throw new Error(`Failed to render project table: ${message}`);
    }
    return ctx.parseMyst(markdown).children;
  },
};

const plugin = {
  name: "GitHub project table",
  directives: [directive],
};

export default plugin;
