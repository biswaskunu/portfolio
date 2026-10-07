import { useEffect, useMemo, useRef, useState } from "react";
import AnimatedContent, { StaggerGroup } from "../fx/AnimatedContent.jsx";
import ProjectCard from "./ProjectCard.jsx";
import { PROJECTS, TAGS } from "../data/data.js";
import { filterProjects, toggleTag } from "../data/filter.js";
import { useGithubStats } from "../hooks/useGithubStats.js";

export default function Work() {
  const [activeTags, setActiveTags] = useState([]);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);

  const filtered = useMemo(
    () => filterProjects(PROJECTS, { activeTags, query }),
    [activeTags, query]
  );

  const statsById = useGithubStats(PROJECTS);

  const hasFilters = activeTags.length > 0 || query.length > 0;

  function handleClear() {
    setActiveTags([]);
    setQuery("");
  }

  // "/" focuses search, mirroring GitHub/Slack — same shortcut as before.
  useEffect(() => {
    function handleKeydown(e) {
      const isTyping = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        searchRef.current?.focus();
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <section className="work reveal" id="work">
      <AnimatedContent className="section-head">
        <p className="section-eyebrow">01 — Project index</p>
        <h2 className="section-title">Find a project by stack</h2>
        <p className="section-desc">
          Every project below is a real, shipped repo — not a spec. Filter by the technology you care about.
        </p>
      </AnimatedContent>

      <AnimatedContent delay={0.05}>
        <div className="filter-bar" role="group" aria-label="Filter projects by technology">
          <div className="filter-search">
            <span className="filter-prompt">$ grep --stack</span>
            <input
              ref={searchRef}
              type="text"
              id="projectSearch"
              placeholder="search projects… (press / to focus)"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="filter-chips" id="filterChips">
            {TAGS.map((tag) => {
              const isActive = activeTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  className={`chip ${isActive ? "chip-active" : ""}`}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTags((prev) => toggleTag(prev, tag.id))}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
          {hasFilters && (
            <button className="filter-clear filter-clear-visible" type="button" onClick={handleClear}>
              Clear filters
            </button>
          )}
        </div>
      </AnimatedContent>

      <p className="filter-count" aria-live="polite">
        {filtered.length} of {PROJECTS.length} projects match
      </p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No projects match that filter.</p>
          <p className="empty-sub">Try clearing a chip or the search box above.</p>
        </div>
      ) : (
        <StaggerGroup className="project-list">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} stats={statsById[p.id]} index={i} />
          ))}
        </StaggerGroup>
      )}
    </section>
  );
}
