# Portfolio discovery — post-deployment checklist

The repository-side SEO work is implemented in source. The steps below require access to external accounts or a live deployment, so they are intentionally not marked complete here.

## Deployment and technical checks

- [ ] Deploy the updated `main` branch to the existing Netlify site.
- [ ] Confirm `https://www.biswashrath.in` loads over HTTPS.
- [ ] Confirm `http://biswashrath.in`, `https://biswashrath.in`, and both HTTP/HTTPS versions of `biswash-rath.netlify.app` return permanent redirects to the `www` host.
- [ ] Confirm redirects preserve paths and query strings.
- [ ] Confirm `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and `/og-image.png` return successfully from the canonical host.
- [ ] Confirm the sitemap contains only `https://www.biswashrath.in/` as the canonical homepage URL.

## Search engines

- [ ] In Google Search Console, select the verified domain property for `biswashrath.in` and submit `https://www.biswashrath.in/sitemap.xml` if it is not already present.
- [ ] Inspect `https://www.biswashrath.in/` and request indexing only if Google reports that it is not indexed.
- [ ] Add `https://www.biswashrath.in` to Bing Webmaster Tools (or import the verified Google Search Console property) and submit the sitemap.
- [ ] Recheck indexing and search queries after the crawlers have had time to process the deployment.

## External identity consistency

Suggested LinkedIn headline:

> Rust Backend Developer | Axum, Tokio & PostgreSQL | CSE Undergraduate | Open to Remote Internships

Suggested LinkedIn About opening:

> I'm Biswash Rath, a Rust backend developer and Computer Science undergraduate based in Bhubaneswar, Odisha, India. I build backend systems and developer tools with Rust, Axum, Tokio and PostgreSQL, with hands-on work across identity and access management, asynchronous services, system monitoring and systems programming. I publish my projects and code on GitHub and am open to remote software engineering internships.

- [ ] Update LinkedIn headline/About with accurate, current wording and link to `https://www.biswashrath.in`.
- [ ] Add the portfolio URL to the GitHub profile README and LinkedIn contact/website fields.
- [ ] Keep project names, descriptions, technologies and current status consistent between the portfolio and their GitHub repositories.
- [ ] Share genuine technical write-ups or open-source contribution notes that link back to the relevant project pages; avoid paid or artificial backlinks.

## Social previews

- [ ] Test the deployed homepage URL in the relevant social sharing preview/debugging tools after deployment.
- [ ] Confirm the preview uses `https://www.biswashrath.in/og-image.png` and displays the updated name, role and domain.
