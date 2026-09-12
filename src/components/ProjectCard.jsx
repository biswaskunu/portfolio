import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { StaggerItem } from "../fx/AnimatedContent.jsx";
import { formatRelativeTime } from "../hooks/useGithubStats.js";

function statusLabel(status) {
  return status === "in-progress" ? "In progress" : "Shipped";
}

/**
 * ProjectCard
 * Uniform grid card with a light Magic-Bento-inspired treatment:
 * a cursor-tracked border glow (CSS custom properties, no gsap
 * needed) plus subtle tilt + magnetism via the same Framer Motion
 * springs. Kept deliberately understated — no particles, no global
 * spotlight, no click ripple — this is the "slight" version.
 */
export default function ProjectCard({ project, stats }) {
  const ref = useRef(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 20 });
  const x = useSpring(mx, { stiffness: 180, damping: 18 });
  const y = useSpring(my, { stiffness: 180, damping: 18 });

  const hasFinePointer = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fxEnabled = hasFinePointer && !prefersReducedMotion;

  function handleMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // Border-glow position, always active (cheap CSS var update).
    ref.current.style.setProperty("--glow-x", `${(px / rect.width) * 100}%`);
    ref.current.style.setProperty("--glow-y", `${(py / rect.height) * 100}%`);
    ref.current.style.setProperty("--glow-intensity", "1");

    if (!fxEnabled) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    ry.set(((px - cx) / cx) * 3.5);
    rx.set(((cy - py) / cy) * 3.5);
    mx.set((px - cx) * 0.02);
    my.set((py - cy) * 0.02);
  }

  function handleMouseLeave() {
    rx.set(0);
    ry.set(0);
    mx.set(0);
    my.set(0);
    ref.current?.style.setProperty("--glow-intensity", "0");
  }

  return (
    <StaggerItem className="project-card-wrap">
      <motion.article
        ref={ref}
        className="project-card magic-card"
        data-project-id={project.id}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, x, y, transformPerspective: 800 }}
        whileHover={{ y: -4 }}
      >
        <div className="project-card-top">
          <div>
            <span className={`project-status status-${project.status}`}>{statusLabel(project.status)}</span>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-tagline">{project.tagline}</p>
          </div>
          <a
            className="project-link"
            href={project.url}
            target="_blank"
            rel="noopener"
            aria-label={`Open ${project.name} on GitHub`}
          >
            ↗
          </a>
        </div>

        <p className="project-desc">{project.description}</p>

        <div className={`project-github-stats ${stats ? "stats-loaded" : ""}`} aria-live="polite">
          {stats && (
            <>
              <span className="gh-stat" title="Stars">★ {stats.stars}</span>
              <span className="gh-stat" title="Forks">⑂ {stats.forks}</span>
              {stats.language && (
                <span className="gh-stat gh-lang" title="Primary language">{stats.language}</span>
              )}
              {stats.pushedAt && (
                <span className="gh-stat gh-pushed" title="Last commit">
                  updated {formatRelativeTime(stats.pushedAt)}
                </span>
              )}
            </>
          )}
        </div>

        <div className="project-footer">
          <div className="project-tags">
            {project.tags.map((t) => (
              <span className="tag-pill" key={t}>{t}</span>
            ))}
          </div>
          <span className="project-repo">{project.repo}</span>
        </div>
      </motion.article>
    </StaggerItem>
  );
}
