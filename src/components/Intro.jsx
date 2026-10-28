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

    // Safety net: never trap the user behind the overlay. If the fold
    // animation (or its onComplete callback) fails for any reason,
    // force-finish so the site is always revealed. Capped at 2.5s so a
    // broken animation can't hold scroll hostage (normal run-through
    // finishes around ~2s).
    const failsafe = setTimeout(() => {
      document.body.style.overflow = "";
      onFinish();
    }, 2500);

    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        clearTimeout(failsafe);
        document.body.style.overflow = "";
        onFinish();
      }, 300);
      return () => {
        clearTimeout(t);
        clearTimeout(failsafe);
      };
    }

    return () => {
      document.body.style.overflow = "";
      clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFoldComplete() {
    setPhase("hold");
    setTimeout(() => setPhase("out"), 450);
    // If the CSS transitionend event never fires (e.g. transitions
    // disabled), still unmount the overlay shortly after fading —
    // deliberately before the 2.5s failsafe above.
    setTimeout(() => {
      document.body.style.overflow = "";
      onFinish();
    }, 1200);
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
