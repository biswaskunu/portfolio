import { useState } from "react";
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
import GlobalCursorGlow from "./fx/GlobalCursorGlow.jsx";
import GradientWaves from "./fx/GradientWaves.jsx";

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
        brightness={mode === "light" ? 0.85 : 0.55}
        opacity={mode === "light" ? 0.45 : 0.6}
        mouseInteraction
        parallaxStrength={0.35}
        grain
        grainIntensity={0.035}
      />
      <div className="backdrop-scrim" aria-hidden="true" />
    </>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <ThemeProvider>
      {!introDone && <Intro onFinish={() => setIntroDone(true)} />}
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollProgress />
      <ThemedBackdrop />
      <GlobalCursorGlow />
      <div className="noise-overlay" aria-hidden="true"></div>

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
