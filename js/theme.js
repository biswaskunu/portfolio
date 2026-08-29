/**
 * theme.js
 * Owns two independent pieces of appearance state:
 *   1. Base mode: "dark" | "light"      → data-theme on <html>
 *   2. Accent color: one of ACCENTS      → applied as CSS custom
 *      properties on <html> so every existing var(--accent) rule
 *      in styles.css picks it up with no other CSS changes needed.
 *
 * The base mode is already applied by the inline script in <head>
 * (to avoid a flash before CSS loads). This file applies the saved
 * accent on load, then owns both toggle interactions afterward.
 */

const THEME_STORAGE_KEY = "theme";
const ACCENT_STORAGE_KEY = "accentId";
const DEFAULT_ACCENT_ID = "teal";

// --- storage helpers (fail quietly if storage is unavailable) --------
function readStorage(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (e) {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    /* private browsing / storage disabled — theme still works this session */
  }
}

// --- base mode (dark/light) -------------------------------------------
function getCurrentMode() {
  return document.documentElement.getAttribute("data-theme") || "dark";
}

function setMode(mode) {
  document.documentElement.setAttribute("data-theme", mode);
  writeStorage(THEME_STORAGE_KEY, mode);
  applyAccentVars(getCurrentAccentId()); // re-apply so light/dark accent variant matches
}

// --- accent color -------------------------------------------------------
function findAccent(id) {
  return ACCENTS.find((a) => a.id === id) || ACCENTS[0];
}

function getCurrentAccentId() {
  return document.documentElement.getAttribute("data-accent") || DEFAULT_ACCENT_ID;
}

/**
 * Writes the accent's dark/light variant onto :root as CSS custom
 * properties. Every existing var(--accent) / var(--accent-soft) /
 * var(--accent-wash) usage in styles.css updates automatically.
 */
function applyAccentVars(accentId) {
  const accent = findAccent(accentId);
  const mode = getCurrentMode() === "light" ? "light" : "dark";
  const variant = accent[mode];

  const root = document.documentElement;
  root.setAttribute("data-accent", accent.id);
  root.style.setProperty("--accent", variant.accent);
  root.style.setProperty("--accent-soft", variant.soft);
  root.style.setProperty("--accent-wash", variant.wash);
}

function setAccent(id) {
  writeStorage(ACCENT_STORAGE_KEY, id);
  applyAccentVars(id);
}

// --- mode toggle button --------------------------------------------------
function updateModeToggleButton(button, mode) {
  const isLight = mode === "light";
  button.setAttribute("aria-pressed", String(isLight));
  button.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode"
  );
}

function initModeToggle() {
  const buttons = document.querySelectorAll("[data-mode-toggle], #themeToggle, #themeToggleSection");
  if (buttons.length === 0) return;

  const syncButtons = (mode) => {
    buttons.forEach((btn) => updateModeToggleButton(btn, mode));
  };

  syncButtons(getCurrentMode());

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = getCurrentMode() === "light" ? "dark" : "light";
      setMode(next);
      syncButtons(next);
    });
  });
}

// --- accent picker section ------------------------------------------------
function renderAccentSwatches(container, accents, activeId) {
  container.innerHTML = accents
    .map(
      (a) => `
      <button
        class="swatch ${a.id === activeId ? "swatch-active" : ""}"
        type="button"
        data-accent-id="${a.id}"
        style="--swatch-color: ${a.swatch}"
        aria-pressed="${a.id === activeId}"
        aria-label="Use ${a.label} accent color"
      >
        <span class="swatch-dot"></span>
        <span class="swatch-label">${a.label}</span>
      </button>`
    )
    .join("");
}

function initAccentPicker() {
  const container = document.getElementById("accentSwatches");
  if (!container) return;

  renderAccentSwatches(container, ACCENTS, getCurrentAccentId());

  container.addEventListener("click", (event) => {
    const button = event.target.closest("[data-accent-id]");
    if (!button) return;
    setAccent(button.dataset.accentId);
    renderAccentSwatches(container, ACCENTS, button.dataset.accentId);
  });
}

function initTheme() {
  // Apply the saved accent (falls back to default) now that ACCENTS is loaded.
  applyAccentVars(readStorage(ACCENT_STORAGE_KEY, DEFAULT_ACCENT_ID));
  initModeToggle();
  initAccentPicker();
}

document.addEventListener("DOMContentLoaded", initTheme);
