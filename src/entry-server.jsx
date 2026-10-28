import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

/**
 * entry-server.jsx
 * Build-time prerender entry. `scripts/prerender.mjs` imports the
 * SSR bundle of this module, calls `render()`, and injects the
 * resulting HTML into dist/index.html so non-JS crawlers (and
 * GPTBot / ClaudeBot / PerplexityBot) see the full page source.
 *
 * The client hydrates the exact same tree (src/main.jsx), so the
 * prerendered markup must match what a real visitor gets — no
 * cloaking, no hidden fallback.
 */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
