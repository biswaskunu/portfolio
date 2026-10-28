import AnimatedContent, { StaggerGroup, StaggerItem } from "../fx/AnimatedContent.jsx";
import BorderGlow from "../fx/BorderGlow.jsx";
import { STACK, ACCENTS } from "../data/data.js";
import { useTheme } from "../hooks/useTheme.jsx";

/** Convert hex to "H S L" string for BorderGlow's glowColor prop. */
function hexToHslString(hex) {
  const v = hex.trim().replace("#", "");
  const full = v.length === 3 ? v.split("").map((c) => c + c).join("") : v;
  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return `0 0% ${Math.round(l * 100)}%`;
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(Math.min(Math.max(l, 0.45), 0.7) * 100)}%`;
}

export default function Stack() {
  const { mode, accentId } = useTheme();
  const accent = ACCENTS.find((a) => a.id === accentId) || ACCENTS[0];
  const variant = mode === "light" ? accent.light : accent.dark;
  // Translucent so the fixed GradientWaves backdrop stays visible.
  // color-mix keeps the card tinted but lets the shader glow through.
  const backgroundColor =
    mode === "light"
      ? "color-mix(in srgb, #ffffff 68%, transparent)"
      : "color-mix(in srgb, #232220 68%, transparent)";
  const glowColors = [accent.swatch, variant.soft, variant.accent];
  const glowColor = hexToHslString(variant.soft);

  return (
    <section className="stack reveal" id="stack">
      <AnimatedContent className="section-head">
        <p className="section-eyebrow">03 — Toolchain</p>
        <h2 className="section-title">What I build with</h2>
        <p className="section-desc">
          Depth over breadth — one core stack, worked consistently across four shipped projects.
        </p>
      </AnimatedContent>
      <StaggerGroup className="stack-grid">
        {STACK.map((s) => (
          <StaggerItem className="stack-item" key={s.name}>
            <BorderGlow
              className="stack-card stack-glow"
              backgroundColor={backgroundColor}
              colors={glowColors}
              glowColor={glowColor}
              borderRadius={10}
              glowRadius={24}
              edgeSensitivity={30}
              coneSpread={25}
              glowIntensity={1.0}
            >
              <h3 className="stack-name">{s.name}</h3>
              <p className="stack-role">{s.role}</p>
              <p className="stack-detail">{s.detail}</p>
            </BorderGlow>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
