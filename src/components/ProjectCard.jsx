import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { StaggerItem } from "../fx/AnimatedContent.jsx";
import { formatRelativeTime } from "../hooks/useGithubStats.js";

const EASE = [0.16, 1, 0.3, 1];

function statusLabel(status) {
  return status === "in-progress" ? "In progress" : "Shipped";
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.4l-5.81 3l1.11-6.47L2.6 9.35l6.5-.95L12 2.5z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="6" r="2.4" />
      <circle cx="12" cy="18" r="2.4" />
      <path d="M6 8.4v1.6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8.4M12 12v3.6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/**
 * ProjectCard
 * Full-width horizontal row: project name on the left, GitHub link +
 * star/fork counters as icon pills on the right. Hovering the row
 * expands it vertically (ease-out height animation) to reveal the
 * description, live language / last-commit stats and the tag list;
 * leaving the row collapses it again — no sticky open state.
 * Keeps the section's existing border-glow treatment.
 */
export default function ProjectCard({ project, stats, index }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const loaded = Boolean(stats);

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : {
        height: { duration: 0.5, ease: EASE },
        opacity: { duration: 0.35, ease: EASE, delay: open ? 0.14 : 0 },
      };

  function handleMouseEnter() {
    setOpen(true);
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--glow-x", "50%");
    node.style.setProperty("--glow-y", "50%");
    node.style.setProperty("--glow-intensity", "1");
  }

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--glow-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    ref.current.style.setProperty("--glow-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    ref.current.style.setProperty("--glow-intensity", "1");
  }

  function handleMouseLeave() {
    setOpen(false);
    ref.current?.style.setProperty("--glow-intensity", "0");
  }

  return (
    <StaggerItem className="project-card-wrap">
      <motion.article
        ref={ref}
        className={`project-card magic-card ${open ? "is-open" : ""}`}
        data-project-id={project.id}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="project-row">
          <div className="project-row-main">
            {typeof index === "number" && (
              <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
            )}
            <span className="project-row-text">
              <span className="project-name">{project.name}</span>
              <span className="project-tagline">{project.tagline}</span>
            </span>
          </div>

          <div className="project-meta">
            <span className={`project-icon-stat ${loaded ? "stats-loaded" : ""}`} title="Stars">
              <StarIcon />
              <span className="project-icon-value">{loaded ? stats.stars : "··"}</span>
            </span>
            <span className={`project-icon-stat project-stat-fork ${loaded ? "stats-loaded" : ""}`} title="Forks">
              <ForkIcon />
              <span className="project-icon-value">{loaded ? stats.forks : "··"}</span>
            </span>
            <a
              className="project-icon-link"
              href={project.url}
              target="_blank"
              rel="noopener"
              aria-label={`Open ${project.name} on GitHub`}
            >
              <GitHubIcon />
            </a>
            <span className="project-chevron" aria-hidden="true">
              <ChevronIcon />
            </span>
          </div>
        </div>

        <motion.div
          className="project-panel"
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={panelTransition}
          style={{ overflow: "hidden" }}
        >
          <div className="project-panel-inner">
            <p className="project-desc">{project.description}</p>

            <div className={`project-github-stats ${loaded ? "stats-loaded" : ""}`} aria-live="polite">
              {stats?.language && (
                <span className="gh-stat gh-lang" title="Primary language">{stats.language}</span>
              )}
              {stats?.pushedAt && (
                <span className="gh-stat gh-pushed" title="Last commit">
                  updated {formatRelativeTime(stats.pushedAt)}
                </span>
              )}
              <span className="gh-stat gh-repo" title="Repository">{project.repo}</span>
            </div>

            <div className="project-footer">
              <div className="project-tags">
                {project.tags.map((t) => (
                  <span className="tag-pill" key={t}>{t}</span>
                ))}
              </div>
              <span className={`project-status status-${project.status}`}>{statusLabel(project.status)}</span>
            </div>
          </div>
        </motion.div>
      </motion.article>
    </StaggerItem>
  );
}
