import { useEffect, useRef, useState } from "react";

/**
 * useGithubStats — fetches live public repo stats (stars, forks,
 * last commit, language) from the unauthenticated GitHub REST API.
 * Cached in a module-level Map for the session so re-filtering the
 * project list never re-fetches a repo we already have.
 *
 * Unauthenticated GitHub API is rate-limited to 60 req/hr per IP —
 * fine for a handful of repos loaded once per visit. Failures
 * (rate limit, offline, private repo) degrade silently: the card
 * just keeps its static tag list with no stats row.
 */

const statsCache = new Map();

export function parseRepoPath(githubUrl) {
  try {
    const url = new URL(githubUrl);
    if (url.hostname !== "github.com") return null;
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return `${parts[0]}/${parts[1]}`;
  } catch {
    return null;
  }
}

export function formatRelativeTime(isoString) {
  const then = new Date(isoString).getTime();
  const now = Date.now();
  const diffDays = Math.floor((now - then) / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "today";
  if (diffDays === 1) return "1d ago";
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${Math.floor(diffMonths / 12)}y ago`;
}

async function fetchRepoStats(repoPath) {
  if (statsCache.has(repoPath)) return statsCache.get(repoPath);

  try {
    const res = await fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) {
      statsCache.set(repoPath, null);
      return null;
    }
    const json = await res.json();
    const stats = {
      stars: json.stargazers_count ?? 0,
      forks: json.forks_count ?? 0,
      language: json.language || null,
      pushedAt: json.pushed_at || null,
    };
    statsCache.set(repoPath, stats);
    return stats;
  } catch {
    statsCache.set(repoPath, null);
    return null;
  }
}

/**
 * Returns { statsById } where statsById[project.id] fills in
 * card-by-card as each request resolves — no waiting for the
 * slowest repo before anything appears.
 */
export function useGithubStats(projects) {
  const [statsById, setStatsById] = useState({});
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    // Paint any already-cached stats instantly (e.g. after a re-filter).
    const cached = {};
    projects.forEach((p) => {
      const repoPath = parseRepoPath(p.url);
      if (repoPath && statsCache.has(repoPath)) {
        const s = statsCache.get(repoPath);
        if (s) cached[p.id] = s;
      }
    });
    if (Object.keys(cached).length) {
      setStatsById((prev) => ({ ...prev, ...cached }));
    }

    projects.forEach((p) => {
      const repoPath = parseRepoPath(p.url);
      if (!repoPath || statsCache.has(repoPath)) return;
      fetchRepoStats(repoPath).then((stats) => {
        if (!mounted.current || !stats) return;
        setStatsById((prev) => ({ ...prev, [p.id]: stats }));
      });
    });

    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return statsById;
}
