/**
 * filter.js — pure filtering logic, decoupled from React so it's
 * trivial to reason about (and unit test) independently.
 */

export function projectMatchesTags(project, activeTags) {
  if (!activeTags || activeTags.length === 0) return true;
  return activeTags.every((tag) => project.tags.includes(tag));
}

export function projectMatchesQuery(project, query) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (q.length === 0) return true;

  const haystack = [project.name, project.tagline, project.description, ...project.tags]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export function filterProjects(projects, state) {
  const { activeTags = [], query = "" } = state;
  return projects.filter(
    (project) => projectMatchesTags(project, activeTags) && projectMatchesQuery(project, query)
  );
}

export function toggleTag(activeTags, tagId) {
  if (activeTags.includes(tagId)) {
    return activeTags.filter((t) => t !== tagId);
  }
  return [...activeTags, tagId];
}
