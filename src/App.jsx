import { useEffect, useLayoutEffect, useState } from "react";
import { ThemeProvider, useTheme } from "./hooks/useTheme.jsx";
import { ACCENTS } from "./data/data.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import Stack from "./components/Stack.jsx";
import Log from "./components/Log.jsx";
import Gallery from "./components/Gallery.jsx";
import ThemePanel from "./components/ThemePanel.jsx";
import Contact, { Footer } from "./components/Contact.jsx";
import { ScrollProgress, BackToTop } from "./components/ScrollChrome.jsx";
import Intro from "./components/Intro.jsx";
import GradientWaves from "./fx/GradientWaves.jsx";
import ClickSpark from "./fx/ClickSpark.jsx";

// Layout effect on the client (before first paint), a no-op effect on
// the server so React doesn't warn about useLayoutEffect during render.
const useClientLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const INTRO_SEEN_KEY = "biswash:intro-seen";

function ThemedBackdrop() {
  const { mode, accentId } = useTheme();
  const accent = ACCENTS.find((a) => a.id === accentId) || ACCENTS[0];
  const variant = mode === "light" ? accent.light : accent.dark;

  return (
    <>
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
    </>
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
      </main>

      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
