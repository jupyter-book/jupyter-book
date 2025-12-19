// GitHub Issue Link Decorator Plugin
// Automatically decorates GitHub issue links with titles, state, and CSS classes

const ISSUE_LINK_REGEX =
  /^https:\/\/github\.com\/([^/]+\/[^/]+)\/issues\/(\d+)(?:[/?#].*)?$/;

// ============================================================================
// Title Cleaning
// ============================================================================

function stripBrackets(title) {
  // Remove [...] and (...) content from the beginning of titles
  return title.replace(/^(\[.*?\]|\(.*?\))\s*/g, "").trim();
}

// ============================================================================
// Cache Management
// ============================================================================
// ============================================================================
// GitHub API
// ============================================================================

async function getIssueDetails(repoSlug, issueNumber) {
  const apiUrl = `https://api.github.com/repos/${repoSlug}/issues/${issueNumber}`;
  const headers = { Accept: "application/vnd.github+json" };
  const token = process?.env?.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(apiUrl, { headers });
  if (!response.ok) {
    console.warn(
      `[github-issue-link] Failed to fetch ${apiUrl}: ${response.status}`,
    );
    return null;
  }

  const data = await response.json();
  const issueDetails = {
    title: data.title,
    state: data.state,
    state_reason: data.state_reason || "",
    url: data.html_url,
  };

  return issueDetails;
}

// ============================================================================
// Link Decoration
// ============================================================================

function ensureNodeData(node) {
  if (!node.data) node.data = {};
  if (!node.data.hProperties) node.data.hProperties = {};
}

function applyDecorations(node, details) {
  ensureNodeData(node);
  const props = node.data.hProperties;

  // Collect existing classes
  const existingPropsClasses =
    props.className ||
    props.class ||
    (Array.isArray(props.classNames) ? props.classNames.join(" ") : "");
  const propClassSet = new Set(
    typeof existingPropsClasses === "string"
      ? existingPropsClasses.split(/\s+/).filter(Boolean)
      : [],
  );
  const nodeClassSet = new Set(
    typeof node.class === "string" ? node.class.split(/\s+/).filter(Boolean) : [],
  );

  // Add GitHub issue classes
  const desiredClasses = [
    "github-issue-link",
    `github-issue-link--${details.state}`,
  ];
  desiredClasses.forEach((cls) => {
    propClassSet.add(cls);
    nodeClassSet.add(cls);
  });

  // Apply classes
  const classArray = Array.from(propClassSet);
  props.className = classArray;
  props.class = classArray.join(" ");
  node.class = Array.from(nodeClassSet).join(" ");

  // Add data attributes
  props["data-state"] = details.state;
  if (details.state_reason) {
    props["data-state-reason"] = details.state_reason;
  }
  props["data-issue-title"] = details.title;
}

async function decorateLink(node, parent, repoSlug, issueNumber, options) {
  const details = await getIssueDetails(repoSlug, issueNumber);
  if (!details) return;

  applyDecorations(node, details);
  if (options.replaceText) {
    // Strip brackets from title
    const cleanTitle = stripBrackets(details.title);

    // Replace link text with just the title (no emoji)
    node.children = [
      { type: "text", value: cleanTitle },
    ];

    // Insert emoji before the link (outside the link element)
    if (parent && Array.isArray(parent.children)) {
      const stateIcon = details.state === "open" ? "🟢" : "🟣";
      const linkIndex = parent.children.indexOf(node);
      if (linkIndex !== -1) {
        parent.children.splice(linkIndex, 0, {
          type: "text",
          value: `${stateIcon} `,
        });
      }
    }
  }
}

// ============================================================================
// Tree Walking
// ============================================================================

function walk(node, parent, callback) {
  if (!node) return;
  callback(node, parent);
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      walk(child, node, callback);
    }
  }
}

// ============================================================================
// Transform
// ============================================================================

const githubIssueLinkTransform = {
  name: "github-issue-link-transform",
  stage: "document",
  doc: "Decorate GitHub issue links with titles, classes, and data attributes.",
  plugin: () => {
    return async (tree) => {
      const candidates = [];

      walk(tree, null, (node, parent) => {
        if (node?.type !== "link" || !node.url) return;

        const match = node.url.match(ISSUE_LINK_REGEX);
        if (!match) return;

        const isBareLink =
          Array.isArray(node.children) &&
          node.children.length === 1 &&
          node.children[0]?.type === "text" &&
          node.children[0]?.value === node.url;

        candidates.push({
          node,
          parent,
          repoSlug: match[1],
          issueNumber: match[2],
          replaceText: isBareLink,
        });
      });

      await Promise.all(
        candidates.map(({ node, parent, repoSlug, issueNumber, replaceText }) =>
          decorateLink(node, parent, repoSlug, issueNumber, { replaceText }),
        ),
      );
    };
  },
};

const plugin = {
  name: "GitHub Issue Link Plugin",
  transforms: [githubIssueLinkTransform],
};

export default plugin;
