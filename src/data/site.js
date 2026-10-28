/**
 * site.js — single source of truth for the site's canonical URL.
 *
 * Consumed by scripts/prerender.mjs at build time to fill __SITE_URL__
 * / __LASTMOD__ tokens in dist/index.html (canonical + Open Graph) and
 * in dist/robots.txt, dist/sitemap.xml, dist/llms.txt. Change the URL
 * here once and every crawl surface follows.
 */
export const SITE_URL = "https://biswash-rath.netlify.app";
export const SITE_NAME = "Biswash Rath";
export const SITE_TITLE = "Biswash Rath — Backend Engineer";
export const SITE_TAGLINE = "Backend engineer who ships systems, not tutorials.";
export const SITE_DESCRIPTION =
  "Biswash Rath — Rust/Axum/PostgreSQL backend engineer. 2nd year CSE student building production-style backend systems.";
export const OG_DESCRIPTION =
  "Rust/Axum/PostgreSQL backend engineer. Shipped IAM systems, a bytecode VM, and a full-stack game — not tutorials.";
