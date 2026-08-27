/**
 * filter.js
 * Pure filtering logic, decoupled from the DOM so it's easy to
 * reason about and (in principle) unit test independently.
 */

/**
 * Returns true if a project matches every currently active tag filter.
 * Empty activeTags => matches everything.
 */
function projectMatchesTags(project, activeTags) {
  if (!activeTags || activeTags.length === 0) return true;
  return activeTags.every((tag) => project.tags.includes(tag));
}

/**
 * Returns true if a project matches a free-text search query against
 * its name, tagline, description, and tags.
 */
function projectMatchesQuery(project, query) {
  if (!query) return true;
  const q = query.trim().toLowerCase();
  if (q.length === 0) return true;

  const haystack = [
    project.name,
    project.tagline,
    project.description,
    ...project.tags,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

/**
 * Combines tag + text filtering into a single filtered list.
 * @param {Array} projects - full project list
 * @param {Object} state - { activeTags: string[], query: string }
 */
function filterProjects(projects, state) {
  const { activeTags = [], query = "" } = state;
  return projects.filter(
    (project) =>
      projectMatchesTags(project, activeTags) &&
      projectMatchesQuery(project, query)
  );
}

/**
 * Toggles a tag inside an array of active tags, returning a new array
 * (never mutates the input) so state changes stay predictable.
 */
function toggleTag(activeTags, tagId) {
  if (activeTags.includes(tagId)) {
    return activeTags.filter((t) => t !== tagId);
  }
  return [...activeTags, tagId];
}
