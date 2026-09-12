import { useState } from "react";
import { ThemeProvider } from "./hooks/useTheme.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import Stack from "./components/Stack.jsx";
import Log from "./components/Log.jsx";
import ThemePanel from "./components/ThemePanel.jsx";
import Contact, { Footer } from "./components/Contact.jsx";
import { ScrollProgress, BackToTop } from "./components/ScrollChrome.jsx";
import Intro from "./components/Intro.jsx";
import GlobalCursorGlow from "./fx/GlobalCursorGlow.jsx";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <ThemeProvider>
      {!introDone && <Intro onFinish={() => setIntroDone(true)} />}
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollProgress />
      <GlobalCursorGlow />
      <div className="noise-overlay" aria-hidden="true"></div>

      <Header />

      <main id="main-content">
        <Hero />
        <Work />
        <Stack />
        <Log />
        <ThemePanel />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}
