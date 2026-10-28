import AnimatedContent from "../fx/AnimatedContent.jsx";
import { ThemeToggle } from "./Header.jsx";
import { useTheme } from "../hooks/useTheme.jsx";

export default function ThemePanel() {
  const { accentId, setAccent, accents } = useTheme();

  return (
    <section className="theme-section reveal" id="theme">
      <AnimatedContent className="section-head">
        <p className="section-eyebrow">05 — Appearance</p>
        <h2 className="section-title">Make it yours</h2>
        <p className="section-desc">
          Pick a mode and an accent color. Both are saved, so it looks the same next time you're here.
        </p>
      </AnimatedContent>

      <AnimatedContent delay={0.05}>
        <div className="theme-panel">
          <div className="theme-panel-row">
            <div className="theme-panel-label">
              <span className="theme-panel-title">Mode</span>
              <span className="theme-panel-hint">Dark or light background</span>
            </div>
            <ThemeToggle inline />
          </div>

          <div className="theme-panel-row theme-panel-row-column">
            <div className="theme-panel-label">
              <span className="theme-panel-title">Accent color</span>
              <span className="theme-panel-hint">Applied to links, buttons, tags &amp; highlights</span>
            </div>
            <div className="accent-swatches" role="group" aria-label="Choose accent color">
              {accents.map((a) => {
                const isActive = a.id === accentId;
                return (
                  <button
                    key={a.id}
                    className={`swatch ${isActive ? "swatch-active" : ""}`}
                    type="button"
                    style={{ "--swatch-color": a.swatch }}
                    aria-pressed={isActive}
                    aria-label={`Use ${a.label} accent color`}
                    onClick={() => setAccent(a.id)}
                  >
                    <span className="swatch-dot"></span>
                    <span className="swatch-label">{a.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
}
