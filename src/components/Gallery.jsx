import { useState } from "react";
import AnimatedContent from "../fx/AnimatedContent.jsx";
import { GALLERY_ITEMS } from "../data/data.js";

/**
 * Gallery
 * Horizontal accordion: a row of image panels where the active one
 * expands and the rest collapse to strips. Hover previews on desktop,
 * click/tap to pin (also covers touch + keyboard). Images come from
 * `GALLERY_ITEMS` (files in `public/gallery/`).
 */
export default function Gallery() {
  const [active, setActive] = useState(0);

  return (
    <section className="gallery reveal" id="gallery">
      <AnimatedContent className="section-head">
        <p className="section-eyebrow">04 — Gallery</p>
        <h2 className="section-title">Screenshots &amp; moments</h2>
        <p className="section-desc">
          Project screenshots and achievement photos. Hover or tap a panel to
          expand it.
        </p>
      </AnimatedContent>

      <AnimatedContent delay={0.05}>
        <div className="accordion-gallery" role="list">
          {GALLERY_ITEMS.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.id}
                type="button"
                role="listitem"
                aria-expanded={isActive}
                aria-label={`${item.title} — ${item.kind}`}
                className={`accordion-panel ${isActive ? "accordion-active" : ""}`}
                style={{ "--panel-image": `url("${item.image}")` }}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="accordion-scrim" aria-hidden="true" />
                <span className="accordion-strip" aria-hidden="true">
                  <span className="accordion-strip-kind">{item.kind}</span>
                  <span className="accordion-strip-title">{item.title}</span>
                </span>
                <span className="accordion-caption" aria-hidden={isActive ? undefined : "true"}>
                  <span className="accordion-kind">{item.kind}</span>
                  <span className="accordion-title">{item.title}</span>
                  <span className="accordion-detail">{item.detail}</span>
                  <span className="accordion-repo">{item.repo}</span>
                </span>
              </button>
            );
          })}
        </div>
      </AnimatedContent>
    </section>
  );
}
