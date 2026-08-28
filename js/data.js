/**
 * data.js
 * Single source of truth for all portfolio content.
 * Keeping data separate from rendering/filtering logic so each
 * file has exactly one job (data / filter / render / init).
 */

const HERO_STATS = [
  { value: "9.58", label: "Year‑1 CGPA" },
  { value: "4", label: "Shipped repos" },
  { value: "3", label: "Hackathon teams led" },
  { value: "1", label: "Core stack, no context‑switching" },
];

/**
 * Canonical tag list used for the filter chip bar.
 * id must match the tags used inside PROJECTS below.
 */
const TAGS = [
  { id: "rust", label: "Rust" },
  { id: "axum", label: "Axum" },
  { id: "postgres", label: "PostgreSQL" },
  { id: "sqlx", label: "SQLx" },
  { id: "react", label: "React" },
  { id: "java", label: "Java" },
  { id: "cli", label: "CLI" },
  { id: "auth", label: "Auth / Security" },
];

const PROJECTS = [
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
    id: "lookaway",
    name: "lookaway",
    tagline: "20-20-20 screen-break CLI",
    description:
      "A lightweight, cross-platform CLI that reminds you to look 20 feet away for 20 seconds every 20 minutes. Built around notify-rust for OS-independent notifications rather than platform-specific code paths — spec is written, implementation in progress, versioned v0.1 → v1.0.",
    tags: ["rust", "cli"],
    repo: "github.com/biswaskunu/lookaway",
    url: "https://github.com/biswaskunu",
    status: "in-progress",
  },
];

const STACK = [
  { name: "Rust", role: "Primary language", detail: "Systems-level backend work — memory safety without a GC, used across every serious backend project." },
  { name: "Axum", role: "Web framework", detail: "REST APIs, middleware, extractors — the framework behind the IAM platform and History Guesser." },
  { name: "PostgreSQL", role: "Database", detail: "Relational modeling for auth chains, sessions, and game state — always paired with SQLx." },
  { name: "SQLx", role: "Async SQL toolkit", detail: "Compile-time checked queries against Postgres, no ORM magic in the way." },
  { name: "Java", role: "Secondary language", detail: "Backing the multiplayer server project — kept off the résumé until there was a repo to prove it." },
  { name: "Docker", role: "Local dev & deploy", detail: "Compose setups for local development; Railway + Netlify for shipped deployments." },
];

const LOG_ENTRIES = [
  {
    kind: "Hackathon",
    title: "Smart India Hackathon 2025",
    detail: "Built & pitched Coder's Hub with Team Aspire — a guided coding-learning platform with roadmaps and gamification (Problem Statement: Smart Education).",
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
  {
    kind: "Content",
    title: "honest_developers_hub",
    detail: "Instagram channel on developer humor and programmer life — a creative outlet that doubles as a lead-gen channel.",
  },
];
