import { ThemeProvider } from "./hooks/useTheme.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import Stack from "./components/Stack.jsx";
import Log from "./components/Log.jsx";
import ThemePanel from "./components/ThemePanel.jsx";
import Contact, { Footer } from "./components/Contact.jsx";
import { ScrollProgress, BackToTop } from "./components/ScrollChrome.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <ScrollProgress />
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
