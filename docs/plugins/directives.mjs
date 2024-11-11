import { u } from "unist-builder";
import { defaultDirectives } from "myst-directives";
import { defaultRoles } from "myst-roles";

const REF_PATTERN = /^(.+?)<([^<>]+)>$/; // e.g. 'Labeled Reference <ref>'

/**
 * Create a documentation section for a directive
 *
 * @type {import('myst-common').RoleSpec}
 */
const mystDirectiveRole = {
  name: "myst:directive",
  body: {
    type: String,
    required: true,
  },
  run(data) {
    const match = REF_PATTERN.exec(data.body);
    const [, modified, rawLabel] = match ?? [];
    const label = rawLabel ?? data.body;
    const [name, opt] = label?.split(".") ?? [];
    const directive = defaultDirectives.find(
      (d) => d.name === name || d.alias?.includes(name)
    );
    const identifier = opt
      ? `directive-${directive?.name ?? name}-${opt}`
      : `directive-${directive?.name ?? name}`;
    var textToDisplay = modified?.trim() || name;
    if (opt) {
      textToDisplay = `${textToDisplay}.${opt}`;
    }
    return [
      u(
        "crossReference",
        {
          identifier,
          dataUrl: "/directives.json",
          remoteBaseUrl: "https://mystmd.org/guide",
          url: "/directives",
          remote: true,
        },
        [u("inlineCode", `{${textToDisplay}}`)]
      ),
    ];
  },
};

/**
 * Create a documentation section for a directive
 *
 * @type {import('myst-common').RoleSpec}
 */
const mystRoleRole = {
  name: "myst:role",
  body: {
    type: String,
    required: true,
  },
  run(data) {
    const match = REF_PATTERN.exec(data.body);
    const [, modified, rawLabel] = match ?? [];
    const label = rawLabel ?? data.body;
    const [name, opt] = label?.split(".") ?? [];
    const role = defaultRoles.find(
      (d) => d.name === name || d.alias?.includes(name)
    );
    const identifier = opt
      ? `role-${role?.name ?? name}-${opt}`
      : `role-${role?.name ?? name}`;
    var textToDisplay = modified?.trim() || name;
    if (opt) {
      textToDisplay = `${textToDisplay}.${opt}`;
    }
    return [
      u(
        "crossReference",
        {
          identifier,
          dataUrl: "/directives.json",
          remoteBaseUrl: "https://mystmd.org/guide",
          url: "/directives",
          remote: true,
        },
        [u("inlineCode", `{${textToDisplay}}`)]
      ),
    ];
  },
};

/**
 * @type {import('myst-common').MystPlugin}
 */
const plugin = {
  name: "MyST Documentation Plugins",
  author: "Rowan Cockett",
  license: "MIT",
  roles: [mystDirectiveRole, mystRoleRole],
};

export default plugin;
