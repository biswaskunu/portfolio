/**
 * render.js
 * Each function renders exactly one section/component into a given
 * container element. No filtering logic lives here — it only reads
 * data/state and produces DOM.
 */

function renderHeroStats(container, stats) {
  container.innerHTML = stats
    .map(
      (s) => `
      <div class="stat">
        <span class="stat-value">${s.value}</span>
        <span class="stat-label">${s.label}</span>
      </div>`
    )
    .join("");
}

function renderFilterChips(container, tags, activeTags) {
  container.innerHTML = tags
    .map((tag) => {
      const isActive = activeTags.includes(tag.id);
      return `
        <button
          class="chip ${isActive ? "chip-active" : ""}"
          type="button"
          data-tag="${tag.id}"
          aria-pressed="${isActive}"
        >${tag.label}</button>`;
    })
    .join("");
}

function statusLabel(status) {
  return status === "in-progress" ? "In progress" : "Shipped";
}

function renderProjectList(container, projects) {
  if (projects.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No projects match that filter.</p>
        <p class="empty-sub">Try clearing a chip or the search box above.</p>
      </div>`;
    return;
  }

  container.innerHTML = projects
    .map(
      (p) => `
      <article class="project-card" data-project-id="${p.id}">
        <div class="project-card-top">
          <div>
            <span class="project-status status-${p.status}">${statusLabel(p.status)}</span>
            <h3 class="project-name">${p.name}</h3>
            <p class="project-tagline">${p.tagline}</p>
          </div>
          <a class="project-link" href="${p.url}" target="_blank" rel="noopener" aria-label="Open ${p.name} on GitHub">↗</a>
        </div>
        <p class="project-desc">${p.description}</p>
        <div class="project-github-stats" data-stats-for="${p.id}" aria-live="polite"></div>
        <div class="project-footer">
          <div class="project-tags">
            ${p.tags
              .map((t) => `<span class="tag-pill">${t}</span>`)
              .join("")}
          </div>
          <span class="project-repo">${p.repo}</span>
        </div>
      </article>`
    )
    .join("");
}

/**
 * Patches a single project card's stats row once its GitHub data has
 * resolved, rather than re-rendering the whole list (which would
 * lose scroll position / hover state on every request that settles).
 */
function renderProjectStats(container, projectId, stats) {
  const slot = container.querySelector(`[data-stats-for="${projectId}"]`);
  if (!slot) return;

  const bits = [
    `<span class="gh-stat" title="Stars">★ ${stats.stars}</span>`,
    `<span class="gh-stat" title="Forks">⑂ ${stats.forks}</span>`,
  ];
  if (stats.language) {
    bits.push(`<span class="gh-stat gh-lang" title="Primary language">${stats.language}</span>`);
  }
  if (stats.pushedAt) {
    bits.push(`<span class="gh-stat gh-pushed" title="Last commit">updated ${formatRelativeTime(stats.pushedAt)}</span>`);
  }

  slot.innerHTML = bits.join("");
  slot.classList.add("stats-loaded");
}

function renderFilterCount(el, count, total) {
  el.textContent = `${count} of ${total} projects match`;
}

function renderStackGrid(container, stack) {
  container.innerHTML = stack
    .map(
      (s) => `
      <div class="stack-card">
        <h3 class="stack-name">${s.name}</h3>
        <p class="stack-role">${s.role}</p>
        <p class="stack-detail">${s.detail}</p>
      </div>`
    )
    .join("");
}

function renderLogGrid(container, entries) {
  container.innerHTML = entries
    .map(
      (e) => `
      <div class="log-card">
        <span class="log-kind">${e.kind}</span>
        <h3 class="log-title">${e.title}</h3>
        <p class="log-detail">${e.detail}</p>
      </div>`
    )
    .join("");
}
