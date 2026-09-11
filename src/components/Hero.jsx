import { motion } from "framer-motion";
import SplitText from "../fx/SplitText.jsx";
import { HERO_STATS } from "../data/data.js";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="dot"></span> Bhubaneswar, India — open to remote internships
        </motion.p>

        <h1 className="hero-title">
          <SplitText as="span" className="hero-line" text="Backend engineer" delay={0.15} />
          <br />
          <SplitText as="span" className="hero-line" text="who ships" delay={0.42} />{" "}
          <SplitText as="span" className="hero-line accent" text="systems," delay={0.5} />
          <br />
          <SplitText as="span" className="hero-line" text="not tutorials." delay={0.66} />
        </h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          2nd‑year CS undergrad specializing in <strong>Rust / Axum / PostgreSQL</strong>. I
          build the kind of backend infrastructure — auth chains, bytecode VMs, real‑time game
          servers — that most students only read about.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#work" className="btn btn-primary">View the work</a>
          <a
            href="https://github.com/biswaskunu"
            target="_blank"
            rel="noopener"
            className="btn btn-ghost"
          >
            github.com/biswaskunu
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {HERO_STATS.map((s, i) => (
          <div className="stat" key={i}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
