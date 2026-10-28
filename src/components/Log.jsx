import AnimatedContent, { StaggerGroup, StaggerItem } from "../fx/AnimatedContent.jsx";
import { LOG_ENTRIES } from "../data/data.js";

export default function Log() {
  return (
    <section className="log reveal" id="log">
      <AnimatedContent className="section-head">
        <p className="section-eyebrow">04 — Track record</p>
        <h2 className="section-title">Hackathons &amp; ventures</h2>
        <p className="section-desc">
          Competitive builds, plus the side projects that keep me shipping between semesters.
        </p>
      </AnimatedContent>
      <StaggerGroup className="log-grid">
        {LOG_ENTRIES.map((e, i) => (
          <StaggerItem className="log-card" key={i}>
            <span className="log-kind">{e.kind}</span>
            <h3 className="log-title">{e.title}</h3>
            <p className="log-detail">{e.detail}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
