function makeRole(key, value) {
  return {
    name: `xref:${key}`,
    doc: `A role that adds emphasis for ${key}`,
    body: {
      type: "myst",
    },
    run(data) {
      const img = {
        type: "span",
        style: { color: value, "font-family": "mono" },
        children: data.body,
      };
      return [img];
    },
  };
}

const meta = {
  scheme: "#f59e0b",
  resource: "#ef4444",
  path: "#0ea5e9",
  identifier: "#22c55e",
};

const plugin = {
  name: "XRef formatting extensions",
  roles: Object.entries(meta).map(([key, value]) => makeRole(key, value)),
};

export default plugin;
