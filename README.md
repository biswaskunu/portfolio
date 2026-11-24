# Biswash Rath — Portfolio

Personal portfolio for **Biswash Rath**, a Rust backend developer and Computer Science undergraduate based in Bhubaneswar, Odisha, India. The site is built with React and Vite and is prerendered at build time so search engines and AI search crawlers can read its content without executing JavaScript.

## Development

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The build creates the client bundle, renders the React app to static HTML, and fills the canonical URL tokens in `index.html`, `robots.txt`, `sitemap.xml`, and `llms.txt`. The single source of truth for the public origin is `src/data/site.js`.

## SEO and discovery

- Canonical public origin: `https://www.biswashrath.in`
- `https://biswashrath.in` and the former Netlify subdomain redirect to the canonical `www` host via `public/_redirects`.
- `public/robots.txt` documents crawler access and points to the sitemap.
- `public/sitemap.xml` is generated with the canonical origin and build date.
- `public/llms.txt` gives language-model crawlers a concise, human-readable site and project summary.
- `src/components/JsonLd.jsx` emits Person, WebSite, ProfilePage, FAQPage, and SoftwareSourceCode structured data.
- `public/og-image.png` is the 1200 × 630 social-sharing image; its editable SVG source is `scripts/og-image.svg`.

When changing the production domain, update `SITE_URL` in `src/data/site.js` and rebuild. Do not hand-edit generated `dist/` output.

## After deploying

1. Confirm `https://www.biswashrath.in` loads over HTTPS.
2. Confirm the apex domain and `biswash-rath.netlify.app` redirect to the `www` URL, including a path such as `/og-image.png`.
3. Open `https://www.biswashrath.in/robots.txt` and `https://www.biswashrath.in/sitemap.xml`; verify the sitemap contains the canonical URL.
4. In Google Search Console, inspect the canonical homepage and submit `https://www.biswashrath.in/sitemap.xml` if it is not already submitted for the correct property.
5. Add the site to Bing Webmaster Tools and submit the same sitemap (or import the verified Google Search Console property).
6. Check the social preview using the deployed `https://www.biswashrath.in/og-image.png` URL.

Search indexing, external mentions, and third-party profile updates are account/platform-side tasks; they cannot be completed by a source-code build alone.
