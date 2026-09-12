import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Magnet
 * React-Bits-style pointer-following hover: the child is pulled
 * gently toward the cursor while hovered, springing back to rest on
 * mouseleave. Skipped for reduced-motion/touch, same guard as the
 * original tilt effect in main.js.
 */
export default function Magnet({ children, className = "", strength = 0.25, range = 60 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer =
    typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  if (prefersReducedMotion || !hasFinePointer) {
    return <div className={className}>{children}</div>;
  }

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.min(1, Math.sqrt(relX * relX + relY * relY) / range);
    x.set(relX * strength * (1 - dist * 0.4));
    y.set(relY * strength * (1 - dist * 0.4));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
