import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ACCENTS } from "../data/data.js";

const THEME_STORAGE_KEY = "theme";
const ACCENT_STORAGE_KEY = "accentId";
const DEFAULT_ACCENT_ID = "teal";

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

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(() => document.documentElement.getAttribute("data-theme") || "dark");
  const [accentId, setAccentIdState] = useState(() => readStorage(ACCENT_STORAGE_KEY, DEFAULT_ACCENT_ID));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
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
