/**
 * github.js
 * Fetches live public repo stats (stars, forks, last commit, language)
 * from the unauthenticated GitHub REST API, client-side. Results are
 * cached in-memory for the session so re-filtering the project list
 * never re-fetches a repo we already have.
 *
 * Unauthenticated GitHub API is rate-limited to 60 requests/hour per
 * IP — fine for six repos loaded once per visit. Failures (rate limit,
 * offline, private repo) degrade silently: the card just keeps its
 * static tag list with no stats row, nothing breaks.
 */

const githubStatsCache = new Map();

/**
 * Extracts "owner/repo" from a github.com URL. Returns null if the
 * URL doesn't look like a repo link (e.g. a bare profile URL).
 */
function parseRepoPath(githubUrl) {
  try {
    const url = new URL(githubUrl);
    if (url.hostname !== "github.com") return null;
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return `${parts[0]}/${parts[1]}`;
  } catch (e) {
    return null;
  }
}

/**
 * Formats an ISO date string as a short relative time ("3d ago",
 * "2mo ago") for compact display inside a project card.
 */
function formatRelativeTime(isoString) {
  const then = new Date(isoString).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "today";
  if (diffDays === 1) return "1d ago";
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears}y ago`;
}

/**
 * Fetches stats for a single "owner/repo" path. Returns null on any
 * failure (network error, 404, rate limit) rather than throwing, so
 * callers can just skip rendering that card's stats row.
 */
async function fetchRepoStats(repoPath) {
  if (githubStatsCache.has(repoPath)) {
    return githubStatsCache.get(repoPath);
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) {
      githubStatsCache.set(repoPath, null);
      return null;
    }
    const json = await res.json();
    const stats = {
      stars: json.stargazers_count ?? 0,
      forks: json.forks_count ?? 0,
      language: json.language || null,
      pushedAt: json.pushed_at || null,
    };
    githubStatsCache.set(repoPath, stats);
    return stats;
  } catch (e) {
    githubStatsCache.set(repoPath, null);
    return null;
  }
}

/**
 * Fetches stats for every project in parallel and invokes
 * onEachResolved(project, stats) as each individual request settles
 * — so the UI can update card-by-card instead of waiting for the
 * slowest request.
 */
function loadAllRepoStats(projects, onEachResolved) {
  projects.forEach((project) => {
    const repoPath = parseRepoPath(project.url);
    if (!repoPath) return;

    fetchRepoStats(repoPath).then((stats) => {
      if (stats) onEachResolved(project, stats);
    });
  });
}
