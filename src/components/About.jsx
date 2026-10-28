import AnimatedContent, { StaggerGroup, StaggerItem } from "../fx/AnimatedContent.jsx";
import { ABOUT_PARAGRAPHS, FAQS } from "../data/data.js";

/**
 * About + Q&A.
 * Answers are written to survive extraction: each one names Biswash
 * and stands alone out of context (AEO). FAQPage JSON-LD in JsonLd.jsx
 * is generated from the same FAQS array.
 */
export default function About() {
  return (
    <section className="about reveal" id="about">
      <AnimatedContent className="section-head">
        <p className="section-eyebrow">02 — About</p>
        <h2 className="section-title">Who's behind the repos</h2>
      </AnimatedContent>
      <AnimatedContent className="about-intro">
        {ABOUT_PARAGRAPHS.map((para) => (
          <p key={para.slice(0, 32)} className="about-para">
            {para}
          </p>
        ))}
      </AnimatedContent>
      <StaggerGroup className="faq-list">
        {FAQS.map((item) => (
          <StaggerItem className="faq-item" key={item.q}>
            <div className="faq-q-a">
              <h3 className="faq-q">{item.q}</h3>
              <p className="faq-a">{item.a}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
