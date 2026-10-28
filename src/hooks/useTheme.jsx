import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ACCENTS } from "../data/data.js";

const THEME_STORAGE_KEY = "theme";
const ACCENT_STORAGE_KEY = "accentId";
const DEFAULT_ACCENT_ID = "teal";
const DEFAULT_MODE = "dark";

function readStorage(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private browsing / storage disabled — theme still works this session */
  }
}

function findAccent(id) {
  return ACCENTS.find((a) => a.id === id) || ACCENTS[0];
}

function applyAccentVars(accentId, mode) {
  const accent = findAccent(accentId);
  const variant = mode === "light" ? accent.light : accent.dark;
  const root = document.documentElement;
  root.setAttribute("data-accent", accent.id);
  root.style.setProperty("--accent", variant.accent);
  root.style.setProperty("--accent-soft", variant.soft);
  root.style.setProperty("--accent-wash", variant.wash);
}

function applyTheme(mode) {
  document.documentElement.setAttribute("data-theme", mode);
}

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Server render and the client's first (hydrating) render must be
  // byte-identical, so state starts at the defaults instead of reading
  // document/localStorage during render. The mount effect below restores
  // the visitor's saved prefs before paint; the head script in
  // index.html has already painted the correct data-theme by then.
  const [mode, setModeState] = useState(DEFAULT_MODE);
  const [accentId, setAccentIdState] = useState(DEFAULT_ACCENT_ID);
  const didInit = useRef(false);

  // Restore persisted prefs once, on the client, before first paint.
  useEffect(() => {
    const prefersLight =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    const nextMode = readStorage(THEME_STORAGE_KEY, null) || (prefersLight ? "light" : DEFAULT_MODE);
    const nextAccent = readStorage(ACCENT_STORAGE_KEY, DEFAULT_ACCENT_ID);

    didInit.current = true;
    setModeState(nextMode);
    setAccentIdState(nextAccent);
    applyTheme(nextMode);
    applyAccentVars(nextAccent, nextMode);
    writeStorage(THEME_STORAGE_KEY, nextMode);
    writeStorage(ACCENT_STORAGE_KEY, nextAccent);
  }, []);

  // Apply every subsequent change (user toggles / accent picks).
  useEffect(() => {
    if (!didInit.current) return;
    applyTheme(mode);
    writeStorage(THEME_STORAGE_KEY, mode);
    applyAccentVars(accentId, mode);
  }, [mode, accentId]);

  const setMode = useCallback((next) => setModeState(next), []);
  const toggleMode = useCallback(() => setModeState((m) => (m === "light" ? "dark" : "light")), []);
  const setAccent = useCallback((id) => {
    writeStorage(ACCENT_STORAGE_KEY, id);
    setAccentIdState(id);
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode, accentId, setAccent, accents: ACCENTS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
