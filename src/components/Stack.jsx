import AnimatedContent, { StaggerGroup, StaggerItem } from "../fx/AnimatedContent.jsx";
import { STACK } from "../data/data.js";

export default function Stack() {
  return (
    <section className="stack reveal" id="stack">
      <AnimatedContent className="section-head">
        <p className="section-eyebrow">02 — Toolchain</p>
        <h2 className="section-title">What I build with</h2>
        <p className="section-desc">
          Depth over breadth — one core stack, worked consistently across four shipped projects.
        </p>
      </AnimatedContent>
      <StaggerGroup className="stack-grid">
        {STACK.map((s) => (
          <StaggerItem className="stack-card" key={s.name}>
            <h3 className="stack-name">{s.name}</h3>
            <p className="stack-role">{s.role}</p>
            <p className="stack-detail">{s.detail}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
