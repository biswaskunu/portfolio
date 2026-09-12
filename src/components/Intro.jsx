import { useEffect, useState } from "react";
import FoldText from "../fx/FoldText.jsx";

/**
 * Intro
 * Full-screen load-in: the brand mark folds into place, holds
 * briefly, then fades to reveal the site. Scroll is locked while
 * it's up so the page can't be scrolled behind it. Skips straight
 * to `onFinish` for prefers-reduced-motion.
 */
export default function Intro({ onFinish }) {
  const [phase, setPhase] = useState("in"); // in -> hold -> out -> done

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        document.body.style.overflow = "";
        onFinish();
      }, 300);
      return () => clearTimeout(t);
    }

    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFoldComplete() {
    setPhase("hold");
    setTimeout(() => setPhase("out"), 450);
  }

  function handleTransitionEnd() {
    if (phase === "out") {
      document.body.style.overflow = "";
      onFinish();
    }
  }

  return (
    <div className={`intro-overlay intro-${phase}`} onTransitionEnd={handleTransitionEnd}>
      <div className="intro-content">
        <FoldText
          text=">_ biswash.rath"
          splitBy="char"
          hinge="top"
          trigger="mount"
          duration={0.5}
          stagger={0.035}
          ease="power3.out"
          perspective={600}
          creaseShading={0.5}
          fontSize="clamp(1.6rem, 5vw, 2.6rem)"
          fontWeight={600}
          color="var(--intro-text)"
          className="intro-fold-text"
          onComplete={handleFoldComplete}
        />
      </div>
    </div>
  );
}
