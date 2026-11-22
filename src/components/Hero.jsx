import SplitText from "../fx/SplitText.jsx";
import { HERO_STATS } from "../data/data.js";

/**
 * Hero
 * Entrance animation is CSS-only (`.js .hero-*` keyframes in
 * index.css), driven by the `.js` class set before first paint —
 * so the prerendered HTML ships this section as plain, visible text
 * with no inline `opacity: 0` from a motion `initial` state.
 */
export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <p className="hero-eyebrow">
          <span className="dot"></span> Biswash Rath · Rust Backend Developer · Bhubaneswar, India · Open to remote internships
        </p>

        <h1 className="hero-title">
          <SplitText as="span" className="hero-line" text="Backend engineer" delay={0.15} />
          <br />
          <SplitText as="span" className="hero-line" text="who ships" delay={0.42} />{" "}
          <SplitText as="span" className="hero-line accent" text="systems," delay={0.5} />
          <br />
          <SplitText as="span" className="hero-line" text="not tutorials." delay={0.66} />
        </h1>

        <p className="hero-sub">
          2nd‑year CS undergrad specializing in <strong>Rust / Axum / PostgreSQL</strong>. I
          build the kind of backend infrastructure — auth chains, bytecode VMs, real‑time game
          servers — that most students only read about.
        </p>

        <div className="hero-actions">
          <a href="#work" className="btn btn-primary">View the work</a>
          <a
            href="https://github.com/biswaskunu"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
          >
            github.com/biswaskunu
          </a>
        </div>
      </div>

      <div className="hero-stats">
        {HERO_STATS.map((s, i) => (
          <div className="stat" key={i}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
