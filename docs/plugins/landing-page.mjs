const heroDirective = {
  name: `hero`,
  doc: `A directive for a hero section`,
  body: {
    type: "myst",
  },
  run(data) {
    const div = {
      type: "div",
      style: {
        fontWeight: "bold",
        fontSize: "4em",
        maxWidth: "50%",
        margin: ".5em auto",
        textAlign: "center",
        lineHeight: "normal",
      },
      children: data.body,
    };
    return [div];
  },
};

const largeRole = {
  name: `large`,
  doc: `A role for large text`,
  body: {
    type: "myst",
  },
  run(data) {
    const div = {
      type: "span",
      style: { fontSize: "1.5em" },
      children: data.body,
    };
    return [div];
  },
};

const orangeRole = {
  name: `orange`,
  doc: `A role for Jupyter orange text`,
  body: {
    type: "myst",
  },
  run(data) {
    const div = {
      type: "span",
      style: { color: "#e07330" },
      children: data.body,
    };
    return [div];
  },
};

const plugin = {
  name: "Landing page extensions",
  roles: [largeRole, orangeRole],
  directives: [heroDirective],
};

export default plugin;
