import { Suspense, lazy, useEffect, useLayoutEffect, useState } from "react";
import { ThemeProvider, useTheme } from "./hooks/useTheme.jsx";
import { ACCENTS } from "./data/data.js";
import Header from "./components/Header.jsx";
import JsonLd from "./components/JsonLd.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import Stack from "./components/Stack.jsx";
import Log from "./components/Log.jsx";
import Gallery from "./components/Gallery.jsx";
import ThemePanel from "./components/ThemePanel.jsx";
import Contact, { Footer } from "./components/Contact.jsx";
import { ScrollProgress, BackToTop } from "./components/ScrollChrome.jsx";
import Intro from "./components/Intro.jsx";
import ClickSpark from "./fx/ClickSpark.jsx";

// The WebGL backdrop is not needed for first paint — split it out of
// the main bundle and mount it only after the browser goes idle, so
// the hero/content render and hydrate without GPU work competing for
// the main thread.
const GradientWaves = lazy(() => import("./fx/GradientWaves.jsx"));

// Layout effect on the client (before first paint), a no-op effect on
// the server so React doesn't warn about useLayoutEffect during render.
const useClientLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const INTRO_SEEN_KEY = "biswash:intro-seen";

function ThemedBackdrop() {
  const { mode, accentId } = useTheme();
  const [ready, setReady] = useState(false);

  // Server and first client render both stay null (markup identical);
  // the shader chunk loads once the main thread is idle.
  useClientLayoutEffect(() => {
    const idle =
      typeof window.requestIdleCallback === "function"
        ? (cb) => window.requestIdleCallback(cb, { timeout: 2500 })
        : (cb) => setTimeout(cb, 1500);
    const id = idle(() => setReady(true));
    return () => {
      if (typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  if (!ready) return null;

  const accent = ACCENTS.find((a) => a.id === accentId) || ACCENTS[0];
  const variant = mode === "light" ? accent.light : accent.dark;

  return (
    <Suspense fallback={null}>
      <GradientWaves
        className="gradient-waves-backdrop"
        horizonColor={mode === "light" ? "#faf8f4" : "#181816"}
        waveColor={variant.accent}
        crestColor={variant.soft}
        speed={0.25}
        amplitude={2.0}
        waveScale={0.5}
        waveRatio={0.9}
        swell={30}
        turbulence={14}
        tilt={1.15}
        zoom={1.0}
        height={6.0}
        fogDepth={15}
        detail="medium"
        brightness={mode === "light" ? 0.9 : 0.75}
        opacity={mode === "light" ? 0.7 : 0.85}
        mouseInteraction
        parallaxStrength={0.35}
        grain={false}
        grainIntensity={0}
      />
    </Suspense>
  );
}

export default function App() {
  // The intro overlay is client-only: the prerendered HTML never
  // contains it, so crawlers always see the page itself instead of an
  // overlay-only first paint. Starting "done" keeps hydration markup
  // identical to the server, then the layout effect may show it before
  // first paint for a real visitor.
  const [introDone, setIntroDone] = useState(true);

  useClientLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
    } catch {
      /* storage blocked — show the intro like a first visit */
    }
    if (seen) return;
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setIntroDone(false);
  }, []);

  return (
    <ThemeProvider>
      <JsonLd />
      {!introDone && <Intro onFinish={() => setIntroDone(true)} />}
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollProgress />
      <ThemedBackdrop />
      <ClickSpark />

      <Header />

      <main id="main-content">
        <Hero />
        <Work />
        <Stack />
        <Log />
        <Gallery />
        <ThemePanel />
        <Contact />
        <About />
      </main>

      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
