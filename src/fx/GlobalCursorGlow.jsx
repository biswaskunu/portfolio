import { useEffect, useRef } from "react";

/**
 * GlobalCursorGlow
 * A Magic-Bento-style ambient light that follows the cursor across
 * the entire page (not just inside project cards) — a soft radial
 * wash in the current accent color, blended with `screen` so it
 * lifts whatever's underneath rather than painting over it.
 * Disabled for touch/coarse pointers and prefers-reduced-motion.
 */
export default function GlobalCursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasFinePointer || prefersReducedMotion) return;

    const el = glowRef.current;
    if (!el) return;

    let raf = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;

    function handleMove(e) {
      targetX = e.clientX;
      targetY = e.clientY;
      el.style.opacity = "1";
      if (raf === null) {
        raf = requestAnimationFrame(paint);
      }
    }

    function handleLeave() {
      el.style.opacity = "0";
    }

    function paint() {
      el.style.setProperty("--cursor-x", `${targetX}px`);
      el.style.setProperty("--cursor-y", `${targetY}px`);
      raf = null;
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="global-cursor-glow" ref={glowRef} aria-hidden="true" />;
}
