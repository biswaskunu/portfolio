/**
 * prerender.mjs — build-time prerender for dist/index.html.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server
 * bundle). Renders the real React app to HTML and injects it into the
 * built template, so crawlers that don't run JavaScript — GPTBot,
 * ClaudeBot, PerplexityBot, curl — see the full page: hero, projects,
 * stack, log, gallery, contact.
 *
 * This is NOT a separate static fallback: the markup comes from the
 * exact same <App /> tree the client hydrates (src/main.jsx), so what
 * crawlers read is what visitors see.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { SITE_URL } from "../src/data/site.js";

const root = process.cwd();
const distDir = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render } = await import(pathToFileURL(ssrEntry).href);
const appHtml = render();

// Guards: never ship an empty shell, and never ship the intro overlay.
// Fail the build loudly instead of silently deploying a root div
// crawlers can't read.
const REQUIRED_TEXT = [
  'class="hero-title"', // the h1 itself (SplitText splits it per char,
                        // so its text lands in the DOM as adjacent spans)
  "build the kind of backend infrastructure", // the hero bio
  "IAM Platform", // project names
  "Biswash Rath", // identity (footer)
  'type="application/ld+json"', // structured data must ship in the HTML
];
for (const text of REQUIRED_TEXT) {
  if (!appHtml.includes(text)) {
    throw new Error(
      `Prerender sanity check failed: rendered markup is missing "${text}". ` +
        "Refusing to write dist/index.html."
    );
  }
}
if (appHtml.includes("intro-overlay")) {
  throw new Error(
    "Prerender sanity check failed: the intro overlay must be client-only."
  );
}

const indexPath = path.join(distDir, "index.html");
let html = await readFile(indexPath, "utf8");

const ROOT_MARKER = '<div id="root"></div>';
if (!html.includes(ROOT_MARKER)) {
  throw new Error(
    `Could not find ${ROOT_MARKER} in dist/index.html — the template changed?`
  );
}

html = html.replace(ROOT_MARKER, () => `<div id="root">${appHtml}</div>`);
await writeFile(indexPath, html);

// Fill __SITE_URL__ / __LASTMOD__ tokens from src/data/site.js in the
// built crawl surface: canonical/OG tags in index.html plus the public
// text files vite copied verbatim (robots.txt, sitemap.xml, llms.txt).
const TOKEN_FILES = ["index.html", "robots.txt", "sitemap.xml", "llms.txt"];
const TOKENS = {
  __SITE_URL__: SITE_URL.replace(/\/+$/, ""),
  __LASTMOD__: new Date().toISOString().slice(0, 10),
};
for (const file of TOKEN_FILES) {
  const filePath = path.join(distDir, file);
  let content = await readFile(filePath, "utf8");
  const original = content;
  for (const [token, value] of Object.entries(TOKENS)) {
    content = content.split(token).join(value);
  }
  if (content !== original) {
    await writeFile(filePath, content);
  }
  if (/__(SITE_URL|LASTMOD)__/.test(content)) {
    throw new Error(`prerender: unresolved build token left in dist/${file}`);
  }
}

console.log(
  `prerender: injected ${appHtml.length} bytes of server-rendered markup into dist/index.html`
);
console.log(
  `prerender: filled site tokens in ${TOKEN_FILES.join(", ")} (site=${SITE_URL}, lastmod=${TOKENS.__LASTMOD__})`
);
