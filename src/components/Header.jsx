import { useTheme } from "../hooks/useTheme.jsx";
import PillNav from "./../fx/PillNav.jsx";

function ThemeToggle({ inline = false }) {
  const { mode, toggleMode } = useTheme();
  const isLight = mode === "light";
  return (
    <button
      className={`theme-toggle ${inline ? "theme-toggle-inline" : ""}`}
      type="button"
      onClick={toggleMode}
      aria-pressed={isLight}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">
          <svg className="icon-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
            <path
              d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.55 1.55M18.25 18.25l1.55 1.55M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.55-1.55M18.25 5.75l1.55-1.55"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <svg className="icon-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.6 6.6 0 0 0 10.5 10.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </button>
  );
}

export { ThemeToggle };

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Log", href: "#log" },
  { label: "Gallery", href: "#gallery" },
  { label: "Theme", href: "#theme" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  return (
    <header className="site-header" id="top">
      <div className="header-inner">
        <PillNav
          logo="/favicon.svg"
          logoAlt="Biswash Rath"
          items={NAV_ITEMS}
          baseColor="var(--bg-card)"
          pillColor="var(--accent)"
          hoveredPillTextColor="var(--text)"
          pillTextColor="#181816"
          ease="power3.out"
        />
        <div className="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
