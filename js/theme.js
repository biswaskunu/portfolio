/**
 * theme.js
 * Handles light/dark theme toggling. The initial theme is already
 * applied by the inline script in <head> (to avoid a flash of the
 * wrong theme before CSS loads) — this file only owns the toggle
 * interaction and keeps localStorage in sync afterward.
 */

function getCurrentTheme() {
  return document.documentElement.getAttribute("data-theme") || "dark";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    /* storage unavailable (private browsing etc.) — theme still works for this session */
  }
}

function updateToggleButton(button, theme) {
  const isLight = theme === "light";
  button.setAttribute("aria-pressed", String(isLight));
  button.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode"
  );
}

function initThemeToggle() {
  const button = document.getElementById("themeToggle");
  if (!button) return;

  updateToggleButton(button, getCurrentTheme());

  button.addEventListener("click", () => {
    const next = getCurrentTheme() === "light" ? "dark" : "light";
    setTheme(next);
    updateToggleButton(button, next);
  });
}

document.addEventListener("DOMContentLoaded", initThemeToggle);
