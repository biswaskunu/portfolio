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
export const SITE_TITLE = "Biswash Rath | Rust Backend Developer in India";
export const SITE_TAGLINE = "Rust backend developer building real systems with Axum and PostgreSQL.";
export const SITE_DESCRIPTION =
  "Biswash Rath is a Rust backend developer and CSE undergraduate in Bhubaneswar, India. Explore his work with Axum, PostgreSQL and systems programming.";
export const OG_DESCRIPTION =
  "Rust backend developer in Bhubaneswar, India. Explore Biswash Rath’s work with Axum, PostgreSQL, systems programming and open source.";
