/**
 * main.js
 * Owns application state and wires DOM events to filter.js (logic)
 * and render.js (output). This is the only file that mutates state.
 */

const appState = {
  activeTags: [],
  query: "",
};

// --- cached DOM refs -------------------------------------------------
const els = {
  heroStats: document.getElementById("heroStats"),
  filterChips: document.getElementById("filterChips"),
  filterClear: document.getElementById("filterClear"),
  filterCount: document.getElementById("filterCount"),
  projectSearch: document.getElementById("projectSearch"),
  projectList: document.getElementById("projectList"),
  stackGrid: document.getElementById("stackGrid"),
  logGrid: document.getElementById("logGrid"),
  navToggle: document.getElementById("navToggle"),
  mainNav: document.querySelector(".main-nav"),
  backToTop: document.getElementById("backToTop"),
  scrollProgress: document.getElementById("scrollProgress"),
  revealSections: document.querySelectorAll(".reveal"),
};

/**
 * Re-runs the filter against current state and re-renders the
 * project list + result count. Called after any state change.
 */
function refreshProjectView() {
  const filtered = filterProjects(PROJECTS, appState);
  renderProjectList(els.projectList, filtered);
  renderFilterCount(els.filterCount, filtered.length, PROJECTS.length);
  renderFilterChips(els.filterChips, TAGS, appState.activeTags);
}

function handleChipClick(event) {
  const chip = event.target.closest("[data-tag]");
  if (!chip) return;
  appState.activeTags = toggleTag(appState.activeTags, chip.dataset.tag);
  refreshProjectView();
}

function handleSearchInput(event) {
  appState.query = event.target.value;
  refreshProjectView();
}

function handleClearFilters() {
  appState.activeTags = [];
  appState.query = "";
  els.projectSearch.value = "";
  refreshProjectView();
}

function handleNavToggle() {
  const isOpen = els.mainNav.classList.toggle("nav-open");
  els.navToggle.setAttribute("aria-expanded", String(isOpen));
}

/**
 * Shows the back-to-top button once the user has scrolled past the
 * hero, hides it near the top of the page.
 */
function handleScrollVisibility() {
  const shouldShow = window.scrollY > window.innerHeight * 0.6;
  els.backToTop.classList.toggle("visible", shouldShow);
}

function handleBackToTopClick() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Updates the fixed top progress bar to reflect how far through
 * the page the user has scrolled (0–100%).
 */
function handleScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  els.scrollProgress.style.width = `${pct}%`;
}

/**
 * Reveals each `.reveal` section with a fade/slide-up once it enters
 * the viewport, using IntersectionObserver so nothing runs on scroll
 * for this part (cheaper than a scroll listener).
 */
function initSectionReveal() {
  if (els.revealSections.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    els.revealSections.forEach((s) => s.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );

  els.revealSections.forEach((section) => observer.observe(section));
}

/**
 * Pressing "/" focuses the project search box (unless the user is
 * already typing in a field), mirroring the shortcut on GitHub/Slack.
 */
function handleGlobalKeydown(event) {
  const isTyping = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    els.projectSearch.focus();
    document.getElementById("work").scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Wires up all static sections that don't depend on filter state:
 * hero stats, stack grid, log grid.
 */
function renderStaticSections() {
  renderHeroStats(els.heroStats, HERO_STATS);
  renderStackGrid(els.stackGrid, STACK);
  renderLogGrid(els.logGrid, LOG_ENTRIES);
}

function bindEvents() {
  els.filterChips.addEventListener("click", handleChipClick);
  els.filterClear.addEventListener("click", handleClearFilters);
  els.projectSearch.addEventListener("input", handleSearchInput);
  els.navToggle.addEventListener("click", handleNavToggle);
  els.backToTop.addEventListener("click", handleBackToTopClick);
  window.addEventListener("scroll", handleScrollVisibility, { passive: true });
  window.addEventListener("scroll", handleScrollProgress, { passive: true });
  document.addEventListener("keydown", handleGlobalKeydown);

  // Close mobile nav after a link is tapped
  els.mainNav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      els.mainNav.classList.remove("nav-open");
      els.navToggle.setAttribute("aria-expanded", "false");
    })
  );
}

function init() {
  renderStaticSections();
  refreshProjectView();
  bindEvents();
  initSectionReveal();
  handleScrollVisibility(); // in case the page loads mid-scroll (e.g. anchor link)
  handleScrollProgress();
}

document.addEventListener("DOMContentLoaded", init);
