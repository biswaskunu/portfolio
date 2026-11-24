/**
 * data.js
 * Single source of truth for all portfolio content.
 */

export const TAGS = [
  { id: "rust", label: "Rust" },
  { id: "axum", label: "Axum" },
  { id: "postgres", label: "PostgreSQL" },
  { id: "sqlx", label: "SQLx" },
  { id: "react", label: "React" },
  { id: "java", label: "Java" },
  { id: "cli", label: "CLI" },
  { id: "auth", label: "Auth / Security" },
];

export const PROJECTS = [
  {
    id: "iam-platform",
    name: "IAM Platform",
    tagline: "Identity & access management backend",
    description:
      "Production-style IAM backend modeling a full interconnected authorization chain: users → organizations → memberships → roles → permissions. JWT access/refresh rotation, bcrypt hashing, and API keys / session tokens stored only as SHA-256 hashes.",
    tags: ["rust", "axum", "postgres", "sqlx", "auth"],
    repo: "github.com/biswaskunu/rust_isa_platform",
    url: "https://github.com/biswaskunu/rust_isa_platform",
    status: "shipped",
  },
  {
    id: "history-guesser",
    name: "History Guesser",
    tagline: "Full-stack GeoGuessr-style web game",
    description:
      "Players see a historical photo and description and drop a map pin, scored on geographic accuracy. Rust/Axum/Tokio + SQLx + PostgreSQL backend with JWT auth, paired with a React + Leaflet frontend. Separate CI pipelines per service, deployed on Railway + Netlify with per-PR previews.",
    tags: ["rust", "axum", "postgres", "sqlx", "react", "auth"],
    repo: "github.com/biswaskunu/history-guesser",
    url: "https://github.com/biswaskunu/history-guesser",
    status: "shipped",
  },
  {
    id: "sherlock",
    name: "sherlock",
    tagline: "Local system monitor with spike correlation",
    description:
      "A local Rust agent that samples CPU, memory, disk I/O and per-process stats every few seconds, streams them live to a dashboard over SSE, and persists batches to Postgres via an Axum backend — so you can click a past resource spike and see exactly which process caused it.",
    tags: ["rust", "postgres", "cli"],
    repo: "github.com/biswaskunu/sherlock",
    url: "https://github.com/biswaskunu/sherlock",
    status: "shipped",
  },
  {
    id: "chaindock",
    name: "ChainDock",
    tagline: "SIH 2026 — tamper-evident document management",
    description:
      "Smart India Hackathon 2026 project (SIH26190) for the Ministry of Home Affairs (NCRB / Women Safety Division), built as Team ASPIRE: a secure digital document management system for FIRs, charge sheets, witness statements and forensic reports. Core differentiator is provable tamper-evidence — a SHA-256 hash-chained audit log plus Ed25519 digital signatures on finalized documents. Rust/Axum/PostgreSQL backend with JWT rotation and 3 fixed roles (investigator / supervisor / admin).",
    tags: ["rust", "axum", "postgres", "sqlx", "auth"],
    repo: "github.com/biswaskunu/ChainDock",
    url: "https://github.com/biswaskunu/ChainDock",
    status: "in-progress",
  },
  {
    id: "minivm",
    name: "miniVM Toolchain",
    tagline: "Bytecode virtual machine, from scratch",
    description:
      "A stack-based bytecode VM, assembler and disassembler written in pure Rust — std only, zero external dependencies. Turing-complete: comparison operators, a two-pass assembler resolving forward label references, control-flow jumps, and an interactive step-through debugger.",
    tags: ["rust", "cli"],
    repo: "github.com/biswaskunu/rust_project_minvm",
    url: "https://github.com/biswaskunu/rust_project_minvm",
    status: "shipped",
  },
  {
    id: "java-multiplayer",
    name: "Java Multiplayer Server",
    tagline: "Real-time multiplayer game server",
    description:
      "An actively-developed multiplayer server in Java — the project that justifies Java as a headline skill rather than a résumé line with no evidence behind it.",
    tags: ["java"],
    repo: "github.com/biswaskunu/java-multiplayer-server",
    url: "https://github.com/biswaskunu/java-multiplayer-server",
    status: "in-progress",
  },
  {
    id: "coders-hub",
    name: "Coder's Hub",
    tagline: "Guided coding-learning platform",
    description:
      "Frontend prototype for a guided coding-learning platform aimed at beginner programmers in Tier-2/3 India — structured learning roadmaps, a shared code-snippet library, gamification (badges, streaks, progress) on the roadmap. Pitched at Smart India Hackathon 2025 as part of Team Aspire.",
    tags: ["react", "cli"],
    repo: "github.com/biswaskunu/codersHub",
    url: "https://github.com/biswaskunu/codersHub",
    status: "shipped",
  },
  {
    id: "kanban",
    name: "Kanban",
    tagline: "Drag-and-drop task board",
    description:
      "A personal Kanban board built in plain HTML/CSS/JS — Todo / In Progress / Done columns with native drag-and-drop between them and state persisted to localStorage, so your board survives a refresh.",
    tags: ["cli"],
    repo: "github.com/biswaskunu/kanban",
    url: "https://github.com/biswaskunu/kanban",
    status: "shipped",
  },
  {
    id: "lookaway",
    name: "lookaway",
    tagline: "20-20-20 screen-break CLI",
    description:
      "A lightweight, cross-platform CLI that reminds you to look 20 feet away for 20 seconds every 20 minutes. Built around notify-rust for OS-independent notifications rather than platform-specific code paths.",
    tags: ["rust", "cli"],
    repo: "github.com/biswaskunu/lookaway",
    url: "https://github.com/biswaskunu/lookaway",
    status: "shipped",
  },
  {
    id: "git-stat-roaster",
    name: "git-stat-roaster",
    tagline: "GitHub stats → funny roast, as a web app",
    description:
      "Type in a GitHub username and get back public-stats-derived roasts. Rust/Axum JSON backend (paginated GitHub API fetch, derived stats, typed error responses) serving a React + Vite frontend from a single process — stateless lookup-and-respond, no database or auth.",
    tags: ["rust", "axum", "react"],
    repo: "github.com/biswaskunu/git-stat-roaster",
    url: "https://github.com/biswaskunu/git-stat-roaster",
    status: "in-progress",
  },
];

export const PROJECT_COUNT = PROJECTS.length;
export const SHIPPED_COUNT = PROJECTS.filter((p) => p.status === "shipped").length;

export const HERO_STATS = [
  { value: "9.58", label: "Year‑1 CGPA" },
  { value: String(SHIPPED_COUNT), label: "Shipped repos" },
  { value: "4", label: "Hackathon teams led" },
  { value: "1", label: "Core stack, no context‑switching" },
];

export const STACK = [
  { name: "Rust", role: "Primary language", detail: "Systems-level backend work — memory safety without a GC, used across every serious backend project." },
  { name: "Axum", role: "Web framework", detail: "REST APIs, middleware, extractors — the framework behind the IAM platform and History Guesser." },
  { name: "PostgreSQL", role: "Database", detail: "Relational modeling for auth chains, sessions, and game state — always paired with SQLx." },
  { name: "SQLx", role: "Async SQL toolkit", detail: "Compile-time checked queries against Postgres, no ORM magic in the way." },
  { name: "Java", role: "Secondary language", detail: "Backing the multiplayer server project — kept off the résumé until there was a repo to prove it." },
  { name: "Docker", role: "Local dev & deploy", detail: "Compose setups for local development; Railway + Netlify for shipped deployments." },
];

export const ACCENTS = [
  {
    id: "teal",
    label: "Teal",
    swatch: "#14b8a6",
    dark: { accent: "#14b8a6", soft: "#2dd4bf", wash: "rgba(20, 184, 166, 0.12)" },
    light: { accent: "#0f9c8d", soft: "#0b7d71", wash: "rgba(15, 156, 141, 0.08)" },
  },
  {
    id: "rust",
    label: "Rust",
    swatch: "#ce422b",
    dark: { accent: "#ce422b", soft: "#e8734f", wash: "rgba(206, 66, 43, 0.12)" },
    light: { accent: "#c33d21", soft: "#a83217", wash: "rgba(195, 61, 33, 0.08)" },
  },
  {
    id: "indigo",
    label: "Indigo",
    swatch: "#6366f1",
    dark: { accent: "#6366f1", soft: "#818cf8", wash: "rgba(99, 102, 241, 0.14)" },
    light: { accent: "#4f46e5", soft: "#4338ca", wash: "rgba(79, 70, 229, 0.08)" },
  },
  {
    id: "amber",
    label: "Amber",
    swatch: "#f59e0b",
    dark: { accent: "#f59e0b", soft: "#fbbf24", wash: "rgba(245, 158, 11, 0.14)" },
    light: { accent: "#d97706", soft: "#b45309", wash: "rgba(217, 119, 6, 0.08)" },
  },
  {
    id: "rose",
    label: "Rose",
    swatch: "#f43f5e",
    dark: { accent: "#f43f5e", soft: "#fb7185", wash: "rgba(244, 63, 94, 0.13)" },
    light: { accent: "#e11d48", soft: "#be123c", wash: "rgba(225, 29, 72, 0.08)" },
  },
  {
    id: "emerald",
    label: "Emerald",
    swatch: "#10b981",
    dark: { accent: "#10b981", soft: "#34d399", wash: "rgba(16, 185, 129, 0.13)" },
    light: { accent: "#059669", soft: "#047857", wash: "rgba(5, 150, 105, 0.08)" },
  },
];

export const LOG_ENTRIES = [
  {
    kind: "Hackathon",
    title: "Smart India Hackathon 2026",
    detail: "Building ChainDock (SIH26190) for the Ministry of Home Affairs — a tamper-evident digital document management system for legal & investigation records, with a hash-chained audit log and Ed25519 signatures.",
  },
  {
    kind: "Hackathon",
    title: "Eco-Swap (idea stage)",
    detail: "A campus circular-economy marketplace concept for trading e-waste, biomass and greywater for eco-points.",
  },
  {
    kind: "Hackathon",
    title: "Odisha Hackathon",
    detail: "Myth-buster web game built for a regional hackathon.",
  },
  {
    kind: "Certification",
    title: "Advancing with Rust",
    detail: "Summer internship course, Silicon University (25 May – 28 Jun 2026).",
  },
];

/**
 * ABOUT / FAQS
 * The About section is written for answer extraction (AEO): every FAQ
 * answer is self-contained — it names Biswash and reads correctly when
 * lifted out of the page by an AI crawler. JsonLd.jsx derives the
 * FAQPage schema from FAQS, so markup and visible copy can't drift.
 */
export const ABOUT_PARAGRAPHS = [
  "Biswash Rath is a Rust backend developer and Computer Science undergraduate based in Bhubaneswar, Odisha, India. He builds backend systems and developer tools with Rust, Axum, Tokio and PostgreSQL — including identity and access management, asynchronous services, system monitoring, bytecode virtual machines and tamper-evident document management — and publishes his work in public GitHub repositories.",
  "Hackathon work includes ChainDock for Smart India Hackathon 2026, built as Team ASPIRE for the Ministry of Home Affairs (NCRB / Women Safety Division), and Coder's Hub, a guided learning platform pitched at SIH 2025.",
];

export const FAQS = [
  {
    q: "Who is Biswash Rath?",
    a: "Biswash Rath is a Rust backend developer and Computer Science undergraduate based in Bhubaneswar, Odisha, India. He builds backend systems and developer tools with Rust, Axum, Tokio and PostgreSQL, and publishes his work in public GitHub repositories — including an identity and access management platform, a bytecode VM toolchain, a full-stack guessing game and a local system monitor.",
  },
  {
    q: "What does Biswash build?",
    a: "Biswash Rath builds backend systems in Rust, Axum and PostgreSQL: JWT-rotating identity and access management, a bytecode VM toolchain with an assembler and debugger, SSE-streaming system monitors, multiplayer game services, and tamper-evident document management — plus small CLIs like lookaway and drag-and-drop web tools like Kanban.",
  },
  {
    q: "Where is Biswash Rath based?",
    a: "Biswash Rath is based in Bhubaneswar, Odisha, India. He is interested in remote software engineering internships and backend development opportunities.",
  },
  {
    q: "What technologies does Biswash Rath work with?",
    a: "Biswash Rath's primary backend stack is Rust, Axum, Tokio, PostgreSQL and SQLx. He also works with Java, React, Docker and web technologies, with project links available in his public GitHub profile.",
  },
  {
    q: "What is the IAM Platform?",
    a: "The IAM Platform is Biswash Rath's identity & access management backend: a full authorization chain of users, organizations, memberships, roles and permissions, with JWT access/refresh rotation, bcrypt hashing, and API keys and session tokens stored only as SHA-256 hashes. It is written in Rust with Axum and PostgreSQL.",
  },
  {
    q: "What is ChainDock?",
    a: "ChainDock is a Smart India Hackathon 2026 project (SIH26190) for the Ministry of Home Affairs — NCRB / Women Safety Division — built by Team ASPIRE: a tamper-evident document management system for FIRs, charge sheets, witness statements and forensic reports. Its core differentiator is provable tamper-evidence: a SHA-256 hash-chained audit log plus Ed25519 digital signatures on finalized documents, on a Rust/Axum/PostgreSQL backend with three fixed roles (investigator, supervisor, admin).",
  },
  {
    q: "What is the miniVM Toolchain?",
    a: "The miniVM Toolchain is a stack-based bytecode virtual machine, assembler and disassembler written in pure Rust with zero external dependencies. It is Turing-complete, with comparison operators, a two-pass assembler that resolves forward label references, control-flow jumps, and an interactive step-through debugger.",
  },
  {
    q: "How can I contact Biswash Rath?",
    a: "Email Biswash Rath at kunubiswas2@gmail.com, or reach him on GitHub at github.com/biswaskunu and on LinkedIn at linkedin.com/in/biswash-rath-25a871379. All project repositories are linked from the page above.",
  },
];

/**
 * GALLERY_ITEMS
 * Accordion Gallery content. Images live in `public/gallery/`.
 * Recommended size: 1200×800 (3:2).
 */
export const GALLERY_ITEMS = [
  {
    id: "history-guesser",
    kind: "Project",
    title: "History Guesser",
    detail: "GeoGuessr-style game — drop a map pin on historical photos, scored on accuracy.",
    repo: "github.com/biswaskunu/history-guesser",
    image: "/gallery/history-guesser.png",
    imageWebp: "/gallery/history-guesser.webp",
    imageAvif: "/gallery/history-guesser.avif",
    alt: "History Guesser — map of a historical photo with a scored map pin",
  },
  {
    id: "advancing-rust",
    kind: "Certification",
    title: "Advancing with Rust",
    detail: "Summer internship course, Silicon University (25 May – 28 Jun 2026).",
    repo: "Silicon University · 2026",
    image: "/gallery/rust-certificate.png",
    imageWebp: "/gallery/rust-certificate.webp",
    imageAvif: "/gallery/rust-certificate.avif",
    alt: "Advancing with Rust course certificate from Silicon University",
  },
  {
    id: "sih-2026",
    kind: "Hackathon",
    title: "SIH 2026 · ChainDock",
    detail: "SIH26190 — tamper-evident document management for the Ministry of Home Affairs (NCRB).",
    repo: "github.com/biswaskunu/ChainDock",
    image: "/gallery/chainDock.png",
    imageWebp: "/gallery/chainDock.webp",
    imageAvif: "/gallery/chainDock.avif",
    alt: "Team ASPIRE at Smart India Hackathon 2026 with the ChainDock project",
  },
  {
    id: "odisha-boards",
    kind: "Award",
    title: "12th in Odisha · Class 12 Boards",
    detail: "Award ceremony — ranked 12th in the Odisha Class 12 board examinations.",
    repo: "Odisha CHSE · Award ceremony",
    image: "/gallery/12th-award.png",
    imageWebp: "/gallery/12th-award.webp",
    imageAvif: "/gallery/12th-award.avif",
    alt: "Receiving the 12th-rank award at the Odisha Class 12 board examination ceremony",
  },
  {
    id: "lookaway",
    kind: "Project",
    title: "lookaway",
    detail: "20-20-20 screen-break CLI — cross-platform Rust notifications.",
    repo: "github.com/biswaskunu/lookaway",
    image: "/gallery/lookaway.png",
    imageWebp: "/gallery/lookaway.webp",
    imageAvif: "/gallery/lookaway.avif",
    alt: "lookaway — 20-20-20 screen-break reminder CLI running in a terminal",
  },
];
