// GitHub Handle Links Plugin
// Automatically converts @username mentions into links to GitHub profiles

const SIMPLE_HANDLE =
  /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/;

// ============================================================================
// Tree Traversal
// ============================================================================

function visit(node, parent, callback) {
  if (!node) return;
  callback(node, parent);
  if (Array.isArray(node.children)) {
    node.children.forEach((child) => visit(child, node, callback));
  }
}

// ============================================================================
// GitHub API
// ============================================================================

async function fetchProfile(handle) {
  const headers = { Accept: "application/vnd.github+json" };
  const token = process?.env?.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`https://api.github.com/users/${handle}`, {
    headers,
  });
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  const profile = {
    login: data.login || handle,
    url: data.html_url || `https://github.com/${handle}`,
  };
  return profile;
}

async function fetchProfiles(handles) {
  const profiles = new Map();
  const results = await Promise.all(
    Array.from(handles).map(async (handle) => {
      const profile = await fetchProfile(handle);
      return { handle, profile };
    })
  );

  results.forEach(({ handle, profile }) => {
    if (profile) {
      profiles.set(handle, profile);
    }
  });

  return profiles;
}

function collectCiteMentions(root) {
  const mentions = [];
  visit(root, null, (node, parent) => {
    if (!node || node.type !== "cite") return;
    if (!parent || !Array.isArray(parent.children)) return;
    const label = node.label || node.identifier || "";
    const handle = (node.identifier || label || "").replace(/^@/, "");
    const lower = handle.toLowerCase();
    if (!handle) return;
    // Quick check to make sure it's a valid GitHub handle syntax
    if (!SIMPLE_HANDLE.test(handle)) return;
    mentions.push({ node, parent, handle, lower, label: label || handle });
  });
  return mentions;
}

// ============================================================================
// Mention Replacement
// ============================================================================

function createLinkNode(profile, text) {
  return {
    type: "link",
    url: profile.url,
    title: `GitHub profile for ${profile.login}`,
    children: [{ type: "text", value: text }],
    data: {
      hProperties: {
        class: "github-handle-link",
        "data-github-user": profile.login,
      },
    },
  };
}

function replaceCiteNode({ node, parent, lower, label }, profiles) {
  if (!parent || !Array.isArray(parent.children)) return;
  const profile = profiles.get(lower);
  if (!profile) return;
  const index = parent.children.indexOf(node);
  if (index === -1) return;
  parent.children.splice(index, 1, createLinkNode(profile, `@${label}`));
}

const replaceCiteMentions = (mentions, profiles) =>
  mentions.forEach((mention) => replaceCiteNode(mention, profiles));

// ============================================================================
// Plugin
// ============================================================================

const plugin = {
  name: "GitHub Handle Links",
  transforms: [
    {
      name: "github-handle-links",
      stage: "document",
      // Runs after the document has been parsed so we can inspect resolved references
      plugin: () => {
        return async (tree, file) => {
          const citeMentions = collectCiteMentions(tree);
          const handles = new Set();
          citeMentions.forEach((mention) => handles.add(mention.lower));

          if (!handles.size) return;

          const profiles = await fetchProfiles(handles);
          replaceCiteMentions(citeMentions, profiles);
        };
      },
    },
  ],
};

export default plugin;
