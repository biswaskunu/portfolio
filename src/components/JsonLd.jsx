/**
 * JsonLd — schema.org structured data, derived from data.js so the
 * markup can never drift from the content it describes.
 *
 * Rendered inside the React tree so it ships in the prerendered HTML
 * (readable by crawlers without JS) and hydrates client-side.
 * No volatile values (dates, random ids) — the client's render must
 * match the server's byte-for-byte.
 */
import { PROJECTS, STACK, TAGS, FAQS } from "../data/data.js";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
} from "../data/site.js";

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PAGE_ID = `${SITE_URL}/#page`;

const GITHUB_URL = "https://github.com/biswaskunu";
const LINKEDIN_URL = "https://linkedin.com/in/biswash-rath-25a871379";

const LANGUAGE_BY_TAG = { rust: "Rust", java: "Java", react: "JavaScript" };

const tagLabel = (id) => TAGS.find((t) => t.id === id)?.label ?? id;

function projectToCode(project) {
  const language = project.tags.map((tag) => LANGUAGE_BY_TAG[tag]).find(Boolean);
  return {
    "@type": "SoftwareSourceCode",
    "@id": `${SITE_URL}/#project-${project.id}`,
    name: project.name,
    description: project.description,
    url: `${SITE_URL}/#work`,
    codeRepository: project.url,
    keywords: project.tags.map(tagLabel).join(", "),
    inLanguage: "en",
    isAccessibleForFree: true,
    author: { "@id": PERSON_ID },
    ...(language
      ? { programmingLanguage: { "@type": "ComputerLanguage", name: language } }
      : {}),
  };
}

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        alternateName: "biswaskunu",
        url: `${SITE_URL}/`,
        mainEntityOfPage: { "@id": PAGE_ID },
        jobTitle: "Rust Backend Developer",
        email: "mailto:kunubiswas2@gmail.com",
        description:
          "Biswash Rath is a Rust backend developer and Computer Science undergraduate based in Bhubaneswar, India, and open to remote internships. He builds backend systems and developer tools with Rust, Axum, Tokio and PostgreSQL, including identity and access management, asynchronous services, system monitoring and virtual machines.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bhubaneswar",
          addressRegion: "Odisha",
          addressCountry: "IN",
        },
        sameAs: [GITHUB_URL, LINKEDIN_URL],
        knowsAbout: [
          ...STACK.map((s) => s.name),
          "Rust backend development",
          "REST API design",
          "Asynchronous programming",
          "Authentication and authorization",
          "Systems programming",
          "Open-source software",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": PAGE_ID,
        name: SITE_TITLE,
        url: `${SITE_URL}/`,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      ...PROJECTS.map(projectToCode),
    ],
  };
}

export default function JsonLd() {
  const json = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
