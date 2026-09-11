import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollFloat
 * React-Bits-style scroll-linked motion: rather than an on/off reveal,
 * the element's y-offset, scale, and opacity are tied continuously to
 * scroll progress through its own viewport window — so it drifts and
 * settles as you scroll, not just fades in once.
 */
export default function ScrollFloat({
  children,
  className = "",
  yRange = [80, 0],
  scaleRange = [0.94, 1],
  opacityRange = [0, 1],
  offset = ["start 90%", "start 40%"],
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset });

  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 1], opacityRange);

  return (
    <motion.div ref={ref} className={className} style={{ y, scale, opacity }}>
      {children}
    </motion.div>
  );
}

/**
 * ScrollParallax
 * Simpler continuous parallax drift for decorative elements (e.g.
 * background glyphs) — moves opposite to scroll at a configurable rate.
 */
export function ScrollParallax({ children, className = "", speed = 0.15 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
